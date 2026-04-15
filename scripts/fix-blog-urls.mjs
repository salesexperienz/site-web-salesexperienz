/**
 * fix-blog-urls.mjs
 *
 * Patch tous les articles Sanity pour remplacer :
 *   blog.salesexperienz.fr  →  www.salesexperienz.fr/blog
 *
 * Corrige :
 *  - les markDefs de type "link" (annotations Portable Text)
 *  - les spans dont le texte contient l'ancienne URL en clair
 *
 * Usage : node scripts/fix-blog-urls.mjs
 */

import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: '0wgbhtrw',
  dataset: 'production',
  token: 'sk2SCaOIjrTY8dDVlwRuxYVo3Wd6jK48qU04EiyFz3gPiCTMJsKRTAs3KuO6SSAKEWBn6wK9H2AOhWTGoFR16IvtX6mltPUfSqhyPXFFn7DSI9yOttQo1tcUK61T7xT1MznUKtMmP3NEn2K9E2y4RL6Wlcun3423IRMfBb1oPFjhzEgqvIMD',
  apiVersion: '2026-04-12',
  useCdn: false,
})

const OLD_DOMAIN = 'blog.salesexperienz.fr'

// https://blog.salesexperienz.fr/guide-approche-commerciale/
// → https://salesexperienz.fr/guide-approche-commerciale
function fixUrl(url) {
  if (!url || !url.includes(OLD_DOMAIN)) return url
  return url
    .replace(/https?:\/\/blog\.salesexperienz\.fr/, 'https://salesexperienz.fr')
    .replace(/\/$/, '') // retire le slash final
}

function fixText(text) {
  if (!text || !text.includes(OLD_DOMAIN)) return text
  return text
    .replace(/https?:\/\/blog\.salesexperienz\.fr(\/[^\s]*?)\//g, 'https://salesexperienz.fr$1')
    .replace(/https?:\/\/blog\.salesexperienz\.fr/g, 'https://salesexperienz.fr')
}

function patchBody(body) {
  if (!Array.isArray(body)) return { patched: body, changed: false }

  let changed = false

  const patched = body.map(block => {
    if (block._type !== 'block') return block

    let blockChanged = false
    const newBlock = { ...block }

    // ── 1. Corriger les markDefs (annotations de liens) ──────────────────
    if (Array.isArray(block.markDefs)) {
      const newMarkDefs = block.markDefs.map(def => {
        if (def._type === 'link' && def.href && def.href.includes(OLD_DOMAIN)) {
          blockChanged = true
          return { ...def, href: fixUrl(def.href) }
        }
        return def
      })
      if (blockChanged) newBlock.markDefs = newMarkDefs
    }

    // ── 2. Corriger les URLs en texte brut dans les spans ────────────────
    if (Array.isArray(block.children)) {
      const newChildren = block.children.map(child => {
        if (child._type === 'span' && child.text && child.text.includes(OLD_DOMAIN)) {
          blockChanged = true
          return { ...child, text: fixText(child.text) }
        }
        return child
      })
      if (blockChanged) newBlock.children = newChildren
    }

    if (blockChanged) changed = true
    return blockChanged ? newBlock : block
  })

  return { patched, changed }
}

async function run() {
  console.log('Récupération de tous les articles Sanity…')
  const posts = await sanity.fetch(`*[_type == "post"]{ _id, title, body }`)
  console.log(`${posts.length} articles trouvés.`)

  let fixedCount = 0

  for (const post of posts) {
    const { patched, changed } = patchBody(post.body)

    if (!changed) continue

    try {
      await sanity.patch(post._id).set({ body: patched }).commit()
      console.log(`✅ Corrigé : ${post.title}`)
      fixedCount++
    } catch (err) {
      console.error(`❌ Erreur sur "${post.title}" :`, err.message)
    }
  }

  console.log(`\nTerminé — ${fixedCount} article(s) corrigé(s).`)
}

run()
