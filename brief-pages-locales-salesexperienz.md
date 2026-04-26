# BRIEF — Pages locales SalesExperienz
## Duplication homepage × 6 villes (Vague 1)
### Destinataire : Claude Code · Next.js 15 App Router
### Version : 1.0 — Avril 2026

---

## 0. CONTEXTE ET OBJECTIF

**Site cible :** https://www.salesexperienz.fr  
**Framework :** Next.js 15 App Router — Tailwind CSS v4 — Framer Motion — Sanity.io — Vercel

**Ce qu'on fait :** Créer 6 pages locales qui dupliquent la structure de la homepage (`app/page.tsx`) avec 50% de contenu fixe (identique à la homepage) et 50% personnalisé par ville.

**Modèle de référence :** https://mama-seo.fr/ — voir notamment le footer avec la colonne "Pages SEO" listant toutes les villes.

**Mot-clé principal ciblé :** `expert automatisation commerciale [ville]`

---

## 1. INSTRUCTIONS GÉNÉRALES POUR CLAUDE CODE

### 1.1 Commencer par une seule ville de test

> ⚠️ OBLIGATION ABSOLUE : ne créer qu'une seule ville en premier — **Paris** — et attendre la validation avant de dupliquer sur les 5 autres.

L'ordre de travail est :
1. Créer et tester la page Paris
2. Soumettre pour validation
3. Seulement après validation : dupliquer pour Lyon, Marseille, Toulouse, Nantes, Nice

### 1.2 Architecture des routes

Routes à la **racine du site**, pas dans `/services/` :

```
app/
├── expert-automatisation-commerciale-paris/
│   └── page.tsx
├── expert-automatisation-commerciale-lyon/
│   └── page.tsx
├── expert-automatisation-commerciale-marseille/
│   └── page.tsx
├── expert-automatisation-commerciale-toulouse/
│   └── page.tsx
├── expert-automatisation-commerciale-nantes/
│   └── page.tsx
└── expert-automatisation-commerciale-nice/
    └── page.tsx
```

### 1.3 Stratégie de données : hardcode dans chaque page.tsx

Ne pas passer par Sanity pour cette vague de test. Toutes les variables locales sont hardcodées directement dans chaque `page.tsx`. Raison : validation rapide du concept avant d'industrialiser.

Si la vague 1 est validée, les variables seront migrées vers Sanity pour les vagues 2 et 3.

### 1.4 Ne rien modifier dans les fichiers existants... sauf deux

Les seuls fichiers existants à modifier sont :
- `components/Footer.tsx` → ajouter la colonne "Pages locales" (voir Section 4)
- `app/sitemap.ts` → ajouter les 6 nouvelles URLs

Tout le reste du site reste intact.

---

## 2. STRUCTURE DE CHAQUE PAGE LOCALE

### 2.1 Composants — ce qui est fixe vs ce qui change

| Composant | Statut | Notes |
|-----------|--------|-------|
| `<Navbar />` | ✅ Fixe | Import identique |
| `<Hero />` | ⚙️ Variable | Props modifiées (voir Section 3) |
| `<WhyAutomate />` | ✅ Fixe | Import identique, aucune prop |
| `<OpportunityMap />` | ✅ Fixe | Import identique, aucune prop |
| `<WhatToAutomate />` | ✅ Fixe | Import identique, aucune prop |
| `<HowItWorks />` | ✅ Fixe | Import identique, aucune prop |
| `<Services />` | ✅ Fixe | Import identique — passer `settings={undefined}` |
| `<LocalCases />` | 🆕 Nouveau | Composant à créer — 2 exemples clients géolocalisés |
| `<About />` | ✅ Fixe | Import identique |
| `<FAQ />` | ⚙️ Variable | FAQ localisée (voir Section 3) |
| `<FinalCTA />` | ✅ Fixe | Import identique |
| `<RecentArticles />` | ✅ Fixe | Import identique |
| `<SocialBlock />` | ✅ Fixe | Import identique |
| `<Footer />` | ⚙️ Modifié | Ajout colonne villes (voir Section 4) |

### 2.2 Template de page.tsx

