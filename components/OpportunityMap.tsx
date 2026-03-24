'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeUp from './FadeUp'
import { DISCOVERY_URL } from '@/lib/constants'

const steps = [
  {
    num: '01',
    title: 'Observer',
    text: 'Lister toutes les tâches répétitives de votre équipe. Rien ne passe entre les mailles.',
  },
  {
    num: '02',
    title: 'Mesurer',
    text: 'Temps × Fréquence = heures perdues et ROI annuel réel. Des chiffres concrets, pas des estimations.',
  },
  {
    num: '03',
    title: 'Prioriser',
    text: 'Méthode ICE : Impact, Confiance, Facilité. On commence par ce qui rapporte le plus vite.',
  },
  {
    num: '04',
    title: 'Tester',
    text: "1 automatisation pilote, mesurée et documentée. La preuve par l'exemple avant de scaler.",
  },
]

const roiRows = [
  { task: 'Triage emails support',    time: '2 min/email',    freq: '250/semaine', roi: '28 000 €/an' },
  { task: 'Relances commerciales',    time: '15 min/relance', freq: '20/semaine',  roi: '17 000 €/an' },
  { task: 'Traitement des factures',  time: '10 min/facture', freq: '50/semaine',  roi: '28 000 €/an' },
]

// Flèche SVG orange animée
function AnimatedArrow({ delay, isInView }: { delay: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      className="flex items-center justify-center"
    >
      <motion.div
        animate={isInView ? { x: [0, 6, 0] } : {}}
        transition={{ duration: 1.1, delay: delay + 0.4, repeat: Infinity, ease: 'easeInOut' }}
        className="w-9 h-9 rounded-full flex items-center justify-center shadow-[0_0_14px_rgba(232,98,26,0.45)]"
        style={{ background: '#E8621A' }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default function OpportunityMap() {
  const timelineRef = useRef(null)
  const timelineInView = useInView(timelineRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-[80px] lg:py-[120px] overflow-hidden" style={{ background: 'rgb(234, 244, 236)' }}>

      {/* Trait décoratif en haut */}
      <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 50%, transparent 100%)' }} />

      <div className="relative z-10 max-w-container mx-auto px-6 lg:px-20">

        {/* Header */}
        <FadeUp className="mb-12 max-w-3xl">
          <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-navy/60 mb-3">
            L&apos;OFFRE SIGNATURE
          </p>
          <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.3] text-se-navy mb-5">
            La <span className="text-se-orange">Carte des Opportunités</span> :<br />
            découvrez exactement<br />
            <span className="whitespace-nowrap">
              <span className="italic">quoi</span>
              {' '}automatiser — et{' '}
              <span className="italic">pourquoi&nbsp;?</span>
            </span>
          </h2>
          <p className="font-body text-[17px] leading-[1.7] text-se-navy/70">
            Avant de construire quoi que ce soit, on cartographie ensemble votre entreprise.
            On identifie les goulots, on mesure le temps perdu, on priorise les quick wins.
            Vous repartez avec un plan clair, chiffré, actionnable.
          </p>
        </FadeUp>

        {/* Timeline — 4 étapes + flèches entre elles */}
        <div ref={timelineRef} className="mb-16">

          {/* Desktop : grille + flèches */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-0 items-center">
            {steps.map((step, i) => (
              <>
                {/* Carte */}
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                  className="bg-white border border-se-navy/10 rounded-2xl p-6 h-full transition-all duration-[250ms] hover:-translate-y-1.5 hover:border-se-navy/25 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
                >
                  <span className="font-display font-extrabold text-[40px] leading-none text-se-navy block mb-4">
                    {step.num}
                  </span>
                  <h3 className="font-display font-bold text-[18px] text-se-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-[15px] leading-[1.7] text-se-navy/60">
                    {step.text}
                  </p>
                </motion.div>

                {/* Flèche entre cartes (sauf après la dernière) */}
                {i < steps.length - 1 && (
                  <div key={`arrow-${i}`} className="flex items-center justify-center px-3">
                    <AnimatedArrow delay={i * 0.12 + 0.55} isInView={timelineInView} />
                  </div>
                )}
              </>
            ))}
          </div>

          {/* Mobile : liste verticale */}
          <div className="flex flex-col gap-4 lg:hidden">
            {steps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.1}>
                <div className="bg-white border border-se-navy/10 rounded-2xl p-6 transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.10)]">
                  <span className="font-display font-extrabold text-[40px] leading-none text-se-navy block mb-3">
                    {step.num}
                  </span>
                  <h3 className="font-display font-bold text-[18px] text-se-navy mb-2">{step.title}</h3>
                  <p className="font-body text-[15px] leading-[1.7] text-se-navy/60">{step.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ROI Table */}
        <FadeUp className="mb-12">
          <div className="overflow-x-auto rounded-2xl border border-se-navy/15">
            <table className="w-full text-left bg-white">
              <thead>
                <tr className="border-b border-se-navy/10">
                  {['Tâche', 'Temps', 'Fréquence', 'ROI annuel'].map((h) => (
                    <th key={h} className="font-body text-[13px] font-medium uppercase tracking-[0.1em] text-se-navy px-6 py-4">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roiRows.map((row, i) => (
                  <tr key={row.task} className={`border-b border-se-navy/[0.05] last:border-0 ${i % 2 === 1 ? 'bg-se-navy/[0.02]' : ''}`}>
                    <td className="font-body text-[15px] text-se-navy px-6 py-4">{row.task}</td>
                    <td className="font-body text-[15px] text-se-navy/60 px-6 py-4">{row.time}</td>
                    <td className="font-body text-[15px] text-se-navy/60 px-6 py-4">{row.freq}</td>
                    <td className="font-body text-[15px] font-medium text-se-orange px-6 py-4">{row.roi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>

        {/* CTA centré */}
        <FadeUp className="flex justify-center">
          <a
            href={DISCOVERY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-se-navy text-white border-2 border-se-navy rounded-full px-8 py-[14px] text-[16px] font-medium font-body transition-all duration-200 hover:bg-se-navy/90 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(13,27,62,0.35)] group"
          >
            Identifier mes opportunités
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </FadeUp>

      </div>
    </section>
  )
}
