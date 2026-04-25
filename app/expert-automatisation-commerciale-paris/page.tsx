import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import LocalStorytelling from '@/components/LocalStorytelling'
import LocalWhyChoose from '@/components/LocalWhyChoose'
import LocalDifferentiators from '@/components/LocalDifferentiators'
import LocalUrgency from '@/components/LocalUrgency'
import WhyAutomate from '@/components/WhyAutomate'
import OpportunityMap from '@/components/OpportunityMap'
import WhatToAutomate from '@/components/WhatToAutomate'
import HowItWorks from '@/components/HowItWorks'
import Services from '@/components/Services'
import LocalCases from '@/components/LocalCases'
import About from '@/components/About'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import RecentArticles from '@/components/RecentArticles'
import SocialBlock from '@/components/SocialBlock'
import Footer from '@/components/Footer'

// ─── METADATA ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Expert automatisation commerciale Paris — SalesExperienz',
  description: "Automatisez votre prospection B2B à Paris avec Deep Signal : détection de signaux d'intention, personnalisation IA, 10 à 60 RDV/mois. Audit gratuit 45 min.",
  alternates: {
    canonical: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-paris',
  },
  openGraph: {
    title: 'Expert automatisation commerciale Paris — SalesExperienz',
    description: "Automatisez votre prospection B2B à Paris avec Deep Signal : détection de signaux d'intention, personnalisation IA, 10 à 60 RDV/mois. Audit gratuit 45 min.",
    url: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-paris',
    siteName: 'Sales Experienz',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: 'https://www.salesexperienz.fr/portrait.png', width: 1200, height: 630 }],
  },
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const schemaLocal = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://www.salesexperienz.fr/expert-automatisation-commerciale-paris#localbusiness',
      name: 'Sales Experienz — Expert automatisation commerciale Paris',
      description: "Expert en automatisation commerciale à Paris. Prospection B2B automatisée, détection de signaux d'intention, 10 à 60 RDV/mois. Audit gratuit 45 min.",
      url: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-paris',
      telephone: '+33622951638',
      email: 'contact@salesexperienz.fr',
      areaServed: [
        { '@type': 'City', name: 'Paris' },
        { '@type': 'AdministrativeArea', name: 'Île-de-France' },
      ],
      parentOrganization: { '@id': 'https://www.salesexperienz.fr/#organization' },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.salesexperienz.fr/expert-automatisation-commerciale-paris',
      name: 'Expert automatisation commerciale Paris — SalesExperienz',
      description: "Automatisez votre prospection B2B à Paris avec Deep Signal : détection de signaux d'intention, personnalisation IA, 10 à 60 RDV/mois. Audit gratuit 45 min.",
      url: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-paris',
      isPartOf: { '@id': 'https://www.salesexperienz.fr/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.salesexperienz.fr' },
          { '@type': 'ListItem', position: 2, name: 'Expert automatisation commerciale Paris', item: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-paris' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "L'expert en automatisation commerciale intervient-il à La Défense et dans le reste de Paris ?",
          acceptedAnswer: { '@type': 'Answer', text: "Oui. On travaille avec des entreprises à La Défense, dans le Marais, à Paris-Saclay et dans toute l'Île-de-France. Les missions se font en visio — le fuseau horaire ne pose aucun problème." },
        },
        {
          '@type': 'Question',
          name: 'Dois-je savoir coder ou connaître n8n pour travailler avec vous à Paris ?',
          acceptedAnswer: { '@type': 'Answer', text: "Non. Une fois les workflows parisiens installés et configurés, aucune compétence technique n'est requise. Vous pilotez la stratégie, l'IA exécute. Une formation incluse vous rend autonome en 1h30." },
        },
        {
          '@type': 'Question',
          name: 'Comment savez-vous quoi automatiser dans mon entreprise parisienne ?',
          acceptedAnswer: { '@type': 'Answer', text: "C'est l'objet de la Carte des Opportunités — un audit structuré de vos processus commerciaux avant de construire quoi que ce soit. On ne propose rien sans avoir d'abord compris votre contexte parisien spécifique." },
        },
        {
          '@type': 'Question',
          name: 'Combien de temps avant de voir des résultats concrets à Paris ?',
          acceptedAnswer: { '@type': 'Answer', text: 'Les premiers résultats sont mesurables dès la première semaine de déploiement. Pour les clients parisiens, le calendrier moyen est : configuration en 7 jours, premiers rendez-vous qualifiés semaine 2 ou 3.' },
        },
        {
          '@type': 'Question',
          name: 'Je suis propriétaire des workflows après la mission ?',
          acceptedAnswer: { '@type': 'Answer', text: "Oui, à 100%. Les workflows n8n, les données, les séquences — tout vous appartient dès le premier jour. Vous restez indépendant à 100 % après la mission." },
        },
        {
          '@type': 'Question',
          name: 'Quel est le budget minimum pour démarrer à Paris ?',
          acceptedAnswer: { '@type': 'Answer', text: "On ne parle pas budget avant d'avoir compris votre situation parisienne. L'appel de découverte est là pour ça — on identifie ensemble les opportunités, puis on construit une proposition adaptée à votre contexte et votre marché." },
        },
      ],
    },
  ],
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
const heroSettings = {
  heroPreTitle: 'SALESEXPERIENZ · AUTOMATISATION IA · PARIS (75) · ÎLE-DE-FRANCE',
  heroTitleMain: 'Automatisation commerciale à Paris :',
  heroTitleAccent: 'vos prospects détectés avant vos concurrents',
  heroBadge: '📍 Paris · Île-de-France (75)',
  heroSubtitle1: "La plupart des équipes commerciales parisiennes ont un goulot d'étranglement qui plafonne leur croissance. On commence par le trouver.",
  heroSubtitle2: "À La Défense, Station F ou Paris-Saclay, vos prospects bougent vite. On détecte leurs signaux d'intention avant que votre concurrent ne décroche son téléphone.",
  heroCTA: 'Je veux accélérer ma croissance',
  heroCTASub: 'Sans engagement — 45 minutes',
}