```tsx
// app/expert-automatisation-commerciale-[ville]/page.tsx

import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WhyAutomate from '@/components/WhyAutomate'
import OpportunityMap from '@/components/OpportunityMap'
import WhatToAutomate from '@/components/WhatToAutomate'
import HowItWorks from '@/components/HowItWorks'
import Services from '@/components/Services'
import LocalCases from '@/components/LocalCases'
import About from '@/components/About'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import RecentArticles from '@/components/RecentArticles'
import SocialBlock from '@/components/SocialBlock'
import Footer from '@/components/Footer'

// ─── METADATA ────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: '[TITLE_TAG]',
  description: '[META_DESCRIPTION]',
  alternates: {
    canonical: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-[ville]',
  },
  openGraph: {
    title: '[TITLE_TAG]',
    description: '[META_DESCRIPTION]',
    url: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-[ville]',
    siteName: 'Sales Experienz',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: 'https://www.salesexperienz.fr/og-[ville].jpg', width: 1200, height: 630 }],
  },
}

// ─── JSON-LD ─────────────────────────────────────────────────────────
const schemaLocal = { /* voir Section 5 */ }

// ─── HERO SETTINGS ───────────────────────────────────────────────────
const heroSettings = { /* voir Section 3 */ }

// ─── FAQ SETTINGS ────────────────────────────────────────────────────
const faqSettings = { /* voir Section 3 */ }

// ─── LOCAL CASES ─────────────────────────────────────────────────────
const localCases = { /* voir Section 3 */ }

export default function PageLocale() {
  return (
    <main>
      <Navbar />
      <Hero settings={heroSettings} />
      <WhyAutomate />
      <OpportunityMap />
      <WhatToAutomate />
      <HowItWorks />
      <Services />
      <LocalCases cases={localCases} ville="[Ville]" />
      <About />
      <FAQ settings={faqSettings} />
      <FinalCTA />
      <RecentArticles />
      <SocialBlock />
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLocal) }}
      />
    </main>
  )
}
```

---

## 3. VARIABLES PAR VILLE

### Format des heroSettings

```ts
const heroSettings = {
  heroPreTitle: 'SALESEXPERIENZ · AUTOMATISATION IA · [VILLE, DÉPARTEMENT]',
  heroTitleMain: 'Automatisation commerciale à [Ville] :',
  heroTitleAccent: 'vos prospects détectés avant vos concurrents',
  heroBadge: '📍 [VILLE] · [DÉPARTEMENT]',
  heroSubtitle1: '[ACCROCHE_1 — spécifique au tissu économique local]',
  heroSubtitle2: '[ACCROCHE_2 — contexte local + résultat Deep Signal]',
  heroCTA: 'Je veux accélérer ma croissance',
  heroCTASub: 'Sans engagement — 45 minutes',
}
```

### Format des faqSettings

```ts
const faqSettings = {
  faq: [
    { question: '...', answer: '...' },
    // 6 questions — mêmes thèmes que la homepage, réponses localisées
  ]
}
```

### Format localCases (nouveau composant)

```ts
const localCases = {
  case1: {
    sector: '[secteur]',
    location: '[Ville / Quartier]',
    result: '+XX RDV/mois en 30 jours',
    detail: '[détail contextuel]',
  },
  case2: {
    sector: '[secteur]',
    location: '[Ville / Quartier]',
    result: '[résultat chiffré]',
    detail: '[détail contextuel]',
  },
}
```

---

### 3.1 PARIS (ville de test)

**URL :** `/expert-automatisation-commerciale-paris`  
**Département :** Paris (75) · Île-de-France

**Title tag (≤70 chars) :**
```
Expert automatisation commerciale Paris — SalesExperienz
```

**Meta description (≤155 chars) :**
```
Automatisez votre prospection B2B à Paris avec Deep Signal : détection de signaux d'intention, personnalisation IA, 10 à 60 RDV/mois. Audit gratuit 45 min.
```

**heroSettings :**
```ts
{
  heroPreTitle: 'SALESEXPERIENZ · AUTOMATISATION IA · PARIS (75) · ÎLE-DE-FRANCE',
  heroTitleMain: 'Expert en automatisation commerciale à Paris —',
  heroTitleAccent: 'Deep Signal',
  heroBadge: '📍 Paris · Île-de-France (75)',
  heroSubtitle1: 'Trois ans en agence parisienne avec des équipes commerciales SNCF, Bayer, Saint-Gobain. Je sais ce que coûte un pipeline vide dans une grande structure.',
  heroSubtitle2: 'À La Défense, Station F ou Paris-Saclay, vos prospects bougent vite. Deep Signal détecte leurs signaux d\'intention avant que votre concurrent ne décroche son téléphone.',
  heroCTA: 'Je veux accélérer ma croissance',
  heroCTASub: 'Sans engagement — 45 minutes',
}
```

**localCases :**
```ts
{
  case1: {
    sector: 'Cabinet de conseil RH B2B',
    location: 'Paris 8e — La Défense',
    result: '+28 RDV qualifiés/mois en 30 jours',
    detail: 'Zéro cold call. Séquences déclenchées sur signaux LinkedIn.',
  },
  case2: {
    sector: 'Éditeur SaaS B2B',
    location: 'Station F · Paris 13e',
    result: 'Pipeline ×3 en 6 semaines',
    detail: 'Moins de 2h de supervision par semaine.',
  },
}
```

