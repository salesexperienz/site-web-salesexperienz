import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FadeUp from '@/components/FadeUp'
import { ambassimmoSchema } from '@/lib/schema-ambassimmo'
import { DISCOVERY_URL } from '@/lib/constants'
import ScrollProgress from './ScrollProgress'

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────

const f = {
  lora: "'Lora', Georgia, serif",
  dm: "'DM Sans', system-ui, sans-serif",
  pjs: 'var(--font-body), system-ui, sans-serif',
}

// ─── METADATA ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Étude de cas Ambassimmo — #1 Google "Ambassadeur immobilier" · SalesExperienz',
  description:
    'Comment Ambassimmo est passé de zéro contenu SEO à la première position Google sur "ambassadeur immobilier" grâce à un système de publication automatisé n8n · GPT-4o · Claude AI. 30 articles/mois, 3 semaines de déploiement.',
  keywords: [
    'étude de cas SEO automatisé immobilier',
    'ambassimmo ambassadeur immobilier',
    'stratégie contenu plateforme immobilière',
    'n8n autoblogger wordpress immobilier',
    'système SEO GEO automatisé PME',
    'génération leads vendeurs immobiliers',
    'recommandation immobilière leads exclusifs',
    'salesexperienz étude de cas',
    'publication automatique article SEO',
    'Claude AI stratégie contenu',
  ],
  authors: [{ name: 'Laurent Guyonvarch', url: 'https://www.salesexperienz.fr' }],
  openGraph: {
    title: 'Ambassimmo : #1 Google "Ambassadeur immobilier" grâce au SEO automatisé',
    description:
      'De zéro contenu à 30 articles/mois et la première position Google sur les requêtes stratégiques immobilières. Déployé en 3 semaines avec n8n, GPT-4o et Claude AI.',
    url: 'https://www.salesexperienz.fr/etudes-de-cas/ambassimmo',
    siteName: 'SalesExperienz',
    // TODO: créer og-ambassimmo.jpg (1200×630px)
    images: [{ url: 'https://www.salesexperienz.fr/og-ambassimmo.jpg', width: 1200, height: 630, alt: 'Étude de cas Ambassimmo — SEO automatisé par SalesExperienz' }],
    locale: 'fr_FR',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ambassimmo : #1 Google "Ambassadeur immobilier" grâce au SEO automatisé',
    description:
      'De zéro contenu à 30 articles/mois et la première position Google. Déployé en 3 semaines avec n8n et Claude AI.',
    images: ['https://www.salesexperienz.fr/og-ambassimmo.jpg'],
  },
  alternates: {
    canonical: 'https://www.salesexperienz.fr/etudes-de-cas/ambassimmo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const heroMetrics = [
  { label: 'Secteur', value: 'Immobilier · Lead Gen' },
  { label: 'Taille', value: 'Structure indépendante' },
  { label: 'Déploiement', value: '3 semaines' },
  { label: 'ROI à 6 mois', value: '+340% trafic' },
]

const contextStats = [
  { stat: '3', label: 'audiences cibles sans contenu dédié — ambassadeurs · agences · mécènes' },
  { stat: '0', label: 'article SEO publié au démarrage' },
  { stat: '100%', label: 'trafic dépendant du réseau personnel' },
  { stat: '3 sem.', label: 'du brief au système opérationnel' },
]

