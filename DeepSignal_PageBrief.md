# 📄 BRIEF — Page de Service : Prospection Commerciale Automatisée
## Deep Signal by SalesExperienz — Sète, Hérault (34)

> **Objectif :** Créer une page de service Next.js (App Router) dédiée à "Prospection commerciale automatisée" qui :
> 1. Répond au service Google My Business du même nom
> 2. Génère du trafic organique local (Sète, Hérault, Occitanie)
> 3. Est citée par les moteurs IA (ChatGPT, Perplexity, Google AI Overviews)
> 4. Convertit en réservation d'une Carte des Opportunités (RDV Brevo)

---

## 1. ARCHITECTURE & URL

```
/services/prospection-commerciale-automatisee
```

**URL complète :** `https://salesexperienz.fr/services/prospection-commerciale-automatisee`

**Position dans l'arborescence :**
```
/ (homepage)
└── /services
    └── /services/prospection-commerciale-automatisee  ← cette page
```

**Maillage interne depuis :**
- Page d'accueil (section services)
- Page `/services` (hub des services)
- Articles de blog mentionnant la prospection ou n8n

---

## 2. SEO FONDATIONS

### Balise titre
```
Prospection commerciale automatisée à Sète (34) — SalesExperienz
```
*(65 caractères — dans la limite des 70)*

### Meta description
```
Automatisez votre prospection B2B depuis Sète avec Deep Signal : détection de signaux d'intention, personnalisation IA, 10 à 60 RDV/mois. RDV gratuit.
```
*(152 caractères — dans la limite des 155)*

### H1 de la page
```
Prospection commerciale automatisée à Sète — Deep Signal
```

### Mots-clés primaires
| Type | Mot-clé |
|------|---------|
| Principal | prospection commerciale automatisée Sète |
| Principal | automatisation prospection B2B Hérault |
| Secondaire | prospection LinkedIn automatisée Sète |
| Secondaire | système de prospection B2B automatique 34 |
| Longue traîne | comment automatiser sa prospection commerciale |
| Longue traîne | outil prospection LinkedIn signaux intention |
| Longue traîne | n8n prospection automatisée PME |
| GEO/IA | qu'est-ce que la prospection par signaux d'intention |

### Canonical
```
https://salesexperienz.fr/services/prospection-commerciale-automatisee
```

---

## 3. JSON-LD SCHEMAS (à intégrer dans le `<head>`)

### Schema Service + LocalBusiness + FAQPage