// ─── SECTION 1 : STORYTELLING ────────────────────────────────────────────────
const storytellingData = {
  ville: 'Paris',
  intro: "À Paris, les équipes commerciales sont sur-sollicitées et les décideurs injoignables. Le cold call ne convertit plus. Et les outils mis en place sans stratégie derrière n'amènent ni rendez-vous ni chiffre d'affaires.",
  problems: [
    "Des prestataires qui livrent des tableaux de bord, mais aucun rendez-vous qualifié",
    "Des outils d'automatisation configurés sans stratégie commerciale précise derrière",
    "Des commerciaux qui passent 80 % de leur temps à prospecter manuellement",
  ],
  methode: (
    <>
      Je commence par comprendre votre pipeline, vos cycles de vente, vos profils clients.
      Ensuite, on construit ensemble des automatisations qui déclenchent de{' '}
      <strong className="text-se-navy font-semibold">vrais rendez-vous</strong> — pas du volume sans valeur.{' '}
      En tant qu&apos;<strong className="text-se-navy font-semibold">expert indépendant</strong>, vous travaillez{' '}
      <strong className="text-se-navy font-semibold">directement avec moi</strong>.{' '}
      <strong className="text-se-navy font-semibold">Pas d&apos;intermédiaire, pas de délégation opaque.</strong>{' '}
      Et comme tout se passe en visio, la localisation ne change rien à la qualité du travail — que vous soyez à La Défense, dans le Marais ou à Paris-Saclay.
    </>
  ),
  highlight: "Carte des Opportunités : avant de construire quoi que ce soit, on cartographie vos processus commerciaux. Zéro solution générique imposée. On part de votre réalité parisienne, pas d'un modèle standard.",
}

// ─── SECTION 2 : POURQUOI CHOISIR ────────────────────────────────────────────
const whyChooseData = {
  ville: 'Paris',
  pains: [
    "Vous payez un prestataire mais les résultats ne sont pas concrets",
    "On vous parle d'automatisation mais rien n'est relié à vos objectifs",
    "Vous ne savez pas si votre prospection génère vraiment du chiffre d'affaires",
  ],
  response: "Mon approche : transformer la prospection parisienne en canal d'acquisition mesurable. Chaque workflow est relié à une stratégie précise — pas à une liste de fonctionnalités. À Paris, où les cycles de décision sont rapides et la concurrence dense, chaque semaine sans pipeline actif coûte cher.",
  case1: {
    sector: 'Cabinet de conseil RH B2B',
    location: 'Paris 8e — La Défense',
    result: '+28 RDV qualifiés/mois en 30 jours',
    detail: 'Prospection automatisée sur LinkedIn, déclenchée sur signaux de recrutement.',
  },
  case2: {
    sector: 'Éditeur SaaS B2B',
    location: 'Paris 13e',
    result: 'Pipeline ×3 en 6 semaines',
    detail: 'Moins de 2 heures de pilotage par semaine après déploiement.',
  },
  vision: [
    { num: '01', text: <><strong className="text-se-navy font-semibold">Estimation du potentiel avant de démarrer</strong> : opportunités identifiées, objectifs commerciaux chiffrés.</> },
    { num: '02', text: <><strong className="text-se-navy font-semibold">Des objectifs concrets</strong> : rendez-vous générés, pipeline créé, temps libéré chaque semaine.</> },
    { num: '03', text: <><strong className="text-se-navy font-semibold">Un plan d&apos;action priorisé</strong> — pas une liste de tâches sans fin ni ordre de priorité clair.</> },
  ],
}

