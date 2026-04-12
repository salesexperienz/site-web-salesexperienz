import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0wgbhtrw',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-04-12',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

// Requête pour le contenu du site
export async function getSiteSettings() {
  return client.fetch(`*[_type == "siteSettings"][0]`)
}

// Requête pour tous les articles
export async function getPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, excerpt, mainImage, publishedAt,
      "categories": categories[]->title,
      "author": author->name
    }
  `)
}

// Requête pour un article par slug
export async function getPost(slug: string) {
  return client.fetch(`
    *[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, excerpt, mainImage, publishedAt, body,
      seoTitle, seoDescription,
      "categories": categories[]->title,
      "author": author->name
    }
  `, { slug })
}
