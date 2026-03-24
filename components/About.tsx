'use client'
import FadeUp from './FadeUp'

const tools = [
  'n8n', 'Claude AI', 'GPT-4o', 'Gemini', 'DataForSEO',
  'Brevo', 'WordPress', 'Vercel', 'Next.js', 'Remotion',
]

export default function About() {
  return (
    <section id="about" className="bg-white py-[80px] lg:py-[120px]">
      <div className="max-w-container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 lg:gap-16 items-start">

          {/* ── Colonne gauche — Photo ── */}
          <FadeUp>
            <div
              className="w-full max-w-[300px] mx-auto rounded-2xl overflow-hidden pt-4 px-4 pb-0"
              style={{
                background: '#D1D5DB',
                border: '1.5px solid rgba(74, 191, 176, 0.35)',
                boxShadow: '0 8px 32px rgba(13,27,62,0.10)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/portrait.png"
                alt="Laurent Guyonvarch"
                className="w-full block object-cover object-top rounded-t-xl"
                style={{ maxHeight: '380px' }}
              />
            </div>
          </FadeUp>

          {/* ── Colonne droite — Texte ── */}
          <div className="flex flex-col gap-6">
            <FadeUp delay={0.1}>
              <p className="font-body text-[12px] font-medium uppercase tracking-[0.2em] text-se-orange mb-1">
                À PROPOS
              </p>
              <h2 className="font-display font-bold text-[36px] md:text-[42px] leading-[1.2] text-se-navy">
                Laurent Guyonvarch
              </h2>
              <p className="font-body text-[18px] text-se-navy/70 mt-1">
                Consultant en stratégie commerciale &amp; automatisation IA
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="font-body text-[17px] leading-[1.7] text-se-navy/60 flex flex-col gap-4">
                <p>
                  Consultant en stratégie commerciale depuis 2003, j&apos;accompagne des entrepreneurs
                  et dirigeants de PME depuis plus de 20 ans.
                </p>
                <p>
                  Depuis 2023, je me suis spécialisé dans l&apos;automatisation IA appliquée au
                  business — en construisant des écosystèmes n8n sur mesure que j&apos;utilise
                  moi-même chaque jour pour salesexperienz.fr.
                </p>
                <p className="text-se-navy">
                  Je ne vends pas des workflows théoriques.<br />
                  Je livre des systèmes testés, documentés, qui tournent en production.
                </p>
              </div>
            </FadeUp>

            {/* Stack technique */}
            <FadeUp delay={0.2}>
              <div>
                <h4 className="font-display font-bold text-[17px] text-se-navy mb-4">
                  Stack technique maîtrisée
                </h4>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-body text-[13px] font-medium text-se-navy/70 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 hover:border-se-teal/40 hover:text-se-navy transition-colors duration-200"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  )
}
