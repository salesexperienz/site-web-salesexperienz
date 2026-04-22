import NewsletterForm from './NewsletterForm'

const socials = [
  {
    name: 'LinkedIn',
    handle: '@laurentguyonvarch',
    description: "Stratégies d'automatisation et coulisses de l'agence",
    href: 'https://www.linkedin.com/in/laurentguyonvarch/',
    color: 'bg-[#0A66C2]',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: 'Sales Experienz',
    description: "Tutoriels n8n, démos d'outils IA et cas clients",
    href: 'https://www.youtube.com/@salesexperienz',
    color: 'bg-[#FF0000]',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
      </svg>
    ),
  },
  {
    name: 'Skool',
    handle: 'SalesXperienz System',
    description: "La communauté gratuite pour obtenir des ressources sur des techniques rôdées en stratégie commerciale, des workflows n8n à disposition et des skill Claude IA à télécharger",
    href: 'https://www.skool.com/potentiel-commercial-8000/about',
    color: 'bg-[#00B4D8]',
    icon: (
      <img
        src="/Modele-photo-Laurent.jpg"
        alt="Laurent Guyonvarch"
        className="w-full h-full object-cover rounded-xl"
      />
    ),
  },
]

export default function SocialBlock() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #899bc4 0%, #6b7fa8 100%)' }}
    >
      {/* Lueurs décoratives */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(17,28,61,0.25),transparent_60%)] pointer-events-none" />

      {/* Liseré blanc traversant */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" style={{ top: '52%' }} />

      <div className="relative max-w-container mx-auto px-6 py-16">
        {/* En-tête */}
        <div className="relative text-center mb-12">

<span className="inline-block text-white/60 text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
            Restons connectés
          </span>
          <h3
            className="font-display font-extrabold text-[28px] md:text-[36px] text-white leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35), 0 -1px 1px rgba(255,255,255,0.12), 2px 2px 0 rgba(0,0,0,0.15)' }}
          >
            Suivez Sales Experienz
          </h3>
          <p className="text-white/75 text-[15px] mt-3 max-w-md mx-auto leading-relaxed">
            Conseils pratiques, outils et coulisses — chaque semaine.
          </p>
        </div>

        {/* Cartes réseaux */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-5 p-8 rounded-2xl bg-white border border-white/60 shadow-[0_2px_16px_rgba(17,28,61,0.14)] hover:shadow-[0_10px_32px_rgba(17,28,61,0.24)] hover:-translate-y-1.5 transition-all duration-200"
            >
              {/* Icône + nom sur la même ligne */}
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl overflow-hidden flex items-center justify-center text-white flex-shrink-0 ${s.color}`}>
                  {s.icon}
                </div>
                <div>
                  <p className="font-display font-bold text-[22px] text-se-navy group-hover:text-se-orange transition-colors duration-200">
                    {s.name}
                  </p>
                  <p className="text-[#6b7fa8] text-[15px] font-semibold">{s.handle}</p>
                </div>
              </div>
              {/* Description séparée en bas */}
              <p className="text-gray-500 text-[13px] leading-relaxed">{s.description}</p>
            </a>
          ))}
        </div>

        {/* Formulaire newsletter */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="rounded-2xl px-8 py-10" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.22)' }}>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  )
}
