/**
 * fix-slugs-fantomes.mjs
 * Étapes 1 & 2 : Correction des slugs fantômes + suppression des liens placeholder
 *
 * Usage : node scripts/fix-slugs-fantomes.mjs [--dry-run]
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

// ─── Table de mapping globale ────────────────────────────────────────────────
// Format : { [href_cassé]: href_cible }

const MAPPING = {

  // ── Typos / variantes de slug ─────────────────────────────────────────────
  'https://www.salesexperienz.fr/blog/articles-seo-secrets':
    'https://www.salesexperienz.fr/blog/article-seo-secrets',

  'https://www.salesexperienz.fr/blog/auto-blog-seo':
    'https://www.salesexperienz.fr/blog/automatiser-son-blog-seo',

  'https://www.salesexperienz.fr/blog/automatisation-commerciale-definitions-usage':
    'https://www.salesexperienz.fr/blog/automatisation-commerciale-definition-usage',

  'https://www.salesexperienz.fr/blog/automatisation-prospection-linkedin-booster':
    'https://www.salesexperienz.fr/blog/automatiser-prospection-linkedin-booster',

  'https://www.salesexperienz.fr/blog/automatisation-prospection-n8n-blog':
    'https://www.salesexperienz.fr/blog/automatiser-prospection-n8n-blog',

  'https://www.salesexperienz.fr/blog/automatiser-blog-wordpress':
    'https://www.salesexperienz.fr/blog/comment-automatiser-blog-wordpress',

  'https://www.salesexperienz.fr/blog/comment-optimer-seo-site-web':
    'https://www.salesexperienz.fr/blog/comment-optimiser-seo-site-web',

  'https://www.salesexperienz.fr/blog/structure-demarche-commerciale':
    'https://www.salesexperienz.fr/blog/structurer-demarche-commerciale',

  'https://www.salesexperienz.fr/blog/strategie-crm-amelioration-efficacite-commerciale':
    'https://www.salesexperienz.fr/blog/strategie-crm',

  'https://www.salesexperienz.fr/blog/strategie-crm-ameliorer-efficacite-commerciale':
    'https://www.salesexperienz.fr/blog/strategie-crm',

  'https://www.salesexperienz.fr/blog/plan-action-commercial':
    'https://www.salesexperienz.fr/blog/plan-action-commercial-exemple',

  'https://www.salesexperienz.fr/blog/plan-action-commerciale':
    'https://www.salesexperienz.fr/blog/plan-action-commerciale-exemple',

  'https://www.salesexperienz.fr/blog/plan-d-action-commercial':
    'https://www.salesexperienz.fr/blog/plan-action-commercial-exemple-pdf',

  'https://www.salesexperienz.fr/blog/strategie-de-commercialisation-politique-commerciale':
    'https://www.salesexperienz.fr/blog/strategie-commercialisation',

  // ── Articles inexistants → article le plus proche ─────────────────────────
  'https://www.salesexperienz.fr/blog/automatisation-commerciale':
    'https://www.salesexperienz.fr/blog/automatisation-commerciale-definition-usage',

  'https://www.salesexperienz.fr/blog/automatisez-votre-reponse-client':
    'https://www.salesexperienz.fr/blog/automatiser-relation-client',

  'https://www.salesexperienz.fr/blog/comment-automatiser-prospection-commerciale':
    'https://www.salesexperienz.fr/blog/automatiser-prospection-commerciale',

  'https://www.salesexperienz.fr/blog/difference-marketing-et-commercial':
    'https://www.salesexperienz.fr/blog/difference-strategies-marketing-commerciale',

  'https://www.salesexperienz.fr/blog/formation-techniques-vente':
    'https://www.salesexperienz.fr/blog/le-guide-complet-du-coaching-commercial-b2b',

  'https://www.salesexperienz.fr/blog/management-performance-commerciale-strategie-equipe':
    'https://www.salesexperienz.fr/blog/methode-pilotage-commercial',

  'https://www.salesexperienz.fr/blog/outils-prospection':
    'https://www.salesexperienz.fr/blog/outil-automatisation-commerciale-le-guide',

  // variante sans www (avant fix-urls-malformees)
  'https://salesexperienz.fr/blog/outils-prospection':
    'https://www.salesexperienz.fr/blog/outil-automatisation-commerciale-le-guide',

  'https://www.salesexperienz.fr/blog/pepite-attirer-leads-concurrents':
    'https://www.salesexperienz.fr/blog/strategie-prospection-commerciale',

  'https://www.salesexperienz.fr/blog/prospection-commerciale':
    'https://www.salesexperienz.fr/blog/guide-prospection-commerciale',

  'https://www.salesexperienz.fr/blog/prospection-commerciale-et-outils-dautomatisation':
    'https://www.salesexperienz.fr/blog/strategie-prospection-commerciale',

  'https://www.salesexperienz.fr/blog/structuration-equipe-vente':
    'https://www.salesexperienz.fr/blog/methode-pilotage-commercial',

  'https://www.salesexperienz.fr/blog/structuration-vente':
    'https://www.salesexperienz.fr/blog/structurer-demarche-commerciale',

  'https://www.salesexperienz.fr/blog/techniques-de-vente':
    'https://www.salesexperienz.fr/blog/guide-approche-commerciale',

  // ── Pages racine manquantes ───────────────────────────────────────────────
  'https://www.salesexperienz.fr/strategie-commerciale':
    'https://www.salesexperienz.fr/blog/definition-strategie-commerciale',

  'https://www.salesexperienz.fr/techniques-de-vente/':
    'https://www.salesexperienz.fr/blog/guide-approche-commerciale',

  'https://www.salesexperienz.fr/plan-action-commercial/':
    'https://www.salesexperienz.fr/blog/plan-action-commercial-exemple',

  'https://www.salesexperienz.fr/plan-daction-commercial/':
    'https://www.salesexperienz.fr/blog/plan-action-commercial-exemple',

  'https://www.salesexperienz.fr/processus-de-vente-definition/':
    'https://www.salesexperienz.fr/blog/structurer-demarche-commerciale',

  'https://www.salesexperienz.fr/strategies-marketing/strategie-de-commercialisation-et-politique-commerciale/':
    'https://www.salesexperienz.fr/blog/strategie-commercialisation',

  'https://www.salesexperienz.fr/strategie-prospection-outils-automatisation':
    'https://www.salesexperienz.fr/blog/strategie-prospection-commerciale',

  // ── PDF WordPress mort ────────────────────────────────────────────────────
  'https://www.salesexperienz.fr/blog/wp-content/uploads/2025/04/DIAGNOSTIC-COMMERCIAL-360°.pdf':
    'https://www.salesexperienz.fr/blog/guide-approche-commerciale',

  // ── Placeholders ─────────────────────────────────────────────────────────
  // ancre "feedback continu" dans strategies-referencement-google-optimal
  'https://www.high-authority-site.com':
    'https://www.salesexperienz.fr/blog/methode-pilotage-commercial',

  // ancre "Ethical Corporation" dans outil-automatisation-commerciale-le-guide
  'https://www.ethicalcorp.com':
    'https://www.salesexperienz.fr/blog/pourquoi-automatiser-process-commercial',

  // ancre "HubSpot" dans n8n-automatisation-marketing
  'https://external-authoritative-site.com':
    'https://www.hubspot.fr',
}

// Cas spéciaux : même href, cible différente selon l'article
const MAPPING_BY_SLUG = {
  'automatisation-commerciale-ia-efficacite': {
    'https://valid-url.com': 'https://www.salesexperienz.fr/blog/methode-pilotage-commercial',
  },
  'solution-automatisation-pme': {
    'https://valid-url.com': 'https://www.forrester.com',
  },
}

// ─── Résolution d'un href selon l'article ───────────────────────────────────

function resolveHref(href, articleSlug) {
  // Cas spéciaux slug-dépendants en priorité
  const bySlug = MAPPING_BY_SLUG[articleSlug]
  if (bySlug && bySlug[href]) return bySlug[href]
  // Table globale
  return MAPPING[href] ?? null
}

// ─── Correction d'un article ─────────────────────────────────────────────────

function fixPost(post) {
  const slug = post.slug?.current ?? post._id
  if (!Array.isArray(post.body)) return null

  let changed = false
  const corrections = []

  const newBody = post.body.map(block => {
    if (block._type !== 'block' || !Array.isArray(block.markDefs)) return block
    let blockChanged = false

    const newMarkDefs = block.markDefs.map(def => {
      if (def._type !== 'link' || !def.href) return def
      const target = resolveHref(def.href, slug)
      if (!target) return def
      corrections.push({ from: def.href, to: target })
      changed = true
      blockChanged = true
      return { ...def, href: target }
    })

    return blockChanged ? { ...block, markDefs: newMarkDefs } : block
  })

  return changed ? { slug, newBody, corrections } : null
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`🔧 Correction slugs fantômes + placeholders — ${DRY_RUN ? 'DRY RUN' : 'ÉCRITURE SANITY'}`)
  console.log('─'.repeat(60))

  const posts = await sanity.fetch(`*[_type == "post"]{_id, slug, body}`)
  console.log(`📋 ${posts.length} articles chargés\n`)

  let totalDocs = 0
  let totalLinks = 0

  for (const post of posts) {
    const result = fixPost(post)
    if (!result) continue

    const { slug, newBody, corrections } = result
    console.log(`📄 ${slug}`)
    corrections.forEach(c => {
      const tag = MAPPING[c.from] ? '🔀' : '🔗'
      console.log(`   ${tag} ❌ ${c.from}`)
      console.log(`       ✅ ${c.to}`)
    })

    totalDocs++
    totalLinks += corrections.length

    if (!DRY_RUN) {
      await sanity.patch(post._id).set({ body: newBody }).commit()
      console.log(`   → Patché ✓`)
    }
    console.log()
  }

  console.log('═'.repeat(60))
  console.log(`✅ ${totalDocs} article(s), ${totalLinks} lien(s) corrigé(s)`)
  if (DRY_RUN) {
    console.log('\n⚠️  Mode dry-run — relancer sans --dry-run pour appliquer.')
  }
}

main().catch(console.error)
