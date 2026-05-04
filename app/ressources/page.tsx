import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RessourcesContent from './RessourcesContent'

export const metadata: Metadata = {
  title: 'Skills Claude & Ressources — Prompts et guides gratuits · SalesExperienz',
  description:
    'Prompts Claude testés, workflows n8n, guides PDF et templates prêts à l\'emploi pour automatiser votre prospection, votre SEO local et votre reporting commercial.',
  robots: { index: false, follow: false },
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Skills Claude & Ressources — Sales Experienz',
  description:
    'Bibliothèque de prompts Claude, workflows n8n et guides PDF pour automatiser la prospection, le SEO local et le reporting B2B.',
  url: 'https://www.salesexperienz.fr/ressources',
  publisher: {
    '@type': 'Organization',
    name: 'Sales Experienz',
    url: 'https://www.salesexperienz.fr',
  },
}

export default function RessourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <Navbar />
      <main>
        <RessourcesContent />
      </main>
      <Footer />
    </>
  )
}
