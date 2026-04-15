/**
 * migrate-wp-to-sanity-v3.mjs
 *
 * Migration WordPress (local) → Sanity
 * Améliorations vs v2 :
 *  - Gestion des liens <a> dans les paragraphes (markDefs Portable Text)
 *  - Remplacement automatique de blog.salesexperienz.fr → www.salesexperienz.fr/blog
 *  - Conservation du gras <strong> et de l'italique <em>
 *
 * Usage : node scripts/migrate-wp-to-sanity-v3.mjs
 */

import { createClient } from '@sanity/client'
import { parseDocument } from 'htmlparser2'
import { DomUtils } from 'htmlparser2'

const sanity = createClient({
  projectId: '0wgbhtrw',
  dataset: 'production',
  token: 'sk2SCaOIjrTY8dDVlwRuxYVo3Wd6jK48qU04EiyFz3gPiCTMJsKRTAs3KuO6SSAKEWBn6wK9H2AOhWTGoFR16IvtX6mltPUfSqhyPXFFn7DSI9yOttQo1tcUK61T7xT1MznUKtMmP3NEn2K9E2y4RL6Wlcun3423IRMfBb1oPFjhzEgqvIMD',
  apiVersion: '2026-04-12',
  useCdn: false,
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const WP_URL = 'https://salesexperienz.local/wp-json/wp/v2'

// Normalise tous les liens internes WP vers salesexperienz.fr/blog/slug
// Cas couverts :
//   https://blog.salesexperienz.fr/slug/     → salesexperienz.fr/blog/slug
//   https://salesexperienz.fr/slug/          → salesexperienz.fr/blog/slug
//   https://salesexperienz.local/slug/       → salesexperienz.fr/blog/slug
//   https://www.salesexperienz.fr/slug/      → salesexperienz.fr/blog/slug
// Ne touche pas : /blog/slug, /services/..., /agence-..., liens externes
const BLOG_SLUG_RE = /^https?:\/\/(?:www\.|blog\.)?salesexperienz\.(?:fr|local)\/((?!blog\/|services\/|agence-|studio)[^?#]+?)\/?$/

function fixUrl(url) {
  if (!url) return url
  const m = url.match(BLOG_SLUG_RE)
  if (m) return `https://salesexperienz.fr/blog/${m[1]}`
  return url
}

// ─── Convertisseur HTML → Portable Text avec liens ───────────────────────────
function htmlToPortableText(html) {
  if (!html) return []

  let keyCounter = 0
  const nextKey = (prefix = 'k') => `${prefix}${keyCounter++}`

  const cleaned = html
    .replace(/\r\n/g, '\n')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')

  const noStyle  = cleaned.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  const noScript = noStyle.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  const dom      = parseDocument(noScript)

  // ── Convertit les enfants inline d'un nœud en children + markDefs ──────
  function inlineToChildren(node, inheritedMarks = []) {
    const children = []
    const markDefs = []

    function walk(n, activeMarks) {
      if (n.type === 'text') {
        const text = n.data
        if (text) {
          children.push({
            _type: 'span',
            _key: nextKey('sp'),
            text,
            marks: [...activeMarks],
          })
        }
        return
      }

      if (n.type !== 'tag') return
      const tag = n.name.toLowerCase()

      if (tag === 'a') {
        const rawHref = n.attribs?.href || ''
        const href    = fixUrl(rawHref)
        if (href) {
          const linkKey = nextKey('lnk')
          markDefs.push({ _type: 'link', _key: linkKey, href })
          ;(n.children || []).forEach(child => walk(child, [...activeMarks, linkKey]))
        } else {
          // Pas de href → texte brut
          ;(n.children || []).forEach(child => walk(child, activeMarks))
        }
        return
      }

      const markMap = { strong: 'strong', b: 'strong', em: 'em', i: 'em' }
      if (markMap[tag]) {
        ;(n.children || []).forEach(child => walk(child, [...activeMarks, markMap[tag]]))
        return
      }

      // Autres balises inline : passer les enfants
      ;(n.children || []).forEach(child => walk(child, activeMarks))
    }

    ;(node.children || []).forEach(child => walk(child, inheritedMarks))
    return { children, markDefs }
  }

  const blocks = []

  function processNode(node) {
    if (node.type === 'text') {
      const text = node.data.trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: nextKey('blk'),
          style: 'normal',
          markDefs: [],
          children: [{ _type: 'span', _key: nextKey('sp'), text, marks: [] }],
        })
      }
      return
    }

    if (node.type !== 'tag') return
    const tag = node.name.toLowerCase()

    // ── Titres ──────────────────────────────────────────────────────────
    if (['h1', 'h2', 'h3', 'h4'].includes(tag)) {
      const text = DomUtils.textContent(node).trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: nextKey('blk'),
          style: tag,
          markDefs: [],
          children: [{ _type: 'span', _key: nextKey('sp'), text, marks: [] }],
        })
      }
      return
    }

    // ── Paragraphes (avec liens et styles inline) ────────────────────────
    if (tag === 'p') {
      const { children, markDefs } = inlineToChildren(node)
      // Ignorer les paragraphes vides
      const hasContent = children.some(c => c.text && c.text.trim())
      if (hasContent) {
        blocks.push({
          _type: 'block',
          _key: nextKey('blk'),
          style: 'normal',
          markDefs,
          children,
        })
      }
      return
    }

    // ── Listes ──────────────────────────────────────────────────────────
    if (tag === 'ul' || tag === 'ol') {
      const listType = tag === 'ul' ? 'bullet' : 'number'
      const items = DomUtils.findAll(n => n.type === 'tag' && n.name === 'li', node.children || [])
      items.forEach(li => {
        const { children, markDefs } = inlineToChildren(li)
        const hasContent = children.some(c => c.text && c.text.trim())
        if (hasContent) {
          blocks.push({
            _type: 'block',
            _key: nextKey('blk'),
            style: 'normal',
            listItem: listType,
            level: 1,
            markDefs,
            children,
          })
        }
      })
      return
    }

    // ── Blockquote ───────────────────────────────────────────────────────
    if (tag === 'blockquote') {
      const text = DomUtils.textContent(node).trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: nextKey('blk'),
          style: 'blockquote',
          markDefs: [],
          children: [{ _type: 'span', _key: nextKey('sp'), text, marks: [] }],
        })
      }
      return
    }

    // ── Conteneurs → récurser ────────────────────────────────────────────
    if (['div', 'section', 'article', 'main', 'figure', 'body'].includes(tag)) {
      ;(node.children || []).forEach(processNode)
      return
    }
  }

  ;(dom.children || []).forEach(processNode)

  return blocks.filter(b => Array.isArray(b.children) && b.children.some(c => c.text?.trim()))
}

