# BRIEF — Page de service : SEO GEO Machine
## `salesexperienz.fr/services/seo-geo-machine`
### Statut : Prêt pour Claude Code

---

## 0. CONTEXTE & OBJECTIF

**URL cible :** `https://www.salesexperienz.fr/services/seo-geo-machine`

**Modèle de référence :** `https://www.salesexperienz.fr/services/deepsignal`  
→ Reproduire exactement la même structure de sections, les mêmes composants (badges, compteurs, comparatif, FAQ accordion, pricing cards, Carte des Opportunités), le même design system (Deep Navy `#0D1B3E`, Burnt Orange `#E8621A`, Teal `#ebf4ed`), les mêmes animations Framer Motion scroll-triggered.

**Services GMB couverts par cette page :**
- Création de contenu SEO automatisée
- Création de site web

**Ancrage géographique :** Sète · Hérault (34) · Occitanie — à injecter dans H1, badge hero, JSON-LD `areaServed`, footer de section CTA.

---

## 1. STRATÉGIE SEO-GEO

### 1.1 Mot-clé principal & secondaires

| Type | Mot-clé | Intention |
|------|---------|-----------|
| **Principal** | `création site web SEO Sète` | Transactionnel local |
| **Secondaire 1** | `contenu SEO automatisé Hérault` | Transactionnel |
| **Secondaire 2** | `agence SEO GEO Sète` | Navigationnel/transactionnel |
| **Secondaire 3** | `site web Next.js Sète` | Transactionnel |
| **Secondaire 4** | `machine à contenu SEO automatisée` | Informationnel |
| **Long tail 1** | `comment être cité par ChatGPT Perplexity` | Informationnel |
| **Long tail 2** | `création site SEO Google My Business Hérault` | Transactionnel local |
| **Long tail 3** | `automatisation contenu blog SEO PME` | Informationnel |

### 1.2 Balise `<title>`

```
Création Site Web & Contenu SEO Automatisé à Sète — SEO GEO Machine | SalesExperienz
```
*(88 chars — à tronquer à 70 si nécessaire : "Site Web SEO + Contenu Automatisé à Sète — SalesExperienz")*

### 1.3 Meta description

```
Site web SEO-ready et machine à contenu automatisée à Sète (34). Votre site, votre présence locale et vos articles IA alignés en propriété totale. Audit gratuit 45 min.
```
*(167 chars — version courte à 155 : "Site SEO-ready + contenu automatisé à Sète (34). Site, GMB et articles IA alignés. Propriété totale dès J+1. Audit gratuit 45 min.")*

### 1.4 URL canonique

```
https://www.salesexperienz.fr/services/seo-geo-machine
```

### 1.5 Open Graph
- `og:title` → identique au `<title>`
- `og:description` → identique à la meta description
- `og:image` → `/og-seo-geo-machine.jpg` (1200×630px — à créer)
- `og:url` → URL canonique
- `og:locale` → `fr_FR`
- `og:type` → `website`

---

## 2. JSON-LD SCHEMAS (à injecter dans le `<head>`)

