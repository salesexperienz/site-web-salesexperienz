export const seoGeoMachineSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.salesexperienz.fr/services/seo-geo-machine',
      name: 'Création Site Web & Contenu SEO Automatisé à Sète — SEO GEO Machine',
      description:
        'Site web SEO-ready et machine à contenu automatisée à Sète (34). Votre site, votre présence locale et vos articles IA alignés en propriété totale.',
      url: 'https://www.salesexperienz.fr/services/seo-geo-machine',
      inLanguage: 'fr-FR',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.salesexperienz.fr' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.salesexperienz.fr/#services' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'SEO GEO Machine',
            item: 'https://www.salesexperienz.fr/services/seo-geo-machine',
          },
        ],
      },
    },
    {
      '@type': 'Service',
      name: 'SEO GEO Machine — Création Site Web & Contenu SEO Automatisé',
      description:
        'Système intégré combinant création de site web SEO-ready (Next.js/WordPress), optimisation Google My Business et machine à articles automatisés avec méthode Capsule GEO.',
      provider: {
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
        areaServed: [
          { '@type': 'City', name: 'Sète' },
          { '@type': 'AdministrativeArea', name: 'Hérault' },
          { '@type': 'AdministrativeArea', name: 'Occitanie' },
          { '@type': 'Country', name: 'France' },
        ],
        geo: { '@type': 'GeoCoordinates', latitude: 43.4066, longitude: 3.6978 },
      },
      areaServed: 'France',
      serviceType: ['Création de site web SEO', 'Contenu SEO automatisé', 'Google My Business', 'GEO Optimization'],
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'EUR',
        lowPrice: '197',
        highPrice: '3500',
        offerCount: '5',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Qu'est-ce que le SEO GEO et pourquoi est-ce différent du SEO classique ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Le SEO GEO (Generative Engine Optimization) optimise un site pour être cité par les IA génératives (ChatGPT, Perplexity, Gemini) en plus de Google. 72% des pages citées par ChatGPT utilisent la méthode Capsule : une réponse courte autonome placée sous chaque titre en forme de question.",
          },
        },
        {
          '@type': 'Question',
          name: "Combien coûte la création d'un site web SEO-ready à Sète ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "La création d'un site SEO-ready démarre à 1 500 € HT (formule Starter WordPress) jusqu'à 3 500 € HT (formule Premium Next.js/Vercel). Le tarif exact est défini lors de la Carte des Opportunités, un audit gratuit de 45 minutes.",
          },
        },
        {
          '@type': 'Question',
          name: "Combien d'articles SEO peut publier la machine à contenu automatisée ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Nos workflows publient de 1 à 5 articles par jour selon la formule choisie : 30 articles/mois (Essentiel à 197 €/mois), 72 articles/mois (Développement à 297 €/mois) ou 150 articles/mois (Performance à 397 €/mois). Chaque article intègre la méthode Capsule GEO.',
          },
        },
        {
          '@type': 'Question',
          name: 'Est-ce que SEO GEO Machine fonctionne avec un site WordPress existant ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Oui. Si vous avez déjà un site WordPress fonctionnel, les workflows de publication automatisée s'intègrent à votre infrastructure existante. Aucune refonte imposée.",
          },
        },
        {
          '@type': 'Question',
          name: 'Combien de temps avant les premiers résultats SEO et GEO ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Le déploiement du système prend à partir de 15 jours. La visibilité sur les IA génératives peut s'établir en 30 à 90 jours sur des requêtes de niche. Le SEO classique sur Google suit une progression de 3 à 6 mois.",
          },
        },
        {
          '@type': 'Question',
          name: "Les workflows de publication m'appartiennent-ils après la prestation ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Oui, à 100% dès le premier paiement. Documentation technique complète livrée systématiquement. Si SalesExperienz disparaît demain, votre système continue de tourner. Vous n'êtes jamais otage d'un prestataire.",
          },
        },
      ],
    },
  ],
}