**faqSettings :**
```ts
{
  faq: [
    {
      question: 'L\'expert en automatisation commerciale intervient-il à La Défense et dans le reste de Paris ?',
      answer: 'Oui. On travaille avec des entreprises à La Défense, dans le Marais, à Paris-Saclay et dans toute l\'Île-de-France. Les missions se font en visio — le fuseau horaire ne pose aucun problème.',
    },
    {
      question: 'Dois-je savoir coder ou connaître n8n pour travailler avec vous ?',
      answer: 'Non. Une fois installé et configuré, aucune compétence technique n\'est requise. Vous pilotez la stratégie, l\'IA exécute. Une formation incluse vous rend autonome en 1h30.',
    },
    {
      question: 'Comment savez-vous quoi automatiser dans mon entreprise parisienne ?',
      answer: 'C\'est l\'objet de la Carte des Opportunités — un audit structuré de vos processus commerciaux avant de construire quoi que ce soit. On ne propose rien sans avoir d\'abord compris votre contexte spécifique.',
    },
    {
      question: 'Combien de temps avant de voir des résultats ?',
      answer: 'Les premiers résultats sont mesurables dès la première semaine de déploiement. Pour les clients parisiens, le calendrier moyen est : configuration en 7 jours, premiers RDV qualifiés semaine 2 ou 3.',
    },
    {
      question: 'Je suis propriétaire des workflows après la mission ?',
      answer: 'Oui, à 100%. Les workflows n8n, les données, les séquences — tout vous appartient dès le premier jour. Aucun lock-in, aucune dépendance imposée.',
    },
    {
      question: 'Quel est le budget minimum pour démarrer ?',
      answer: 'On ne parle pas budget avant d\'avoir compris votre situation. L\'appel de découverte est là pour ça — on identifie ensemble les opportunités, puis on construit une proposition adaptée à votre contexte parisien.',
    },
  ],
}
```

---

### 3.2 LYON

**URL :** `/expert-automatisation-commerciale-lyon`  
**Département :** Métropole de Lyon (69) · Auvergne-Rhône-Alpes

**Title tag :** `Expert automatisation commerciale Lyon — SalesExperienz`  
**Meta :** `Automatisez votre prospection B2B à Lyon avec Deep Signal : détection de signaux d'intention, personnalisation IA, 10 à 60 RDV/mois. Audit gratuit 45 min.`

**heroSettings :**
```ts
{
  heroPreTitle: 'SALESEXPERIENZ · AUTOMATISATION IA · LYON (69) · AUVERGNE-RHÔNE-ALPES',
  heroTitleMain: 'Expert en automatisation commerciale à Lyon —',
  heroTitleAccent: 'Deep Signal',
  heroBadge: '📍 Lyon · Métropole (69)',
  heroSubtitle1: 'Capitale européenne de la pharma et du numérique — vos équipes commerciales de la Presqu\'île à la Part-Dieu méritent un pipeline qui tourne sans elles.',
  heroSubtitle2: 'De Gerland à Confluence, vos prospects biotech et fintech changent de poste tous les 18 mois. Deep Signal capte le signal au moment exact où ils sont en position d\'acheter.',
  heroCTA: 'Je veux accélérer ma croissance',
  heroCTASub: 'Sans engagement — 45 minutes',
}
```

**localCases :**
```ts
{
  case1: {
    sector: 'Distributeur de matériel médical B2B',
    location: 'Gerland · Lyon 7e',
    result: '+22 RDV qualifiés/mois dès la 3e semaine',
    detail: 'Prospects ciblés sur signaux de recrutement dans les cliniques.',
  },
  case2: {
    sector: 'ESN spécialisée cybersécurité',
    location: 'Part-Dieu · Lyon 3e',
    result: 'Taux de réponse ×4 sur les séquences LinkedIn',
    detail: 'Messages personnalisés par IA sur les signaux de croissance des cibles.',
  },
}
```

**faqSettings :**
```ts
{
  faq: [
    {
      question: 'L\'expert en automatisation commerciale intervient-il à la Part-Dieu et dans la Métropole de Lyon ?',
      answer: 'Oui. On travaille avec des entreprises à Gerland, Confluence, la Part-Dieu, Mermoz et dans l\'ensemble de la Métropole lyonnaise. Tout se fait en visio, sans déplacement nécessaire.',
    },
    {
      question: 'Dois-je savoir coder ou connaître n8n pour travailler avec vous ?',
      answer: 'Non. Une fois installé et configuré, aucune compétence technique n\'est requise. Vous pilotez la stratégie, l\'IA exécute. Une formation incluse vous rend autonome en 1h30.',
    },
    {
      question: 'Comment savez-vous quoi automatiser dans mon entreprise lyonnaise ?',
      answer: 'C\'est l\'objet de la Carte des Opportunités — un audit structuré de vos processus avant de construire quoi que ce soit. Lyon a un tissu pharma, biotech et numérique dense : on adapte l\'approche à votre secteur précis.',
    },
    {
      question: 'Combien de temps avant de voir des résultats ?',
      answer: 'Les premiers résultats sont mesurables dès la première semaine de déploiement. Pour les clients lyonnais, le calendrier moyen est : configuration en 7 jours, premiers RDV qualifiés semaine 2 ou 3.',
    },
    {
      question: 'Je suis propriétaire des workflows après la mission ?',
      answer: 'Oui, à 100%. Les workflows n8n, les données, les séquences — tout vous appartient dès le premier jour. Aucun lock-in, aucune dépendance imposée.',
    },
    {
      question: 'Quel est le budget minimum pour démarrer ?',
      answer: 'On ne parle pas budget avant d\'avoir compris votre situation. L\'appel de découverte identifie les opportunités, puis on construit une proposition adaptée à votre contexte et votre secteur lyonnais.',
    },
  ],
}
```

