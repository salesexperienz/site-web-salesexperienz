import Link from 'next/link'
import { DISCOVERY_URL } from '@/lib/constants'

// ─── Offres disponibles ───────────────────────────────────────────────────────
type OfferKey = 'deepsignal' | 'seo-geo' | 'automatisation'

const CATEGORY_OFFER_MAP: Record<string, OfferKey> = {
  'Prospection': 'deepsignal',
  'IA':          'deepsignal',
  'SEO & IA':    'seo-geo',
  'Automatisation': 'automatisation',
  'Stratégie':   'automatisation',
}

function resolveOffers(categories: string[]): OfferKey[] {
  const seen = new Set<OfferKey>()
  const result: OfferKey[] = []
  for (const cat of categories) {
    const offer = CATEGORY_OFFER_MAP[cat]
    if (offer && !seen.has(offer)) {
      seen.add(offer)
      result.push(offer)
    }
  }
  return result.length > 0 ? result.slice(0, 2) : ['deepsignal']
}

// ─── Données des offres ───────────────────────────────────────────────────────
const OFFERS: Record<OfferKey, {
  eyebrow: string
  title: string
  description: React.ReactNode
  features: string[]
  cta: string
  href: string
  external?: boolean
  icon: React.ReactNode
}> = {
  'deepsignal': {
    eyebrow: 'Notre offre phare',
    title: 'DeepSignal — Prospection automatisée',
    description: (
      <>
        Un système clé en main qui détecte les signaux d'achat LinkedIn,
        personnalise les messages avec l'IA et gère les relances automatiquement.{' '}
        <strong className="text-white font-semibold">10 à 30 RDV qualifiés par mois</strong>,
        sans équipe commerciale dédiée.
      </>
    ),
    features: ['Détection de signaux', 'Personnalisation IA', 'Nurturing automatisé', 'ROI mesurable dès J30'],
    cta: 'Découvrir DeepSignal',
    href: '/services/deepsignal',
    icon: (
      <svg className="w-7 h-7 text-se-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  'seo-geo': {
    eyebrow: 'Visibilité organique',
    title: 'SEO GEO Machine — Rédigé pour Google et les IA',
    description: (
      <>
        Un pipeline automatisé qui produit des articles SEO optimisés et positionnés
        pour être cités par ChatGPT, Perplexity et Claude.{' '}
        <strong className="text-white font-semibold">30 articles/mois</strong>,
        sans rédacteur dédié.
      </>
    ),
    features: ['Articles SEO & GEO', 'Cité par les IA', 'Publication automatisée', 'Rapport de performance'],
    cta: 'Découvrir SEO GEO Machine',
    href: '/services/seo-geo-machine',
    icon: (
      <svg className="w-7 h-7 text-se-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  'automatisation': {
    eyebrow: 'Automatisation sur mesure',
    title: 'Workflows n8n — Vos processus en pilote automatique',
    description: (
      <>
        On analyse vos processus, on identifie les tâches répétitives et on déploie
        des workflows n8n sur mesure.{' '}
        <strong className="text-white font-semibold">Gain de temps garanti dès J30</strong>,
        sans équipe technique dédiée.
      </>
    ),
    features: ['Audit de vos processus', 'Workflows n8n clé en main', 'Formation incluse', 'Support réactif'],
    cta: 'Réserver une session découverte',
    href: DISCOVERY_URL,
    external: true,
    icon: (
      <svg className="w-7 h-7 text-se-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
}

// ─── Bloc Offre ───────────────────────────────────────────────────────────────
function OfferBlock({ offerKey }: { offerKey: OfferKey }) {
  const offer = OFFERS[offerKey]
  const Tag = offer.external ? 'a' : Link
  const extraProps = offer.external
    ? { href: offer.href, target: '_blank', rel: 'noopener noreferrer' }
    : { href: offer.href }

  return (
    <div className="relative rounded-2xl overflow-hidden p-8 md:p-10" style={{ background: '#162346' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,98,26,0.18),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,59,51,0.5),transparent_60%)] pointer-events-none" />
      <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative flex flex-col md:flex-row gap-8 items-start md:items-center">
        {/* Icône */}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(232,98,26,0.18)', border: '1px solid rgba(232,98,26,0.3)' }}>
          {offer.icon}
        </div>

        {/* Texte */}
        <div className="flex-1 min-w-0">
          <span className="text-se-orange text-[11px] font-bold uppercase tracking-[0.15em]">
            {offer.eyebrow}
          </span>
          <h3 className="font-display font-extrabold text-[22px] text-white mt-1 mb-2 leading-snug">
            {offer.title}
          </h3>
          <p className="text-white/65 text-[14px] leading-relaxed">
            {offer.description}
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            {offer.features.map((f) => (
              <span key={f} className="flex items-center gap-1.5 text-[12px] text-white/55">
                <span className="w-1 h-1 rounded-full bg-se-teal flex-shrink-0" />
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Tag
          {...(extraProps as any)}
          className="flex-shrink-0 inline-flex items-center gap-2 bg-se-orange text-white font-semibold text-[14px] px-6 py-3 rounded-full hover:bg-se-orange-h hover:shadow-[0_6px_20px_rgba(232,98,26,0.45)] transition-all duration-200 whitespace-nowrap"
        >
          {offer.cta}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Tag>
      </div>
    </div>
  )
}

// ─── Bloc Prêt à aller plus loin ─────────────────────────────────────────────
function ReadyBlock() {
  return (
    <div className="relative rounded-2xl overflow-hidden p-8 md:p-10 text-center" style={{ background: '#162346' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,98,26,0.14),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(20,59,51,0.4),transparent_55%)] pointer-events-none" />
      <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative">
        <span className="inline-block text-se-teal text-[11px] font-bold uppercase tracking-[0.15em] mb-3">
          Passez à l'action
        </span>
        <h3 className="font-display font-extrabold text-[28px] md:text-[34px] text-white leading-tight mb-4">
          Prêt à automatiser votre croissance ?
        </h3>
        <p className="text-white/60 text-[15px] leading-relaxed max-w-xl mx-auto mb-8">
          En 45 min, on analyse ensemble vos processus et on identifie les 3 leviers d'automatisation
          les plus rapides pour votre entreprise. Gratuit, sans engagement.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={DISCOVERY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-se-orange text-white font-semibold text-[15px] px-8 py-4 rounded-full hover:bg-se-orange-h hover:shadow-[0_8px_24px_rgba(232,98,26,0.50)] transition-all duration-200 hover:-translate-y-0.5"
          >
            Réserver mon échange gratuit
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 font-medium text-[15px] px-8 py-4 rounded-full hover:border-white/40 hover:bg-white/8 transition-all duration-200"
          >
            Lire d'autres articles
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mt-6">
          {['45 min', '100% gratuit', 'Sans engagement', 'En visio depuis toute la France'].map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-[12px] text-white/40">
              <span className="text-se-teal">✓</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
import type React from 'react'

export default function ArticleFooterBlocks({ categories }: { categories?: string[] }) {
  const offers = resolveOffers(categories ?? [])

  return (
    <div className="flex flex-col gap-6 mt-10">
      {offers.map((key) => (
        <OfferBlock key={key} offerKey={key} />
      ))}
      <ReadyBlock />
    </div>
  )
}
