import { getPosts } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'
import Link from 'next/link'

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="max-w-5xl mx-auto px-6 py-32">
      <h1 className="font-display font-extrabold text-[40px] text-se-navy mb-4">
        Blog
      </h1>
      <p className="text-se-navy/60 text-[17px] mb-12">
        Automatisation, IA, croissance — nos derniers articles.
      </p>

      {posts.length === 0 && (
        <p className="text-se-navy/40">Aucun article publié pour l'instant.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post: any) => (
          <Link key={post._id} href={`/blog/${post.slug.current}`}
            className="group border border-se-navy/10 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200">
            {post.mainImage && (
              <img
                src={urlFor(post.mainImage).width(600).height(340).url()}
                alt={post.mainImage.alt || post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              {post.categories?.length > 0 && (
                <span className="text-[11px] font-semibold uppercase tracking-widest text-se-teal">
                  {post.categories[0]}
                </span>
              )}
              <h2 className="font-display font-bold text-[22px] text-se-navy mt-2 mb-3 group-hover:text-se-orange transition-colors">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-se-navy/60 text-[15px] leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              )}
              <p className="text-[13px] text-se-navy/40 mt-4">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
