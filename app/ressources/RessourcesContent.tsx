'use client'
import { useState, useMemo, useEffect } from 'react'
import { DISCOVERY_URL } from '@/lib/constants'

/* ── Types ── */
type ItemType = 'skill' | 'resource'
type Category = 'Prospection' | 'SEO & Contenu' | 'Reporting' | 'Relation client' | 'Workflows n8n'

interface SkillItem {
  id: number
  type: 'skill'
  cat: Category
  icon: string
  title: string
  desc: string
  tags: string[]
  prompt: string
  downloadUrl?: string
}

interface ResourceItem {
  id: number
  type: 'resource'
  cat: Category
  icon: string
  title: string
  desc: string
  tags: string[]
  file: string
  format: string
}

type Item = SkillItem | ResourceItem

/* ── Palette catégories ── */
const CAT_COLORS: Record<string, string> = {
  'Prospection':    'rgba(232,98,26,1)',
  'SEO & Contenu':  'rgba(74,191,176,1)',
  'Reporting':      'rgba(139,156,200,1)',
  'Relation client':'rgba(13,27,62,1)',
  'Workflows n8n':  'rgba(100,160,80,1)',
}

const ALL_CATS  = ['Tous', 'Prospection', 'SEO & Contenu', 'Reporting', 'Relation client', 'Workflows n8n']
const ALL_TYPES = ['Tous', 'Skills Claude', 'Ressources']

