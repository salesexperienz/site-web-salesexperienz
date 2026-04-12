import { getPost, getPosts, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ArticleSidebar from '@/components/ArticleSidebar'
import ArticleFooterBlocks from '@/components/ArticleFooterBlocks'
import SocialBlock from '@/components/SocialBlock'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post: any) => ({ slug: post.slug.current }))
}

type Props = { params: Promise<{ slug: string }> }

// ─── Extraction du sommaire depuis le body PortableText ───────────────────────
function extractToc(body: any[]): { id: string; text: string; level: number }[] {
  if (!Array.isArray(body)) return []
  return body
    .filter((b) => b._type === 'block' && ['h2', 'h3'].includes(b.style))
    .map((b) => {
      const text = b.children?.map((c: any) => c.text).join('') ?? ''
      const id = text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
      return { id, text, level: b.style === 'h2' ? 2 : 3 }
    })
    .filter((item) => item.text.length > 0)
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ─── Composants PortableText ──────────────────────────────────────────────────
// Ajoute un id sur les h2/h3 pour le sommaire
function headingId(children: any) {
  const text = Array.isArray(children)
    ? children.map((c: any) => (typeof c === 'string' ? c : c?.props?.children ?? '')).join('')
    : String(children)
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

const ptComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-[16px] text-gray-700 leading-[1.85] mb-5">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 id={headingId(children)}
        className="font-display font-extrabold text-[26px] text-se-navy mt-12 mb-4 leading-tight scroll-mt-28">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 id={headingId(children)}
        className="font-display font-bold text-[20px] text-se-navy mt-8 mb-3 leading-snug scroll-mt-28">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="font-display font-bold text-[17px] text-se-navy mt-6 mb-2 scroll-mt-28">
        {children}
      </h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-se-orange pl-5 py-1 my-6 bg-se-orange/5 rounded-r-xl">
        <p className="text-se-navy/80 text-[15px] italic leading-relaxed">{children}</p>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-bold text-se-navy">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 text-se-orange text-[14px] px-1.5 py-0.5 rounded font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer"
        className="text-se-orange underline underline-offset-2 hover:text-se-orange-h transition-colors">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="my-5 space-y-2 pl-5">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-5 space-y-2 pl-5 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-[15px] text-gray-700 leading-relaxed flex gap-2">
        <span className="text-se-orange mt-1.5 flex-shrink-0">•</span>
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-[15px] text-gray-700 leading-relaxed">{children}</li>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <figure className="my-8">
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt || ''}
          className="w-full rounded-xl shadow-sm"
        />
        {value.caption && (
          <figcaption className="text-center text-[13px] text-gray-400 mt-2 italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
}

// ─── Couleurs catégorie ───────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  'Automatisation': 'bg-se-teal text-white',
  'Prospection':    'bg-se-orange text-white',
  'SEO & IA':       'bg-blue-600 text-white',
  'IA':             'bg-violet-600 text-white',
  'Stratégie':      'bg-se-navy text-white',
}
function tagClass(cat: string) {
  return CATEGORY_COLORS[cat] ?? 'bg-gray-700 text-white'
}

// ─── Couleurs tags (palette diversifiée, déterministe par nom) ────────────────
const TAG_PALETTE = [
  'bg-pink-500 text-white',
  'bg-amber-500 text-white',
  'bg-emerald-500 text-white',
  'bg-sky-500 text-white',
  'bg-purple-500 text-white',
  'bg-rose-400 text-white',
  'bg-indigo-500 text-white',
  'bg-lime-600 text-white',
  'bg-fuchsia-500 text-white',
  'bg-cyan-600 text-white',
  'bg-teal-600 text-white',
  'bg-orange-500 text-white',
]
function tagColor(name: string): string {
  let h = 0
  for (let i = 0; i < name.length; i++) h = ((h * 31) + name.charCodeAt(i)) >>> 0
  return TAG_PALETTE[h % TAG_PALETTE.length]
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const toc = extractToc(post.body ?? [])

  return (
    <>
      <Navbar />

      {/* ── Hero article ───────────────────────────────────────────────── */}
      <section id="article-hero" className="relative bg-se-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,98,26,0.08),transparent_60%)]" />

        <div className="relative max-w-container mx-auto px-6 pt-36 pb-14">
          {/* Fil d'Ariane */}
          <div className="flex items-center gap-2 text-[13px] text-se-muted mb-6">
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            {post.categories?.[0] && (
              <span className="text-se-teal">{post.categories[0]}</span>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Texte */}
            <div className="flex-1 min-w-0">
              {/* Catégories + Tags */}
              {((post.categories && post.categories.length > 0) || (post.tags && post.tags.length > 0)) && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.categories?.map((cat: string) => (
                    <span key={`cat-${cat}`} className={`text-[11px] font-bold px-3 py-1 rounded-full ${tagClass(cat)}`}>
                      {cat}
                    </span>
                  ))}
                  {post.tags?.map((tag: string) => (
                    <span key={`tag-${tag}`} className={`text-[11px] font-semibold px-3 py-1 rounded-full ${tagColor(tag)}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="font-display font-extrabold text-[32px] md:text-[42px] text-white leading-tight mb-5">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-se-muted text-[17px] leading-relaxed max-w-2xl mb-6">
                  {post.excerpt}
                </p>
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-[13px] text-se-muted/70">
                {post.author && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-se-orange/20 flex items-center justify-center text-[10px] text-se-orange font-bold">
                      {post.author[0]}
                    </span>
                    {post.author}
                  </span>
                )}
                {post.publishedAt && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(post.publishedAt)}
                  </span>
                )}
                {post.readingTime != null && post.readingTime > 0 && (
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.readingTime} min de lecture
                  </span>
                )}
              </div>
            </div>

            {/* Image hero */}
            {post.mainImage && (
              <div className="lg:w-[340px] flex-shrink-0">
                <img
                  src={urlFor(post.mainImage).width(680).height(420).url()}
                  alt={post.mainImage.alt || post.title}
                  className="w-full rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Contenu + Sidebar ──────────────────────────────────────────── */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-container mx-auto px-6 py-14 flex gap-10 items-start">

          {/* Article */}
          <article className="flex-1 min-w-0 bg-white rounded-2xl shadow-sm border border-gray-100 px-8 md:px-12 py-10">
            {post.body ? (
              <PortableText value={post.body} components={ptComponents} />
            ) : (
              <p className="text-gray-400 italic">Contenu à venir…</p>
            )}

            {/* Pied d'article */}
            <div className="mt-14 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link href="/blog"
                className="flex items-center gap-2 text-[14px] text-se-navy/50 hover:text-se-orange transition-colors font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Tous les articles
              </Link>
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((cat: string) => (
                    <Link key={cat} href={`/blog?category=${encodeURIComponent(cat)}`}
                      className={`text-[11px] font-bold px-3 py-1 rounded-full ${tagClass(cat)}`}>
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </article>

          {/* Sidebar sticky — se déclenche après le hero */}
          <ArticleSidebar toc={toc} heroId="article-hero" />
        </div>

        {/* Blocs de fin — pleine largeur */}
        <div className="max-w-container mx-auto px-6 pb-16">
          <ArticleFooterBlocks />
        </div>
      </div>

      <SocialBlock />
      <Footer />
    </>
  )
}
