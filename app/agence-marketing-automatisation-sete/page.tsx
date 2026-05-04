import type { Metadata } from 'next'
import Navbar               from '@/components/Navbar'
import Footer               from '@/components/Footer'
import SocialBlock          from '@/components/SocialBlock'
import RecentArticles       from '@/components/RecentArticles'
import FadeUp               from '@/components/FadeUp'
import CalcSection          from '@/components/CalcSection'
import AboutSete            from '@/components/AboutSete'
import FaqSete              from '@/components/FaqSete'
import WhatToAutomate       from '@/components/WhatToAutomate'
import LocalStorytelling    from '@/components/LocalStorytelling'
import SystemGraph          from '@/components/SystemGraph'
import LocalWhyChoose       from '@/components/LocalWhyChoose'
import LocalDifferentiators from '@/components/LocalDifferentiators'
import LocalUrgency         from '@/components/LocalUrgency'
import LocalCases           from '@/components/LocalCases'
import { DISCOVERY_URL }    from '@/lib/constants'
import { faqJsonLdSete }    from '@/lib/schema-faq'

// ─── METADATA SEO LOCAL ────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Agence Marketing & Automatisation IA à Sète — Sales Experienz',
  description:
    'Agence de marketing basée à Sète (Hérault) : automatisation n8n sur mesure, prospection B2B, SEO automatisé. Diagnostic stratégique avant toute action. Laurent Guyonvarch, consultant depuis 2003. RDV 45 min offert.',
  keywords:
    'agence marketing Sète, automatisation n8n Sète, consultant IA Hérault, prospection B2B automatisée, SEO automatisé, agence marketing Hérault, automatisation PME TPE',
  alternates: {
    canonical: 'https://www.salesexperienz.fr/agence-marketing-automatisation-sete',
  },
  openGraph: {
    title: 'Agence Marketing & Automatisation IA à Sète — Sales Experienz',
    description:
      "Trop d'outils, pas assez de résultats ? On commence par un diagnostic stratégique, puis on automatise ce qui bloque vraiment votre croissance. Basé à Sète, partout en France en visio.",
    url: 'https://www.salesexperienz.fr/agence-marketing-automatisation-sete',
    siteName: 'Sales Experienz',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: 'https://www.salesexperienz.fr/portrait.png', width: 1200, height: 630, alt: 'Laurent Guyonvarch — Sales Experienz, agence de marketing à Sète' }],
  },
}

// ─── SCHEMA.ORG ───────────────────────────────────────────────────────────────
const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Agence Marketing & Automatisation IA à Sète',
  description: 'Diagnostic stratégique + automatisation sur mesure pour PME-TPE. Workflows n8n, prospection B2B, SEO automatisé. Basé à Sète (Hérault), intervention en visio sur toute la France.',
  provider: { '@id': 'https://www.salesexperienz.fr/#organization' },
  areaServed: { '@type': 'Country', name: 'France' },
  url: 'https://www.salesexperienz.fr/agence-marketing-automatisation-sete',
}

// ─── DONNÉES ──────────────────────────────────────────────────────────────────
const pains = [
  {
    icon: '⚡',
    title: "Trop d'outils, zéro orchestration",
    text: "Vous avez Notion, HubSpot, LinkedIn, Brevo, Slack… Mais rien ne se parle. Chaque outil fonctionne dans son coin et vous perdez un temps fou à faire le lien manuellement.",
  },
  {
    icon: '↺',
    title: 'Vous tournez en rond',
    text: "Vos journées sont pleines mais votre chiffre d'affaires ne bouge pas. Vous travaillez plus pour gagner pareil. C'est la roue du hamster — et elle s'accélère.",
  },
  {
    icon: '◎',
    title: "Vous ne savez pas quoi automatiser en premier",
    text: "L'IA, n8n, Make, Zapier… Vous avez entendu parler de tout ça. Mais par où commencer ? Quel outil choisir ? Qu'est-ce qui va vraiment changer quelque chose dans votre business ?",
  },
  {
    icon: '⏱',
    title: 'Chaque heure perdue a un coût réel',
    text: "Des relances manuelles, du reporting à la main, des emails triés un par un. Calculez : 2h/jour × 220 jours = 440 heures par an. À votre TJM, ça fait combien ?",
  },
]