/* ── Data ── */
const ITEMS: Item[] = [
  /* ── Skills ── */
  {
    id: 1, type: 'skill', cat: 'Prospection', icon: '◎',
    title: 'Prospection LinkedIn personnalisée',
    desc: "Génère un message d'approche ultra-ciblé à partir du profil LinkedIn d'un prospect : ton, accroche sectorielle, douleur probable.",
    tags: ['Prospection', 'Claude AI'],
    prompt: `Tu es un expert en prospection B2B. À partir du profil LinkedIn suivant, rédige un message de premier contact (max 300 caractères) qui :
- Montre que tu as lu son profil
- Identifie une douleur probable
- Propose une valeur concrète
- Inclut une question ouverte

Profil LinkedIn : [COLLER LE PROFIL ICI]

Secteur cible : [TON SECTEUR]
Offre : [TON OFFRE EN 1 PHRASE]`,
  },
  {
    id: 2, type: 'skill', cat: 'SEO & Contenu', icon: '✦',
    title: 'Article SEO-GEO local (2 000 mots)',
    desc: "Rédige un article optimisé pour une ville ou région cible, structuré pour le référencement local et la recherche IA (GEO).",
    tags: ['SEO', 'Claude AI'],
    prompt: `Rédige un article de 2 000 mots sur le sujet suivant, optimisé pour le référencement local et la recherche IA.

Sujet : [EX : automatisation commerciale à Montpellier]
Ville / région cible : [VILLE]
Mot-clé principal : [MOT-CLÉ]
Mots-clés secondaires : [MOT1, MOT2, MOT3]

Structure attendue :
- H1 : inclure ville + mot-clé
- Introduction (contexte local)
- 4 à 6 sections H2 avec sous-sections H3
- Données locales et chiffres si pertinent
- CTA final vers [TON OFFRE]
- Méta description (155 caractères max)`,
  },
  {
    id: 3, type: 'skill', cat: 'Reporting', icon: '▦',
    title: 'Rapport commercial hebdomadaire',
    desc: "Transforme un export brut (CSV, copier-coller) en rapport structuré avec analyse, points forts, alertes et recommandations.",
    tags: ['Reporting', 'Analyse'],
    prompt: `Tu es directeur commercial. À partir des données suivantes, génère un rapport hebdomadaire structuré :

[COLLER LES DONNÉES ICI]

Le rapport doit inclure :
1. Synthèse exécutive (3 lignes max)
2. KPIs clés vs semaine précédente
3. Top 3 opportunités à prioriser
4. Points d'alerte
5. Actions recommandées pour la semaine suivante

Ton : direct, factuel, orienté action.`,
  },
  {
    id: 4, type: 'skill', cat: 'Prospection', icon: '⚡',
    title: 'Qualifier des leads entrants',
    desc: "Score et qualifie automatiquement un lead entrant selon les critères BANT (Budget, Autorité, Besoin, Timing).",
    tags: ['Qualification', 'Prospection'],
    prompt: `Analyse ce lead entrant et évalue sa qualification selon les critères BANT.

Informations disponibles : [COLLER EMAIL/FORMULAIRE/FICHE]

Pour chaque critère, donne :
- Score de 1 à 5
- Justification en 1 phrase
- Information manquante à demander

Conclusion : Lead chaud / tiède / froid + prochaine action recommandée.`,
  },
  {
    id: 5, type: 'skill', cat: 'Prospection', icon: '▶',
    title: "Objets d'email A/B × 5",
    desc: "Génère 5 variantes d'objet email testables, optimisées pour le taux d'ouverture B2B selon le contexte et la cible.",
    tags: ['Email', 'A/B Testing'],
    prompt: `Génère 5 objets d'email pour une campagne B2B. Chaque objet doit explorer un angle différent.

Contexte : [DÉCRIRE LA CAMPAGNE]
Cible : [PERSONA / POSTE / SECTEUR]
Offre : [CE QUE TU PROPOSES]

Angles à couvrir :
1. Question directe
2. Chiffre ou statistique
3. Curiosité / mystère
4. Bénéfice immédiat
5. Personnalisation poussée

Pour chaque objet : texte (max 50 car.) + explication de l'angle.`,
  },
  {
    id: 6, type: 'skill', cat: 'Relation client', icon: '◈',
    title: 'Résumer un appel commercial',
    desc: "Transforme une transcription (ou notes brutes) d'appel en compte-rendu structuré avec prochaines étapes et signaux faibles.",
    tags: ['CRM', 'Relation client'],
    prompt: `À partir de la transcription/notes d'appel ci-dessous, génère un compte-rendu commercial structuré.

[COLLER LA TRANSCRIPTION OU LES NOTES]

Format attendu :
- Contexte client (2 lignes)
- Douleurs exprimées
- Objections soulevées
- Signaux d'intérêt (citer les verbatims clés)
- Décision/engagement obtenu
- Prochaines étapes avec date et responsable
- Score d'avancement dans le cycle (1-10)`,
  },
  {
    id: 7, type: 'skill', cat: 'Workflows n8n', icon: '⚙',
    title: 'Débogguer un workflow n8n',
    desc: "Analyse un workflow n8n en erreur et identifie la cause racine, les nœuds problématiques et les correctifs à appliquer.",
    tags: ['n8n', 'Débogage'],
    prompt: `Tu es expert n8n. Analyse ce workflow en erreur et identifie le problème.

Message d'erreur : [COLLER L'ERREUR]
JSON du workflow (ou description des nœuds) : [COLLER LE JSON OU LA DESCRIPTION]

Donne :
1. Cause racine probable
2. Nœud(s) en cause
3. Correctif étape par étape
4. Bonne pratique à appliquer pour éviter la récurrence

Si tu as besoin d'informations supplémentaires, pose 1 seule question.`,
  },
  {
    id: 8, type: 'skill', cat: 'SEO & Contenu', icon: '✦',
    title: 'Fiche Google My Business optimisée',
    desc: "Génère tous les contenus d'une fiche GMB (description, services, posts, Q&A) pour maximiser la visibilité locale.",
    tags: ['SEO local', 'GMB'],
    prompt: `Génère les contenus optimisés pour une fiche Google My Business.

Entreprise : [NOM]
Secteur : [SECTEUR]
Ville : [VILLE]
Offre principale : [OFFRE]
Public cible : [CIBLE]

À produire :
1. Description courte (250 car.) — inclure mot-clé + ville
2. Description longue (750 car.) — storytelling + bénéfices
3. 3 posts GMB (actualité, offre, conseil)
4. 5 questions/réponses Q&A probables
5. 5 catégories secondaires recommandées`,
  },
  {
    id: 9, type: 'skill', cat: 'Reporting', icon: '⊕',
    title: 'Analyse de pipeline commercial',
    desc: "Identifie les blocages, opportunités et priorités dans un pipeline CRM exporté, avec recommandations actionnables.",
    tags: ['Pipeline', 'CRM'],
    prompt: `Analyse ce pipeline commercial et donne des recommandations stratégiques.

Données pipeline : [COLLER L'EXPORT CRM]

Analyse demandée :
1. Distribution par étape et taux de conversion inter-étapes
2. Âge moyen des opportunités (identifier les zombies)
3. Top 5 deals à prioriser cette semaine (avec justification)
4. Deals à risque de perdre (signaux d'alerte)
5. Forecast réaliste du mois
6. 3 actions immédiates pour accélérer le cycle`,
  },
  {
    id: 10, type: 'skill', cat: 'Relation client', icon: '◈',
    title: 'Séquence de nurturing email × 5',
    desc: "Crée une séquence de 5 emails de nurturing pour accompagner un lead froid vers la décision, avec espacements et objectifs.",
    tags: ['Email', 'Nurturing'],
    prompt: `Crée une séquence de nurturing de 5 emails pour convertir un lead froid.

Contexte : [DÉCRIRE LE LEAD ET SON STADE]
Offre finale : [CE QU'ON VEUT LUI VENDRE]
Durée totale de la séquence : [EX : 3 semaines]

Pour chaque email :
- Jour d'envoi
- Objet (max 50 car.)
- Objectif psychologique
- Corps (150-200 mots)
- CTA

Progression : valeur → preuve sociale → urgence douce → offre → dernière chance.`,
  },

  /* ── Ressources ── */
  {
    id: 11, type: 'resource', cat: 'Prospection', icon: '◻',
    title: 'Carte des Opportunités — Guide PDF',
    desc: "Méthodologie complète pour auditer vos processus et identifier vos 3 leviers d'automatisation prioritaires.",
    tags: ['PDF', 'Méthodologie'],
    file: '#',
    format: 'PDF · 18 pages',
  },
  {
    id: 12, type: 'resource', cat: 'Workflows n8n', icon: '⚙',
    title: 'Template Workflow Prospection n8n',
    desc: "Workflow n8n prêt à l'emploi : scraping LinkedIn → enrichissement Claude → injection Brevo. 47 nœuds documentés.",
    tags: ['JSON', 'n8n'],
    file: '#',
    format: 'JSON · n8n v1.x',
  },
  {
    id: 13, type: 'resource', cat: 'Prospection', icon: '▶',
    title: 'Prompt Library — 50 prompts commerciaux',
    desc: "Bibliothèque de 50 prompts Claude testés et optimisés pour la prospection, la qualification et le closing B2B.",
    tags: ['PDF', 'Prompts'],
    file: '#',
    format: 'PDF · 50 prompts',
  },
  {
    id: 14, type: 'resource', cat: 'Reporting', icon: '▦',
    title: 'Checklist Audit IA PME',
    desc: "30 questions pour évaluer la maturité IA de votre entreprise et prioriser les chantiers d'automatisation.",
    tags: ['PDF', 'Audit'],
    file: '#',
    format: 'PDF · 30 critères',
  },
  {
    id: 15, type: 'resource', cat: 'Reporting', icon: '⊕',
    title: 'Dashboard Notion — Pilotage commercial',
    desc: "Template Notion clé-en-main : KPIs hebdo, suivi pipeline, rapport auto, objectifs trimestriels.",
    tags: ['Notion', 'Template'],
    file: '#',
    format: 'Notion · Duplicate',
  },
  {
    id: 16, type: 'resource', cat: 'SEO & Contenu', icon: '✦',
    title: 'SEO-GEO Machine — Guide complet',
    desc: "Comment générer 24 articles locaux par mois avec Claude + DataForSEO + WordPress. Process complet étape par étape.",
    tags: ['PDF', 'SEO'],
    file: '#',
    format: 'PDF · 32 pages',
  },
]

