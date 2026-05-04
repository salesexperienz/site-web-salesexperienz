import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SocialBlock from '@/components/SocialBlock'
import RecentArticles from '@/components/RecentArticles'
import FadeUp from '@/components/FadeUp'
import DeepSignalAccordion from '@/components/DeepSignalAccordion'
import About from '@/components/About'
import CountUp from '@/components/CountUp'
import { DISCOVERY_URL } from '@/lib/constants'
import { seoGeoMachineSchema } from '@/lib/schema-seo-geo-machine'

// ─── METADATA ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Création Site Web & Contenu SEO Automatisé à Sète — SEO GEO Machine | SalesExperienz',
  description:
    'Site web SEO-ready et machine à contenu automatisée à Sète (34). Votre site, votre présence locale et vos articles IA alignés en propriété totale. Audit gratuit 45 min.',
  keywords: [
    'création site web SEO Sète',
    'contenu SEO automatisé Hérault',
    'agence SEO GEO Sète',
    'site web Next.js Sète',
    'machine à contenu SEO automatisée',
    'comment être cité par ChatGPT Perplexity',
    'création site SEO Google My Business Hérault',
    'automatisation contenu blog SEO PME',
  ],
  authors: [{ name: 'Laurent Guyonvarch', url: 'https://salesexperienz.fr/a-propos' }],
  openGraph: {
    title: 'Création Site Web & Contenu SEO Automatisé à Sète — SEO GEO Machine | SalesExperienz',
    description:
      'Site SEO-ready + contenu automatisé à Sète (34). Site, GMB et articles IA alignés. Propriété totale dès J+1. Audit gratuit 45 min.',
    url: 'https://www.salesexperienz.fr/services/seo-geo-machine',
    siteName: 'SalesExperienz',
    images: [
      {
        url: 'https://www.salesexperienz.fr/og-seo-geo-machine.jpg',
        width: 1200,
        height: 630,
        alt: 'SEO GEO Machine — Création site web & contenu SEO automatisé à Sète',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO GEO Machine — Site web & contenu SEO automatisé à Sète',
    description:
      'Site SEO-ready + contenu automatisé à Sète (34). Propriété totale dès J+1. Audit gratuit 45 min.',
    images: ['https://www.salesexperienz.fr/og-seo-geo-machine.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: {
    canonical: 'https://www.salesexperienz.fr/services/seo-geo-machine',
  },
}

// ─── DONNÉES ──────────────────────────────────────────────────────────────────

const blocs = [
  {
    color: '#4ABFB0',
    bg: 'rgba(74,191,176,0.10)',
    icon: '🏗️',
    label: 'Bloc 1 — Site',
    signal: 'Votre secteur + intention de recherche',
    output: 'Site Next.js ou WordPress · Méthode Capsule intégrée · Schema.org · Core Web Vitals > 95',
  },
  {
    color: '#E8621A',
    bg: 'rgba(232,98,26,0.10)',
    icon: '📍',
    label: 'Bloc 2 — Local',
    signal: 'Votre zone géographique (Sète · Hérault)',
    output: 'Fiche GMB optimisée · Cohérence site ↔ GMB · Présence locale dominante',
  },
  {
    color: '#8B9CC8',
    bg: 'rgba(139,156,200,0.10)',
    icon: '⚙️',
    label: 'Bloc 3 — Articles',
    signal: 'Mots-clés identifiés + stratégie éditoriale',
    output: '1–10 articles/jour · Maillage interne · Images IA · Offre intégrée · GEO-ready',
  },
]


const compareRows = [
  {
    before: '2–4 articles/mois, coût 50–150 €/article',
    after: '10–30 articles/mois, coût 13,3–19,8 €/article',
  },
  {
    before: 'Contenu invisible pour ChatGPT et Perplexity',
    after: 'Chaque article GEO-ready via méthode Capsule',
  },
  {
    before: "Site web sans structure d'intention de recherche",
    after: 'Site SEO-ready avec schema.org + Core Web Vitals > 95',
  },
  {
    before: 'GMB déconnecté du site, trafic local perdu',
    after: 'GMB optimisé + synchronisé sur les mêmes mots-clés',
  },
  {
    before: "Workflows agence = vous ne possédez rien",
    after: 'Workflows n8n 100% propriété client dès J+1',
  },
]

const timelineSteps = [
  {
    num: '01',
    title: 'OBSERVER',
    desc: 'Inventaire de votre présence actuelle (site, GMB, contenu).',
  },
  {
    num: '02',
    title: 'MESURER',
    desc: 'Calcul du manque à gagner : trafic perdu, articles non publiés, citations IA manquées.',
  },
  {
    num: '03',
    title: 'PRIORISER',
    desc: 'Méthode ICE (Impact × Confiance × Facilité) — quel bloc déployer en premier.',
  },
  {
    num: '04',
    title: 'RECOMMANDER',
    desc: 'Plan personnalisé Bloc 1 / Bloc 2 / Bloc 3 selon votre situation.',
  },
]

const objections = [
  {
    question: '"Ça ne fonctionnera pas dans mon secteur"',
    answer:
      "Un diagnostic SEO/GEO est préalable à tout déploiement. On ne lance aucun bloc sans avoir vérifié que c'est pertinent pour votre secteur. Si ce n'est pas le cas, on vous le dit — et vous repartez quand même avec des recommandations concrètes.",
  },
  {
    question: `"J'ai déjà un site WordPress, dois-je tout refaire ?"`,
    answer:
      "Non. Si votre site WordPress est fonctionnel, on l'optimise et on y connecte les workflows du Bloc 3. Une refonte n'est proposée que si l'architecture actuelle bloque les performances SEO. C'est décidé ensemble, pas imposé.",
  },
  {
    question: '"Le contenu généré va ressembler à du contenu IA bas de gamme"',
    answer:
      "Chaque article intègre un angle éditorial spécifique à votre secteur, la méthode Capsule GEO, et votre offre en CTA intégré. Ce n'est pas du contenu générique — c'est du contenu qui passe les filtres Google, répond aux critères IA et que vos lecteurs ont envie de lire.",
  },
  {
    question: '"Le SEO prend 6 mois minimum avant de voir des résultats"',
    answer:
      "Le SEO classique sur Google suit une progression de 3 à 6 mois, oui. Mais la visibilité GEO (citations dans ChatGPT, Perplexity, Gemini) peut s'établir en 30 à 90 jours sur des requêtes de niche. Et chaque article publié s'accumule — la valeur est permanente.",
  },
  {
    question: `"Est-ce que les workflows m'appartiennent vraiment ?"`,
    answer:
      "Oui, à 100% dès le premier paiement — pas à la résiliation, pas après 6 mois. Documentation technique complète livrée systématiquement. Vous pouvez les faire évoluer seul ou les confier à un autre prestataire. C'est votre actif numérique.",
  },
  {
    question: '"Quel est le vrai coût tout compris ?"',
    answer:
      "Formule Essentiel (30 articles/mois) : 197 €/mois de maintenance + ~24 €/mois de frais API (VPS, DataForSEO, OpenAI) = 221 € tout compris. Les frais techniques sont facturés directement par les providers — aucune marge SalesExperienz.",
  },
]

const faqItems = [
  {
    question: "Qu'est-ce que le SEO GEO et pourquoi est-ce différent du SEO classique ?",
    answer:
      "Le SEO GEO (Generative Engine Optimization) optimise un site pour être cité par les IA génératives (ChatGPT, Perplexity, Gemini) en plus de Google. 72% des pages citées par ChatGPT utilisent la méthode Capsule : une réponse courte autonome placée sous chaque titre en forme de question.",
  },
  {
    question: "Combien coûte la création d'un site web SEO-ready à Sète ?",
    answer:
      "La création d'un site SEO-ready démarre à 1 500 € HT (formule Starter WordPress) jusqu'à 3 500 € HT (formule Premium Next.js/Vercel). Le tarif exact est défini lors de la Carte des Opportunités, un audit gratuit de 45 minutes.",
  },
  {
    question: "Combien d'articles SEO peut publier la machine à contenu automatisée ?",
    answer:
      'Nos workflows publient de 1 à 10 articles par jour selon la formule choisie : 30 articles/mois (Essentiel à 197 €/mois), 150 articles/mois (Développement à 297 €/mois) ou 300 articles/mois (Croissance à 347 €/mois). Chaque article intègre la méthode Capsule GEO.',
  },
  {
    question: 'Est-ce que SEO GEO Machine fonctionne avec un site WordPress existant ?',
    answer:
      "Oui. Si vous avez déjà un site WordPress fonctionnel, les workflows de publication automatisée s'intègrent à votre infrastructure existante. Aucune refonte imposée.",
  },
  {
    question: 'Combien de temps avant les premiers résultats SEO et GEO ?',
    answer:
      "Le déploiement du système prend à partir de 15 jours. La visibilité sur les IA génératives peut s'établir en 30 à 90 jours sur des requêtes de niche. Le SEO classique sur Google suit une progression de 3 à 6 mois.",
  },
  {
    question: "Les workflows de publication m'appartiennent-ils après la prestation ?",
    answer:
      "Oui, à 100% dès le premier paiement. Documentation technique complète livrée systématiquement. Si SalesExperienz disparaît demain, votre système continue de tourner. Vous n'êtes jamais otage d'un prestataire.",
  },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function SeoGeoMachinePage() {
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
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-7 self-start"
                  style={{ background: 'rgba(74,191,176,0.12)', border: '1px solid rgba(74,191,176,0.25)' }}
                >
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
                  <span className="text-white block">Votre site web et votre contenu SEO</span>
                  <span className="text-white block">automatisés à Sète —</span>
                  <span className="text-se-orange block mt-1">SEO GEO Machine</span>
                </h1>
              </FadeUp>

              {/* Sous-titre */}
              <FadeUp delay={0.1}>
                <p className="font-body text-[17px] leading-[1.75] text-white/70 mb-8">
                  SEO GEO Machine construit votre site web, optimise votre Google My Business
                  et publie vos articles SEO en automatique —{' '}
                  <strong className="text-white font-medium">propriété totale, sans agence.</strong>
                </p>
              </FadeUp>

              {/* Stats — compteurs animés */}
              <FadeUp delay={0.15}>
                <div className="flex flex-wrap gap-3 mb-8">
                  <div
                    className="flex flex-col items-center px-5 py-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <span className="font-display font-bold text-[22px] text-se-orange leading-tight">
                      <CountUp end={13} duration={1200} />,3 €
                    </span>
                    <span className="font-body text-[12px] text-se-muted mt-0.5">Coût par article (vs 50–150 € marché)</span>
                  </div>
                  <div
                    className="flex flex-col items-center px-5 py-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <span className="font-display font-bold text-[22px] text-se-orange leading-tight">
                      <CountUp end={15} duration={1000} /> jours
                    </span>
                    <span className="font-body text-[12px] text-se-muted mt-0.5">Déploiement clé en main</span>
                  </div>
                  <div
                    className="flex flex-col items-center px-5 py-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <span className="font-display font-bold text-[22px] text-se-orange leading-tight">
                      <CountUp end={100} duration={1400} /> %
                    </span>
                    <span className="font-body text-[12px] text-se-muted mt-0.5">Propriété des workflows dès J+1</span>
                  </div>
                  <div
                    className="flex flex-col items-center px-5 py-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <span className="font-display font-bold text-[22px] text-se-orange leading-tight">
                      +<CountUp end={1200} duration={1600} /> mots
                    </span>
                    <span className="font-body text-[12px] text-se-muted mt-0.5">Par article minimum garanti</span>
                  </div>
                </div>
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
                    title="Réserver un rendez-vous découverte — SalesExperienz SEO GEO Machine"
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
          SECTION 2 — POUR QUI ?
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
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                num: '01',
                title: 'Prestataire de services B2B',
                tags: ['Consultant', 'Coach', 'Formateur', 'Indépendant'],
                quote:
                  "J'ai un site mais je n'apparais pas sur Google. Je publie 2 articles par mois — pas assez pour exister. Et les IA ne me citent jamais.",
                points: [
                  'Site sans trafic organique',
                  'Aucune citation dans ChatGPT ou Perplexity',
                  'Vous voulez un contenu qui travaille pour vous 24h/24',
                ],
              },
              {
                num: '02',
                title: 'Commerce local & PME Hérault',
                tags: ['Artisan', 'Thérapeute', 'Cabinet', 'PME locale'],
                quote:
                  "J'ai une fiche Google My Business mais elle n'est pas reliée stratégiquement à mon site. Je rate des clients locaux à 5 km de chez moi.",
                points: [
                  'Fiche GMB non optimisée',
                  'Site web déconnecté de la stratégie locale',
                  "Vous voulez dominer les recherches locales sur Sète et l'Hérault",
                ],
              },
              {
                num: '03',
                title: 'Infopreneur & expert en ligne',
                tags: ['Blogger', 'Expert en ligne'],
                quote:
                  "Je sais que le contenu est roi mais écrire 30 articles par mois me coûte 1 500 à 4 500 € si je délègue. C'est insoutenable.",
                points: [
                  'Production de contenu non scalable',
                  'Blog quasi vide, SEO stagnant',
                  'Vous voulez une machine autonome à un coût < 8 €/article',
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
          SECTION 3 — DÉFINITION (Capsule GEO)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-[80px] lg:py-[120px]">
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp>
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-4">
              DÉFINITION
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-se-navy mb-8 max-w-3xl">
              Qu'est-ce que SEO GEO Machine ?
            </h2>
          </FadeUp>

          {/* Capsule GEO */}
          <FadeUp delay={0.05}>
            <p className="capsule-geo rounded-2xl px-7 py-6 mb-10 font-body text-[17px] leading-[1.75] text-se-navy font-medium"
              style={{ background: 'rgba(74,191,176,0.08)', border: '1.5px solid rgba(74,191,176,0.30)', borderLeft: '4px solid #4ABFB0' }}>
              SEO GEO Machine est un système en 3 blocs qui crée votre site, optimise votre GMB et publie vos articles SEO en automatique.
            </p>
          </FadeUp>

          {/* Élaboration */}
          <FadeUp delay={0.1}>
            <p className="font-body text-[17px] leading-[1.75] text-se-navy/70 max-w-3xl mb-6">
              SEO GEO Machine combine trois briques que personne n'a encore réunies sur le marché : la{' '}
              <strong className="text-se-navy">fondation</strong> (site web SEO-ready Next.js ou WordPress), le{' '}
              <strong className="text-se-navy">local</strong> (optimisation Google My Business aligné avec le site)
              et la <strong className="text-se-navy">machine à contenu</strong> (workflows n8n publiant 1 à 10 articles/jour
              avec méthode Capsule intégrée).
            </p>
            <p className="font-body text-[17px] leading-[1.75] text-se-navy/70 max-w-3xl mb-10">
              La différence fondamentale avec une agence SEO classique : chaque brique vous appartient à 100%
              dès le premier paiement. Vous n'êtes jamais otage. Si vous arrêtez demain, votre site, vos
              workflows et votre contenu continuent de travailler pour vous.
            </p>
          </FadeUp>

          {/* 3 blocs icônes */}
          <FadeUp delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: '🏗️',
                  label: 'Bloc 1 — Fondation',
                  desc: 'Site web Next.js ou WordPress · Structure SEO & GEO native',
                },
                {
                  icon: '📍',
                  label: 'Bloc 2 — Local',
                  desc: 'Google My Business · Cohérence site ↔ GMB sur mots-clés cibles',
                },
                {
                  icon: '⚙️',
                  label: 'Bloc 3 — Machine Contenu',
                  desc: 'Workflows n8n · 1 à 10 articles/jour · Méthode Capsule',
                },
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
          SECTION 4 — DIAGNOSTIC
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-se-navy-alt py-[80px] lg:py-[120px]">
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-8">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              LE DIAGNOSTIC
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-white max-w-3xl mb-6">
              Pourquoi votre contenu n'est-il pas cité par les IA ?
            </h2>
          </FadeUp>

          {/* Capsule GEO */}
          <FadeUp delay={0.04}>
            <p className="capsule-geo rounded-2xl px-7 py-5 mb-10 max-w-3xl font-body text-[15px] leading-[1.75] text-white/80"
              style={{ background: 'rgba(74,191,176,0.08)', border: '1.5px solid rgba(74,191,176,0.20)', borderLeft: '4px solid #4ABFB0' }}>
              72% des pages citées par ChatGPT utilisent une réponse courte autonome de 150 caractères placée sous chaque titre en question.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🧱',
                title: `"Mon site n'est pas structuré pour être trouvé"`,
                text: "Votre site a été conçu par un webdesigner, pas un expert SEO. Aucune page ne répond à une intention de recherche précise. Les IA génératives ne vous citent pas parce que votre contenu ne passe pas le test d'autonomie — il ne peut pas être compris sans lire toute la page.",
              },
              {
                icon: '❓',
                title: `"Je n'apparais pas dans les réponses des IA"`,
                text: 'ChatGPT, Perplexity et Google AI Overview ne référencent que les contenus structurés en capsules citables. Votre contenu actuel est rédigé pour les humains, pas pour les agents IA. Résultat : vos concurrents qui appliquent la méthode Capsule captent vos prospects dans les réponses IA.',
              },
              {
                icon: '⚖️',
                title: `"Ma production de contenu ne passe pas à l'échelle"`,
                text: "2 à 4 articles/mois à la main. 50 à 150 € par article sous-traité. Pas de maillage interne. Pas d'images. Pas de CTA intégré. Le blog est quasi vide, le SEO stagne, l'autorité thématique ne se construit pas.",
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
          SECTION 5 — COMMENT ÇA MARCHE
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="comment-ca-marche" className="bg-se-navy py-[80px] lg:py-[120px]">
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-4">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              LE SYSTÈME
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-white mb-5 max-w-3xl">
              Comment fonctionne la machine à contenu automatisée ?
            </h2>
          </FadeUp>

          {/* Capsule GEO */}
          <FadeUp delay={0.05}>
            <p className="capsule-geo rounded-2xl px-7 py-5 mb-12 max-w-3xl font-body text-[15px] leading-[1.75] text-white/80"
              style={{ background: 'rgba(74,191,176,0.08)', border: '1.5px solid rgba(74,191,176,0.20)', borderLeft: '4px solid #4ABFB0' }}>
              La machine publie 1 à 10 articles/jour avec maillage interne, liens d'autorité et méthode Capsule GEO — sans intervention manuelle.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blocs.map((bloc, i) => (
              <FadeUp key={bloc.label} delay={i * 0.08}>
                <div
                  className="rounded-2xl p-7 transition-all duration-[250ms] hover:-translate-y-1.5"
                  style={{
                    background: bloc.bg,
                    border: `1.5px solid ${bloc.color}44`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[28px]">{bloc.icon}</span>
                    <span
                      className="font-display font-bold text-[20px]"
                      style={{ color: bloc.color }}
                    >
                      {bloc.label}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-body text-[11px] font-medium uppercase tracking-[0.15em] text-se-muted mb-1">
                        Signal / Input
                      </p>
                      <p className="font-body text-[15px] text-white">{bloc.signal}</p>
                    </div>
                    <div
                      className="h-px"
                      style={{ background: `${bloc.color}20` }}
                    />
                    <div>
                      <p className="font-body text-[11px] font-medium uppercase tracking-[0.15em] text-se-muted mb-1">
                        Ce que ça produit
                      </p>
                      <p
                        className="font-body text-[15px] font-medium"
                        style={{ color: bloc.color }}
                      >
                        {bloc.output}
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
          SECTION 6 — MOTEUR TECHNIQUE
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-[80px] lg:py-[120px]" style={{ background: '#F4F6F9' }}>
        <div className="max-w-container mx-auto px-6 lg:px-20">

          {/* En-tête centré */}
          <FadeUp className="text-center mb-16 lg:mb-24">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              MOTEUR TECHNIQUE
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-se-navy mb-5 max-w-3xl mx-auto">
              Un système propulsé par n8n, Next.js et les agents IA les plus avancés
            </h2>
            <p className="font-body text-[17px] leading-[1.7] text-se-navy max-w-2xl mx-auto">
              Chaque brique technique est choisie pour sa performance, sa fiabilité et son impact SEO &amp; GEO direct.
            </p>
          </FadeUp>

          {/* ── ÉTAPE 01 — Next.js, Git & Vercel — image à droite ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-28">

            {/* Texte */}
            <div>
              <FadeUp>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-10 rounded-full bg-se-navy flex items-center justify-center flex-shrink-0">
                    <span className="font-display font-bold text-[13px] text-white">01</span>
                  </span>
                  <span className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange">
                    Fondation technique
                  </span>
                </div>
                <h3 className="font-display font-bold text-[24px] md:text-[32px] leading-[1.2] text-se-navy mb-4">
                  Next.js, Git &amp; Vercel — La fondation haute performance
                </h3>
              </FadeUp>
              <FadeUp delay={0.06}>
                <p className="font-body text-[16px] leading-[1.8] text-se-navy mb-6">
                  Le site est construit sur <strong>Next.js</strong>, versionné avec <strong>Git</strong> et déployé en continu sur <strong>Vercel</strong>. Dès la mise en ligne, la technique SEO et GEO est enracinée dans l&apos;architecture : balises, vitesse, maillage, données structurées. Rien n&apos;est ajouté après coup — tout est natif.
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                {/* Logos */}
                <div className="flex items-center gap-7 mb-7">
                  {[
                    { src: '/logos/nextjs.svg', label: 'Next.js' },
                    { src: '/logos/git.svg', label: 'Git' },
                    { src: '/logos/vercel.svg', label: 'Vercel' },
                  ].map((logo) => (
                    <div key={logo.label} className="flex flex-col items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={logo.src} alt={logo.label} className="w-9 h-9 object-contain" />
                      <span className="font-body text-[11px] font-medium text-se-navy/50">{logo.label}</span>
                    </div>
                  ))}
                </div>
                {/* Mots-clés */}
                <div className="flex flex-wrap gap-2">
                  {['Vitesse de chargement', 'Design', 'Optimisation SEO & GEO'].map((kw) => (
                    <span
                      key={kw}
                      className="font-body text-[13px] font-semibold text-se-navy px-4 py-1.5 rounded-full"
                      style={{ background: 'rgba(74,191,176,0.12)', border: '1.5px solid rgba(74,191,176,0.40)' }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Image */}
            <FadeUp delay={0.08}>
              <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.13)]" style={{ border: '1.5px solid rgba(74,191,176,0.25)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/exemple-wokflow.png"
                  alt="Création site Next.js Git Vercel — SalesExperienz"
                  className="w-full block"
                />
                <div className="px-5 py-3 flex items-center gap-2 bg-se-navy">
                  <span className="w-2 h-2 rounded-full bg-se-teal flex-shrink-0" />
                  <p className="font-body text-[13px] text-white/70">
                    Déploiement continu Next.js + Vercel — structure SEO &amp; GEO native
                  </p>
                </div>
              </div>
            </FadeUp>

          </div>

          {/* ── ÉTAPE 02 — Sanity CMS — image à gauche ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 lg:mb-28">

            {/* Image (gauche desktop) */}
            <FadeUp delay={0.08} className="order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.13)]" style={{ border: '1.5px solid rgba(74,191,176,0.25)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/tableau-de-bord-sanity.png"
                  alt="Tableau de bord Sanity CMS — gestion articles SEO — SalesExperienz"
                  className="w-full block"
                />
                <div className="px-5 py-3 flex items-center gap-2 bg-se-navy">
                  <span className="w-2 h-2 rounded-full bg-se-teal flex-shrink-0" />
                  <p className="font-body text-[13px] text-white/70">
                    Sanity CMS — saisie, validation et publication simultanée
                  </p>
                </div>
              </div>
            </FadeUp>

            {/* Texte (droite desktop) */}
            <div className="order-1 lg:order-2">
              <FadeUp>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-10 rounded-full bg-se-navy flex items-center justify-center flex-shrink-0">
                    <span className="font-display font-bold text-[13px] text-white">02</span>
                  </span>
                  <span className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange">
                    Gestion éditoriale
                  </span>
                </div>
                <h3 className="font-display font-bold text-[24px] md:text-[32px] leading-[1.2] text-se-navy mb-4">
                  Sanity CMS — La salle de rédaction
                </h3>
              </FadeUp>
              <FadeUp delay={0.06}>
                <p className="font-body text-[16px] leading-[1.8] text-se-navy mb-6">
                  Chaque article est créé avec titre, sous-titre, catégorie, balises SEO, image et slug. La publication est instantanée : dès validation dans <strong>Sanity</strong>, le contenu est exporté simultanément sur le site web. Aucun copier-coller, aucune friction entre l&apos;éditorial et la mise en ligne.
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                {/* Logo */}
                <div className="flex items-center gap-7 mb-7">
                  <div className="flex flex-col items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logos/sanity.svg" alt="Sanity" className="w-9 h-9 object-contain" />
                    <span className="font-body text-[11px] font-medium text-se-navy/50">Sanity</span>
                  </div>
                </div>
                {/* Mots-clés */}
                <div className="flex flex-wrap gap-2">
                  {["Gestion d'un blog", "Rédaction d'articles", 'Rapidité'].map((kw) => (
                    <span
                      key={kw}
                      className="font-body text-[13px] font-semibold text-se-navy px-4 py-1.5 rounded-full"
                      style={{ background: 'rgba(74,191,176,0.12)', border: '1.5px solid rgba(74,191,176,0.40)' }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </FadeUp>
            </div>

          </div>

          {/* ── ÉTAPE 03 — n8n + Agents IA — image à droite ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Texte */}
            <div>
              <FadeUp>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-10 h-10 rounded-full bg-se-navy flex items-center justify-center flex-shrink-0">
                    <span className="font-display font-bold text-[13px] text-white">03</span>
                  </span>
                  <span className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange">
                    Automatisation totale
                  </span>
                </div>
                <h3 className="font-display font-bold text-[24px] md:text-[32px] leading-[1.2] text-se-navy mb-4">
                  n8n + Agents IA — Le moteur de publication autonome
                </h3>
              </FadeUp>
              <FadeUp delay={0.06}>
                <p className="font-body text-[16px] leading-[1.8] text-se-navy mb-4">
                  SEO GEO Machine repose sur <strong>n8n</strong> — le moteur d&apos;orchestration open-source qui connecte chaque brique du système. Les workflows de publication tournent en autonomie complète, 24h/24, sans intervention humaine.
                </p>
                <p className="font-body text-[16px] leading-[1.8] text-se-navy mb-6">
                  Au cœur de la rédaction : <strong>Claude AI</strong> (Anthropic) pour le contenu et l&apos;angle éditorial, <strong>GPT-4o</strong> pour la structure, <strong>Gemini</strong> pour les images. Chaque article intègre la méthode Capsule dès la génération — pas après coup.
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                {/* Logos */}
                <div className="flex items-center gap-7 mb-7">
                  {[
                    { src: '/logos/n8n.svg', label: 'n8n' },
                    { src: '/logos/anthropic.svg', label: 'Claude AI' },
                    { src: '/logos/openai.svg', label: 'GPT-4o' },
                    { src: '/logos/gemini.svg', label: 'Gemini' },
                    { src: '/logos/dataforseo.png', label: 'DataForSEO' },
                  ].map((logo) => (
                    <div key={logo.label} className="flex flex-col items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={logo.src} alt={logo.label} className="w-9 h-9 object-contain" />
                      <span className="font-body text-[11px] font-medium text-se-navy/50">{logo.label}</span>
                    </div>
                  ))}
                </div>
                {/* Mots-clés */}
                <div className="flex flex-wrap gap-2">
                  {['Point de vue humain', 'Articles en automatique', 'Recherche & stratégie de mots clés'].map((kw) => (
                    <span
                      key={kw}
                      className="font-body text-[13px] font-semibold text-se-navy px-4 py-1.5 rounded-full"
                      style={{ background: 'rgba(74,191,176,0.12)', border: '1.5px solid rgba(74,191,176,0.40)' }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Image */}
            <FadeUp delay={0.08}>
              <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.13)]" style={{ border: '1.5px solid rgba(74,191,176,0.25)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/Workflow SEO-GEO.png"
                  alt="Workflow n8n Autoblogger SEO GEO Machine — SalesExperienz"
                  className="w-full block"
                />
                <div className="px-5 py-3 flex items-center gap-2 bg-se-navy">
                  <span className="w-2 h-2 rounded-full bg-se-teal flex-shrink-0" />
                  <p className="font-body text-[13px] text-white/70">
                    Workflow Autoblogger n8n — génération, publication et maillage automatiques
                  </p>
                </div>
              </div>
            </FadeUp>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 8 — COMPARATIF
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-[80px] lg:py-[120px]">
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-4">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              COMPARATIF
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-se-navy mb-5 max-w-3xl">
              SEO GEO Machine vs agence SEO : quelle différence concrète ?
            </h2>
          </FadeUp>

          {/* Capsule GEO */}
          <FadeUp delay={0.05}>
            <p className="capsule-geo rounded-2xl px-7 py-5 mb-10 max-w-3xl font-body text-[15px] leading-[1.75] text-se-navy"
              style={{ background: 'rgba(74,191,176,0.06)', border: '1.5px solid rgba(74,191,176,0.25)', borderLeft: '4px solid #4ABFB0' }}>
              SEO GEO Machine remplace les coûts d'agence (800–2 000 €/mois) par un système autonome déployé en 15 jours, à partir de 197 €/mois — propriété totale des actifs.
            </p>
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
                      Avant SEO GEO Machine
                    </th>
                    <th
                      className="font-display font-bold text-[15px] text-white px-7 py-4 text-left w-1/2"
                      style={{ background: '#0D1B3E' }}
                    >
                      Après SEO GEO Machine ✓
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
          SECTION 9 — POINT D'ENTRÉE (Carte des Opportunités)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-se-navy py-[80px] lg:py-[120px]">
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-4">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              POINT D'ENTRÉE
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-white mb-5 max-w-3xl">
              Comment commencer ? Faire un diagnostic SEO-GEO — à Sète, dans l'Hérault (34) et sur toute la France
            </h2>
          </FadeUp>

          {/* Capsule GEO */}
          <FadeUp delay={0.05}>
            <p className="capsule-geo rounded-2xl px-7 py-5 mb-14 max-w-3xl font-body text-[15px] leading-[1.75] text-white/80"
              style={{ background: 'rgba(74,191,176,0.08)', border: '1.5px solid rgba(74,191,176,0.20)', borderLeft: '4px solid #4ABFB0' }}>
              Un site ancré géographiquement à Sète (34) capte les recherches locales sur Google ET dans les IA qui géolocalisent les réponses.
            </p>
          </FadeUp>

          {/* Timeline */}
          <FadeUp delay={0.08}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-14 relative">
              {/* Connecteurs */}
              <div
                className="hidden md:block absolute top-[52px] left-[25%] right-[25%] h-px"
                style={{ background: 'linear-gradient(90deg, #E8621A, #4ABFB0)' }}
              />

              {timelineSteps.map((step, i) => (
                <div key={step.num} className="relative flex flex-col items-center text-center">
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
                La Carte des Opportunités est un audit gratuit en 4 étapes
              </p>
              <p className="font-body text-[15px] text-white/65 mb-8 max-w-xl mx-auto">
                Elle identifie vos priorités SEO-GEO et calcule votre potentiel de visibilité
                avant tout achat. Vous repartez avec un plan concret, que vous travailliez avec
                SEO GEO Machine ou non.
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
          SECTION 10 — FAQ (OBJECTIONS)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-se-navy-alt py-[80px] lg:py-[120px]">
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-10">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              VOS QUESTIONS
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-white">
              SEO GEO Machine est-il adapté à votre{' '}
              <span style={{ whiteSpace: 'nowrap' }}>situation ?</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.05}>
            <DeepSignalAccordion items={objections} variant="dark" />
          </FadeUp>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 12 — TARIFICATION COMPLÈTE
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-[80px] lg:py-[120px]" style={{ background: 'rgb(234,244,236)' }}>
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-14">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              TARIFICATION
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-se-navy mb-5 max-w-3xl">
              Quel est le coût de SEO GEO Machine ?
            </h2>
            <p className="font-body text-[17px] leading-[1.7] text-se-navy max-w-2xl">
              SEO GEO Machine est modulaire. Chaque bloc peut être acheté séparément ou combiné.
            </p>
          </FadeUp>

          {/* ─── BLOC 1 : Site web ─────────────────────────────────────────── */}
          <FadeUp delay={0.05} className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[22px]">🏗️</span>
              <h3 className="font-display font-bold text-[20px] text-se-navy">BLOC 1 — Site web SEO-ready</h3>
              <span
                className="font-body text-[11px] text-se-navy/50 border border-se-navy/15 px-2.5 py-1 rounded-full"
              >
                One-shot
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {[
                {
                  name: 'STARTER',
                  tech: 'WordPress existant optimisé',
                  desc: 'Audit + restructuration SEO + méthode Capsule sur pages clés + intégration M3',
                  price: '1 500 €',
                  recommended: false,
                },
                {
                  name: 'BUSINESS',
                  tech: 'WordPress nouveau ou Next.js/Vercel + Sanity',
                  desc: 'Création complète + architecture SEO + méthode Capsule sur toutes pages + intégration M3',
                  price: '2 500 €',
                  recommended: true,
                },
                {
                  name: 'PREMIUM',
                  tech: 'Next.js/Vercel + Sanity sur-mesure',
                  desc: 'Tout BUSINESS + design premium + schema.org avancé + Core Web Vitals > 95 + formation back-office',
                  price: '3 500 €',
                  recommended: false,
                },
              ].map((tier) => (
                <div
                  key={tier.name}
                  className={`relative flex flex-col rounded-2xl p-6 bg-white border ${tier.recommended ? 'border-se-orange/50 shadow-md' : 'border-se-navy/10'} hover:-translate-y-1 transition-all duration-[250ms]`}
                >
                  {tier.recommended && (
                    <span className="absolute -top-3 left-5 bg-se-orange text-white text-[11px] font-medium uppercase tracking-[0.05em] px-4 py-1.5 rounded-full">
                      Populaire
                    </span>
                  )}
                  <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-se-orange mb-1">{tier.name}</p>
                  <p className="font-body text-[12px] text-se-navy/50 mb-3">{tier.tech}</p>
                  <p className="font-body text-[14px] leading-[1.65] text-se-navy/70 mb-5">{tier.desc}</p>
                  <p className="font-display font-bold text-[24px] text-se-navy mt-auto">
                    {tier.price}{' '}
                    <span className="font-body text-[13px] font-normal text-se-navy/50">HT</span>
                  </p>
                </div>
              ))}
            </div>
            <p className="font-body text-[13px] text-se-navy mt-4">
              Inclus dans chaque formule : audit SEO · méthode Capsule · compatibilité M3 · documentation + formation (1h) · 2 révisions · support 30 jours
            </p>
          </FadeUp>

          {/* ─── BLOC 2 : GMB ──────────────────────────────────────────────── */}
          <FadeUp delay={0.05} className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[22px]">📍</span>
              <h3 className="font-display font-bold text-[20px] text-se-navy">BLOC 2 — Google My Business</h3>
              <span className="font-body text-[11px] text-se-navy/50 border border-se-navy/15 px-2.5 py-1 rounded-full">
                Prestation manuelle
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
              <div className="flex flex-col rounded-2xl p-7 bg-se-navy border border-white/[0.08] hover:-translate-y-1 transition-all duration-[250ms]">
                <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-se-teal mb-2">OPTIMISATION INITIALE</p>
                <p className="font-body text-[11px] text-se-muted mb-4">One-shot</p>
                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {[
                    'Audit complet fiche GMB',
                    'Optimisation catégories / services / photos',
                    'Correspondance stratégique site ↔ GMB',
                    'Recommandations avis clients',
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span className="text-se-teal text-[12px] mt-0.5 flex-shrink-0">✓</span>
                      <span className="font-body text-[13px] text-white/80">{pt}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-display font-bold text-[26px] text-white">
                  497 €{' '}
                  <span className="font-body text-[13px] font-normal text-se-muted">HT</span>
                </p>
              </div>
              <div className="flex flex-col rounded-2xl p-7 bg-white border border-se-navy/10 hover:border-se-teal/30 hover:-translate-y-1 transition-all duration-[250ms]">
                <p className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-se-orange mb-2">SUIVI MENSUEL</p>
                <p className="font-body text-[11px] text-se-navy/50 mb-4">Optionnel · sans engagement</p>
                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {[
                    '4 publications GMB/mois',
                    'Réponse aux avis clients',
                    'Mise à jour infos saisonnières',
                    'Rapport mensuel de performance',
                  ].map((pt) => (
                    <li key={pt} className="flex items-start gap-2">
                      <span className="text-se-teal text-[12px] mt-0.5 flex-shrink-0">✓</span>
                      <span className="font-body text-[13px] text-se-navy">{pt}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-display font-bold text-[26px] text-se-navy">
                  197 €{' '}
                  <span className="font-body text-[13px] font-normal text-se-navy/50">/mois</span>
                </p>
              </div>
            </div>
          </FadeUp>

          {/* ─── BLOC 3 : Workflows M1 / M2 / M3 ──────────────────────────── */}
          <FadeUp delay={0.05}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[22px]">⚙️</span>
              <h3 className="font-display font-bold text-[20px] text-se-navy">BLOC 3 — Workflows de la machine à contenu</h3>
              <span className="font-body text-[11px] text-se-navy/50 border border-se-navy/15 px-2.5 py-1 rounded-full">
                One-shot · propriété totale
              </span>
            </div>
            <p className="font-body text-[15px] text-se-navy mb-6 max-w-2xl">
              Chaque module est un workflow n8n qui vous appartient à 100% après paiement.
              Achetez-les séparément ou en pack —{' '}
              <span className="underline">ils fonctionnent ensemble ou indépendamment.</span>
            </p>

            {/* 3 modules */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {[
                {
                  icon: '🔍',
                  code: 'M1',
                  name: 'Recherche de Mots-Clés',
                  desc: "Workflow automatisé d'identification de keywords, segmentation par intention de recherche, scoring quick wins vs long terme. Export structuré prêt à alimenter M2 et M3.",
                  points: [
                    "Identification automatisée des mots-clés",
                    'Segmentation quick wins vs long terme',
                    'Scoring et priorisation',
                    'Export structuré pour M2 + M3',
                  ],
                },
                {
                  icon: '🗺️',
                  code: 'M2',
                  name: 'Stratégie SEO GEO',
                  desc: "Analyse concurrentielle automatisée, plan éditorial priorisé, identification des mots-clés GEO-ready et recommandations d'approche par article.",
                  points: [
                    'Analyse concurrentielle automatisée',
                    'Plan éditorial priorisé',
                    'Mots-clés GEO-ready identifiés',
                    'Recommandations par article',
                  ],
                },
                {
                  icon: '⚙️',
                  code: 'M3',
                  name: 'Publication Automatisée',
                  desc: "Workflow complet de génération + publication : angle éditorial, méthode Capsule, maillage interne, liens d'autorité, image IA, CTA offre intégré, publication automatique.",
                  points: [
                    'Génération + publication automatique',
                    'Méthode Capsule GEO intégrée',
                    'Maillage interne + liens autorité',
                    'Image IA + CTA offre inclus',
                  ],
                },
              ].map((mod, i) => (
                <FadeUp key={mod.code} delay={i * 0.1}>
                  <div className="flex flex-col h-full rounded-2xl p-8 bg-white border border-se-navy/10 hover:border-se-orange/30 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-[250ms]">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-11 h-11 bg-se-orange/[0.10] rounded-[10px] flex items-center justify-center flex-shrink-0">
                        <span className="text-[20px]">{mod.icon}</span>
                      </div>
                      <div>
                        <span className="font-body text-[11px] font-medium uppercase tracking-[0.15em] text-se-orange">{mod.code}</span>
                        <h3 className="font-display font-bold text-[18px] text-se-navy leading-tight">{mod.name}</h3>
                      </div>
                    </div>
                    <p className="font-body text-[14px] leading-[1.7] text-se-navy/60 mb-5">{mod.desc}</p>
                    <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                      {mod.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2">
                          <span className="text-se-teal text-[13px] mt-0.5 flex-shrink-0">✓</span>
                          <span className="font-body text-[13px] text-se-navy">{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-5 border-t border-se-navy/08">
                      <p className="font-display font-bold text-[26px] text-se-navy leading-none">
                        997 €{' '}
                        <span className="font-body text-[13px] font-normal text-se-navy/50">HT · one-shot</span>
                      </p>
                      <p className="font-body text-[12px] text-se-teal mt-1">Propriété 100% dès le paiement</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Pack complet M1+M2+M3 */}
            <FadeUp delay={0.3}>
              <div
                className="rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
                style={{ background: '#0D1B3E', border: '1.5px solid rgba(232,98,26,0.35)' }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="font-body text-[11px] font-medium uppercase tracking-[0.2em] text-se-orange px-3 py-1 rounded-full border border-se-orange/20"
                      style={{ background: 'rgba(232,98,26,0.10)' }}
                    >
                      PACK COMPLET
                    </span>
                    <span className="font-body text-[12px] text-se-teal">Économie : 494 €</span>
                  </div>
                  <h3 className="font-display font-bold text-[22px] text-white mb-2">Pack M1 + M2 + M3</h3>
                  <p className="font-body text-[15px] text-white/65">
                    Les 3 workflows + intégration complète + formation (2h) + documentation technique complète
                  </p>
                </div>
                <div className="flex flex-col items-center md:items-end gap-3 flex-shrink-0">
                  <div className="text-right">
                    <p className="font-body text-[13px] text-white/40 line-through">3 × 997 € = 2 991 €</p>
                    <p className="font-display font-bold text-[32px] text-se-orange leading-none">2 497 €</p>
                    <p className="font-body text-[12px] text-white/50">HT · one-shot · propriété totale</p>
                  </div>
                  <a
                    href={DISCOVERY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-se-orange text-white rounded-full px-8 py-3.5 text-[15px] font-medium font-body hover:bg-se-orange-h hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(232,98,26,0.4)] transition-all duration-200 whitespace-nowrap"
                  >
                    Acquérir le pack complet
                  </a>
                </div>
              </div>
            </FadeUp>
          </FadeUp>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 7 — DONNÉES ORIGINALES (placé avant FAQ pour cohérence)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-[80px] lg:py-[120px]" style={{ background: 'rgb(234,244,236)' }}>
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-4">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              DONNÉES ORIGINALES
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-se-navy mb-5 max-w-3xl">
              Un article SEO GEO Machine est aussi qualitatif qu&apos;un article humain — et 23× moins cher
            </h2>
          </FadeUp>

          <FadeUp delay={0.04}>
            <p className="font-body text-[17px] leading-[1.75] text-se-navy/70 max-w-2xl mb-8">
              Chaque article adopte un <strong>angle éditorial précis</strong> et un point de vue argumenté sur sa thématique — exactement comme le ferait un rédacteur expérimenté. Il intègre automatiquement la <strong>méthode Capsule GEO</strong>, l&apos;optimisation SEO technique, le maillage interne et les signaux de confiance. Le tout, en <strong>60 secondes chrono</strong>.
            </p>
          </FadeUp>

          {/* Capsule GEO */}
          <FadeUp delay={0.05}>
            <p className="capsule-geo rounded-2xl px-7 py-5 mb-10 max-w-3xl font-body text-[15px] leading-[1.75] text-se-navy"
              style={{ background: 'rgba(74,191,176,0.08)', border: '1.5px solid rgba(74,191,176,0.30)', borderLeft: '4px solid #4ABFB0' }}>
              Un article SEO GEO Machine revient à 13,3–19,8 €, intègre méthode Capsule + optimisation GEO et se génère en 60 secondes.
            </p>
          </FadeUp>

          {/* Tableau comparatif humain vs machine */}
          <FadeUp delay={0.06}>
            <div className="overflow-x-auto mb-10 rounded-2xl border border-se-navy/10 bg-white shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ background: 'rgba(13,27,62,0.04)' }}>
                    <th className="font-body text-[13px] font-semibold text-se-navy/60 uppercase tracking-[0.1em] px-6 py-4 w-[34%]">Critère</th>
                    <th className="font-body text-[13px] font-semibold text-se-navy/60 uppercase tracking-[0.1em] px-6 py-4 border-l border-se-navy/08 w-[33%]">Rédacteur humain</th>
                    <th className="font-body text-[13px] font-semibold text-se-orange uppercase tracking-[0.1em] px-6 py-4 border-l border-se-navy/08 w-[33%]">SEO GEO Machine</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Coût par article', human: '50 – 150 €', machine: '13,3 – 19,8 €', good: true },
                    { label: 'Temps de production', human: '2 – 4 heures', machine: '60 secondes', good: true },
                    { label: 'Point de vue & angle éditorial', human: '✅ Oui', machine: '✅ Oui', good: false },
                    { label: 'Méthode Capsule GEO intégrée', human: '❌ Non', machine: '✅ Systématique', good: true },
                    { label: 'Optimisation SEO GEO (IA génératives)', human: '❌ Rare', machine: '✅ Systématique', good: true },
                    { label: 'Maillage interne automatique', human: '❌ Manuel', machine: '✅ Automatique', good: true },
                    { label: 'Volume mensuel possible', human: '2 – 4 articles', machine: '10 – 150 articles', good: true },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-se-navy/[0.02]'}>
                      <td className="font-body text-[15px] font-medium text-se-navy px-6 py-4 border-t border-se-navy/06">{row.label}</td>
                      <td className="font-body text-[15px] text-se-navy/55 px-6 py-4 border-t border-l border-se-navy/06">{row.human}</td>
                      <td className="font-body text-[15px] font-semibold px-6 py-4 border-t border-l border-se-navy/06"
                        style={{ color: row.good ? '#E8621A' : '#0D1B3E' }}>{row.machine}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>

          {/* Formules de maintenance — coût réel par article */}
          <FadeUp delay={0.07}>
            <h3 className="font-display font-bold text-[22px] text-se-navy mb-6">
              Nos offres de maintenance pour la publication des articles
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
              {[
                {
                  emoji: '🥉',
                  name: 'ESSENTIEL',
                  engagement: '6 mois',
                  price: '197 €',
                  articles: '10/mois',
                  perArticle: '19,7 €',
                  kwPerMonth: '1',
                  features: [
                    'Articles de 1 200 à 2 000 mots',
                    'Choix de 1 mot clé',
                    'Surveillance quotidienne',
                    'Correction bugs < 48h',
                    'Support email < 24h',
                  ],
                  recommended: false,
                },
                {
                  emoji: '🥈',
                  name: 'DÉVELOPPEMENT',
                  engagement: '6 mois',
                  price: '297 €',
                  articles: '15/mois',
                  perArticle: '19,8 €',
                  kwPerMonth: '3',
                  features: [
                    'Articles de 1 200 à 2 000 mots',
                    'Images supplémentaires pour 5 articles au choix',
                    'Choix de 3 mots clés',
                    'Surveillance quotidienne',
                    'Correction bugs < 48h',
                    'Support email < 24h',
                  ],
                  recommended: false,
                },
                {
                  emoji: '🥇',
                  name: 'PERFORMANCE',
                  engagement: '6 mois',
                  price: '397 €',
                  articles: '30/mois',
                  perArticle: '13,3 €',
                  kwPerMonth: '5',
                  features: [
                    'Articles de 1 200 à 2 000 mots',
                    'Images supplémentaires pour 5 articles au choix',
                    'Choix de 5 mots clés',
                    'Surveillance quotidienne',
                    'Correction bugs < 48h',
                    'Email + WhatsApp',
                    'Rapport SEO mensuel',
                    'Optimisation keywords trimestrielle',
                  ],
                  recommended: true,
                },
              ].map((tier) => (
                <div
                  key={tier.name}
                  className={`relative flex flex-col rounded-2xl p-7 bg-white border ${tier.recommended ? 'border-se-orange/50 shadow-md' : 'border-se-navy/10'} hover:-translate-y-1 transition-all duration-[250ms]`}
                >
                  {tier.recommended && (
                    <span className="absolute -top-3 left-5 bg-se-orange text-white text-[11px] font-medium uppercase tracking-[0.05em] px-4 py-1.5 rounded-full">
                      Recommandé
                    </span>
                  )}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[20px]">{tier.emoji}</span>
                    <div>
                      <p className="font-body text-[11px] font-medium uppercase tracking-[0.15em] text-se-orange">{tier.name}</p>
                      <p className="font-body text-[11px] text-se-navy/40">Engagement {tier.engagement}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-5 rounded-xl p-3" style={{ background: 'rgba(13,27,62,0.04)' }}>
                    <div className="text-center">
                      <p className="font-display font-bold text-[14px] text-se-navy">{tier.articles}</p>
                      <p className="font-body text-[10px] text-se-navy/50">articles</p>
                    </div>
                    <div className="text-center border-x border-se-navy/10">
                      <p className="font-display font-bold text-[14px] text-se-orange">{tier.perArticle}</p>
                      <p className="font-body text-[10px] text-se-navy/50">/article</p>
                    </div>
                    <div className="text-center">
                      <p className="font-display font-bold text-[14px] text-se-navy">{tier.kwPerMonth}</p>
                      <p className="font-body text-[10px] text-se-navy/50">kw/mois</p>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2 mb-6 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="text-se-teal text-[12px] mt-0.5 flex-shrink-0">✓</span>
                        <span className="font-body text-[13px] text-se-navy/80">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5 border-t border-se-navy/08">
                    <p className="font-display font-bold text-[26px] text-se-navy">
                      {tier.price}{' '}
                      <span className="font-body text-[13px] font-normal text-se-navy/50">/mois</span>
                    </p>
                    <a
                      href={DISCOVERY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-3 inline-flex items-center justify-center w-full rounded-full px-5 py-3 text-[14px] font-medium font-body transition-all duration-200 ${tier.recommended ? 'bg-se-orange text-white hover:bg-se-orange-h hover:shadow-[0_8px_20px_rgba(232,98,26,0.4)]' : 'border-2 border-se-navy text-se-navy hover:border-se-orange hover:text-se-orange'}`}
                    >
                      Choisir {tier.name.charAt(0) + tier.name.slice(1).toLowerCase()}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-body text-[13px] text-se-navy/50 text-center">
              Frais techniques à votre charge (aucune marge SalesExperienz) : VPS ~7 €/mois · DataForSEO ~10 €/mois · OpenAI ~7 €/mois
              · <strong className="text-se-navy/70">Total Essentiel tout compris : ~221 €/mois</strong>
            </p>
          </FadeUp>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 11 — À PROPOS
      ══════════════════════════════════════════════════════════════════════ */}
      <About />

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 13 — FAQ COMPLÈTE
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-se-navy py-[80px] lg:py-[120px]">
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-10">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              FAQ
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-white max-w-3xl">
              Questions fréquentes sur SEO GEO Machine à Sète et dans l'Hérault
            </h2>
          </FadeUp>

          <FadeUp delay={0.05}>
            <DeepSignalAccordion items={faqItems} variant="dark" />
          </FadeUp>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION FINALE — CTA
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
              Vous êtes entrepreneur à Sète, dans l'Hérault{' '}
              <span className="text-se-orange">ou sur toute la France ?</span>
            </h2>
            <p className="font-body text-[17px] leading-[1.75] text-se-navy/65 max-w-xl mb-3">
              Réservez votre Carte des Opportunités — 45 min, sans engagement.
            </p>
            <p className="font-body text-[17px] leading-[1.75] text-se-navy/65 max-w-xl mb-10">
              Vous repartez avec un plan d'action SEO-GEO concret, que vous travailliez
              avec SEO GEO Machine ou non.
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
                <strong className="text-se-navy/70">SalesExperienz · SEO GEO Machine</strong>
                {' · '}Sète, Hérault (34) · Occitanie, France
                <br />
                Création de site web SEO · Contenu SEO automatisé · Google My Business · GEO Optimization
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoGeoMachineSchema) }}
      />
    </main>
  )
}
