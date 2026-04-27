import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FadeUp from '@/components/FadeUp'
import { ambassimmoLeadsSchema } from '@/lib/schema-ambassimmo-leads'
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
  title: 'Étude de cas Ambassimmo — Pipeline leads vendeurs & contrats AMI automatisés · SalesExperienz',
  description:
    "Comment Ambassimmo automatise la mise en relation entre vendeurs immobiliers et agences partenaires : plugin d'estimation WordPress, segmentation Brevo, enrichissement agences et contrat AMI signé en moins de 5 minutes.",
  keywords: [
    'automatisation prospection agences immobilières',
    'plugin wordpress estimation immobilière',
    'contrat AMI automatisé DocuSeal',
    'lead vendeur immobilier automatisation',
    'enrichissement agences Google Maps Pappers',
    'n8n workflow immobilier',
    'ambassimmo leads partenaires',
    'salesexperienz étude de cas',
    'pipeline leads immobilier automatique',
    'segmentation Brevo leads immobilier',
  ],
  authors: [{ name: 'Laurent Guyonvarch', url: 'https://www.salesexperienz.fr' }],
  openGraph: {
    title: "Ambassimmo : de l'estimation en ligne au contrat agence signé en moins de 5 minutes",
    description:
      "Plugin WordPress custom + 4 workflows n8n : captation, segmentation, enrichissement agences et envoi contrat AMI automatisé. Zéro intervention humaine.",
    url: 'https://www.salesexperienz.fr/etudes-de-cas/ambassimmo-leads',
    siteName: 'SalesExperienz',
    // TODO: créer og-ambassimmo-leads.jpg (1200×630px)
    images: [{ url: 'https://www.salesexperienz.fr/og-ambassimmo-leads.jpg', width: 1200, height: 630, alt: 'Étude de cas Ambassimmo — Pipeline leads automatisé par SalesExperienz' }],
    locale: 'fr_FR',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ambassimmo : de l'estimation en ligne au contrat agence signé en moins de 5 minutes",
    description: "Plugin WordPress custom + 4 workflows n8n. Zéro intervention humaine entre le lead et la mise en relation.",
    images: ['https://www.salesexperienz.fr/og-ambassimmo-leads.jpg'],
  },
  alternates: {
    canonical: 'https://www.salesexperienz.fr/etudes-de-cas/ambassimmo-leads',
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
  { label: 'Déploiement', value: '4 semaines' },
  { label: 'Pipeline', value: '100% automatisé' },
]

const contextStats = [
  { stat: '0', label: "mise en relation avant le système — tout était manuel" },
  { stat: '3', label: 'audiences à connecter : vendeurs · agences · mécènes' },
  { stat: '8', label: 'agences ciblées automatiquement par lead qualifié' },
  { stat: '4', label: 'workflows n8n orchestrés de bout en bout' },
]

const steps = [
  {
    num: '01',
    heading: "Plugin WordPress d'estimation immobilière",
    title: 'Un formulaire multi-étapes construit sur les données DVF réelles',
    text: "SalesExperienz a développé de A à Z un plugin WordPress en React + PHP. Le formulaire guide le propriétaire en plusieurs étapes : type de bien, adresse, surface, caractéristiques, DPE. En coulisse, il interroge les DVF (données de valeurs foncières officielles), l'API Geo.gouv.fr et l'API Adresse pour calculer une estimation algorithmique en temps réel. Le résultat est affiché instantanément avec une fourchette min/max et un prix au m². Chaque soumission déclenche un webhook n8n.",
    tools: ['React', 'PHP', 'WordPress', 'API DVF', 'Geo.gouv.fr', 'n8n'],
  },
  {
    num: '02',
    heading: 'Captation & segmentation automatique',
    title: 'Trois chemins distincts selon le profil et le projet du vendeur',
    text: "Le workflow n8n reçoit les données, les normalise (format téléphone, labels, equipements) et segmente chaque lead dans Brevo selon deux critères : l'intention de vente et le consentement RGPD. Les leads chauds (projet concret + RGPD coché) déclenchent immédiatement la recherche d'agences et une notification interne. Les leads tièdes ou sans RGPD entrent dans des séquences de nurturing longues. Tous les leads sont enregistrés dans Google Sheets.",
    tools: ['n8n', 'Brevo CRM', 'Google Sheets', 'GPT-4o'],
  },
  {
    num: '03',
    heading: 'Enrichissement & qualification des agences',
    title: 'Trouver les 8 meilleures agences dans un rayon de 5km, avec les coordonnées du dirigeant',
    text: "Pour chaque lead qualifié, GPT-4o génère 10 requêtes géolocalisées autour de l'adresse du bien. L'API Google Maps Text Search retourne les agences dans le périmètre. Un algorithme filtre les 8 meilleures (note ≥ 4,0, catégorie \"real_estate_agency\"). L'API Pappers identifie le SIREN, le dirigeant, le statut juridique et les derniers chiffres d'affaires. Icypeas recherche ensuite l'email professionnel du dirigeant. Seules les agences avec un email validé passent à l'étape suivante.",
    tools: ['Google Maps API', 'API Pappers', 'Icypeas', 'n8n', 'GPT-4o'],
  },
  {
    num: '04',
    heading: 'Contrat AMI automatisé + séquence de relance',
    title: "De l'email initial à la mise en relation — sans aucune action manuelle",
    text: "DocuSeal génère un contrat AMI pré-rempli avec les informations de l'agence (nom, SIREN, dirigeant, zone). Un premier email est envoyé avec un bouton de signature. Si l'agence ne signe pas sous 24h : une relance est envoyée. Sous 48h supplémentaires : un dernier email d'urgence (\"réattribution imminente\"). Dès qu'une agence signe, le système lui envoie automatiquement les coordonnées complètes du vendeur. Patrick reçoit une notification à chaque signature pour un appel de suivi.",
    tools: ['DocuSeal', 'SMTP', 'n8n', 'Google Sheets', 'Webhook'],
  },
]

