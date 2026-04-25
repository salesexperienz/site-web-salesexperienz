import { MetadataRoute } from 'next'
import { getPostsForSitemap } from '@/lib/sanity'

const SITE_URL = 'https://www.salesexperienz.fr'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Pages statiques ────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/services/seo-geo-machine`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/services/deepsignal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/agence-marketing-automatisation-sete`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/expert-automatisation-commerciale-paris`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // ── Articles Sanity ────────────────────────────────────────────────────────
  let articlePages: MetadataRoute.Sitemap = []
  try {
    const posts = await getPostsForSitemap()
    articlePages = posts.map((post: { slug: string; publishedAt?: string; _updatedAt?: string }) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post._updatedAt ? new Date(post._updatedAt) : post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch {
    // Si Sanity est inaccessible au build, on continue avec les pages statiques
  }

  return [...staticPages, ...articlePages]
}
