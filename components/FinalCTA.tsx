'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { DISCOVERY_URL } from '@/lib/constants'

export default function FinalCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="relative overflow-hidden py-[80px] lg:py-[120px] bg-white">

      <div ref={ref} className="relative z-10 max-w-container mx-auto px-6 lg:px-20 flex flex-col items-center text-center">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-4"
        >
          PASSEZ À L&apos;ACTION
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display font-bold text-[32px] md:text-[52px] leading-[1.15] text-se-navy max-w-3xl mb-6"
        >
          Prêt à identifier ce qui{' '}
          <span className="text-se-orange">freine votre croissance</span> ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-body text-[17px] leading-[1.7] text-se-navy/70 max-w-xl mb-10"
        >
          Réservez un appel de découverte de 45 minutes.
          On cartographie ensemble vos opportunités d&apos;automatisation.
          Aucune obligation, aucun jargon technique.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href={DISCOVERY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-se-orange text-white border-2 border-se-orange rounded-full px-12 py-5 text-[18px] font-medium font-body transition-all duration-200 hover:bg-se-orange-h hover:border-se-orange-h hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(232,98,26,0.5)] active:translate-y-0"
          >
            Je veux accélérer ma croissance
          </a>
          <p className="font-body text-[14px] text-se-navy/50">
            Sans engagement · 45 minutes · 100% en visio
          </p>
        </motion.div>

      </div>
    </section>
  )
}
