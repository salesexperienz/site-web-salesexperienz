import { getPost, getPosts, urlFor } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ArticleSidebar from '@/components/ArticleSidebar'
import ArticleFooterBlocks from '@/components/ArticleFooterBlocks'
import SocialBlock from '@/components/SocialBlock'
import RecentArticles from '@/components/RecentArticles'
import Link from 'next/link'

const SITE_URL = 'https://www.salesexperienz.fr'

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post: any) => ({ slug: post.slug.current }))
}

type Props = { params: Promise<{ slug: string }> }

// ─── Metadata dynamique par article ──────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  const title = post.seoTitle || post.title
  const description = post.seoDescription || post.excerpt || ''
  const canonicalUrl = `${SITE_URL}/blog/${slug}`
  const ogImage = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : `${SITE_URL}/og-seo-geo-machine.jpg`

  return {
    title: `${title} | SalesExperienz`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'SalesExperienz',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : ['Laurent Guyonvarch'],
      tags: post.tags ?? [],
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

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
        className="font-display font-extrabold text-[26px] mt-12 mb-4 leading-tight scroll-mt-28"
        style={{ color: '#111c3d' }}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 id={headingId(children)}
        className="font-display font-bold text-[20px] mt-8 mb-3 leading-snug scroll-mt-28"
        style={{ color: '#111c3d' }}>
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="font-display font-bold text-[17px] mt-6 mb-2 scroll-mt-28"
        style={{ color: '#111c3d' }}>
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
      <ul className="my-5 space-y-4 pl-5">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-5 space-y-4 pl-5 list-decimal">{children}</ol>
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

            {/* ── Capsule GEO — réponse directe ─────────────────────────── */}
            {post.capsule && (
              <div className="mb-10 rounded-2xl border border-se-orange/20 bg-gradient-to-br from-se-orange/5 to-amber-50 p-6 relative overflow-hidden">
                {/* Trait décoratif gauche */}
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-se-orange" />
                <div className="pl-2">
                  <div className="flex items-center gap-2 mb-3">
                    {/* Icône éclair */}
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-se-orange text-white flex-shrink-0">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-se-orange">
                      En résumé
                    </span>
                  </div>
                  <div className="space-y-4">
                    {post.capsule.split(/(?<=[.!?])\s+/).filter(Boolean).map((s: string, i: number) => (
                      <p key={i} className="text-[15px] text-se-navy/80 leading-relaxed">{s}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Introduction ──────────────────────────────────────────── */}
            {post.introduction && (
              <div className="mb-10 rounded-xl border-l-4 border-se-orange bg-gray-100 px-6 py-5 space-y-4">
                {post.introduction.split(/(?<=[.!?])\s+/).filter(Boolean).map((s: string, i: number) => (
                  <p key={i} className="text-[15px] text-se-navy/80 leading-relaxed">{s}</p>
                ))}
              </div>
            )}

            {post.body ? (
              <PortableText value={post.body} components={ptComponents} />
            ) : (
              <p className="text-gray-400 italic">Contenu à venir…</p>
            )}

            {/* ── FAQ GEO — accordéon avant pied d'article ──────────────── */}
            {post.faq && post.faq.length > 0 && (
              <div className="mt-14 mb-4">
                <div className="flex items-center gap-2 mb-5">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-se-navy text-white flex-shrink-0">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <h2 className="font-display font-extrabold text-[22px] text-se-navy">
                    Questions fréquentes
                  </h2>
                </div>
                <div className="space-y-4">
                  {post.faq.map((item: { question: string; answer: string }, i: number) => (
                    <details key={i} className="group rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
                      <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-[15px] text-se-navy hover:bg-gray-100 transition-colors">
                        <span>{item.question}</span>
                        <svg className="w-4 h-4 flex-shrink-0 text-se-orange transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-5 pb-4 pt-1 text-[14px] text-gray-700 leading-relaxed border-t border-gray-200">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* ── Conclusion ────────────────────────────────────────────── */}
            {post.conclusion && (
              <div className="mt-10 rounded-xl border-l-4 border-se-orange bg-gray-100 px-6 py-5 space-y-4">
                {post.conclusion.split(/(?<=[.!?])\s+/).filter(Boolean).map((s: string, i: number) => (
                  <p key={i} className="text-[15px] text-se-navy/80 leading-relaxed">{s}</p>
                ))}
              </div>
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
          <ArticleFooterBlocks categories={post.categories} />
        </div>
      </div>

      <RecentArticles />
      <SocialBlock />
      <Footer />

      {/* ── JSON-LD FAQPage — structured data GEO ───────────────────────── */}
      {post.faq && post.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: post.faq.map((item: { question: string; answer: string }) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* ── JSON-LD BlogPosting — structured data pour Google & IA ───────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.seoDescription || post.excerpt || '',
            url: `${SITE_URL}/blog/${post.slug.current}`,
            datePublished: post.publishedAt,
            dateModified: post._updatedAt || post.publishedAt,
            author: {
              '@type': 'Person',
              name: post.author || 'Laurent Guyonvarch',
              url: `${SITE_URL}/a-propos`,
            },
            publisher: {
              '@type': 'Organization',
              name: 'SalesExperienz',
              url: SITE_URL,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`,
              },
            },
            ...(post.mainImage && {
              image: {
                '@type': 'ImageObject',
                url: urlFor(post.mainImage).width(1200).height(630).url(),
                width: 1200,
                height: 630,
              },
            }),
            keywords: [
              ...(post.categories ?? []),
              ...(post.tags ?? []),
            ].join(', '),
            ...(post.capsule && { abstract: post.capsule }),
            ...(post.faq && post.faq.length > 0 && {
              hasPart: post.faq.map((item: { question: string; answer: string }) => ({
                '@type': 'WebPageElement',
                isAccessibleForFree: true,
                cssSelector: 'details',
              })),
            }),
            inLanguage: 'fr-FR',
            isPartOf: {
              '@type': 'Blog',
              name: 'Blog SalesExperienz',
              url: `${SITE_URL}/blog`,
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${SITE_URL}/blog/${post.slug.current}`,
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
                { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/blog/${post.slug.current}` },
              ],
            },
          }),
        }}
      />
    </>
  )
}