/* ── Hero ── */
function Hero({ search, setSearch, count }: { search: string; setSearch: (v: string) => void; count: number }) {
  return (
    <section style={{ background: '#FAF9F5', paddingTop: 140, paddingBottom: 72, borderBottom: '1px solid rgba(20,20,19,.1)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 40px' }}>
        <div style={{ width: 56, height: 56, borderRadius: 12, background: 'rgba(232,98,26,.08)', border: '1px solid rgba(232,98,26,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 28 }}>✦</div>
        <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-.02em', color: '#141413', marginBottom: 20 }}>
          Explorez les Skills Claude<br />et les ressources Sales Experienz
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.65, color: '#5E5D59', fontWeight: 300, marginBottom: 36, maxWidth: 560 }}>
          Prompts testés, workflows n8n, guides PDF et templates prêts à l&apos;emploi — tout ce qu&apos;il faut pour automatiser votre croissance.
        </p>
        <div style={{ position: 'relative', maxWidth: 480 }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#8E8D89', fontSize: 15, pointerEvents: 'none' }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Rechercher parmi ${count} ressources…`}
            style={{ width: '100%', fontSize: 15, color: '#141413', background: '#fff', border: '1px solid rgba(20,20,19,.1)', borderRadius: 9999, padding: '12px 18px 12px 40px', outline: 'none', transition: 'border .2s' }}
            onFocus={e => (e.target.style.border = '1px solid #E8621A')}
            onBlur={e => (e.target.style.border = '1px solid rgba(20,20,19,.1)')}
          />
        </div>
      </div>
    </section>
  )
}

/* ── Sidebar ── */
function Sidebar({ cat, setCat, type, setType }: {
  cat: string; setCat: (c: string) => void
  type: string; setType: (t: string) => void
}) {
  const [openCat, setOpenCat] = useState(true)
  const [openType, setOpenType] = useState(true)

  return (
    <aside style={{ width: 200, flexShrink: 0, paddingTop: 8 }}>
      <div style={{ marginBottom: 24 }}>
        <button
          onClick={() => setOpenCat(!openCat)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.12em', color: '#5E5D59' }}
        >
          Catégorie
          <span style={{ transition: 'transform .2s', display: 'inline-block', transform: openCat ? 'rotate(180deg)' : 'none', color: '#8E8D89' }}>▾</span>
        </button>
        {openCat && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
            {ALL_CATS.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                style={{ textAlign: 'left', background: cat === c ? 'rgba(232,98,26,.08)' : 'none', border: 'none', cursor: 'pointer', padding: '7px 10px', borderRadius: 6, fontSize: 13, color: cat === c ? '#E8621A' : '#5E5D59', fontWeight: cat === c ? 600 : 400, transition: 'all .15s', display: 'flex', alignItems: 'center', gap: 8 }}
                onMouseEnter={e => { if (cat !== c) e.currentTarget.style.background = 'rgba(0,0,0,.04)' }}
                onMouseLeave={e => { if (cat !== c) e.currentTarget.style.background = 'none' }}
              >
                {c !== 'Tous' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: CAT_COLORS[c] || '#ccc', flexShrink: 0, display: 'inline-block' }} />}
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginBottom: 24, paddingTop: 16, borderTop: '1px solid rgba(20,20,19,.1)' }}>
        <button
          onClick={() => setOpenType(!openType)}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.12em', color: '#5E5D59' }}
        >
          Type
          <span style={{ transition: 'transform .2s', display: 'inline-block', transform: openType ? 'rotate(180deg)' : 'none', color: '#8E8D89' }}>▾</span>
        </button>
        {openType && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
            {ALL_TYPES.map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                style={{ textAlign: 'left', background: type === t ? 'rgba(232,98,26,.08)' : 'none', border: 'none', cursor: 'pointer', padding: '7px 10px', borderRadius: 6, fontSize: 13, color: type === t ? '#E8621A' : '#5E5D59', fontWeight: type === t ? 600 : 400, transition: 'all .15s' }}
                onMouseEnter={e => { if (type !== t) e.currentTarget.style.background = 'rgba(0,0,0,.04)' }}
                onMouseLeave={e => { if (type !== t) e.currentTarget.style.background = 'none' }}
              >{t}</button>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}

/* ── Skill card ── */
function SkillCard({ item, onOpen }: { item: SkillItem; onOpen: (i: SkillItem) => void }) {
  return (
    <div
      onClick={() => onOpen(item)}
      style={{ background: '#fff', border: '1px solid rgba(20,20,19,.1)', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', transition: 'all .2s', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,.08)'; e.currentTarget.style.borderColor = 'rgba(232,98,26,.25)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(20,20,19,.1)' }}
    >
      <div style={{ height: 3, background: CAT_COLORS[item.cat] || '#ccc' }} />
      <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `${CAT_COLORS[item.cat]}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
          <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: '#E8621A', background: 'rgba(232,98,26,.08)', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(232,98,26,.15)', whiteSpace: 'nowrap' }}>Skill</span>
        </div>
        <div>
          <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 16, fontWeight: 600, lineHeight: 1.35, color: '#141413', marginBottom: 8 }}>{item.title}</h3>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: '#5E5D59', fontWeight: 300 }}>{item.desc}</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 8 }}>
          {item.tags.map(t => <span key={t} style={{ fontSize: 11, color: '#8E8D89', background: '#FAF9F5', border: '1px solid rgba(20,20,19,.1)', borderRadius: 4, padding: '2px 8px' }}>{t}</span>)}
        </div>
      </div>
      <div style={{ padding: '0 24px 20px' }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: '#E8621A', display: 'flex', alignItems: 'center', gap: 4 }}>Voir le prompt →</span>
      </div>
    </div>
  )
}

/* ── Resource card ── */
function ResourceCard({ item }: { item: ResourceItem }) {
  const btnLabel = item.cat === 'Workflows n8n' ? '⊞ Consulter le Workflow' : '⬇ Obtenir la ressource'
  const isAvailable = item.file !== '#'

  return (
    <div
      style={{ background: '#fff', border: '1px solid rgba(20,20,19,.1)', borderRadius: 12, overflow: 'hidden', transition: 'all .2s', display: 'flex', flexDirection: 'column' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,.08)'; e.currentTarget.style.borderColor = 'rgba(74,191,176,.3)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(20,20,19,.1)' }}
    >
      <div style={{ height: 3, background: CAT_COLORS[item.cat] || '#ccc' }} />
      <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `${CAT_COLORS[item.cat]}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{item.icon}</div>
          <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: '#4ABFB0', background: 'rgba(74,191,176,.08)', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(74,191,176,.2)', whiteSpace: 'nowrap' }}>Ressource</span>
        </div>
        <div>
          <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 16, fontWeight: 600, lineHeight: 1.35, color: '#141413', marginBottom: 8 }}>{item.title}</h3>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: '#5E5D59', fontWeight: 300 }}>{item.desc}</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 4 }}>
          {item.tags.map(t => <span key={t} style={{ fontSize: 11, color: '#8E8D89', background: '#FAF9F5', border: '1px solid rgba(20,20,19,.1)', borderRadius: 4, padding: '2px 8px' }}>{t}</span>)}
        </div>
        <div style={{ fontSize: 12, color: '#8E8D89', paddingTop: 4 }}>{item.format}</div>
      </div>
      <div style={{ padding: '0 24px 20px' }}>
        {isAvailable ? (
          <a
            href={item.file}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#fff', background: '#0D1B3E', borderRadius: 9999, padding: '8px 18px', textDecoration: 'none', transition: 'all .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E8621A' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0D1B3E' }}
          >{btnLabel}</a>
        ) : (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#8E8D89', background: '#F0F0EE', borderRadius: 9999, padding: '8px 18px', cursor: 'not-allowed' }}>
            Bientôt disponible
          </span>
        )}
      </div>
    </div>
  )
}

