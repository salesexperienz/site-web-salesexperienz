'use client'
import FadeUp from './FadeUp'

interface LocalCase {
  sector: string
  location: string
  result: string
  detail: string
}

interface LocalCasesProps {
  cases: { case1: LocalCase; case2: LocalCase }
  ville?: string
}

export default function LocalCases({ cases, ville }: LocalCasesProps) {
  const caseList = [cases.case1, cases.case2]

  return (
    <section className="py-[80px] lg:py-[120px]" style={{ background: '#162248' }}>
      <div className="max-w-container mx-auto px-6 lg:px-20">

        <FadeUp className="mb-14">
          <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-3">
            CAS CLIENTS
          </p>
          <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.2] text-white">
            Ils ont automatisé leur pipeline{ville ? ` à ${ville}` : ''}
          </h2>
          <p className="font-body text-[16px] text-se-muted mt-3">
            Résultats anonymisés — contextes réels
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseList.map((c, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="border-l-4 border-se-orange bg-[#1E2D5A] rounded-lg p-6 flex flex-col gap-3">
                <span className="font-body text-[12px] font-semibold uppercase tracking-[0.15em] text-se-teal">
                  {c.sector}
                </span>
                <p className="font-display font-bold text-[26px] md:text-[32px] text-se-orange leading-[1.2]">
                  {c.result}
                </p>
                <p className="font-body text-[15px] text-white/80 leading-[1.6]">
                  {c.detail}
                </p>
                <p className="font-body text-[13px] text-se-muted mt-1">
                  📍 {c.location}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  )
}
