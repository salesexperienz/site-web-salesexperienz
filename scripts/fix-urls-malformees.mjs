/**
 * fix-urls-malformees.mjs
 * Phase 2 : Correction des liens internes cassés dans le contenu Sanity
 *
 * Corrige 4 patterns détectés à l'audit :
 *  1. href contient "</strong>//" → HTML corrompu lors migration WP
 *     ex: "https :</strong>//moz.com/..." → "https://moz.com/..."
 *  2. href est "https :/salesexperienz.fr/..." (1 seul slash)
 *     → "https://www.salesexperienz.fr/blog/[slug]"
 *  3. href est "salesexperienz.fr/[slug]/" (sans protocole)
 *     → "https://www.salesexperienz.fr/blog/[slug]"
 *  4. href pointe vers salesexperienz.com (ancien domaine)
 *     → "https://www.salesexperienz.fr/blog/[slug]"
 *
 * Usage : node scripts/fix-urls-malformees.mjs [--dry-run]
 */

import { createClient } from '@sanity/client'

const DRY_RUN = process.argv.includes('--dry-run')

const sanity = createClient({
  projectId: '0wgbhtrw',
  dataset: 'production',
  token: 'sk2SCaOIjrTY8dDVlwRuxYVo3Wd6jK48qU04EiyFz3gPiCTMJsKRTAs3KuO6SSAKEWBn6wK9H2AOhWTGoFR16IvtX6mltPUfSqhyPXFFn7DSI9yOttQo1tcUK61T7xT1MznUKtMmP3NEn2K9E2y4RL6Wlcun3423IRMfBb1oPFjhzEgqvIMD',
  apiVersion: '2026-04-12',
  useCdn: false,
})

// ─── Règles de correction ────────────────────────────────────────────────────

function fixHref(href) {
  if (!href) return null

  let fixed = href.trim()

  // ── Pattern 1 : HTML corrompu "</strong>//" ou balises similaires
  // ex: "https :</strong>//moz.com/foo" → "https://moz.com/foo"
  if (fixed.includes('<') || fixed.includes('>')) {
    const afterSlashes = fixed.match(/(?:<[^>]*>)+\/\/([\S]+)/)
    if (afterSlashes) {
      // Extraire uniquement la partie URL propre (avant tout guillemet ou HTML résiduel)
      // Inclut les guillemets typographiques Unicode (″ U+2033, " U+201C, " U+201D)
      let target = afterSlashes[1].replace(/[″“”"""<>].*$/, '').trim()
      fixed = 'https://' + target
    }
  }

  // ── Pattern 2 : protocole avec un seul slash "https :/domaine.fr/..."
  if (/^https?\s*:\/[^/]/.test(fixed)) {
    fixed = fixed.replace(/^(https?)\s*:\/+/, '$1://')
  }

  // ── Pattern 3 : URL salesexperienz.fr sans www
  // Ajoute www. et /blog/ si le chemin n'est pas déjà sous /blog/
  if (/^https?:\/\/salesexperienz\.fr\//.test(fixed)) {
    const path = fixed
      .replace(/^https?:\/\/salesexperienz\.fr\//, '')
      .replace(/\/$/, '')
    // Si le chemin commence déjà par "blog/", on ajoute juste www.
    if (path.startsWith('blog/')) {
      fixed = `https://www.salesexperienz.fr/${path}`
    } else {
      fixed = `https://www.salesexperienz.fr/blog/${path}`
    }
  }

  // ── Pattern 4 : ancien domaine salesexperienz.com (sans fr)
  if (/^https?:\/\/(www\.)?salesexperienz\.com\//.test(fixed)) {
    const path = fixed
      .replace(/^https?:\/\/(www\.)?salesexperienz\.com\//, '')
      .replace(/\/$/, '')
    fixed = `https://www.salesexperienz.fr/blog/${path}`
  }

  // ── Pattern 5 : URL sans protocole "salesexperienz.fr/slug/"
  if (/^salesexperienz\.fr\//.test(fixed)) {
    const path = fixed.replace(/^salesexperienz\.fr\//, '').replace(/\/$/, '')
    if (path.startsWith('blog/')) {
      fixed = `https://www.salesexperienz.fr/${path}`
    } else {
      fixed = `https://www.salesexperienz.fr/blog/${path}`
    }
  }

  // Nettoyage final : espaces parasites dans le protocole
  fixed = fixed.replace(/^(https?)\s*:\/\//, '$1://')

  return fixed === href ? null : fixed
}

// ─── Parcours récursif du Portable Text ─────────────────────────────────────

function fixMarkDefs(markDefs) {
  if (!Array.isArray(markDefs)) return { markDefs, changed: false }
  let changed = false
  const fixed = markDefs.map(def => {
    if (def._type !== 'link' || !def.href) return def
    const newHref = fixHref(def.href)
    if (!newHref) return def
    changed = true
    return { ...def, href: newHref }
  })
  return { markDefs: fixed, changed }
}

function fixBlocks(blocks) {
  if (!Array.isArray(blocks)) return { blocks, changed: false }
  let changed = false
  const fixed = blocks.map(block => {
    if (block._type !== 'block') return block
    const { markDefs: newDefs, changed: c } = fixMarkDefs(block.markDefs)
    if (c) {
      changed = true
      return { ...block, markDefs: newDefs }
    }
    return block
  })
  return { blocks: fixed, changed }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`🔧 Correction des URLs malformées — ${DRY_RUN ? 'DRY RUN' : 'ÉCRITURE SANITY'}`)
  console.log('─'.repeat(60))

  // Récupère tous les articles avec leur contenu
  const posts = await sanity.fetch(`*[_type == "post"]{_id, slug, body}`)
  console.log(`📋 ${posts.length} articles récupérés\n`)

  let totalFixed = 0
  let totalDocs = 0

  for (const post of posts) {
    const slug = post.slug?.current ?? post._id
    const { blocks, changed } = fixBlocks(post.body)

    if (!changed) continue

    // Compte les corrections
    const corrections = []
    post.body?.forEach((block, bi) => {
      if (block._type !== 'block') return
      block.markDefs?.forEach((def, di) => {
        if (def._type !== 'link' || !def.href) return
        const newHref = fixHref(def.href)
        if (newHref) corrections.push({ from: def.href, to: newHref })
      })
    })

    console.log(`📄 ${slug}`)
    corrections.forEach(c => {
      console.log(`   ❌ ${c.from}`)
      console.log(`   ✅ ${c.to}`)
    })

    totalFixed += corrections.length
    totalDocs++

    if (!DRY_RUN) {
      await sanity.patch(post._id).set({ body: blocks }).commit()
      console.log(`   → Patché ✓`)
    }
    console.log()
  }

  console.log('═'.repeat(60))
  console.log(`✅ ${totalDocs} article(s) à corriger, ${totalFixed} lien(s) fixé(s)`)
  if (DRY_RUN) {
    console.log('\n⚠️  Mode dry-run : aucune écriture. Relancer sans --dry-run pour appliquer.')
  }
}

main().catch(console.error)