---

### 3.3 MARSEILLE

**URL :** `/expert-automatisation-commerciale-marseille`  
**Département :** Marseille (13) · PACA

**Title tag :** `Expert automatisation commerciale Marseille — SalesExperienz`  
**Meta :** `Automatisez votre prospection B2B à Marseille avec Deep Signal : détection de signaux d'intention, personnalisation IA, 10 à 60 RDV/mois. Audit gratuit 45 min.`

**heroSettings :**
```ts
{
  heroPreTitle: 'SALESEXPERIENZ · AUTOMATISATION IA · MARSEILLE (13) · PACA',
  heroTitleMain: 'Expert en automatisation commerciale à Marseille —',
  heroTitleAccent: 'Deep Signal',
  heroBadge: '📍 Marseille · Bouches-du-Rhône (13)',
  heroSubtitle1: '2e port de France, logistique internationale, tourisme, PACA tech. Automatiser quand votre pipeline est aussi imprévisible que les flux du Vieux-Port.',
  heroSubtitle2: 'D\'Euroméditerranée à Château-Gombert, vos prospects marseillais changent de priorité selon la saison. Deep Signal les détecte quand leur intention d\'achat est au pic.',
  heroCTA: 'Je veux accélérer ma croissance',
  heroCTASub: 'Sans engagement — 45 minutes',
}
```

**localCases :**
```ts
{
  case1: {
    sector: 'Prestataire logistique B2B',
    location: 'La Joliette · Euroméditerranée',
    result: '+19 RDV qualifiés/mois en 30 jours',
    detail: 'Signaux captés sur les recrutements de responsables supply chain.',
  },
  case2: {
    sector: 'Cabinet de conseil en transformation digitale',
    location: 'Château-Gombert · Marseille 13e',
    result: 'Pipeline reconstitué après 4 mois de stagnation',
    detail: 'Séquences déclenchées sur signaux de levée de fonds et d\'expansion.',
  },
}
```

**faqSettings :**
```ts
{
  faq: [
    {
      question: 'L\'expert en automatisation commerciale intervient-il à Euroméditerranée et dans toute la région PACA ?',
      answer: 'Oui. On travaille avec des entreprises au Vieux-Port, à La Joliette, à Château-Gombert et dans toute la région Provence-Alpes-Côte d\'Azur. Les missions se déroulent en visio — aucun déplacement requis.',
    },
    {
      question: 'Dois-je savoir coder ou connaître n8n pour travailler avec vous ?',
      answer: 'Non. Une fois installé et configuré, aucune compétence technique n\'est requise. Vous pilotez la stratégie, l\'IA exécute. Une formation incluse vous rend autonome en 1h30.',
    },
    {
      question: 'Comment savez-vous quoi automatiser dans mon entreprise marseillaise ?',
      answer: 'C\'est l\'objet de la Carte des Opportunités — un audit structuré de vos processus avant de construire quoi que ce soit. Marseille a un tissu économique atypique entre logistique, tourisme et tech : on adapte l\'approche à votre secteur.',
    },
    {
      question: 'Combien de temps avant de voir des résultats ?',
      answer: 'Les premiers résultats sont mesurables dès la première semaine de déploiement. Pour les clients marseillais, le calendrier moyen est : configuration en 7 jours, premiers RDV qualifiés semaine 2 ou 3.',
    },
    {
      question: 'Je suis propriétaire des workflows après la mission ?',
      answer: 'Oui, à 100%. Les workflows n8n, les données, les séquences — tout vous appartient dès le premier jour. Aucun lock-in, aucune dépendance imposée.',
    },
    {
      question: 'Quel est le budget minimum pour démarrer ?',
      answer: 'On ne parle pas budget avant d\'avoir compris votre situation. L\'appel de découverte identifie les opportunités, puis on construit une proposition adaptée à votre contexte marseillais.',
    },
  ],
}
```

---

### 3.4 TOULOUSE

