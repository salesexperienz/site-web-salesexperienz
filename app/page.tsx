import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SalesExperienz — Expert Automatisation Commerciale & Systèmes IA | n8n',
  description: "Laurent Guyonvarch conçoit des systèmes d'automatisation sur mesure pour dirigeants de PME/TPE : prospection B2B, contenu automatisé, visibilité en ligne. Basé à Sète, partout en France en visio. Audit stratégique gratuit 45 min.",
  keywords: 'automatisation commerciale, expert n8n, système automatisation PME, prospection B2B automatisée, automatisation IA, workflows n8n, Sales Experienz',
  alternates: { canonical: 'https://www.salesexperienz.fr' },
  openGraph: {
    title: 'SalesExperienz — Expert Automatisation Commerciale & Systèmes IA',
    description: "Des systèmes d'automatisation sur mesure pour PME/TPE : prospection B2B, contenu, visibilité. Pas des workflows isolés — des systèmes complets. Basé à Sète, partout en France.",
    url: 'https://www.salesexperienz.fr',
    siteName: 'Sales Experienz',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: 'https://www.salesexperienz.fr/portrait.png', width: 1200, height: 630, alt: 'Laurent Guyonvarch — Sales Experienz, expert automatisation commerciale' }],
  },
}

import Navbar             from '@/components/Navbar'
import Hero               from '@/components/Hero'
import LocalStorytelling  from '@/components/LocalStorytelling'
import SystemGraph        from '@/components/SystemGraph'
import LocalWhyChoose     from '@/components/LocalWhyChoose'
import LocalDifferentiators from '@/components/LocalDifferentiators'
import LocalUrgency       from '@/components/LocalUrgency'
import WhyAutomate        from '@/components/WhyAutomate'
import OpportunityMap     from '@/components/OpportunityMap'
import WhatToAutomate     from '@/components/WhatToAutomate'
import HowItWorks         from '@/components/HowItWorks'
import Services           from '@/components/Services'
import LocalCases         from '@/components/LocalCases'
import About              from '@/components/About'
import FAQ                from '@/components/FAQ'
import CalcSection        from '@/components/CalcSection'
import FinalCTA           from '@/components/FinalCTA'
import Footer             from '@/components/Footer'
import SocialBlock        from '@/components/SocialBlock'
import RecentArticles     from '@/components/RecentArticles'
import { faqJsonLd }      from '@/lib/schema-faq'
import { getSiteSettings } from '@/lib/sanity'

// ─── SECTION 1 : STORYTELLING ────────────────────────────────────────────────
const storytellingData = {
  intro: "La plupart des dirigeants perdent des opportunités sur deux fronts à la fois : une démarche commerciale manuelle qui tourne à vide, et une présence en ligne irrégulière qui ne génère pas de visibilité. Des outils qui ne se parlent pas, des heures perdues sur du contenu publié sans système — et au final, peu de résultats concrets.",
  problems: [
    "Des outils configurés sans stratégie — qui ne génèrent ni rendez-vous qualifiés ni visibilité durable",
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
        Avant de construire quoi que ce soit, je commence par comprendre votre pipeline, vos cycles de vente, vos profils clients.{' '}
        <strong className="text-se-navy font-semibold">Le système vient après. Pas avant.</strong>
      </p>
      <p>
        En tant qu&apos;<strong className="text-se-navy font-semibold">expert indépendant</strong>, vous travaillez{' '}
        <strong className="text-se-navy font-semibold">directement avec moi</strong>.{' '}
        <strong className="text-se-navy font-semibold">Pas d&apos;intermédiaire, pas de délégation opaque.</strong>{' '}
        Les rendez-vous se font en visio — et je peux me déplacer selon les besoins du projet.
      </p>
    </>
  ),
  highlight: "Carte des Opportunités : avant de construire quoi que ce soit, on cartographie vos processus commerciaux. Zéro solution générique imposée. On part de votre réalité, pas d'un template.",
}

// ─── SECTION 2 : POURQUOI CHOISIR ────────────────────────────────────────────
const whyChooseData = {
  pains: [
    "Vous payez un prestataire mais les résultats ne sont pas concrets",
    "On vous parle d'automatisation mais rien n'est relié à vos objectifs",
    "Vous ne savez pas si votre prospection génère vraiment du chiffre d'affaires",
  ],
  response: "Mon approche : transformer la prospection en canal d'acquisition mesurable. Chaque workflow est relié à une stratégie précise — pas à une liste de fonctionnalités. Chaque semaine sans pipeline actif coûte cher.",
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
  items: [
    {
      num: '01',
      title: 'Automatisation orientée résultats',
      text: "Pas de workflow pour le workflow. Chaque automatisation est reliée à un objectif commercial précis : rendez-vous générés, pipeline créé, temps libéré.",
    },
    {
      num: '02',
      title: 'Carte des Opportunités',
      text: "Audit structuré de vos processus avant de construire quoi que ce soit. On ne propose rien sans avoir d'abord compris votre contexte spécifique.",
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
export default async function Home() {
  const settings = await getSiteSettings()

  return (
    <main>
      <Navbar />
      <Hero settings={settings} />
      <LocalStorytelling {...storytellingData} />
      <SystemGraph />
      <LocalWhyChoose {...whyChooseData} />
      <LocalDifferentiators {...differentiatorsData} />
      <LocalUrgency />
      <WhyAutomate />
      <OpportunityMap />
      <WhatToAutomate />
      <HowItWorks />
      <Services settings={settings} />
      <LocalCases cases={localCases} />
      <CalcSection />
      <About />
      <FAQ settings={settings} />
      <FinalCTA />
      <RecentArticles />
      <SocialBlock />
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </main>
  )
}
