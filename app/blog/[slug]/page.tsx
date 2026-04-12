import { getPost, getPosts, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post: any) => ({ slug: post.slug.current }))
}

type Props = { params: Promise<{ slug: string }> }

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <main className="max-w-3xl mx-auto px-6 py-32">
      <h1 className="font-display font-extrabold text-se-navy">
        {post.title}
      </h1>
    </main>
  )
}