const services = [
  {
    icon: '◎',
    badge: 'Populaire',
    title: 'Deep Signal',
    subtitle: 'L\'écosystème de prospection automatisée',
    description: 'Deep Signal détecte en temps réel les prospects qui ont levé la main et leur envoie automatiquement le bon message — comme si c\'était vous. Seuls les prospects chauds sont contactés.',
    points: ['3 à 15 RDV qualifiés/mois', 'Signaux LinkedIn, Email, SEO, Brevo', 'Personnalisation industrielle par Claude AI', 'Scalable sans recruter'],
    featured: true,
    link: '/services/deepsignal',
  },
  {
    icon: '✦',
    badge: null,
    title: 'SEO GEO Machine',
    subtitle: 'Votre site web et votre contenu SEO, automatisés',
    description: 'Un système en 3 blocs : fondation (site web SEO-ready Next.js ou WordPress), présence locale (Google My Business optimisé et aligné) et machine à contenu (articles SEO publiés en automatique). Propriété totale, sans agence.',
    points: ['Site web Next.js ou WordPress SEO-ready', 'Google My Business optimisé et aligné', '50 à 150 articles SEO/mois automatisés', 'Propriété totale dès J+1'],
    featured: false,
    link: '/services/seo-geo-machine',
  },
  {
    icon: '⚙',
    badge: null,
    title: 'Automatisation sur mesure',
    subtitle: 'Votre stack, vos processus, vos règles',
    description: 'Relances impayés, onboarding client, reporting automatique, facturation, veille concurrentielle… Si c\'est répétitif et manuel, c\'est automatisable. On conçoit ensemble le workflow adapté à votre contexte exact.',
    points: ['Audit des processus inclus', 'Compatible avec votre stack existante', 'Livré testé, documenté, propriété du client', 'Formation à l\'autonomie incluse'],
    featured: false,
  },
]

const processSteps = [
  {
    num: '01',
    title: 'Le diagnostic stratégique',
    duration: '45 min',
    text: "On ne construit rien avant d'avoir compris. On cartographie vos processus, on mesure le temps perdu, on calcule le ROI potentiel. On identifie non seulement quoi automatiser — mais dans quel ordre, et pourquoi.",
    result: 'Vous repartez avec la Carte des Opportunités : un plan clair, chiffré, actionnable.',
  },
  {
    num: '02',
    title: 'La stratégie avant le code',
    duration: '1 à 3 semaines',
    text: "Un workflow sans stratégie, c'est un moteur sans direction. Avant d'écrire une seule ligne, on définit ensemble l'approche : commerciale, éditoriale ou opérationnelle. Puis on construit, on teste en sandbox, on déploie. Vous validez chaque étape.",
    result: 'Votre système tourne — et vous comprenez pourquoi il fonctionne.',
  },
  {
    num: '03',
    title: 'Mesure, ajustement et scale',
    duration: 'Continu',
    text: "On suit les résultats semaine après semaine. On ajuste. On identifie les prochaines opportunités. Vous êtes propriétaire de vos workflows à vie. Aucun lock-in, aucune dépendance.",
    result: "Votre entreprise tourne plus vite, avec une stratégie qui s'affine en continu.",
  },
]

