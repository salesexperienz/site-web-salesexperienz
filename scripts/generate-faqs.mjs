/**
 * generate-faqs.mjs
 * Génère automatiquement les FAQ GEO pour tous les articles Sanity
 * sans FAQ existante, via l'API Claude (Anthropic).
 *
 * Usage :
 *   SANITY_TOKEN="sk-..." ANTHROPIC_API_KEY="sk-ant-..." node scripts/generate-faqs.mjs
 *
 * Options :
 *   --dry-run    Affiche les FAQ sans écrire dans Sanity
 *   --limit N    Traite seulement N articles (pour tester)
 */

import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@sanity/client'
import { toPlainText } from '@portabletext/toolkit'

// ─── Config ──────────────────────────────────────────────────────────────────

const SANITY_PROJECT_ID = '0wgbhtrw'
const SANITY_DATASET    = 'production'
const SANITY_API_VER    = '2026-04-12'
const SANITY_TOKEN      = process.env.SANITY_TOKEN
const ANTHROPIC_KEY     = process.env.ANTHROPIC_API_KEY

const DRY_RUN = process.argv.includes('--dry-run')
const LIMIT   = (() => {
  const i = process.argv.indexOf('--limit')
  return i !== -1 ? parseInt(process.argv[i + 1], 10) : Infinity
})()

// ─── Validation ───────────────────────────────────────────────────────────────

if (!SANITY_TOKEN) {
  console.error('❌ SANITY_TOKEN manquant.')
  process.exit(1)
}
if (!ANTHROPIC_KEY) {
  console.error('❌ ANTHROPIC_API_KEY manquant.')
  process.exit(1)
}

// ─── Clients ─────────────────────────────────────────────────────────────────

const sanity = createClient({
  projectId:  SANITY_PROJECT_ID,
  dataset:    SANITY_DATASET,
  apiVersion: SANITY_API_VER,
  token:      SANITY_TOKEN,
  useCdn:     false,
})

const anthropic = new Anthropic({ apiKey: ANTHROPIC_KEY })

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

function extractText(body) {
  if (!body || !Array.isArray(body)) return ''
  try {
    return toPlainText(body).slice(0, 1500)
  } catch {
    return body
      .filter(b => b._type === 'block')
      .map(b => b.children?.map(c => c.text).join('') ?? '')
      .join('\n')
      .slice(0, 1500)
  }
}

async function generateFaq(title, excerpt, bodyText) {
  const prompt = `Tu es un expert en GEO (Generative Engine Optimization) et en développement commercial B2B.

Génère une FAQ GEO pour cet article de blog :
Titre : "${title}"
${excerpt ? `Résumé : ${excerpt}\n` : ''}${bodyText ? `Contenu (extrait) : ${bodyText.slice(0, 800)}\n` : ''}

RÈGLES STRICTES :
1. Génère exactement 4 questions/réponses
2. Les questions doivent être celles que les lecteurs posent VRAIMENT (pas génériques)
3. Chaque réponse : 2 à 3 phrases MAX, directes, factuelles, en tutoiement
4. Les réponses doivent être AUTONOMES : compréhensibles sans lire l'article
5. Ton affirmatif, zéro bullshit, zéro jargon creux
6. Optimisé pour être extrait par ChatGPT, Perplexity, Google SGE
7. Les questions doivent couvrir des angles différents de l'article

FORMAT DE RÉPONSE (JSON strict, rien d'autre) :
[
  { "question": "...", "answer": "..." },
  { "question": "...", "answer": "..." },
  { "question": "...", "answer": "..." },
  { "question": "...", "answer": "..." }
]`

  const msg = await anthropic.messages.create({
    model:      'claude-haiku-4-5-20251001',
    max_tokens: 600,
    messages:   [{ role: 'user', content: prompt }],
  })

  const text = msg.content[0].text.trim()

  // Extraction JSON robuste
  const match = text.match(/\[[\s\S]*\]/)
  if (!match) throw new Error('Réponse non JSON : ' + text.slice(0, 100))

  const items = JSON.parse(match[0])
  if (!Array.isArray(items)) throw new Error('JSON invalide')

  return items.map((item, i) => ({
    _type: 'faqItem',
    _key:  `faq-${Date.now()}-${i}`,
    question: String(item.question || '').trim(),
    answer:   String(item.answer   || '').trim(),
  }))
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🚀 Génération des FAQ GEO${DRY_RUN ? ' (DRY RUN — pas d\'écriture)' : ''}\n`)

  const posts = await sanity.fetch(`
    *[_type == "post" && (!defined(faq) || count(faq) == 0)] | order(publishedAt desc) {
      _id, title, excerpt, body
    }
  `)

  const toProcess = posts.slice(0, LIMIT === Infinity ? posts.length : LIMIT)
  console.log(`📋 ${posts.length} articles sans FAQ — traitement de ${toProcess.length}\n`)

  let success = 0
  let errors  = 0

  for (let i = 0; i < toProcess.length; i++) {
    const post = toProcess[i]
    const num  = `[${i + 1}/${toProcess.length}]`

    try {
      const bodyText = extractText(post.body)
      const faq      = await generateFaq(post.title, post.excerpt, bodyText)

      console.log(`${num} ✅ "${post.title}"`)
      faq.forEach((item, idx) => {
        console.log(`       Q${idx + 1}: ${item.question}`)
        console.log(`       R${idx + 1}: ${item.answer}`)
        console.log()
      })

      if (!DRY_RUN) {
        await sanity.patch(post._id).set({ faq }).commit()
      }

      success++
      if (i < toProcess.length - 1) await sleep(600)

    } catch (err) {
      console.error(`${num} ❌ "${post.title}" — ${err.message}\n`)
      errors++
      await sleep(1200)
    }
  }

  console.log(`─────────────────────────────────────────`)
  console.log(`✅ Succès : ${success} | ❌ Erreurs : ${errors}`)
  if (DRY_RUN) console.log(`ℹ️  Mode DRY RUN — aucune donnée écrite dans Sanity`)
  console.log(`─────────────────────────────────────────\n`)
}

main().catch(err => {
  console.error('Erreur fatale :', err)
  process.exit(1)
})