**URL :** `/expert-automatisation-commerciale-toulouse`  
**Département :** Toulouse (31) · Occitanie

**Title tag :** `Expert automatisation commerciale Toulouse — SalesExperienz`  
**Meta :** `Automatisez votre prospection B2B à Toulouse avec Deep Signal : détection de signaux d'intention, personnalisation IA, 10 à 60 RDV/mois. Audit gratuit 45 min.`

**heroSettings :**
```ts
{
  heroPreTitle: 'SALESEXPERIENZ · AUTOMATISATION IA · TOULOUSE (31) · OCCITANIE',
  heroTitleMain: 'Expert en automatisation commerciale à Toulouse —',
  heroTitleAccent: 'Deep Signal',
  heroBadge: '📍 Toulouse · Haute-Garonne (31)',
  heroSubtitle1: 'Airbus sous-traite des milliards. Ses fournisseurs PME ont des pipelines à automatiser — et des décideurs que le cold call n\'atteint plus.',
  heroSubtitle2: 'D\'Aerospace Valley à Compans-Caffarelli, Toulouse concentre des ingénieurs acheteurs sur-sollicités. Deep Signal détecte leur intention d\'achat sans encombrer leur boîte mail.',
  heroCTA: 'Je veux accélérer ma croissance',
  heroCTASub: 'Sans engagement — 45 minutes',
}
```

**localCases :**
```ts
{
  case1: {
    sector: 'Sous-traitant aéronautique Tier 2',
    location: 'Colomiers · Aerospace Valley',
    result: '+17 RDV qualifiés/mois avec des donneurs d\'ordre',
    detail: 'Signaux captés sur les appels d\'offres et les changements de direction.',
  },
  case2: {
    sector: 'Éditeur de logiciel ERP industriel',
    location: 'Compans-Caffarelli · Toulouse',
    result: 'Cycle de vente réduit de 90 à 45 jours',
    detail: 'Nurturing automatisé sur 12 semaines, déclenchement sur signal d\'intention.',
  },
}
```

**faqSettings :**
```ts
{
  faq: [
    {
      question: 'L\'expert en automatisation commerciale intervient-il à Aerospace Valley et dans toute l\'agglomération toulousaine ?',
      answer: 'Oui. On travaille avec des PME à Colomiers, Blagnac, Compans-Caffarelli et dans tout le bassin toulousain. Tout se fait en visio — sans déplacement.',
    },
    {
      question: 'Dois-je savoir coder ou connaître n8n pour travailler avec vous ?',
      answer: 'Non. Une fois installé et configuré, aucune compétence technique n\'est requise. Vous pilotez la stratégie, l\'IA exécute. Une formation incluse vous rend autonome en 1h30.',
    },
    {
      question: 'Comment savez-vous quoi automatiser dans mon entreprise toulousaine ?',
      answer: 'C\'est l\'objet de la Carte des Opportunités — un audit structuré de vos processus avant de construire quoi que ce soit. L\'aéronautique et la MedTech toulousaines ont des cycles de vente longs : on construit une approche adaptée.',
    },
    {
      question: 'Combien de temps avant de voir des résultats ?',
      answer: 'Les premiers résultats sont mesurables dès la première semaine de déploiement. Pour les clients toulousains, le calendrier moyen est : configuration en 7 jours, premiers RDV qualifiés semaine 2 ou 3.',
    },
    {
      question: 'Je suis propriétaire des workflows après la mission ?',
      answer: 'Oui, à 100%. Les workflows n8n, les données, les séquences — tout vous appartient dès le premier jour. Aucun lock-in, aucune dépendance imposée.',
    },
    {
      question: 'Quel est le budget minimum pour démarrer ?',
      answer: 'On ne parle pas budget avant d\'avoir compris votre situation. L\'appel de découverte identifie les opportunités, puis on construit une proposition adaptée à votre contexte toulousain.',
    },
  ],
}
```

---

### 3.5 NANTES

**URL :** `/expert-automatisation-commerciale-nantes`  
**Département :** Nantes (44) · Pays de la Loire

**Title tag :** `Expert automatisation commerciale Nantes — SalesExperienz`  
**Meta :** `Automatisez votre prospection B2B à Nantes avec Deep Signal : détection de signaux d'intention, personnalisation IA, 10 à 60 RDV/mois. Audit gratuit 45 min.`

**heroSettings :**
```ts
{
  heroPreTitle: 'SALESEXPERIENZ · AUTOMATISATION IA · NANTES (44) · PAYS DE LA LOIRE',
  heroTitleMain: 'Expert en automatisation commerciale à Nantes —',
  heroTitleAccent: 'Deep Signal',
  heroBadge: '📍 Nantes · Loire-Atlantique (44)',
  heroSubtitle1: 'Métropole la plus dynamique de l\'Ouest — agroalimentaire, naval, numérique. Vos prospects nantais recrutent, lèvent des fonds, ouvrent des chantiers.',
  heroSubtitle2: 'Deep Signal capte ces signaux en temps réel sur le bassin nantais — de l\'île de Nantes au Technocampus — avant que votre concurrent ne les contacte.',
  heroCTA: 'Je veux accélérer ma croissance',
  heroCTASub: 'Sans engagement — 45 minutes',
}
```