### Schema `@graph` complet :

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.salesexperienz.fr/services/seo-geo-machine",
      "name": "Création Site Web & Contenu SEO Automatisé à Sète — SEO GEO Machine",
      "description": "Site web SEO-ready et machine à contenu automatisée à Sète (34). Votre site, votre présence locale et vos articles IA alignés en propriété totale.",
      "url": "https://www.salesexperienz.fr/services/seo-geo-machine",
      "inLanguage": "fr-FR",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.salesexperienz.fr" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.salesexperienz.fr/#services" },
          { "@type": "ListItem", "position": 3, "name": "SEO GEO Machine", "item": "https://www.salesexperienz.fr/services/seo-geo-machine" }
        ]
      }
    },
    {
      "@type": "Service",
      "name": "SEO GEO Machine — Création Site Web & Contenu SEO Automatisé",
      "description": "Système intégré combinant création de site web SEO-ready (Next.js/WordPress), optimisation Google My Business et machine à articles automatisés avec méthode Capsule GEO.",
      "provider": {
        "@type": "LocalBusiness",
        "name": "SalesExperienz",
        "url": "https://www.salesexperienz.fr",
        "telephone": "+33622951638",
        "email": "contact@salesexperienz.fr",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "15 Bd Chevalier de Clerville, Bât. M3",
          "addressLocality": "Sète",
          "addressRegion": "Occitanie",
          "postalCode": "34200",
          "addressCountry": "FR"
        },
        "areaServed": [
          { "@type": "City", "name": "Sète" },
          { "@type": "AdministrativeArea", "name": "Hérault" },
          { "@type": "AdministrativeArea", "name": "Occitanie" },
          { "@type": "Country", "name": "France" }
        ],
        "geo": { "@type": "GeoCoordinates", "latitude": 43.4066, "longitude": 3.6978 }
      },
      "areaServed": "France",
      "serviceType": ["Création de site web SEO", "Contenu SEO automatisé", "Google My Business", "GEO Optimization"],
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "lowPrice": "197",
        "highPrice": "3500",
        "offerCount": "5"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Qu'est-ce que le SEO GEO et pourquoi est-ce différent du SEO classique ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le SEO GEO (Generative Engine Optimization) optimise un site pour être cité par les IA génératives (ChatGPT, Perplexity, Gemini) en plus de Google. 72% des pages citées par ChatGPT utilisent la méthode Capsule : une réponse courte autonome placée sous chaque titre en forme de question."
          }
        },
        {
          "@type": "Question",
          "name": "Combien coûte la création d'un site web SEO-ready à Sète ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La création d'un site SEO-ready démarre à 1 500 € HT (formule Starter WordPress) jusqu'à 3 500 € HT (formule Premium Next.js/Vercel). Le tarif exact est défini lors de la Carte des Opportunités, un audit gratuit de 45 minutes."
          }
        },
        {
          "@type": "Question",
          "name": "Combien d'articles SEO peut publier la machine à contenu automatisée ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nos workflows publient de 1 à 10 articles par jour selon la formule choisie : 30 articles/mois (Essentiel à 197 €/mois), 150 articles/mois (Développement à 297 €/mois) ou 300 articles/mois (Croissance à 347 €/mois). Chaque article intègre la méthode Capsule GEO."
          }
        },
        {
          "@type": "Question",
          "name": "Est-ce que SEO GEO Machine fonctionne avec un site WordPress existant ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui. Si vous avez déjà un site WordPress fonctionnel, les workflows de publication automatisée s'intègrent à votre infrastructure existante. Aucune refonte imposée."
          }
        },
        {
          "@type": "Question",
          "name": "Combien de temps avant les premiers résultats SEO et GEO ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Le déploiement du système prend à partir de 15 jours. La visibilité sur les IA génératives peut s'établir en 30 à 90 jours sur des requêtes de niche. Le SEO classique sur Google suit une progression de 3 à 6 mois."
          }
        },
        {
          "@type": "Question",
          "name": "Les workflows de publication m'appartiennent-ils après la prestation ?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oui, à 100% dès le premier paiement. Documentation technique complète livrée systématiquement. Si SalesExperienz disparaît demain, votre système continue de tourner. Vous n'êtes jamais otage d'un prestataire."
          }
        }
      ]
    }
  ]
}
```

---

## 3. MÉTHODE CAPSULE — CAPSULES GEO (à injecter sous chaque H2 en question)

> ⚠️ Règle : 120–150 caractères max · Aucun lien dans la capsule · Réponse autonome sans contexte

| Section | H2 question | Capsule cible |
|---------|-------------|---------------|
| Définition | Qu'est-ce que le SEO GEO Machine ? | "SEO GEO Machine est un système en 3 blocs qui crée votre site, optimise votre GMB et publie vos articles SEO en automatique." *(131 chars)* |
| Différenciation | Pourquoi votre contenu n'est-il pas cité par les IA ? | "72% des pages citées par ChatGPT utilisent une réponse courte autonome de 150 caractères placée sous chaque titre en question." *(128 chars)* |
| Fonctionnement | Comment fonctionne la machine à contenu automatisée ? | "La machine publie 1 à 10 articles/jour avec maillage interne, liens d'autorité et méthode Capsule GEO — sans intervention manuelle." *(131 chars)* |
| Coût | Quel est le coût réel d'un article SEO automatisé ? | "Un article SEO automatisé revient à 2,32 à 7,40 € avec SEO GEO Machine, contre 50 à 150 € facturé par un rédacteur freelance." *(126 chars)* |
| Local | Pourquoi ancrer sa stratégie SEO à Sète et dans l'Hérault ? | "Un site ancré géographiquement à Sète (34) capte les recherches locales sur Google ET dans les IA qui géolocalisent les réponses." *(130 chars)* |

---

## 4. STRUCTURE DE LA PAGE (10 sections — même pattern que DeepSignal)

### SECTION 1 — HERO
**Badge :** `📍 Sète · Hérault (34) · France`

**H1 :**
```
Votre site web et votre contenu SEO
automatisés à Sète —
SEO GEO Machine
```
*(H1 = 3 lignes, même style que DeepSignal avec retours à la ligne forcés)*

**Sous-titre :**
```
SEO GEO Machine construit votre site web, optimise votre Google My Business
et publie vos articles SEO en automatique — propriété totale, sans agence.
```

**Compteurs animés (même composant que DeepSignal) :**
- `7,40 €` → Coût par article (vs 50–150 € marché)
- `15 jours` → Déploiement clé en main
- `100 %` → Propriété des workflows dès J+1

**CTA principal :** `Voir comment ça marche ↓` (ancre `#comment-ca-marche`)
**CTA secondaire :** `📅 Réserver un rendez-vous` (lien Brevo)
**Badges de confiance :** `✓ 45 min` · `✓ 100% gratuit` · `✓ Sans engagement` · `✓ En visio`