const svgBlocksPlugin = [
  { x: 20,  label: 'Formulaire',   sub: 'Plugin WordPress React', icon: '◎', bg: 'rgba(20,20,19,0.04)',    stroke: 'rgba(20,20,19,0.12)' },
  { x: 220, label: 'API DVF',      sub: 'Valeurs foncières réelles', icon: '⚡', bg: 'rgba(74,191,176,0.06)', stroke: 'rgba(74,191,176,0.3)' },
  { x: 420, label: 'Estimation',   sub: 'Calcul algorithmique', icon: '✦', bg: 'rgba(232,98,26,0.06)', stroke: 'rgba(232,98,26,0.3)' },
  { x: 620, label: 'Webhook n8n',  sub: 'Données structurées', icon: '▶', bg: 'rgba(74,191,176,0.06)', stroke: 'rgba(74,191,176,0.3)' },
  { x: 820, label: 'Brevo CRM',    sub: 'Segmentation 3 listes', icon: '▦', bg: 'rgba(20,20,19,0.04)', stroke: 'rgba(20,20,19,0.12)' },
]

const svgBlocksAgences = [
  { x: 20,  label: 'Lead qualifié', sub: 'RGPD + projet concret',    icon: '◎', bg: 'rgba(20,20,19,0.04)',    stroke: 'rgba(20,20,19,0.12)' },
  { x: 220, label: 'Google Maps',   sub: '10 requêtes GPT-4o · 5km', icon: '⚡', bg: 'rgba(74,191,176,0.06)', stroke: 'rgba(74,191,176,0.3)' },
  { x: 420, label: 'Pappers',       sub: 'SIREN · Dirigeant · CA',   icon: '✦', bg: 'rgba(232,98,26,0.06)', stroke: 'rgba(232,98,26,0.3)' },
  { x: 620, label: 'Icypeas',       sub: 'Email du dirigeant',        icon: '▤', bg: 'rgba(74,191,176,0.06)', stroke: 'rgba(74,191,176,0.3)' },
  { x: 820, label: 'DocuSeal',      sub: 'Contrat AMI pré-rempli',   icon: '▶', bg: 'rgba(20,20,19,0.04)', stroke: 'rgba(20,20,19,0.12)' },
]

const svgBlocksContrat = [
  { x: 20,  label: 'Email J0',      sub: 'Contrat + bouton signature', icon: '⏱', bg: 'rgba(20,20,19,0.04)',    stroke: 'rgba(20,20,19,0.12)' },
  { x: 220, label: 'Vérification',  sub: 'Statut DocuSeal J+1',        icon: '◎', bg: 'rgba(74,191,176,0.06)', stroke: 'rgba(74,191,176,0.3)' },
  { x: 420, label: 'Relance J+1',   sub: 'Email de rappel',            icon: '✦', bg: 'rgba(232,98,26,0.06)', stroke: 'rgba(232,98,26,0.3)' },
  { x: 620, label: 'Relance J+3',   sub: 'Urgence réattribution',      icon: '▤', bg: 'rgba(74,191,176,0.06)', stroke: 'rgba(74,191,176,0.3)' },
  { x: 820, label: 'Signature ✓',   sub: 'Coordonnées vendeur envoyées', icon: '▶', bg: 'rgba(20,20,19,0.04)', stroke: 'rgba(20,20,19,0.12)' },
]