// ─── Upload image vers Sanity ─────────────────────────────────────────────────
async function uploadImageToSanity(imageUrl) {
  try {
    const res = await fetch(imageUrl)
    if (!res.ok) return null
    const buffer = await res.arrayBuffer()
    const filename = imageUrl.split('/').pop()
    const asset = await sanity.assets.upload('image', Buffer.from(buffer), {
      filename,
      contentType: res.headers.get('content-type') || 'image/jpeg',
    })
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  } catch {
    console.log('  Image non uploadée :', imageUrl)
    return null
  }
}

// ─── Récupération des articles WP ────────────────────────────────────────────
async function fetchAllPosts() {
  let page = 1
  const allPosts = []
  while (true) {
    const res = await fetch(`${WP_URL}/posts?per_page=20&page=${page}&_embed`)
    if (!res.ok) break
    const posts = await res.json()
    if (posts.length === 0) break
    allPosts.push(...posts)
    console.log(`Page ${page} : ${posts.length} articles`)
    page++
  }
  return allPosts
}

// ─── Migration principale ─────────────────────────────────────────────────────
// ─── Suppression des encadrés obsolètes après la conclusion ──────────────────
// Cible :
//  - tous les blockquotes situés APRÈS le dernier titre "conclusion"
//  - tout blockquote contenant des mots-clés promotionnels WP (CROISSANCE+, etc.)
const PROMO_KEYWORDS = [
  'croissance +', 'croissance+', 'ressource recommandée', 'ressource recommandee',
  'voir l\'offre', 'cliquez ici', 'offre complète', 'offre complete',
  'ne restez pas seul', 'transformez votre stratégie',
]

function cleanupBody(blocks) {
  // 1. Trouver l'index du dernier titre "Conclusion"
  let conclusionIdx = -1
  for (let i = blocks.length - 1; i >= 0; i--) {
    const b = blocks[i]
    if (b._type === 'block' && ['h1','h2','h3','h4'].includes(b.style)) {
      const text = (b.children?.map(c => c.text || '').join('') || '').toLowerCase()
      if (text.includes('conclusion')) { conclusionIdx = i; break }
    }
  }

  return blocks.filter((b, i) => {
    if (b._type !== 'block' || b.style !== 'blockquote') return true

    // 2. Supprimer si après la conclusion
    if (conclusionIdx !== -1 && i > conclusionIdx) return false

    // 3. Supprimer si contient des mots-clés promotionnels obsolètes
    const text = (b.children?.map(c => c.text || '').join('') || '').toLowerCase()
    if (PROMO_KEYWORDS.some(kw => text.includes(kw))) return false

    return true
  })
}

async function migrate() {
  console.log('Récupération des articles WordPress…')
  const wpPosts = await fetchAllPosts()
  console.log(`Total : ${wpPosts.length} articles\n`)

  for (const wp of wpPosts) {
    const body = cleanupBody(htmlToPortableText(wp.content.rendered))

    const excerpt = wp.excerpt.rendered
      .replace(/<[^>]*>/g, '')
      .replace(/&#8217;/g, "'")
      .trim()
      .substring(0, 300)

    const yoast          = wp.yoast_head_json || {}
    const seoTitle       = yoast.title || wp.title.rendered
    const seoDescription = yoast.description || excerpt

    let mainImage = null
    const featuredMedia = wp._embedded?.['wp:featuredmedia']?.[0]
    if (featuredMedia?.source_url) {
      mainImage = await uploadImageToSanity(featuredMedia.source_url)
    }

    const post = {
      _type: 'post',
      _id: `wp-${wp.id}`,
      title: wp.title.rendered.replace(/&#8217;/g, "'").replace(/&amp;/g, '&'),
      slug: { _type: 'slug', current: wp.slug },
      publishedAt: wp.date,
      excerpt,
      body,
      seoTitle,
      seoDescription,
      ...(mainImage && { mainImage }),
    }

    try {
      await sanity.createOrReplace(post)
      const linkCount = body.reduce((acc, b) => acc + (b.markDefs?.length || 0), 0)
      console.log(`✅ ${post.title} (${body.length} blocs, ${linkCount} liens)`)
    } catch (err) {
      console.error(`❌ ${post.title}`, err.message)
    }
  }

  console.log('\nMigration terminée !')
}

migrate()
