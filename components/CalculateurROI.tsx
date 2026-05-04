'use client'
import { useState, useEffect, useRef } from 'react'
import { DISCOVERY_URL } from '@/lib/constants'

// ─── Types ────────────────────────────────────────────────────────────────────
type Domain = 'prospection' | 'contenu' | 'admin' | 'reporting' | 'onboarding' | 'crm' | 'conversion' | 'veille'
type ErrorRate = 'faible' | 'moyen' | 'eleve'
type BlockRate = 'non' | 'parfois' | 'oui'
type TeamSize = 'solo' | 'petite' | 'moyenne' | 'grande'

// ─── Data ─────────────────────────────────────────────────────────────────────
const DOMAINS: { key: Domain; icon: string; name: string; desc: string }[] = [
  { key: 'prospection', icon: '◎', name: 'Prospection',    desc: 'Email, LinkedIn, relances' },
  { key: 'contenu',     icon: '✦', name: 'Contenu & SEO',  desc: 'Blog, posts, vidéos' },
  { key: 'admin',       icon: '◻', name: 'Administratif',  desc: 'Factures, contrats' },
  { key: 'reporting',   icon: '▦', name: 'Reporting',      desc: 'KPIs, tableaux de bord' },
  { key: 'onboarding',  icon: '→', name: 'Onboarding',     desc: 'Accueil, documents' },
  { key: 'crm',         icon: '◈', name: 'Relation client',desc: 'Nurturing, support' },
  { key: 'conversion',  icon: '⚡', name: 'Acquisition',   desc: 'Scoring, routing leads' },
  { key: 'veille',      icon: '⊕', name: 'Veille marché',  desc: 'Alertes, synthèses' },
]

const WEIGHTS: Record<Domain, number> = {
  prospection: 0.22, contenu: 0.18, admin: 0.15, reporting: 0.12,
  onboarding: 0.10,  crm: 0.10,     conversion: 0.08, veille: 0.05,
}

const LABELS: Record<Domain, string> = {
  prospection: 'Prospection', contenu: 'Contenu & SEO', admin: 'Administratif',
  reporting: 'Reporting', onboarding: 'Onboarding', crm: 'Relation client',
  conversion: 'Acquisition', veille: 'Veille marché',
}

const INVEST_AN = 500 * 12
const TAUX_AUTO = 0.75

// ─── Calc logic ──────────────────────────────────────────────────────────────
function calcROI(heures: number, tarif: number, collabs: number, erreur: ErrorRate, blocage: BlockRate, domains: Domain[]) {
  const hSem = heures * collabs
  const hAn  = hSem * 47
  const coutBrut = hAn * tarif
  const errMult = ({ faible: 0, moyen: 0.08, eleve: 0.18 } as const)[erreur]
  const blkMult = ({ non: 0, parfois: 0.07, oui: 0.15 } as const)[blocage]
  const coutTotal  = Math.round(coutBrut * (1 + errMult + blkMult))
  const gainPartiel = Math.round(coutTotal * 0.50)
  const gainFull    = Math.round(coutTotal * TAUX_AUTO)
  const joursAn     = Math.round(hAn / 7)
  const roi1 = INVEST_AN > 0 ? Math.round((gainPartiel / INVEST_AN) * 10) / 10 : Infinity
  const roi2 = INVEST_AN > 0 ? Math.round((gainFull    / INVEST_AN) * 10) / 10 : Infinity
  const score = domains.length
    + ({ faible: 0, moyen: 1, eleve: 3 } as const)[erreur]
    + ({ non: 0, parfois: 1, oui: 3 } as const)[blocage]
    + (hSem > 15 ? 3 : hSem > 8 ? 1 : 0)
  return { hAn, hSem, coutTotal, joursAn, gainPartiel, gainFull, roi1, roi2, score }
}

function fmt(n: number) { return n.toLocaleString('fr-FR') }
function pct(value: number, min: number, max: number) { return ((value - min) / (max - min)) * 100 }

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#E8621A', marginBottom: 14, marginTop: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ display: 'block', width: 3, height: 13, background: '#E8621A', borderRadius: 2, flexShrink: 0 }} />
      {children}
    </div>
  )
}

