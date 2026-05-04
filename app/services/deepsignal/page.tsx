import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SocialBlock from '@/components/SocialBlock'
import RecentArticles from '@/components/RecentArticles'
import FadeUp from '@/components/FadeUp'
import DeepSignalAccordion from '@/components/DeepSignalAccordion'
import About from '@/components/About'
import HeroStats from '@/components/HeroStats'
import { DISCOVERY_URL } from '@/lib/constants'
import { deepSignalSchema } from '@/lib/schema-deep-signal'

// ─── METADATA ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Prospection commerciale automatisée à Sète (34) — SalesExperienz',
  description:
    "Automatisez votre prospection B2B depuis Sète avec Deep Signal : détection de signaux d'intention, personnalisation IA, 10 à 60 RDV/mois. RDV gratuit.",
  keywords: [
    'prospection commerciale automatisée Sète',
    'automatisation prospection B2B Hérault',
    'prospection LinkedIn automatisée 34',
    'système prospection B2B n8n',
    'signaux intention achat',
    'Deep Signal SalesExperienz',
  ],
  authors: [{ name: 'Laurent Guyonvarch', url: 'https://www.salesexperienz.fr/a-propos' }],
  openGraph: {
    title: 'Prospection commerciale automatisée à Sète — Deep Signal',
    description:
      'Le système qui prospecte uniquement ceux qui ont levé la main — et qui tourne sans vous.',
    url: 'https://www.salesexperienz.fr/services/deepsignal',
    siteName: 'SalesExperienz',
    images: [
      {
        url: 'https://www.salesexperienz.fr/og-deep-signal.jpg',
        width: 1200,
        height: 630,
        alt: 'Deep Signal - Prospection automatisée à Sète',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prospection commerciale automatisée — Deep Signal',
    description:
      "Détection de signaux d'intention + personnalisation IA + autonomie complète. Depuis Sète.",
    images: ['https://www.salesexperienz.fr/og-deep-signal.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: {
    canonical: 'https://www.salesexperienz.fr/services/deepsignal',
  },
}

// ─── DONNÉES ──────────────────────────────────────────────────────────────────

const modules = [
  {
    color: '#4ABFB0',
    bg: 'rgba(74,191,176,0.10)',
    icon: '🔵',
    label: 'LinkedIn',
    signal: 'Commentaires, groupes, recrutement actif',
    output: 'Message personnalisé via Claude AI',
  },
  {
    color: '#E8621A',
    bg: 'rgba(232,98,26,0.10)',
    icon: '📧',
    label: 'Email',
    signal: 'ICP identifié par domaine',
    output: 'Séquence 3 emails multi-domaines rotatifs',
  },
  {
    color: '#8B9CC8',
    bg: 'rgba(139,156,200,0.10)',
    icon: '🔄',
    label: 'Nurturing',
    signal: 'Comportement CRM (ouverture, clic, inactivité)',
    output: 'Scoring + déclenchement automatique',
  },
  {
    color: '#4ABFB0',
    bg: 'rgba(74,191,176,0.08)',
    icon: '🔍',
    label: 'SEO',
    signal: 'Recherche active sur votre thématique',
    output: 'Articles E-E-A-T + capture leads chauds',
  },
]

const topSignaux = [
  {
    rank: '🥇',
    title: 'Visite page Pricing',
    desc: "Signal d'intention maximal.",
    badge: 'Alerte < 15 min',
    pts: '+20 pts CRM',
  },
  {
    rank: '🥈',
    title: "Offre d'emploi SDR/Growth",
    desc: 'Budget débloqué, douleur publique.',
    badge: 'Contact < 48h',
    pts: '+18 pts CRM',
  },
  {
    rank: '🥉',
    title: 'Score comportemental ≥ 80 pts',
    desc: 'Cumul de signaux = priorité absolue.',
    badge: 'Alerte immédiate',
    pts: 'Top priorité',
  },
  {
    rank: '4',
    title: 'Email ouvert 3×/48h',
    desc: 'Le contenu circule en interne.',
    badge: 'Alerte < 1h',
    pts: '+15 pts CRM',
  },
  {
    rank: '5',
    title: 'Commentaire LinkedIn ciblé',
    desc: 'Brise-glace 100% contextualisé.',
    badge: 'Réponse contextualisée',
    pts: '+12 pts CRM',
  },
]

const compareRows = [
  {
    before: '1 000 envois/semaine, < 5% réponse',
    after: '50–100 prospects à signal fort, taux ×3',
  },
  {
    before: 'Pipeline imprévisible',
    after: 'Pipeline documenté signal → RDV → CA',
  },
  {
    before: '2–3h/jour de suivi commercial',
    after: '< 2h/semaine de supervision',
  },
  {
    before: '40–80k€/an de coûts SDR',
    after: 'Zéro recrutement, propriété complète J1',
  },
  {
    before: 'Dépendance agence externe',
    after: 'Workflows n8n 100% propriété du client',
  },
]

const timelineSteps = [
  {
    num: '01',
    title: 'OBSERVER',
    desc: 'Inventaire des tâches répétitives et process commerciaux existants.',
  },
  {
    num: '02',
    title: 'MESURER',
    desc: 'Calcul du coût réel : Temps × Fréquence = heures perdues/semaine.',
  },
  {
    num: '03',
    title: 'PRIORISER',
    desc: 'Méthode ICE (Impact × Confiance × Facilité), score ≥ 23 = Quick Win.',
  },
  {
    num: '04',
    title: 'RECOMMANDER',
    desc: 'Plan personnalisé, démarrage par le module à plus fort ROI.',
  },
]

const objections = [
  {
    question: '"Ça ne marchera pas dans mon secteur"',
    answer:
      "La Carte des Opportunités est préalable à tout déploiement. On ne lance d'automatisation que si c'est vraiment utile pour vous. C'est une garantie que vous repartez avec de la valeur, quelle que soit la décision.",
  },
  {
    question: '"Je vais me faire bannir de LinkedIn"',
    answer:
      "Des protocoles de sécurité sont intégrés à chaque workflow : limites journalières en-dessous des seuils de détection, rotation de domaines, warming progressif. Aucun client n'a été banni à ce jour.",
  },
  {
    question: "\"C'est trop technique pour moi\"",
    answer:
      "Zéro compétence technique requise. Le déploiement est clé en main. Une session de passation de 2h est incluse pour garantir votre autonomie complète à J90.",
  },
  {
    question: '"Est-ce conforme au RGPD ?"',
    answer:
      "Deep Signal n'exploite que des données comportementales publiques : commentaires LinkedIn, offres d'emploi publiées, emails opt-in. Aucune donnée privée n'est collectée. L'approche est documentée.",
  },
  {
    question: '"Comment prouver le ROI à ma direction ?"',
    answer:
      "Un tableau de bord signal → RDV → CA est mis en place dès J1. Chaque rendez-vous est tracé jusqu'à son signal d'origine. Le ROI est calculable dès J30.",
  },
  {
    question: '"Quel est le vrai coût ?"',
    answer:
      "Les workflows démarrent à partir de 1 000 €. Le ROI est calculé lors de la Carte des Opportunités, avant tout engagement. Un système complet s'autofinance en 1 à 3 mois en évitant les coûts SDR ou agence.",
  },
]

const faqItems = [
  {
    question: "Qu'est-ce que la prospection commerciale automatisée ?",
    answer:
      "La prospection automatisée est un système qui détecte en temps réel les signaux d'intention comportementaux de prospects qualifiés et leur envoie automatiquement un message personnalisé par IA, sans intervention humaine.",
  },
  {
    question: 'Combien de rendez-vous peut générer Deep Signal par mois ?',
    answer:
      "Entre 3 et 15 rendez-vous qualifiés par mois selon le secteur et l'ICP cible. Le taux de réponse est multiplié par 3 vs la prospection froide classique — car seuls les prospects ayant émis un signal réel sont contactés.",
  },
  {
    question: 'Combien de temps faut-il pour déployer le système ?',
    answer:
      "À partir de 15 jours. Aucune compétence technique requise. Autonomie garantie à J30 via une session de passation de 2h incluse dans chaque déploiement.",
  },
  {
    question: 'Deep Signal est-il conforme au RGPD ?',
    answer:
      "Oui. Seules des données comportementales publiques sont exploitées : commentaires LinkedIn, offres d'emploi, comportement email opt-in. Aucune donnée privée n'est collectée.",
  },
  {
    question: "Quel est le coût d'un système Deep Signal ?",
    answer:
      "À partir de 1 000 € par workflow. Un système complet s'autofinance en 1 à 3 mois en évitant les coûts SDR (40–80k€/an) ou agence (15–40k€/an).",
  },
  {
    question: "Qu'est-ce que la Carte des Opportunités ?",
    answer:
      "Un audit stratégique gratuit en 4 étapes (Observer, Mesurer, Prioriser, Recommander) qui identifie les processus automatisables et calcule le temps récupérable avant tout engagement. Durée : 45 min. Sans engagement.",
  },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function DeepSignalPage() {
  return (
    <main>
      <Navbar />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-se-navy overflow-hidden">
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
            backgroundSize: '200px 200px',
          }}
        />
        {/* Radial glows */}
        <div
          className="absolute -top-32 -right-32 w-[700px] h-[700px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(74,191,176,0.12) 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 -left-20 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,98,26,0.08) 0%, transparent 65%)' }}
        />
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, #E8621A 40%, #4ABFB0 60%, transparent 100%)',
          }}
        />

        <div className="relative z-10 max-w-container mx-auto px-6 lg:px-20 pt-[130px] pb-[80px]">
          <div className="grid grid-cols-1 lg:grid-cols-[54fr_46fr] gap-10 lg:gap-16 items-start">

            {/* ── Colonne gauche : texte ─────────────────────────────────── */}
            <div className="flex flex-col order-1">

              {/* Badge géo */}
              <FadeUp>
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-7 self-start"
                  style={{ background: 'rgba(74,191,176,0.12)', border: '1px solid rgba(74,191,176,0.25)' }}>
                  <span className="text-se-teal text-[13px]">📍</span>
                  <span className="font-body text-[13px] font-medium text-se-teal tracking-wide">
                    Sète · Hérault (34) · France
                  </span>
                </div>
              </FadeUp>

              {/* H1 */}
              <FadeUp delay={0.05}>
                <h1
                  className="font-display font-bold leading-[1.15] mb-5"
                  style={{ fontSize: 'clamp(28px, 3.8vw, 52px)' }}
                >
                  <span className="text-white block">Prospection commerciale</span>
                  <span className="text-white block">automatisée à Sète —</span>
                  <span className="text-se-orange block mt-1">Deep Signal</span>
                </h1>
              </FadeUp>

              {/* Sous-titre */}
              <FadeUp delay={0.1}>
                <p className="font-body text-[17px] leading-[1.75] text-white/70 mb-6">
                  Deep Signal détecte en temps réel les prospects qui ont levé la main
                  et leur envoie automatiquement le bon message —{' '}
                  <strong className="text-white font-medium">comme si c&apos;était vous.</strong>
                </p>
              </FadeUp>

              {/* Points clés */}
              <FadeUp delay={0.12}>
                <ul className="flex flex-col gap-2.5 mb-5">
                  {[
                    { icon: '⚡', text: 'Détection automatique des signaux d\'achat' },
                    { icon: '✓',  text: 'Séquences multicanal (email + LinkedIn)' },
                    { icon: '⏱', text: 'Déployé en 15 jours, opérationnel J+1' },
                    { icon: '🔒', text: 'Vos workflows vous appartiennent à 100%' },
                  ].map((pt) => (
                    <li key={pt.text} className="flex items-center gap-3">
                      <span className="text-se-teal text-[15px] w-5 flex-shrink-0 text-center">{pt.icon}</span>
                      <span className="font-body text-[15px] text-white/80">{pt.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Point mis en avant */}
                <div className="rounded-xl px-5 py-4 mb-6"
                  style={{ background: 'rgba(74,191,176,0.08)', border: '1px solid rgba(74,191,176,0.22)' }}>
                  <div className="flex items-start gap-3">
                    <span className="text-[18px] flex-shrink-0 mt-0.5">✉️</span>
                    <div>
                      <p className="font-body text-[15px] font-medium text-white">
                        Messages personnalisés à chaque contact envoyés automatiquement
                      </p>
                      <p className="font-body text-[13px] text-se-teal mt-1">
                        Le bon argument, au bon prospect, au bon moment
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>

              {/* Stats — compteurs animés */}
              <FadeUp delay={0.15}>
                <HeroStats />
              </FadeUp>

              {/* Lien ancre */}
              <FadeUp delay={0.2}>
                <a
                  href="#comment-ca-marche"
                  className="font-body text-[15px] text-se-teal hover:text-white transition-colors duration-200 flex items-center gap-1 self-start"
                >
                  Voir comment ça marche
                  <span className="text-[18px]">↓</span>
                </a>
              </FadeUp>

            </div>

            {/* ── Colonne droite : calendrier Brevo ─────────────────────── */}
            <FadeUp delay={0.12} className="order-2 w-full">
              <div
                className="rounded-3xl overflow-hidden animate-pulse-glow"
                style={{
                  border: '1.5px solid rgba(232,98,26,0.35)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                {/* Header du bloc */}
                <div
                  className="flex items-center justify-between px-5 py-3"
                  style={{
                    background: 'linear-gradient(90deg, rgba(232,98,26,0.18) 0%, rgba(74,191,176,0.10) 100%)',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[16px]">📅</span>
                    <span className="font-display font-bold text-[14px] text-white">
                      Réserver ma Carte des Opportunités
                    </span>
                  </div>
                  <span
                    className="font-body text-[11px] font-medium rounded-full px-3 py-1"
                    style={{ background: 'rgba(74,191,176,0.15)', color: '#4ABFB0', border: '1px solid rgba(74,191,176,0.25)' }}
                  >
                    Gratuit
                  </span>
                </div>

                {/* iFrame Brevo */}
                <div id="agenda">
                  <iframe
                    width="100%"
                    height="720"
                    src="https://meet.brevo.com/laurent-guyonvarch/borderless?l=rendez-vous-decouverte"
                    title="Réserver un rendez-vous découverte — SalesExperienz Deep Signal"
                    loading="lazy"
                    style={{ display: 'block', background: '#fff', border: 'none' }}
                  />
                </div>

                {/* Footer réassurance */}
                <div
                  className="flex items-center justify-center gap-4 px-5 py-3 flex-wrap"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {['45 min', '100% gratuit', 'Sans engagement', 'En visio'].map((item) => (
                    <span key={item} className="flex items-center gap-1 font-body text-[12px] text-se-muted">
                      <span className="text-se-teal text-[10px]">✓</span>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>

          </div>
        </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      </section>

      {/* ── Ruban logos ── */}
      <div className="relative overflow-hidden py-6 bg-white border-t border-se-navy/[0.07]">
        <div className="absolute left-0 top-0 bottom-0 w-[6%] z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, white, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-[6%] z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, white, transparent)' }} />
        <div className="flex gap-12 items-center"
          style={{ animation: 'marquee 28s linear infinite', width: 'max-content' }}>
          {[
            { src: '/claude_logo.jpeg',       alt: 'Claude AI' },
            { src: '/logo-n8n.png',           alt: 'n8n' },
            { src: '/Chat GPT.png',           alt: 'ChatGPT' },
            { src: '/Google_Gemini_logo.png', alt: 'Gemini' },
            { src: '/Perplexity.png',         alt: 'Perplexity' },
            { src: '/Vercel.png',             alt: 'Vercel' },
            { src: '/Next.js.png',            alt: 'Next.js' },
            { src: '/Remotion.png',           alt: 'Remotion' },
            { src: '/Wordpress.png',          alt: 'WordPress' },
            { src: '/Brevo.png',              alt: 'Brevo' },
            { src: '/Data for SEO.png',       alt: 'DataForSEO' },
            { src: '/Unipile.png',            alt: 'Unipile' },
            { src: '/Apify.png',              alt: 'Apify' },
            { src: '/claude_logo.jpeg',       alt: 'Claude AI 2' },
            { src: '/logo-n8n.png',           alt: 'n8n 2' },
            { src: '/Chat GPT.png',           alt: 'ChatGPT 2' },
            { src: '/Google_Gemini_logo.png', alt: 'Gemini 2' },
            { src: '/Perplexity.png',         alt: 'Perplexity 2' },
            { src: '/Vercel.png',             alt: 'Vercel 2' },
            { src: '/Next.js.png',            alt: 'Next.js 2' },
            { src: '/Remotion.png',           alt: 'Remotion 2' },
            { src: '/Wordpress.png',          alt: 'WordPress 2' },
            { src: '/Brevo.png',              alt: 'Brevo 2' },
            { src: '/Data for SEO.png',       alt: 'DataForSEO 2' },
            { src: '/Unipile.png',            alt: 'Unipile 2' },
            { src: '/Apify.png',              alt: 'Apify 2' },
          ].map((logo) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={logo.alt} src={logo.src} alt={logo.alt}
              style={{ height: '32px', width: 'auto', objectFit: 'contain', flexShrink: 0, opacity: 0.75 }} />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1b — PROFIL CLIENT (ICP)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-[80px] lg:py-[120px]" style={{ background: 'rgb(234,244,236)' }}>
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-14 max-w-2xl">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              POUR QUI ?
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-se-navy mb-4">
              Vous êtes{' '}
              <span className="text-se-orange">au bon endroit</span> si…
            </h2>
            <p className="font-body text-[17px] leading-[1.7] text-se-navy/60">
              Deep Signal est peut-être fait pour vous. Si vous vous reconnaissez dans l&apos;un de ces profils, nous pouvons probablement travailler ensemble.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                num: '01',
                title: 'Fondateur / Dirigeant PME',
                tags: ['5 à 50 salariés', 'Services B2B', 'CA 500k – 5M€'],
                quote: "Mon CA dépend encore trop de mon réseau. Si je décroche moins souvent le téléphone, les ventes ralentissent.",
                points: [
                  'Pas de SDR dédié en interne',
                  'Pipeline imprévisible, trop dépendant de vous',
                  'Vous voulez scaler sans recruter proportionnellement',
                ],
              },
              {
                num: '02',
                title: 'Consultant / Expert B2B indépendant',
                tags: ['Solopreneur', 'CA 80k – 300k€', 'Expert sectoriel'],
                quote: "Je prospecte uniquement par recommandation. C'est confortable mais fragile. Je ne contrôle pas mon pipeline.",
                points: [
                  'Dépendance aux recommandations > 70% du CA',
                  'Pipeline à l\'arrêt dès que vous êtes en mission',
                  'Vous voulez prospecter sans compromis sur votre image',
                ],
              },
              {
                num: '03',
                title: 'Dirigeant Scale-up avec agence active',
                tags: ['20 – 100 salariés', 'SaaS B2B', '1 – 10M€ ARR'],
                quote: "Je paie 4 000 €/mois une agence. Ils génèrent des RDV, mais je ne possède rien. Si je les arrête, je repars de zéro.",
                points: [
                  'Vous payez sans construire d\'actif commercial',
                  'Les messages de l\'agence ressemblent à du spam',
                  'Vous voulez un pipeline traçable qui vous appartient',
                ],
              },
            ].map((icp, i) => (
              <FadeUp key={icp.num} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 border border-se-navy/10 hover:border-se-orange/30 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.10)] transition-all duration-200 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-display font-bold text-[42px] leading-none text-se-orange">
                      {icp.num}
                    </span>
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {icp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-body text-[11px] font-medium rounded-full px-2.5 py-1 text-se-navy/60 bg-se-navy/[0.06] border border-se-navy/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-[20px] text-se-navy mb-4 leading-snug">
                    {icp.title}
                  </h3>
                  <blockquote className="font-body text-[15px] italic leading-[1.75] text-se-navy border-l-3 border-se-orange pl-4 mb-6">
                    &ldquo;{icp.quote}&rdquo;
                  </blockquote>
                  <ul className="flex flex-col gap-3 mt-auto">
                    {icp.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <span className="text-se-teal text-[15px] mt-0.5 flex-shrink-0 font-bold">✓</span>
                        <span className="font-body text-[15px] font-medium text-se-navy">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <p className="font-display font-bold text-[20px] text-se-navy text-center">
              Vous vous reconnaissez ?{' '}
              <span className="text-se-orange">Alors vous êtes au bon endroit.</span>
            </p>
          </FadeUp>

        </div>

      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2 — DÉFINITION (Capsule IA)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-[80px] lg:py-[120px]">
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp>
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-4">
              DÉFINITION
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-se-navy mb-8 max-w-3xl">
              Qu'est-ce que la prospection commerciale automatisée ?
            </h2>
          </FadeUp>

          {/* Capsule IA */}
          <FadeUp delay={0.05}>
            <div
              className="rounded-2xl px-7 py-6 mb-10"
              style={{ background: 'rgba(74,191,176,0.08)', border: '1.5px solid rgba(74,191,176,0.30)', borderLeft: '4px solid #4ABFB0' }}
            >
              <p className="font-body text-[17px] leading-[1.75] text-se-navy font-medium">
                La prospection automatisée détecte en temps réel les signaux d'intention de
                prospects qualifiés et envoie automatiquement un message personnalisé par IA.
              </p>
            </div>
          </FadeUp>

          {/* Élaboration */}
          <FadeUp delay={0.1}>
            <p className="font-body text-[17px] leading-[1.75] text-se-navy/70 max-w-3xl mb-6">
              La prospection froide classique envoie 1 000 messages génériques pour obtenir
              moins de 5% de réponses. Deep Signal inverse le rapport : on ne contacte que les
              50 à 100 prospects qui ont <strong className="text-se-navy">déjà levé la main</strong> — et le taux de réponse est
              multiplié par 3.
            </p>
            <p className="font-body text-[17px] leading-[1.75] text-se-navy/70 max-w-3xl mb-6">
              Concrètement, chaque module du système surveille en permanence des signaux
              comportementaux publics : une offre d'emploi SDR publiée, une visite répétée de
              votre page tarifs, un commentaire sur un post LinkedIn ciblé. Dès qu'un signal est
              détecté, un message personnalisé est généré par Claude AI et envoyé au bon moment —
              sans aucune intervention manuelle.
            </p>
            <p className="font-body text-[17px] leading-[1.75] text-se-navy/70 max-w-3xl mb-10">
              Le résultat : vous parlez uniquement aux prospects qui ont déjà montré un intérêt
              réel. Moins de volume, plus de pertinence, et un pipeline commercial qui tourne
              même quand vous n'êtes pas là.
            </p>
          </FadeUp>

          {/* 3 types de signaux */}
          <FadeUp delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: '🔵', label: 'Comportement LinkedIn', desc: "Commentaires, groupes, offres d'emploi SDR publiées" },
                { icon: '📧', label: 'Comportement Email', desc: 'Ouvertures multiples, clics, rebonds sur page tarifs' },
                { icon: '🔍', label: 'Signaux de recrutement', desc: "Publication d'un poste SDR/Growth = budget débloqué" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-6 border border-se-navy/10 hover:border-se-teal/40 hover:-translate-y-1 transition-all duration-200"
                  style={{ background: 'rgba(74,191,176,0.04)' }}
                >
                  <span className="text-[28px] mb-3 block">{s.icon}</span>
                  <p className="font-display font-bold text-[16px] text-se-navy mb-2">{s.label}</p>
                  <p className="font-body text-[14px] leading-[1.6] text-se-navy/60">{s.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3 — DOULEURS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-se-navy-alt py-[80px] lg:py-[120px]">
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-12">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              LE DIAGNOSTIC
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-white max-w-3xl">
              Pourquoi votre prospection actuelle{' '}
              <span className="text-se-orange">vous épuise sans résultats prévisibles ?</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎲',
                title: "\"Je prospecte à l'aveugle\"",
                text: "Vous envoyez des messages génériques à des inconnus. Taux de réponse < 5%, réputation d'expéditeur dégradée, pipeline imprévisible. La prospection ressemble à une loterie.",
              },
              {
                icon: '❓',
                title: '"Je ne sais pas qui est prêt à acheter maintenant"',
                text: "Vous avez des milliers de contacts LinkedIn et CRM — mais aucun système pour détecter qui est chaud aujourd'hui. La même séquence part pour tout le monde.",
              },
              {
                icon: '⚖️',
                title: "\"Ma prospection dépend d'une seule personne\"",
                text: "Si votre commercial ou SDR s'arrête, le pipeline s'effondre. Scaler signifie recruter — ce qui multiplie les coûts de façon non linéaire.",
              },
            ].map((card, i) => (
              <FadeUp key={card.title} delay={i * 0.1}>
                <div className="bg-se-card border border-white/[0.06] rounded-2xl p-8 h-full transition-all duration-[250ms] hover:-translate-y-1.5 hover:border-se-orange/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                  <div className="w-12 h-12 bg-se-orange/[0.12] rounded-[12px] flex items-center justify-center mb-5">
                    <span className="text-[22px]">{card.icon}</span>
                  </div>
                  <h3 className="font-display font-bold text-[19px] text-white mb-3 leading-snug">{card.title}</h3>
                  <p className="font-body text-[15px] leading-[1.75] text-white">{card.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4 — LES 4 MODULES DEEP SIGNAL
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="comment-ca-marche" className="bg-se-navy py-[80px] lg:py-[120px]">
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-4">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              LE SYSTÈME
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-white mb-5 max-w-3xl">
              Comment fonctionne Deep Signal ?
            </h2>
          </FadeUp>

          {/* Capsule IA */}
          <FadeUp delay={0.05}>
            <div
              className="rounded-2xl px-7 py-5 mb-12 max-w-3xl"
              style={{ background: 'rgba(74,191,176,0.08)', border: '1.5px solid rgba(74,191,176,0.20)', borderLeft: '4px solid #4ABFB0' }}
            >
              <p className="font-body text-[15px] leading-[1.75] text-white/80">
                Deep Signal est un écosystème de prospection B2B en 4 modules : LinkedIn, Email,
                Nurturing et SEO, orchestrés par détection de signaux comportementaux.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((mod, i) => (
              <FadeUp key={mod.label} delay={i * 0.08}>
                <div
                  className="rounded-2xl p-7 transition-all duration-[250ms] hover:-translate-y-1.5"
                  style={{
                    background: mod.bg,
                    border: `1.5px solid ${mod.color}44`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[28px]">{mod.icon}</span>
                    <span
                      className="font-display font-bold text-[20px]"
                      style={{ color: mod.color }}
                    >
                      {mod.label}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-body text-[11px] font-medium uppercase tracking-[0.15em] text-se-muted mb-1">
                        Signal capté
                      </p>
                      <p className="font-body text-[15px] text-white">{mod.signal}</p>
                    </div>
                    <div
                      className="h-px"
                      style={{ background: `${mod.color}20` }}
                    />
                    <div>
                      <p className="font-body text-[11px] font-medium uppercase tracking-[0.15em] text-se-muted mb-1">
                        Ce que ça produit
                      </p>
                      <p
                        className="font-body text-[15px] font-medium"
                        style={{ color: mod.color }}
                      >
                        {mod.output}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4b — MOTEUR TECHNIQUE (n8n + agents IA)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-[80px] lg:py-[120px]">
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Colonne gauche — texte */}
            <div>
              <FadeUp>
                <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
                  MOTEUR TECHNIQUE
                </p>
                <h2 className="font-display font-bold text-[28px] md:text-[38px] leading-[1.2] text-se-navy mb-6">
                  Propulsé par n8n et des agents IA spécialisés
                </h2>
              </FadeUp>

              <FadeUp delay={0.08}>
                <p className="font-body text-[17px] leading-[1.7] text-se-navy/60 mb-6">
                  Deep Signal repose sur <strong className="text-se-navy">n8n</strong> — le moteur d&apos;orchestration open-source qui connecte chaque brique du système. Chaque workflow tourne en autonomie complète, 24h/24, sans intervention humaine.
                </p>
                <p className="font-body text-[17px] leading-[1.7] text-se-navy/60 mb-8">
                  Au cœur de la personnalisation : <strong className="text-se-navy">Claude AI</strong> (Anthropic), qui rédige chaque message à partir du signal comportemental détecté — contexte, ton, accroche. Zéro template générique.
                </p>
              </FadeUp>

              <FadeUp delay={0.14}>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'n8n', desc: 'Orchestration des workflows' },
                    { label: 'Claude AI', desc: 'Personnalisation des messages' },
                    { label: 'Agent LinkedIn', desc: 'Détection & envoi de messages' },
                    { label: 'Agent Email', desc: 'Séquences multi-domaines' },
                    { label: 'Agent SEO', desc: 'Surveillance de mots-clés' },
                    { label: 'Agent Brevo', desc: 'Nurturing & scoring CRM' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl p-4 border border-se-navy/08 bg-gray-50 hover:border-se-teal/30 transition-colors duration-200"
                    >
                      <p className="font-display font-bold text-[14px] text-se-navy mb-0.5">{item.label}</p>
                      <p className="font-body text-[12px] text-se-navy/50">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Colonne droite — screenshot workflow */}
            <FadeUp delay={0.1}>
              {/* animate-float appliqué sur le wrapper entier pour éviter le clip overflow */}
              <div className="animate-float" style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.12)' }}>
                <div className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid rgba(74,191,176,0.25)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/exemple-wokflow.png"
                  alt="Exemple de workflow n8n Deep Signal — SalesExperienz"
                  className="w-full block"
                />
                <div
                  className="px-5 py-3 flex items-center gap-2"
                  style={{ background: '#0D1B3E' }}
                >
                  <span className="w-2 h-2 rounded-full bg-se-teal flex-shrink-0" />
                  <p className="font-body text-[13px] text-white/60">
                    Workflow Deep Signal LinkedIn — détection, analyse et envoi personnalisé par Claude AI
                  </p>
                </div>
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5 — TOP SIGNAUX
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-[80px] lg:py-[120px]" style={{ background: 'rgb(234,244,236)' }}>
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-4">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              DONNÉES ORIGINALES
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-se-navy mb-5 max-w-3xl">
              Quels sont les signaux d'intention qui déclenchent une prospection automatique ?
            </h2>
          </FadeUp>

          {/* Capsule IA */}
          <FadeUp delay={0.05}>
            <div
              className="rounded-2xl px-7 py-5 mb-10 max-w-3xl"
              style={{ background: 'rgba(74,191,176,0.08)', border: '1.5px solid rgba(74,191,176,0.30)', borderLeft: '4px solid #4ABFB0' }}
            >
              <p className="font-body text-[15px] leading-[1.75] text-se-navy">
                Deep Signal surveille 10 types de signaux comportementaux publics classifiés par
                score de chaleur, de la visite de la page tarifs au recrutement SDR.
              </p>
            </div>
          </FadeUp>

          <div className="flex flex-col gap-4 mb-8">
            {topSignaux.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.07}>
                <div className="flex items-center gap-5 bg-white rounded-2xl px-6 py-5 border border-se-navy/10 hover:border-se-orange/30 hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
                  <span className="text-[28px] flex-shrink-0 w-10 text-center">{s.rank}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-[17px] text-se-navy leading-tight">{s.title}</p>
                    <p className="font-body text-[14px] text-se-navy/60 mt-1">{s.desc}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span
                      className="font-body text-[12px] font-medium rounded-full px-3 py-1 whitespace-nowrap"
                      style={{ background: 'rgba(232,98,26,0.10)', color: '#E8621A' }}
                    >
                      {s.badge}
                    </span>
                    <span
                      className="font-body text-[12px] font-medium rounded-full px-3 py-1 whitespace-nowrap"
                      style={{ background: 'rgba(74,191,176,0.12)', color: '#4ABFB0' }}
                    >
                      {s.pts}
                    </span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <p className="font-body text-[14px] text-se-navy/50 text-center">
              D'après notre expérience terrain — score de divergence Deep Signal vs marché : 82%
            </p>
          </FadeUp>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 6 — COMPARATIF
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-[80px] lg:py-[120px]">
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-4">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              COMPARATIF
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-se-navy mb-5 max-w-3xl">
              Deep Signal vs prospection traditionnelle : quelle différence concrète ?
            </h2>
          </FadeUp>

          {/* Capsule IA */}
          <FadeUp delay={0.05}>
            <div
              className="rounded-2xl px-7 py-5 mb-10 max-w-3xl"
              style={{ background: 'rgba(74,191,176,0.06)', border: '1.5px solid rgba(74,191,176,0.25)', borderLeft: '4px solid #4ABFB0' }}
            >
              <p className="font-body text-[15px] leading-[1.75] text-se-navy">
                Deep Signal remplace les coûts SDR (40–80k€/an) et agence (15–40k€/an) par un
                système autonome déployé en 14 jours, à partir de 1 000 € le workflow.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="overflow-x-auto rounded-2xl border border-se-navy/10 shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th
                      className="font-display font-bold text-[15px] text-white px-7 py-4 text-left w-1/2"
                      style={{ background: 'rgba(100,100,120,0.85)' }}
                    >
                      Avant Deep Signal
                    </th>
                    <th
                      className="font-display font-bold text-[15px] text-white px-7 py-4 text-left w-1/2"
                      style={{ background: '#0D1B3E' }}
                    >
                      Après Deep Signal ✓
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-7 py-4 border-b border-se-navy/05">
                        <span className="font-body text-[15px] text-se-navy/50 flex items-start gap-2">
                          <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                          {row.before}
                        </span>
                      </td>
                      <td className="px-7 py-4 border-b border-se-navy/05">
                        <span className="font-body text-[15px] text-se-navy font-medium flex items-start gap-2">
                          <span className="text-se-teal mt-0.5 flex-shrink-0">✓</span>
                          {row.after}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 7 — CARTE DES OPPORTUNITÉS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-se-navy py-[80px] lg:py-[120px]">
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-4">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              POINT D'ENTRÉE
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-white mb-5 max-w-3xl">
              Comment commencer ? La Carte des Opportunités — à Sète, sur l'Hérault (34) et sur toute la France
            </h2>
          </FadeUp>

          {/* Capsule IA */}
          <FadeUp delay={0.05}>
            <div
              className="rounded-2xl px-7 py-5 mb-14 max-w-3xl"
              style={{ background: 'rgba(74,191,176,0.08)', border: '1.5px solid rgba(74,191,176,0.20)', borderLeft: '4px solid #4ABFB0' }}
            >
              <p className="font-body text-[15px] leading-[1.75] text-white/80">
                La Carte des Opportunités est un audit gratuit en 4 étapes qui identifie vos
                processus automatisables et calcule votre temps récupérable avant tout achat.
              </p>
            </div>
          </FadeUp>

          {/* Timeline horizontale */}
          <FadeUp delay={0.08}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-14 relative">
              {/* Connecteurs */}
              <div className="hidden md:block absolute top-[52px] left-[25%] right-[25%] h-px"
                style={{ background: 'linear-gradient(90deg, #E8621A, #4ABFB0)' }} />

              {timelineSteps.map((step, i) => (
                <div key={step.num} className="relative flex flex-col items-center text-center">
                  {/* Cercle numéroté */}
                  <div
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center mb-5 relative z-10"
                    style={{
                      background: i < 2 ? '#E8621A' : '#4ABFB0',
                      boxShadow: `0 0 0 4px ${i < 2 ? 'rgba(232,98,26,0.2)' : 'rgba(74,191,176,0.2)'}`,
                    }}
                  >
                    <span className="font-display font-bold text-[14px] text-white">{step.num}</span>
                  </div>
                  <p
                    className="font-display font-bold text-[16px] mb-2"
                    style={{ color: i < 2 ? '#E8621A' : '#4ABFB0' }}
                  >
                    {step.title}
                  </p>
                  <p className="font-body text-[14px] leading-[1.65] text-white/65">{step.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* CTA central */}
          <FadeUp delay={0.15}>
            <div
              className="rounded-2xl px-8 py-10 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(232,98,26,0.15) 0%, rgba(74,191,176,0.08) 100%)',
                border: '1.5px solid rgba(232,98,26,0.30)',
              }}
            >
              <p className="font-display font-bold text-[22px] text-white mb-2">
                45 minutes pour cartographier votre potentiel d'automatisation
              </p>
              <p className="font-body text-[15px] text-white/65 mb-8 max-w-xl mx-auto">
                Vous repartez avec un plan d'action concret et chiffré — que vous travailliez
                avec Deep Signal ou non.
              </p>
              <a
                href={DISCOVERY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-se-orange text-white border-2 border-se-orange rounded-full px-10 py-4 text-[16px] font-medium font-body transition-all duration-200 hover:bg-se-orange-h hover:border-se-orange-h hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(232,98,26,0.5)] active:translate-y-0"
              >
                Réserver ma Carte des Opportunités — 45 min, 100% gratuit
              </a>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 8 — OBJECTIONS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-se-navy-alt py-[80px] lg:py-[120px]">
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-10">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              VOS QUESTIONS
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-white">
              Deep Signal est-il adapté à votre <span style={{ whiteSpace: 'nowrap' }}>situation ?</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.05}>
            <DeepSignalAccordion items={objections} variant="dark" />
          </FadeUp>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 8b — À PROPOS
      ══════════════════════════════════════════════════════════════════════ */}
      <About />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 9 — TARIFICATION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-[80px] lg:py-[120px]" style={{ background: 'rgb(234,244,236)' }}>
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-4">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              TARIFICATION
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-se-navy mb-5 max-w-3xl">
              Quel est le coût d'un système Deep Signal ?
            </h2>
          </FadeUp>

          {/* Capsule IA */}
          <FadeUp delay={0.05}>
            <div
              className="rounded-2xl px-7 py-5 mb-12 max-w-3xl"
              style={{ background: 'rgba(74,191,176,0.08)', border: '1.5px solid rgba(74,191,176,0.30)', borderLeft: '4px solid #4ABFB0' }}
            >
              <p className="font-body text-[15px] leading-[1.75] text-se-navy">
                Les workflows Deep Signal démarrent à 1 000 €. Un écosystème complet s'autofinance
                en 1 à 3 mois en évitant les coûts SDR ou agence récurrents.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Option 1 — Recommandé */}
            <FadeUp delay={0.05}>
              <div className="relative flex flex-col h-full rounded-2xl p-8 bg-white border-2 border-se-orange/60 shadow-lg hover:-translate-y-1.5 transition-all duration-[250ms]">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-se-orange text-white text-[12px] font-medium uppercase tracking-[0.06em] px-5 py-1.5 rounded-full">
                  Recommandé
                </span>
                <div className="w-11 h-11 bg-se-orange/[0.10] rounded-[10px] flex items-center justify-center mb-5">
                  <span className="text-se-orange text-[20px]">⚡</span>
                </div>
                <h3 className="font-display font-bold text-[20px] text-se-navy mb-2">Écosystème complet</h3>
                <p className="font-body text-[14px] text-se-navy/50 mb-5">Vous choisissez le système qui vous correspond : LinkedIn, Email, Nurturing, SEO</p>
                <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                  {[
                    'Déploiement à partir de 15 jours',
                    'Session de passation 2h incluse',
                    'Autonomie garantie à J90',
                    'Tableau de bord signal → CA',
                    'Workflows 100% propriété client',
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span className="text-se-teal text-[14px] mt-0.5 flex-shrink-0">✓</span>
                      <span className="font-body text-[14px] text-se-navy">{pt}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-body text-[14px] text-se-navy/50 italic mb-5">
                  Prix : sur devis après Carte des Opportunités
                </p>
                <a
                  href={DISCOVERY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-se-orange text-white rounded-full px-6 py-3 text-[15px] font-medium font-body hover:bg-se-orange-h hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(232,98,26,0.4)] transition-all duration-200"
                >
                  Obtenir mon devis
                </a>
              </div>
            </FadeUp>

            {/* Option 2 — Module unique */}
            <FadeUp delay={0.1}>
              <div className="flex flex-col h-full rounded-2xl p-8 bg-white border border-se-navy/10 hover:border-se-orange/30 hover:-translate-y-1.5 transition-all duration-[250ms]">
                <div className="w-11 h-11 bg-se-teal/[0.10] rounded-[10px] flex items-center justify-center mb-5">
                  <span className="text-se-teal text-[20px]">🔧</span>
                </div>
                <h3 className="font-display font-bold text-[20px] text-se-navy mb-2">Module unique</h3>
                <p className="font-body text-[14px] text-se-navy/50 mb-5">Une étape automatisée à la fois</p>
                <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                  {[
                    'Idéal pour compléter un système existant',
                    "Une partie de l'écosystème au choix. Exemple : envoi automatisé d'invitations LinkedIn, envoi d'emails personnalisés",
                    'Déploiement rapide (à partir de 15 jours)',
                    "Évolutif vers l'écosystème complet",
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span className="text-se-teal text-[14px] mt-0.5 flex-shrink-0">✓</span>
                      <span className="font-body text-[14px] text-se-navy">{pt}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-display font-bold text-[22px] text-se-navy mb-5">
                  À partir de <span className="text-se-orange">1 000 €</span>
                </p>
                <a
                  href={DISCOVERY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border-2 border-se-navy text-se-navy rounded-full px-6 py-3 text-[15px] font-medium font-body hover:border-se-orange hover:text-se-orange transition-all duration-200"
                >
                  Démarrer par un module
                </a>
              </div>
            </FadeUp>

            {/* Option 3 — Sur mesure */}
            <FadeUp delay={0.15}>
              <div className="flex flex-col h-full rounded-2xl p-8 bg-se-navy border border-white/[0.08] hover:border-se-teal/40 hover:-translate-y-1.5 transition-all duration-[250ms]">
                <div className="w-11 h-11 bg-se-teal/[0.15] rounded-[10px] flex items-center justify-center mb-5">
                  <span className="text-se-teal text-[20px]">🎯</span>
                </div>
                <h3 className="font-display font-bold text-[20px] text-white mb-2">Sur mesure</h3>
                <p className="font-body text-[14px] text-se-muted mb-5">Vos outils, vos contraintes, vos règles</p>
                <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                  {[
                    'Cahier des charges personnalisé',
                    'Développement n8n sur mesure',
                    'Tests + passation inclus',
                    'Compatible avec votre stack existante',
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span className="text-se-teal text-[14px] mt-0.5 flex-shrink-0">✓</span>
                      <span className="font-body text-[14px] text-white/80">{pt}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-body text-[14px] text-se-muted italic mb-5">Prix : sur devis</p>
                <a
                  href={DISCOVERY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border-2 border-se-teal/40 text-se-teal rounded-full px-6 py-3 text-[15px] font-medium font-body hover:border-se-teal hover:bg-se-teal/10 transition-all duration-200"
                >
                  Discuter de mon projet
                </a>
              </div>
            </FadeUp>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 10 — FAQ COMPLÈTE
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-se-navy py-[80px] lg:py-[120px]">
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-10">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              FAQ
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-white max-w-3xl">
              Questions fréquentes sur la prospection commerciale automatisée à Sète
            </h2>
          </FadeUp>

          <FadeUp delay={0.05}>
            <DeepSignalAccordion items={faqItems} variant="dark" />
          </FadeUp>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION FINALE — CTA + LOCALISATION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white py-[80px] lg:py-[120px]">
        {/* Décorations */}
        <div
          className="absolute -top-20 -right-20 w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(74,191,176,0.06) 0%, transparent 65%)' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,98,26,0.06) 0%, transparent 65%)' }}
        />

        <div className="relative z-10 max-w-container mx-auto px-6 lg:px-20 flex flex-col items-center text-center">

          <FadeUp>
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-4">
              PASSEZ À L'ACTION
            </p>
            <h2 className="font-display font-bold text-[32px] md:text-[52px] leading-[1.15] text-se-navy max-w-3xl mb-4">
              Vous êtes dirigeant à Sète, dans l'Hérault{' '}
              <span className="text-se-orange">ou quelle que soit votre implantation ?</span>
            </h2>
            <p className="font-body text-[17px] leading-[1.75] text-se-navy/65 max-w-xl mb-3">
              Réservez votre Carte des Opportunités — 45 min, sans engagement.
            </p>
            <p className="font-body text-[17px] leading-[1.75] text-se-navy/65 max-w-xl mb-10">
              Vous repartez avec un plan d'action concret, que vous travailliez avec Deep Signal ou non.
            </p>
            <div className="flex flex-col items-center gap-4">
              <a
                href="#agenda"
                className="inline-flex items-center justify-center bg-se-orange text-white border-2 border-se-orange rounded-full px-12 py-5 text-[18px] font-medium font-body transition-all duration-200 hover:bg-se-orange-h hover:border-se-orange-h hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(232,98,26,0.5)] active:translate-y-0"
              >
                Réserver mon RDV gratuit
              </a>
              <p className="font-body text-[14px] text-se-navy/45">
                Sans engagement · 45 minutes · 100% en visio · Toute la France
              </p>
            </div>
          </FadeUp>

          {/* Mention géographique */}
          <FadeUp delay={0.1}>
            <div
              className="mt-16 rounded-2xl px-8 py-5 border border-se-navy/08"
              style={{ background: 'rgba(13,27,62,0.04)' }}
            >
              <p className="font-body text-[13px] text-se-navy/50 text-center leading-[1.8]">
                <strong className="text-se-navy/70">SalesExperienz · Deep Signal</strong>
                {' · '}Sète, Hérault (34) · Occitanie, France
                <br />
                Prospection commerciale automatisée · Automatisation n8n · IA commerciale
              </p>
            </div>
          </FadeUp>

        </div>
      </section>

      <RecentArticles />
      <SocialBlock />
      <Footer />

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(deepSignalSchema) }}
      />
    </main>
  )
}