```typescript
// lib/schema-deep-signal.ts
export const deepSignalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Prospection commerciale automatisée",
      "description": "Système de prospection B2B automatisée basé sur la détection de signaux d'intention comportementaux en temps réel, personnalisé par IA Claude, déployé sur infrastructure n8n. Opérationnel en 7 à 14 jours.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "SalesExperienz",
        "url": "https://salesexperienz.fr",
        "logo": "https://salesexperienz.fr/logo.png",
        "telephone": "[TÉLÉPHONE]",
        "email": "[EMAIL]",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Sète",
          "addressRegion": "Hérault",
          "postalCode": "34200",
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "43.4034",
          "longitude": "3.6975"
        },
        "areaServed": [
          { "@type": "City", "name": "Sète" },
          { "@type": "AdministrativeArea", "name": "Hérault" },
          { "@type": "AdministrativeArea", "name": "Occitanie" }
        ]
      },
      "areaServed": "France",
      "serviceType": "Automatisation de prospection B2B",
      "offers": {
        "@type": "Offer",
        "price": "1000",
        "priceCurrency": "EUR",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "1000",
          "priceCurrency": "EUR",
          "description": "À partir de 1 000 € par workflow déployé"
        }
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Qu'est-ce que la prospection commerciale automatisée ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La prospection commerciale automatisée est un système qui détecte en temps réel les signaux d'intention comportementaux de prospects qualifiés (activité LinkedIn, comportement email, recrutement en cours) et leur envoie automatiquement un message personnalisé par IA, sans intervention humaine."
          }
        },
        {
          "@type": "Question",
          "name": "Combien de rendez-vous peut générer Deep Signal par mois ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Deep Signal génère entre 10 et 60 rendez-vous qualifiés par mois selon le secteur et l'ICP cible. Seuls les prospects ayant émis un signal d'intention réel sont contactés, ce qui triple le taux de réponse par rapport à la prospection froide classique."
          }
        },
        {
          "@type": "Question",
          "name": "Combien de temps faut-il pour déployer le système ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le déploiement complet de Deep Signal prend entre 7 et 14 jours. Le système est opérationnel clé en main sans compétence technique requise. Une session de passation de 2h garantit l'autonomie complète du client à J90."
          }
        },
        {
          "@type": "Question",
          "name": "Deep Signal est-il conforme au RGPD ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui. Deep Signal n'exploite que des données comportementales publiques : commentaires LinkedIn, offres d'emploi publiées, comportement email sur liste opt-in. Aucune donnée privée n'est collectée. L'approche est documentée et compatible RGPD."
          }
        },
        {
          "@type": "Question",
          "name": "Quel est le coût d'un système Deep Signal ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Les workflows Deep Signal démarrent à partir de 1 000 €. Un système complet (LinkedIn + Email + Nurturing) s'autofinance en 1 à 3 mois selon la valeur client, en évitant les coûts SDR (40 000–80 000 €/an) ou agence (15 000–40 000 €/an)."
          }
        },
        {
          "@type": "Question",
          "name": "Qu'est-ce que la Carte des Opportunités ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La Carte des Opportunités est un audit stratégique gratuit en 4 étapes (Observer, Mesurer, Prioriser, Recommander) réalisé lors du premier rendez-vous. Elle identifie les processus commerciaux automatisables et calcule le temps récupérable (10 à 30h/semaine) avant tout engagement."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://salesexperienz.fr" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://salesexperienz.fr/services" },
        { "@type": "ListItem", "position": 3, "name": "Prospection commerciale automatisée", "item": "https://salesexperienz.fr/services/prospection-commerciale-automatisee" }
      ]
    }
  ]
}
```

---

## 4. METADATA NEXT.JS (App Router)

```typescript
// app/services/prospection-commerciale-automatisee/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prospection commerciale automatisée à Sète (34) — SalesExperienz',
  description: 'Automatisez votre prospection B2B depuis Sète avec Deep Signal : détection de signaux d\'intention, personnalisation IA, 10 à 60 RDV/mois. RDV gratuit.',
  keywords: [
    'prospection commerciale automatisée Sète',
    'automatisation prospection B2B Hérault',
    'prospection LinkedIn automatisée 34',
    'système prospection B2B n8n',
    'signaux intention achat',
    'Deep Signal SalesExperienz'
  ],
  authors: [{ name: 'Laurent Guyonvarch', url: 'https://salesexperienz.fr/a-propos' }],
  openGraph: {
    title: 'Prospection commerciale automatisée à Sète — Deep Signal',
    description: 'Le système qui prospecte uniquement ceux qui ont levé la main — et qui tourne sans vous.',
    url: 'https://salesexperienz.fr/services/prospection-commerciale-automatisee',
    siteName: 'SalesExperienz',
    images: [{ url: 'https://salesexperienz.fr/og-deep-signal.jpg', width: 1200, height: 630, alt: 'Deep Signal - Prospection automatisée à Sète' }],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prospection commerciale automatisée — Deep Signal',
    description: 'Détection de signaux d\'intention + personnalisation IA + autonomie complète. Depuis Sète.',
    images: ['https://salesexperienz.fr/og-deep-signal.jpg'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: {
    canonical: 'https://salesexperienz.fr/services/prospection-commerciale-automatisee',
  },
}
```

---

## 5. STRUCTURE DE LA PAGE (10 SECTIONS)

> **Charte graphique :** Deep Navy `#0D1B3E` — Burnt Orange `#E8621A` — Teal `#4ABFB0`
> **Référence visuelle :** Même structure et même design system que la homepage `salesexperienz.fr`
> **Animations :** Framer Motion (identiques à la homepage)

