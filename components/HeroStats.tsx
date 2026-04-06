'use client'
import CountUp from './CountUp'

const pillStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.08)',
}

export default function HeroStats() {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {/* 3 à 15 RDV/mois */}
      <div className="flex flex-col items-center px-5 py-3 rounded-xl" style={pillStyle}>
        <span className="font-display font-bold text-[22px] text-se-orange leading-tight">
          3 à <CountUp end={15} duration={1200} />
        </span>
        <span className="font-body text-[12px] text-se-muted mt-0.5">RDV qualifiés/mois</span>
      </div>

      {/* 15 jours */}
      <div className="flex flex-col items-center px-5 py-3 rounded-xl" style={pillStyle}>
        <span className="font-display font-bold text-[22px] text-se-orange leading-tight">
          <CountUp end={15} duration={1000} /> jours
        </span>
        <span className="font-body text-[12px] text-se-muted mt-0.5">Déploiement clé en main</span>
      </div>

      {/* < 2h/sem */}
      <div className="flex flex-col items-center px-5 py-3 rounded-xl" style={pillStyle}>
        <span className="font-display font-bold text-[22px] text-se-orange leading-tight">
          {'< '}<CountUp end={2} duration={800} />h/sem
        </span>
        <span className="font-body text-[12px] text-se-muted mt-0.5">Supervision requise</span>
      </div>
    </div>
  )
}
