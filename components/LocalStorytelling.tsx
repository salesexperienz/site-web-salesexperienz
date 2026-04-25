'use client'
import Image from 'next/image'
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
    <section className="bg-white pt-[80px] lg:pt-[120px] pb-[40px] lg:pb-[60px] border-t-[3px] border-se-orange/20">
      <div className="max-w-container mx-auto px-6 lg:px-20">
        {/* Label + titre — pleine largeur */}
        <FadeUp className="mb-8">
          <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-4">
            CONTEXTE{ville ? ` · ${ville.toUpperCase()} B2B` : ''}
          </p>
          <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.15] text-se-navy">
            Pourquoi travailler avec un expert automatisation commerciale orienté résultats{ville ? ` à ${ville}` : ''}&nbsp;?
          </h2>
        </FadeUp>

        {/* Photo mobile — centrée sous le titre */}
        <FadeUp delay={0.08} className="flex lg:hidden justify-center mb-8">
          <Image
            src="/LaurentG.png"
            alt="Laurent Guyonvarch — Sales Experienz"
            width={200}
            height={200}
            className="rounded-2xl shadow-xl"
          />
        </FadeUp>

        {/* Intro + problèmes à gauche, photo à droite — alignés en haut */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-12 lg:mb-16">
          <div className="flex-1 min-w-0">
            <FadeUp delay={0.1}>
              <p className="font-body text-[19px] leading-[1.8] text-se-navy font-medium mb-8">
                {intro}
              </p>
            </FadeUp>
            <FadeUp delay={0.15}>
              <ul className="flex flex-col gap-3">
                {problems.map((p, i) => (
                  <li key={i} className="flex items-start gap-4 bg-se-navy/[0.03] border border-se-navy/[0.07] rounded-xl px-5 py-4">
                    <span className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full bg-se-orange/15 flex items-center justify-center">
                      <span className="text-se-orange text-[16px] font-bold leading-none">×</span>
                    </span>
                    <span className="font-body text-[16px] leading-[1.7] text-se-navy font-medium">{p}</span>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          {/* Photo desktop */}
          <FadeUp delay={0.1} className="hidden lg:block flex-shrink-0">
            <Image
              src="/LaurentG.png"
              alt="Laurent Guyonvarch — Sales Experienz"
              width={300}
              height={300}
              className="rounded-2xl shadow-xl"
            />
          </FadeUp>
        </div>

        {/* Titre méthode — pleine largeur */}
        <FadeUp delay={0.2} className="mb-6">
          <div className="w-10 h-[3px] bg-se-orange mb-5" />
          <p className="font-display font-bold text-[24px] md:text-[28px] text-se-orange leading-[1.2]">
            Ma méthode est différente.
          </p>
        </FadeUp>

        {/* Texte méthode à gauche, encadré à droite — alignés en haut */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <FadeUp delay={0.25} className="flex-1 min-w-0">
            <div className="font-body text-[17px] leading-[1.8] text-se-navy/70">
              {methode}
            </div>
          </FadeUp>
          <FadeUp delay={0.3} className="flex-1 min-w-0">
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