const results = [
  { val: '< 5 min', label: "entre un lead qualifié et l'envoi du contrat", desc: 'Du webhook n8n au email DocuSeal — sans aucune action manuelle', badge: null },
  { val: '8', label: 'agences ciblées par lead dans un rayon de 5km', desc: 'Filtrées par note Google ≥ 4,0 et enrichies avec email dirigeant', badge: null },
  { val: '3', label: 'emails automatiques par agence contactée', desc: 'J0 initial · J+1 relance · J+3 urgence — puis mise en relation si signature', badge: null },
  { val: '0', label: 'intervention humaine dans le pipeline', desc: 'De l\'estimation en ligne au contrat signé — le système tourne 24h/24', badge: null },
  { val: '4 sem.', label: 'du brief à la mise en production', desc: 'Plugin WordPress + 4 workflows n8n déployés clés en main', badge: null },
  { val: '100%', label: 'des contrats pré-remplis automatiquement', desc: 'Nom, SIREN, dirigeant, zone — DocuSeal génère et envoie sans intervention', badge: null },
]

const otherCases = [
  { tag: 'SEO Automatisé', title: 'Ambassimmo — De zéro contenu à 30 articles/mois et #1 Google "ambassadeur immobilier"', time: null, href: '/etudes-de-cas/ambassimmo' },
  { tag: 'Prospection automatisée', title: "De l'estimation en ligne au contrat agence signé en moins de 5 minutes", time: null, href: '#hero' },
]

// ─── SVG HELPER ───────────────────────────────────────────────────────────────

