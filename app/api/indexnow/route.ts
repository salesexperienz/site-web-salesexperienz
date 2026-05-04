import { NextRequest, NextResponse } from 'next/server'
import { getPostsForSitemap } from '@/lib/sanity'

const SITE_URL   = 'https://www.salesexperienz.fr'
const INDEX_NOW_KEY = '4179406d456e457b935114f81e0f1179'

// URLs statiques toujours à soumettre
const STATIC_URLS = [
  SITE_URL,
  `${SITE_URL}/blog`,
  `${SITE_URL}/services/seo-geo-machine`,
  `${SITE_URL}/services/deepsignal`,
  `${SITE_URL}/agence-marketing-automatisation-sete`,
  `${SITE_URL}/calculateur-roi`,
  `${SITE_URL}/expert-automatisation-commerciale-paris`,
  `${SITE_URL}/expert-automatisation-commerciale-lyon`,
  `${SITE_URL}/expert-automatisation-commerciale-marseille`,
  `${SITE_URL}/expert-automatisation-commerciale-toulouse`,
  `${SITE_URL}/expert-automatisation-commerciale-nantes`,
  `${SITE_URL}/expert-automatisation-commerciale-nice`,
]

// ─── POST /api/indexnow ────────────────────────────────────────────────────────
// Appelable manuellement ou par webhook Sanity
export async function POST(req: NextRequest) {
  // Sécurité minimale : token secret en header ou query
  const secret = req.nextUrl.searchParams.get('secret') || req.headers.get('x-indexnow-secret')
  if (secret !== process.env.INDEXNOW_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Récupérer toutes les URLs d'articles Sanity
    const posts = await getPostsForSitemap()
    const articleUrls = posts.map((p: { slug: string }) => `${SITE_URL}/blog/${p.slug}`)
    const allUrls = [...STATIC_URLS, ...articleUrls]

    // Soumission IndexNow (Bing, Yandex, Seznam, Naver…)
    const payload = {
      host: 'www.salesexperienz.fr',
      key: INDEX_NOW_KEY,
      keyLocation: `${SITE_URL}/${INDEX_NOW_KEY}.txt`,
      urlList: allUrls,
    }

    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    })

    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      urlsSubmitted: allUrls.length,
      urls: allUrls,
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// ─── GET /api/indexnow — version publique sans auth, slug unique ──────────────
// Appelé par Sanity webhook sur publication d'un nouvel article
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })

  const url = `${SITE_URL}/blog/${slug}`

  const res = await fetch(
    `https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${INDEX_NOW_KEY}`,
  )

  return NextResponse.json({ ok: res.ok, status: res.status, url })
}
