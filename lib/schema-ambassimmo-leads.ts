export const ambassimmoLeadsSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://www.salesexperienz.fr/etudes-de-cas/ambassimmo-leads',
      headline: "Comment Ambassimmo automatise la mise en relation entre vendeurs immobiliers et agences partenaires — de l'estimation en ligne au contrat signé en moins de 5 minutes",
      description:
        "SalesExperienz a conçu pour Ambassimmo un pipeline complet : plugin WordPress d'estimation immobilière custom, captation et segmentation automatique des leads vendeurs, enrichissement des agences immobilières de proximité, et envoi automatisé d'un contrat AMI via DocuSeal. Zéro intervention humaine.",
      url: 'https://www.salesexperienz.fr/etudes-de-cas/ambassimmo-leads',
      inLanguage: 'fr-FR',
      datePublished: '2026-04-27',
      dateModified: '2026-04-27',
      image: {
        '@type': 'ImageObject',
        url: 'https://www.salesexperienz.fr/og-ambassimmo-leads.jpg',
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
        { '@type': 'Thing', name: 'Automatisation prospection immobilière' },
        { '@type': 'Thing', name: 'Plugin WordPress estimation immobilière' },
        { '@type': 'Thing', name: 'Lead generation agences immobilières' },
        { '@type': 'Thing', name: 'Contrat AMI automatisé' },
        { '@type': 'Thing', name: 'n8n workflow immobilier' },
      ],
      mentions: [
        { '@type': 'Organization', name: 'Ambassimmo', url: 'https://ambassimmo.com' },
        { '@type': 'SoftwareApplication', name: 'n8n' },
        { '@type': 'SoftwareApplication', name: 'DocuSeal' },
        { '@type': 'SoftwareApplication', name: 'Brevo' },
        { '@type': 'SoftwareApplication', name: 'Icypeas' },
      ],
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.salesexperienz.fr' },
          { '@type': 'ListItem', position: 2, name: 'Études de cas', item: 'https://www.salesexperienz.fr/etudes-de-cas' },
          { '@type': 'ListItem', position: 3, name: 'Ambassimmo — Pipeline Leads', item: 'https://www.salesexperienz.fr/etudes-de-cas/ambassimmo-leads' },
        ],
      },
    },

    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Comment automatiser l'envoi d'un contrat immobilier à des agences partenaires ?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SalesExperienz a déployé pour Ambassimmo un pipeline n8n en 4 étapes : capture du lead via un plugin WordPress d\'estimation, segmentation automatique dans Brevo, enrichissement des agences de proximité (Google Maps + Pappers + Icypeas), puis envoi automatique d\'un contrat AMI pré-rempli via DocuSeal. Le délai entre un lead qualifié et l\'envoi du contrat est inférieur à 5 minutes.',
          },
        },
        {
          '@type': 'Question',
          name: 'Comment trouver automatiquement les agences immobilières autour d\'un bien à vendre ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Un workflow n8n utilise GPT-4o pour générer 10 requêtes géolocalisées autour de l\'adresse du bien, interroge l\'API Google Maps Text Search, filtre les 8 meilleures agences (note ≥ 4,0) dans un rayon de 5km, puis enrichit leurs données via l\'API Pappers (dirigeant, SIREN) et Icypeas (email professionnel).',
          },
        },
        {
          '@type': 'Question',
          name: 'Comment créer un plugin WordPress d\'estimation immobilière ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SalesExperienz a développé pour Ambassimmo un plugin WordPress custom (React + PHP) intégrant les DVF (données de valeurs foncières), l\'API Geo.gouv.fr et l\'API Adresse pour calculer une estimation algorithmique en temps réel. Le plugin est installable via shortcode [ambassimmo_estimation] et transmet les leads à n8n via webhook.',
          },
        },
        {
          '@type': 'Question',
          name: 'Comment segmenter automatiquement des leads immobiliers dans un CRM ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Le workflow n8n analyse le profil de chaque lead (situation de vente + consentement RGPD) et l\'oriente vers 3 listes Brevo distinctes : leads chauds (projet concret + RGPD) → traitement immédiat avec recherche d\'agences, leads tièdes (projet sans RGPD) → séquence nurturing, leads froids (veille marché) → séquence longue.',
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
