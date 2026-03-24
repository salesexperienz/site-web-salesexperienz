'use client'
import FadeUp from './FadeUp'

const largeCards = [
  {
    icon: '✦',
    tag: 'Croissance organique',
    title: 'Visibilité & Contenu',
    text: "Blog SEO, posts LinkedIn, vidéos — publiés automatiquement selon votre stratégie éditoriale. Votre marque gagne en visibilité chaque jour, sans y passer vos nuits.",
  },
  {
    icon: '◎',
    tag: 'Acquisition',
    title: 'Prospection automatisée',
    text: "Séquences email et LinkedIn déclenchées par des signaux d'intention réels. Vous ne contactez que des prospects qui ont déjà levé la main.",
  },
  {
    icon: '⚡',
    tag: 'Revenue',
    title: 'Acquisition & Conversion',
    text: "Lead scoring automatique, qualification en temps réel, routing vers le bon commercial. Aucun prospect chaud ne passe entre les mailles.",
  },
  {
    icon: '◈',
    tag: 'Fidélisation',
    title: 'Relation client & Marketing',
    text: "Nurturing, relances, support — chaque interaction déclenchée au bon moment selon le comportement réel de votre contact.",
  },
]

const smallCards = [
  {
    icon: '→',
    title: 'Onboarding client',
    text: "Séquences d'accueil, documents, planification. Votre nouveau client pris en charge dès la signature.",
  },
  {
    icon: '▦',
    title: 'Reporting & Pilotage',
    text: "KPIs consolidés et envoyés automatiquement. Vous pilotez avec des données réelles, pas des tableurs manuels.",
  },
  {
    icon: '◻',
    title: 'Facturation & Administratif',
    text: "Factures, relances impayés, contrats. Les tâches sans valeur ajoutée disparaissent de votre agenda.",
  },
  {
    icon: '⊕',
    title: 'Veille & Intelligence marché',
    text: "Alertes concurrentielles, synthèses automatiques. Vous décidez avec les bonnes informations, au bon moment.",
  },
]

export default function WhatToAutomate() {
  return (
    <section className="bg-se-navy-alt py-[80px] lg:py-[120px]">
      <div className="max-w-container mx-auto px-6 lg:px-20">

        {/* Header */}
        <FadeUp className="mb-14 max-w-2xl">
          <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-teal mb-3">
            VOS LEVIERS DE CROISSANCE
          </p>
          <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-white mb-4">
            Automatisez ce qui{' '}
            <span className="text-se-orange">compte vraiment</span>
          </h2>
          <p className="font-body text-[17px] leading-[1.7] text-se-muted">
            Chaque process automatisé est une heure récupérée, une erreur évitée,
            un levier de croissance activé.
          </p>
        </FadeUp>

        {/* Rangée 1 — 4 grandes cards BLANCHES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {largeCards.map((card, i) => (
            <FadeUp key={card.title} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-8 min-h-[220px] h-full transition-all duration-[250ms] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
                {/* Icon */}
                <div className="w-11 h-11 bg-se-teal/[0.12] rounded-[10px] flex items-center justify-center mb-5">
                  <span className="text-se-teal text-[20px]">{card.icon}</span>
                </div>
                {/* Tag */}
                <span className="inline-block font-body text-[12px] font-medium text-se-orange bg-se-orange/10 rounded-full px-3 py-1 mb-3">
                  {card.tag}
                </span>
                {/* Title */}
                <h3 className="font-display font-bold text-[20px] leading-[1.3] text-se-navy mb-3">
                  {card.title}
                </h3>
                {/* Text */}
                <p className="font-body text-[15px] leading-[1.7] text-se-navy/60">
                  {card.text}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Rangée 2 — 4 petites cards BLANCHES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {smallCards.map((card, i) => (
            <FadeUp key={card.title} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 min-h-[140px] h-full transition-all duration-[250ms] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
                {/* Icon small */}
                <div className="w-8 h-8 bg-se-teal/[0.12] rounded-lg flex items-center justify-center mb-4">
                  <span className="text-se-teal text-[15px]">{card.icon}</span>
                </div>
                {/* Title */}
                <h3 className="font-display font-bold text-[17px] text-se-navy mb-2">
                  {card.title}
                </h3>
                {/* Text */}
                <p className="font-body text-[14px] leading-[1.6] text-se-navy/60">
                  {card.text}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  )
}
