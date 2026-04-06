export const deepSignalSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Prospection commerciale automatisée',
      description:
        "Système de prospection B2B automatisée basé sur la détection de signaux d'intention comportementaux en temps réel, personnalisé par IA Claude, déployé sur infrastructure n8n. Opérationnel en 7 à 14 jours.",
      provider: {
        '@type': 'LocalBusiness',
        name: 'SalesExperienz',
        url: 'https://salesexperienz.fr',
        logo: 'https://salesexperienz.fr/logo.png',
        telephone: '+33622951638',
        email: 'contact@salesexperienz.fr',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Sète',
          addressRegion: 'Hérault',
          postalCode: '34200',
          addressCountry: 'FR',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '43.4034',
          longitude: '3.6975',
        },
        areaServed: [
          { '@type': 'City', name: 'Sète' },
          { '@type': 'AdministrativeArea', name: 'Hérault' },
          { '@type': 'AdministrativeArea', name: 'Occitanie' },
        ],
      },
      areaServed: 'France',
      serviceType: 'Automatisation de prospection B2B',
      offers: {
        '@type': 'Offer',
        price: '1000',
        priceCurrency: 'EUR',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '1000',
          priceCurrency: 'EUR',
          description: 'À partir de 1 000 € par workflow déployé',
        },
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Qu'est-ce que la prospection commerciale automatisée ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "La prospection commerciale automatisée est un système qui détecte en temps réel les signaux d'intention comportementaux de prospects qualifiés (activité LinkedIn, comportement email, recrutement en cours) et leur envoie automatiquement un message personnalisé par IA, sans intervention humaine.",
          },
        },
        {
          '@type': 'Question',
          name: 'Combien de rendez-vous peut générer Deep Signal par mois ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Deep Signal génère entre 10 et 60 rendez-vous qualifiés par mois selon le secteur et l'ICP cible. Seuls les prospects ayant émis un signal d'intention réel sont contactés, ce qui triple le taux de réponse par rapport à la prospection froide classique.",
          },
        },
        {
          '@type': 'Question',
          name: 'Combien de temps faut-il pour déployer le système ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Le déploiement complet de Deep Signal prend entre 7 et 14 jours. Le système est opérationnel clé en main sans compétence technique requise. Une session de passation de 2h garantit l'autonomie complète du client à J90.",
          },
        },
        {
          '@type': 'Question',
          name: 'Deep Signal est-il conforme au RGPD ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Oui. Deep Signal n'exploite que des données comportementales publiques : commentaires LinkedIn, offres d'emploi publiées, comportement email sur liste opt-in. Aucune donnée privée n'est collectée. L'approche est documentée et compatible RGPD.",
          },
        },
        {
          '@type': 'Question',
          name: "Quel est le coût d'un système Deep Signal ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Les workflows Deep Signal démarrent à partir de 1 000 €. Un système complet (LinkedIn + Email + Nurturing) s'autofinance en 1 à 3 mois selon la valeur client, en évitant les coûts SDR (40 000–80 000 €/an) ou agence (15 000–40 000 €/an).",
          },
        },
        {
          '@type': 'Question',
          name: "Qu'est-ce que la Carte des Opportunités ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "La Carte des Opportunités est un audit stratégique gratuit en 4 étapes (Observer, Mesurer, Prioriser, Recommander) réalisé lors du premier rendez-vous. Elle identifie les processus commerciaux automatisables et calcule le temps récupérable (10 à 30h/semaine) avant tout engagement.",
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: 'https://salesexperienz.fr',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: 'https://salesexperienz.fr/services',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Prospection commerciale automatisée — Deep Signal',
          item: 'https://salesexperienz.fr/services/deepsignal',
        },
      ],
    },
  ],
}
