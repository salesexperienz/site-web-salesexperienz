'use client'
import FadeUp from './FadeUp'

interface DifferentiatorItem {
  num: string
  title: string
  text: string
}

interface LocalDifferentiatorsProps {
  ville?: string
  items: DifferentiatorItem[]
}

export default function LocalDifferentiators({ ville, items }: LocalDifferentiatorsProps) {
  return (
    <section className="bg-white py-[80px] lg:py-[120px]">
      <div className="max-w-container mx-auto px-6 lg:px-20">

        {/* Header centré */}
        <FadeUp className="mb-20 max-w-2xl mx-auto text-center">
          <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-4">
            MON APPROCHE
          </p>
          <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.15] text-se-navy">
            Ce qui me rend différent des autres experts automatisation commerciale{ville ? ` à ${ville}` : ''}
          </h2>
        </FadeUp>

        {/* Timeline */}
        <div className="relative">

          {/* Ligne verticale centrale — desktop uniquement */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]"
            style={{ background: 'linear-gradient(180deg, #E8621A 0%, #4ABFB0 100%)' }} />

          <div className="flex flex-col gap-8 lg:gap-0">
            {items.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <FadeUp key={i} delay={i * 0.08}>
                  {/* Rangée : contenu gauche | point central | contenu droit */}
                  <div className="flex items-start lg:items-center">

                    {/* Côté gauche */}
                    <div className={`flex-1 min-w-0 lg:py-5 ${isLeft ? 'lg:pr-16' : 'lg:pr-16 hidden lg:block'}`}>
                      {isLeft && (
                        <div className="relative">
                          {/* Numéro watermark */}
                          <span className="hidden lg:block absolute -top-4 right-0 font-display font-bold leading-none select-none pointer-events-none"
                            style={{ fontSize: '120px', color: 'rgba(14,27,62,0.04)' }}>
                            {item.num}
                          </span>
                          <div className="relative z-10 lg:text-right">
                            <span className="font-display font-bold text-[42px] leading-none text-se-orange/20 select-none block mb-3">
                              {item.num}
                            </span>
                            <h3 className="font-display font-bold text-[20px] text-se-navy leading-[1.3] mb-3">
                              {item.title}
                            </h3>
                            <p className="font-body text-[16px] text-se-navy/70 leading-[1.7]">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Point central */}
                    <div className="hidden lg:flex flex-shrink-0 w-14 items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-se-orange border-[3px] border-white shadow-[0_0_0_3px_#E8621A] z-10" />
                    </div>

                    {/* Côté droit */}
                    <div className={`flex-1 min-w-0 lg:py-5 ${!isLeft ? 'lg:pl-16' : 'lg:pl-16 hidden lg:block'}`}>
                      {!isLeft && (
                        <div className="relative">
                          {/* Numéro watermark */}
                          <span className="hidden lg:block absolute -top-4 left-0 font-display font-bold leading-none select-none pointer-events-none"
                            style={{ fontSize: '120px', color: 'rgba(14,27,62,0.04)' }}>
                            {item.num}
                          </span>
                          <div className="relative z-10">
                            <span className="font-display font-bold text-[42px] leading-none text-se-orange/20 select-none block mb-3">
                              {item.num}
                            </span>
                            <h3 className="font-display font-bold text-[20px] text-se-navy leading-[1.3] mb-3">
                              {item.title}
                            </h3>
                            <p className="font-body text-[16px] text-se-navy/70 leading-[1.7]">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Séparateur mobile */}
                  <div className="lg:hidden h-px bg-se-navy/10 mt-10" />

                </FadeUp>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