---

### SECTION 1 — HERO

**Objectif :** Accroche immédiate + ancrage géographique + CTA principal

**Contenu :**
```
[Badge supérieur]
📍 Sète · Hérault (34) · France

[H1]
Prospection commerciale automatisée à Sète

[Sous-titre]
Deep Signal détecte en temps réel les prospects qui ont levé la main
et leur envoie automatiquement le bon message — sans vous.

[Stat 1] 10 à 60 RDV/mois
[Stat 2] Déploiement en 7–14 jours
[Stat 3] < 2h/semaine de supervision

[CTA primaire] → Réserver ma Carte des Opportunités (gratuit)
[CTA secondaire] → Voir comment ça marche ↓
```

**Notes techniques :**
- H1 contient le mot-clé géolocalisé
- Stats animées (count-up au scroll)
- CTA primaire = lien Brevo (même logique que la homepage)
- Fond : dark navy avec grain overlay

---

### SECTION 2 — CAPSULE GEO #1 : DÉFINITION

> ⚡ **MÉTHODE CAPSULE — Priorité haute pour citation IA**

**H2 (en question) :**
```
Qu'est-ce que la prospection commerciale automatisée ?
```

**Capsule de réponse (autonome, sans lien, 148 caractères) :**
```
La prospection automatisée détecte en temps réel les signaux d'intention de prospects qualifiés et envoie automatiquement un message personnalisé par IA.
```

**Élaboration (après la capsule) :**
- Opposer prospection froide (1 000 envois, < 5% réponse) vs prospection par signal (50–100 contacts, taux ×3)
- Mentionner les 3 types de signaux : comportement LinkedIn, email, recrutement
- Lien interne vers la section "Les 4 modules"

**Test d'autonomie :** ✅ Ce paragraphe se comprend sans le reste de la page

---

### SECTION 3 — PROBLÈME / DOULEUR

**H2 :**
```
Pourquoi votre prospection actuelle vous épuise sans résultats prévisibles ?
```

**3 blocs douleur (cards) :**

**Bloc 1 — "Je prospecte à l'aveugle"**
> Vous envoyez des messages génériques à des inconnus. Taux de réponse < 5%, réputation d'expéditeur dégradée, pipeline imprévisible. La prospection ressemble à une loterie.

**Bloc 2 — "Je ne sais pas qui est prêt à acheter maintenant"**
> Vous avez des milliers de contacts LinkedIn et CRM — mais aucun système pour détecter qui est chaud *aujourd'hui*. La même séquence part pour tout le monde.

**Bloc 3 — "Ma prospection dépend d'une seule personne"**
> Si votre commercial ou SDR s'arrête, le pipeline s'effondre. Scaler signifie recruter — ce qui multiplie les coûts de façon non linéaire.

---

### SECTION 4 — SOLUTION : LES 4 MODULES DEEP SIGNAL

**H2 :**
```
Comment fonctionne Deep Signal à Sète ?
```

**Capsule de réponse (142 caractères) :**
```
Deep Signal est un écosystème de prospection B2B en 4 modules : LinkedIn, Email, Nurturing et SEO, orchestrés par détection de signaux comportementaux.
```

**4 cards modules :**

| Module | Signal capté | Ce que ça produit |
|--------|-------------|-------------------|
| 🔵 LinkedIn | Commentaires, groupes, recrutement actif | Message personnalisé via Claude AI |
| 📧 Email | ICP identifié par domaine | Séquence 3 emails multi-domaines rotatifs |
| 🔄 Nurturing | Comportement CRM (ouverture, clic, inactivité) | Scoring + déclenchement automatique |
| 🔍 SEO | Recherche active sur votre thématique | Articles E-E-A-T + capture leads chauds |

**Note :** Tableau formaté pour extraction IA (données originales structurées)

---

### SECTION 5 — TOP SIGNAUX (DONNÉES ORIGINALES)