**localCases :**
```ts
{
  case1: {
    sector: 'Agence de conseil en transformation RH',
    location: 'Île de Nantes · Centre-ville',
    result: '+23 RDV qualifiés/mois en 5 semaines',
    detail: 'Signaux captés sur les recrutements et les réorganisations.',
  },
  case2: {
    sector: 'Éditeur SaaS agroalimentaire',
    location: 'Technocampus · Saint-Herblain',
    result: 'Pipeline passé de 12 à 38 opportunités actives',
    detail: 'Séquences déclenchées sur signaux de certification et d\'audit.',
  },
}
```

**faqSettings :**
```ts
{
  faq: [
    {
      question: 'L\'expert en automatisation commerciale intervient-il à l\'île de Nantes et dans toute la Métropole ?',
      answer: 'Oui. On travaille avec des entreprises à l\'Île de Nantes, au Technocampus, à Saint-Herblain et dans toute la Métropole nantaise. Tout se fait en visio — sans déplacement.',
    },
    {
      question: 'Dois-je savoir coder ou connaître n8n pour travailler avec vous ?',
      answer: 'Non. Une fois installé et configuré, aucune compétence technique n\'est requise. Vous pilotez la stratégie, l\'IA exécute. Une formation incluse vous rend autonome en 1h30.',
    },
    {
      question: 'Comment savez-vous quoi automatiser dans mon entreprise nantaise ?',
      answer: 'C\'est l\'objet de la Carte des Opportunités — un audit structuré de vos processus avant de construire quoi que ce soit. Nantes combine agroalimentaire, numérique et naval : on adapte l\'approche à votre secteur précis.',
    },
    {
      question: 'Combien de temps avant de voir des résultats ?',
      answer: 'Les premiers résultats sont mesurables dès la première semaine de déploiement. Pour les clients nantais, le calendrier moyen est : configuration en 7 jours, premiers RDV qualifiés semaine 2 ou 3.',
    },
    {
      question: 'Je suis propriétaire des workflows après la mission ?',
      answer: 'Oui, à 100%. Les workflows n8n, les données, les séquences — tout vous appartient dès le premier jour. Aucun lock-in, aucune dépendance imposée.',
    },
    {
      question: 'Quel est le budget minimum pour démarrer ?',
      answer: 'On ne parle pas budget avant d\'avoir compris votre situation. L\'appel de découverte identifie les opportunités, puis on construit une proposition adaptée à votre contexte nantais.',
    },
  ],
}
```

---

### 3.6 NICE

**URL :** `/expert-automatisation-commerciale-nice`  
**Département :** Nice (06) · PACA

**Title tag :** `Expert automatisation commerciale Nice — SalesExperienz`  
**Meta :** `Automatisez votre prospection B2B à Nice avec Deep Signal : détection de signaux d'intention, personnalisation IA, 10 à 60 RDV/mois. Audit gratuit 45 min.`

**heroSettings :**
```ts
{
  heroPreTitle: 'SALESEXPERIENZ · AUTOMATISATION IA · NICE (06) · PACA',
  heroTitleMain: 'Expert en automatisation commerciale à Nice —',
  heroTitleAccent: 'Deep Signal',
  heroBadge: '📍 Nice · Alpes-Maritimes (06)',
  heroSubtitle1: 'Sophia-Antipolis : 1 600 entreprises tech à 20 minutes de Nice. Un vivier de prospects à signaux forts — et des équipes commerciales qui ne peuvent plus se permettre la prospection manuelle.',
  heroSubtitle2: 'Tourisme, luxe, tech : trois marchés qui cohabitent à Nice. Deep Signal segmente vos cibles et déclenche le bon message au bon moment — depuis la Promenade des Anglais jusqu\'à Sophia.',
  heroCTA: 'Je veux accélérer ma croissance',
  heroCTASub: 'Sans engagement — 45 minutes',
}
```

**localCases :**
```ts
{
  case1: {
    sector: 'Prestataire IT B2B',
    location: 'Sophia-Antipolis · Valbonne',
    result: '+31 RDV qualifiés/mois en 6 semaines',
    detail: 'Ciblage des scale-ups tech en phase de recrutement commercial.',
  },
  case2: {
    sector: 'Cabinet de conseil en stratégie',
    location: 'Centre-ville Nice · Carré d\'Or',
    result: 'Taux de prise de RDV ×3,5 sur les séquences LinkedIn',
    detail: 'Personnalisation IA sur les signaux de levée de fonds et de croissance.',
  },
}
```

