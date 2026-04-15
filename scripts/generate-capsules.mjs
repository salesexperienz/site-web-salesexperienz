/**
 * generate-capsules.mjs
 * Génère automatiquement les capsules GEO pour tous les articles Sanity
 * sans capsule existante, via l'API Claude (Anthropic).
 *
 * Usage :
 *   SANITY_TOKEN=sk-... ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-capsules.mjs
 *
 * Options :
 *   --dry-run    Affiche les capsules sans écrire dans Sanity
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
  console.error('❌ SANITY_TOKEN manquant. Lance : SANITY_TOKEN=sk-... node scripts/generate-capsules.mjs')
  process.exit(1)
}
if (!ANTHROPIC_KEY) {
  console.error('❌ ANTHROPIC_API_KEY manquant. Lance : ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-capsules.mjs')
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
    return toPlainText(body).slice(0, 1200)
  } catch {
    return body
      .filter(b => b._type === 'block')
      .map(b => b.children?.map(c => c.text).join('') ?? '')
      .join('\n')
      .slice(0, 1200)
  }
}

async function generateCapsule(title, excerpt, bodyText) {
  const prompt = `Tu es un expert en GEO (Generative Engine Optimization) spécialisé en développement commercial B2B.

Génère une capsule GEO pour cet article :
Titre : "${title}"
${excerpt ? `Résumé : ${excerpt}\n` : ''}${bodyText ? `Début du contenu : ${bodyText.slice(0, 600)}\n` : ''}

RÈGLES STRICTES de la Méthode Capsule (respecte-les toutes) :
1. Exactement 2 à 3 phrases
2. Phrase 1 : la réponse directe à la question du titre (commence par "Pour", "La clé", "Le secret", ou similaire)
3. Phrase 2 : la conséquence ou le risque si on ne suit pas ce conseil
4. Phrase 3 (optionnelle) : ce que cet article apporte concrètement au lecteur
5. La capsule doit être AUTONOME : quelqu'un qui ne lit que ces phrases comprend la réponse complète
6. Ton factuel et affirmatif, tutoiement, zéro bullshit
7. Aucun lien, aucune parenthèse, aucun formatage

EXEMPLES de bonnes capsules :
✅ "Pour réussir ton développement commercial, définis ta cible et ton positionnement avant d'embaucher un commercial. Sans cette base, tu brûles ton budget sur des prospects qui ne convertiront jamais. Cet article te donne les 4 étapes concrètes pour construire cette fondation."
✅ "Pour prospecter efficacement en B2B, cible les entreprises qui ont un problème urgent et un budget — pas juste un intérêt. Un prospect sans douleur réelle ne signera jamais, peu importe la qualité de ton pitch. Tu trouveras ici les critères de qualification qui font gagner du temps."

Réponds UNIQUEMENT avec le texte de la capsule, sans guillemets ni formatage.`

  const msg = await anthropic.messages.create({
    model:      'claude-haiku-4-5-20251001',
    max_tokens: 200,
    messages:   [{ role: 'user', content: prompt }],
  })

  return msg.content[0].text.trim()
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🚀 Génération des capsules GEO${DRY_RUN ? ' (DRY RUN — pas d\'écriture)' : ''}\n`)

  // Récupère tous les articles sans capsule
  const posts = await sanity.fetch(`
    *[_type == "post" && (!defined(capsule) || capsule == "")] | order(publishedAt desc) {
      _id, title, excerpt, body
    }
  `)

  const toProcess = posts.slice(0, LIMIT === Infinity ? posts.length : LIMIT)
  console.log(`📋 ${posts.length} articles sans capsule — traitement de ${toProcess.length}\n`)

  let success = 0
  let errors  = 0

  for (let i = 0; i < toProcess.length; i++) {
    const post = toProcess[i]
    const num  = `[${i + 1}/${toProcess.length}]`

    try {
      const bodyText = extractText(post.body)
      const capsule  = await generateCapsule(post.title, post.excerpt, bodyText)

      console.log(`${num} ✅ "${post.title}"`)
      console.log(`       → ${capsule}\n`)

      if (!DRY_RUN) {
        await sanity.patch(post._id).set({ capsule }).commit()
      }

      success++

      // Pause entre chaque appel pour respecter les rate limits
      if (i < toProcess.length - 1) await sleep(500)

    } catch (err) {
      console.error(`${num} ❌ "${post.title}" — ${err.message}\n`)
      errors++
      await sleep(1000)
    }
  }

  console.log(`\n─────────────────────────────────────────`)
  console.log(`✅ Succès : ${success} | ❌ Erreurs : ${errors}`)
  if (DRY_RUN) console.log(`ℹ️  Mode DRY RUN — aucune donnée écrite dans Sanity`)
  console.log(`─────────────────────────────────────────\n`)
}

main().catch(err => {
  console.error('Erreur fatale :', err)
  process.exit(1)
})
