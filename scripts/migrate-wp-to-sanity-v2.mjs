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

function htmlToPortableText(html) {
  if (!html) return []
  
  const blocks = []
  let key = 0
  
  // Nettoyer le HTML
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
  
  // Extraire les blocs par balises
  // Supprimer les blocs CSS et JS
  const noStyle = cleaned.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  const noScript = noStyle.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  const noCssBlock = noScript.replace(/[^{]*\{[^}]*\}/g, '')
  const dom = parseDocument(noCssBlock)
  
  function processNode(node) {
    if (node.type === 'text') {
      const text = node.data.trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: `block${key++}`,
          style: 'normal',
          children: [{ _type: 'span', _key: `span${key++}`, text }]
        })
      }
      return
    }
    
    if (node.type !== 'tag') return
    
    const tag = node.name.toLowerCase()
    
    // Titres
    if (['h1','h2','h3','h4'].includes(tag)) {
      const text = DomUtils.textContent(node).trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: `block${key++}`,
          style: tag,
          children: [{ _type: 'span', _key: `span${key++}`, text }]
        })
      }
      return
    }
    
    // Paragraphes
    if (tag === 'p') {
      const text = DomUtils.textContent(node).trim()
      if (text) {
        blocks.push({
          _type: 'block',
          _key: `block${key++}`,
          style: 'normal',
          children: [{ _type: 'span', _key: `span${key++}`, text }]
        })
      }
      return
    }
    
    // Listes
    if (tag === 'ul' || tag === 'ol') {
      const listType = tag === 'ul' ? 'bullet' : 'number'
      const items = DomUtils.findAll(n => n.type === 'tag' && n.name === 'li', node.children || [])
      items.forEach(li => {
        const text = DomUtils.textContent(li).trim()
        if (text) {
          blocks.push({
            _type: 'block',
            _key: `block${key++}`,
            style: 'normal',
            listItem: listType,
            level: 1,
            children: [{ _type: 'span', _key: `span${key++}`, text }]
          })
        }
      })
      return
    }
    
    // Divs et sections → traiter les enfants
    if (['div','section','article','main','figure'].includes(tag)) {
      if (node.children) node.children.forEach(processNode)
      return
    }
  }
  
  if (dom.children) dom.children.forEach(processNode)
  
  return blocks.filter(b => b.children[0].text.length > 0)
}

async function uploadImageToSanity(imageUrl, sanity) {
  try {
    const res = await fetch(imageUrl)
    if (!res.ok) return null
    const buffer = await res.arrayBuffer()
    const filename = imageUrl.split('/').pop()
    const asset = await sanity.assets.upload('image', Buffer.from(buffer), {
      filename,
      contentType: res.headers.get('content-type') || 'image/jpeg'
    })
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  } catch (err) {
    console.log('Image non uploadée:', imageUrl)
    return null
  }
}

async function fetchAllPosts() {
  let page = 1
  let allPosts = []
  while (true) {
    const res = await fetch(`${WP_URL}/posts?per_page=20&page=${page}&_embed`)
    if (!res.ok) break
    const posts = await res.json()
    if (posts.length === 0) break
    allPosts = [...allPosts, ...posts]
    console.log(`Page ${page} : ${posts.length} articles`)
    page++
  }
  return allPosts
}

async function migrate() {
  console.log('Récupération des articles...')
  const wpPosts = await fetchAllPosts()
  console.log(`Total : ${wpPosts.length} articles`)

  for (const wp of wpPosts) {
    const body = htmlToPortableText(wp.content.rendered)
    const excerpt = wp.excerpt.rendered
      .replace(/<[^>]*>/g, '')
      .replace(/&#8217;/g, "'")
      .trim()
      .substring(0, 300)

    // Récupérer SEO depuis Yoast
    const yoast = wp.yoast_head_json || {}
    const seoTitle = yoast.title || wp.title.rendered
    const seoDescription = yoast.description || excerpt

    // Récupérer l'image featured
    let mainImage = null
    const featuredMedia = wp._embedded?.['wp:featuredmedia']?.[0]
    if (featuredMedia?.source_url) {
      mainImage = await uploadImageToSanity(featuredMedia.source_url, sanity)
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
      console.log(`✅ ${post.title}`)
    } catch (err) {
      console.error(`❌ ${post.title}`, err.message)
    }
  }
  console.log('Migration terminée !')
}

migrate()
