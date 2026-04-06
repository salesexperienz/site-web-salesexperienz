'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

// ─── Types ───────────────────────────────────────────────────────────────────

interface AccordionItem {
  question: string
  answer: React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  variant?: 'dark' | 'light'
}

// ─── Single item ─────────────────────────────────────────────────────────────

function Item({
  item,
  isOpen,
  onToggle,
  variant,
}: {
  item: AccordionItem
  isOpen: boolean
  onToggle: () => void
  variant: 'dark' | 'light'
}) {
  const isDark = variant === 'dark'

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        isDark
          ? isOpen
            ? 'border-se-orange/40 bg-se-card'
            : 'border-white/[0.06] bg-se-card/50 hover:border-white/[0.12]'
          : isOpen
          ? 'border-se-orange/40 bg-white shadow-md'
          : 'border-se-navy/10 bg-white hover:border-se-orange/20'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span
          className={`font-display font-bold text-[17px] leading-snug ${
            isDark ? 'text-white' : 'text-se-navy'
          }`}
        >
          {item.question}
        </span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'bg-se-orange text-white rotate-45'
              : isDark
              ? 'bg-white/10 text-se-muted'
              : 'bg-se-navy/10 text-se-navy/50'
          }`}
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/*
        Le contenu est TOUJOURS dans le DOM pour les bots IA et moteurs de recherche.
        Seule la hauteur visuelle est animée — le texte reste lisible par les crawlers.
      */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ overflow: 'hidden' }}
        aria-hidden={!isOpen}
      >
        <div
          className={`px-6 pb-6 font-body text-[15px] leading-[1.75] ${
            isDark ? 'text-white/70' : 'text-se-navy/70'
          }`}
        >
          {item.answer}
        </div>
      </motion.div>
    </div>
  )
}

// ─── Exported accordion ───────────────────────────────────────────────────────

export default function DeepSignalAccordion({
  items,
  variant = 'dark',
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <Item
          key={i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => toggle(i)}
          variant={variant}
        />
      ))}
    </div>
  )
}
