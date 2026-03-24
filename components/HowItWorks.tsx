'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeUp from './FadeUp'

const steps = [
  {
    num: '1',
    title: "L'appel découverte + audit stratégique",
    duration: '45 min',
    text: "On cartographie vos processus ET on analyse votre stratégie : commerciale, de visibilité ou opérationnelle. On identifie non seulement quoi automatiser — mais comment le faire de façon cohérente avec vos objectifs de croissance. On calcule le ROI potentiel — chiffres réels, pas d'estimations.",
    result: 'Vous repartez avec la Carte des Opportunités ET une direction stratégique claire.',
  },
  {
    num: '2',
    title: 'Conseil stratégique + construction',
    duration: '1 à 3 semaines',
    text: "Avant d'écrire une seule ligne de workflow, on définit ensemble la stratégie qui va le rendre efficace : approche commerciale, séquencement des messages, architecture éditoriale, KPIs cibles. Puis on construit, on documente, on teste en sandbox, on déploie. Vous validez chaque étape.",
    result: 'Votre workflow tourne — et vous comprenez pourquoi il fonctionne.',
  },
  {
    num: '3',
    title: 'Mesure, ajustement et scale',
    duration: 'Continu',
    text: "On suit les résultats semaine après semaine. On ajuste la stratégie si nécessaire. On identifie les prochaines opportunités. Vous êtes propriétaire de vos workflows — à vie.",
    result: "Votre entreprise tourne plus vite, avec une stratégie qui s'affine en continu.",
  },
]

function ResultBox({ result, delay }: { result: string; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex items-start gap-3 rounded-xl px-5 py-4"
      style={{
        background: 'rgba(232, 98, 26, 0.08)',
        border: '1.5px solid rgba(232, 98, 26, 0.45)',
        borderLeft: '4px solid #E8621A',
      }}
    >
      <span className="text-se-orange text-[18px] mt-0.5 flex-shrink-0">✓</span>
      <p className="font-body text-[15px] leading-[1.6] text-white">
        <strong className="text-se-orange font-medium">Résultat : </strong>
        {result}
      </p>
    </motion.div>
  )
}

export default function HowItWorks() {
  return (
    <section id="how" className="bg-se-navy py-[80px] lg:py-[120px]">
      <div className="max-w-container mx-auto px-6 lg:px-20">

        {/* Header */}
        <FadeUp className="mb-16 max-w-3xl">
          <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
            LE PROCESS
          </p>
          <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-white mb-5">
            <span className="text-se-orange">Stratégie + automatisation</span> :{' '}
            les deux ensemble, pas l&apos;un sans l&apos;autre
          </h2>
          <p className="font-body text-[17px] leading-[1.7] text-white">
            Un workflow sans stratégie, c&apos;est un moteur sans direction. Chaque automatisation
            qu&apos;on construit est précédée d&apos;un travail de conseil : on définit ensemble l&apos;approche
            commerciale, éditoriale ou opérationnelle qui va la rendre réellement efficace.
          </p>
        </FadeUp>

        {/* Steps */}
        <div className="flex flex-col gap-12">
          {steps.map((step, i) => {
            const isEven = i % 2 === 1
            return (
              <FadeUp key={step.num} delay={i * 0.15} fromLeft={!isEven}>
                <div
                  className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-start`}
                >
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <span className="font-display font-extrabold text-[80px] md:text-[120px] leading-none text-se-orange/20 select-none">
                      {step.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-display font-bold text-[22px] md:text-[26px] text-white">
                        {step.title}
                      </h3>
                      <span className="font-body text-[13px] text-se-orange bg-se-orange/10 rounded-full px-3 py-1 whitespace-nowrap">
                        {step.duration}
                      </span>
                    </div>
                    <p className="font-body text-[17px] leading-[1.7] text-se-muted mb-5">
                      {step.text}
                    </p>
                    <ResultBox result={step.result} delay={i * 0.25} />
                  </div>
                </div>
              </FadeUp>
            )
          })}
        </div>

      </div>
    </section>
  )
}
