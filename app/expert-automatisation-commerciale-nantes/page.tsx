import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import LocalStorytelling from '@/components/LocalStorytelling'
import SystemGraph from '@/components/SystemGraph'
import LocalWhyChoose from '@/components/LocalWhyChoose'
import LocalDifferentiators from '@/components/LocalDifferentiators'
import LocalUrgency from '@/components/LocalUrgency'
import WhyAutomate from '@/components/WhyAutomate'
import OpportunityMap from '@/components/OpportunityMap'
import WhatToAutomate from '@/components/WhatToAutomate'
import HowItWorks from '@/components/HowItWorks'
import Services from '@/components/Services'
import LocalCases from '@/components/LocalCases'
import CalcSection from '@/components/CalcSection'
import About from '@/components/About'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import RecentArticles from '@/components/RecentArticles'
import SocialBlock from '@/components/SocialBlock'
import Footer from '@/components/Footer'

// ─── METADATA ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Expert automatisation commerciale Nantes — SalesExperienz',
  description: "Expert automatisation commerciale à Nantes : systèmes sur mesure pour PME de la French Tech Nantes et des Pays de la Loire. Prospection B2B, contenu automatisé, pipeline actif. Audit 45 min.",
  alternates: {
    canonical: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-nantes',
  },
  openGraph: {
    title: 'Expert automatisation commerciale Nantes — SalesExperienz',
    description: "Expert automatisation commerciale à Nantes : systèmes sur mesure pour PME de la French Tech Nantes et des Pays de la Loire. Prospection B2B, contenu automatisé, pipeline actif. Audit 45 min.",
    url: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-nantes',
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
      '@id': 'https://www.salesexperienz.fr/expert-automatisation-commerciale-nantes#localbusiness',
      name: 'Sales Experienz — Expert automatisation commerciale Nantes',
      description: "Expert en automatisation commerciale à Nantes. Prospection B2B automatisée, détection de signaux d'intention, 10 à 60 RDV/mois. Audit gratuit 45 min.",
      url: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-nantes',
      telephone: '+33622951638',
      email: 'contact@salesexperienz.fr',
      areaServed: [
        { '@type': 'City', name: 'Nantes' },
        { '@type': 'AdministrativeArea', name: 'Pays de la Loire' },
      ],
      parentOrganization: { '@id': 'https://www.salesexperienz.fr/#organization' },
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.salesexperienz.fr/expert-automatisation-commerciale-nantes',
      name: 'Expert automatisation commerciale Nantes — SalesExperienz',
      description: "Expert automatisation commerciale à Nantes : systèmes sur mesure pour PME de la French Tech Nantes et des Pays de la Loire. Prospection B2B, contenu automatisé, pipeline actif. Audit 45 min.",
      url: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-nantes',
      isPartOf: { '@id': 'https://www.salesexperienz.fr/#website' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.salesexperienz.fr' },
          { '@type': 'ListItem', position: 2, name: 'Expert automatisation commerciale Nantes', item: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-nantes' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "L'expert en automatisation commerciale intervient-il sur l'Île de Nantes et dans toute la région Pays de la Loire ?",
          acceptedAnswer: { '@type': 'Answer', text: "Oui. On travaille avec des entreprises sur l'Île de Nantes, à Saint-Herblain et dans toute la région Pays de la Loire. Les missions se font en visio — la localisation ne pose aucun problème." },
        },
        {
          '@type': 'Question',
          name: 'Dois-je savoir coder ou connaître n8n pour travailler avec vous à Nantes ?',
          acceptedAnswer: { '@type': 'Answer', text: "Non. Une fois les workflows nantais installés et configurés, aucune compétence technique n'est requise. Vous pilotez la stratégie, l'IA exécute. Une formation incluse vous rend autonome en 1h30." },
        },
        {
          '@type': 'Question',
          name: 'Comment savez-vous quoi automatiser dans mon entreprise nantaise ?',
          acceptedAnswer: { '@type': 'Answer', text: "C'est l'objet de la Carte des Opportunités — un audit structuré de vos processus commerciaux avant de construire quoi que ce soit. On ne propose rien sans avoir d'abord compris votre contexte nantais spécifique." },
        },
        {
          '@type': 'Question',
          name: 'Combien de temps avant de voir des résultats concrets à Nantes ?',
          acceptedAnswer: { '@type': 'Answer', text: 'Les premiers résultats sont mesurables dès la première semaine de déploiement. Pour les clients nantais, le calendrier moyen est : configuration en 7 jours, premiers rendez-vous qualifiés semaine 2 ou 3.' },
        },
        {
          '@type': 'Question',
          name: 'Je suis propriétaire des workflows après la mission ?',
          acceptedAnswer: { '@type': 'Answer', text: "Oui, à 100%. Les workflows n8n, les données, les séquences — tout vous appartient dès le premier jour. Vous restez indépendant à 100 % après la mission." },
        },
        {
          '@type': 'Question',
          name: 'Quel est le budget minimum pour démarrer à Nantes ?',
          acceptedAnswer: { '@type': 'Answer', text: "On ne parle pas budget avant d'avoir compris votre situation nantaise. L'appel de découverte est là pour ça — on identifie ensemble les opportunités, puis on construit une proposition adaptée à votre contexte et votre marché." },
        },
      ],
    },
  ],
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
const heroSettings = {
  heroPreTitle: 'SALESEXPERIENZ · AUTOMATISATION IA · NANTES (44) · LOIRE-ATLANTIQUE',
  heroTitleMain: 'Automatisation commerciale à Nantes :',
  heroTitleAccent: 'un système commercial qui grandit avec vous',
  heroBadge: '📍 Nantes · Loire-Atlantique (44)',
  heroSubtitle1: "La plupart des équipes commerciales nantaises ont un goulot d'étranglement qui plafonne leur croissance. On commence par le trouver.",
  heroSubtitle2: "Sur l'Île de Nantes, à Saint-Herblain ou dans la métropole, vos prospects bougent vite. On détecte leurs signaux d'intention avant que votre concurrent ne décroche son téléphone.",
  heroCTA: 'Je veux accélérer ma croissance',
  heroCTASub: 'Sans engagement — 45 minutes',
}