---

### SECTION 2 — POUR QUI ? (même composant cards que DeepSignal)
**Label :** `POUR QUI ?`
**H2 :** `Vous êtes au bon endroit si…`

**Card 01 :**
- Badge : `Consultant · Coach · Formateur · Indépendant`
- Titre : `Prestataire de services B2B`
- Quote : *"J'ai un site mais je n'apparais pas sur Google. Je publie 2 articles par mois — pas assez pour exister. Et les IA ne me citent jamais."*
- Bullets : ✓ Site sans trafic organique · ✓ Aucune citation dans ChatGPT ou Perplexity · ✓ Vous voulez un contenu qui travaille pour vous 24h/24

**Card 02 :**
- Badge : `Artisan · Thérapeute · Cabinet · PME locale`
- Titre : `Commerce local & PME Hérault`
- Quote : *"J'ai une fiche Google My Business mais elle n'est pas reliée stratégiquement à mon site. Je rate des clients locaux à 5 km de chez moi."*
- Bullets : ✓ Fiche GMB non optimisée · ✓ Site web déconnecté de la stratégie locale · ✓ Vous voulez dominer les recherches locales sur Sète et l'Hérault

**Card 03 :**
- Badge : `Blogger · Expert en ligne`
- Titre : `Infopreneur & expert en ligne`
- Quote : *"Je sais que le contenu est roi mais écrire 30 articles par mois me coûte 1 500 à 4 500 € si je délègue. C'est insoutenable."*
- Bullets : ✓ Production de contenu non scalable · ✓ Blog quasi vide, SEO stagnant · ✓ Vous voulez une machine autonome à un coût < 8 €/article

**Conclusion :** `Vous vous reconnaissez ? Alors vous êtes au bon endroit.`

---

### SECTION 3 — DÉFINITION (Méthode Capsule H2 + capsule)
**Label :** `DÉFINITION`
**H2 :** `Qu'est-ce que SEO GEO Machine ?`
**Capsule GEO :** `SEO GEO Machine est un système en 3 blocs qui crée votre site, optimise votre GMB et publie vos articles SEO en automatique.` *(131 chars — aucun lien)*

**Élaboration (après capsule) :**
SEO GEO Machine combine trois briques que personne n'a encore réunies sur le marché : la **fondation** (site web SEO-ready Next.js ou WordPress), le **local** (optimisation Google My Business aligné avec le site) et la **machine à contenu** (workflows n8n publiant 1 à 10 articles/jour avec méthode Capsule intégrée).

