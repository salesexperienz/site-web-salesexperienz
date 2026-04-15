/**
 * assign-authors-categories.mjs
 *
 * Pour chaque article Sanity issu de WP :
 *  1. Assigne l'auteur Laurent Guyonvarch
 *  2. Récupère les catégories WP et les mappe aux catégories Sanity existantes
 *  3. Récupère les tags WP et les enregistre dans le champ `tags` (array de strings)
 *
 * Usage : node scripts/assign-authors-categories.mjs
 */

import { createClient } from '@sanity/client'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const sanity = createClient({
  projectId: '0wgbhtrw',
  dataset: 'production',
  token:process.env.'skxtL49c9UpIHB0j1tNr8KTkuAkvxrwhDh5RmeeUEOdhTkHppRbZZLwMLrV4KA83Di9llPugnqeh8R3DsFZuvseBKqP96m7GGGwM5rJCUeG1XLE71g4ClzhpLEPmJNi5mQUKJn5YCinTybzzlGa3RHJL8nbgq1sqjHDwgOiD4ZceQINcByq2',
  apiVersion: '2026-04-12',
  useCdn: false,
})

const WP_URL   = 'https://salesexperienz.local/wp-json/wp/v2'
const AUTHOR_ID = '83f1fe05-d4e9-4b92-80b3-33f44f02f76a' // Laurent Guyonvarch

// ─── Normalise un titre pour la comparaison ───────────────────────────────────
function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // retire les accents
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
}

// ─── Récupère tous les articles WP avec leurs termes ─────────────────────────
async function fetchAllWpPosts() {
  let page = 1
  const all = []
  while (true) {
    const res = await fetch(`${WP_URL}/posts?per_page=20&page=${page}&_embed`)
    if (!res.ok) break
    const posts = await res.json()
    if (!posts.length) break
    all.push(...posts)
    page++
  }
  return all
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log('Chargement des catégories Sanity…')
  const sanityCats = await sanity.fetch('*[_type == "category"]{ _id, title }')

  // Index normalisé titre → _id
  const catIndex = {}
  for (const c of sanityCats) {
    catIndex[normalize(c.title)] = c._id
  }

  console.log('Récupération des articles WordPress…')
  const wpPosts = await fetchAllWpPosts()
  console.log(`${wpPosts.length} articles WP trouvés.\n`)

  let updated = 0
  let skipped = 0

  for (const wp of wpPosts) {
    const sanityId = `wp-${wp.id}`

    // ── Catégories WP → références Sanity ────────────────────────────────
    const wpCats  = wp._embedded?.['wp:term']?.[0] ?? []  // catégories
    const wpTags  = wp._embedded?.['wp:term']?.[1] ?? []  // tags

    const categoryRefs = []
    const unmapped = []

    for (const wpCat of wpCats) {
      const key = normalize(wpCat.name)
      const sanityId_ = catIndex[key]
      if (sanityId_) {
        categoryRefs.push({
          _type: 'reference',
          _ref: sanityId_,
          _key: sanityId_,
        })
      } else {
        unmapped.push(wpCat.name)
      }
    }

    const tags = wpTags.map(t => t.name)

    // ── Patch Sanity ──────────────────────────────────────────────────────
    try {
      await sanity.patch(sanityId).set({
        author: { _type: 'reference', _ref: AUTHOR_ID },
        ...(categoryRefs.length && { categories: categoryRefs }),
        ...(tags.length && { tags }),
      }).commit()

      const catNames = wpCats.map(c => c.name).join(', ') || '—'
      console.log(`✅ ${wp.title.rendered.substring(0, 60)}`)
      console.log(`   cats: ${catNames}${unmapped.length ? ` | ⚠️ non mappés: ${unmapped.join(', ')}` : ''}`)
      updated++
    } catch (err) {
      console.error(`❌ wp-${wp.id}:`, err.message)
      skipped++
    }
  }

  console.log(`\nTerminé — ${updated} mis à jour, ${skipped} erreurs.`)
}

run()