**faqSettings :**
```ts
{
  faq: [
    {
      question: 'L\'expert en automatisation commerciale intervient-il à Sophia-Antipolis et dans toute la Côte d\'Azur ?',
      answer: 'Oui. On travaille avec des entreprises à Sophia-Antipolis, Valbonne, Antibes et dans tout le département des Alpes-Maritimes. Les missions se font en visio — aucun déplacement requis.',
    },
    {
      question: 'Dois-je savoir coder ou connaître n8n pour travailler avec vous ?',
      answer: 'Non. Une fois installé et configuré, aucune compétence technique n\'est requise. Vous pilotez la stratégie, l\'IA exécute. Une formation incluse vous rend autonome en 1h30.',
    },
    {
      question: 'Comment savez-vous quoi automatiser dans mon entreprise à Nice ou Sophia-Antipolis ?',
      answer: 'C\'est l\'objet de la Carte des Opportunités — un audit structuré de vos processus avant de construire quoi que ce soit. La Côte d\'Azur mélange tech, tourisme et luxe : on adapte l\'approche à votre secteur exact.',
    },
    {
      question: 'Combien de temps avant de voir des résultats ?',
      answer: 'Les premiers résultats sont mesurables dès la première semaine de déploiement. Pour les clients niçois, le calendrier moyen est : configuration en 7 jours, premiers RDV qualifiés semaine 2 ou 3.',
    },
    {
      question: 'Je suis propriétaire des workflows après la mission ?',
      answer: 'Oui, à 100%. Les workflows n8n, les données, les séquences — tout vous appartient dès le premier jour. Aucun lock-in, aucune dépendance imposée.',
    },
    {
      question: 'Quel est le budget minimum pour démarrer ?',
      answer: 'On ne parle pas budget avant d\'avoir compris votre situation. L\'appel de découverte identifie les opportunités, puis on construit une proposition adaptée à votre contexte niçois et azuréen.',
    },
  ],
}
```

---

## 4. MODIFICATION DU FOOTER

### Objectif

Reproduire le pattern mama-seo.fr : le footer liste toutes les pages locales dans une colonne dédiée "Expertises locales". Cela crée du maillage interne automatique sur toutes les pages du site.

### Modification de components/Footer.tsx

Ajouter une colonne entre les "Services" et le "Contact + NAP" existants :

```tsx
{/* Pages locales */}
<div className="flex flex-col gap-2">
  <p className="font-body text-[14px] font-bold text-se-muted">Expertises locales</p>
  {[
    { label: 'Automatisation Paris', href: '/expert-automatisation-commerciale-paris' },
    { label: 'Automatisation Lyon', href: '/expert-automatisation-commerciale-lyon' },
    { label: 'Automatisation Marseille', href: '/expert-automatisation-commerciale-marseille' },
    { label: 'Automatisation Toulouse', href: '/expert-automatisation-commerciale-toulouse' },
    { label: 'Automatisation Nantes', href: '/expert-automatisation-commerciale-nantes' },
    { label: 'Automatisation Nice', href: '/expert-automatisation-commerciale-nice' },
  ].map((link) => (
    <a
      key={link.href}
      href={link.href}
      className="font-body text-[14px] text-se-muted hover:text-white transition-colors duration-200 pl-3"
    >
      {link.label}
    </a>
  ))}
</div>
```

> Note : cette colonne apparaît sur TOUTES les pages du site (homepage + pages de service) puisque le Footer est un composant global. C'est voulu — c'est exactement ce que fait mama-seo.fr.

---

## 5. JSON-LD PAR VILLE