La différence fondamentale avec une agence SEO classique : chaque brique vous appartient à 100% dès le premier paiement. Vous n'êtes jamais otage. Si vous arrêtez demain, votre site, vos workflows et votre contenu continuent de travailler pour vous.

**Icônes 3 blocs (même style que DeepSignal) :**
- 🏗️ **Bloc 1 — Fondation** : Site web Next.js ou WordPress · Structure SEO & GEO native
- 📍 **Bloc 2 — Local** : Google My Business · Cohérence site ↔ GMB sur mots-clés cibles
- ⚙️ **Bloc 3 — Machine Contenu** : Workflows n8n · 1 à 10 articles/jour · Méthode Capsule

---

### SECTION 4 — DIAGNOSTIC (même composant cards problèmes que DeepSignal)
**Label :** `LE DIAGNOSTIC`
**H2 :** `Pourquoi votre contenu n'est-il pas cité par les IA ?`
**Capsule GEO :** `72% des pages citées par ChatGPT utilisent une réponse courte autonome de 150 caractères placée sous chaque titre en question.` *(128 chars)*

**3 problèmes (icônes + titre + description) :**

🧱 **"Mon site n'est pas structuré pour être trouvé"**
Votre site a été conçu par un webdesigner, pas un expert SEO. Aucune page ne répond à une intention de recherche précise. Les IA génératives ne vous citent pas parce que votre contenu ne passe pas le test d'autonomie — il ne peut pas être compris sans lire toute la page.

❓ **"Je n'apparais pas dans les réponses des IA"**
ChatGPT, Perplexity et Google AI Overview ne référencent que les contenus structurés en capsules citables. Votre contenu actuel est rédigé pour les humains, pas pour les agents IA. Résultat : vos concurrents qui appliquent la méthode Capsule captent vos prospects dans les réponses IA.

⚖️ **"Ma production de contenu ne passe pas à l'échelle"**
2 à 4 articles/mois à la main. 50 à 150 € par article sous-traité. Pas de maillage interne. Pas d'images. Pas de CTA intégré. Le blog est quasi vide, le SEO stagne, l'autorité thématique ne se construit pas.

---

### SECTION 5 — COMMENT ÇA MARCHE (ancre `#comment-ca-marche`)
**Label :** `LE SYSTÈME`
**H2 :** `Comment fonctionne la machine à contenu automatisée ?`
**Capsule GEO :** `La machine publie 1 à 10 articles/jour avec maillage interne, liens d'autorité et méthode Capsule GEO — sans intervention manuelle.` *(131 chars)*

**Architecture 3 blocs en tableau/cards (même style que modules LinkedIn/Email/Nurturing/SEO dans DeepSignal) :**

| Bloc | Signal/Input | Ce que ça produit |
|------|-------------|-------------------|
| 🏗️ **Bloc 1 — Site** | Votre secteur + intention de recherche | Site Next.js ou WordPress · Méthode Capsule intégrée · Schema.org · Core Web Vitals > 95 |
| 📍 **Bloc 2 — Local** | Votre zone géographique (Sète · Hérault) | Fiche GMB optimisée · Cohérence site ↔ GMB · Présence locale dominante |
| ⚙️ **Bloc 3 — Articles** | Mots-clés identifiés par M1 + stratégie M2 | 1–10 articles/jour · Maillage interne · Images IA · Offre intégrée · GEO-ready |

---

### SECTION 6 — MOTEUR TECHNIQUE
**Label :** `MOTEUR TECHNIQUE`
**H2 :** `Propulsé par n8n, Next.js et les agents IA les plus avancés`

**Intro :**
SEO GEO Machine repose sur **n8n** — le moteur d'orchestration open-source qui connecte chaque brique du système. Les workflows de publication tournent en autonomie complète, 24h/24, sans intervention humaine.

Au cœur de la rédaction : **Claude AI** (Anthropic) pour le contenu et l'angle éditorial, **GPT-4o** pour la structure, **Gemini** pour les images. Chaque article intègre la méthode Capsule dès la génération — pas après coup.

