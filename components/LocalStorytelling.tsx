'use client'
import FadeUp from './FadeUp'

interface LocalStorytellingProps {
  ville?: string
  intro: string
  problems: string[]
  methode: React.ReactNode
  highlight: string
}

export default function LocalStorytelling({ ville, intro, problems, methode, highlight }: LocalStorytellingProps) {
  return (
    <section className="bg-white py-[80px] lg:py-[120px] border-t-[3px] border-se-orange/20">
      <div className="max-w-container mx-auto px-6 lg:px-20">
        <div className="max-w-3xl">

          <FadeUp>
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-4">
              CONTEXTE{ville ? ` · ${ville.toUpperCase()} B2B` : ''}
            </p>
            <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.15] text-se-navy mb-8">
              Pourquoi travailler avec un expert automatisation commerciale orienté résultats{ville ? ` à ${ville}` : ''}&nbsp;?
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-body text-[17px] leading-[1.8] text-se-navy/70 mb-10">
              {intro}
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <ul className="flex flex-col gap-4 mb-10 pl-2">
              {problems.map((p, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-se-orange/10 flex items-center justify-center">
                    <span className="text-se-orange text-[13px] font-bold leading-none">×</span>
                  </span>
                  <span className="font-body text-[16px] leading-[1.7] text-se-navy/70">{p}</span>
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="mb-6">
              <div className="w-10 h-[3px] bg-se-orange mb-5" />
              <p className="font-display font-bold text-[24px] md:text-[28px] text-se-orange leading-[1.2]">
                Ma méthode est différente.
              </p>
            </div>
            <div className="font-body text-[17px] leading-[1.8] text-se-navy/70 mb-10">
              {methode}
            </div>
          </FadeUp>

          <FadeUp delay={0.25}>
            <div className="rounded-2xl p-6 lg:p-8" style={{ background: '#0e1b3e' }}>
              <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-se-orange mb-3">
                Point de départ
              </p>
              <p className="font-body text-[16px] leading-[1.7] text-white font-medium">
                {highlight}
              </p>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  )
}