const steps = [
  {
    num: '01',
    heading: 'Audit des opportunités SEO',
    title: 'Cartographie des mots-clés et des intentions de recherche',
    text: "Avant de construire quoi que ce soit, SalesExperienz a conduit un audit structuré du secteur immobilier. La Carte des Opportunités a permis d'identifier les clusters de mots-clés à forte valeur commerciale pour Ambassimmo : génération leads immobilier, prospection digitale agence, trouver mandats exclusifs. En 60 secondes, le workflow DataForSEO a généré 487 keywords structurés avec leurs métriques complètes.",
    tools: ['n8n', 'DataForSEO', 'Google Sheets', 'Stratégie GEO', 'IA'],
  },
  {
    num: '02',
    heading: 'Architecture Pillar-Cluster',
    title: 'Planification stratégique avec le Skill Claude AI',
    text: "Le Skill Claude AI a analysé les 487 keywords, formé 9 clusters sémantiques cohérents et calculé l'OpportunityScore de chaque groupe. Résultat : 3 articles piliers (guides complets 2 500 mots) et 24 articles satellites (800-1 200 mots) planifiés sur 6 mois, avec calendrier éditorial et briefs prêts à utiliser.",
    tools: ['Claude AI', 'Google Sheets', 'Dashboard SEO-GEO', 'Calendrier éditorial'],
  },
  {
    num: '03',
    heading: 'Déploiement de la machine à contenu',
    title: 'Autoblogger V4 — publication quotidienne automatique',
    text: "Le workflow Autoblogger n8n a été configuré sur le WordPress d'Ambassimmo. Chaque matin, le système lit le calendrier éditorial, génère l'article complet avec ses chapitres, crée l'image à la une via DALL-E, et publie directement sur le site. Zéro intervention manuelle requise. La confirmation de publication est logée automatiquement dans Google Sheets.",
    tools: ['n8n', 'OpenAI GPT-4o', 'DALL-E 3', 'WordPress', 'Pexels'],
  },
  {
    num: '04',
    heading: 'Formation et passation',
    title: 'Formation back-office et propriété totale des workflows',
    text: "1h30 de formation en visio pour que Patrick maîtrise son système : ajouter un mot-clé, modifier le calendrier, ajuster le ton de voix. Documentation complète livrée. Les workflows appartiennent à 100% à Ambassimmo dès J+1 — si SalesExperienz disparaît demain, le système continue de tourner.",
    tools: ['n8n', 'Workflows sur mesure', 'Suivi', 'Formation'],
  },
]

const svgBlocks = [
  { x: 20, label: 'Déclencheur', sub: 'Chaque matin 7h', icon: '⏱', bg: 'rgba(20,20,19,0.04)', stroke: 'rgba(20,20,19,0.12)' },
  { x: 220, label: 'Calendrier', sub: 'Google Sheets', icon: '◎', bg: 'rgba(74,191,176,0.06)', stroke: 'rgba(74,191,176,0.3)' },
  { x: 420, label: 'Génération', sub: 'GPT-4o · Claude AI', icon: '✦', bg: 'rgba(232,98,26,0.06)', stroke: 'rgba(232,98,26,0.3)' },
  { x: 620, label: 'Publication', sub: 'WordPress REST', icon: '▶', bg: 'rgba(74,191,176,0.06)', stroke: 'rgba(74,191,176,0.3)' },
  { x: 820, label: 'Confirmation', sub: 'Google Sheets log', icon: '▦', bg: 'rgba(20,20,19,0.04)', stroke: 'rgba(20,20,19,0.12)' },
]

const results = [
  { val: '180+', label: 'articles publiés en automatique', desc: 'En 6 mois, sans rédacteur ni agence', badge: null },
  { val: '+340%', label: 'de trafic organique', desc: 'Progression mesurée sur 6 mois', badge: null },
  { val: '13,30 €', label: 'coût par article tout compris', desc: 'vs 50–150 € en délégation freelance', badge: null },
  { val: '#1', label: '"Ambassadeur immobilier"', desc: 'Première position Google sur ce mot-clé stratégique', badge: '🏆' },
  { val: '#3', label: '"Recommandation immobilière"', desc: 'Troisième position Google sur cette requête cible', badge: null },
  { val: '3 sem.', label: 'du brief à la production', desc: 'Déploiement complet clés en main', badge: null },
]

