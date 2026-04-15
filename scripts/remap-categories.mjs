/**
 * remap-categories.mjs
 *
 * Réassigne les catégories Sanity à chaque article en analysant le titre.
 * Chaque catégorie est associée à des mots-clés ; on calcule un score par
 * article et on retient les 2 catégories les plus pertinentes (score > 0).
 *
 * Usage : node scripts/remap-categories.mjs
 */

import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: '0wgbhtrw',
  dataset: 'production',
  token: 'sk2SCaOIjrTY8dDVlwRuxYVo3Wd6jK48qU04EiyFz3gPiCTMJsKRTAs3KuO6SSAKEWBn6wK9H2AOhWTGoFR16IvtX6mltPUfSqhyPXFFn7DSI9yOttQo1tcUK61T7xT1MznUKtMmP3NEn2K9E2y4RL6Wlcun3423IRMfBb1oPFjhzEgqvIMD',
  apiVersion: '2026-04-12',
  useCdn: false,
})

// ─── Mapping catégories Sanity → mots-clés déclencheurs ──────────────────────
// Format : { "titre exact Sanity": ["mot-clé", ...] }
const CATEGORY_KEYWORDS = {
  'Automatisation':           ['automat', 'workflow', 'n8n', 'make', 'zapier', 'process', 'publication automatiq'],
  'Automatisation commerciale':['automat', 'commercial', 'vente', 'prospect'],
  'Workflow n8n':             ['n8n', 'workflow', 'automatis'],
  'Prospection':              ['prospect', 'leads', 'cold email', 'cold outreach', 'prise de contact'],
  'Prospection commerciale':  ['prospect commercial', 'prospection b2b', 'prospect b2b', 'prospecter'],
  'LinkedIn':                 ['linkedin'],
  'SEO':                      ['seo', 'référencement', 'referencement', 'google', 'positionnement', 'trafic organique'],
  'Rédaction SEO':            ['rédaction seo', 'redaction seo', 'article seo', 'texte seo', 'contenu seo', 'rédiger', 'copywriting'],
  'Référencement Google':     ['référencement google', 'referencement google', 'google', 'référencement naturel'],
  'Stratégie commerciale':    ['stratégie commerciale', 'plan commercial', 'développement commercial', 'approche commerciale', 'démarche commerciale'],
  'Performance commerciale':  ['performance', 'kpi', 'objectif', 'résultat', 'efficacité'],
  'Coaching commercial':      ['coaching', 'manager', 'management', 'animer', 'équipe commerciale', 'commerciaux'],
  'Démarche commerciale':     ['démarche', 'structurer', 'étapes', 'méthode commerciale'],
  'Plan commercial':          ['plan commercial', 'plan d\'action commercial', 'stratégie de vente'],
  'CRM':                      ['crm', 'outil commercial', 'logiciel vente'],
  'IA':                       ['ia', 'intelligence artificielle', 'chatgpt', 'gpt', 'claude', 'llm', 'ia générative'],
  'Marketing Digital':        ['marketing digital', 'marketing en ligne', 'digital'],
  'Stratégie de contenu':     ['stratégie de contenu', 'content', 'blog', 'publication', 'contenu web'],
  'Réseaux sociaux':          ['réseaux sociaux', 'social media', 'linkedin', 'publication'],
  'PME':                      ['pme', 'tpe', 'entreprise', 'dirigeant'],
  'relation client':          ['relation client', 'client', 'fidélisation', 'onboarding'],
  'visibilité':               ['visibilité', 'visible', 'notoriété', 'présence'],
  'Signaux':                  ['signaux', 'signal d\'achat', 'signal achat', 'détecter'],
  'copywriting':              ['copywriting', 'copy', 'rédaction', 'écriture', 'texte'],
  'Pilotage commercial':      ['pilotage', 'tableau de bord', 'dashboard', 'kpi', 'reporting'],
  'strategie de vente':       ['stratégie de vente', 'vente', 'pipeline', 'tunnel de vente'],
  'leads':                    ['leads', 'lead generation', 'générer des leads', 'génération de leads'],
  'BtoB':                     ['b2b', 'btob', 'entreprise à entreprise'],
  'Site Web':                 ['site web', 'site internet', 'wordpress', 'next.js'],
  'Commercial':               ['commercial', 'vendeur', 'vente'],
  'Méthode des 3A':           ['3a', 'méthode des 3'],
  'n8n':                      ['n8n'],
  'marketing':                ['marketing'],
}

function normalize(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function scoreTitle(title, keywords) {
  const t = normalize(title)
  return keywords.reduce((score, kw) => score + (t.includes(normalize(kw)) ? 1 : 0), 0)
}

async function run() {
  // Charger les catégories Sanity avec leurs IDs
  const sanityCats = await sanity.fetch('*[_type == "category"]{ _id, title }')
  const catMap = Object.fromEntries(sanityCats.map(c => [c.title, c._id]))

  // Charger tous les articles
  const posts = await sanity.fetch('*[_type == "post"]{ _id, title }')
  console.log(`${posts.length} articles à traiter…\n`)

  let updated = 0

  for (const post of posts) {
    const scores = []

    for (const [catTitle, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      const catId = catMap[catTitle]
      if (!catId) continue
      const score = scoreTitle(post.title, keywords)
      if (score > 0) scores.push({ catTitle, catId, score })
    }

    // Trier par score desc, garder les 3 meilleures catégories
    scores.sort((a, b) => b.score - a.score)
    const best = scores.slice(0, 3)

    if (!best.length) {
      console.log(`⚠️  Aucune catégorie trouvée : ${post.title.substring(0,60)}`)
      continue
    }

    const categoryRefs = best.map(({ catId }) => ({
      _type: 'reference',
      _ref: catId,
      _key: catId,
    }))

    await sanity.patch(post._id).set({ categories: categoryRefs }).commit()

    const catNames = best.map(b => `${b.catTitle}(${b.score})`).join(', ')
    console.log(`✅ ${post.title.substring(0, 55)}`)
    console.log(`   → ${catNames}`)
    updated++
  }

  console.log(`\nTerminé — ${updated} articles mis à jour.`)
}

run()