// ─── DONNÉES LOCALES SÈTE ─────────────────────────────────────────────────────
const storytellingSete = {
  ville: 'Sète',
  intro: "À Sète et dans tout l'Hérault, les dirigeants de PME perdent des opportunités sur deux fronts : une démarche commerciale manuelle qui tourne à vide, et une présence en ligne irrégulière qui ne génère pas de visibilité. Le marché local évolue vite — et sans système, vous avancez à vue.",
  problems: [
    "Des outils configurés sans stratégie — qui ne génèrent ni rendez-vous qualifiés ni visibilité locale durable",
    "Une présence en ligne dépendante de vos disponibilités, pas d'un système qui travaille en continu",
    "Des journées remplies de tâches manuelles — relances, contenu, reporting — qui n'avancent pas votre business",
  ],
  methode: (
    <>
      <p className="mb-5">
        Je ne propose pas des workflows isolés. Je conçois des{' '}
        <strong className="text-se-navy font-semibold">systèmes</strong> — des ensembles cohérents d&apos;automatisations qui s&apos;articulent autour de vos objectifs : générer des rendez-vous qualifiés, maintenir une présence en ligne régulière, nourrir votre pipeline sans y passer vos journées.
      </p>
      <p className="mb-5">
        Basé à Sète, je connais le tissu économique de l&apos;Hérault — de Montpellier à Agde, du Bassin de Thau à la Méditerranée. Avant de construire quoi que ce soit, je commence par comprendre votre pipeline, vos cycles de vente, vos profils clients.{' '}
        <strong className="text-se-navy font-semibold">Le système vient après. Pas avant.</strong>
      </p>
      <p>
        En tant qu&apos;<strong className="text-se-navy font-semibold">expert indépendant basé localement</strong>, vous travaillez{' '}
        <strong className="text-se-navy font-semibold">directement avec moi</strong>.{' '}
        <strong className="text-se-navy font-semibold">Pas d&apos;intermédiaire, pas de délégation opaque.</strong>{' '}
        Les rendez-vous se font en visio — et je peux me déplacer dans l&apos;Hérault et au-delà selon les besoins du projet.
      </p>
    </>
  ),
  highlight: "Carte des Opportunités : avant de construire quoi que ce soit, on cartographie vos processus commerciaux. Zéro solution générique. On part de votre réalité — sétoïse, héraultaise, ou nationale.",
}

const whyChooseSete = {
  ville: 'Sète',
  pains: [
    "Vous payez un prestataire mais les résultats ne sont pas concrets",
    "On vous parle d'automatisation mais rien n'est relié à vos objectifs",
    "Vous ne savez pas si votre prospection génère vraiment du chiffre d'affaires",
  ],
  response: "Mon approche : transformer la prospection en canal d'acquisition mesurable depuis Sète. Chaque workflow est relié à une stratégie précise — pas à une liste de fonctionnalités. Dans l'Hérault, où les réseaux comptent et les opportunités circulent vite, chaque semaine sans pipeline actif coûte cher.",
  case1: {
    sector: 'Cabinet de conseil B2B',
    location: 'Montpellier — Hérault',
    result: '+22 RDV qualifiés/mois en 30 jours',
    detail: 'Prospection automatisée sur LinkedIn, déclenchée sur signaux de croissance.',
  },
  case2: {
    sector: 'PME services B2B',
    location: 'Sète — Bassin de Thau',
    result: 'Pipeline ×2,5 en 8 semaines',
    detail: 'Moins de 2 heures de pilotage par semaine après déploiement.',
  },
  vision: [
    { num: '01', text: <><strong className="text-se-navy font-semibold">Estimation du potentiel avant de démarrer</strong> : opportunités identifiées, objectifs commerciaux chiffrés.</> },
    { num: '02', text: <><strong className="text-se-navy font-semibold">Des objectifs concrets</strong> : rendez-vous générés, pipeline créé, temps libéré chaque semaine.</> },
    { num: '03', text: <><strong className="text-se-navy font-semibold">Un plan d&apos;action priorisé</strong> — pas une liste de tâches sans fin ni ordre de priorité clair.</> },
  ],
}

const differentiatorsSete = {
  ville: 'Sète',
  items: [
    {
      num: '01',
      title: 'Automatisation orientée résultats',
      text: "Pas de workflow pour le workflow. Chaque automatisation est reliée à un objectif commercial précis : rendez-vous générés, pipeline créé, temps libéré.",
    },
    {
      num: '02',
      title: "Expert ancré dans l'Hérault",
      text: "Basé à Sète, je connais le tissu économique local — de Montpellier à Agde. Je comprends les contraintes des PME héraultaises avant de proposer quoi que ce soit.",
    },
    {
      num: '03',
      title: 'Séquences qui génèrent des rendez-vous',
      text: "Chaque workflow est conçu pour déclencher des rendez-vous qualifiés — pas du volume sans valeur ni du bruit dans votre agenda.",
    },
    {
      num: '04',
      title: "Détection de signaux d'intention",
      text: "Vos prospects bougent avant de le dire. On détecte leurs signaux au bon moment, avant que votre concurrent ne les contacte.",
    },
    {
      num: '05',
      title: 'Autonomie totale après la mission',
      text: "Formation incluse. Vous pilotez vos workflows vous-même après la mission. Vous restez indépendant à 100 % — aucune dépendance envers un prestataire extérieur.",
    },
    {
      num: '06',
      title: 'Transparence sur les résultats',
      text: "Reporting clair : rendez-vous générés, pipeline créé, temps économisé. Vous savez exactement ce que l'automatisation vous génère, chaque semaine.",
    },
  ],
}