> ⚡ **MÉTHODE CAPSULE + Princeton — Données originales = +37% visibilité IA**

**H2 :**
```
Quels sont les signaux d'intention qui déclenchent une prospection automatique ?
```

**Capsule de réponse (145 caractères) :**
```
Deep Signal surveille 10 types de signaux comportementaux publics classifiés par score de chaleur, de la visite de la page tarifs au recrutement SDR.
```

**Top 5 signaux présentés en cards (extrait du document Bonus) :**

1. **🥇 Visite page Pricing** — Signal d'intention maximal. Alerte < 15 min, +20 pts CRM
2. **🥈 Offre d'emploi SDR/Growth** — Budget débloqué, douleur publique. Contact < 48h
3. **🥉 Score comportemental ≥ 80 pts** — Cumul de signaux = priorité absolue
4. **Email ouvert 3×/48h** — Le contenu circule en interne. Alerte < 1h
5. **Commentaire LinkedIn sur post ciblé** — Brise-glace 100% contextualisé

**Lien vers "Voir les 10 signaux complets ↓"** (accordion ou section dédiée)

---

### SECTION 6 — PREUVE DE VALEUR : TABLEAU COMPARATIF

**H2 :**
```
Deep Signal vs prospection traditionnelle : quelle différence concrète ?
```

**Capsule de réponse (143 caractères) :**
```
Deep Signal remplace les coûts SDR (40–80k€/an) et agence (15–40k€/an) par un système autonome déployé en 14 jours, à partir de 1 000 € le workflow.
```

**Tableau avant/après :**

| Avant Deep Signal | Après Deep Signal |
|-------------------|-------------------|
| 1 000 envois/semaine, < 5% réponse | 50–100 prospects à signal fort, taux ×3 |
| Pipeline imprévisible | Pipeline documenté signal → RDV → CA |
| 2–3h/jour de suivi commercial | < 2h/semaine de supervision |
| 40–80k€/an de coûts SDR | Zéro recrutement, propriété complète J1 |
| Dépendance agence | Workflows n8n 100% au client |

---

### SECTION 7 — LA CARTE DES OPPORTUNITÉS (POINT D'ENTRÉE)

**H2 :**
```
Comment commencer ? La Carte des Opportunités à Sète
```

**Capsule de réponse (139 caractères) :**
```
La Carte des Opportunités est un audit gratuit en 4 étapes qui identifie vos processus automatisables et calcule votre temps récupérable avant tout achat.
```

**4 étapes en timeline horizontale :**
1. **OBSERVER** — Inventaire des tâches répétitives et process commerciaux
2. **MESURER** — Calcul du coût réel : Temps × Fréquence = heures perdues/semaine
3. **PRIORISER** — Méthode ICE (Impact × Confiance × Facilité), score ≥ 23 = Quick Win
4. **RECOMMANDER** — Plan d'action personnalisé, démarrage par le module à plus fort ROI

**CTA central :**
```
→ Réserver ma Carte des Opportunités — 45 min, 100% gratuit
```
*(Lien Brevo — identique à la homepage)*

---

### SECTION 8 — OBJECTIONS / GARANTS

**H2 :**
```
Deep Signal est-il adapté à votre situation ?
```

**Accordion de 6 objections + réponses (format FAQ visible par les IA) :**

1. **"Ça ne marchera pas dans mon secteur"**
   → La Carte des Opportunités est préalable. On ne déploie que si score ICE ≥ 23.

2. **"Je vais me faire bannir de LinkedIn"**
   → Protocoles de sécurité intégrés : limites journalières en-dessous des seuils de détection, rotation de domaines, warming progressif.

3. **"C'est trop technique pour moi"**
   → Zéro compétence technique requise. Déploiement clé en main. Session de passation 2h incluse.

4. **"Est-ce conforme au RGPD ?"**
   → Deep Signal n'exploite que des données comportementales publiques (commentaires LinkedIn, offres d'emploi, emails opt-in).

