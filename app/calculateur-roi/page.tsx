import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FadeUp from '@/components/FadeUp'
import CalculateurROI from '@/components/CalculateurROI'
import { DISCOVERY_URL } from '@/lib/constants'
import { Clock, TrendingDown, Zap } from 'lucide-react'

// ─── METADATA ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Calculateur ROI Automatisation — Combien coûte votre travail manuel ? | Sales Experienz',
  description:
    'Calculez en 2 minutes le coût caché de vos tâches répétitives et le gain potentiel de l\'automatisation pour votre entreprise. Outil gratuit par Sales Experienz.',
  keywords: [
    'calculateur ROI automatisation',
    'coût travail manuel PME',
    'gain automatisation n8n',
    'ROI automatisation B2B',
    'outil calcul productivité',
    'Sales Experienz',
  ],
  alternates: { canonical: 'https://www.salesexperienz.fr/calculateur-roi' },
  openGraph: {
    title: 'Calculateur ROI — Combien vous coûte vraiment le travail manuel ?',
    description: 'En 2 minutes, estimez vos pertes et votre potentiel de gain avec l\'automatisation.',
    url: 'https://www.salesexperienz.fr/calculateur-roi',
    siteName: 'Sales Experienz',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function CalculateurROIPage() {
  return (
    <main className="min-h-screen" style={{ background: '#0D1B3E' }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-10 px-6 lg:px-20" style={{ background: '#ffffff' }}>
        <div className="max-w-container mx-auto text-center">
          <FadeUp>
            <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-se-orange mb-5">
              Outil gratuit
            </span>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="font-display font-black text-5xl md:text-6xl lg:text-[72px] text-[#0D1B3E] leading-[1.05] tracking-tight mb-6">
              Combien vous coûte vraiment<br className="hidden md:block" />
              <span className="text-se-orange"> le travail manuel ?</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p className="font-body text-lg max-w-2xl mx-auto leading-relaxed mb-10 text-[#0D1B3E]">
              En 2 minutes, calculez le coût caché de vos tâches répétitives — et découvrez ce que l&apos;automatisation vous rapporterait concrètement sur votre activité.
            </p>
          </FadeUp>
          <FadeUp delay={0.18}>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-body" style={{ color: 'rgba(13,27,62,0.55)' }}>
              <span className="flex items-center gap-2"><span className="text-se-teal">✓</span> Résultat immédiat</span>
              <span className="flex items-center gap-2"><span className="text-se-teal">✓</span> Sans inscription</span>
              <span className="flex items-center gap-2"><span className="text-se-teal">✓</span> 100% gratuit</span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── TENSION ──────────────────────────────────────────────────────── */}
      <section className="pt-10 pb-20 px-6 lg:px-20" style={{ background: '#ffffff' }}>
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([
              {
                Icon: Clock,
                color: '#E8621A',
                bg: 'rgba(232,98,26,0.08)',
                title: 'Vous perdez du temps chaque semaine.',
                text: 'Vous le savez. Vous ne savez pas exactement combien — ni ce que ça représente en euros sur un an.',
              },
              {
                Icon: TrendingDown,
                color: '#0D1B3E',
                bg: 'rgba(13,27,62,0.07)',
                title: 'Sans chiffre, pas de décision.',
                text: 'Ce calculateur traduit votre situation en potentiel de gain concret. Pas une estimation floue — des chiffres à votre réalité.',
              },
              {
                Icon: Zap,
                color: '#4ABFB0',
                bg: 'rgba(74,191,176,0.1)',
                title: 'Chaque semaine sans système coûte.',
                text: "Le coût d'opportunité s'accumule silencieusement. L'automatisation, elle, s'amortit dès le premier mois.",
              },
            ] as const).map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.08}>
                <div className="rounded-2xl p-7 h-full" style={{ background: '#f8f9fb', border: '1px solid rgba(13,27,62,0.08)' }}>
                  <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl" style={{ background: item.bg }}>
                    <item.Icon size={22} strokeWidth={1.8} color={item.color} />
                  </div>
                  <h3 className="font-display font-bold text-[#0D1B3E] text-[17px] leading-snug mb-3">{item.title}</h3>
                  <p className="font-body text-[14px] leading-relaxed" style={{ color: 'rgba(13,27,62,0.6)' }}>{item.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALCULATEUR ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-20" id="calculateur">
        <div className="max-w-container mx-auto">
          <FadeUp>
            <CalculateurROI />
          </FadeUp>
        </div>
      </section>

      {/* ── APRÈS LE CALCUL — CE QUI SUIT ────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-20" style={{ background: '#162248' }}>
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — texte */}
            <FadeUp fromLeft>
              <span className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-se-teal mb-4">
                Étape suivante
              </span>
              <h2 className="font-display font-black text-3xl md:text-4xl text-white leading-tight tracking-tight mb-6">
                Après votre estimation :<br />
                <span className="text-se-orange">l&apos;audit de 45 minutes</span>
              </h2>
              <p className="font-body text-[15px] text-se-muted leading-relaxed mb-8">
                Le calculateur vous donne les chiffres. L&apos;audit de découverte — gratuit, 45 minutes, sans engagement — transforme ces chiffres en un plan d&apos;action priorisé, adapté à votre contexte.
              </p>
              <div className="flex flex-col gap-4 mb-10">
                {[
                  { n: '01', text: 'Analyse de vos processus commerciaux prioritaires' },
                  { n: '02', text: 'Identification des 3 automatisations à fort impact' },
                  { n: '03', text: 'Estimation chiffrée du potentiel de gain' },
                  { n: '04', text: 'Plan d\'action concret — prêt à démarrer sous 7 jours' },
                ].map(item => (
                  <div key={item.n} className="flex items-start gap-4">
                    <span className="font-display text-[12px] font-bold text-se-orange bg-se-orange/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">{item.n}</span>
                    <p className="font-body text-[14px] text-se-muted leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
              <a
                href={DISCOVERY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-se-orange hover:bg-se-orange-h text-white font-body font-semibold text-[15px] rounded-full px-8 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(232,98,26,0.5)]"
              >
                Réserver mon audit gratuit — 45 min
              </a>
              <p className="font-body text-[12px] text-se-muted mt-3">
                Sans engagement · 100% visio · Réponse sous 24h
              </p>
            </FadeUp>

            {/* Right — chiffres clés */}
            <FadeUp delay={0.1}>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { val: '47h',   lbl: 'Semaines de travail par an',      sub: 'base de calcul conservatrice' },
                  { val: 'x4',    lbl: 'ROI moyen constaté',              sub: 'en 12 mois sur les missions' },
                  { val: '2h',    lbl: 'De pilotage par semaine',         sub: 'après déploiement du système' },
                  { val: '7j',    lbl: 'Pour démarrer',                   sub: 'de la mission au premier résultat' },
                ].map(stat => (
                  <div key={stat.val} className="rounded-2xl p-6" style={{ background: '#1E2D5A', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="font-display font-black text-[36px] text-se-orange leading-none tracking-tight mb-2">{stat.val}</div>
                    <div className="font-body font-semibold text-[13px] text-white mb-1">{stat.lbl}</div>
                    <div className="font-body text-[11px] text-se-muted">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── FAQ COURTE ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-20" style={{ background: '#ebf4ec' }}>
        <div className="max-w-container mx-auto max-w-2xl">
          <FadeUp>
            <h2 className="font-display font-black text-3xl tracking-tight text-center mb-12" style={{ color: '#0D1B3E' }}>
              Questions fréquentes
            </h2>
          </FadeUp>
          <div className="flex flex-col gap-6">
            {[
              {
                q: 'Les chiffres sont-ils fiables ?',
                a: 'Le calculateur utilise des hypothèses conservatrices basées sur des cas réels. Le coût horaire multiplié par le nombre d\'heures perdues et de collaborateurs concernés, ajusté d\'un coefficient d\'impact (erreurs, blocages). L\'objectif est d\'ordre de grandeur, pas d\'audit comptable.',
              },
              {
                q: 'À quoi servent mes données (email, prénom) ?',
                a: 'À rien si vous ne cliquez pas sur "Réserver mon audit". Le calculateur fonctionne entièrement sans compte ni inscription. Si vous réservez un appel, vos données servent uniquement à préparer la session.',
              },
              {
                q: 'Est-ce que ça marche pour mon secteur ?',
                a: 'Le calculateur est conçu pour les PME et TPE B2B — conseil, services, immobilier, SaaS, industrie. Les domaines couverts (prospection, contenu, admin, reporting, onboarding…) sont présents dans tous les secteurs.',
              },
              {
                q: 'Et si mon résultat est trop bas ?',
                a: 'Même un gain de 10 000 €/an représente une mission qui s\'autofinance rapidement. L\'audit vous dira si le ROI justifie l\'investissement — et dans quel délai.',
              },
            ].map((item, i) => (
              <FadeUp key={item.q} delay={i * 0.06}>
                <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid rgba(13,27,62,0.08)' }}>
                  <h3 className="font-display font-bold text-[16px] mb-3" style={{ color: '#0D1B3E' }}>{item.q}</h3>
                  <p className="font-body text-[14px] leading-relaxed" style={{ color: 'rgba(13,27,62,0.6)' }}>{item.a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-20" style={{ background: '#162248', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-container mx-auto text-center">
          <FadeUp>
            <h2 className="font-display font-black text-3xl md:text-4xl text-white tracking-tight mb-4">
              Vous avez votre chiffre.<br />
              <span className="text-se-orange">Passons au plan.</span>
            </h2>
            <p className="font-body text-[15px] text-se-muted max-w-xl mx-auto mb-8 leading-relaxed">
              45 minutes pour transformer votre estimation en un plan d&apos;action concret. Sans engagement, 100% visio.
            </p>
            <a
              href={DISCOVERY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-se-orange hover:bg-se-orange-h text-white font-body font-bold text-[16px] rounded-full px-10 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(232,98,26,0.5)]"
            >
              Réserver mon audit gratuit →
            </a>
            <p className="font-body text-[12px] text-se-muted mt-4">
              Premier échange offert · Sans engagement · Laurent Guyonvarch, Sales Experienz
            </p>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </main>
  )
}
