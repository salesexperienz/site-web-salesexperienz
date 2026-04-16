import Link from 'next/link'
import { DISCOVERY_URL } from '@/lib/constants'

// ─── Bloc Offre ───────────────────────────────────────────────────────────────
function OfferBlock() {
  return (
    <div className="relative rounded-2xl overflow-hidden p-8 md:p-10" style={{ background: '#162346' }}>
      {/* Lueurs décoratives */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(232,98,26,0.18),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,59,51,0.5),transparent_60%)] pointer-events-none" />
      {/* Ligne de séparation haute */}
      <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative flex flex-col md:flex-row gap-8 items-start md:items-center">
        {/* Icône */}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(232,98,26,0.18)', border: '1px solid rgba(232,98,26,0.3)' }}>
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
          <h3 className="font-display font-extrabold text-[22px] text-white mt-1 mb-2 leading-snug">
            DeepSignal — Prospection automatisée
          </h3>
          <p className="text-white/65 text-[14px] leading-relaxed">
            Un système clé en main qui détecte les signaux d'achat LinkedIn, personnalise les messages
            avec l'IA et gère les relances automatiquement.{' '}
            <strong className="text-white font-semibold">10 à 30 RDV qualifiés par mois</strong>, sans équipe commerciale dédiée.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            {['Détection de signaux', 'Personnalisation IA', 'Nurturing automatisé', 'ROI mesurable dès J30'].map((f) => (
              <span key={f} className="flex items-center gap-1.5 text-[12px] text-white/55">
                <span className="w-1 h-1 rounded-full bg-se-teal flex-shrink-0" />
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/services/deepsignal"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-se-orange text-white font-semibold text-[14px] px-6 py-3 rounded-full hover:bg-se-orange-h hover:shadow-[0_6px_20px_rgba(232,98,26,0.45)] transition-all duration-200 whitespace-nowrap"
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
    <div className="relative rounded-2xl overflow-hidden p-8 md:p-10 text-center" style={{ background: '#162346' }}>
      {/* Lueurs décoratives */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,98,26,0.14),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(20,59,51,0.4),transparent_55%)] pointer-events-none" />
      {/* Ligne de séparation haute */}
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
export default function ArticleFooterBlocks() {
  return (
    <div className="flex flex-col gap-6 mt-10">
      <OfferBlock />
      <ReadyBlock />
    </div>
  )
}
