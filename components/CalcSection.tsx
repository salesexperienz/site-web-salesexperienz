import FadeUp from '@/components/FadeUp'
import CalculateurROI from '@/components/CalculateurROI'

export default function CalcSection() {
  return (
    <section className="py-20 px-6 lg:px-20" style={{ background: '#0D1B3E' }}>
      <div className="max-w-container mx-auto">
        <FadeUp className="text-center mb-10">
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-se-orange mb-4">
            Outil gratuit
          </span>
          <h2 className="font-display font-black text-3xl md:text-4xl text-white tracking-tight mb-4">
            Combien vous coûte vraiment<br className="hidden md:block" />
            {' '}<span className="text-se-orange">le travail manuel ?</span>
          </h2>
          <p className="font-body text-[15px] text-se-muted max-w-xl mx-auto leading-relaxed">
            En 2 minutes, calculez le coût caché de vos tâches répétitives et votre potentiel de gain avec l&apos;automatisation.
          </p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <CalculateurROI />
        </FadeUp>
      </div>
    </section>
  )
}
