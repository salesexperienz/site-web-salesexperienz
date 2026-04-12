import { getPosts, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SocialBlock from '@/components/SocialBlock'
import BlogFilters from '@/components/BlogFilters'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  mainImage?: any
  publishedAt?: string
  categories?: string[]
  tags?: string[]
  author?: string
  readingTime?: number
  badge?: 'popular' | 'shared'
  featured?: boolean
}

// ─── Articles de démo ─────────────────────────────────────────────────────────
const DEMO_POSTS: Post[] = [
  {
    _id: 'demo-1',
    featured: true,
    title: "Comment automatiser sa prospection B2B avec n8n en 2025",
    slug: { current: '#' },
    excerpt: "Découvrez comment construire un système de prospection entièrement automatisé : signaux LinkedIn, cold email et nurturing en flux continu, sans toucher à une ligne de code.",
    publishedAt: '2025-09-15',
    categories: ['Automatisation', 'Prospection'],
    author: 'Laurent Guyonvarch',
    readingTime: 7,
  },
  {
    _id: 'demo-2',
    title: "IA et SEO : produire 30 articles optimisés par mois sans effort",
    slug: { current: '#' },
    excerpt: "La méthode que l'on utilise pour nos clients : DataForSEO + Claude AI + publication automatique WordPress. Un pipeline complet, clé en main.",
    publishedAt: '2025-10-02',
    categories: ['SEO & IA', 'Automatisation'],
    author: 'Laurent Guyonvarch',
    readingTime: 5,
    badge: 'popular',
  },
  {
    _id: 'demo-3',
    title: "DeepSignal : détecter les signaux d'achat LinkedIn avant vos concurrents",
    slug: { current: '#' },
    excerpt: "Comment on identifie les prospects chauds avant vos concurrents grâce aux signaux comportementaux LinkedIn et une IA d'analyse en temps réel.",
    publishedAt: '2025-10-20',
    categories: ['Prospection', 'IA'],
    author: 'Laurent Guyonvarch',
    readingTime: 6,
    badge: 'shared',
  },
  {
    _id: 'demo-4',
    title: "La Carte des Opportunités : l'audit commercial qui change tout",
    slug: { current: '#' },
    excerpt: "En 2h d'audit, on identifie les 3 leviers de croissance les plus rapides de votre entreprise. Voilà comment ça marche et ce que ça produit.",
    publishedAt: '2025-11-05',
    categories: ['Stratégie'],
    author: 'Laurent Guyonvarch',
    readingTime: 4,
  },
  {
    _id: 'demo-5',
    title: "Workflows n8n : les 5 automatisations indispensables pour une PME",
    slug: { current: '#' },
    excerpt: "De la relance client à la veille concurrentielle, voici les 5 workflows que chaque PME devrait avoir tournant en arrière-plan dès aujourd'hui.",
    publishedAt: '2025-11-18',
    categories: ['Automatisation'],
    author: 'Laurent Guyonvarch',
    readingTime: 8,
  },
  {
    _id: 'demo-6',
    title: "Pourquoi le cold email sans personnalisation IA est mort en 2025",
    slug: { current: '#' },
    excerpt: "Les taux d'ouverture s'effondrent avec les emails génériques. Voici comment l'IA permet une personnalisation à grande échelle sans sacrifier la qualité.",
    publishedAt: '2025-12-01',
    categories: ['Prospection', 'IA'],
    author: 'Laurent Guyonvarch',
    readingTime: 5,
  },
  {
    _id: 'demo-7',
    title: "GEO vs SEO : comment optimiser pour être cité par les IA en 2026",
    slug: { current: '#' },
    excerpt: "ChatGPT, Perplexity, Claude... Les moteurs de réponse changent les règles du jeu. Voici la stratégie GEO qui positionne votre marque dans leurs réponses.",
    publishedAt: '2026-01-08',
    categories: ['SEO & IA', 'Stratégie'],
    author: 'Laurent Guyonvarch',
    readingTime: 6,
  },
  {
    _id: 'demo-8',
    title: "n8n vs Make : lequel choisir pour automatiser son entreprise ?",
    slug: { current: '#' },
    excerpt: "Comparatif terrain après 2 ans d'usage intensif des deux outils. Cas d'usage, limites, coûts réels — notre verdict sans langue de bois.",
    publishedAt: '2026-01-22',
    categories: ['Automatisation'],
    author: 'Laurent Guyonvarch',
    readingTime: 9,
  },
  {
    _id: 'demo-9',
    title: "Structurer son offre commerciale : la méthode des 3 niveaux",
    slug: { current: '#' },
    excerpt: "Une offre floue, c'est un chiffre d'affaires fuyant. Voici comment structurer vos offres en 3 niveaux pour convertir plus et justifier vos prix.",
    publishedAt: '2026-02-05',
    categories: ['Stratégie', 'Prospection'],
    author: 'Laurent Guyonvarch',
    readingTime: 5,
  },
  {
    _id: 'demo-10',
    title: "Automatiser sa veille concurrentielle avec IA et n8n",
    slug: { current: '#' },
    excerpt: "Recevez chaque matin un digest automatique : nouveautés concurrents, mentions de marque, signaux sectoriels — sans lever le petit doigt.",
    publishedAt: '2026-02-18',
    categories: ['Automatisation', 'IA'],
    author: 'Laurent Guyonvarch',
    readingTime: 7,
  },
  {
    _id: 'demo-11',
    title: "Créer un agent IA de qualification leads en moins d'une journée",
    slug: { current: '#' },
    excerpt: "Un agent qui reçoit un lead, consulte son LinkedIn, son site web, et vous envoie une fiche de qualification en 30 secondes. Tutoriel complet.",
    publishedAt: '2026-03-04',
    categories: ['IA', 'Prospection'],
    author: 'Laurent Guyonvarch',
    readingTime: 11,
  },
  {
    _id: 'demo-12',
    title: "Le guide complet du nurturing automatisé avec Brevo + n8n",
    slug: { current: '#' },
    excerpt: "Comment construire une séquence de nurturing qui s'adapte au comportement de chaque prospect, sans CRM complexe ni équipe marketing dédiée.",
    publishedAt: '2026-03-20',
    categories: ['Automatisation', 'Prospection'],
    author: 'Laurent Guyonvarch',
    readingTime: 8,
  },
  {
    _id: 'demo-13',
    title: "Mesurer le ROI de ses automatisations : les métriques qui comptent",
    slug: { current: '#' },
    excerpt: "Temps économisé, leads générés, coût par acquisition... Voici les KPIs qu'on suit avec nos clients pour prouver la valeur réelle de chaque workflow.",
    publishedAt: '2026-04-02',
    categories: ['Stratégie', 'Automatisation'],
    author: 'Laurent Guyonvarch',
    readingTime: 6,
  },
]

