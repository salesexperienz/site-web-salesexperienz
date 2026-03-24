'use client'
import FadeUp from './FadeUp'
import { DISCOVERY_URL } from '@/lib/constants'

const services = [
  {
    icon: '✦',
    badge: null,
    title: 'Auto-Blog SEO',
    subtitle: 'Votre machine éditoriale SEO, automatisée',
    description:
      '3 workflows n8n qui couvrent l\'intégralité du cycle éditorial : détection d\'opportunités keywords, architecture Pillar-Cluster et publication automatisée à ~2€ par article.',
    points: [
      'De 30 à 365 articles/mois',
      'DataForSEO + Claude AI + GPT-4o',
      'Optimisation GEO pour ChatGPT et Perplexity',
      'Vous pilotez la stratégie, l\'IA produit',
    ],
    featured: false,
  },
  {
    icon: '◎',
    badge: 'Populaire',
    title: 'DeepSignal',
    subtitle: 'L\'écosystème de prospection automatisée',
    description:
      '4 modules interconnectés déclenchés par des signaux d\'intention réels : SEO, LinkedIn, Cold Email, Nurturing Brevo. Vous ne contactez que des prospects qui ont déjà levé la main.',
    points: [
      '10 à 60 RDV qualifiés/mois',
      'Signaux LinkedIn, Email, SEO, Brevo',
      'Personnalisation industrielle par Claude AI',
      'Scalable sans recruter',
    ],
    featured: true,
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

export default function Services() {
  return (
    <section id="services" className="py-[80px] lg:py-[120px]" style={{ background: 'rgb(234, 244, 236)' }}>
      <div className="max-w-container mx-auto px-6 lg:px-20">

        {/* Header */}
        <FadeUp className="mb-14 max-w-2xl">
          <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
            NOS OFFRES
          </p>
          <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-se-navy mb-4">
            Nos écosystèmes les plus{' '}
            <span className="text-se-orange">demandés</span>
          </h2>
          <p className="font-body text-[17px] leading-[1.7] text-se-navy/60">
            Des systèmes prêts à déployer, construits et testés en production.
            Chacun est configuré selon votre contexte avant livraison.
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
                <p className="font-body text-[15px] text-se-navy/60 mb-4">{svc.subtitle}</p>

                {/* Description */}
                <p className="font-body text-[15px] leading-[1.7] text-se-navy/60 mb-5 flex-1">
                  {svc.description}
                </p>

                {/* Points */}
                <ul className="flex flex-col gap-2 mb-7">
                  {svc.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span className="text-se-teal text-[14px] mt-0.5 flex-shrink-0">✓</span>
                      <span className="font-body text-[14px] text-se-navy">{pt}</span>
                    </li>
                  ))}
                </ul>

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