const otherCases = [
  { tag: 'Prospection automatisée', title: 'Captation de leads vendeurs immobiliers et envoi de contrats aux agences immobilières en automatique', time: null },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function AmbassimmoPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ambassimmoSchema) }}
      />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet" />

      {/* Responsive overrides (inline styles don't support media queries) */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
        }
        .ambas-hero-metrics { grid-template-columns: repeat(4, 1fr); }
        .ambas-context-grid { grid-template-columns: 1fr 260px; }
        .ambas-results-grid { grid-template-columns: repeat(3, 1fr); }
        .ambas-cta-grid     { grid-template-columns: 1fr auto; }
        .ambas-cases-grid   { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 768px) {
          .ambas-hero-metrics { grid-template-columns: repeat(2, 1fr) !important; }
          .ambas-context-grid { grid-template-columns: 1fr !important; }
          .ambas-results-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .ambas-cta-grid     { grid-template-columns: 1fr !important; }
          .ambas-cases-grid   { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .ambas-results-grid { grid-template-columns: 1fr !important; }
          .ambas-hero-metrics { grid-template-columns: 1fr !important; }
        }
        .ambas-other-card:hover {
          border-color: rgba(232,98,26,0.3) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .ambas-cta-btn:hover {
          background: #FF7D35 !important;
          transform: translateY(-2px);
        }
        .ambas-site-link:hover {
          color: rgba(255,255,255,0.9) !important;
        }
      `}</style>

      <ScrollProgress />
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{ background: '#0D1B3E', paddingTop: 180, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>

        {/* Glow derrière le glass pill */}
        <div aria-hidden="true" style={{ position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)', width: 600, height: 260, background: 'radial-gradient(ellipse at 40% 50%, rgba(232,98,26,0.18) 0%, rgba(74,191,176,0.10) 45%, transparent 70%)', filter: 'blur(48px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 40px', position: 'relative' }}>

          {/* Breadcrumb */}
          <nav aria-label="Fil d'Ariane" style={{ marginBottom: 40, display: 'flex', gap: 18, alignItems: 'stretch' }}>
            <div style={{ width: 3, borderRadius: 2, background: '#E8621A', flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div>
                <a href="/" style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontFamily: f.pjs }}>salesexperienz.fr</a>
                <span style={{ margin: '0 10px', color: 'rgba(255,255,255,0.2)', fontSize: 15 }}>→</span>
                <a href="/etudes-de-cas" style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontFamily: f.pjs }}>Cas clients</a>
              </div>
              <span style={{
                fontFamily: f.lora,
                fontSize: 36,
                fontWeight: 600,
                color: '#141413',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                display: 'inline-block',
                padding: '10px 22px',
                borderRadius: 14,
                background: 'rgba(250,249,245,0.88)',
                backdropFilter: 'blur(24px) saturate(160%)',
                WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                border: '1px solid rgba(250,249,245,0.6)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.06)',
              }}>Ambassimmo</span>
            </div>
          </nav>

          {/* Badges */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 4, background: 'rgba(232,98,26,0.15)', border: '1px solid rgba(232,98,26,0.3)', color: '#E8621A', fontFamily: f.pjs }}>
              SEO Automatisé
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 4, background: 'rgba(74,191,176,0.1)', border: '1px solid rgba(74,191,176,0.3)', color: 'rgba(255,255,255,0.9)', fontFamily: f.pjs }}>
              Machine à Contenu
            </span>
          </div>

          {/* Lien site client — sous les badges */}
          <a
            href="https://ambassimmo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ambas-site-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontFamily: f.pjs, marginBottom: 40 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1.5A5.5 5.5 0 1 0 12.5 7 5.506 5.506 0 0 0 7 1.5Zm0 1a4.5 4.5 0 1 1-4.5 4.5A4.505 4.505 0 0 1 7 2.5Zm-.5 1v3.25l2.25 2.25.707-.707L7.5 6.35V3.5H6.5Z" fill="currentColor"/>
              <path d="M9.5 1.5v1H12v2.5h1V1.5H9.5ZM12 2.5l-4 4 .707.707 4-4L12 2.5Z" fill="currentColor"/>
            </svg>
            ambassimmo.com
          </a>

          {/* H1 */}
          <h1 style={{ fontFamily: f.lora, fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.02em', color: '#fff', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 28 }}>
            De zéro contenu SEO à 30 articles publiés par mois
          </h1>

          {/* Subtitle */}
          <p style={{ fontFamily: f.dm, fontSize: 20, lineHeight: 1.65, color: '#ffffff', fontWeight: 300, marginBottom: 48, maxWidth: 640 }}>
            Comment Ambassimmo a remplacé son absence de stratégie de contenu par un système SEO/GEO automatisé
            qui publie 365 jours/an — sans rédacteur, sans agence, sans intervention manuelle.
          </p>

          {/* Metrics grid */}
          <div style={{ background: 'rgba(232,98,26,0.15)', border: '1px solid rgba(232,98,26,0.2)', borderRadius: 8, overflow: 'hidden', marginBottom: 56 }}>
            <div className="ambas-hero-metrics" style={{ display: 'grid', gap: 1 }}>
              {heroMetrics.map((m) => (
                <div key={m.label} style={{ background: '#FAF9F5', padding: '20px 24px' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#E8621A', marginBottom: 6, fontFamily: f.pjs }}>{m.label}</div>
                  <div style={{ fontFamily: f.lora, fontSize: 18, fontWeight: 500, color: '#141413' }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)' }} />
      </section>

      {/* ── CONTEXTE ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '72px 0', background: '#FAF9F5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>

          {/* Label + h2 au-dessus de la grille */}
          <FadeUp>
            <p style={{ fontSize: 13, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#8E8D89', marginBottom: 16, fontFamily: f.pjs }}>Le contexte</p>
            <h2 style={{ fontFamily: f.lora, fontSize: 28, fontWeight: 600, lineHeight: 1.3, marginBottom: 40, color: '#141413', maxWidth: 680 }}>
              Une plateforme d&apos;intermédiation immobilière sans stratégie de contenu pour attirer ses trois audiences
            </h2>
          </FadeUp>

          {/* Grille : paragraphes | cards — démarrent au même niveau */}
          <div className="ambas-context-grid" style={{ display: 'grid', gap: 64, alignItems: 'start' }}>

            {/* Paragraphes */}
            <FadeUp>
              <p style={{ fontSize: 17, lineHeight: 1.75, fontWeight: 300, marginBottom: 18, color: '#5E5D59', fontFamily: f.dm, textAlign: 'justify' }}>
                Ambassimmo est une plateforme d&apos;intermédiation participative qui relie <strong style={{ fontWeight: 600, color: '#141413' }}>trois acteurs</strong> : des <strong style={{ fontWeight: 600, color: '#141413' }}>particuliers ambassadeurs</strong> qui recommandent des vendeurs, des <strong style={{ fontWeight: 600, color: '#141413' }}>agences immobilières partenaires</strong> qui prennent en charge la transaction, et des <strong style={{ fontWeight: 600, color: '#141413' }}>mécènes</strong> dont le sponsoring finance le modèle tout en soutenant la lutte contre le cancer (une partie de chaque commission est reversée à l&apos;Institut Gustave Roussy).
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, fontWeight: 300, marginBottom: 18, color: '#5E5D59', fontFamily: f.dm, textAlign: 'justify' }}>
                Patrick Lafleur avait construit un modèle économique original. Mais pour qu&apos;il tourne, il fallait <strong style={{ fontWeight: 600, color: '#141413' }}>attirer simultanément ces trois profils</strong> sur le site : des particuliers tentés par le rôle d&apos;ambassadeur, des agences immobilières en quête de nouveaux mandats, et des entreprises mécènes prêtes à sponsoriser la démarche. Le problème : <strong style={{ fontWeight: 600, color: '#141413' }}>zéro article publié, zéro stratégie de mots-clés, zéro trafic organique.</strong> Le site existait, les audiences cibles cherchaient des réponses sur Google — mais Ambassimmo n&apos;apparaissait nulle part.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, fontWeight: 300, marginBottom: 18, color: '#5E5D59', fontFamily: f.dm, textAlign: 'justify' }}>
                La conséquence était directe. Sans contenu positionné sur les bonnes requêtes — &ldquo;devenir ambassadeur immobilier&rdquo;, &ldquo;leads qualifiés pour agences immobilières&rdquo;, &ldquo;mécénat immobilier entreprise&rdquo; — Patrick ne pouvait pas être trouvé par ceux qu&apos;il cherchait à convaincre. <strong style={{ fontWeight: 600, color: '#141413' }}>Chaque audience a ses propres questions, son propre vocabulaire, ses propres objections.</strong> Un article bien ciblé sur &ldquo;comment obtenir des mandats exclusifs&rdquo; amène une agence. Un article sur &ldquo;gagner des commissions en recommandant&rdquo; amène un ambassadeur. Un article sur &ldquo;mécénat et image de marque&rdquo; amène un sponsor.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, fontWeight: 300, color: '#5E5D59', fontFamily: f.dm, textAlign: 'justify' }}>
                La stratégie de contenu n&apos;était pas un outil de visibilité parmi d&apos;autres — c&apos;était <strong style={{ fontWeight: 600, color: '#141413' }}>la condition pour que les trois piliers du modèle se remplissent en simultané, à coût fixe,</strong> sans dépendre d&apos;un budget publicitaire à reconduire chaque mois.
              </p>
            </FadeUp>

            {/* Stat cards */}
            <FadeUp delay={0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {contextStats.map((s, i) => (
                  <div key={i} style={{ padding: 20, borderRadius: 8, border: '1px solid rgba(20,20,19,0.1)', background: '#fff', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ fontFamily: f.lora, fontSize: 32, fontWeight: 600, color: '#E8621A', flexShrink: 0, minWidth: 48 }}>{s.stat}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.5, color: '#8E8D89', fontFamily: f.dm }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#fff', borderTop: '1px solid rgba(20,20,19,0.1)', borderBottom: '1px solid rgba(20,20,19,0.1)' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 40px' }}>
          <FadeUp>
            <p style={{ fontSize: 13, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#8E8D89', marginBottom: 48, fontFamily: f.pjs }}>La solution</p>
          </FadeUp>

          {steps.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.08}>
              <div style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: '0 32px', borderBottom: i < steps.length - 1 ? '1px solid rgba(20,20,19,0.1)' : 'none', paddingBottom: i < steps.length - 1 ? 56 : 0, marginBottom: i < steps.length - 1 ? 56 : 0 }}>
                <div style={{ paddingTop: 4 }}>
                  <span style={{ fontFamily: f.lora, fontSize: 52, fontWeight: 600, color: '#E8621A', lineHeight: 1, letterSpacing: '-0.03em' }}>{step.num}</span>
                </div>
                <div>
                  <p style={{ fontFamily: f.lora, fontSize: 22, fontWeight: 600, lineHeight: 1.25, color: '#141413', marginBottom: 6 }}>{step.heading}</p>
                  <p style={{ fontSize: 14, fontWeight: 400, color: '#8E8D89', marginBottom: 16, fontFamily: f.pjs }}>{step.title}</p>
                  <p style={{ fontSize: 16, lineHeight: 1.75, fontWeight: 300, color: '#5E5D59', marginBottom: 16, fontFamily: f.dm }}>{step.text}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {step.tools.map((t) => (
                      <span key={t} style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 4, background: 'rgba(20,20,19,0.06)', border: '1px solid rgba(20,20,19,0.12)', color: '#5E5D59', fontFamily: f.pjs }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── SCHÉMA TECHNIQUE ──────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#FAF9F5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
          <FadeUp>
            <p style={{ fontSize: 13, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#8E8D89', marginBottom: 12, fontFamily: f.pjs }}>Schéma technique</p>
          </FadeUp>

          {/* Workflow 1 — KW Research */}
          <FadeUp delay={0.05}>
            <h3 style={{ fontFamily: f.lora, fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#141413' }}>Workflow 1 — Recherche de mots-clés automatisée</h3>
            <div style={{ background: '#fff', border: '1px solid rgba(20,20,19,0.1)', borderRadius: 12, padding: '40px 32px', overflowX: 'auto', marginBottom: 24 }}>
              <svg viewBox="0 0 1020 260" width="100%" style={{ minWidth: 700 }} aria-label="Workflow Recherche de mots-clés">
                {/* Annotation DataForSEO */}
                <rect x={328} y={16} width={364} height={32} rx={6} fill="rgba(74,191,176,0.06)" stroke="rgba(74,191,176,0.25)" strokeWidth={1} />
                <text x={510} y={36} textAnchor="middle" fontSize={11} fill="#4ABFB0" fontFamily="system-ui, sans-serif">6 APIs DataForSEO interrogées en parallèle · 60 secondes</text>
                <line x1={510} y1={48} x2={510} y2={72} stroke="rgba(74,191,176,0.3)" strokeWidth={1} strokeDasharray="3 3" />

                {/* Blocs */}
                {[
                  { x: 20,  label: 'Déclencheur',    sub: 'Formulaire n8n',          icon: '⏱', bg: 'rgba(20,20,19,0.04)',    stroke: 'rgba(20,20,19,0.12)' },
                  { x: 220, label: 'Template',        sub: 'Copie Google Sheet',      icon: '◎', bg: 'rgba(74,191,176,0.06)', stroke: 'rgba(74,191,176,0.3)' },
                  { x: 420, label: 'DataForSEO',      sub: 'KW · SERP · PAA · Auto', icon: '⚡', bg: 'rgba(232,98,26,0.06)', stroke: 'rgba(232,98,26,0.3)' },
                  { x: 620, label: 'Structuration',   sub: '7 feuilles catégorisées', icon: '▦', bg: 'rgba(74,191,176,0.06)', stroke: 'rgba(74,191,176,0.3)' },
                  { x: 820, label: 'Master Sheet',    sub: 'Agrégée & dédupliquée',   icon: '✓', bg: 'rgba(20,20,19,0.04)',   stroke: 'rgba(20,20,19,0.12)' },
                ].map((block, i, arr) => (
                  <g key={block.x}>
                    <rect x={block.x} y={72} width={160} height={100} rx={8} fill={block.bg} stroke={block.stroke} strokeWidth={1.5} />
                    <text x={block.x + 80} y={110} textAnchor="middle" fontSize={22}>{block.icon}</text>
                    <text x={block.x + 80} y={134} textAnchor="middle" fontSize={13} fontWeight={600} fill="#141413" fontFamily="system-ui, sans-serif">{block.label}</text>
                    <text x={block.x + 80} y={151} textAnchor="middle" fontSize={11} fill="#8E8D89" fontFamily="system-ui, sans-serif">{block.sub}</text>
                    {i < arr.length - 1 && (
                      <>
                        <line x1={block.x + 160} y1={122} x2={block.x + 220} y2={122} stroke="rgba(20,20,19,0.2)" strokeWidth={1.5} />
                        <polygon points={`${block.x + 218},118 ${block.x + 226},122 ${block.x + 218},126`} fill="rgba(20,20,19,0.3)" />
                      </>
                    )}
                  </g>
                ))}

                {/* Annotation bas */}
                <rect x={360} y={210} width={300} height={30} rx={15} fill="rgba(13,27,62,0.05)" />
                <text x={510} y={229} textAnchor="middle" fontSize={11} fill="rgba(13,27,62,0.6)" fontFamily="system-ui, sans-serif">n8n · DataForSEO · Google Sheets · 300–500 keywords structurés</text>
              </svg>
            </div>
          </FadeUp>

          {/* Workflow 2 — Stratégie SEO-GEO */}
          <FadeUp delay={0.1}>
            <h3 style={{ fontFamily: f.lora, fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#141413' }}>Workflow 2 — Stratégie SEO-GEO & Plan éditorial</h3>
            <div style={{ background: '#fff', border: '1px solid rgba(20,20,19,0.1)', borderRadius: 12, padding: '40px 32px', overflowX: 'auto', marginBottom: 24 }}>
              <svg viewBox="0 0 1020 260" width="100%" style={{ minWidth: 700 }} aria-label="Workflow Stratégie SEO-GEO">
                {/* Annotation IA */}
                <rect x={308} y={16} width={284} height={32} rx={6} fill="rgba(232,98,26,0.06)" stroke="rgba(232,98,26,0.2)" strokeWidth={1} />
                <text x={450} y={36} textAnchor="middle" fontSize={11} fill="#E8621A" fontFamily="system-ui, sans-serif">GPT-4.1 + Claude AI · OpportunityScore GEO</text>
                <line x1={450} y1={48} x2={450} y2={72} stroke="rgba(232,98,26,0.3)" strokeWidth={1} strokeDasharray="3 3" />

                {/* Blocs */}
                {[
                  { x: 20,  label: 'Fichier KW',     sub: 'Google Sheet source',      icon: '◎', bg: 'rgba(20,20,19,0.04)',    stroke: 'rgba(20,20,19,0.12)' },
                  { x: 220, label: 'Nettoyage',       sub: 'Clean · GEO Score · Filtre',icon:'⚙', bg: 'rgba(74,191,176,0.06)', stroke: 'rgba(74,191,176,0.3)' },
                  { x: 420, label: 'Analyse IA',      sub: 'Clustering sémantique',    icon: '✦', bg: 'rgba(232,98,26,0.06)', stroke: 'rgba(232,98,26,0.3)' },
                  { x: 620, label: 'Architecture',    sub: 'Piliers · Satellites · Maillage', icon: '▤', bg: 'rgba(74,191,176,0.06)', stroke: 'rgba(74,191,176,0.3)' },
                  { x: 820, label: 'Livrables',       sub: 'Dashboard · Plan · Autoblog', icon: '▶', bg: 'rgba(20,20,19,0.04)', stroke: 'rgba(20,20,19,0.12)' },
                ].map((block, i, arr) => (
                  <g key={block.x}>
                    <rect x={block.x} y={72} width={160} height={100} rx={8} fill={block.bg} stroke={block.stroke} strokeWidth={1.5} />
                    <text x={block.x + 80} y={110} textAnchor="middle" fontSize={22}>{block.icon}</text>
                    <text x={block.x + 80} y={134} textAnchor="middle" fontSize={13} fontWeight={600} fill="#141413" fontFamily="system-ui, sans-serif">{block.label}</text>
                    <text x={block.x + 80} y={151} textAnchor="middle" fontSize={11} fill="#8E8D89" fontFamily="system-ui, sans-serif">{block.sub}</text>
                    {i < arr.length - 1 && (
                      <>
                        <line x1={block.x + 160} y1={122} x2={block.x + 220} y2={122} stroke="rgba(20,20,19,0.2)" strokeWidth={1.5} />
                        <polygon points={`${block.x + 218},118 ${block.x + 226},122 ${block.x + 218},126`} fill="rgba(20,20,19,0.3)" />
                      </>
                    )}
                  </g>
                ))}

                {/* Annotation bas */}
                <rect x={330} y={210} width={360} height={30} rx={15} fill="rgba(13,27,62,0.05)" />
                <text x={510} y={229} textAnchor="middle" fontSize={11} fill="rgba(13,27,62,0.6)" fontFamily="system-ui, sans-serif">n8n · GPT-4.1 · Claude AI · Google Sheets · Dashboard HTML · Gmail</text>
              </svg>
            </div>
          </FadeUp>

          {/* Workflow 3 — Autoblogger */}
          <FadeUp delay={0.15}>
            <h3 style={{ fontFamily: f.lora, fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#141413' }}>Workflow 3 — Publication automatique quotidienne</h3>
            <div style={{ background: '#fff', border: '1px solid rgba(20,20,19,0.1)', borderRadius: 12, padding: '40px 32px', overflowX: 'auto' }}>
              <svg viewBox="0 0 1020 260" width="100%" style={{ minWidth: 700 }} aria-label="Schéma du workflow Autoblogger Ambassimmo">
                {/* Annotation Claude AI */}
                <rect x={368} y={16} width={284} height={32} rx={6} fill="rgba(232,98,26,0.06)" stroke="rgba(232,98,26,0.2)" strokeWidth={1} />
                <text x={510} y={36} textAnchor="middle" fontSize={11} fill="#E8621A" fontFamily="system-ui, sans-serif">Claude AI intègre la méthode Capsule GEO</text>
                <line x1={510} y1={48} x2={510} y2={72} stroke="rgba(232,98,26,0.3)" strokeWidth={1} strokeDasharray="3 3" />

                {svgBlocks.map((block, i) => (
                  <g key={block.x}>
                    <rect x={block.x} y={72} width={160} height={100} rx={8} fill={block.bg} stroke={block.stroke} strokeWidth={1.5} />
                    <text x={block.x + 80} y={110} textAnchor="middle" fontSize={22}>{block.icon}</text>
                    <text x={block.x + 80} y={134} textAnchor="middle" fontSize={13} fontWeight={600} fill="#141413" fontFamily="system-ui, sans-serif">{block.label}</text>
                    <text x={block.x + 80} y={151} textAnchor="middle" fontSize={11} fill="#8E8D89" fontFamily="system-ui, sans-serif">{block.sub}</text>
                    {i < svgBlocks.length - 1 && (
                      <>
                        <line x1={block.x + 160} y1={122} x2={block.x + 220} y2={122} stroke="rgba(20,20,19,0.2)" strokeWidth={1.5} />
                        <polygon points={`${block.x + 218},118 ${block.x + 226},122 ${block.x + 218},126`} fill="rgba(20,20,19,0.3)" />
                      </>
                    )}
                  </g>
                ))}

                {/* Annotation bas */}
                <rect x={360} y={210} width={300} height={30} rx={15} fill="rgba(13,27,62,0.05)" />
                <text x={510} y={229} textAnchor="middle" fontSize={11} fill="rgba(13,27,62,0.6)" fontFamily="system-ui, sans-serif">Orchestration n8n · 30 articles/mois · 0 erreur</text>
              </svg>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── RÉSULTATS ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#FAF9F5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
          <FadeUp>
            <p style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#E8621A', marginBottom: 12, fontFamily: f.pjs }}>Résultats mesurés</p>
            <h3 style={{ fontFamily: f.lora, fontSize: 32, fontWeight: 600, marginBottom: 48, maxWidth: 540, color: '#141413', lineHeight: 1.2 }}>6 mois après le déploiement</h3>
          </FadeUp>

          <div className="ambas-results-grid" style={{ display: 'grid', gap: 16 }}>
            {results.map((m, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div style={{ background: '#fff', border: '1px solid rgba(20,20,19,0.1)', borderRadius: 8, padding: '36px 28px', height: '100%', boxSizing: 'border-box' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
                    <div style={{ fontFamily: f.lora, fontSize: 44, fontWeight: 600, color: '#E8621A', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.val}</div>
                    {m.badge && <span style={{ fontSize: 24, lineHeight: 1, filter: 'drop-shadow(0 1px 2px rgba(200,150,0,0.3))' }}>{m.badge}</span>}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: '#141413', marginBottom: 8, fontFamily: f.pjs }}>{m.label}</div>
                  <div style={{ fontSize: 13, color: '#5E5D59', lineHeight: 1.55, fontFamily: f.dm }}>{m.desc}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGE ────────────────────────────────────────────────────── */}
      <section style={{ padding: '96px 0', background: '#fff', borderBottom: '1px solid rgba(20,20,19,0.1)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', padding: '0 40px' }}>
          <FadeUp>
            <div style={{ fontSize: 40, color: 'rgba(20,20,19,0.15)', fontFamily: 'Georgia, serif', marginBottom: 32, lineHeight: 1 }}>&ldquo;</div>

            <blockquote style={{ margin: 0, fontFamily: f.lora, fontSize: 24, fontWeight: 500, lineHeight: 1.55, fontStyle: 'italic', color: '#141413', marginBottom: 40 }}>
              En trois semaines, Laurent a transformé notre approche de l&apos;acquisition.
              Mon site publie un article par jour tout seul — je n&apos;y touche plus.
              Six mois après, j&apos;ai 23 leads organiques par mois que je n&apos;aurais jamais
              eus sans ça. Le ROI est là, les chiffres sont là.
            </blockquote>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
              <div
                style={{ width: 48, height: 48, borderRadius: '50%', background: '#0D1B3E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                aria-hidden="true"
              >
                <span style={{ fontFamily: f.pjs, fontWeight: 700, color: '#fff', fontSize: 18 }}>P</span>
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#141413', fontFamily: f.pjs }}>Patrick Lafleur</div>
                <div style={{ fontSize: 13, color: '#8E8D89', fontFamily: f.dm }}>Fondateur, Ambassimmo</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: '96px 0', background: '#FAF9F5' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 40px' }}>
          <FadeUp>
            <div className="ambas-cta-grid" style={{ display: 'grid', gap: 48, alignItems: 'center', marginBottom: 80 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#E8621A', marginBottom: 12, fontFamily: f.pjs }}>Votre tour</p>
                <h2 style={{ fontFamily: f.lora, fontSize: 32, fontWeight: 600, lineHeight: 1.25, maxWidth: 480, marginBottom: 14, color: '#141413' }}>
                  Prêt à identifier ce qui freine votre visibilité ?
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.7, fontWeight: 300, color: '#5E5D59', fontFamily: f.dm }}>
                  45 minutes pour cartographier vos opportunités SEO-GEO.<br />
                  Sans engagement, sans jargon technique.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'stretch' }}>
                <a
                  href={DISCOVERY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ambas-cta-btn"
                  style={{ background: '#E8621A', color: '#FAF9F5', fontSize: 16, fontWeight: 500, borderRadius: 7.5, padding: '14px 32px', textDecoration: 'none', whiteSpace: 'nowrap', textAlign: 'center', fontFamily: f.pjs, display: 'block', transition: 'background 0.2s, transform 0.2s', minHeight: 44 }}
                >
                  Réserver mon appel gratuit →
                </a>
                <p style={{ fontSize: 13, color: '#8E8D89', fontFamily: f.dm, textAlign: 'center', margin: 0 }}>
                  <a href="tel:+33622951638" style={{ color: '#8E8D89', textDecoration: 'none' }}>06 22 95 16 38</a>
                  {' · '}
                  <a href="mailto:contact@salesexperienz.fr" style={{ color: '#8E8D89', textDecoration: 'none' }}>contact@salesexperienz.fr</a>
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Autres cas clients */}
          <FadeUp delay={0.1}>
            <div style={{ paddingTop: 48, borderTop: '1px solid rgba(20,20,19,0.1)' }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#8E8D89', marginBottom: 24, fontFamily: f.pjs }}>Autres cas clients</p>
              <div className="ambas-cases-grid" style={{ display: 'grid', gap: 16, gridTemplateColumns: otherCases.length === 1 ? '1fr' : undefined }}>
                {otherCases.map((c, i) => (
                  <a
                    key={i}
                    href="#"
                    className="ambas-other-card"
                    style={{ padding: 20, borderRadius: 8, border: '1px solid rgba(20,20,19,0.1)', background: '#fff', textDecoration: 'none', display: 'block', transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s' }}
                  >
                    <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#E8621A', marginBottom: 8, fontFamily: f.pjs }}>{c.tag}</p>
                    <p style={{ fontSize: 14, fontWeight: 500, color: '#141413', marginBottom: 8, lineHeight: 1.4, fontFamily: f.pjs }}>{c.title}</p>
                    {c.time && <p style={{ fontSize: 12, color: '#8E8D89', fontFamily: f.dm, margin: 0 }}>{c.time} de lecture</p>}
                  </a>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  )
}
