'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeUp from './FadeUp'
import { FAQ_ITEMS_SETE } from '@/lib/schema-faq'

export default function FaqSete() {
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
            Ce que vous voulez savoir avant de{' '}
            <span className="text-se-orange">décrocher votre téléphone</span>
          </h2>
        </FadeUp>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto">
          {FAQ_ITEMS_SETE.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <FadeUp key={faq.question} delay={i * 0.05}>
                <div
                  className={`border-b border-white/[0.08] py-6 transition-all duration-200 ${
                    isOpen ? 'border-l-[3px] border-l-se-orange pl-4' : ''
                  }`}
                >
                  {/* Question */}
                  <button
                    className={`w-full flex items-center justify-between text-left gap-4 transition-colors duration-200 ${
                      isOpen ? 'text-se-orange' : 'text-white hover:text-se-orange'
                    }`}
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  >
                    <span className="font-body text-[17px] font-medium leading-[1.5]">
                      {faq.question}
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
                          {faq.answer}
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
