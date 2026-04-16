import Link from 'next/link'
import { getRecentPosts, urlFor } from '@/lib/sanity'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  mainImage?: any
  publishedAt?: string
  categories?: string[]
  readingTime?: number
}

const CAT_PALETTE = [
  'bg-teal-100 text-teal-700',
  'bg-orange-100 text-orange-700',
  'bg-blue-100 text-blue-700',
  'bg-violet-100 text-violet-700',
  'bg-pink-100 text-pink-700',
  'bg-amber-100 text-amber-700',
  'bg-emerald-100 text-emerald-700',
  'bg-indigo-100 text-indigo-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
]

function tagClass(cat: string) {
  let h = 0
  for (let i = 0; i < cat.length; i++) h = ((h * 31) + cat.charCodeAt(i)) >>> 0
  return CAT_PALETTE[h % CAT_PALETTE.length]
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const GRADIENTS = [
  'from-[#0D1B3E] via-[#1E2D5A] to-[#0C2E28]',
  'from-[#0C2E28] via-[#143B33] to-[#0D1B3E]',
  'from-[#162248] via-[#1E2D5A] to-[#0C2E28]',
]

function PlaceholderImg({ index }: { index: number }) {
  return (
    <div className={`bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]} w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
      <svg className="w-10 h-10 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  )
}

export default async function RecentArticles() {
  const posts: Post[] = await getRecentPosts(3)

  if (!posts || posts.length === 0) return null

  return (
    <section className="bg-[#edf0f4] py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-se-teal text-[11px] font-bold uppercase tracking-[0.15em] mb-2">
              Sur le blog
            </p>
            <h2 className="font-display font-bold text-[26px] md:text-[32px] text-se-navy leading-tight">
              Derniers articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-[13px] font-semibold text-se-teal hover:text-se-orange transition-colors duration-200 whitespace-nowrap"
          >
            Voir tous les articles
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.13)] hover:-translate-y-1 transition-all duration-200"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {post.mainImage
                  ? <img
                      src={urlFor(post.mainImage).width(600).height(340).url()}
                      alt={post.mainImage.alt || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  : <PlaceholderImg index={index} />
                }
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                {/* Catégories */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.categories.map((c) => (
                      <span key={c} className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${tagClass(c)}`}>
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                <h3 className="font-display font-bold text-[17px] text-se-navy leading-snug mb-2 group-hover:text-se-orange transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-se-navy text-[13px] leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 text-[12px] text-se-navy/40">
                  {post.publishedAt && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(post.publishedAt)}
                    </span>
                  )}
                  {post.readingTime != null && post.readingTime > 0 && (
                    <span className="flex items-center gap-1 ml-auto whitespace-nowrap">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readingTime} min
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA mobile */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-se-teal hover:text-se-orange transition-colors duration-200"
          >
            Voir tous les articles
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}
