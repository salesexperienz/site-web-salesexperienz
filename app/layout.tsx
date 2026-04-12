import type { Metadata } from 'next'
import { Urbanist, Plus_Jakarta_Sans, Caveat } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
})
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-handwriting',
  display: 'swap',
})

// ─── METADATA ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Agence Marketing & Automatisation IA — Sales Experienz | Sète (34)',
  description:
    'Sales Experienz, agence de marketing à Sète : automatisation n8n sur mesure, prospection B2B automatisée, SEO par IA. Laurent Guyonvarch, consultant depuis 2003. Premier échange offert — 45 min.',
  keywords:
    'agence marketing Sète, automatisation n8n, workflows IA, consultant automatisation BtoB, SEO automatisé, prospection automatisée, Hérault',
  alternates: {
    canonical: 'https://www.salesexperienz.fr',
  },
  openGraph: {
    title: 'Agence Marketing & Automatisation IA — Sales Experienz | Sète',
    description:
      "Automatisez votre marketing et vos processus métier avec n8n et l'IA. Basé à Sète, intervention en visio sur toute la France.",
    url: 'https://www.salesexperienz.fr',
    siteName: 'Sales Experienz',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: 'https://www.salesexperienz.fr/portrait.png',
        width: 1200,
        height: 630,
        alt: 'Laurent Guyonvarch — Sales Experienz, agence de marketing à Sète',
      },
    ],
  },
}

// ─── SCHEMA.ORG LOCAL BUSINESS ───────────────────────────────────────────────
// ⚠️  Le nom, l'adresse et le téléphone doivent être IDENTIQUES à la fiche GBP
const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'MarketingAgency'],   // double type = signal fort
  name: 'Sales Experienz',                          // espace obligatoire
  description:
    'Agence de marketing et automatisation IA basée à Sète (Hérault). Workflows n8n sur mesure, prospection B2B automatisée, SEO par IA, production vidéo. Intervention en visio sur toute la France.',
  url: 'https://www.salesexperienz.fr',             // avec www — identique à GBP
  telephone: '+33622951638',
  email: 'contact@salesexperienz.fr',
  founder: {
    '@type': 'Person',
    name: 'Laurent Guyonvarch',
    jobTitle: 'Consultant en automatisation IA et stratégie commerciale',
  },
  foundingDate: '2019-09-01',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '15 Bd Chevalier de Clerville, Bâtiment M3',
    addressLocality: 'Sète',
    postalCode: '34200',
    addressRegion: 'Hérault',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '43.4028',
    longitude: '3.6975',
  },
  areaServed: {
    '@type': 'Country',
    name: 'France',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/in/laurentguyonvarch/',
    'https://www.youtube.com/@salesexperienz',
  ],
  priceRange: '€€',
  image: 'https://www.salesexperienz.fr/portrait.png',
  hasMap: 'https://maps.google.com/?q=Sales+Experienz+Sète',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+33622951638',
    contactType: 'sales',
    areaServed: 'FR',
    availableLanguage: 'French',
  },
  makesOffer: [
    {
      '@type': 'Offer',
      name: 'Automatisation de processus avec n8n',
      description:
        'Conception et déploiement de workflows n8n sur mesure pour automatiser les processus métier des PME.',
    },
    {
      '@type': 'Offer',
      name: 'Prospection commerciale automatisée',
      description:
        'Écosystème de prospection B2B automatisé : signaux LinkedIn, cold email, nurturing Brevo.',
    },
    {
      '@type': 'Offer',
      name: 'Création de contenu SEO automatisée',
      description:
        'Production d\'articles SEO automatisée via IA : DataForSEO, Claude AI, WordPress.',
    },
    {
      '@type': 'Offer',
      name: 'Conseil en stratégie commerciale',
      description:
        'Audit des processus, Carte des Opportunités, structuration de l\'offre commerciale.',
    },
  ],
}

// ─── LAYOUT ──────────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${urbanist.variable} ${plusJakartaSans.variable} ${caveat.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