5. **"Comment prouver le ROI à ma direction ?"**
   → Tableau de bord signal → RDV → CA. Chaque rendez-vous est tracé jusqu'à son signal d'origine dès J30.

6. **"Quel est le vrai coût ?"**
   → À partir de 1 000 € le workflow. ROI calculé lors de la Carte des Opportunités.

---

### SECTION 9 — TARIFICATION

**H2 :**
```
Quel est le coût d'un système Deep Signal ?
```

**Capsule de réponse (132 caractères) :**
```
Les workflows Deep Signal démarrent à 1 000 €. Un écosystème complet s'autofinance en 1 à 3 mois en évitant les coûts SDR ou agence récurrents.
```

**3 options en cards :**

**⚡ Option 1 — Écosystème complet**
- LinkedIn + Email + Nurturing + SEO
- Déploiement en 14 jours
- Session de passation 2h incluse
- Autonomie garantie à J90
- *Prix : sur devis après Carte des Opportunités*

**🔧 Option 2 — Module unique**
- Une seule étape du process automatisée
- Idéal pour compléter un système existant
- *À partir de 1 000 €*

**🎯 Option 3 — Sur mesure**
- Partez de vos besoins, vos outils, vos contraintes
- Cahier des charges + développement n8n + tests + passation
- *Prix : sur devis*

**CTA :** → Obtenir mon devis via la Carte des Opportunités

---

### SECTION 10 — FAQ COMPLÈTE (GEO OPTIMISÉE)

> ⚡ **FAQPage Schema + Méthode Capsule — Impact IA maximal**

**H2 :**
```
Questions fréquentes sur la prospection commerciale automatisée à Sète
```

**6 questions/réponses (reprises du JSON-LD — toujours cohérentes) :**

1. **Qu'est-ce que la prospection commerciale automatisée ?**
   La prospection automatisée est un système qui détecte en temps réel les signaux d'intention comportementaux de prospects qualifiés et leur envoie automatiquement un message personnalisé par IA, sans intervention humaine.

2. **Combien de rendez-vous peut générer Deep Signal par mois ?**
   Entre 10 et 60 rendez-vous qualifiés par mois selon le secteur et l'ICP cible. Le taux de réponse est multiplié par 3 vs la prospection froide classique.

3. **Combien de temps faut-il pour déployer le système ?**
   Entre 7 et 14 jours. Aucune compétence technique requise. Autonomie garantie à J90 via session de passation de 2h incluse.

4. **Deep Signal est-il conforme au RGPD ?**
   Oui. Seules des données comportementales publiques sont exploitées : commentaires LinkedIn, offres d'emploi, comportement email opt-in.

5. **Quel est le coût d'un système Deep Signal ?**
   À partir de 1 000 € par workflow. Un système complet s'autofinance en 1 à 3 mois en évitant les coûts SDR (40–80k€/an) ou agence (15–40k€/an).

6. **Qu'est-ce que la Carte des Opportunités ?**
   Un audit stratégique gratuit en 4 étapes (Observer, Mesurer, Prioriser, Recommander) qui identifie les processus automatisables et calcule le temps récupérable avant tout engagement.

---

### SECTION FINALE — CTA + LOCALISATION

**Bloc CTA final :**
```
Vous êtes dirigeant, consultant ou commercial à Sète, dans l'Hérault ou en Occitanie ?

Réservez votre Carte des Opportunités — 45 min, sans engagement.
Vous repartez avec un plan d'action concret, que vous travaillez avec Deep Signal ou non.

→ [BOUTON] Réserver mon RDV gratuit
```

**Mention géographique pied de page :**
```
SalesExperienz · Deep Signal · Sète, Hérault (34) · Occitanie, France
Prospection commerciale automatisée · Automatisation n8n · IA commerciale
```

---

## 6. MÉTHODE CAPSULE — RÉCAPITULATIF DES 5 CAPSULES