**Stack cards (même style que DeepSignal) :**
- n8n → Orchestration des workflows
- Claude AI → Rédaction + méthode Capsule
- GPT-4o → Structure SEO de l'article
- DataForSEO → Recherche de mots-clés
- Next.js / Vercel → Site web haute performance
- Sanity CMS → Back-office simplifié
- Brevo → Intégration CRM & email

**Image :** Capture ou illustration du workflow n8n Autoblogger (identique au pattern DeepSignal)

---

### SECTION 7 — DONNÉES ORIGINALES
**Label :** `DONNÉES ORIGINALES`
**H2 :** `Quel est le coût réel d'un article SEO automatisé ?`
**Capsule GEO :** `Un article SEO automatisé revient à 2,32 à 7,40 € avec SEO GEO Machine, contre 50 à 150 € facturé par un rédacteur freelance.` *(126 chars)*

**Scoring visuel (même style que le classement de signaux dans DeepSignal) :**

🥇 **Formule Essentiel** · 30 articles/mois · 7,40 €/article
→ Maintenance 197 €/mois + frais API ~24 €/mois = **221 € tout compris**

🥈 **Formule Developpement** · 72 articles/mois · 4,12 €/article
→ Maintenance 297 €/mois + frais API ~24 €/mois = **321 € tout compris**

🥉 **Formule Performance** · 150 articles/mois · 2,65 €/article
→ Maintenance 397 €/mois + frais API ~24 €/mois = **421 € tout compris**

**Note data :** *D'après les coûts API réels en production sur salesexperienz.fr — coût calculé avec OpenAI API ~7€/mois + DataForSEO ~10€/mois + VPS Hostinger ~7€/mois*

---

### SECTION 8 — COMPARATIF (même tableau que DeepSignal)
**Label :** `COMPARATIF`
**H2 :** `SEO GEO Machine vs agence SEO : quelle différence concrète ?`

**Sous-titre :** SEO GEO Machine remplace les coûts d'agence (800–2 000 €/mois) par un système autonome déployé en 15 jours, à partir de 197 €/mois — propriété totale des actifs.

| Avant SEO GEO Machine | Après SEO GEO Machine ✓ |
|---|---|
| ✗ 2–4 articles/mois, coût 50–150 €/article | ✓ 30–300 articles/mois, coût 2,32–7,40 €/article |
| ✗ Contenu invisible pour ChatGPT et Perplexity | ✓ Chaque article GEO-ready via méthode Capsule |
| ✗ Site web sans structure d'intention de recherche | ✓ Site SEO-ready avec schema.org + Core Web Vitals > 95 |
| ✗ GMB déconnecté du site, trafic local perdu | ✓ GMB optimisé + synchronisé sur les mêmes mots-clés |
| ✗ Workflows agence = vous ne possédez rien | ✓ Workflows n8n 100% propriété client dès J+1 |

---

### SECTION 9 — POINT D'ENTRÉE (identique à DeepSignal, Carte des Opportunités)
**Label :** `POINT D'ENTRÉE`
**H2 :** `Comment commencer ? Fiare un diagnostic SEO-GEO — à Sète, dans l'Hérault (34) et sur toute la France`

**Intro :** La Carte des Opportunités est un audit gratuit en 4 étapes qui identifie vos priorités SEO-GEO et calcule votre potentiel de visibilité avant tout achat.

**4 étapes (identiques DeepSignal) :**
01 OBSERVER → Inventaire de votre présence actuelle (site, GMB, contenu)
02 MESURER → Calcul du manque à gagner : trafic perdu, articles non publiés, citations IA manquées
03 PRIORISER → Méthode ICE (Impact × Confiance × Facilité) — quel bloc déployer en premier
04 RECOMMANDER → Plan personnalisé Bloc 1 / Bloc 2 / Bloc 3 selon votre situation

**CTA :** `Réserver ma Carte des Opportunités — 45 min, 100% gratuit` (lien Brevo)

---

### SECTION 10 — FAQ (accordéon, identique DeepSignal)
**Label :** `VOS QUESTIONS`
**H2 :** `SEO GEO Machine est-il adapté à votre situation ?`

> ⚠️ Ces FAQ correspondent exactement aux questions du schema FAQPage JSON-LD (section 2)

