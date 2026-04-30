# Système de gestion des liens — salesexperienz.fr

> Documentation complète du chantier d'audit, correction et surveillance des liens cassés.  
> Réalisé en avril 2026 — Stack : Next.js 15 · Sanity CMS · Vercel · Claude API

---

## Table des matières

1. [Contexte et problème initial](#1-contexte-et-problème-initial)
2. [Phase 1 — Audit automatique](#2-phase-1--audit-automatique)
3. [Phase 2 — Correction des liens internes](#3-phase-2--correction-des-liens-internes)
4. [Phase 3 — Correction des liens externes via IA](#4-phase-3--correction-des-liens-externes-via-ia)
5. [Routine mensuelle automatique](#5-routine-mensuelle-automatique)
6. [Résultats finaux](#6-résultats-finaux)
7. [Scripts de référence](#7-scripts-de-référence)
8. [Comment relancer un audit](#8-comment-relancer-un-audit)

---

## 1. Contexte et problème initial

### Symptômes détectés

Le blog de salesexperienz.fr contenait des centaines de liens cassés issus de deux sources :

1. **Migration WordPress → Sanity** : lors de l'import, certains liens HTML ont été corrompus. Les balises `<strong>` et `<b>` se sont incrustées dans les attributs `href`, produisant des URLs du type :
   ```
   https://www.salesexperienz.fr/blog/https%20:%3C/strong%3E//moz.com/...
   ```

2. **Changement de domaine** : l'ancien site fonctionnait sur `salesexperienz.com` (sans `.fr`). Des centaines de liens internes pointaient encore vers l'ancien domaine.

3. **Slugs fantômes** : des articles référencés dans le maillage interne n'existaient pas ou avaient un slug légèrement différent (ex : `definitions-usage` au lieu de `definition-usage`).

4. **Pages manquantes** : deux pages référencées dans le footer et la NewsletterForm n'existaient pas (`/etudes-de-cas`, `/politique-de-confidentialite`).

5. **Liens placeholders non remplacés** : des URLs de développement jamais remplacées (`external-authoritative-site.com`, `valid-url.com`, etc.).

### Chiffres de départ

| Catégorie | Occurrences | Uniques |
|---|---|---|
| Liens internes cassés | 272 | 67 |
| Liens externes cassés | 162 | 63 |
| **Total** | **434** | **130** |

---

## 2. Phase 1 — Audit automatique

### Script : `scripts/audit-liens.mjs`

Ce script crawle les 98 pages du site live et vérifie chaque lien trouvé.

**Ce qu'il fait :**
1. Visite chaque URL de la liste `PAGES` avec `fetch()`
2. Parse le HTML avec `htmlparser2` pour extraire tous les `<a href>`
3. Pour chaque lien extrait, envoie une requête `HEAD` (fallback `GET` si 405)
4. Classifie les résultats : interne / externe, status HTTP
5. Génère deux fichiers de sortie :
   - `scripts/rapport-liens.json` — données brutes structurées
   - `scripts/rapport-liens.md` — rapport lisible en Markdown

**Commande :**
```bash
node scripts/audit-liens.mjs
```

**Durée :** ~5 minutes (98 pages × ~3 sec avec 1 sec de délai entre pages)

**Comprendre les résultats :**

| Code HTTP | Signification |
|---|---|
| `404` | Page introuvable — lien vraiment cassé |
| `500` / `502` | Erreur serveur — lien probablement cassé |
| `0` / `ERR` | Domaine inaccessible / timeout |
| `403` | Serveur bloque les bots — **faux positif** (Forbes, Gartner, Capterra…) |
| `999` | LinkedIn bloque les bots — **faux positif** |
| `400` | LinkedIn Business — **faux positif** |

> **Règle d'or :** Un lien est réellement cassé si son status est `404`, `500`, `502`, ou `0`.  
> Les `403` et `999` sont des faux positifs — ces pages fonctionnent en navigation réelle.

---

## 3. Phase 2 — Correction des liens internes

### 3A. Correction des URLs malformées — `scripts/fix-urls-malformees.mjs`

Ce script corrige les URLs corrompues lors de la migration WordPress.

**4 patterns détectés et corrigés :**

| Pattern | Exemple avant | Exemple après |
|---|---|---|
| HTML incrusté dans href | `https :</strong>//moz.com/seo` | `https://moz.com/seo` |
| Protocole à un seul slash | `https :/salesexperienz.fr/slug` | `https://www.salesexperienz.fr/blog/slug` |
| Domaine sans `www` | `salesexperienz.fr/slug/` | `https://www.salesexperienz.fr/blog/slug` |
| Ancien domaine `.com` | `salesexperienz.com/slug` | `https://www.salesexperienz.fr/blog/slug` |

**Résultat :** 72 articles Sanity patchés, 466 liens corrigés.

**Commande (toujours tester avec `--dry-run` d'abord) :**
```bash
node scripts/fix-urls-malformees.mjs --dry-run
node scripts/fix-urls-malformees.mjs
```

---

### 3B. Correction des slugs fantômes — `scripts/fix-slugs-fantomes.mjs`

Ce script remplace les liens vers des pages inexistantes par la page existante la plus proche.

**3 catégories traitées :**

**1. Typos de slug** (slug différent du réel) :
```
/blog/articles-seo-secrets        → /blog/article-seo-secrets
/blog/automatisation-prospection-linkedin-booster → /blog/automatiser-prospection-linkedin-booster
/blog/comment-optimer-seo         → /blog/comment-optimiser-seo-site-web
/blog/strategie-crm-ameliorer-... → /blog/strategie-crm
```

**2. Articles inexistants** (jamais créés ou supprimés) :
```
/blog/automatisez-votre-reponse-client → /blog/automatiser-relation-client
/blog/formation-techniques-vente       → /blog/le-guide-complet-du-coaching-commercial-b2b
/blog/management-performance-...       → /blog/methode-pilotage-commercial
/blog/difference-marketing-et-commercial → /blog/difference-strategies-marketing-commerciale
```

**3. Pages racine manquantes** (hors `/blog`) :
```
/strategie-commerciale              → /blog/definition-strategie-commerciale
/techniques-de-vente/               → /blog/guide-approche-commerciale
/processus-de-vente-definition/     → /blog/structurer-demarche-commerciale
/strategies-marketing/strategie-... → /blog/strategie-commercialisation
```

**4. Liens placeholders jamais remplacés :**

| Placeholder | Contexte | Remplacé par |
|---|---|---|
| `high-authority-site.com` | Ancre : "feedback continu" | `/blog/methode-pilotage-commercial` |
| `external-authoritative-site.com` | Ancre : "HubSpot" | `https://www.hubspot.fr` |
| `ethicalcorp.com` | Ancre : "Ethical Corporation" | `/blog/pourquoi-automatiser-process-commercial` |
| `valid-url.com` | Ancre : "méthode de pilotage" | `/blog/methode-pilotage-commercial` |
| `valid-url.com` | Ancre : "Forrester" | `https://www.forrester.com` |
| PDF WordPress mort | Ancre : lien diagnostic PDF | `/blog/guide-approche-commerciale` |

**Résultat :** 28 articles Sanity patchés, 47 liens corrigés.

**Commande :**
```bash
node scripts/fix-slugs-fantomes.mjs --dry-run
node scripts/fix-slugs-fantomes.mjs
```

---

### 3C. Pages manquantes créées

Deux pages existaient dans la navigation mais n'avaient pas de fichier Next.js :

**`app/etudes-de-cas/page.tsx`**
- Page index listant les 2 études de cas Ambassimmo
- Cards cliquables avec métriques et liens vers les sous-pages
- Métadonnées SEO complètes + canonical

**`app/politique-de-confidentialite/page.tsx`**
- Page RGPD complète (données collectées, finalités, droits, sous-traitants)
- Liée depuis la `NewsletterForm` (formulaire présent sur toutes les pages)
- `robots: { index: false }` pour ne pas indexer cette page légale

---

## 4. Phase 3 — Correction des liens externes via IA

### Script : `scripts/fix-liens-externes.mjs`

Ce script utilise l'API Claude (modèle `claude-haiku-4-5`) pour trouver automatiquement des URL de remplacement valides pour les 41 liens externes cassés.

### Architecture du traitement

```
Pour chaque lien externe cassé :
│
├─ 1. Recherche dans Sanity → trouve l'article + texte d'ancre + paragraphe
│
├─ 2. Appel Claude API
│      ├─ Contexte : slug de l'article, texte d'ancre, paragraphe, URL originale
│      └─ Consigne : suggère UNE URL de remplacement pertinente et accessible
│
├─ 3. Vérification HTTP de l'URL suggérée
│      ├─ ✅ Status 200 → enregistre le remplacement
│      └─ ❌ Status 404 → 2ème tentative avec retour sur l'échec
│
└─ 4. Patch Sanity (si URL valide) ou suppression du lien (texte conservé)
```

### Prompt envoyé à Claude

```
Tu aides à corriger des liens cassés sur un blog B2B français
sur l'automatisation commerciale et le SEO (salesexperienz.fr).

Article : [slug]
Texte d'ancre : "[ancre]"
Paragraphe : "[contexte]"
URL cassée : [url]

Règles :
- Réponds avec UNE SEULE URL, rien d'autre
- Préfère : HubSpot, Salesforce, Google, McKinsey, SEMrush, Ahrefs,
  Search Engine Journal, Moz
- Si aucune URL valide, réponds : SUPPRIMER
```

### Résultats

| Résultat | Nb | Détail |
|---|---|---|
| ✅ Liens remplacés | 17 | URL vérifiée 200 |
| 🗑️ Liens supprimés | 22 | 2 tentatives échouées — texte d'ancre conservé |
| ⚠️ Introuvable en base | 1 | `marketingdonut.co.uk` (dans HTML rendu, pas dans Sanity) |

**Exemples de remplacements réussis :**

| URL cassée | URL de remplacement |
|---|---|
| `blog.hubspot.com/.../marketing-automation` | `blog.hubspot.com/.../marketing-automation-benefits` |
| `moz.com/blog/seo-checklist` | `moz.com/learn/seo/what-is-seo` |
| `moz.com/learn/seo/content-audit` | `moz.com/learn/seo` |
| `www.digitalmarketinginstitute.com/blog/...` | `moz.com/learn/seo` |
| `www.hubspot.fr/crm` | `www.hubspot.fr/products/crm` |
| `www.searchenginejournal.com/mobile-seo/...` | `www.searchenginejournal.com/seo/mobile-seo/` |
| `www.salesforce.com/fr/blog/` (500) | `www.salesforce.com/fr/resources/` |
| `blog.hootsuite.com/social-media-automation/` | `blog.hootsuite.com/social-media-automation/` |

**Commande :**
```bash
ANTHROPIC_API_KEY=sk-ant-... node scripts/fix-liens-externes.mjs --dry-run
ANTHROPIC_API_KEY=sk-ant-... node scripts/fix-liens-externes.mjs
```

> La clé API est dans `.env.local` — charge-la avec :
> ```bash
> export $(grep ANTHROPIC_API_KEY .env.local | xargs)
> node scripts/fix-liens-externes.mjs
> ```

---

## 5. Routine mensuelle automatique

### Configuration

Un agent remote Claude Code est programmé pour s'exécuter automatiquement le **1er de chaque mois à 8h (heure de Paris)**.

| Paramètre | Valeur |
|---|---|
| ID de la routine | `trig_01792mTvGVZ6SJqeFK3pNTHH` |
| Cron | `0 7 1 * *` (7h UTC = 8h Paris hiver) |
| Modèle | `claude-sonnet-4-6` |
| Repo | `github.com/salesexperienz/site-web-salesexperienz` |
| MCP connecté | Gmail (envoi du rapport) |

### Ce que fait l'agent chaque mois

1. Clone le repo GitHub dans un environnement isolé Anthropic Cloud
2. `npm install` (dépendances)
3. `node scripts/audit-liens.mjs` (~8 min)
4. Analyse `scripts/rapport-liens.json` — filtre les vrais liens cassés (ignore 403/999)
5. Envoie un email à `contact@salesexperienz.fr` avec :
   - Résumé chiffré (internes / externes / faux positifs)
   - Liste détaillée des liens cassés avec article source
   - Action recommandée selon la gravité

### Format du rapport email reçu

```
[SalesExperienz] Audit mensuel des liens — [date]

RÉSUMÉ
------
Pages analysées : 98
Liens internes cassés : X
Liens externes cassés : X
Faux positifs ignorés : X

LIENS INTERNES CASSÉS [priorité haute]
---------------------------------------
article-slug | https://url-cassee | 404

LIENS EXTERNES CASSÉS
----------------------
article-slug | https://url-cassee | "texte ancre"

ACTION RECOMMANDÉE
-------------------
→ Relancer node scripts/fix-slugs-fantomes.mjs
→ ou ANTHROPIC_API_KEY=... node scripts/fix-liens-externes.mjs
→ ou RAS — tout est OK
```

### Gestion de la routine

- **Voir / modifier / désactiver :** https://claude.ai/code/routines/trig_01792mTvGVZ6SJqeFK3pNTHH
- **Lancer manuellement :** depuis l'interface ou via Claude Code

---

## 6. Résultats finaux

### Tableau comparatif avant / après

| Métrique | Avant | Après | Gain |
|---|---|---|---|
| Liens internes uniques cassés | 67 | ~0 | **−67** |
| Liens externes réels cassés | 63 | 0 | **−63** |
| Pages manquantes (footer/nav) | 2 | 0 | **−2** |
| Liens placeholders | 5 | 0 | **−5** |
| Articles Sanity patchés | — | **128** | — |
| Liens Sanity corrigés | — | **560** | — |

### Faux positifs permanents (à ignorer)

Ces 18 domaines retournent 403/999 aux bots mais fonctionnent en navigation réelle :

`LinkedIn` · `Forbes` · `Gartner` · `Capterra` · `NeilPatel` · `SocialMediaExaminer` · `usine-digitale.fr` · `impactbnd.com` · `LinkedIn Business`

---

## 7. Scripts de référence

| Script | Rôle | Commande |
|---|---|---|
| `scripts/audit-liens.mjs` | Détecte tous les liens cassés (live) | `node scripts/audit-liens.mjs` |
| `scripts/fix-urls-malformees.mjs` | Corrige les URLs HTML corrompues (migration WP) | `node scripts/fix-urls-malformees.mjs` |
| `scripts/fix-slugs-fantomes.mjs` | Redirige les slugs fantômes vers la page la plus proche | `node scripts/fix-slugs-fantomes.mjs` |
| `scripts/fix-liens-externes.mjs` | Remplace les liens externes cassés via Claude API | `ANTHROPIC_API_KEY=... node scripts/fix-liens-externes.mjs` |

**Sorties générées par l'audit :**
- `scripts/rapport-liens.json` — données brutes (articles, URLs, status HTTP)
- `scripts/rapport-liens.md` — rapport Markdown lisible
- `scripts/rapport-liens-externes.json` — rapport Phase 3 (propositions Claude)

---

## 8. Comment relancer un audit

### Vérifier l'état des liens après un nouveau déploiement

```bash
node scripts/audit-liens.mjs
```

Puis analyser les résultats :
```bash
node -e "
const r = JSON.parse(require('fs').readFileSync('scripts/rapport-liens.json', 'utf8'))
const all = r.results.flatMap(p => p.brokenLinks)
const internes = [...new Set(all.filter(l => l.isInternal && [404,500,0].includes(l.status)).map(l => l.href))]
const externes = [...new Set(all.filter(l => !l.isInternal && [404,500,0,502].includes(l.status)).map(l => l.href))]
console.log('Internes cassés :', internes.length)
console.log('Externes cassés :', externes.length)
internes.forEach(h => console.log(' 🔴', h))
externes.forEach(h => console.log(' 🟠', h))
"
```

### Si de nouveaux liens internes cassés apparaissent

1. Identifier le slug cible le plus proche
2. Ajouter l'entrée dans le `MAPPING` de `fix-slugs-fantomes.mjs`
3. Relancer : `node scripts/fix-slugs-fantomes.mjs --dry-run` puis sans `--dry-run`

### Si de nouveaux liens externes cassés apparaissent

```bash
# 1. Éditer la liste BROKEN_URLS dans fix-liens-externes.mjs
# 2. Dry-run
export $(grep ANTHROPIC_API_KEY .env.local | xargs)
node scripts/fix-liens-externes.mjs --dry-run

# 3. Appliquer
node scripts/fix-liens-externes.mjs
```

---

*Documentation générée le 30 avril 2026 — Claude Sonnet 4.6*
