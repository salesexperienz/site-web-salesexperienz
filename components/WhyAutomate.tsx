'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FadeUp from './FadeUp'

const cards = [
  {
    icon: '⚡',
    title: "L'absence d'orchestration",
    text: "Vous avez les outils. Vous avez les idées. Mais rien ne se parle, rien n'est coordonné. Chaque process vit dans son coin.",
  },
  {
    icon: '◎',
    title: 'Le goulot invisible',
    text: "Vous avez la vision, les clients, l'envie de scaler — mais quelque chose coince. Ce \"quelque chose\", c'est souvent un process manuel que personne n'a jamais pensé à automatiser.",
  },
  {
    icon: '↺',
    title: 'La roue du hamster',
    text: "Vous travaillez plus pour gagner pareil. Vos journées sont pleines mais votre chiffre d'affaires, lui, ne bouge pas.",
  },
  {
    icon: '⏱',
    title: 'Le coût caché du temps perdu',
    text: "Chaque heure passée sur de la saisie, des relances manuelles ou du reporting est une heure que vous ne facturez pas. Calculez : ça fait combien par an ?",
  },
]

function TypewriterTitle({ text, delay }: { text: string; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <h3
      ref={ref}
      className="text-[26px] leading-[1.3] text-white mb-3"
      style={{ fontFamily: 'var(--font-handwriting)', fontWeight: 600 }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.02, delay: delay + i * 0.035 }}
        >
          {char}
        </motion.span>
      ))}
    </h3>
  )
}

export default function WhyAutomate() {
  const gridRef = useRef(null)
  const isInView = useInView(gridRef, { once: true, margin: '-80px' })

  return (
    <section id="why" className="bg-se-navy-alt py-[80px] lg:py-[120px]">
      <div className="max-w-container mx-auto px-6 lg:px-20">

        <FadeUp className="mb-12">
          <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
            LE DIAGNOSTIC
          </p>
          <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-white">
            Votre entreprise se reconnaît dans{' '}
            <span className="text-se-orange whitespace-nowrap">l&apos;une de ces situations&nbsp;?</span>
          </h2>
        </FadeUp>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: '1000px' }}>
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, rotateY: 60, scale: 0.88, y: 20 }}
              animate={isInView ? { opacity: 1, rotateY: 0, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ transformOrigin: 'left center' }}
              className="bg-se-card border border-white/[0.06] rounded-2xl p-8 h-full transition-all duration-[250ms] hover:-translate-y-1.5 hover:border-se-orange/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_0_1px_rgba(232,98,26,0.15)]"
            >
              <div className="w-11 h-11 bg-se-teal/[0.15] rounded-[10px] flex items-center justify-center mb-5">
                <span className="text-se-teal text-[20px]">{card.icon}</span>
              </div>
              <TypewriterTitle text={card.title} delay={i * 0.15 + 0.6} />
              <p className="font-body text-[17px] leading-[1.7] text-white">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