**Q1 :** "Ça ne fonctionnera pas dans mon secteur"
**R :** Un diagnostic SEO/GEO est préalable à tout déploiement. On ne lance aucun bloc sans avoir vérifié que c'est pertinent pour votre secteur. Si ce n'est pas le cas, on vous le dit — et vous repartez quand même avec des recommandations concrètes.

**Q2 :** "J'ai déjà un site WordPress, dois-je tout refaire ?"
**R :** Non. Si votre site WordPress est fonctionnel, on l'optimise et on y connecte les workflows du Bloc 3. Une refonte n'est proposée que si l'architecture actuelle bloque les performances SEO. C'est décidé ensemble, pas imposé.

**Q3 :** "Le contenu généré va ressembler à du contenu IA bas de gamme"
**R :** Chaque article intègre un angle éditorial spécifique à votre secteur, la méthode Capsule GEO, et votre offre en CTA intégré. Ce n'est pas du contenu générique — c'est du contenu qui passe les filtres Google, répond aux critères IA et que vos lecteurs ont envie de lire.

**Q4 :** "Le SEO prend 6 mois minimum avant de voir des résultats"
**R :** Le SEO classique sur Google suit une progression de 3 à 6 mois, oui. Mais la visibilité GEO (citations dans ChatGPT, Perplexity, Gemini) peut s'établir en 30 à 90 jours sur des requêtes de niche. Et chaque article publié s'accumule — la valeur est permanente.

**Q5 :** "Est-ce que les workflows m'appartiennent vraiment ?"
**R :** Oui, à 100% dès le premier paiement — pas à la résiliation, pas après 6 mois. Documentation technique complète livrée systématiquement. Vous pouvez les faire évoluer seul ou les confier à un autre prestataire. C'est votre actif numérique.

**Q6 :** "Quel est le vrai coût tout compris ?"
**R :** Formule Essentiel (30 articles/mois) : 197 €/mois de maintenance + ~24 €/mois de frais API (VPS, DataForSEO, OpenAI) = 221 € tout compris. Les frais techniques sont facturés directement par les providers — aucune marge SalesExperienz.

---

### SECTION 11 — TARIFICATION (cards, identique DeepSignal)
**Label :** `TARIFICATION`
**H2 :** `Quel est le coût de SEO GEO Machine ?`

**Intro :** SEO GEO Machine est modulaire. Chaque bloc peut être acheté séparément ou combiné. La tarification exacte est définie lors d'un audit SEO avec notre équipe.

**Card recommandée ⚡ — Système complet**
- Module 1 + Module 2 + Module 3 (M1+M2+M3)
- ✓ Site web SEO-ready + GMB optimisé + machine à articles
- ✓ Déploiement à partir de 15 jours
- ✓ Méthode Capsule intégrée sur toutes les pages
- ✓ Workflows 100% propriété client
- ✓ Formation back-office (2h) incluse
- **Prix : sur devis après un rendez-vous stratégique avec nous**
- CTA : `Obtenir mon devis`

**Card 🏗️ — Bloc 1 : Site web SEO-ready**
- WordPress existant optimisé ou création Next.js/Vercel
- ✓ Architecture SEO + méthode Capsule
- ✓ Schema.org + Core Web Vitals > 95
- ✓ Compatible workflows Bloc 3
- **À partir de 1 500 € HT**
- CTA : `Démarrer par le site`

**Card ⚙️ — Bloc 3 : Machine à contenu**
- 30 à 300 articles/mois automatisés
- ✓ Workflows n8n propriété client
- ✓ Maillage interne + images IA + CTA intégré
- ✓ Chaque article GEO-ready méthode Capsule
- **À partir de 197 €/mois**
- CTA : `Démarrer par le contenu`

---

### SECTION 12 — À PROPOS (identique DeepSignal, même composant)
*(Réutiliser le composant Laurent existant — aucune modification)*

---

### SECTION 13 — CTA FINAL
**Label :** `PASSEZ À L'ACTION`
**H2 :** `Vous êtes entrepreneur à Sète, dans l'Hérault ou sur toute la France ?`

