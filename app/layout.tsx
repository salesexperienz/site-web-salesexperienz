import type { Metadata, Viewport } from 'next'
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
    'Agence marketing à Sète — automatisation n8n, prospection B2B automatisée, SEO par IA. Premier échange offert, 45 min. Sans engagement.',
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

// ─── VIEWPORT ────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

// ─── SCHEMA.ORG — @graph structuré ────────────────────────────────────────────
// ⚠️  Le nom, l'adresse et le téléphone doivent être IDENTIQUES à la fiche GBP
// ⚠️  Remplacer YOUR_GMB_CID par l'URL exacte de votre fiche Google Business
const SITE_URL = 'https://www.salesexperienz.fr'

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [

    // ── 1. Organisation principale ──────────────────────────────────────────
    {
      '@type': 'MarketingAgency',
      '@id': `${SITE_URL}/#organization`,
      name: 'Sales Experienz',
      legalName: 'Sales Experienz',
      description:
        'Agence de marketing et automatisation IA basée à Sète (Hérault). Workflows n8n sur mesure, prospection B2B automatisée, SEO par IA. Intervention en visio sur toute la France.',
      url: SITE_URL,
      telephone: '+33622951638',
      email: 'contact@salesexperienz.fr',
      foundingDate: '2019-09-01',
      priceRange: '€€',
      logo: {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}/#logo`,
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
        caption: 'Sales Experienz',
      },
      image: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/portrait.png`,
        width: 1200,
        height: 630,
      },
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
      areaServed: [
        { '@type': 'Country', name: 'France' },
        { '@type': 'City', name: 'Sète' },
        { '@type': 'AdministrativeArea', name: 'Hérault' },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+33622951638',
        contactType: 'customer service',
        areaServed: 'FR',
        availableLanguage: 'French',
      },
      founder: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#founder`,
        name: 'Laurent Guyonvarch',
        jobTitle: 'Consultant en automatisation IA et stratégie commerciale',
        url: `${SITE_URL}/a-propos`,
        sameAs: 'https://www.linkedin.com/in/laurentguyonvarch/',
      },
      sameAs: [
        'https://www.linkedin.com/in/laurentguyonvarch/',
        'https://www.youtube.com/@salesexperienz',
        'https://www.google.com/maps/place/Sales+Experienz/@43.4067773,3.680833,17z/data=!3m1!4b1!4m6!3m5!1s0x12b135e719168e6d:0xb48dccce5cc755ed!8m2!3d43.4067734!4d3.6834133!16s%2Fg%2F11fm9tp2l_',
      ],
      hasMap: 'https://maps.google.com/?q=Sales+Experienz+Sète',
      makesOffer: [
        {
          '@type': 'Offer',
          name: 'Automatisation de processus avec n8n',
          description: 'Conception et déploiement de workflows n8n sur mesure pour automatiser les processus métier des PME.',
          url: `${SITE_URL}/services/seo-geo-machine`,
        },
        {
          '@type': 'Offer',
          name: 'Prospection commerciale automatisée — DeepSignal',
          description: 'Écosystème de prospection B2B automatisé : signaux LinkedIn, cold email, nurturing Brevo.',
          url: `${SITE_URL}/services/deepsignal`,
        },
        {
          '@type': 'Offer',
          name: 'SEO GEO Machine — Création site web & contenu SEO automatisé',
          description: 'Site Next.js haute performance + contenu SEO automatisé par IA. Propriété totale dès J+1.',
          url: `${SITE_URL}/services/seo-geo-machine`,
        },
      ],
    },

    // ── 2. WebSite — active la sitelinks searchbox ───────────────────────────
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Sales Experienz',
      description: 'Agence marketing & automatisation IA à Sète — workflows n8n, SEO par IA, prospection B2B automatisée.',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'fr-FR',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },

    // ── 3. WebPage — Homepage ────────────────────────────────────────────────
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: 'Agence Marketing & Automatisation IA — Sales Experienz | Sète (34)',
      description: 'Sales Experienz, agence de marketing à Sète : automatisation n8n, prospection B2B automatisée, SEO par IA. Laurent Guyonvarch, consultant depuis 2003.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'fr-FR',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Accueil',
            item: SITE_URL,
          },
        ],
      },
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
