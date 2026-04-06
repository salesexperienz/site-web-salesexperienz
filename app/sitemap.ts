import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://salesexperienz.fr',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // ── Décommente au fur et à mesure que tu crées ces pages ──
    // {
    //   url: 'https://salesexperienz.fr/a-propos',
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 0.8,
    // },
    // {
    //   url: 'https://salesexperienz.fr/services/auto-blog-seo',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.9,
    // },
    {
      url: 'https://salesexperienz.fr/services/deepsignal',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // {
    //   url: 'https://salesexperienz.fr/services/impact-video',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.9,
    // },
  ]
}
