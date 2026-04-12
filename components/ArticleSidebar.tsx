'use client'

import { useEffect, useRef, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface Props {
  toc: TocItem[]
  heroId?: string   // id de la section hero pour déclencher le sticky
}

// ─── Agenda Brevo ─────────────────────────────────────────────────────────────
function AgendaCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.07] bg-se-card">
      <div className="px-5 pt-5 pb-4 border-b border-white/[0.06]">
        <span className="text-se-teal text-[10px] font-bold uppercase tracking-[0.15em]">
          Échange gratuit
        </span>
        <h3 className="font-display font-bold text-[16px] text-white mt-1 leading-snug">
          Réservez 45 min avec Laurent
        </h3>
        <p className="text-se-muted text-[13px] mt-1 leading-relaxed">
          On analyse ensemble vos opportunités d'automatisation — sans engagement.
        </p>
      </div>

      {/* iFrame Brevo — hauteur étendue pour ne pas tronquer */}
      <div style={{ height: 640 }}>
        <iframe
          width="100%"
          height="640"
          src="https://meet.brevo.com/laurent-guyonvarch/borderless?l=rendez-vous-decouverte"
          title="Réserver un rendez-vous — Sales Experienz"
          loading="lazy"
          style={{ display: 'block', border: 'none', background: '#fff' }}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 px-4 py-3 border-t border-white/[0.06]">
        {['45 min', '100% gratuit', 'Sans engagement', 'En visio'].map((item) => (
          <span key={item} className="flex items-center gap-1 text-[11px] text-se-muted">
            <span className="text-se-teal text-[10px]">✓</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Table des matières ───────────────────────────────────────────────────────
function TableOfContents({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (toc.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id) })
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    )
    toc.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [toc])

  if (toc.length === 0) return null

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-se-card px-5 py-5">
      <span className="text-se-teal text-[10px] font-bold uppercase tracking-[0.15em] block mb-3">
        Sommaire
      </span>
      <nav>
        <ul className="space-y-1">
          {toc.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`block text-[13px] leading-snug py-1 transition-colors duration-150 ${
                  item.level === 2 ? 'pl-0' : 'pl-3'
                } ${
                  activeId === item.id
                    ? 'text-se-orange font-semibold'
                    : 'text-se-muted hover:text-white'
                }`}
              >
                {item.level === 3 && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-se-muted/40 mr-2 mb-0.5 align-middle" />
                )}
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

// ─── Mini newsletter ──────────────────────────────────────────────────────────
function NewsletterCard() {
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus('ok')
      setEmail('')
    } catch {
      setStatus('err')
    }
  }

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-se-card px-5 py-5">
      <span className="text-se-teal text-[10px] font-bold uppercase tracking-[0.15em] block mb-2">
        Newsletter
      </span>
      <h3 className="font-display font-bold text-[15px] text-white leading-snug mb-1">
        Recevez nos prochains articles
      </h3>
      <p className="text-se-muted text-[12px] mb-4 leading-relaxed">
        Automatisation, IA, prospection — directement dans votre boîte mail.
      </p>
      {status === 'ok' ? (
        <p className="text-se-teal text-[13px] font-semibold text-center py-2">✓ Vous êtes inscrit !</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            required
            className="w-full rounded-lg px-3 py-2.5 text-[13px] bg-se-navy border border-white/[0.10] text-white placeholder:text-se-muted/60 focus:outline-none focus:border-se-orange/50 transition-colors"
          />
          <button
            type="submit"
            className="w-full rounded-lg px-4 py-2.5 text-[13px] font-semibold bg-se-orange text-white hover:bg-se-orange-h transition-colors duration-200"
          >
            Je m'inscris
          </button>
          {status === 'err' && (
            <p className="text-red-400 text-[11px] text-center">Une erreur est survenue.</p>
          )}
          <p className="text-se-muted/50 text-[11px] text-center">Gratuit · Désinscription facile</p>
        </form>
      )}
    </div>
  )
}

// ─── Export principal ─────────────────────────────────────────────────────────
export default function ArticleSidebar({ toc, heroId = 'article-hero' }: Props) {
  const [isSticky, setIsSticky] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Déclenche le sticky UNIQUEMENT après que le hero a disparu du viewport
  useEffect(() => {
    const hero = document.getElementById(heroId)
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [heroId])

  return (
    <aside className="hidden lg:block w-[320px] flex-shrink-0 self-start">
      <div
        ref={sidebarRef}
        className={`flex flex-col gap-6 transition-all duration-300 ${
          isSticky ? 'sticky top-28' : 'relative'
        }`}
      >
        <AgendaCard />
        <TableOfContents toc={toc} />
        <NewsletterCard />
      </div>
    </aside>
  )
}