function WorkflowSvg({ blocks, annotation, bottomLabel, ariaLabel }: {
  blocks: typeof svgBlocksPlugin,
  annotation: string,
  bottomLabel: string,
  ariaLabel: string,
}) {
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(20,20,19,0.1)', borderRadius: 12, padding: '40px 32px', overflowX: 'auto', marginBottom: 24 }}>
      <svg viewBox="0 0 1020 260" width="100%" style={{ minWidth: 700 }} aria-label={ariaLabel}>
        <rect x={308} y={16} width={404} height={32} rx={6} fill="rgba(232,98,26,0.06)" stroke="rgba(232,98,26,0.2)" strokeWidth={1} />
        <text x={510} y={36} textAnchor="middle" fontSize={11} fill="#E8621A" fontFamily="system-ui, sans-serif">{annotation}</text>
        <line x1={510} y1={48} x2={510} y2={72} stroke="rgba(232,98,26,0.3)" strokeWidth={1} strokeDasharray="3 3" />

        {blocks.map((block, i, arr) => (
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

        <rect x={330} y={210} width={360} height={30} rx={15} fill="rgba(13,27,62,0.05)" />
        <text x={510} y={229} textAnchor="middle" fontSize={11} fill="rgba(13,27,62,0.6)" fontFamily="system-ui, sans-serif">{bottomLabel}</text>
      </svg>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function AmbassimmoLeadsPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ambassimmoLeadsSchema) }}
      />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet" />

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
        }
        .ambas-hero-metrics { grid-template-columns: repeat(4, 1fr); }
        .ambas-context-grid { grid-template-columns: 1fr 260px; }
        .ambas-results-grid { grid-template-columns: repeat(3, 1fr); }
        .ambas-cta-grid     { grid-template-columns: 1fr auto; }
        .ambas-cases-grid   { grid-template-columns: repeat(2, 1fr); }
        @media (max-width: 768px) {
          .ambas-hero-metrics { grid-template-columns: repeat(2, 1fr) !important; }
          .ambas-context-grid { grid-template-columns: 1fr !important; }
          .ambas-results-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .ambas-cta-grid     { grid-template-columns: 1fr !important; }
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
        .ambas-site-link:hover { color: rgba(255,255,255,0.9) !important; }
      `}</style>

      <ScrollProgress />
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section id="hero" style={{ background: '#0D1B3E', paddingTop: 180, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>

        <div aria-hidden="true" style={{ position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)', width: 600, height: 260, background: 'radial-gradient(ellipse at 60% 50%, rgba(74,191,176,0.18) 0%, rgba(232,98,26,0.10) 45%, transparent 70%)', filter: 'blur(48px)', pointerEvents: 'none' }} />

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
              <span style={{ fontFamily: f.lora, fontSize: 36, fontWeight: 600, color: '#141413', letterSpacing: '-0.02em', lineHeight: 1, display: 'inline-block', padding: '10px 22px', borderRadius: 14, background: 'rgba(250,249,245,0.88)', backdropFilter: 'blur(24px) saturate(160%)', WebkitBackdropFilter: 'blur(24px) saturate(160%)', border: '1px solid rgba(250,249,245,0.6)', boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.06)' }}>Ambassimmo</span>
            </div>
          </nav>

          {/* Badges */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 4, background: 'rgba(232,98,26,0.15)', border: '1px solid rgba(232,98,26,0.3)', color: '#E8621A', fontFamily: f.pjs }}>
              Prospection automatisée
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 4, background: 'rgba(74,191,176,0.1)', border: '1px solid rgba(74,191,176,0.3)', color: 'rgba(255,255,255,0.9)', fontFamily: f.pjs }}>
              Pipeline leads
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 4, background: 'rgba(139,156,200,0.1)', border: '1px solid rgba(139,156,200,0.25)', color: 'rgba(255,255,255,0.75)', fontFamily: f.pjs }}>
              Plugin WordPress
            </span>
          </div>

          {/* Lien site client */}
          <a href="https://ambassimmo.com/" target="_blank" rel="noopener noreferrer" className="ambas-site-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontFamily: f.pjs, marginBottom: 40 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1.5A5.5 5.5 0 1 0 12.5 7 5.506 5.506 0 0 0 7 1.5Zm0 1a4.5 4.5 0 1 1-4.5 4.5A4.505 4.505 0 0 1 7 2.5Zm-.5 1v3.25l2.25 2.25.707-.707L7.5 6.35V3.5H6.5Z" fill="currentColor"/>
              <path d="M9.5 1.5v1H12v2.5h1V1.5H9.5ZM12 2.5l-4 4 .707.707 4-4L12 2.5Z" fill="currentColor"/>
            </svg>
            ambassimmo.com
          </a>

          {/* H1 */}
          <h1 style={{ fontFamily: f.lora, fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.02em', color: '#fff', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 28 }}>
            De l'estimation en ligne au contrat agence signé en moins de 5 minutes
          </h1>

          {/* Subtitle */}
          <p style={{ fontFamily: f.dm, fontSize: 20, lineHeight: 1.65, color: '#ffffff', fontWeight: 300, marginBottom: 48, maxWidth: 640 }}>
            Comment Ambassimmo a automatisé de A à Z la mise en relation entre vendeurs immobiliers et agences partenaires — sans aucune intervention humaine dans le pipeline.
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

          <FadeUp>
            <p style={{ fontSize: 13, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#8E8D89', marginBottom: 16, fontFamily: f.pjs }}>Le contexte</p>
            <h2 style={{ fontFamily: f.lora, fontSize: 28, fontWeight: 600, lineHeight: 1.3, marginBottom: 40, color: '#141413', maxWidth: 680 }}>
              Un modèle d'intermédiation sans outil pour connecter les trois acteurs de la transaction
            </h2>
          </FadeUp>

          <div className="ambas-context-grid" style={{ display: 'grid', gap: 64, alignItems: 'start' }}>

            <FadeUp>
              <p style={{ fontSize: 17, lineHeight: 1.75, fontWeight: 300, marginBottom: 18, color: '#5E5D59', fontFamily: f.dm, textAlign: 'justify' }}>
                Ambassimmo repose sur un modèle d&apos;intermédiation participative : des <strong style={{ fontWeight: 600, color: '#141413' }}>particuliers vendeurs</strong> qui estiment leur bien en ligne, des <strong style={{ fontWeight: 600, color: '#141413' }}>agences immobilières partenaires</strong> qui prennent en charge la transaction contre une rétrocession de commission, et des <strong style={{ fontWeight: 600, color: '#141413' }}>mécènes</strong> dont le sponsoring finance le modèle — une partie de chaque commission soutenant la lutte contre le cancer (Institut Gustave Roussy).
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, fontWeight: 300, marginBottom: 18, color: '#5E5D59', fontFamily: f.dm, textAlign: 'justify' }}>
                Le problème opérationnel était clair : <strong style={{ fontWeight: 600, color: '#141413' }}>chaque étape était manuelle</strong>. Quand un vendeur soumettait son bien, Patrick devait manuellement identifier les agences de proximité, trouver leurs coordonnées, rédiger et envoyer une proposition, relancer à la main, puis transmettre les données du vendeur à l'agence intéressée. Un processus impossible à scaler au-delà de quelques leads par semaine.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, fontWeight: 300, marginBottom: 18, color: '#5E5D59', fontFamily: f.dm, textAlign: 'justify' }}>
                <strong style={{ fontWeight: 600, color: '#141413' }}>La contrainte était double</strong> : il fallait d&apos;abord donner une raison aux vendeurs de soumettre leur bien (une vraie estimation, pas un formulaire vide), puis automatiser toute la chaîne de traitement sans perdre en qualité de ciblage des agences. Un outil de capture bas de gamme n&apos;aurait pas suffi — il fallait un plugin qui donne réellement de la valeur au vendeur avant même que Patrick intervienne.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.75, fontWeight: 300, color: '#5E5D59', fontFamily: f.dm, textAlign: 'justify' }}>
                La réponse : <strong style={{ fontWeight: 600, color: '#141413' }}>un pipeline complet en 4 couches</strong> — plugin WordPress d&apos;estimation basé sur les données officielles DVF, segmentation automatique dans Brevo, enrichissement des agences par API, et envoi automatisé du contrat AMI via DocuSeal avec relances intégrées.
              </p>
            </FadeUp>

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

          <FadeUp delay={0.05}>
            <h3 style={{ fontFamily: f.lora, fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#141413' }}>Workflow 1 — Plugin d'estimation & captation des leads</h3>
            <WorkflowSvg
              blocks={svgBlocksPlugin}
              annotation="Données DVF officielles · API Adresse · Estimation temps réel"
              bottomLabel="WordPress · React · n8n · Brevo · Google Sheets"
              ariaLabel="Workflow plugin estimation et captation leads"
            />
          </FadeUp>

          <FadeUp delay={0.1}>
            <h3 style={{ fontFamily: f.lora, fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#141413' }}>Workflow 2 — Enrichissement & qualification des agences</h3>
            <WorkflowSvg
              blocks={svgBlocksAgences}
              annotation="GPT-4o génère 10 requêtes géolocalisées · Top 8 agences filtrées"
              bottomLabel="Google Maps API · Pappers · Icypeas · DocuSeal"
              ariaLabel="Workflow enrichissement agences immobilières"
            />
          </FadeUp>

          <FadeUp delay={0.15}>
            <h3 style={{ fontFamily: f.lora, fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#141413' }}>Workflow 3 — Envoi contrat AMI & séquence de relance</h3>
            <WorkflowSvg
              blocks={svgBlocksContrat}
              annotation="Contrat pré-rempli · 3 emails automatiques · Mise en relation à la signature"
              bottomLabel="DocuSeal · SMTP · n8n · Webhook · Google Sheets"
              ariaLabel="Workflow envoi contrat AMI et relances"
            />
          </FadeUp>
        </div>
      </section>

      {/* ── RÉSULTATS ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: '#FAF9F5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 40px' }}>
          <FadeUp>
            <p style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#E8621A', marginBottom: 12, fontFamily: f.pjs }}>Ce que le système produit</p>
            <h3 style={{ fontFamily: f.lora, fontSize: 32, fontWeight: 600, marginBottom: 48, maxWidth: 540, color: '#141413', lineHeight: 1.2 }}>Un pipeline qui tourne seul, 24h/24</h3>
          </FadeUp>

          <div className="ambas-results-grid" style={{ display: 'grid', gap: 16 }}>
            {results.map((m, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div style={{ background: '#fff', border: '1px solid rgba(20,20,19,0.1)', borderRadius: 8, padding: '36px 28px', height: '100%', boxSizing: 'border-box' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
                    <div style={{ fontFamily: f.lora, fontSize: 44, fontWeight: 600, color: '#E8621A', lineHeight: 1, letterSpacing: '-0.02em' }}>{m.val}</div>
                    {m.badge && <span style={{ fontSize: 24, lineHeight: 1 }}>{m.badge}</span>}
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
              Laurent a conçu quelque chose que je n&apos;aurais jamais pu imaginer construire seul. Un vendeur remplit son estimation en ligne, et en moins de 5 minutes, 8 agences immobilières de son secteur reçoivent automatiquement un contrat à signer. Quand l&apos;une d&apos;elles signe, les coordonnées du vendeur lui sont envoyées instantanément. Tout ça sans que je lève le petit doigt.
            </blockquote>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#0D1B3E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
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
                  Prêt à automatiser votre pipeline de prospection ?
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.7, fontWeight: 300, color: '#5E5D59', fontFamily: f.dm }}>
                  45 minutes pour cartographier les flux que vous faites encore à la main.<br />
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
              <div className="ambas-cases-grid" style={{ display: 'grid', gap: 16 }}>
                {otherCases.map((c, i) => (
                  <a
                    key={i}
                    href={c.href}
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
