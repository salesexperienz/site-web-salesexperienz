/**
 * remove-body-conclusions.mjs
 * Supprime le heading "Conclusion" et les blocs qui le suivent dans le body
 * Portable Text de chaque article Sanity.
 *
 * ⚠️  ORDRE D'EXÉCUTION RECOMMANDÉ :
 *   1. node scripts/generate-conclusions.mjs   ← d'abord (lit la conclusion existante)
 *   2. node scripts/remove-body-conclusions.mjs ← ensuite (nettoie le body)
 *
 * Usage :
 *   SANITY_TOKEN=sk-... node scripts/remove-body-conclusions.mjs
 *
 * Options :
 *   --dry-run    Affiche les modifications sans écrire dans Sanity
 *   --limit N    Traite seulement N articles (pour tester)
 */

import { createClient } from '@sanity/client'

// ─── Config ──────────────────────────────────────────────────────────────────

const SANITY_PROJECT_ID = '0wgbhtrw'
const SANITY_DATASET    = 'production'
const SANITY_API_VER    = '2026-04-12'
const SANITY_TOKEN      = process.env.SANITY_TOKEN

const DRY_RUN = process.argv.includes('--dry-run')
const LIMIT   = (() => {
  const i = process.argv.indexOf('--limit')
  return i !== -1 ? parseInt(process.argv[i + 1], 10) : Infinity
})()

// ─── Validation ───────────────────────────────────────────────────────────────

if (!SANITY_TOKEN) {
  console.error('❌ SANITY_TOKEN manquant. Lance : SANITY_TOKEN=sk-... node scripts/remove-body-conclusions.mjs')
  process.exit(1)
}

// ─── Client ──────────────────────────────────────────────────────────────────

const sanity = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset:   SANITY_DATASET,
  apiVersion: SANITY_API_VER,
  token:     SANITY_TOKEN,
  useCdn:    false,
})

// ─── Helper ──────────────────────────────────────────────────────────────────

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

/**
 * Trouve l'index du heading "Conclusion" dans le body Portable Text.
 * Cherche un bloc de type 'block' avec style h2/h3/h4 dont le texte est "Conclusion".
 */
function findConclusionIndex(body) {
  if (!body || !Array.isArray(body)) return -1
  return body.findIndex(block =>
    block._type === 'block' &&
    ['h2', 'h3', 'h4'].includes(block.style) &&
    block.children?.map(c => c.text).join('').trim().toLowerCase() === 'conclusion'
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🧹 Suppression des sections "Conclusion" dans le body${DRY_RUN ? ' (DRY RUN — pas d\'écriture)' : ''}\n`)

  // Récupère les IDs + titres d'abord (requête légère)
  const ids = await sanity.fetch(`
    *[_type == "post" && defined(body)] | order(publishedAt desc) { _id, title }
  `)

  const toProcess = ids.slice(0, LIMIT === Infinity ? ids.length : LIMIT)
  console.log(`📋 ${ids.length} articles avec body — traitement de ${toProcess.length}\n`)

  let modified = 0
  let skipped  = 0
  let errors   = 0

  for (let i = 0; i < toProcess.length; i++) {
    const { _id, title } = toProcess[i]
    const num  = `[${i + 1}/${toProcess.length}]`

    try {
      // Fetch le body de cet article individuellement
      const post = await sanity.fetch(
        `*[_id == $id][0] { _id, title, body }`,
        { id: _id }
      )

      const conclusionIdx = findConclusionIndex(post.body)

      if (conclusionIdx === -1) {
        console.log(`${num} ⏭  "${title}" — pas de heading Conclusion`)
        skipped++
        continue
      }

      // Blocs supprimés : le heading + tout ce qui suit
      const removed = post.body.slice(conclusionIdx)
      const newBody = post.body.slice(0, conclusionIdx)

      console.log(`${num} ✅ "${title}"`)
      console.log(`       🗑  Suppression de ${removed.length} bloc(s) à partir de l'index ${conclusionIdx}`)
      if (removed.length > 0) {
        const sample = removed
          .filter(b => b._type === 'block')
          .map(b => b.children?.map(c => c.text).join('') ?? '')
          .join(' ')
          .slice(0, 80)
        console.log(`       📄 Contenu supprimé : "${sample}…"`)
      }
      console.log()

      if (!DRY_RUN) {
        await sanity.patch(post._id).set({ body: newBody }).commit()
      }

      modified++
      if (i < toProcess.length - 1) await sleep(300)

    } catch (err) {
      console.error(`${num} ❌ "${title}" — ${err.message}\n`)
      errors++
      await sleep(500)
    }
  }

  console.log(`─────────────────────────────────────────`)
  console.log(`✅ Modifiés : ${modified} | ⏭  Ignorés : ${skipped} | ❌ Erreurs : ${errors}`)
  if (DRY_RUN) console.log(`ℹ️  Mode DRY RUN — aucune donnée écrite dans Sanity`)
  console.log(`─────────────────────────────────────────\n`)
}

main().catch(err => {
  console.error('Erreur fatale :', err)
  process.exit(1)
})