Chaque page locale reçoit son propre schéma JSON-LD. Ne pas modifier le schéma du `layout.tsx` (qui reste celui de l'organisation principale à Sète).

### Template JSON-LD local

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.salesexperienz.fr/expert-automatisation-commerciale-[ville]#localbusiness",
      "name": "Sales Experienz — Expert automatisation commerciale [Ville]",
      "description": "Expert en automatisation commerciale à [Ville]. Prospection B2B automatisée, détection de signaux d'intention, 10 à 60 RDV/mois. Audit gratuit 45 min.",
      "url": "https://www.salesexperienz.fr/expert-automatisation-commerciale-[ville]",
      "telephone": "+33622951638",
      "email": "contact@salesexperienz.fr",
      "areaServed": [
        { "@type": "City", "name": "[Ville]" },
        { "@type": "AdministrativeArea", "name": "[Région]" }
      ],
      "parentOrganization": {
        "@id": "https://www.salesexperienz.fr/#organization"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.salesexperienz.fr/expert-automatisation-commerciale-[ville]",
      "name": "Expert automatisation commerciale [Ville] — SalesExperienz",
      "description": "[META_DESCRIPTION]",
      "url": "https://www.salesexperienz.fr/expert-automatisation-commerciale-[ville]",
      "isPartOf": { "@id": "https://www.salesexperienz.fr/#website" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.salesexperienz.fr" },
          { "@type": "ListItem", "position": 2, "name": "Expert automatisation commerciale [Ville]", "item": "https://www.salesexperienz.fr/expert-automatisation-commerciale-[ville]" }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        /* Reprendre exactement les 6 questions/réponses du faqSettings de la ville */
      ]
    }
  ]
}
```

### Valeurs par ville

| Ville | `[ville]` | `[Région]` |
|-------|-----------|-----------|
| Paris | `paris` | `Île-de-France` |
| Lyon | `lyon` | `Auvergne-Rhône-Alpes` |
| Marseille | `marseille` | `Provence-Alpes-Côte d'Azur` |
| Toulouse | `toulouse` | `Occitanie` |
| Nantes | `nantes` | `Pays de la Loire` |
| Nice | `nice` | `Provence-Alpes-Côte d'Azur` |

---

## 6. NOUVEAU COMPOSANT LocalCases

### Rôle

Afficher 2 mini-cas clients anonymes géolocalisés dans la ville. Ce composant s'insère entre `<Services />` et `<About />`.

### Design

Reprendre le design system SalesExperienz :
- Fond : `bg-[#162248]` (bg-secondary)
- 2 cards côte à côte (grid 2 colonnes sur desktop, 1 colonne sur mobile)
- Chaque card : border-l-4 border-orange, padding 24px, radius 8px
- Badge secteur en haut (texte teal)
- Résultat chiffré en grand (font-display, orange)
- Location en texte muted avec icône 📍
- Animation FadeUp au scroll (pattern existant)

### Interface TypeScript

```ts
interface LocalCase {
  sector: string
  location: string
  result: string
  detail: string
}

interface LocalCasesProps {
  cases: { case1: LocalCase; case2: LocalCase }
  ville: string
}
```

### Texte de section fixe

- Titre : `Ils ont automatisé leur pipeline à [Ville]`
- Sous-titre : `Résultats anonymisés — contextes réels`

---

## 7. SITEMAP — mise à jour

Ajouter dans `app/sitemap.ts` après les entrées existantes :

```ts
// Pages locales — Vague 1
{ url: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-paris', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
{ url: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-lyon', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
{ url: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-marseille', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
{ url: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-toulouse', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
{ url: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-nantes', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
{ url: 'https://www.salesexperienz.fr/expert-automatisation-commerciale-nice', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
```

---

## 8. CHECKLIST AVANT LIVRAISON (par ville)

### Page Paris (ville de test)
- [ ] `app/expert-automatisation-commerciale-paris/page.tsx` créé
- [ ] `metadata` correct (title ≤70 chars, canonical, OG)
- [ ] `heroSettings` injecté — badge géo visible dans le hero
- [ ] Composant `<LocalCases />` créé et fonctionnel
- [ ] `faqSettings` avec 6 questions localisées
- [ ] JSON-LD `LocalBusiness` + `WebPage` + `FAQPage` injecté
- [ ] `components/Footer.tsx` modifié — colonne "Expertises locales" avec les 6 villes
- [ ] `app/sitemap.ts` mis à jour
- [ ] Page vérifiée mobile 375px
- [ ] Animations FadeUp fonctionnelles au scroll
- [ ] Aucun texte générique ou placeholder visible

### Après validation Paris → dupliquer pour les 5 autres
- [ ] Lyon
- [ ] Marseille
- [ ] Toulouse
- [ ] Nantes
- [ ] Nice

---

## 9. NOTES TECHNIQUES IMPORTANTES

1. **Les composants `Hero` et `FAQ` acceptent déjà des `settings` props** — ne pas modifier ces composants, juste passer les objets définis dans chaque `page.tsx`.

2. **Le composant `LocalCases` est nouveau** — à créer dans `/components/LocalCases.tsx`. Utiliser le pattern `FadeUp` existant et les tokens de design du projet.

3. **Ne pas toucher à `layout.tsx`** — le JSON-LD global de l'organisation reste sur le layout. Chaque page locale ajoute son propre `<script>` dans le JSX de la page.

4. **Le Footer modifié s'affiche sur toutes les pages** — c'est intentionnel. C'est ce qui crée le maillage interne et la visibilité SEO des pages locales depuis l'ensemble du site.

5. **Images OG** — si les images `/og-paris.jpg` etc. n'existent pas encore, utiliser l'image OG par défaut `/portrait.png` comme fallback dans les metadata. Créer les images OG spécifiques dans un second temps.

---

*Brief v1.0 — SalesExperienz — Pages locales Vague 1 — Avril 2026*
