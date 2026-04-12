import { createClient } from '@sanity/client'

const sanity = createClient({
  projectId: '0wgbhtrw',
  dataset: 'production',
  token: 'sk2SCaOIjrTY8dDVlwRuxYVo3Wd6jK48qU04EiyFz3gPiCTMJsKRTAs3KuO6SSAKEWBn6wK9H2AOhWTGoFR16IvtX6mltPUfSqhyPXFFn7DSI9yOttQo1tcUK61T7xT1MznUKtMmP3NEn2K9E2y4RL6Wlcun3423IRMfBb1oPFjhzEgqvIMD',
  apiVersion: '2026-04-12',
  useCdn: false,
})

const WP_URL = 'https://salesexperienz.local/wp-json/wp/v2'

// Désactiver la vérification SSL pour le local
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

async function fetchAllPosts() {
  let page = 1
  let allPosts = []
  
  while (true) {
    const res = await fetch(`${WP_URL}/posts?per_page=20&page=${page}&_embed`)
    if (!res.ok) break
    const posts = await res.json()
    if (posts.length === 0) break
    allPosts = [...allPosts, ...posts]
    console.log(`Page ${page} : ${posts.length} articles récupérés`)
    page++
  }
  
  return allPosts
}

function wpToSanityPost(wp) {
  return {
    _type: 'post',
    _id: `wp-${wp.id}`,
    title: wp.title.rendered.replace(/&#8217;/g, "'").replace(/&amp;/g, '&'),
    slug: { _type: 'slug', current: wp.slug },
    publishedAt: wp.date,
    excerpt: wp.excerpt.rendered
      .replace(/<[^>]*>/g, '')
      .replace(/&#8217;/g, "'")
      .replace(/&amp;/g, '&')
      .trim()
      .substring(0, 300),
    body: [
      {
        _type: 'block',
        _key: `block-${wp.id}`,
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: `span-${wp.id}`,
            text: wp.content.rendered
              .replace(/<[^>]*>/g, '')
              .replace(/&#8217;/g, "'")
              .replace(/&amp;/g, '&')
              .replace(/\n\n+/g, '\n\n')
              .trim()
          }
        ]
      }
    ]
  }
}

async function migrate() {
  console.log('Récupération des articles WordPress...')
  const wpPosts = await fetchAllPosts()
  console.log(`Total : ${wpPosts.length} articles trouvés`)

  for (const wp of wpPosts) {
    const sanityPost = wpToSanityPost(wp)
    try {
      await sanity.createOrReplace(sanityPost)
      console.log(`✅ Migré : ${sanityPost.title}`)
    } catch (err) {
      console.error(`❌ Erreur sur : ${sanityPost.title}`, err.message)
    }
  }

  console.log('Migration terminée !')
}

migrate()