// ─── SECTION 1 : STORYTELLING ────────────────────────────────────────────────
const storytellingData = {
  ville: 'Nantes',
  intro: "À Nantes, les dirigeants perdent des opportunités sur deux fronts : une démarche commerciale sous tension dans une métropole en forte croissance où les PME innovantes cherchent à scaler rapidement, et une présence en ligne irrégulière qui ne génère pas de visibilité durable. Des outils sans stratégie, du contenu publié sans système — et au final, peu de résultats concrets.",
  problems: [
    "Des outils configurés sans stratégie — qui ne génèrent ni rendez-vous qualifiés ni visibilité durable sur le marché nantais",
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
        Avant de construire quoi que ce soit, je commence par comprendre votre pipeline, vos cycles de vente, vos profils clients nantais.{' '}
        <strong className="text-se-navy font-semibold">Le système vient après. Pas avant.</strong>
      </p>
      <p>
        En tant qu&apos;<strong className="text-se-navy font-semibold">expert indépendant</strong>, vous travaillez{' '}
        <strong className="text-se-navy font-semibold">directement avec moi</strong>.{' '}
        <strong className="text-se-navy font-semibold">Pas d&apos;intermédiaire, pas de délégation opaque.</strong>{' '}
        Les rendez-vous se font en visio — et je peux me déplacer à Nantes selon les besoins du projet.
      </p>
    </>
  ),
  highlight: "Carte des Opportunités : avant de construire quoi que ce soit, on cartographie vos processus commerciaux. Zéro solution générique imposée. On part de votre réalité nantaise, pas d'un modèle standard.",
}

