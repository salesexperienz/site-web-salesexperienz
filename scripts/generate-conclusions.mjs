/**
 * generate-conclusions.mjs
 * Génère automatiquement une conclusion (3-4 phrases) pour chaque article
 * Sanity sans conclusion existante, via l'API Claude (Anthropic).
 *
 * ⚠️  ORDRE D'EXÉCUTION RECOMMANDÉ :
 *   1. node scripts/generate-conclusions.mjs   ← d'abord (lit la conclusion existante dans le body)
 *   2. node scripts/remove-body-conclusions.mjs ← ensuite (nettoie le body)
 *
 * Usage :
 *   SANITY_TOKEN=sk-... ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-conclusions.mjs
 *
 * Options :
 *   --dry-run    Affiche les conclusions sans écrire dans Sanity
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
  console.error('❌ SANITY_TOKEN manquant. Lance : SANITY_TOKEN=sk-... node scripts/generate-conclusions.mjs')
  process.exit(1)
}
if (!ANTHROPIC_KEY) {
  console.error('❌ ANTHROPIC_API_KEY manquant. Lance : ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-conclusions.mjs')
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

/**
 * Extrait le texte de la section "Conclusion" du body (heading + paragraphes suivants).
 * Retourne null si aucune section Conclusion n'est trouvée.
 */
function extractExistingConclusion(body) {
  if (!body || !Array.isArray(body)) return null

  const conclusionIdx = body.findIndex(block =>
    block._type === 'block' &&
    ['h2', 'h3', 'h4'].includes(block.style) &&
    block.children?.map(c => c.text).join('').trim().toLowerCase() === 'conclusion'
  )

  if (conclusionIdx === -1) return null

  return body
    .slice(conclusionIdx + 1)
    .filter(b => b._type === 'block')
    .map(b => b.children?.map(c => c.text).join('') ?? '')
    .join('\n')
    .trim() || null
}

async function generateConclusion(title, excerpt, bodyText, existingConclusion) {
  const prompt = `Tu es un expert en rédaction de contenu B2B orienté développement commercial.

Génère une conclusion pour cet article de blog :
Titre : "${title}"
${excerpt ? `Résumé : ${excerpt}\n` : ''}${bodyText ? `Contenu (extrait) : ${bodyText.slice(0, 700)}\n` : ''}${existingConclusion ? `Conclusion actuelle de l'article (à améliorer et dépasser) : "${existingConclusion}"\n` : ''}

RÈGLES STRICTES :
1. Exactement 3 à 4 phrases
2. Adapte TON TON au ton de l'article (tutoiement si l'article tutoie, même registre de langage)
3. Phrase 1 : synthèse percutante — ce que le lecteur doit retenir
4. Phrase 2 : conséquence concrète ou résultat attendu s'il applique les conseils
5. Phrase 3 : action immédiate et précise à faire dès maintenant (conseil actionnable)
6. Phrase 4 (optionnelle) : ouverture — perspective plus large ou prochaine étape logique
7. Va PLUS LOIN que la conclusion actuelle si elle existe : sois plus précis, plus actionnable, plus impactant
8. Aucun lien, aucune parenthèse, aucun titre, aucun formatage

Réponds UNIQUEMENT avec le texte de la conclusion, sans guillemets ni formatage.`

  const msg = await anthropic.messages.create({
    model:      'claude-haiku-4-5-20251001',
    max_tokens: 250,
    messages:   [{ role: 'user', content: prompt }],
  })

  return msg.content[0].text.trim()
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🚀 Génération des conclusions${DRY_RUN ? ' (DRY RUN — pas d\'écriture)' : ''}\n`)

  const posts = await sanity.fetch(`
    *[_type == "post" && (!defined(conclusion) || conclusion == "")] | order(publishedAt desc) {
      _id, title, excerpt, body
    }
  `)

  const toProcess = posts.slice(0, LIMIT === Infinity ? posts.length : LIMIT)
  console.log(`📋 ${posts.length} articles sans conclusion — traitement de ${toProcess.length}\n`)

  let success = 0
  let errors  = 0

  for (let i = 0; i < toProcess.length; i++) {
    const post = toProcess[i]
    const num  = `[${i + 1}/${toProcess.length}]`

    try {
      const bodyText           = extractText(post.body)
      const existingConclusion = extractExistingConclusion(post.body)
      const conclusion         = await generateConclusion(post.title, post.excerpt, bodyText, existingConclusion)

      console.log(`${num} ✅ "${post.title}"`)
      if (existingConclusion) {
        console.log(`       📌 Conclusion existante : ${existingConclusion.slice(0, 80)}…`)
      }
      console.log(`       → ${conclusion}\n`)

      if (!DRY_RUN) {
        await sanity.patch(post._id).set({ conclusion }).commit()
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
