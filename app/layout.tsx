import type { Metadata } from 'next'
import { Urbanist, Plus_Jakarta_Sans, Caveat } from 'next/font/google'
import './globals.css'

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

export const metadata: Metadata = {
  title: 'Automatisation IA & n8n — SalesExperienz | Laurent Guyonvarch',
  description:
    'Identifiez ce que votre entreprise peut automatiser avec la Carte des Opportunités. Écosystèmes n8n sur mesure pour accélérer votre croissance sans recruter.',
  keywords:
    'automatisation n8n, workflows IA, automatisation entreprise, n8n consultant, automatisation processus BtoB',
  openGraph: {
    title: 'Automatisation IA & n8n — SalesExperienz',
    description:
      'Découvrez exactement quoi automatiser dans votre entreprise — et pourquoi.',
    url: 'https://salesexperienz.fr',
    siteName: 'SalesExperienz',
    locale: 'fr_FR',
    type: 'website',
  },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'SalesExperienz',
  description: 'Automatisation IA et workflows n8n sur mesure pour entreprises BtoB',
  url: 'https://salesexperienz.fr',
  telephone: '+33622951638',
  email: 'contact@salesexperienz.fr',
  founder: {
    '@type': 'Person',
    name: 'Laurent Guyonvarch',
    jobTitle: 'Consultant en automatisation IA',
  },
  serviceType: "Automatisation de processus d'entreprise",
  areaServed: 'FR',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${urbanist.variable} ${plusJakartaSans.variable} ${caveat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
