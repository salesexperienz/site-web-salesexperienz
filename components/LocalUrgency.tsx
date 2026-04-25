'use client'
import FadeUp from './FadeUp'

interface LocalUrgencyProps {
  ville?: string
}

const points = [
  {
    num: '01',
    label: 'Concurrence',
    title: 'Vos concurrents avancent pendant ce temps',
    body: "Des équipes commerciales automatisent déjà leur prospection et ferment des deals. Chaque mois sans automatisation est un mois d'avance offert à vos concurrents — sans le savoir.",
    note: '→ un mois de retard = un mois d\'avance pour eux',
  },
  {
    num: '02',
    label: 'Temps englouti',
    title: '60 % du temps commercial perdu à prospecter',
    body: "La prospection manuelle mobilise la majeure partie de vos ressources commerciales. Ces heures pourraient aller à la relation client, à la négociation, à la stratégie — là où elles créent vraiment de la valeur.",
    note: '→ chaque heure prospectée = une heure non-stratégique',
  },
  {
    num: '03',
    label: 'Pipeline qui fuit',
    title: 'Des opportunités perdues sans ligne de facture',
    body: "Un pipeline mal alimenté coûte plus cher que l'automatisation elle-même. Les opportunités manquées ne s'affichent pas dans un tableau de bord — mais elles s'accumulent chaque trimestre.",
    note: '→ ce coût invisible grossit en silence',
  },
]

export default function LocalUrgency({ ville }: LocalUrgencyProps) {
  return (
    <section className="py-[80px] lg:py-[120px] overflow-hidden" style={{ background: '#f7f8fb' }}>
      <div className="max-w-container mx-auto px-6 lg:px-20">

        {/* Header */}
        <FadeUp className="mb-16 max-w-2xl">
          <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-4">
            CHAQUE MOIS QUI PASSE
          </p>
          <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.15] text-se-navy">
            Ce que la prospection manuelle vous coûte vraiment{ville ? ` à ${ville}` : ''}
          </h2>
          <p className="font-body text-[17px] text-se-navy/55 mt-5 leading-[1.7]">
            Les coûts visibles sont faciles à calculer. Les coûts cachés de l'inertie, beaucoup moins.
          </p>
        </FadeUp>

        {/* Cards effet post-it / croquis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {points.map((p, i) => {
            const rotations = ['-rotate-[1.2deg]', 'rotate-[1deg]', '-rotate-[0.8deg]']
            return (
              <FadeUp key={i} delay={i * 0.12}>
                <div
                  className={`relative bg-white rounded-2xl p-7 flex flex-col gap-4 h-full ${rotations[i]} hover:rotate-0 transition-transform duration-500`}
                  style={{
                    boxShadow: '0 2px 8px rgba(14,27,62,0.06), 0 16px 40px rgba(14,27,62,0.09)',
                  }}
                >
                  {/* Coin plié */}
                  <div
                    className="absolute top-0 right-0"
                    style={{
                      width: 0,
                      height: 0,
                      borderStyle: 'solid',
                      borderWidth: '0 28px 28px 0',
                      borderColor: 'transparent #f7f8fb transparent transparent',
                    }}
                  />

                  {/* Numéro Caveat */}
                  <span className="font-handwriting font-bold text-[80px] leading-none select-none"
                    style={{ color: '#e76219' }}>
                    {p.num}
                  </span>

                  {/* Label */}
                  <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-se-orange -mt-2">
                    {p.label}
                  </p>

                  {/* Titre */}
                  <h3 className="font-display font-bold text-[19px] text-se-navy leading-[1.3]">
                    {p.title}
                  </h3>

                  {/* Corps */}
                  <p className="font-body text-[15px] text-se-navy/60 leading-[1.65]">
                    {p.body}
                  </p>

                  {/* Annotation manuscrite Caveat */}
                  <div className="mt-auto pt-5 border-t border-dashed border-se-navy/[0.12]">
                    <p className="font-handwriting text-[19px] text-se-teal leading-[1.4]">
                      {p.note}
                    </p>
                  </div>
                </div>
              </FadeUp>
            )
          })}
        </div>

        {/* Conclusion manuscrite */}
        <FadeUp delay={0.45} className="text-center">
          <p className="font-handwriting text-[28px] md:text-[38px] text-se-navy/65 leading-[1.4] max-w-2xl mx-auto">
            Automatiser maintenant{ville ? ` à ${ville}` : ''}, c'est reprendre l'avantage — durablement.
          </p>
          <div
            className="w-20 h-[3px] mx-auto mt-5"
            style={{ background: 'linear-gradient(90deg, #E8621A, #4ABFB0)' }}
          />
        </FadeUp>

      </div>
    </section>
  )
}
