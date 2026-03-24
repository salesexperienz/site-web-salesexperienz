/**
 * Schéma FAQPage JSON-LD — SalesExperienz
 * À injecter dans app/page.tsx via dangerouslySetInnerHTML
 *
 * ⚠️  Les réponses doivent aussi être visibles dans le HTML de la page
 *     (pas seulement dans ce JSON-LD) pour que Google les indexe
 *     et que les IA puissent les extraire — voir note dans FAQ_ITEMS.
 */

export const FAQ_ITEMS = [
  {
    question: 'Dois-je savoir coder ou connaître n8n pour travailler avec vous ?',
    answer:
      'Non. Une fois installé et configuré, aucune compétence technique n\'est requise. Vous pilotez la stratégie, l\'IA exécute. Une formation incluse vous rend autonome en 1h30.',
  },
  {
    question: 'Comment savez-vous quoi automatiser dans mon entreprise ?',
    answer:
      'La première étape est la Carte des Opportunités : un audit de 45 minutes où on cartographie ensemble toutes vos tâches répétitives. On mesure le temps perdu par tâche et par fréquence, puis on priorise selon la méthode ICE (Impact, Confiance, Facilité). Vous repartez avec un plan chiffré avant toute construction.',
  },
  {
    question: 'Est-ce que ça fonctionne pour mon secteur d\'activité ?',
    answer:
      'Oui. L\'automatisation avec n8n s\'adapte à tout secteur BtoB : agences, cabinets de conseil, éditeurs SaaS, e-commerce, immobilier, formation. Les processus varient, mais les patterns répétitifs (relances, reporting, onboarding, prospection) sont universels. Si vous avez des tâches manuelles et des outils qui ne se parlent pas, on peut automatiser.',
  },
  {
    question: 'Combien de temps avant de voir des résultats ?',
    answer:
      'Les premiers résultats sont visibles dès la première semaine pour les automatisations opérationnelles (relances, onboarding, reporting). Pour la prospection automatisée, comptez 3 à 4 semaines pour calibrer les séquences et obtenir des rendez-vous qualifiés. L\'Auto-Blog SEO produit du trafic organique sur 2 à 4 mois selon la concurrence.',
  },
  {
    question: 'Je suis propriétaire des workflows après la mission ?',
    answer:
      'Oui, à 100 %. Tous les workflows n8n livrés vous appartiennent. Vous recevez les fichiers d\'export, la documentation et une formation pour les modifier vous-même. Il n\'y a aucun abonnement, aucune dépendance à SalesExperienz pour faire tourner vos automatisations.',
  },
  {
    question: 'Quel est le budget minimum pour démarrer ?',
    answer:
      'La Carte des Opportunités (audit + plan d\'action) est la première étape — elle permet d\'identifier ce qui mérite d\'être automatisé avant d\'investir. Les missions de construction démarrent ensuite selon le périmètre défini. Contactez-nous pour obtenir une estimation chiffrée adaptée à votre contexte.',
  },
  {
    question: 'Que se passe-t-il si un workflow tombe en panne ?',
    answer:
      'n8n envoie des alertes automatiques en cas d\'erreur d\'exécution. Chaque workflow livré est documenté avec un guide de dépannage. Pour les clients en suivi continu, nous intervenons sous 24h ouvrées. À terme, vous serez autonome pour diagnostiquer et corriger les incidents courants grâce à la formation incluse.',
  },
]

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}
