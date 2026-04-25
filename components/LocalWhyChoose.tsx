'use client'
import FadeUp from './FadeUp'

interface MiniCase {
  sector: string
  location: string
  result: string
  detail: string
}

interface VisionPoint {
  num: string
  text: React.ReactNode
}

interface LocalWhyChooseProps {
  ville?: string
  pains: string[]
  response: string
  case1: MiniCase
  case2: MiniCase
  vision: VisionPoint[]
}

export default function LocalWhyChoose({ ville, pains, response, case1, case2, vision }: LocalWhyChooseProps) {
  return (
    <section className="bg-se-navy py-[80px] lg:py-[120px]">
      <div className="max-w-container mx-auto px-6 lg:px-20">

        <FadeUp className="mb-14 max-w-2xl">
          <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-4">
            APPROCHE · RÉSULTATS
          </p>
          <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.15] text-white">
            Pourquoi choisir un expert automatisation commerciale orienté résultats{ville ? ` à ${ville}` : ''}&nbsp;?
          </h2>
        </FadeUp>

        {/* Bloc douleurs */}
        <FadeUp delay={0.1} className="mb-12 max-w-2xl">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-7">
            Vous avez peut-être déjà vécu ça
          </p>
          <ul className="flex flex-col">
            {pains.map((p, i) => (
              <li
                key={i}
                className="flex items-start gap-5 py-5 border-b border-white/[0.08] last:border-0"
              >
                <span
                  className="font-display font-bold text-[28px] leading-none flex-shrink-0 mt-0.5 select-none"
                  style={{ color: '#e76219' }}
                >
                  ×
                </span>
                <span className="font-body text-[17px] leading-[1.7] text-white/80 font-medium">{p}</span>
              </li>
            ))}
          </ul>
        </FadeUp>

        {/* Réponse */}
        <FadeUp delay={0.15} className="mb-14 max-w-2xl">
          <p className="font-body text-[17px] leading-[1.8] text-white/70">
            {response}
          </p>
        </FadeUp>

        {/* Exemples concrets */}
        <FadeUp delay={0.2} className="mb-14">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-se-teal mb-6">
            Exemples concrets{ville ? ` à ${ville}` : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[case1, case2].map((c, i) => (
              <div
                key={i}
                className="relative border-l-4 border-se-orange bg-[#162248] rounded-xl p-6 flex flex-col gap-3 overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, #E8621A 0%, transparent 70%)' }}
                />
                <span className="font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-se-teal">
                  {c.sector}
                </span>
                <p className="font-display font-bold text-[28px] text-se-orange leading-[1.15]">
                  {c.result}
                </p>
                <p className="font-body text-[15px] text-white/70 leading-[1.6]">
                  {c.detail}
                </p>
                <p className="font-body text-[13px] text-se-muted mt-1">
                  📍 {c.location}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Vision */}
        <FadeUp delay={0.25}>
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">

            {/* Flèche à gauche */}
            <div className="flex-shrink-0 flex flex-col items-center md:items-start gap-4 md:pb-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/fleche.png"
                alt=""
                aria-hidden="true"
                className="w-[180px] md:w-[220px] opacity-90 rotate-0 md:rotate-0 hidden md:block"
              />
            </div>

            {/* Encadré à droite */}
            <div className="bg-white rounded-2xl p-8 flex-1">
              <p className="font-display font-bold text-[20px] md:text-[24px] text-se-teal mb-8 leading-[1.2]">
                Une vision entrepreneuriale de l'automatisation
              </p>
              <div className="flex flex-col gap-6">
                {vision.map((v, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <span
                      className="font-display font-bold text-[44px] leading-none w-14 flex-shrink-0 select-none"
                      style={{ color: '#e76219' }}
                    >
                      {v.num}
                    </span>
                    <p className="font-body text-[16px] text-se-navy/75 leading-[1.7] pt-2">
                      {v.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </FadeUp>

      </div>
    </section>
  )
}
