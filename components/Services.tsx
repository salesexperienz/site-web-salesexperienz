'use client'
import FadeUp from './FadeUp'
import { DISCOVERY_URL } from '@/lib/constants'

interface ServiceItem {
  icon?: string
  badge?: string | null
  title?: string
  subtitle?: string
  description?: string
  points?: string[]
  featured?: boolean
  link?: string
}

interface ServicesProps {
  settings?: {
    servicesSectionTitle?: string
    servicesSectionSubtitle?: string
    services?: ServiceItem[]
  }
}

const defaultServices = [
  {
    icon: '✦',
    badge: null,
    title: 'SEO GEO Machine',
    subtitle: 'Votre site web et votre contenu SEO, automatisés',
    description:
      'Un système en 3 blocs : fondation (site web SEO-ready Next.js ou WordPress), présence locale (Google My Business optimisé et aligné) et machine à contenu (articles SEO publiés en automatique). Propriété totale, sans agence.',
    points: [
      'Site web Next.js ou WordPress SEO-ready',
      'Google My Business optimisé et aligné',
      '50 à 150 articles SEO/mois automatisés',
      'Propriété totale dès J+1',
    ],
    featured: false,
    link: '/services/seo-geo-machine',
  },
  {
    icon: '◎',
    badge: 'Populaire',
    title: 'Deep Signal',
    subtitle: 'L\'écosystème de prospection automatisée',
    description:
      'Deep Signal détecte en temps réel les prospects qui ont levé la main et leur envoie automatiquement le bon message — comme si c\'était vous. Seuls les prospects chauds sont contactés.',
    points: [
      '3 à 15 RDV qualifiés/mois',
      'Signaux LinkedIn, Email, SEO, Brevo',
      'Personnalisation industrielle par Claude AI',
      'Scalable sans recruter',
    ],
    featured: true,
    link: '/services/deepsignal',
  },
  {
    icon: '▶',
    badge: null,
    title: 'Impact Vidéo',
    subtitle: 'Votre offre en vidéo — sans tournage',
    description:
      'Coaching commercial + script sur-mesure + vidéo Remotion livrée en 7 à 14 jours. Votre offre expliquée en 3 minutes, deployable sur LinkedIn, YouTube et votre landing page.',
    points: [
      'Coaching stratégique inclus',
      'Technologie Remotion (React)',
      'Formats 16:9, 9:16, 45 secondes',
      'Code Next.js livré clé en main',
    ],
    featured: false,
  },
]

export default function Services({ settings }: ServicesProps) {
  const services = (settings?.services && settings.services.length > 0)
    ? settings.services
    : defaultServices

  const sectionTitle    = settings?.servicesSectionTitle    || 'Nos écosystèmes les plus demandés'
  const sectionSubtitle = settings?.servicesSectionSubtitle || 'Des systèmes prêts à déployer, construits et testés en production. Chacun est configuré selon votre contexte avant livraison.'

  return (
    <section id="services" className="py-[80px] lg:py-[120px]" style={{ background: 'rgb(234, 244, 236)' }}>
      <div className="max-w-container mx-auto px-6 lg:px-20">

        {/* Header */}
        <FadeUp className="mb-14 max-w-2xl">
          <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
            NOS OFFRES
          </p>
          <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-se-navy mb-4">
            {sectionTitle}
          </h2>
          <p className="font-body text-[17px] leading-[1.7] text-se-navy">
            {sectionSubtitle}
          </p>
        </FadeUp>

        {/* 3 service cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {services.map((svc, i) => (
            <FadeUp key={svc.title} delay={i * 0.1}>
              <div
                className={`relative flex flex-col h-full rounded-2xl p-8 transition-all duration-[250ms] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] ${
                  svc.featured
                    ? 'border-2 border-se-orange/60 bg-white'
                    : 'bg-white border border-se-navy/10 hover:border-se-orange/40'
                }`}
              >
                {/* Badge */}
                {svc.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-se-orange text-white text-[12px] font-medium uppercase tracking-[0.05em] px-4 py-1 rounded-full">
                    {svc.badge}
                  </span>
                )}

                {/* Icon */}
                <div className="w-11 h-11 bg-se-teal/[0.12] rounded-[10px] flex items-center justify-center mb-5">
                  <span className="text-se-teal text-[20px]">{svc.icon}</span>
                </div>

                {/* Title & subtitle */}
                <h3 className="font-display font-bold text-[22px] text-se-navy mb-1">{svc.title}</h3>
                <p className="font-body text-[15px] text-se-navy mb-4">{svc.subtitle}</p>

                {/* Description */}
                <p className="font-body text-[15px] leading-[1.7] text-se-navy mb-5 flex-1">
                  {svc.description}
                </p>

                {/* Points */}
                <ul className="flex flex-col gap-2 mb-7">
                  {(svc.points ?? []).map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span className="text-se-teal text-[14px] mt-0.5 flex-shrink-0">✓</span>
                      <span className="font-body text-[14px] text-se-navy">{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA optionnel */}
                {'link' in svc && svc.link && (
                  <a
                    href={svc.link}
                    className="inline-flex items-center justify-center gap-2 w-full rounded-full border-2 border-se-orange text-se-orange font-body font-medium text-[14px] py-3 px-6 transition-all duration-200 hover:bg-se-orange hover:text-white"
                  >
                    Je veux en savoir plus
                    <span aria-hidden="true">→</span>
                  </a>
                )}

              </div>
            </FadeUp>
          ))}
        </div>

        {/* Bloc sur mesure — pleine largeur */}
        <FadeUp>
          <div className="rounded-2xl border-l-4 border-se-orange overflow-hidden" style={{ background: '#0D1B3E' }}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 px-8 py-7">
              {/* Text left */}
              <div className="flex items-start gap-4 flex-1">
                <div className="w-10 h-10 bg-white/[0.10] rounded-[10px] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-se-orange text-[18px]">⚙</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-[20px] text-white mb-2">
                    Votre besoin ne rentre pas dans une case ?
                  </h3>
                  <p className="font-body text-[15px] leading-[1.7] text-white/70 max-w-2xl">
                    Ces trois écosystèmes couvrent les besoins les plus fréquents — mais chaque entreprise
                    a ses propres processus, ses propres outils, ses propres contraintes. On conçoit aussi
                    des automatisations entièrement sur mesure : de l&apos;audit initial à la mise en production,
                    selon votre stack et vos objectifs.
                  </p>
                </div>
              </div>
              {/* Button right */}
              <div className="flex-shrink-0">
                <a
                  href={DISCOVERY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-se-orange text-white rounded-full px-7 py-3.5 text-[15px] font-medium font-body transition-all duration-200 hover:bg-se-orange-h hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(232,98,26,0.4)] group whitespace-nowrap"
                >
                  Discutons de votre projet
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  )
}
