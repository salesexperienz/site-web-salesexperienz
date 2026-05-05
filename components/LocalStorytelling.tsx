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
        <FadeUp delay={0.08} className="flex lg:hidden flex-col items-center mb-8 gap-4">
          <Image
            src="/LaurentG.png"
            alt="Laurent Guyonvarch — Sales Experienz"
            width={200}
            height={200}
            className="rounded-2xl shadow-xl"
          />
          <p className="font-body text-[13px] text-se-navy/60 text-center">N&rsquo;hésitez pas à me contacter directement&nbsp;!</p>
          <a
            href="tel:+33988028649"
            className="inline-flex items-center gap-2 bg-se-navy text-white rounded-full px-5 py-2.5 text-[14px] font-medium font-body hover:bg-se-navy/80 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            09 88 02 86 49
          </a>
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
          <FadeUp delay={0.1} className="hidden lg:flex flex-col flex-shrink-0 items-center gap-4">
            <Image
              src="/LaurentG.png"
              alt="Laurent Guyonvarch — Sales Experienz"
              width={300}
              height={300}
              className="rounded-2xl shadow-xl"
            />
            <a
              href="tel:+33988028649"
              className="inline-flex items-center gap-2 bg-se-navy text-white rounded-full px-5 py-2.5 text-[14px] font-medium font-body hover:bg-se-navy/80 transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              09 88 02 86 49
            </a>
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
