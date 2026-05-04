'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Step = 0 | 1

const BREVO_URL = 'https://meet.brevo.com/laurent-guyonvarch/borderless?l=rendez-vous-decouverte'

const TOPICS = [
  { id: 'prospection', label: 'Prospection B2B automatisée', sub: 'Générer des RDV qualifiés sans y passer mes journées' },
  { id: 'process',     label: 'Automatisation de process',   sub: 'Supprimer les tâches répétitives et gagner du temps' },
  { id: 'seo',         label: 'Visibilité SEO & contenu IA', sub: 'Créer et publier du contenu de manière systématique' },
  { id: 'autre',       label: 'Autre sujet',                 sub: 'J\'ai un besoin spécifique à vous expliquer' },
]

// ─── Stepper ──────────────────────────────────────────────────────────────────

const STEP_LABELS = ['Votre enjeu', 'Votre créneau']

function Stepper({ current }: { current: 0 | 1 }) {
  return (
    <div className="flex items-start justify-center mt-10">
      {STEP_LABELS.map((label, i) => (
        <div key={i} className="flex items-start">
          <div className="flex flex-col items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
              i < current   ? 'bg-[#1D4ED8] border-[#1D4ED8]' :
              i === current ? 'bg-[#1D4ED8] border-[#1D4ED8]' :
                              'bg-white border-[#CBD5E1]'
            }`}>
              {i < current ? (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : i === current ? (
                <div className="w-2 h-2 rounded-full bg-white" />
              ) : (
                <span className="font-body text-[11px] font-semibold text-[#CBD5E1]">{i + 1}</span>
              )}
            </div>
            <span className={`font-body text-[11px] font-medium transition-colors duration-300 ${
              i === current ? 'text-[#1D4ED8]' : i < current ? 'text-[#6B7280]' : 'text-[#9CA3AF]'
            }`}>
              {label}
            </span>
          </div>
          {i < STEP_LABELS.length - 1 && (
            <div className={`h-[2px] w-14 mx-2 mt-[13px] rounded-full transition-all duration-500 ${current > i ? 'bg-[#1D4ED8]' : 'bg-[#E5E7EB]'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function ChevLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

// ─── Right panel ──────────────────────────────────────────────────────────────

function RightPanel() {
  return (
    <div className="flex order-first lg:order-last w-full lg:w-[48%] flex-shrink-0 flex-col p-6 lg:p-8 bg-[#E8EDF6] relative overflow-hidden min-h-screen lg:min-h-0">

      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #A8BADE 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      {/* Logo */}
      <div className="relative z-10 flex justify-center pt-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-noir.png" alt="Sales Experienz" className="h-20 w-auto" />
      </div>

      {/* Image — centrée dans l'espace restant */}
      <div className="relative z-10 flex-1 flex items-center py-6">
        <div className="w-full rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.16),0_4px_16px_rgba(0,0,0,0.07)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/5.png" alt="Automatisez vos process — Sales Experienz" className="w-full h-auto block" />
        </div>
      </div>

      {/* Texte avec espace en dessous */}
      <div className="relative z-10 pb-8">
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E8621A] mb-2">
          Appel découverte · 45 min · Sans engagement
        </p>
        <h3 className="font-display font-bold text-[18px] leading-[1.3] text-[#0D1B3E] mb-2">
          Identifiez ce qui freine<br />votre croissance — en 45 minutes
        </h3>
        <p className="font-body text-[13px] text-[#4B5563] leading-[1.65]">
          On cartographie ensemble vos processus, on chiffre le potentiel, et vous repartez avec un plan d&apos;action concret. Pas de jargon, pas d&apos;engagement.
        </p>
      </div>

    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ContactForm() {
  const [step, setStep] = useState<Step>(0)
  const [topic, setTopic] = useState<string | null>(null)

  function selectTopic(id: string) {
    setTopic(id)
    setStep(1)
  }

  return (
    <div className={`min-h-screen bg-[#E8EDF6] flex justify-center font-body p-8 lg:p-12 ${step === 0 ? 'items-center' : 'items-start'}`}>
      <div className="w-full max-w-[940px] bg-white rounded-2xl shadow-[0_8px_60px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col lg:flex-row">

        {/* ── LEFT PANEL ─────────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col px-8 md:px-12 py-10 min-h-screen lg:min-h-0">
          <AnimatePresence mode="wait">

            {/* ── STEP 0 : Qualification ───────────────────────────────── */}
            {step === 0 && (
              <motion.div
                key="s0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22 }}
              >
                <h2 className="font-display font-bold text-[26px] text-[#0D1B3E] mb-1.5">
                  Quel est votre principal enjeu ?
                </h2>
                <p className="font-body text-[14px] text-[#6B7280] leading-[1.6] mb-7">
                  Choisissez le sujet de votre appel — Laurent se prépare en amont pour vous apporter des réponses concrètes.
                </p>

                <div className="flex flex-col gap-3">
                  {TOPICS.map(t => (
                    <button
                      key={t.id}
                      onClick={() => selectTopic(t.id)}
                      className="group flex items-center gap-4 text-left w-full border border-[#E5E7EB] rounded-xl px-5 py-4 transition-all duration-150 hover:border-[#1D4ED8] hover:bg-[#EEF2FB] hover:shadow-sm active:scale-[0.99]"
                    >
                      <span className="flex-shrink-0 text-[#CBD5E1] group-hover:text-[#1D4ED8] transition-colors duration-150">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" />
                        </svg>
                      </span>
                      <div>
                        <p className="font-body font-semibold text-[15px] text-[#0D1B3E] group-hover:text-[#1D4ED8] transition-colors">{t.label}</p>
                        <p className="font-body text-[12px] text-[#6B7280] mt-0.5">{t.sub}</p>
                      </div>
                      <div className="ml-auto text-[#CBD5E1] group-hover:text-[#1D4ED8] transition-colors flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>

                <Stepper current={0} />
              </motion.div>
            )}

            {/* ── STEP 1 : Brevo iframe ────────────────────────────────── */}
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.22 }}
              >
                <div className="flex items-start gap-3 mb-5">
                  <button
                    onClick={() => setStep(0)}
                    className="mt-1 flex items-center gap-1 font-body text-[13px] text-[#6B7280] hover:text-[#0D1B3E] transition-colors flex-shrink-0"
                  >
                    <ChevLeft /> Retour
                  </button>
                  <div>
                    <h2 className="font-display font-bold text-[22px] text-[#0D1B3E] leading-tight">
                      Choisissez votre créneau
                    </h2>
                    {topic && (
                      <p className="font-body text-[13px] text-[#6B7280] mt-0.5">
                        Sujet&nbsp;: <span className="font-medium text-[#0D1B3E]">{TOPICS.find(t => t.id === topic)?.label}</span>
                      </p>
                    )}
                  </div>
                </div>

                <iframe
                  width="100%"
                  height="620"
                  src={BREVO_URL}
                  title="Réserver un créneau"
                  className="rounded-xl border-0"
                />

                <Stepper current={1} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* ── RIGHT PANEL ────────────────────────────────────────────────────── */}
        <RightPanel />

      </div>
    </div>
  )
}
