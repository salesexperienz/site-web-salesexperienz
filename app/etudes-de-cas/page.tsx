import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Études de cas — Résultats concrets · SalesExperienz',
  description:
    'Découvrez comment SalesExperienz a aidé ses clients à automatiser leur croissance : SEO automatisé, pipeline de leads, prospection IA. Résultats mesurables et reproductibles.',
  alternates: { canonical: 'https://www.salesexperienz.fr/etudes-de-cas' },
}

const cases = [
  {
    href: '/etudes-de-cas/ambassimmo',
    tag: 'SEO Automatisé',
    title: 'Ambassimmo — #1 Google "Ambassadeur immobilier"',
    description:
      'De zéro contenu à la première position Google en 3 semaines. Système n8n · GPT-4o · Claude AI pour 30 articles/mois en pilote automatique.',
    metrics: ['#1 sur "ambassadeur immobilier"', '30 articles/mois', '3 semaines de déploiement'],
  },
  {
    href: '/etudes-de-cas/ambassimmo-leads',
    tag: 'Pipeline Leads',
    title: 'Ambassimmo — Pipeline de leads automatisé',
    description:
      'Mise en place d\'un système de capture et qualification des leads vendeurs immobiliers, entièrement automatisé avec n8n et un CRM sur mesure.',
    metrics: ['Qualification automatique', 'Nurturing IA', 'Pipeline temps réel'],
  },
]

export default function EtudesDeCasPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#0A1530' }}>
        <section className="max-w-container mx-auto px-6 lg:px-20 pt-24 pb-20">

          <p className="font-body text-[13px] text-se-accent uppercase tracking-widest mb-4">
            Études de cas
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Des résultats concrets,<br />pas des promesses
          </h1>
          <p className="font-body text-[17px] text-se-muted max-w-2xl mb-16">
            Chaque étude de cas documente un système déployé, avec les chiffres réels et la stack technique utilisée.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {cases.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group block rounded-2xl border border-white/10 bg-white/5 p-8 hover:border-se-accent/40 hover:bg-white/8 transition-all duration-300"
              >
                <span className="inline-block font-body text-[12px] text-se-accent uppercase tracking-widest mb-4 px-3 py-1 rounded-full border border-se-accent/30 bg-se-accent/10">
                  {c.tag}
                </span>
                <h2 className="font-display text-xl font-bold text-white mb-3 group-hover:text-se-accent transition-colors">
                  {c.title}
                </h2>
                <p className="font-body text-[15px] text-se-muted mb-6 leading-relaxed">
                  {c.description}
                </p>
                <ul className="flex flex-col gap-2">
                  {c.metrics.map((m) => (
                    <li key={m} className="flex items-center gap-2 font-body text-[14px] text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-se-accent flex-shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>

        </section>
      </main>
      <Footer />
    </>
  )
}