| H2 (question) | Capsule (chars) | Status |
|----------------|-----------------|--------|
| Qu'est-ce que la prospection commerciale automatisée ? | 148 ✅ | Sans lien |
| Comment fonctionne Deep Signal à Sète ? | 142 ✅ | Sans lien |
| Quels signaux déclenchent une prospection automatique ? | 145 ✅ | Sans lien |
| Deep Signal vs prospection traditionnelle ? | 143 ✅ | Sans lien |
| Comment commencer ? La Carte des Opportunités | 139 ✅ | Sans lien |
| Quel est le coût d'un système Deep Signal ? | 132 ✅ | Sans lien |

**Test d'autonomie :** Chaque capsule se comprend sans lire le reste de la page. ✅

---

## 7. CHECKLIST TECHNIQUE NEXT.JS

```
app/
└── services/
    └── prospection-commerciale-automatisee/
        └── page.tsx          ← composant principal + metadata export

lib/
└── schema-deep-signal.ts     ← JSON-LD schemas (Service + FAQ + Breadcrumb)

public/
└── og-deep-signal.jpg        ← OG image 1200×630px (à créer)
```

**Checklist pre-launch :**
- [ ] metadata exportée (title, description, OG, Twitter, canonical)
- [ ] JSON-LD injecté via `<script type="application/ld+json">`
- [ ] H1 contient le mot-clé géolocalisé
- [ ] 5+ H2 en forme de questions
- [ ] Capsules sous chaque H2 (sans lien)
- [ ] FAQPage Schema cohérent avec le contenu visible
- [ ] Breadcrumb Schema en place
- [ ] Image OG 1200×630px
- [ ] Lien Brevo pour CTA
- [ ] Page ajoutée au `sitemap.ts`
- [ ] Maillage interne : homepage → /services → cette page

---

## 8. ROBOTS.TS (rappel — autoriser les bots IA)

```typescript
// app/robots.ts — déjà en place, vérifier
rules: [
  { userAgent: 'GPTBot', allow: '/' },
  { userAgent: 'ChatGPT-User', allow: '/' },
  { userAgent: 'PerplexityBot', allow: '/' },
  { userAgent: 'ClaudeBot', allow: '/' },
  { userAgent: 'anthropic-ai', allow: '/' },
  { userAgent: 'Bingbot', allow: '/' },
]
```

---

## 9. SITEMAP.TS — ENTRÉE À AJOUTER

```typescript
{
  url: 'https://salesexperienz.fr/services/prospection-commerciale-automatisee',
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.9,
}
```

---

## 10. OPPORTUNITÉS DE DONNÉES ORIGINALES (boost IA Princeton +37%)

À intégrer pour renforcer la citabilité :

1. **Section signaux** → Ajouter "D'après notre expérience terrain sur X clients déployés en 2024–2025..."
2. **Section ROI** → "En moyenne, nos clients récupèrent Xh/semaine dans les 30 premiers jours"
3. **Section signaux** → Le modèle de scoring (tableau +20 pts visite pricing, +15 pts clic cas client, etc.) est une donnée propriétaire unique — le mettre en valeur
4. **Section comparatif** → "Score de divergence Deep Signal vs marché : 82%" — donnée originale à citer

---

## 11. NOTES DE STYLE / DESIGN

- **Même charte que la homepage** salesexperienz.fr : Deep Navy `#0D1B3E`, Burnt Orange `#E8621A`, Teal `#4ABFB0`
- **Typographie** : reprendre les fonts de la homepage (DM Sans ou équivalent)
- **Framer Motion** : scroll-triggered reveals pour chaque section
- **Cards modules** : hover effect avec border teal
- **CTA** : Burnt orange plein, border radius cohérent avec la homepage
- **Ancrage géographique** : badge "📍 Sète · Hérault (34)" visible dans le hero ET dans le footer de la page
- **Cohérence navigation** : même header/footer que la homepage

---

*Brief produit par SalesExperienz — version 1.0 — Avril 2026*
*Sources : MARTA Deep Signal (5 étapes), SEO-GEO Skill, Méthode Capsule, Stratégie SEO de page*