// ─── Couleurs par catégorie ────────────────────────────────────────────────────
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

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ─── Placeholder image ────────────────────────────────────────────────────────
const GRADIENTS = [
  'from-[#0D1B3E] via-[#1E2D5A] to-[#0C2E28]',
  'from-[#0C2E28] via-[#143B33] to-[#0D1B3E]',
  'from-[#162248] via-[#1E2D5A] to-[#0C2E28]',
  'from-[#1a1230] via-[#1E2D5A] to-[#162248]',
  'from-[#0D1B3E] via-[#162248] to-[#0C2E28]',
  'from-[#143B33] via-[#0D1B3E] to-[#1E2D5A]',
]

function PlaceholderImg({ index, className }: { index: number; className: string }) {
  return (
    <div className={`bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]} flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ${className}`}>
      <svg className="w-12 h-12 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  )
}

// ─── Badge overlay ────────────────────────────────────────────────────────────
function BadgeOverlay({ badge }: { badge?: Post['badge'] }) {
  if (!badge) return null
  return (
    <span className={`absolute top-3 right-3 text-[11px] font-bold px-3 py-1 rounded-full ${
      badge === 'popular'
        ? 'bg-se-orange text-white'
        : 'bg-se-teal text-se-navy'
    }`}>
      {badge === 'popular' ? 'Le plus lu' : 'Le plus partagé'}
    </span>
  )
}

// ─── Featured Card ────────────────────────────────────────────────────────────
function FeaturedCard({ post }: { post: Post }) {
  const isDemo = post._id.startsWith('demo-')
  const href = isDemo ? '#' : `/blog/${post.slug.current}`

  return (
    <Link href={href}
      className="group relative flex flex-col md:flex-row rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.13)] transition-all duration-200 mb-10">

      {/* Image */}
      <div className="relative md:w-[45%] h-56 md:h-auto overflow-hidden flex-shrink-0">
        {post.mainImage
          ? <img src={urlFor(post.mainImage).width(800).height(500).url()}
              alt={post.mainImage.alt || post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          : <PlaceholderImg index={0} className="w-full h-full min-h-[240px]" />
        }
        <BadgeOverlay badge={post.badge} />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center p-8 md:p-10">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-se-orange/10 text-se-orange text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            À la une
          </span>
          {post.categories?.map((c) => (
            <span key={c} className={`text-[11px] font-semibold px-3 py-1 rounded-full ${tagClass(c)}`}>{c}</span>
          ))}
        </div>

        <h2 className="font-display font-extrabold text-[24px] md:text-[30px] text-se-navy leading-tight mb-4 group-hover:text-se-orange transition-colors duration-200">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-se-navy text-[15px] leading-relaxed line-clamp-3 mb-6">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-[13px] text-se-navy/40">
          {post.publishedAt && (
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(post.publishedAt)}
            </span>
          )}
          {post.readingTime != null && post.readingTime > 0 && (
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readingTime} min de lecture détaillée
            </span>
          )}
        </div>

        <div className="mt-6 inline-flex items-center gap-2 text-se-orange font-semibold text-sm group-hover:gap-3 transition-all duration-200">
          Lire l'article
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

// ─── Article Card ─────────────────────────────────────────────────────────────
function ArticleCard({ post, index }: { post: Post; index: number }) {
  const isDemo = post._id.startsWith('demo-')
  const href = isDemo ? '#' : `/blog/${post.slug.current}`

  return (
    <Link href={href}
      className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.13)] hover:-translate-y-1 transition-all duration-200">

      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        {post.mainImage
          ? <img src={urlFor(post.mainImage).width(600).height(340).url()}
              alt={post.mainImage.alt || post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          : <PlaceholderImg index={index} className="w-full h-full" />
        }
        <BadgeOverlay badge={post.badge} />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Tags */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.categories.map((c) => (
              <span key={c} className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${tagClass(c)}`}>{c}</span>
            ))}
          </div>
        )}

        <h2 className="font-display font-bold text-[17px] text-se-navy leading-snug mb-2 group-hover:text-se-orange transition-colors duration-200 line-clamp-2">
          {post.title}
        </h2>

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
              {post.readingTime} min de lecture détaillée
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const sanityPosts: Post[] = await getPosts()
  const posts = sanityPosts.length > 0 ? sanityPosts : DEMO_POSTS

  const allCategories = [...new Set(posts.flatMap((p) => p.categories ?? []))]

  const filtered = category
    ? posts.filter((p) => p.categories?.includes(category))
    : posts

  // Featured = article avec featured=true, sinon premier article
  const featured = filtered.find(p => p.featured) ?? filtered[0]
  const gridPosts = filtered.filter(p => p._id !== featured?._id).slice(0, 12)
  const totalCount = filtered.length
  const shownCount = (featured ? 1 : 0) + gridPosts.length

  return (
    <>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-se-navy overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,98,26,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(74,191,176,0.06),transparent_60%)]" />
        <div className="relative max-w-container mx-auto px-6 pt-36 pb-16">
          <span className="inline-block text-se-teal text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
            Ressources & insights
          </span>
          <h1 className="font-display font-extrabold text-[42px] md:text-[56px] text-white leading-tight mb-4">
            Nos articles
          </h1>
          <p className="text-se-muted text-[17px] max-w-xl leading-relaxed">
            Automatisation, IA, prospection B2B — les stratégies concrètes qu'on
            applique chez nos clients, partagées sans filtre.
          </p>
          <div className="mt-8 h-px w-24 bg-gradient-to-r from-se-orange to-transparent" />
        </div>
      </section>

      {/* ── Articles ──────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 min-h-screen">
        <div className="max-w-container mx-auto px-6 py-14">

          {/* Filtres */}
          {allCategories.length > 0 && (
            <Suspense>
              <BlogFilters categories={allCategories} />
            </Suspense>
          )}

          {/* Aucun résultat */}
          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="text-se-navy/50 text-[17px]">Aucun article dans cette catégorie.</p>
              <Link href="/blog" className="inline-block mt-4 text-se-orange hover:underline text-sm font-semibold">
                ← Voir tous les articles
              </Link>
            </div>
          )}

          {/* Featured */}
          {featured && <FeaturedCard post={featured} />}

          {/* Grille 4 rangées × 3 */}
          {gridPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridPosts.map((post, i) => (
                <ArticleCard key={post._id} post={post} index={i + 1} />
              ))}
            </div>
          )}

          {/* Compteur */}
          {filtered.length > 0 && (
            <p className="text-center text-[14px] text-se-navy/40 mt-10">
              Affichage de{' '}
              <span className="font-semibold text-se-navy/60">{shownCount} articles</span>
              {' '}sur{' '}
              <span className="font-semibold text-se-navy/60">{totalCount}</span>.
              {' '}Utilisez les filtres pour affiner votre recherche.
            </p>
          )}
        </div>
      </section>

      <SocialBlock />
      <Footer />
    </>
  )
}