// ─── SECTION 3 : DIFFÉRENCIATEURS ────────────────────────────────────────────
const differentiatorsData = {
  ville: 'Paris',
  items: [
    {
      num: '01',
      title: 'Automatisation orientée résultats',
      text: "Pas de workflow pour le workflow. Chaque automatisation est reliée à un objectif commercial précis : rendez-vous générés, pipeline créé, temps libéré.",
    },
    {
      num: '02',
      title: 'Carte des Opportunités',
      text: "Audit structuré de vos processus avant de construire quoi que ce soit. On ne propose rien sans avoir d'abord compris votre contexte parisien spécifique.",
    },
    {
      num: '03',
      title: 'Séquences qui génèrent des rendez-vous',
      text: "Chaque workflow est conçu pour déclencher des rendez-vous qualifiés — pas du volume sans valeur ni du bruit dans votre agenda.",
    },
    {
      num: '04',
      title: "Détection de signaux d'intention",
      text: "Vos prospects parisiens bougent avant de le dire. On détecte leurs signaux au bon moment, avant que votre concurrent ne les contacte.",
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

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqSettings = {
  faq: [
    {
      question: "L'expert en automatisation commerciale intervient-il à La Défense et dans le reste de Paris ?",
      answer: "Oui. On travaille avec des entreprises à La Défense, dans le Marais, à Paris-Saclay et dans toute l'Île-de-France. Les missions se font en visio — la localisation ne pose aucun problème.",
    },
    {
      question: 'Dois-je savoir coder ou connaître n8n pour travailler avec vous à Paris ?',
      answer: "Non. Une fois les automatisations parisiennes configurées, aucune compétence technique n'est requise. Vous pilotez la stratégie, l'IA exécute. Une formation incluse vous rend autonome en 1h30.",
    },
    {
      question: 'Comment savez-vous quoi automatiser dans mon entreprise parisienne ?',
      answer: "C'est l'objet de la Carte des Opportunités — un audit structuré de vos processus commerciaux avant de construire quoi que ce soit. On ne propose rien sans avoir d'abord compris votre contexte parisien spécifique.",
    },
    {
      question: 'Combien de temps avant de voir des résultats concrets à Paris ?',
      answer: 'Les premiers résultats sont mesurables dès la première semaine de déploiement. Pour les clients parisiens, le calendrier moyen est : configuration en 7 jours, premiers rendez-vous qualifiés semaine 2 ou 3.',
    },
    {
      question: 'Je suis propriétaire des automatisations après la mission ?',
      answer: "Oui, à 100 %. Les workflows, les données, les séquences — tout vous appartient dès le premier jour. Vous restez indépendant à 100 % après la mission, sans aucune dépendance envers un prestataire.",
    },
    {
      question: 'Quel est le budget minimum pour démarrer à Paris ?',
      answer: "On ne parle pas budget avant d'avoir compris votre situation parisienne. L'appel de découverte est là pour ça — on identifie ensemble les opportunités, puis on construit une proposition adaptée à votre contexte et votre marché.",
    },
  ],
}

// ─── CAS CLIENTS ─────────────────────────────────────────────────────────────
const localCases = {
  case1: {
    sector: 'Cabinet de conseil RH B2B',
    location: 'Paris 8e — La Défense',
    result: '+28 RDV qualifiés/mois en 30 jours',
    detail: 'Prospection automatisée sur LinkedIn, déclenchée sur signaux de recrutement.',
  },
  case2: {
    sector: 'Éditeur SaaS B2B',
    location: 'Paris 13e',
    result: 'Pipeline ×3 en 6 semaines',
    detail: 'Moins de 2 heures de pilotage par semaine après déploiement.',
  },
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function PageParis() {
  return (
    <main>
      <Navbar />
      <Hero settings={heroSettings} />
      <LocalStorytelling {...storytellingData} />
      <LocalWhyChoose {...whyChooseData} />
      <LocalDifferentiators {...differentiatorsData} />
      <LocalUrgency ville="Paris" />
      <WhyAutomate />
      <OpportunityMap />
      <WhatToAutomate />
      <HowItWorks />
      <Services />
      <LocalCases cases={localCases} ville="Paris" />
      <About />
      <FAQ settings={faqSettings} />
      <FinalCTA />
      <RecentArticles />
      <SocialBlock />
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocal) }}
      />
    </main>
  )
}