const localCasesSete = {
  case1: {
    sector: 'Cabinet de conseil B2B',
    location: 'Montpellier — Hérault',
    result: '+22 RDV qualifiés/mois en 30 jours',
    detail: 'Prospection automatisée sur LinkedIn, déclenchée sur signaux de croissance.',
  },
  case2: {
    sector: 'PME services B2B',
    location: 'Sète — Bassin de Thau',
    result: 'Pipeline ×2,5 en 8 semaines',
    detail: 'Moins de 2 heures de pilotage par semaine après déploiement.',
  },
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function PageGBP() {
  return (
    <main>
      <Navbar />

      {/* ── 1. HERO LOCAL ──────────────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #E8621A 40%, #4ABFB0 60%, transparent 100%)' }} />
        <div className="absolute -top-20 -right-10 w-[700px] h-[700px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(74,191,176,0.08) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(232,98,26,0.05) 0%, transparent 65%)' }} />

        <div className="relative z-10 max-w-container mx-auto px-6 lg:px-20 w-full pt-[120px]">

          {/* ── Grid 50/50 : image gauche / texte droite ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Colonne gauche — Photo */}
            <div className="flex items-center justify-center order-2 lg:order-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Laurent 2.png"
                alt="Laurent Guyonvarch, consultant en automatisation IA à Sète"
                className="w-full max-w-[360px] lg:max-w-[420px] object-cover select-none"
                style={{
                  borderRadius: '20px',
                  aspectRatio: '4/5',
                  border: '2px solid #E8621A',
                  outline: '2px solid #4ABFB0',
                  outlineOffset: '4px',
                }}
              />
            </div>

            {/* Colonne droite — Texte */}
            <div className="flex flex-col gap-5 pb-10 order-1 lg:order-2">
              <p className="uppercase text-se-teal font-display"
                style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '0.12em' }}>
                AGENCE DE MARKETING · SÈTE (HÉRAULT, 34) · FRANCE ENTIÈRE EN VISIO
              </p>

              <h1 className="font-display font-bold leading-[1.2]"
                style={{ fontSize: 'clamp(30px, 3.5vw, 48px)' }}>
                <span className="text-se-navy block">Automatisez les tâches</span>
                <span className="text-se-navy block">qui vous volent du temps.</span>
                <span className="text-se-orange block mt-1">Accélérez votre croissance.</span>
              </h1>

              <p className="font-body text-[17px] leading-[1.7] text-se-navy/70">
                Sales Experienz accompagne les dirigeants de{' '}
                <strong className="text-se-navy font-semibold">PME et TPE</strong>{' '}
                partout en France : on commence par un{' '}
                <strong className="text-se-navy font-semibold">diagnostic stratégique</strong>,
                puis on automatise ce qui bloque vraiment votre croissance — sur mesure, avec n8n et l&apos;IA.{' '}
                <strong className="text-se-navy font-semibold">Basés à Sète (Hérault)</strong>,
                100% en visio.
              </p>

              {/* Badges — grille 2×2 sous le texte */}
              <div className="grid grid-cols-2 gap-2 mt-1">
                {[
                  '✓ Diagnostic avant toute action',
                  '✓ Automatisation 100% sur mesure',
                  '✓ Basé à Sète — France entière en visio',
                  '✓ Consultant depuis 2003',
                ].map((badge) => (
                  <span key={badge}
                    className="font-body text-[12px] font-medium text-se-navy text-center leading-tight"
                    style={{
                      background: 'rgba(245,245,245,0.95)',
                      border: '0.5px solid rgba(0,0,0,0.08)',
                      borderRadius: '100px',
                      padding: '6px 10px',
                    }}>
                    {badge}
                  </span>
                ))}
              </div>

            </div>
          </div>

          {/* ── CTA centré en dessous de la grille ── */}
          <div className="flex flex-col items-center gap-3 pt-12 pb-16">
            <a href={DISCOVERY_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-se-orange text-white border-2 border-se-orange rounded-full px-10 py-[14px] text-[16px] font-medium font-body transition-all duration-200 hover:bg-se-orange-h hover:border-se-orange-h hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(232,98,26,0.5)] active:translate-y-0">
              Réserver un appel découverte — 45 min
            </a>
            <span className="font-body text-[13px] text-se-navy/50">
              Sans engagement · 100% en visio · Toute la France
            </span>
          </div>

        {/* ── Diaporama logos — bordure bas du hero ── */}
        <div className="relative overflow-hidden py-6 border-t border-se-navy/[0.07]"
          style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
          <div className="flex gap-12 items-center"
            style={{ animation: 'marquee 28s linear infinite', width: 'max-content' }}>
            {[
              { src: '/claude_logo.jpeg',        alt: 'Claude AI' },
              { src: '/logo-n8n.png',            alt: 'n8n' },
              { src: '/Chat GPT.png',            alt: 'ChatGPT' },
              { src: '/Google_Gemini_logo.png',  alt: 'Gemini' },
              { src: '/Perplexity.png',          alt: 'Perplexity' },
              { src: '/Vercel.png',              alt: 'Vercel' },
              { src: '/Next.js.png',             alt: 'Next.js' },
              { src: '/Remotion.png',            alt: 'Remotion' },
              { src: '/Wordpress.png',           alt: 'WordPress' },
              { src: '/Brevo.png',               alt: 'Brevo' },
              { src: '/Data for SEO.png',        alt: 'DataForSEO' },
              { src: '/Unipile.png',             alt: 'Unipile' },
              { src: '/Apify.png',               alt: 'Apify' },
              { src: '/claude_logo.jpeg',        alt: 'Claude AI 2' },
              { src: '/logo-n8n.png',            alt: 'n8n 2' },
              { src: '/Chat GPT.png',            alt: 'ChatGPT 2' },
              { src: '/Google_Gemini_logo.png',  alt: 'Gemini 2' },
              { src: '/Perplexity.png',          alt: 'Perplexity 2' },
              { src: '/Vercel.png',              alt: 'Vercel 2' },
              { src: '/Next.js.png',             alt: 'Next.js 2' },
              { src: '/Remotion.png',            alt: 'Remotion 2' },
              { src: '/Wordpress.png',           alt: 'WordPress 2' },
              { src: '/Brevo.png',               alt: 'Brevo 2' },
              { src: '/Data for SEO.png',        alt: 'DataForSEO 2' },
              { src: '/Unipile.png',             alt: 'Unipile 2' },
              { src: '/Apify.png',               alt: 'Apify 2' },
            ].map((logo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={logo.alt} src={logo.src} alt={logo.alt}
                style={{ height: '32px', width: 'auto', objectFit: 'contain', flexShrink: 0, opacity: 0.75 }} />
            ))}
          </div>
        </div>

        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>

      </div>
      </section>

      <LocalStorytelling {...storytellingSete} />
      <SystemGraph />
      <LocalWhyChoose {...whyChooseSete} />
      <LocalDifferentiators {...differentiatorsSete} />
      <LocalUrgency ville="Sète" />

      {/* ── 2. CHIFFRES ────────────────────────────────────────────────────── */}
      <section className="bg-se-navy py-12 px-6 lg:px-20">
        <div className="max-w-container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col gap-2">
              <span className="font-display font-bold text-[32px] text-se-orange">20 ans</span>
              <span className="font-body text-[14px] text-se-muted">de conseil en stratégie commerciale</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-display font-bold text-[32px] text-se-teal">Sète · France</span>
              <span className="font-body text-[14px] text-se-muted">Basé en Hérault, partout en visio</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-display font-bold text-[32px] text-se-orange">100%</span>
              <span className="font-body text-[14px] text-se-muted">Systèmes sur mesure, testés, documentés</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. DOULEURS ────────────────────────────────────────────────────── */}
      <section className="bg-se-navy-alt py-[80px] lg:py-[120px]">
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-12">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              LE DIAGNOSTIC
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-white">
              Votre entreprise se reconnaît dans{' '}
              <span className="text-se-orange">l&apos;une de ces situations ?</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pains.map((card, i) => (
              <FadeUp key={card.title} delay={i * 0.1}>
                <div className="bg-se-card border border-white/[0.06] rounded-2xl p-8 h-full transition-all duration-[250ms] hover:-translate-y-1.5 hover:border-se-orange/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                  <div className="w-11 h-11 bg-se-teal/[0.15] rounded-[10px] flex items-center justify-center mb-5">
                    <span className="text-se-teal text-[20px]">{card.icon}</span>
                  </div>
                  <h3 className="font-display font-bold text-[20px] text-white mb-3">{card.title}</h3>
                  <p className="font-body text-[17px] leading-[1.7] text-white/70">{card.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp className="mt-10 text-center">
            <p className="font-body text-[17px] text-se-muted max-w-2xl mx-auto">
              Si vous vous reconnaissez dans l&apos;une de ces situations —{' '}
              <strong className="text-white">on commence par un diagnostic gratuit de 45 minutes</strong>.
              Pas de pitch commercial. Juste une cartographie honnête de ce qui peut changer dans votre business.
            </p>
          </FadeUp>

        </div>

      </section>

      {/* ── 4. LEVIERS DE CROISSANCE ───────────────────────────────────────── */}
      <WhatToAutomate />

      {/* ── 5. SERVICES ────────────────────────────────────────────────────── */}
      <section className="py-[80px] lg:py-[120px]" style={{ background: 'rgb(234,244,236)' }}>
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-14 max-w-2xl">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              NOS SYSTÈMES
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-se-navy mb-4">
              Des automatisations{' '}
              <span className="text-se-orange">sur mesure</span>{' '}
              pour accélérer votre croissance
            </h2>
            <p className="font-body text-[17px] leading-[1.7] text-se-navy">
              Voici les écosystèmes les plus demandés — mais chaque mission commence par un diagnostic.
              Ce qu&apos;on construit dépend toujours de ce qui bloque vraiment <em>votre</em> entreprise.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {services.map((svc, i) => (
              <FadeUp key={svc.title} delay={i * 0.1}>
                <div className={`relative flex flex-col h-full rounded-2xl p-8 transition-all duration-[250ms] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] ${
                  svc.featured
                    ? 'border-2 border-se-orange/60 bg-white'
                    : 'bg-white border border-se-navy/10 hover:border-se-orange/40'
                }`}>
                  {svc.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-se-orange text-white text-[12px] font-medium uppercase tracking-[0.05em] px-4 py-1 rounded-full">
                      {svc.badge}
                    </span>
                  )}
                  <div className="w-11 h-11 bg-se-teal/[0.12] rounded-[10px] flex items-center justify-center mb-5">
                    <span className="text-se-teal text-[20px]">{svc.icon}</span>
                  </div>
                  <h3 className="font-display font-bold text-[20px] text-se-navy mb-1">{svc.title}</h3>
                  <p className="font-body text-[14px] text-se-navy mb-4">{svc.subtitle}</p>
                  <p className="font-body text-[15px] leading-[1.7] text-se-navy mb-5 flex-1">{svc.description}</p>
                  <ul className="flex flex-col gap-2 mb-7">
                    {svc.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2">
                        <span className="text-se-teal text-[14px] mt-0.5 flex-shrink-0">✓</span>
                        <span className="font-body text-[14px] text-se-navy">{pt}</span>
                      </li>
                    ))}
                  </ul>
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

          {/* Bloc sur mesure */}
          <FadeUp>
            <div className="rounded-2xl border-l-4 border-se-orange overflow-hidden" style={{ background: '#0D1B3E' }}>
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 px-8 py-7">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 bg-white/[0.10] rounded-[10px] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-se-orange text-[18px]">⚙</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[20px] text-white mb-2">
                      Votre besoin ne rentre pas dans une case ?
                    </h3>
                    <p className="font-body text-[15px] leading-[1.7] text-white/70 max-w-2xl">
                      Ces trois systèmes sont des exemples des missions les plus fréquentes.
                      Chaque entreprise a ses propres outils, ses propres processus, ses propres contraintes.
                      On conçoit aussi des automatisations entièrement sur mesure — de l&apos;audit initial
                      à la mise en production, selon votre stack et vos objectifs.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <a href={DISCOVERY_URL} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-se-orange text-white rounded-full px-7 py-3.5 text-[15px] font-medium font-body transition-all duration-200 hover:bg-se-orange-h hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(232,98,26,0.4)] group whitespace-nowrap">
                    Discutons de votre projet
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ── 6. PROCESS ──────────────────────────────────────────────────────── */}
      <section className="bg-se-navy py-[80px] lg:py-[120px]">
        <div className="max-w-container mx-auto px-6 lg:px-20">

          <FadeUp className="mb-16 max-w-3xl">
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
              NOTRE APPROCHE
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-white mb-5">
              <span className="text-se-orange">Stratégie d&apos;abord.</span>{' '}
              Automatisation ensuite.
            </h2>
            <p className="font-body text-[17px] leading-[1.7] text-white/80">
              On ne construit aucun workflow avant d&apos;avoir compris votre contexte.
              Un outil sans stratégie, c&apos;est du bruit. On commence toujours par identifier
              ce qui bloque vraiment — puis on construit ce qui va changer quelque chose.
            </p>
          </FadeUp>

          <div className="flex flex-col gap-12">
            {processSteps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.15}>
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                  <div className="flex-shrink-0">
                    <span className="font-display font-extrabold text-[80px] md:text-[100px] leading-none text-se-orange/20 select-none">
                      {step.num}
                    </span>
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h3 className="font-display font-bold text-[22px] md:text-[26px] text-white">{step.title}</h3>
                      <span className="font-body text-[13px] text-se-orange bg-se-orange/10 rounded-full px-3 py-1 whitespace-nowrap">{step.duration}</span>
                    </div>
                    <p className="font-body text-[17px] leading-[1.7] text-se-muted mb-5">{step.text}</p>
                    <div className="flex items-start gap-3 rounded-xl px-5 py-4"
                      style={{ background: 'rgba(232,98,26,0.08)', border: '1.5px solid rgba(232,98,26,0.45)', borderLeft: '4px solid #E8621A' }}>
                      <span className="text-se-orange text-[18px] mt-0.5 flex-shrink-0">✓</span>
                      <p className="font-body text-[15px] leading-[1.6] text-white">
                        <strong className="text-se-orange font-medium">Résultat : </strong>{step.result}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </section>

      <LocalCases cases={localCasesSete} ville="Sète" />
      <CalcSection />

      {/* ── 6. CTA FINAL ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-[80px] lg:py-[120px] bg-white">
        <div className="relative z-10 max-w-container mx-auto px-6 lg:px-20 flex flex-col items-center text-center">

          <FadeUp>
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-4">
              PASSEZ À L&apos;ACTION
            </p>
            <h2 className="font-display font-bold text-[32px] md:text-[52px] leading-[1.15] text-se-navy max-w-3xl mb-6">
              Prêt à savoir ce qui{' '}
              <span className="text-se-orange">freine vraiment votre croissance</span> ?
            </h2>
            <p className="font-body text-[17px] leading-[1.7] text-se-navy/70 max-w-xl mb-10">
              On commence par 45 minutes de diagnostic. On cartographie ensemble vos processus,
              on mesure le temps perdu, on identifie les quick wins. Vous repartez avec un plan
              clair — que vous travailliez avec nous ou non.
            </p>
            <div className="flex flex-col items-center gap-4">
              <a href={DISCOVERY_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-se-orange text-white border-2 border-se-orange rounded-full px-12 py-5 text-[18px] font-medium font-body transition-all duration-200 hover:bg-se-orange-h hover:border-se-orange-h hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(232,98,26,0.5)] active:translate-y-0">
                Réserver mon diagnostic gratuit
              </a>
              <p className="font-body text-[14px] text-se-navy/50">
                Sans engagement · 45 minutes · 100% en visio · Toute la France
              </p>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* ── 7. À PROPOS (local-first) ───────────────────────────────────────── */}
      <AboutSete />

      {/* ── 8. FAQ ──────────────────────────────────────────────────────────── */}
      <FaqSete />

      <RecentArticles />
      <SocialBlock />
      <Footer />

      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLdSete) }} />
    </main>
  )
}
