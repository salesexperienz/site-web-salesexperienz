'use client'
import FadeUp from './FadeUp'

const logos = [
  { src: '/claude_logo.jpeg',        alt: 'Claude AI' },
  { src: '/logo-n8n.png',            alt: 'n8n' },
  { src: '/Chat GPT.png',            alt: 'ChatGPT' },
  { src: '/Google_Gemini_logo.png',  alt: 'Gemini' },
  { src: '/Perplexity.png',          alt: 'Perplexity' },
  { src: '/Vercel.png',              alt: 'Vercel' },
  { src: '/Next.js.png',             alt: 'Next.js' },
  { src: '/Remotion.png',            alt: 'Remotion' },
  { src: '/Wordpress.png',           alt: 'WordPress' },
  { src: '/Brevo.png',               alt: 'Brevo' },
  { src: '/Data for SEO.png',        alt: 'DataForSEO' },
  { src: '/Unipile.png',             alt: 'Unipile' },
  { src: '/Apify.png',               alt: 'Apify' },
]

export default function AboutSete() {
  return (
    <section className="py-[80px] lg:py-[120px]" style={{ background: '#eaf4ec' }}>
      <div className="max-w-container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Colonne gauche — Photo ── */}
          <FadeUp>
            <div
              className="w-full max-w-[400px] mx-auto rounded-2xl overflow-hidden"
              style={{
                height: '480px',
                border: '1.5px solid rgba(0,0,0,0.08)',
                boxShadow: '0 8px 32px rgba(13,27,62,0.10)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Modele-photo-Laurent.jpg"
                alt="Photo de Laurent Guyonvarch"
                className="w-full h-full object-cover object-top"
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
              <p className="font-body text-[17px] text-se-orange mt-2">
                Consultant en performance commerciale &amp; automatisation IA · Sète, Hérault (34)
              </p>
            </FadeUp>

            {/* Badge géolocalisation */}
            <FadeUp delay={0.13}>
              <div
                className="inline-flex items-center gap-2.5 rounded-full px-4 py-2.5"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(74,191,176,0.35)',
                  boxShadow: '0 2px 8px rgba(13,27,62,0.06)',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full bg-se-teal flex-shrink-0 animate-pulse"
                  style={{ boxShadow: '0 0 6px rgba(74,191,176,0.8)' }}
                />
                <span className="font-body text-[13px] text-se-navy/60">
                  Basé à Sète (Hérault, 34) · Interventions France entière en visio
                </span>
              </div>
            </FadeUp>

            {/* Bio */}
            <FadeUp delay={0.16}>
              <div className="font-body text-[17px] leading-[1.7] text-se-navy/60 flex flex-col gap-4">
                <p>
                  Basé à Sète depuis plusieurs années, j&apos;accompagne des dirigeants de PME et TPE
                  — localement en Occitanie et dans toute la France en visio — depuis plus de 20 ans
                  dans le conseil commercial.
                </p>
                <p>
                  À partir de 2023, j&apos;ai intégré l&apos;automatisation IA dans mes missions, parce que j&apos;en
                  avais besoin moi-même pour développer SalesExperienz. Aujourd&apos;hui, je construis
                  des écosystèmes n8n que je teste d&apos;abord sur ma propre structure avant de les déployer
                  chez mes clients.
                </p>
                <p className="text-se-navy font-medium">
                  Je vous aide à automatiser des tâches et des process qui vous font perdre du temps, et à accélérer la croissance de votre entreprise !
                </p>
              </div>
            </FadeUp>

          </div>
        </div>

      </div>
    </section>
  )
}
