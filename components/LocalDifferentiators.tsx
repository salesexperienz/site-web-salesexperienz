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
    <section className="relative bg-[#162248] py-[80px] lg:py-[120px]">
      <div className="absolute top-0 left-0 right-0 h-[4px]" style={{ background: 'linear-gradient(90deg, #E8621A 0%, #4ABFB0 100%)' }} />
      <div className="max-w-container mx-auto px-6 lg:px-20">

        <FadeUp className="mb-14 max-w-2xl">
          <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-4">
            MON APPROCHE
          </p>
          <h2 className="font-display font-bold text-[28px] md:text-[42px] leading-[1.15] text-white">
            Ce qui me rend différent des autres experts automatisation commerciale{ville ? ` à ${ville}` : ''}
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <FadeUp key={i} delay={i * 0.08}>
              <div className="group bg-white rounded-2xl p-7 h-full flex flex-col gap-4 border border-se-navy/[0.07] hover:border-se-orange/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(232,98,26,0.10)]">
                <span className="font-display font-bold text-[52px] leading-none select-none" style={{ color: '#e86119' }}>
                  {item.num}
                </span>
                <h3 className="font-display font-bold text-[18px] text-se-navy leading-[1.3]">
                  {item.title}
                </h3>
                <p className="font-body text-[15px] text-se-navy/55 leading-[1.65]">
                  {item.text}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  )
}