**Texte :** Réservez votre Carte des Opportunités — 45 min, sans engagement. Vous repartez avec un plan d'action SEO-GEO concret, que vous travailliez avec SEO GEO Machine ou non.

**CTA :** `Réserver mon RDV gratuit` (ancre #agenda)

**Badges :** `Sans engagement · 45 minutes · 100% en visio · Toute la France`

**Footer de section :**
`SalesExperienz · SEO GEO Machine · Sète, Hérault (34) · Occitanie, France`
`Création de site web SEO · Contenu SEO automatisé · Google My Business · GEO Optimization`

---

## 5. MAILLAGE INTERNE

| Page de départ | Lien vers | Texte d'ancre suggéré |
|---|---|---|
| `/services/seo-geo-machine` | `/services/deepsignal` | "automatisation commerciale Deep Signal" |
| `/services/seo-geo-machine` | `/#services` | "voir tous nos services" |
| `/services/deepsignal` | `/services/seo-geo-machine` | "machine à contenu SEO automatisée" |
| `/#services` | `/services/seo-geo-machine` | "Création site & contenu SEO" |
| `/agence-marketing-automatisation-sete` | `/services/seo-geo-machine` | "SEO GEO Machine — création de site et contenu automatisé" |

---

## 6. SITEMAP — mise à jour requise

Ajouter dans `app/sitemap.ts` :
```typescript
{
  url: 'https://www.salesexperienz.fr/services/seo-geo-machine',
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.9,
},
```

---

## 7. CHECKLIST IMPLÉMENTATION

### SEO technique
- [ ] `generateMetadata()` avec title, description, OG, Twitter, canonical
- [ ] JSON-LD `@graph` (WebPage + Service + FAQPage) dans `<script type="application/ld+json">`
- [ ] Breadcrumb visuel + schéma BreadcrumbList
- [ ] Image OG `/og-seo-geo-machine.jpg` (1200×630px) à créer
- [ ] Sitemap mis à jour

### Méthode Capsule GEO
- [ ] 5 capsules de 120–150 chars sous les H2 en questions (voir section 3)
- [ ] Zéro lien dans les passages capsules
- [ ] Structure "réponse d'abord" respectée sur chaque section

### Composants Next.js à réutiliser de DeepSignal
- [ ] `<HeroBadge />` (badge géolocalisation)
- [ ] `<CounterSection />` (compteurs animés Framer Motion)
- [ ] `<ForQuiCards />` (cards profils cibles)
- [ ] `<DiagnosticCards />` (cards problèmes)
- [ ] `<ModulesGrid />` (grid blocs techniques)
- [ ] `<StackBadges />` (badges technologies)
- [ ] `<ComparisonTable />` (tableau avant/après)
- [ ] `<CarteDesOpportunites />` (section 4 étapes)
- [ ] `<FaqAccordion />` (questions)
- [ ] `<PricingCards />` (tarification)
- [ ] `<AboutLaurent />` (réutiliser à l'identique)
- [ ] `<CtaFinal />` (section finale)

### Design system (identique DeepSignal)
- `--color-primary: #0D1B3E` (Deep Navy)
- `--color-accent: #E8621A` (Burnt Orange)
- `--color-teal: #4ABFB0` (Teal)
- Framer Motion : `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}`
- Tous les scroll-triggered animations identiques

---

## 8. NOTES SPÉCIFIQUES POUR CLAUDE CODE

1. **Fichier à créer :** `app/services/seo-geo-machine/page.tsx`
2. **Modèle exact :** Copier la structure de `app/services/deepsignal/page.tsx` et adapter le contenu
3. **Aucun nouveau composant à créer** — tous les composants existent déjà dans DeepSignal
4. **JSON-LD :** Injecter directement dans le `return()` de la page avec `<script dangerouslySetInnerHTML>`
5. **Capsules GEO :** Chaque capsule doit être dans un `<p className="capsule-geo">` sans aucun `<a>` ou `<Link>` à l'intérieur
6. **Compteurs :** `7,40`, `15`, `100` (les valeurs numériques à animer)
7. **CTA Brevo :** `https://meet.brevo.com/laurent-guyonvarch/rendez-vous-decouverte`