function SliderRow({ label, value, min, max, step, displayVal, onChange }: {
  label: string; value: number; min: number; max: number; step: number; displayVal: string
  onChange: (v: number) => void
}) {
  const p = pct(value, min, max)
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: '#0D1B3E', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#E8621A', background: 'rgba(232,98,26,0.09)', padding: '3px 10px', borderRadius: 9999 }}>{displayVal}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        className="calc-range"
        style={{ '--pct': `${p}%` } as React.CSSProperties}
        onChange={e => onChange(parseInt(e.target.value))}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(13,27,62,0.5)', marginTop: 5 }}>
        <span>{min}{label.includes('€') ? ' €' : label.includes('Heure') ? 'h' : ''}</span>
        <span>{max}{label.includes('€') ? ' €' : label.includes('Heure') ? 'h' : ''}</span>
      </div>
    </div>
  )
}

function ToggleGroup<T extends string>({ label, options, value, onChange }: {
  label: string; options: { value: T; label: string }[]; value: T; onChange: (v: T) => void
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 12, color: 'rgba(13,27,62,0.5)', marginBottom: 7 }}>{label}</div>
      <div style={{ display: 'flex', gap: 6 }}>
        {options.map(opt => (
          <button key={opt.value} onClick={() => onChange(opt.value)}
            style={{
              flex: 1, padding: '8px 4px', fontSize: 12, fontWeight: opt.value === value ? 600 : 500,
              fontFamily: 'var(--font-body)', textAlign: 'center', cursor: 'pointer', transition: 'all 0.15s',
              border: '1px solid', borderRadius: 8,
              borderColor: opt.value === value ? '#0D1B3E' : 'rgba(13,27,62,0.12)',
              background: opt.value === value ? '#0D1B3E' : '#fff',
              color: opt.value === value ? '#fff' : 'rgba(13,27,62,0.55)',
            }}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function NavBtns({ onBack, onNext, nextLabel = 'Continuer →', disabledNext = false }: {
  onBack?: () => void; onNext: () => void; nextLabel?: string; disabledNext?: boolean
}) {
  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 24, alignItems: 'center' }}>
      {onBack && (
        <button onClick={onBack}
          style={{ padding: '13px 16px', fontSize: 13, fontWeight: 500, color: 'rgba(13,27,62,0.5)', background: 'none', border: '1px solid rgba(13,27,62,0.12)', borderRadius: 9999, cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-body)' }}>
          ←
        </button>
      )}
      <button onClick={onNext} disabled={disabledNext}
        style={{
          flex: 1, padding: '13px 20px', fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-body)',
          background: disabledNext ? 'rgba(232,98,26,0.35)' : '#E8621A', color: '#fff',
          border: 'none', borderRadius: 9999, cursor: disabledNext ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
        {nextLabel}
      </button>
    </div>
  )
}

function RestartBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{
        display: 'block', width: '100%', marginTop: 10, padding: 11,
        fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-body)',
        color: 'rgba(13,27,62,0.7)', background: 'none', border: '1px solid rgba(13,27,62,0.15)',
        borderRadius: 9999, cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
      }}
      onMouseEnter={e => { (e.target as HTMLButtonElement).style.color = '#E8621A'; (e.target as HTMLButtonElement).style.borderColor = '#E8621A'; (e.target as HTMLButtonElement).style.background = 'rgba(232,98,26,0.05)' }}
      onMouseLeave={e => { (e.target as HTMLButtonElement).style.color = 'rgba(13,27,62,0.7)'; (e.target as HTMLButtonElement).style.borderColor = 'rgba(13,27,62,0.15)'; (e.target as HTMLButtonElement).style.background = 'none' }}>
      ↺ Recommencer une estimation
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CalculateurROI() {
  const [step, setStep]         = useState(1)
  const [domains, setDomains]   = useState<Domain[]>([])
  const [heures, setHeures]     = useState(8)
  const [tarif, setTarif]       = useState(80)
  const [collabs, setCollabs]   = useState(1)
  const [erreur, setErreur]     = useState<ErrorRate>('faible')
  const [blocage, setBlocage]   = useState<BlockRate>('non')
  const [taille, setTaille]     = useState<TeamSize>('solo')
  const [selCard, setSelCard]   = useState(0)
  const [slideIdx, setSlide]    = useState(0)
  const [nom, setNom]           = useState('')
  const [email, setEmail]       = useState('')
  const [submitting, setSubmit] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const c = calcROI(heures, tarif, collabs, erreur, blocage, domains)

  // Slideshow
  const stopSlide  = () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null } }
  const startSlide = () => { stopSlide(); timerRef.current = setInterval(() => setSlide(p => (p + 1) % 3), 6000) }

  useEffect(() => {
    if (step <= 2) startSlide()
    else stopSlide()
    return stopSlide
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  const toggleDomain = (d: Domain) =>
    setDomains(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])

  const reset = () => {
    setDomains([]); setHeures(8); setTarif(80); setCollabs(1)
    setErreur('faible'); setBlocage('non'); setTaille('solo')
    setSelCard(0); setNom(''); setEmail(''); setSubmit(false)
    setStep(1); setSlide(0)
  }

  const handleReserver = async () => {
    if (!email) { window.open(DISCOVERY_URL, '_blank'); return }
    setSubmit(true)
    try {
      await fetch('/api/calculateur-roi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          prenom: nom || undefined,
          taille,
          coutEstime: c.coutTotal,
          gainPotentiel: c.gainFull,
        }),
      })
    } catch { /* non-bloquant */ }
    window.open(DISCOVERY_URL, '_blank')
    setSubmit(false)
  }

  // Urgence label
  const urgLabel = c.score >= 8 ? 'URGENCE ÉLEVÉE' : c.score >= 4 ? 'URGENCE MODÉRÉE' : 'URGENCE FAIBLE'
  const urgColor = c.score >= 8 ? 'rgba(232,50,26,0.18)' : c.score >= 4 ? 'rgba(232,98,26,0.15)' : 'rgba(74,191,176,0.15)'
  const urgText  = c.score >= 8 ? '#ff6b6b'             : c.score >= 4 ? '#E8621A'              : '#4ABFB0'

  // ── Progress bar ──
  const ProgressDot = ({ n }: { n: number }) => (
    <div style={{
      width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 700, flexShrink: 0, transition: 'all 0.3s',
      background: step > n ? '#0D1B3E' : step === n ? '#E8621A' : 'rgba(13,27,62,0.07)',
      color: step > n || step === n ? '#fff' : 'rgba(13,27,62,0.35)',
      boxShadow: step === n ? '0 4px 12px rgba(232,98,26,0.4)' : 'none',
    }}>{n}</div>
  )
  const ProgressLine = ({ n }: { n: number }) => (
    <div style={{ flex: 1, height: 2, background: step > n ? '#0D1B3E' : 'rgba(13,27,62,0.1)', transition: 'background 0.3s' }} />
  )

  // ─── LEFT PANEL STEPS ────────────────────────────────────────────────────
  const renderStep1 = () => (
    <div>
      <SectionLabel>Domaines concernés</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 4 }}>
        {DOMAINS.map(d => {
          const sel = domains.includes(d.key)
          return (
            <button key={d.key} onClick={() => toggleDomain(d.key)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 9, padding: '12px', textAlign: 'left',
                border: `1px solid ${sel ? '#E8621A' : 'rgba(13,27,62,0.1)'}`,
                borderRadius: 12, background: sel ? 'rgba(232,98,26,0.05)' : '#fff',
                cursor: 'pointer', transition: 'all 0.15s',
              }}>
              <span style={{ fontSize: 17, color: '#4ABFB0', flexShrink: 0, marginTop: 1, width: 20, textAlign: 'center' }}>{d.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#0D1B3E', lineHeight: 1.3 }}>{d.name}</div>
                <div style={{ fontSize: 10, color: 'rgba(13,27,62,0.5)', marginTop: 2, lineHeight: 1.4 }}>{d.desc}</div>
              </div>
              <span style={{
                marginLeft: 'auto', width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                border: sel ? 'none' : '1px solid rgba(13,27,62,0.15)',
                background: sel ? '#E8621A' : 'transparent', color: sel ? '#fff' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9,
              }}>✓</span>
            </button>
          )
        })}
      </div>
      <NavBtns onNext={() => setStep(2)} nextLabel="Continuer →" disabledNext={domains.length === 0} />
    </div>
  )

  const renderStep2 = () => (
    <div>
      <SectionLabel>Volume & coût du temps</SectionLabel>
      <SliderRow label="Heures/semaine sur ces tâches" value={heures} min={1} max={40} step={1}
        displayVal={`${heures}h`} onChange={setHeures} />
      <SliderRow label="Votre coût horaire (€/h)" value={tarif} min={30} max={300} step={5}
        displayVal={`${tarif} €/h`} onChange={setTarif} />
      <SliderRow label="Collaborateurs concernés" value={collabs} min={1} max={20} step={1}
        displayVal={`${collabs} pers.`} onChange={setCollabs} />
      <SectionLabel>Contexte</SectionLabel>
      <ToggleGroup label="Taux d'erreur sur ces tâches" value={erreur}
        options={[{ value: 'faible', label: 'Faible' }, { value: 'moyen', label: 'Moyen' }, { value: 'eleve', label: 'Élevé' }]}
        onChange={setErreur} />
      <ToggleGroup label="Ces tâches bloquent d'autres priorités ?" value={blocage}
        options={[{ value: 'non', label: 'Non' }, { value: 'parfois', label: 'Parfois' }, { value: 'oui', label: 'Oui' }]}
        onChange={setBlocage} />
      <NavBtns onBack={() => setStep(1)} onNext={() => setStep(3)} nextLabel="Voir mon ROI →" />
    </div>
  )

  const renderStep3 = () => (
    <div>
      <SectionLabel>Votre diagnostic</SectionLabel>
      <p style={{ fontSize: 13, color: 'rgba(13,27,62,0.5)', lineHeight: 1.6, marginBottom: 16 }}>
        Choisissez l&apos;un des 3 scénarios à droite pour voir comment l&apos;automatisation transforme votre ROI.
      </p>
      <div style={{ background: 'rgba(232,98,26,0.06)', border: '1px solid rgba(232,98,26,0.15)', borderRadius: 12, padding: '14px 16px', marginBottom: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#E8621A', marginBottom: 8 }}>Coût caché identifié</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 800, color: '#0D1B3E', letterSpacing: '-0.02em' }}>
          {fmt(c.coutTotal)} €/an
        </div>
        <div style={{ fontSize: 12, color: 'rgba(13,27,62,0.5)', marginTop: 3 }}>
          soit ~{fmt(Math.round(c.coutTotal / 12))} €/mois — {fmt(c.hSem)}h/sem perdues
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
        {domains.map(d => (
          <span key={d} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 9999, background: 'rgba(232,98,26,0.12)', color: '#E8621A', border: '1px solid rgba(232,98,26,0.35)' }}>
            {LABELS[d]}
          </span>
        ))}
      </div>
      <NavBtns onBack={() => setStep(2)} onNext={() => setStep(4)} nextLabel="Débloquer mon plan →" />
      <RestartBtn onClick={reset} />
    </div>
  )

  const renderStep4 = () => (
    <div>
      <SectionLabel>Votre profil</SectionLabel>
      <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Votre prénom"
        style={{ width: '100%', padding: '11px 14px', fontSize: 14, fontFamily: 'var(--font-body)', border: '1px solid rgba(13,27,62,0.12)', borderRadius: 12, background: '#fff', color: '#0D1B3E', marginBottom: 10, outline: 'none' }} />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email professionnel" type="email"
        style={{ width: '100%', padding: '11px 14px', fontSize: 14, fontFamily: 'var(--font-body)', border: '1px solid rgba(13,27,62,0.12)', borderRadius: 12, background: '#fff', color: '#0D1B3E', marginBottom: 10, outline: 'none' }} />
      <ToggleGroup label="Taille de votre équipe" value={taille}
        options={[{ value: 'solo', label: 'Solo' }, { value: 'petite', label: '2–10' }, { value: 'moyenne', label: '10–50' }, { value: 'grande', label: '50+' }]}
        onChange={setTaille} />
      <div style={{ display: 'flex', gap: 10, marginTop: 24, alignItems: 'center' }}>
        <button onClick={() => setStep(3)}
          style={{ padding: '13px 16px', fontSize: 13, fontWeight: 500, color: 'rgba(13,27,62,0.5)', background: 'none', border: '1px solid rgba(13,27,62,0.12)', borderRadius: 9999, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
          ←
        </button>
        <button onClick={handleReserver} disabled={submitting}
          style={{ flex: 1, padding: '13px 20px', fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-body)', background: submitting ? 'rgba(232,98,26,0.6)' : '#E8621A', color: '#fff', border: 'none', borderRadius: 9999, cursor: submitting ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}>
          {submitting ? 'Envoi…' : 'Réserver mon audit →'}
        </button>
      </div>
      <RestartBtn onClick={reset} />
    </div>
  )

  // ─── RIGHT PANEL ─────────────────────────────────────────────────────────

  const renderSlideshow = () => (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}
      onMouseEnter={stopSlide} onMouseLeave={() => { if (step <= 2) startSlide() }}>
      <div style={{ display: 'flex', transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)', height: '100%', transform: `translateX(-${slideIdx * 100}%)` }}>

        {/* Slide 1 — domain pills */}
        <div style={{ minWidth: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 24px 16px', position: 'relative', overflow: 'hidden', background: 'radial-gradient(ellipse 120% 80% at 60% 20%, rgba(74,191,176,0.18) 0%, transparent 60%), radial-gradient(ellipse 80% 100% at 10% 80%, rgba(13,27,62,0.6) 0%, transparent 60%), #162248' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4ABFB0', marginBottom: 10 }}>Identifiez vos pertes</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', textAlign: 'center', lineHeight: 1.2, marginBottom: 18 }}>
            Où perdez-vous<br />le plus de temps ?
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%', maxWidth: 320 }}>
            {DOMAINS.map((d, i) => (
              <div key={d.key} className="calc-pill-lg calc-pill-anim"
                style={{ padding: '17px 16px', display: 'flex', alignItems: 'center', gap: 9, animationDelay: `${0.05 + i * 0.05}s` }}>
                <span style={{ color: '#4ABFB0', fontSize: 15, flexShrink: 0, width: 18, textAlign: 'center' }}>{d.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap' }}>{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Slide 2 — workflow1 */}
        <div style={{ minWidth: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '20px 0 0', position: 'relative', overflow: 'hidden', background: '#162248' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4ABFB0', marginBottom: 8 }}>Automatisation IA avec n8n</div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 20px 8px', minHeight: 0, width: '100%' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/workflow1.png" alt="Workflow automatisation n8n" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', borderRadius: 8, boxShadow: '0 6px 24px rgba(0,0,0,0.45)', display: 'block' }} />
          </div>
          <div style={{ width: '100%', padding: '10px 24px 4px', textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.3 }}>Vos workflows tournent<br />pendant que vous dormez</div>
          </div>
        </div>

        {/* Slide 3 — workflow2 */}
        <div style={{ minWidth: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '20px 0 0', position: 'relative', overflow: 'hidden', background: '#162248' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4ABFB0', marginBottom: 8 }}>CRM · Prospection · Reporting</div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 20px 8px', minHeight: 0, width: '100%' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/workflow2.png" alt="Workflow CRM Lead Generation" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', borderRadius: 8, boxShadow: '0 6px 24px rgba(0,0,0,0.45)', display: 'block' }} />
          </div>
          <div style={{ width: '100%', padding: '10px 24px 4px', textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.3 }}>Des agents IA sur mesure<br />pour votre croissance</div>
          </div>
        </div>

      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, padding: '16px 0 20px', flexShrink: 0 }}>
        {[0, 1, 2].map(i => (
          <button key={i} onClick={() => setSlide(i)}
            style={{ width: i === slideIdx ? 20 : 6, height: 6, borderRadius: 3, background: i === slideIdx ? '#E8621A' : 'rgba(255,255,255,0.18)', border: 'none', padding: 0, cursor: 'pointer', transition: 'all 0.3s' }} />
        ))}
      </div>
    </div>
  )

  const renderResults = () => {
    const urgBase = c.score >= 8 ? 'ÉLEVÉ' : c.score >= 4 ? 'MOYEN' : 'MODÉRÉ'
    const urgC = c.score >= 8 ? '#ff6b6b' : c.score >= 4 ? '#E8621A' : '#4ABFB0'
    const cards = [
      {
        title: 'Situation actuelle (sans automatisation)',
        fields: [
          { lbl: 'Coût annuel',   val: `${fmt(c.coutTotal)} €`,        color: '#fff' },
          { lbl: 'Heures perdues', val: `${fmt(Math.round(c.hAn))}h`,  color: '#fff' },
          { lbl: 'Jours perdus',  val: `${c.joursAn}j`,                color: '#fff' },
        ],
        fields2: [
          { lbl: 'En 3 ans',          val: `${fmt(Math.round(c.coutTotal * 3.3))} €`, color: '#fff' },
          { lbl: 'Urgence',           val: urgBase,                                    color: urgC },
          { lbl: 'ROI automatisation',val: '—',                                        color: '#4ABFB0' },
        ],
      },
      {
        title: 'Automatisation partielle (50%)',
        fields: [
          { lbl: 'Gain annuel',    val: `${fmt(c.gainPartiel)} €`,               color: '#4ABFB0' },
          { lbl: 'Heures libérées', val: `${fmt(Math.round(c.hAn * 0.5))}h`,    color: '#fff' },
          { lbl: 'Taux récup.',    val: '50%',                                    color: '#4ABFB0' },
        ],
        fields2: [
          { lbl: 'Jours récupérés', val: `${Math.round(c.joursAn * 0.5)}j`,                   color: '#fff' },
          { lbl: 'Coût restant',    val: `${fmt(Math.round(c.coutTotal * 0.5))} €`,           color: '#fff' },
          { lbl: 'ROI estimé',      val: `x${c.roi1}`,                                        color: '#E8621A' },
        ],
      },
      {
        title: `Automatisation complète (${Math.round(TAUX_AUTO * 100)}%)`,
        fields: [
          { lbl: 'Gain annuel',    val: `${fmt(c.gainFull)} €`,                  color: '#4ABFB0' },
          { lbl: 'Heures libérées', val: `${fmt(Math.round(c.hAn * TAUX_AUTO))}h`, color: '#fff' },
          { lbl: 'Taux récup.',    val: `${Math.round(TAUX_AUTO * 100)}%`,        color: '#4ABFB0' },
        ],
        fields2: [
          { lbl: 'Jours récupérés', val: `${Math.round(c.joursAn * TAUX_AUTO)}j`,              color: '#fff' },
          { lbl: 'Coût restant',    val: `${fmt(Math.round(c.coutTotal * (1 - TAUX_AUTO)))} €`, color: '#fff' },
          { lbl: 'ROI estimé',      val: `x${c.roi2}`,                                          color: '#E8621A' },
        ],
      },
    ]

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Choisir un scénario
          <button onClick={() => window.print()}
            style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B9CC8', cursor: 'pointer', fontSize: 14, transition: 'all 0.15s' }}>
            ⎙
          </button>
        </div>

        {cards.map((card, i) => (
          <div key={i} onClick={() => setSelCard(i)}
            style={{
              borderRadius: 14, padding: '18px 20px', marginBottom: 12, cursor: 'pointer', transition: 'all 0.2s', position: 'relative',
              border: `1.5px solid ${selCard === i ? '#E8621A' : 'rgba(255,255,255,0.07)'}`,
              background: selCard === i ? 'rgba(232,98,26,0.05)' : '#1E2D5A',
              boxShadow: selCard === i ? '0 0 0 1px #E8621A, 0 8px 24px rgba(232,98,26,0.2)' : 'none',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ width: 16, height: 16, borderRadius: '50%', display: 'inline-block', flexShrink: 0, marginRight: 8, background: selCard === i ? '#E8621A' : 'transparent', border: `1.5px solid ${selCard === i ? '#E8621A' : 'rgba(255,255,255,0.2)'}`, position: 'relative' }}>
                {selCard === i && <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>{card.title}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px 8px' }}>
              {card.fields.map(f => (
                <div key={f.lbl}>
                  <div style={{ fontSize: 10, color: '#8B9CC8', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>{f.lbl}</div>
                  <div style={{ fontSize: 20, fontFamily: 'var(--font-display)', fontWeight: 800, color: f.color, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{f.val}</div>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '12px 0' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px 8px' }}>
              {card.fields2.map(f => (
                <div key={f.lbl}>
                  <div style={{ fontSize: 10, color: '#8B9CC8', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>{f.lbl}</div>
                  <div style={{ fontSize: 15, fontFamily: 'var(--font-body)', fontWeight: 700, color: f.color }}>{f.val}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 'auto', paddingTop: 20 }}>
          <a href={DISCOVERY_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '14px 24px', fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-body)', background: '#E8621A', color: '#fff', border: 'none', borderRadius: 9999, cursor: 'pointer', textDecoration: 'none', transition: 'all 0.2s' }}>
            Réserver mon audit gratuit — 45 min →
          </a>
          <div style={{ fontSize: 11, color: '#8B9CC8', textAlign: 'center', marginTop: 8 }}>Sans engagement · 100% visio · Réponse sous 24h</div>
        </div>
      </div>
    )
  }

  const renderDetail = () => {
    const sorted = [...domains].sort((a, b) => (WEIGHTS[b] ?? 0) - (WEIGHTS[a] ?? 0))
    const totalW = domains.reduce((s, d) => s + (WEIGHTS[d] ?? 0.1), 0)
    const maxW   = sorted.length ? Math.max(...sorted.map(d => WEIGHTS[d] ?? 0.1)) : 1
    const jours  = Math.round(c.joursAn * TAUX_AUTO)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Répartition par domaine
          <button onClick={() => window.print()}
            style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B9CC8', cursor: 'pointer', fontSize: 14 }}>
            ⎙
          </button>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #E8621A 0%, #c94e10 100%)', borderRadius: 14, padding: '22px 24px', marginBottom: 14, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Potentiel récupérable / an</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>{fmt(c.gainFull)} €/an</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 6 }}>soit {jours} jours de travail récupérés</div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {sorted.map(d => {
            const w   = WEIGHTS[d] ?? 0.1
            const pcV = Math.round((w / totalW) * 100)
            const eur = Math.round(c.coutTotal * (w / totalW))
            const bar = Math.round((w / maxW) * 100)
            return (
              <div key={d} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{LABELS[d]}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#4ABFB0' }}>{fmt(eur)} €/an</span>
                </div>
                <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${bar}%`, background: '#4ABFB0', borderRadius: 3 }} />
                </div>
                <div style={{ fontSize: 10, color: '#8B9CC8', marginTop: 3 }}>{pcV}% du temps manuel total</div>
              </div>
            )
          })}
        </div>

        <div style={{ paddingTop: 20 }}>
          <div style={{ marginBottom: 12 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 9999, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: urgColor, color: urgText }}>
              {urgLabel}
            </span>
          </div>
          <a href={DISCOVERY_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '14px 24px', fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-body)', background: '#E8621A', color: '#fff', border: 'none', borderRadius: 9999, cursor: 'pointer', textDecoration: 'none' }}>
            Réserver mon audit gratuit — 45 min →
          </a>
          <div style={{ fontSize: 11, color: '#8B9CC8', textAlign: 'center', marginTop: 8 }}>Sans engagement · 100% visio · Réponse sous 24h</div>
        </div>
      </div>
    )
  }

  // ─── RENDER ──────────────────────────────────────────────────────────────
  return (
    <div style={{
      width: '100%', maxWidth: 1040, margin: '0 auto',
      display: 'grid', gridTemplateColumns: 'clamp(320px, 42%, 420px) 1fr', minHeight: 640,
      borderRadius: 20, overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)',
    }}
    className="calc-card-responsive">
      {/* LEFT */}
      <div style={{ background: '#fff', padding: '36px 32px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: '#0D1B3E', letterSpacing: '-0.02em', marginBottom: 6 }}>Calculateur ROI</div>
        <div style={{ fontSize: 13, color: 'rgba(13,27,62,0.5)', marginBottom: 24, lineHeight: 1.5 }}>Estimez le coût de vos tâches manuelles et le gain potentiel de l&apos;automatisation.</div>

        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 0 }}>
            <ProgressDot n={1} />
            <ProgressLine n={1} />
            <ProgressDot n={2} />
            <ProgressLine n={2} />
            <ProgressDot n={3} />
            <ProgressLine n={3} />
            <ProgressDot n={4} />
          </div>
        </div>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>

      {/* RIGHT */}
      <div style={{ background: '#162248', padding: '36px 32px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {step <= 2 && renderSlideshow()}
        {step === 3 && renderResults()}
        {step === 4 && renderDetail()}
      </div>
    </div>
  )
}
