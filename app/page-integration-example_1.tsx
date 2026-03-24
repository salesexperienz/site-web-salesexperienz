/**
 * app/page.tsx — Extrait d'intégration SEO
 *
 * Colle ce contenu dans ton app/page.tsx existant :
 * 1. Les imports en haut du fichier
 * 2. L'export metadata (remplace ou complète l'existant)
 * 3. Les balises <script> JSON-LD dans le return du composant
 */

import { Metadata } from 'next'
import { faqJsonLd } from '@/lib/schema-faq'

// ─────────────────────────────────────────────
// 1. METADATA — Remplace/complète l'existant
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Automatisation IA & n8n — SalesExperienz | Laurent Guyonvarch',
  description:
    'Identifiez ce que votre entreprise peut automatiser avec la Carte des Opportunités. Écosystèmes n8n sur mesure pour accélérer votre croissance sans recruter.',
  keywords: [
    'automatisation n8n',
    'workflows IA',
    'automatisation entreprise',
    'n8n consultant',
    'automatisation processus BtoB',
    'consultant automatisation IA',
  ],
  authors: [{ name: 'Laurent Guyonvarch', url: 'https://salesexperienz.fr/a-propos' }],

  // ── Canonical URL (manquant actuellement — CRITIQUE) ──
  alternates: {
    canonical: 'https://salesexperienz.fr',
  },

  // ── Open Graph ──
  openGraph: {
    title: 'Automatisation IA & n8n — SalesExperienz',
    description:
      'Découvrez exactement quoi automatiser dans votre entreprise — et pourquoi.',
    url: 'https://salesexperienz.fr',
    siteName: 'SalesExperienz',
    locale: 'fr_FR',
    type: 'website',
    // ⚠️  À décommenter quand tu auras créé l'image OG (1200×630px)
    // Mettre le fichier dans /public/og-image.jpg
    // images: [
    //   {
    //     url: 'https://salesexperienz.fr/og-image.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'SalesExperienz — Automatisation IA & n8n sur mesure',
    //   },
    // ],
  },

  // ── Twitter / X card ──
  twitter: {
    card: 'summary_large_image', // ← était "summary" sans image, on passe en large
    title: 'Automatisation IA & n8n — SalesExperienz',
    description:
      'Découvrez exactement quoi automatiser dans votre entreprise — et pourquoi.',
    // images: ['https://salesexperienz.fr/og-image.jpg'], // ← décommenter avec l'image
  },

  // ── Indexation ──
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

// ─────────────────────────────────────────────
// 2. SCHEMA JSON-LD — Dans le composant Page
// ─────────────────────────────────────────────

// Schéma Organisation / ProfessionalService (déjà présent dans layout.tsx,
// mais on centralise ici pour clarté)
const organizationJsonLd = {
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
    url: 'https://salesexperienz.fr/a-propos',
  },
  serviceType: "Automatisation de processus d'entreprise",
  areaServed: 'FR',
  // ── À ajouter quand tu auras un logo accessible en URL ──
  // logo: 'https://salesexperienz.fr/logo-noir.png',
  // image: 'https://salesexperienz.fr/portrait.png',
}

// ─────────────────────────────────────────────
// 3. COMPOSANT — Ajoute les <script> dans le return
// ─────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* JSON-LD Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />

      {/* JSON-LD FAQPage — NE PAS OUBLIER de rendre les réponses visibles dans le HTML */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ... ton contenu existant ... */}
      <main>
        {/* Tes sections Hero, Why, Services, etc. */}
      </main>
    </>
  )
}

/**
 * ─────────────────────────────────────────────
 * NOTE IMPORTANTE SUR LA FAQ
 * ─────────────────────────────────────────────
 *
 * Le schéma FAQPage ci-dessus dit à Google et aux IA que tu as une FAQ.
 * Mais pour que ça fonctionne vraiment, les RÉPONSES doivent aussi être
 * présentes dans le HTML rendu (pas seulement dans le JSON-LD).
 *
 * Actuellement, tes réponses sont dans des accordéons JS avec opacity:0
 * et height:auto — elles sont dans le DOM mais masquées visuellement.
 * Next.js App Router (RSC) les rend côté serveur : ✅ Google peut les lire.
 *
 * Pour vérifier : curl https://salesexperienz.fr | grep "Une fois installé"
 * Si la réponse apparaît → OK pour Google.
 * Si elle n'apparaît pas → il faut rendre les réponses en HTML statique.
 *
 * ─────────────────────────────────────────────
 */
