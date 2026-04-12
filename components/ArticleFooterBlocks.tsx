import Link from 'next/link'
import { DISCOVERY_URL } from '@/lib/constants'

// ─── Bloc Offre ───────────────────────────────────────────────────────────────
function OfferBlock() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#c8e6cc] p-8 md:p-10" style={{ background: '#eaf4ec' }}>
      {/* Dégradé décoratif */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,98,26,0.06),transparent_60%)]" />

      <div className="relative flex flex-col md:flex-row gap-8 items-start md:items-center">
        {/* Icône */}
        <div className="w-14 h-14 rounded-2xl bg-se-orange/15 flex items-center justify-center flex-shrink-0">
          <svg className="w-7 h-7 text-se-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        {/* Texte */}
        <div className="flex-1 min-w-0">
          <span className="text-se-orange text-[11px] font-bold uppercase tracking-[0.15em]">
            Notre offre phare
          </span>
          <h3 className="font-display font-extrabold text-[22px] text-gray-900 mt-1 mb-2 leading-snug">
            DeepSignal — Prospection automatisée
          </h3>
          <p className="text-gray-700 text-[14px] leading-relaxed">
            Un système clé en main qui détecte les signaux d'achat LinkedIn, personnalise les messages
            avec l'IA et gère les relances automatiquement. <strong className="text-gray-900 font-semibold">10 à 30 RDV qualifiés par mois</strong>, sans équipe commerciale dédiée.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            {['Détection de signaux', 'Personnalisation IA', 'Nurturing automatisé', 'ROI mesurable dès J30'].map((f) => (
              <span key={f} className="flex items-center gap-1.5 text-[12px] text-gray-700">
                <span className="w-1 h-1 rounded-full bg-se-teal" />
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/services/deepsignal"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-se-orange text-white font-semibold text-[14px] px-6 py-3 rounded-full hover:bg-se-orange-h hover:shadow-[0_6px_20px_rgba(232,98,26,0.35)] transition-all duration-200 whitespace-nowrap"
        >
          Découvrir DeepSignal
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

// ─── Bloc Prêt à aller plus loin ─────────────────────────────────────────────
function ReadyBlock() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#c8e6cc] p-8 md:p-10 text-center" style={{ background: '#eaf4ec' }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,98,26,0.07),transparent_70%)]" />

      <div className="relative">
        <span className="inline-block text-se-teal text-[11px] font-bold uppercase tracking-[0.15em] mb-3">
          Passez à l'action
        </span>
        <h3 className="font-display font-extrabold text-[28px] md:text-[34px] text-gray-900 leading-tight mb-4">
          Prêt à automatiser votre croissance ?
        </h3>
        <p className="text-gray-700 text-[15px] leading-relaxed max-w-xl mx-auto mb-8">
          En 45 min, on analyse ensemble vos processus et on identifie les 3 leviers d'automatisation
          les plus rapides pour votre entreprise. Gratuit, sans engagement.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={DISCOVERY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-se-orange text-white font-semibold text-[15px] px-8 py-4 rounded-full hover:bg-se-orange-h hover:shadow-[0_8px_24px_rgba(232,98,26,0.40)] transition-all duration-200 hover:-translate-y-0.5"
          >
            Réserver mon échange gratuit
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 border border-gray-900/20 text-gray-900 font-medium text-[15px] px-8 py-4 rounded-full hover:border-gray-900/40 hover:bg-gray-900/5 transition-all duration-200"
          >
            Lire d'autres articles
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 mt-6">
          {['45 min', '100% gratuit', 'Sans engagement', 'En visio depuis toute la France'].map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-[12px] text-gray-600">
              <span className="text-se-teal">✓</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Bloc Réseaux sociaux ─────────────────────────────────────────────────────
function SocialBlock() {
  const socials = [
    {
      name: 'LinkedIn',
      handle: '@laurentguyonvarch',
      description: "Stratégies d'automatisation et coulisses de l'agence",
      href: 'https://www.linkedin.com/in/laurentguyonvarch/',
      color: 'bg-[#0A66C2]',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      handle: 'Sales Experienz',
      description: "Tutoriels n8n, démos d'outils IA et cas clients",
      href: 'https://www.youtube.com/@salesexperienz',
      color: 'bg-[#FF0000]',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
        </svg>
      ),
    },
    {
      name: 'Skool',
      handle: 'Potentiel Commercial',
      description: 'La communauté gratuite pour développer votre potentiel commercial',
      href: 'https://www.skool.com/potentiel-commercial-8000/about',
      color: 'bg-[#00B4D8]',
      icon: (
        <img
          src="/Modele-photo-Laurent.jpg"
          alt="Laurent Guyonvarch"
          className="w-full h-full object-cover rounded-xl"
        />
      ),
    },
  ]

  return (
    <div className="rounded-2xl border border-[#c8e6cc] p-8 md:p-10" style={{ background: '#eaf4ec' }}>
      <div className="text-center mb-8">
        <span className="text-se-teal text-[11px] font-bold uppercase tracking-[0.15em]">
          Restons connectés
        </span>
        <h3 className="font-display font-extrabold text-[22px] text-gray-900 mt-2">
          Suivez Sales Experienz
        </h3>
        <p className="text-gray-700 text-[14px] mt-2">
          Conseils pratiques, outils et coulisses — chaque semaine.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-5 rounded-xl border border-[#c8e6cc] bg-white hover:border-se-orange/30 hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className={`w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center text-white flex-shrink-0 ${s.color}`}>
              {s.icon}
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-[15px] text-gray-900 group-hover:text-se-orange transition-colors">
                {s.name}
              </p>
              <p className="text-se-teal text-[12px] mb-1">{s.handle}</p>
              <p className="text-gray-600 text-[12px] leading-snug">{s.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function ArticleFooterBlocks() {
  return (
    <div className="flex flex-col gap-6 mt-10">
      <OfferBlock />
      <ReadyBlock />
      <SocialBlock />
    </div>
  )
}