// ─── SECTION 2 : POURQUOI CHOISIR ────────────────────────────────────────────
const whyChooseData = {
  ville: 'Nantes',
  pains: [
    "Vous payez un prestataire mais les résultats ne sont pas concrets",
    "On vous parle d'automatisation mais rien n'est relié à vos objectifs",
    "Vous ne savez pas si votre prospection génère vraiment du chiffre d'affaires",
  ],
  response: "Mon approche : transformer la prospection nantaise en canal d'acquisition mesurable. Chaque workflow est relié à une stratégie précise — pas à une liste de fonctionnalités. À Nantes, où l'écosystème numérique et les services sont en forte croissance, chaque semaine sans pipeline actif coûte cher.",
  case1: {
    sector: 'Agence de communication B2B',
    location: 'Nantes centre',
    result: '+19 RDV qualifiés/mois',
    detail: 'Prospection automatisée sur LinkedIn, déclenchée sur signaux d\'intention B2B.',
  },
  case2: {
    sector: 'Cabinet de conseil en RH',
    location: 'Saint-Herblain',
    result: 'Prospection automatisée -70% de temps manuel',
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
  ville: 'Nantes',
  items: [
    {
      num: '01',
      title: 'Automatisation orientée résultats',
      text: "Pas de workflow pour le workflow. Chaque automatisation est reliée à un objectif commercial précis : rendez-vous générés, pipeline créé, temps libéré.",
    },
    {
      num: '02',
      title: 'Carte des Opportunités',
      text: "Audit structuré de vos processus avant de construire quoi que ce soit. On ne propose rien sans avoir d'abord compris votre contexte nantais spécifique.",
    },
    {
      num: '03',
      title: 'Séquences qui génèrent des rendez-vous',
      text: "Chaque workflow est conçu pour déclencher des rendez-vous qualifiés — pas du volume sans valeur ni du bruit dans votre agenda.",
    },
    {
      num: '04',
      title: "Détection de signaux d'intention",
      text: "Vos prospects nantais bougent avant de le dire. On détecte leurs signaux au bon moment, avant que votre concurrent ne les contacte.",
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
      question: "L'expert en automatisation commerciale intervient-il sur l'Île de Nantes et dans toute la région Pays de la Loire ?",
      answer: "Oui. On travaille avec des entreprises sur l'Île de Nantes, à Saint-Herblain et dans toute la région Pays de la Loire. Les missions se font en visio — la localisation ne pose aucun problème.",
    },
    {
      question: 'Dois-je savoir coder ou connaître n8n pour travailler avec vous à Nantes ?',
      answer: "Non. Une fois les automatisations nantaises configurées, aucune compétence technique n'est requise. Vous pilotez la stratégie, l'IA exécute. Une formation incluse vous rend autonome en 1h30.",
    },
    {
      question: 'Comment savez-vous quoi automatiser dans mon entreprise nantaise ?',
      answer: "C'est l'objet de la Carte des Opportunités — un audit structuré de vos processus commerciaux avant de construire quoi que ce soit. On ne propose rien sans avoir d'abord compris votre contexte nantais spécifique.",
    },
    {
      question: 'Combien de temps avant de voir des résultats concrets à Nantes ?',
      answer: 'Les premiers résultats sont mesurables dès la première semaine de déploiement. Pour les clients nantais, le calendrier moyen est : configuration en 7 jours, premiers rendez-vous qualifiés semaine 2 ou 3.',
    },
    {
      question: 'Je suis propriétaire des automatisations après la mission ?',
      answer: "Oui, à 100 %. Les workflows, les données, les séquences — tout vous appartient dès le premier jour. Vous restez indépendant à 100 % après la mission, sans aucune dépendance envers un prestataire.",
    },
    {
      question: 'Quel est le budget minimum pour démarrer à Nantes ?',
      answer: "On ne parle pas budget avant d'avoir compris votre situation nantaise. L'appel de découverte est là pour ça — on identifie ensemble les opportunités, puis on construit une proposition adaptée à votre contexte et votre marché.",
    },
  ],
}

// ─── CAS CLIENTS ─────────────────────────────────────────────────────────────
const localCases = {
  case1: {
    sector: 'Agence de communication B2B',
    location: 'Nantes centre',
    result: '+19 RDV qualifiés/mois',
    detail: 'Prospection automatisée sur LinkedIn, déclenchée sur signaux d\'intention B2B.',
  },
  case2: {
    sector: 'Cabinet de conseil en RH',
    location: 'Saint-Herblain',
    result: 'Prospection automatisée -70% de temps manuel',
    detail: 'Moins de 2 heures de pilotage par semaine après déploiement.',
  },
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function PageNantes() {
  return (
    <main>
      <Navbar />
      <Hero settings={heroSettings} />
      <LocalStorytelling {...storytellingData} />
      <SystemGraph />
      <LocalWhyChoose {...whyChooseData} />
      <LocalDifferentiators {...differentiatorsData} />
      <LocalUrgency ville="Nantes" />
      <WhyAutomate />
      <OpportunityMap />
      <WhatToAutomate />
      <HowItWorks />
      <Services />
      <LocalCases cases={localCases} ville="Nantes" />
      <CalcSection />
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
