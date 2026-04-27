export const ambassimmoSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://www.salesexperienz.fr/etudes-de-cas/ambassimmo',
      headline: 'Comment Ambassimmo est passé de zéro contenu SEO à la première position Google sur "ambassadeur immobilier"',
      description:
        'Ambassimmo, plateforme d\'intermédiation immobilière participative, a déployé en 3 semaines un système SEO automatisé (n8n + GPT-4o + Claude AI) qui publie 30 articles/mois et positionne le site #1 sur les requêtes stratégiques du secteur.',
      url: 'https://www.salesexperienz.fr/etudes-de-cas/ambassimmo',
      inLanguage: 'fr-FR',
      datePublished: '2026-04-27',
      dateModified: '2026-04-27',
      image: {
        '@type': 'ImageObject',
        url: 'https://www.salesexperienz.fr/og-ambassimmo.jpg',
        width: 1200,
        height: 630,
      },
      author: {
        '@type': 'Person',
        name: 'Laurent Guyonvarch',
        url: 'https://www.salesexperienz.fr',
        jobTitle: 'Consultant en automatisation IA et stratégie commerciale',
      },
      publisher: {
        '@type': 'Organization',
        name: 'SalesExperienz',
        url: 'https://www.salesexperienz.fr',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.salesexperienz.fr/logo-noir.png',
        },
      },
      about: [
        { '@type': 'Thing', name: 'SEO automatisé' },
        { '@type': 'Thing', name: 'Autoblogger n8n' },
        { '@type': 'Thing', name: 'Stratégie de contenu immobilier' },
        { '@type': 'Thing', name: 'Claude AI' },
        { '@type': 'Thing', name: 'Ambassadeur immobilier' },
      ],
      mentions: [
        { '@type': 'Organization', name: 'Ambassimmo', url: 'https://ambassimmo.com' },
        { '@type': 'SoftwareApplication', name: 'n8n' },
        { '@type': 'SoftwareApplication', name: 'WordPress' },
        { '@type': 'SoftwareApplication', name: 'DataForSEO' },
      ],
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.salesexperienz.fr' },
          { '@type': 'ListItem', position: 2, name: 'Études de cas', item: 'https://www.salesexperienz.fr/etudes-de-cas' },
          { '@type': 'ListItem', position: 3, name: 'Ambassimmo', item: 'https://www.salesexperienz.fr/etudes-de-cas/ambassimmo' },
        ],
      },
    },

    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Comment Ambassimmo a-t-il atteint la première position Google sur "ambassadeur immobilier" ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SalesExperienz a déployé en 3 semaines un système SEO automatisé composé de trois workflows n8n : recherche de mots-clés via DataForSEO, planification éditoriale avec Claude AI, et publication quotidienne automatique sur WordPress via GPT-4o. Le site publie 30 articles/mois sans intervention humaine.',
          },
        },
        {
          '@type': 'Question',
          name: 'Quel est le coût d\'un article SEO avec le système automatisé de SalesExperienz ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Le coût par article est de 13,30 € tout compris avec le système Autoblogger de SalesExperienz, contre 50 à 150 € pour une délégation à un rédacteur freelance.',
          },
        },
        {
          '@type': 'Question',
          name: 'En combien de temps peut-on déployer un système de contenu SEO automatisé ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SalesExperienz déploie le système complet — recherche de mots-clés, architecture éditoriale et publication automatique WordPress — en 3 semaines, du brief à la mise en production.',
          },
        },
        {
          '@type': 'Question',
          name: 'Comment automatiser la publication d\'articles SEO sur WordPress avec n8n ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Le workflow Autoblogger n8n lit chaque matin un calendrier éditorial Google Sheets, génère l\'article complet via GPT-4o, crée l\'image à la une avec DALL-E, puis publie directement sur WordPress via son API REST. Zéro intervention humaine requise.',
          },
        },
      ],
    },

    {
      '@type': 'LocalBusiness',
      name: 'SalesExperienz',
      url: 'https://www.salesexperienz.fr',
      telephone: '+33622951638',
      email: 'contact@salesexperienz.fr',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '15 Bd Chevalier de Clerville, Bât. M3',
        addressLocality: 'Sète',
        addressRegion: 'Occitanie',
        postalCode: '34200',
        addressCountry: 'FR',
      },
    },
  ],
}
