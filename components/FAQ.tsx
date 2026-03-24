'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeUp from './FadeUp'

const faqs = [
  {
    q: 'Dois-je savoir coder ou connaître n8n pour travailler avec vous ?',
    a: "Non. Une fois installé et configuré, aucune compétence technique n'est requise. Vous pilotez la stratégie, l'IA exécute. Une formation incluse vous rend autonome en 1h30.",
  },
  {
    q: 'Comment savez-vous quoi automatiser dans mon entreprise ?',
    a: "C'est l'objet de la Carte des Opportunités — on commence par un audit structuré de vos processus avant de construire quoi que ce soit. On ne propose rien sans avoir d'abord compris votre contexte.",
  },
  {
    q: "Est-ce que ça fonctionne pour mon secteur d'activité ?",
    a: "L'automatisation s'applique à tout processus répétitif, quel que soit le secteur. On a accompagné des consultants, des PME industrielles, des e-commerçants et des agences. Si vous avez des tâches manuelles récurrentes, il y a des opportunités.",
  },
  {
    q: 'Combien de temps avant de voir des résultats ?',
    a: 'Les premiers Quick Wins sont mesurables dès la première semaine de déploiement. Pour les résultats SEO (Auto-Blog), comptez 3 mois d\'indexation et 6 mois de trafic organique mesurable.',
  },
  {
    q: 'Je suis propriétaire des workflows après la mission ?',
    a: "Oui, à 100%. Les workflows n8n, les données, les séquences — tout vous appartient dès le premier jour. Aucun lock-in, aucune dépendance imposée.",
  },
  {
    q: 'Quel est le budget minimum pour démarrer ?',
    a: "On ne parle pas budget avant d'avoir compris votre situation. L'appel de découverte est là pour ça — on identifie ensemble les opportunités, puis on construit une proposition adaptée à votre contexte.",
  },
  {
    q: "Que se passe-t-il si un workflow tombe en panne ?",
    a: "Chaque livraison inclut une documentation complète et un support post-déploiement. On forme votre équipe à maintenir les workflows. Et pour les clients qui le souhaitent, des offres de maintenance mensuelle sont disponibles.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <section className="bg-se-navy-alt py-[80px] lg:py-[120px]">
      <div className="max-w-container mx-auto px-6 lg:px-20">

        {/* Header */}
        <FadeUp className="mb-14 max-w-xl">
          <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
            VOS QUESTIONS
          </p>
          <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-white">
            Tout ce que vous voulez savoir avant de{' '}
            <span className="text-se-orange">réserver un appel</span>
          </h2>
        </FadeUp>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <FadeUp key={faq.q} delay={i * 0.05}>
                <div
                  className={`border-b border-white/[0.08] py-6 ${
                    isOpen ? 'border-l-[3px] border-l-se-orange pl-4' : ''
                  } transition-all duration-200`}
                >
                  {/* Question */}
                  <button
                    className={`w-full flex items-center justify-between text-left gap-4 transition-colors duration-200 ${
                      isOpen ? 'text-se-orange' : 'text-white hover:text-se-orange'
                    }`}
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  >
                    <span className="font-body text-[17px] font-medium leading-[1.5]">
                      {faq.q}
                    </span>
                    <span
                      className={`text-se-orange text-[22px] font-light flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {/* Answer — animated */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="font-body text-[16px] text-se-muted leading-[1.7] pt-4 pr-10">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            )
          })}
        </div>

      </div>
    </section>
  )
}
