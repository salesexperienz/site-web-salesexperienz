/**
 * generate-introductions.mjs
 * Génère automatiquement une introduction (3-4 phrases) pour chaque article
 * Sanity sans introduction existante, via l'API Claude (Anthropic).
 *
 * Usage :
 *   SANITY_TOKEN=sk-... ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-introductions.mjs
 *
 * Options :
 *   --dry-run    Affiche les introductions sans écrire dans Sanity
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
  console.error('❌ SANITY_TOKEN manquant. Lance : SANITY_TOKEN=sk-... node scripts/generate-introductions.mjs')
  process.exit(1)
}
if (!ANTHROPIC_KEY) {
  console.error('❌ ANTHROPIC_API_KEY manquant. Lance : ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-introductions.mjs')
  process.exit(1)
}

// ─── Clients ─────────────────────────────────────────────────────────────────

const sanity = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset:   SANITY_DATASET,
  apiVersion: SANITY_API_VER,
  token:     SANITY_TOKEN,
  useCdn:    false,
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

async function generateIntroduction(title, excerpt, bodyText) {
  const prompt = `Tu es un expert en rédaction de contenu B2B orienté développement commercial.

Génère une introduction pour cet article de blog :
Titre : "${title}"
${excerpt ? `Résumé : ${excerpt}\n` : ''}${bodyText ? `Début du contenu : ${bodyText.slice(0, 800)}\n` : ''}

RÈGLES STRICTES :
1. Exactement 3 à 4 phrases
2. Adapte TON TON au ton de l'article (tutoiement si l'article tutoie, vouvoiement sinon, même registre de langage)
3. Phrase 1 : pose le contexte ou la problématique que vit le lecteur
4. Phrase 2 : amplifie le problème ou la frustration (le "pourquoi c'est important")
5. Phrase 3 : annonce ce que l'article va apporter concrètement
6. Phrase 4 (optionnelle) : hook — donne envie de continuer la lecture
7. Aucun lien, aucune parenthèse, aucun titre, aucun formatage
8. L'introduction doit être autonome et percutante

Réponds UNIQUEMENT avec le texte de l'introduction, sans guillemets ni formatage.`

  const msg = await anthropic.messages.create({
    model:      'claude-haiku-4-5-20251001',
    max_tokens: 250,
    messages:   [{ role: 'user', content: prompt }],
  })

  return msg.content[0].text.trim()
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🚀 Génération des introductions${DRY_RUN ? ' (DRY RUN — pas d\'écriture)' : ''}\n`)

  const posts = await sanity.fetch(`
    *[_type == "post" && (!defined(introduction) || introduction == "")] | order(publishedAt desc) {
      _id, title, excerpt, body
    }
  `)

  const toProcess = posts.slice(0, LIMIT === Infinity ? posts.length : LIMIT)
  console.log(`📋 ${posts.length} articles sans introduction — traitement de ${toProcess.length}\n`)

  let success = 0
  let errors  = 0

  for (let i = 0; i < toProcess.length; i++) {
    const post = toProcess[i]
    const num  = `[${i + 1}/${toProcess.length}]`

    try {
      const bodyText     = extractText(post.body)
      const introduction = await generateIntroduction(post.title, post.excerpt, bodyText)

      console.log(`${num} ✅ "${post.title}"`)
      console.log(`       → ${introduction}\n`)

      if (!DRY_RUN) {
        await sanity.patch(post._id).set({ introduction }).commit()
      }

      success++
      if (i < toProcess.length - 1) await sleep(500)

    } catch (err) {
      console.error(`${num} ❌ "${post.title}" — ${err.message}\n`)
      errors++
      await sleep(1000)
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