/* ── List row ── */
function ListRow({ item, onOpen }: { item: Item; onOpen: (i: SkillItem) => void }) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '18px 20px', background: '#fff', border: '1px solid rgba(20,20,19,.1)', borderRadius: 10, cursor: item.type === 'skill' ? 'pointer' : 'default', transition: 'all .2s' }}
      onClick={() => item.type === 'skill' && onOpen(item as SkillItem)}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,98,26,.25)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,.05)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(20,20,19,.1)'; e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ width: 4, height: 40, borderRadius: 2, background: CAT_COLORS[item.cat] || '#ccc', flexShrink: 0 }} />
      <div style={{ width: 36, height: 36, borderRadius: 8, background: `${CAT_COLORS[item.cat]}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 15, fontWeight: 600, color: '#141413', marginBottom: 3, lineHeight: 1.3 }}>{item.title}</div>
        <div style={{ fontSize: 12, color: '#8E8D89', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.desc}</div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', color: item.type === 'skill' ? '#E8621A' : '#4ABFB0', background: item.type === 'skill' ? 'rgba(232,98,26,.08)' : 'rgba(74,191,176,.08)', padding: '3px 8px', borderRadius: 4, border: `1px solid ${item.type === 'skill' ? 'rgba(232,98,26,.15)' : 'rgba(74,191,176,.2)'}` }}>{item.type === 'skill' ? 'Skill' : 'Ressource'}</span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 500, color: '#E8621A', flexShrink: 0 }}>{item.type === 'skill' ? 'Voir →' : '⬇'}</div>
    </div>
  )
}

/* ── Prompt modal ── */
function PromptModal({ item, onClose }: { item: SkillItem; onClose: () => void }) {
  const [copied, setCopied]   = useState(false)
  const [prenom, setPrenom]   = useState('')
  const [email, setEmail]     = useState('')
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]     = useState('')
  // true = email déjà connu via localStorage
  const [knownUser, setKnownUser] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Restaurer depuis localStorage au montage
  useEffect(() => {
    const saved = localStorage.getItem('se_lead_email')
    if (saved) {
      setEmail(saved)
      setPrenom(localStorage.getItem('se_lead_prenom') || '')
      setKnownUser(true)
    }
  }, [])

  const copy = () => {
    navigator.clipboard.writeText(item.prompt).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const submitLead = async (skipForm = false) => {
    if (!email) { setError('Merci de renseigner votre email.'); return }
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/ressources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, prenom, skill: item.title }),
      })
      if (!res.ok && !skipForm) throw new Error()
      // Sauvegarder pour les prochaines fois
      localStorage.setItem('se_lead_email', email)
      if (prenom) localStorage.setItem('se_lead_prenom', prenom)
      setSubmitted(true)
      if (item.downloadUrl && item.downloadUrl !== '#') {
        window.open(item.downloadUrl, '_blank', 'noopener,noreferrer')
      }
    } catch {
      setError('Une erreur est survenue. Réessayez.')
    } finally {
      setSending(false)
    }
  }

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    await submitLead()
  }

  // Pour un utilisateur connu : téléchargement direct sans formulaire
  const handleDirectDownload = () => submitLead(true)

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(13,27,62,.7)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div style={{ background: '#fff', borderRadius: 16, padding: 40, maxWidth: 600, width: '100%', position: 'relative', maxHeight: '88vh', overflowY: 'auto' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,.06)', border: 'none', width: 30, height: 30, borderRadius: '50%', cursor: 'pointer', fontSize: 14, color: '#5E5D59', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >✕</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: `${CAT_COLORS[item.cat]}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.12em', color: '#E8621A', marginBottom: 3 }}>{item.cat}</div>
            <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 20, fontWeight: 600, lineHeight: 1.25, color: '#141413' }}>{item.title}</h3>
          </div>
        </div>

        <p style={{ fontSize: 14, lineHeight: 1.65, color: '#5E5D59', marginBottom: 20 }}>{item.desc}</p>

        <div style={{ background: '#FAF9F5', border: '1px solid rgba(20,20,19,.1)', borderRadius: 10, padding: 20, marginBottom: 16 }}>
          <pre style={{ fontFamily: "'Courier New', monospace", fontSize: 13, lineHeight: 1.7, color: '#141413', whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>{item.prompt}</pre>
        </div>

        <button
          onClick={copy}
          style={{ width: '100%', fontSize: 15, fontWeight: 500, color: '#fff', background: copied ? '#2d9e5b' : '#0D1B3E', border: 'none', borderRadius: 9999, padding: 12, cursor: 'pointer', transition: 'all .2s', marginBottom: 24 }}
        >
          {copied ? '✓ Copié !' : 'Copier le prompt'}
        </button>

        {/* Download section */}
        <div style={{ borderTop: '1px solid rgba(20,20,19,.08)', paddingTop: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.12em', color: '#8E8D89', marginBottom: 16 }}>Télécharger ce skill</div>

          {submitted ? (
            <div style={{ background: 'rgba(45,158,91,.06)', border: '1px solid rgba(45,158,91,.2)', borderRadius: 10, padding: '16px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>✓</div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#2d9e5b', marginBottom: 4 }}>C&apos;est noté !</p>
              {item.downloadUrl && item.downloadUrl !== '#'
                ? <p style={{ fontSize: 13, color: '#5E5D59' }}>Le téléchargement a démarré automatiquement.</p>
                : <p style={{ fontSize: 13, color: '#5E5D59' }}>Ce skill sera bientôt disponible — nous vous préviendrons par email dès sa mise en ligne.</p>
              }
            </div>
          ) : knownUser ? (
            /* Utilisateur déjà connu — téléchargement en 1 clic */
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={handleDirectDownload}
                disabled={sending}
                style={{ width: '100%', fontSize: 14, fontWeight: 500, color: '#fff', background: sending ? '#8E8D89' : '#E8621A', border: 'none', borderRadius: 9999, padding: '11px 0', cursor: sending ? 'not-allowed' : 'pointer', transition: 'all .2s' }}
              >
                {sending ? 'Envoi…' : '⬇ Télécharger le skill'}
              </button>
              {error && <p style={{ fontSize: 12, color: '#c0392b', margin: 0, textAlign: 'center' }}>{error}</p>}
            </div>
          ) : (
            /* Nouvel utilisateur — formulaire */
            <form onSubmit={handleDownload} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                type="text"
                placeholder="Votre prénom"
                value={prenom}
                onChange={e => setPrenom(e.target.value)}
                style={{ width: '100%', background: '#FAF9F5', border: '1px solid rgba(20,20,19,.12)', borderRadius: 8, padding: '11px 14px', fontSize: 14, color: '#141413', outline: 'none' }}
                onFocus={e => (e.target.style.border = '1px solid #E8621A')}
                onBlur={e => (e.target.style.border = '1px solid rgba(20,20,19,.12)')}
              />
              <input
                type="email"
                placeholder="Votre adresse email *"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{ width: '100%', background: '#FAF9F5', border: '1px solid rgba(20,20,19,.12)', borderRadius: 8, padding: '11px 14px', fontSize: 14, color: '#141413', outline: 'none' }}
                onFocus={e => (e.target.style.border = '1px solid #E8621A')}
                onBlur={e => (e.target.style.border = '1px solid rgba(20,20,19,.12)')}
              />
              {error && <p style={{ fontSize: 12, color: '#c0392b', margin: 0 }}>{error}</p>}
              <button
                type="submit"
                disabled={sending}
                style={{ width: '100%', fontSize: 14, fontWeight: 500, color: '#fff', background: sending ? '#8E8D89' : '#E8621A', border: 'none', borderRadius: 9999, padding: '11px 0', cursor: sending ? 'not-allowed' : 'pointer', transition: 'all .2s' }}
              >
                {sending ? 'Envoi…' : '⬇ Télécharger le skill'}
              </button>
              <p style={{ fontSize: 11, color: '#B0AFAB', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
                En soumettant ce formulaire, vous acceptez de recevoir des communications de Sales Experienz. Conformément au RGPD, vous pouvez vous désabonner à tout moment.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── App ── */
export default function RessourcesContent() {
  const [search, setSearch]       = useState('')
  const [cat, setCat]             = useState('Tous')
  const [type, setType]           = useState('Tous')
  const [view, setView]           = useState<'grid' | 'list'>('grid')
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null)

  const filtered = useMemo(() => ITEMS.filter(item => {
    if (cat !== 'Tous' && item.cat !== cat) return false
    if (type === 'Skills Claude' && item.type !== 'skill') return false
    if (type === 'Ressources' && item.type !== 'resource') return false
    if (search) {
      const q = search.toLowerCase()
      return item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q) || item.tags.some(t => t.toLowerCase().includes(q))
    }
    return true
  }), [cat, type, search])

  const skills    = filtered.filter((i): i is SkillItem    => i.type === 'skill')
  const resources = filtered.filter((i): i is ResourceItem => i.type === 'resource')

  return (
    <>
      <Hero search={search} setSearch={setSearch} count={ITEMS.length} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 40px', display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <Sidebar cat={cat} setCat={setCat} type={type} setType={setType} />

        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
            <p style={{ fontSize: 14, color: '#8E8D89' }}>
              <strong style={{ color: '#141413', fontWeight: 600 }}>{filtered.length}</strong> résultat{filtered.length !== 1 ? 's' : ''}{cat !== 'Tous' ? ` · ${cat}` : ''}
            </p>
            <div style={{ display: 'flex', gap: 4, background: '#fff', border: '1px solid rgba(20,20,19,.1)', borderRadius: 8, padding: 3 }}>
              {(['grid', 'list'] as const).map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  style={{ fontSize: 13, padding: '5px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', background: view === v ? '#E8621A' : 'transparent', color: view === v ? '#fff' : '#8E8D89', transition: 'all .15s' }}
                >
                  {v === 'grid' ? '⊞ Grille' : '☰ Liste'}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#8E8D89' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>◎</div>
              <p style={{ fontSize: 15 }}>Aucun résultat pour « {search} »</p>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: '#E8621A' }}>Skills Claude</h2>
                <span style={{ fontSize: 12, color: '#8E8D89', background: '#FAF9F5', border: '1px solid rgba(20,20,19,.1)', borderRadius: 9999, padding: '1px 8px' }}>{skills.length}</span>
              </div>
              {view === 'grid'
                ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16 }}>
                    {skills.map(item => <SkillCard key={item.id} item={item} onOpen={setActiveSkill} />)}
                  </div>
                : <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {skills.map(item => <ListRow key={item.id} item={item} onOpen={setActiveSkill} />)}
                  </div>
              }
            </div>
          )}

          {/* Resources */}
          {resources.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.14em', color: '#4ABFB0' }}>Ressources à télécharger</h2>
                <span style={{ fontSize: 12, color: '#8E8D89', background: '#FAF9F5', border: '1px solid rgba(20,20,19,.1)', borderRadius: 9999, padding: '1px 8px' }}>{resources.length}</span>
              </div>
              {view === 'grid'
                ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16 }}>
                    {resources.map(item => <ResourceCard key={item.id} item={item} />)}
                  </div>
                : <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {resources.map(item => <ListRow key={item.id} item={item} onOpen={() => {}} />)}
                  </div>
              }
            </div>
          )}

          {/* CTA block */}
          <div style={{ marginTop: 64, background: '#0D1B3E', borderRadius: 16, padding: '40px 48px', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.18em', color: '#4ABFB0' }}>Diagnostic gratuit</div>
            <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: 'clamp(22px,3vw,28px)', fontWeight: 600, color: '#fff', lineHeight: 1.25 }}>
              Ces outils vous intéressent ?<br />Voyons comment les appliquer à votre cas.
            </h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,.65)', lineHeight: 1.65 }}>
              45 minutes pour identifier vos 3 leviers de croissance prioritaires.
            </p>
            <a
              href={DISCOVERY_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 500, color: '#fff', background: '#E8621A', borderRadius: 9999, padding: '12px 28px', textDecoration: 'none', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FF7D35'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#E8621A'; e.currentTarget.style.transform = 'none' }}
            >
              Réserver mon appel gratuit →
            </a>
          </div>
        </div>
      </div>

      {activeSkill && <PromptModal item={activeSkill} onClose={() => setActiveSkill(null)} />}
    </>
  )
}
