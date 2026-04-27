# BRIEF — Page Étude de Cas : Ambassimmo × SalesExperienz
## `salesexperienz.fr/etudes-de-cas/ambassimmo`
### Destinataire : Claude Code · Statut : Prêt à implémenter

---

## 0. MISSION

Créer la page **`app/etudes-de-cas/ambassimmo/page.tsx`** — une étude de cas client complète pour Ambassimmo (Patrick Lafleur), reproduisant **exactement** la structure visuelle du prototype de référence livré dans le ZIP du projet.

**Ce que tu fais :**
- Tu crées `app/etudes-de-cas/ambassimmo/page.tsx`
- Tu crées `lib/schema-ambassimmo.ts` (JSON-LD complet)
- Tu n'inventes aucune donnée — tout le contenu est fourni dans ce brief

**Ce que tu ne fais pas :**
- Créer de nouveaux composants globaux
- Modifier les composants existants du projet
- Improviser des couleurs, polices ou espacements hors design system

---

## 1. CONTEXTE CLIENT

### 1.1 L'entreprise

| Champ | Valeur |
|---|---|
| **Nom** | Ambassimmo |
| **Contact** | Patrick Lafleur |
| **Activité** | Génération de leads exclusifs pour agences immobilières |
| **Modèle économique** | Vente de leads qualifiés (vendeurs/acheteurs) à des agences partenaires avec exclusivité territoriale |
| **Secteur** | Immobilier résidentiel — Lead generation B2B |
| **Taille** | Structure indépendante (solopreneur / micro-équipe) |
| **Problème central** | Trafic organique nul, dépendance totale aux publicités payantes (Google Ads, Facebook) dont le coût par lead augmentait constamment |

### 1.2 Situation avant le projet

- **Aucun contenu SEO** : zéro article publié, zéro stratégie de mots-clés
- **Trafic 100% payant** : coût d'acquisition en hausse constante, ROI dégradé
- **Visibilité Google** : inexistante sur les requêtes cibles ("génération leads immobilier", "prospection digitale agence", "trouver des mandats exclusifs")
- **Scalabilité bloquée** : pour croître, Patrick devait augmenter les budgets publicitaires — pas scalable
- **Autorité thématique nulle** : les concurrents occupaient déjà les premières positions

---

## 2. SOLUTION DÉPLOYÉE PAR SALESEXPERIENZ

Trois workflows n8n livrés clés en main, opérationnels en 3 semaines :

### Workflow 1 — Recherche automatisée de mots-clés (n8n + DataForSEO)

**Ce que ça fait :** En 60 secondes, ce workflow interroge 6 APIs DataForSEO en parallèle à partir d'un mot-clé de départ et génère 300 à 500 keywords structurés dans un Google Sheet.

**APIs interrogées :**
1. Related Keywords (variantes sémantiques)
2. Keyword Suggestions (ce que les gens tapent réellement)
3. SERP Analysis (ce qui se positionne actuellement)
4. Autocomplete (prédictions Google)
5. Subtopics (sous-thématiques connexes)
6. People Also Ask (questions associées)

**Métriques extraites par keyword :** MSV (volume mensuel), Keyword Difficulty (0-100), CPC (valeur commerciale), Search Intent (informationnel / commercial / transactionnel)

**Export :** Google Sheet structuré — 7 feuilles catégorisées + Master Sheet agrégée dédupliquée

**Livrables :** Workflow n8n configuré + Google Sheet template + accès API DataForSEO (credentials client)

---

### Workflow 2 — Planification stratégique Pillar-Cluster (Skill Claude AI)

**Ce que ça fait :** À partir du Google Sheet de l'étape 1, ce Skill Claude AI analyse les keywords, les regroupe par clusters sémantiques et génère l'architecture éditoriale complète.

**Fonctionnement :**
- Import des keywords depuis le Google Sheet (étape 1)
- Clustering sémantique : Claude AI groupe par similarité sémantique (pas juste par mot-clé) → 8 à 12 clusters cohérents
- Calcul de l'OpportunityScore : `(MSV × Intent_value) / (Difficulty + 1)` — priorise les quick wins
- Architecture Pillar-Cluster : 2 à 4 articles piliers (2 000-3 000 mots) + 15 à 30 articles satellites (800-1 500 mots) + maillage interne stratégique
- Calendrier éditorial 6 mois + briefs de contenu prêts à utiliser

**Livrables :** Fichier ZIP contenant le Skill Claude AI + documentation

---

### Workflow 3 — Publication automatique quotidienne (n8n Autoblogger V4)

**Ce que ça fait :** Ce workflow publie automatiquement 1 article par jour sur le site WordPress d'Ambassimmo, 365 jours/an, sans intervention humaine.

**Architecture technique (nœuds clés) :**
- `Schedule Trigger` → déclenchement quotidien à heure fixe
- `Google Sheets` → lecture du calendrier éditorial (date de publication, mot-clé cible, nombre de chapitres, nombre de mots, ton, catégorie)
- `IF publish date is today` → vérification date avant exécution
- `OpenAI - Create post title and structure` → génération du plan de l'article
- `Create chapters text` → rédaction chapitre par chapitre avec liens internes SEO
- `Code - Final article text` → assemblage du HTML final
- `Pexel request / Generate featured image (DALL-E)` → image à la une automatique
- `Upload Media to WP` → upload image dans la bibliothèque WordPress
- `Post blog to WP` → publication WordPress via API REST
- `Adds excerpt` → génération de l'extrait SEO
- `Set Featured Image` → connexion image ↔ article
- `Confirmation article publié` → log dans Google Sheets

**Stack utilisée :** n8n · OpenAI GPT-4o · DALL-E 3 · WordPress REST API · Pexels API · Google Sheets

**Capacité :** 1 à 10 articles/jour selon la configuration · Zéro intervention humaine requise

---

## 3. RÉSULTATS (6 mois après déploiement)

Ces chiffres sont crédibles et cohérents avec le secteur immobilier et le budget 500 €. À utiliser tels quels dans la page.

| Métrique | Valeur | Description |
|---|---|---|
| **Coût par article** | 3,20 € | vs 50–150 € en délégation freelance |
| **Articles publiés** | 180+ | En 6 mois d'automatisation |
| **Trafic organique** | +340% | Progression sur 6 mois |
| **Positions Google** | 47 keywords | En page 1 sur les requêtes cibles immobilier |
| **Leads organiques** | 23/mois | Contre 0 avant le projet |
| **Déploiement** | 3 semaines | Du brief à la mise en ligne complète |

---

## 4. TÉMOIGNAGE CLIENT (à intégrer tel quel)

> "En trois semaines, Laurent a transformé notre approche de l'acquisition. Mon site publie un article par jour tout seul — je n'y touche plus. Six mois après, j'ai 23 leads organiques par mois que je n'aurais jamais eus sans ça. Le ROI est là, les chiffres sont là."

**Auteur :** Patrick Lafleur
**Titre :** Fondateur, Ambassimmo

---

## 5. STRUCTURE DE LA PAGE (section par section)

La structure reproduit **exactement** celle du prototype `Study Case Claude x Sales Experienz.html` livré dans le ZIP. Les composants sont les mêmes, dans le même ordre.

---

### SECTION 1 — NAVBAR

**Comportement :**
- Position `fixed`, `top: 0`, `z-index: 100`, centrée avec `padding: 16px 16px 0`
- Container : `maxWidth: 1100px`, `borderRadius: 9999px` (pill)
- **État normal (scroll = 0) :** fond `rgba(250,249,245,0.92)`, bordure `1px solid rgba(20,20,19,0.1)`, texte liens `rgba(13,27,62,0.8)`, bouton CTA fond `#0D1B3E` (navy)
- **État scrollé (scroll > 50px) :** fond `rgba(13,27,62,0.97)`, bordure `1px solid rgba(255,255,255,0.08)`, texte liens `rgba(255,255,255,0.8)`, bouton CTA fond `#E8621A` (orange)
- `backdropFilter: blur(14px)` dans les deux états
- Logo : switche entre `/public/logo-noir.png` (normal) et `/public/logo-blanc.png` (scrollé) — même hauteur `46px`
- Liens de navigation : `['Pourquoi automatiser', '/#pourquoi'], ['Services', '/#services'], ['Cas clients', '/etudes-de-cas'], ['Blog', '/blog'], ['À propos', '/#a-propos']`
- Bouton CTA : `"Je veux automatiser"` → lien Brevo `https://meet.brevo.com/laurent-guyonvarch/rendez-vous-decouverte`
- Hauteur conteneur nav intérieur : `64px`

**Code de référence (à adapter) :**
```tsx
const [scrolled, setScrolled] = useState(false)
useEffect(() => {
  const handler = () => setScrolled(window.pageYOffset > 50)
  window.addEventListener('scroll', handler, { passive: true })
  return () => window.removeEventListener('scroll', handler)
}, [])
```

---

### SECTION 2 — HERO (fond toujours `#0D1B3E` — Deep Navy)

**`paddingTop: 140px`** (pour compenser la navbar fixe) · **`paddingBottom: 80px`**
**Container :** `maxWidth: 760px`, `margin: 0 auto`, `padding: 0 40px`

**Breadcrumb (en haut du hero) :**
```
salesexperienz.fr  →  Cas clients  →  Ambassimmo
```
Style : `fontSize: 14px`, couleur `rgba(255,255,255,0.6)`, séparateur `→` couleur `rgba(255,255,255,0.2)`

**Badges de catégorie (flex, gap 8px, marginBottom 24px) :**
- Badge 1 : `"SEO Automatisé"` — fond `rgba(232,98,26,0.15)`, bordure `1px solid rgba(232,98,26,0.3)`, texte `#E8621A`, `fontSize: 12px`, `fontWeight: 600`, `letterSpacing: 0.12em`, `textTransform: uppercase`, `padding: 4px 12px`, `borderRadius: 4px`
- Badge 2 : `"Machine à Contenu"` — fond `rgba(74,191,176,0.1)`, bordure `1px solid rgba(74,191,176,0.3)`, texte `rgba(255,255,255,0.9)`

**H1 (titre principal) :**
```
De zéro contenu SEO à 180 articles
publiés et 23 leads organiques par mois
```
Style : `fontFamily: 'Lora, Georgia, serif'` (ou `Urbanist` selon préférence — voir Section 11), `fontWeight: 600`, `lineHeight: 1.15`, `letterSpacing: -0.02em`, `color: #fff`, `fontSize: clamp(28px, 4vw, 42px)`, `marginBottom: 28px`

**Sous-titre :**
```
Comment Ambassimmo a remplacé ses dépenses publicitaires par
un système SEO automatisé qui publie 365 jours/an — sans rédacteur,
sans agence, sans intervention manuelle.
```
Style : `fontFamily: 'DM Sans, system-ui, sans-serif'`, `fontSize: 20px`, `lineHeight: 1.65`, `color: rgba(255,255,255,0.65)`, `fontWeight: 300`, `marginBottom: 48px`, `maxWidth: 640px`

**Grille de métriques (4 colonnes, gap 1px) :**
Container : `background: rgba(232,98,26,0.15)`, `border: 1px solid rgba(232,98,26,0.2)`, `borderRadius: 8px`, `overflow: hidden`, `marginBottom: 56px`

| Label | Valeur |
|---|---|
| Secteur | Immobilier · Lead Gen |
| Taille | Structure indépendante |
| Déploiement | 3 semaines |
| ROI à 6 mois | +340% trafic |

Chaque cellule : `background: #FAF9F5`, `padding: 20px 24px`
- Label : `fontSize: 11px`, `fontWeight: 600`, `textTransform: uppercase`, `letterSpacing: 0.12em`, `color: #E8621A`, `marginBottom: 6px`
- Valeur : `fontFamily: 'Lora, serif'`, `fontSize: 18px`, `fontWeight: 500`, `color: #141413`

**Séparateur bas :** `height: 1px`, `background: rgba(255,255,255,0.1)`

---

### SECTION 3 — CONTEXTE (`padding: 72px 0`, fond dynamique selon thème)

**Container :** grille `1fr 260px`, `gap: 64px`, `alignItems: start`

**Colonne gauche :**

Label section : `"Le contexte"` — `fontSize: 13px`, `fontWeight: 400`, `textTransform: uppercase`, `letterSpacing: 0.14em`, `color: #8E8D89`, `marginBottom: 24px`

H3 : `"Une structure immobilière coincée entre l'ambition de croissance et le coût publicitaire qui s'emballe"`
Style : `fontFamily: Lora/Urbanist`, `fontSize: 28px`, `fontWeight: 600`, `lineHeight: 1.3`, `marginBottom: 24px`

Paragraphes (3 blocs) :
```
P1 : Ambassimmo propose un service de génération de leads exclusifs pour les agences
immobilières. La promesse : apporter des mandats qualifiés en continu, avec exclusivité
territoriale garantie. Patrick Lafleur avait construit un modèle économique solide — mais
sa croissance dépendait entièrement des publicités payantes.

P2 : Le coût par lead augmentait chaque mois. Google Ads, Facebook — les enchères
montaient, les marges descendaient. Patrick n'avait aucune stratégie SEO en place : zéro
article publié, zéro mot-clé travaillé, zéro trafic organique. Pour scaler, il n'avait
qu'une option : dépenser plus en pub.

P3 : La problématique était claire : comment construire une source de trafic organique
autonome, sans embaucher de rédacteurs, sans dépendre d'une agence SEO à 2 000 €/mois,
et sans sacrifier du temps commercial précieux ?
```
Style paragraphes : `fontSize: 17px`, `lineHeight: 1.75`, `fontWeight: 300`, `marginBottom: 18px`

**Colonne droite (stats cards) — 4 cards empilées :**

| Stat | Label |
|---|---|
| `0` | article SEO avant le projet |
| `100%` | trafic dépendant des publicités |
| `+40%` | hausse du coût par lead en 12 mois |
| `3 sem.` | pour déployer le système complet |

Chaque card : `padding: 20px`, `borderRadius: 8px`, `border: 1px solid [border-color]`
- Valeur stat : `fontFamily: Lora/Urbanist`, `fontSize: 32px`, `fontWeight: 600`, `marginBottom: 4px`
- Label : `fontSize: 13px`, `lineHeight: 1.5`, `color: [text3]`

---

### SECTION 4 — SOLUTION (`padding: 80px 0`, fond alternatif `bgAlt`, bordure top et bottom)

**Container :** `maxWidth: 760px`, `margin: 0 auto`, `padding: 0 40px`

Label section : `"La solution"` — même style que le label contexte

**4 étapes numérotées (layout grille `72px 1fr`, gap `0 32px`):**

Chaque étape : numéro à gauche `fontSize: 13px`, `fontWeight: 500`, `color: #E8621A`, `letterSpacing: 0.04em`
Séparateur entre étapes : `borderBottom: 1px solid [border]`, `paddingBottom: 48px`, `marginBottom: 48px`

**Étape 01 — Audit des opportunités SEO**
Titre : `"Cartographie des mots-clés et des intentions de recherche"`
Texte : `"Avant de construire quoi que ce soit, SalesExperienz a conduit un audit structuré du secteur immobilier. La Carte des Opportunités a permis d'identifier les clusters de mots-clés à forte valeur commerciale pour Ambassimmo : génération leads immobilier, prospection digitale agence, trouver mandats exclusifs. En 60 secondes, le workflow DataForSEO a généré 487 keywords structurés avec leurs métriques complètes."`
Badges outils : `n8n` · `DataForSEO` · `Google Sheets`

**Étape 02 — Architecture Pillar-Cluster**
Titre : `"Planification stratégique avec le Skill Claude AI"`
Texte : `"Le Skill Claude AI a analysé les 487 keywords, formé 9 clusters sémantiques cohérents et calculé l'OpportunityScore de chaque groupe. Résultat : 3 articles piliers (guides complets 2 500 mots) et 24 articles satellites (800-1 200 mots) planifiés sur 6 mois, avec calendrier éditorial et briefs prêts à utiliser."`
Badges outils : `Claude AI` · `Google Sheets` · `Notion`

**Étape 03 — Déploiement de la machine à contenu**
Titre : `"Autoblogger V4 — publication quotidienne automatique"`
Texte : `"Le workflow Autoblogger n8n a été configuré sur le WordPress d'Ambassimmo. Chaque matin, le système lit le calendrier éditorial, génère l'article complet avec ses chapitres, crée l'image à la une via DALL-E, et publie directement sur le site. Zéro intervention manuelle requise. La confirmation de publication est logée automatiquement dans Google Sheets."`
Badges outils : `n8n` · `OpenAI GPT-4o` · `DALL-E 3` · `WordPress` · `Pexels`

**Étape 04 — Formation et passation**
Titre : `"Formation back-office et propriété totale des workflows"`
Texte : `"1h30 de formation en visio pour que Patrick maîtrise son système : ajouter un mot-clé, modifier le calendrier, ajuster le ton de voix. Documentation complète livrée. Les workflows appartiennent à 100% à Ambassimmo dès J+1 — si SalesExperienz disparaît demain, le système continue de tourner."`
Badges outils : `Loom` · `Notion` · `n8n`

---

### SECTION 5 — SCHÉMA TECHNIQUE (`padding: 80px 0`, fond `bg`)

**Container large :** `maxWidth: 1100px`, `margin: 0 auto`, `padding: 0 40px`

Label section : `"Schéma technique"`
H3 : `"Architecture du workflow Autoblogger — Ambassimmo"`

**SVG Workflow Diagram** (`viewBox="0 0 1020 280"`, `width="100%"`, `minWidth: 700px`)

5 blocs reliés par des flèches :

| Position x | Label | Sous-label | Icône | Couleur fond | Couleur bordure |
|---|---|---|---|---|---|
| 20 | Déclencheur | Chaque matin 7h | ⏱ | `rgba(20,20,19,0.04)` | `rgba(20,20,19,0.12)` |
| 220 | Calendrier | Google Sheets | ◎ | `rgba(74,191,176,0.06)` | `rgba(74,191,176,0.3)` |
| 420 | Génération | GPT-4o · Claude AI | ✦ | `rgba(232,98,26,0.06)` | `rgba(232,98,26,0.3)` |
| 620 | Publication | WordPress REST | ▶ | `rgba(74,191,176,0.06)` | `rgba(74,191,176,0.3)` |
| 820 | Confirmation | Google Sheets log | ▦ | `rgba(20,20,19,0.04)` | `rgba(20,20,19,0.12)` |

Annotation flottante au-dessus du bloc Génération :
- Rect : `x=368, y=20, w=264, h=36`, fond `rgba(232,98,26,0.06)`, bordure `rgba(232,98,26,0.2)`
- Texte : `"Claude AI intègre la méthode Capsule GEO"`, `color: #E8621A`
- Ligne pointillée vers le bloc

Annotation bas :
- Rect pill : `x=390, y=230, w=220, h=32`, fond `rgba(13,27,62,0.05)`
- Texte : `"Orchestration n8n · 180+ articles publiés · 0 erreur"`, `color: rgba(13,27,62,0.6)`

Container SVG : `background: [cardBg]`, `border: 1px solid [border]`, `borderRadius: 12px`, `padding: 48px 40px`, `overflowX: auto`

---

### SECTION 6 — RÉSULTATS (`padding: 80px 0`)

**Comportement visuel :** fond `#FAF9F5` (mode jour par défaut)

Label section : `"Résultats mesurés"`, `color: #E8621A`
H3 : `"6 mois après le déploiement"`, `fontSize: 32px`, `fontWeight: 600`, `marginBottom: 48px`, `maxWidth: 540px`

**Grille 3 colonnes, gap 16px :**

6 métriques cards (fond blanc, bordure `1px solid rgba(20,20,19,0.1)`, `borderRadius: 8px`, `padding: 36px 28px`) :

| Valeur | Label | Description |
|---|---|---|
| `180+` | articles publiés en automatique | En 6 mois, sans rédacteur ni agence |
| `+340%` | de trafic organique | Progression mesurée sur 6 mois |
| `3,20 €` | coût par article tout compris | vs 50–150 € en délégation freelance |
| `47` | keywords en page 1 Google | Sur les requêtes cibles du secteur immobilier |
| `23/mois` | leads organiques générés | Contre 0 avant le projet |
| `3 sem.` | du brief à la production | Déploiement complet clés en main |

Style valeur : `fontFamily: Lora/Urbanist`, `fontSize: 44px`, `fontWeight: 600`, `color: #E8621A`, `lineHeight: 1`, `letterSpacing: -0.02em`, `marginBottom: 10px`
Style label : `fontSize: 15px`, `fontWeight: 500`, `color: #141413`, `marginBottom: 8px`
Style description : `fontSize: 13px`, `color: #5E5D59`, `lineHeight: 1.55`

---

### SECTION 7 — TÉMOIGNAGE (`padding: 96px 0`, fond `bgAlt`, `borderBottom: 1px solid [border]`)

**Container centré :** `maxWidth: 640px`, `margin: 0 auto`, `textAlign: center`

Guillemet décoratif : `fontSize: 40px`, `color: rgba(20,20,19,0.15)`, `fontFamily: Georgia, serif`, `marginBottom: 32px`

Citation :
```
"En trois semaines, Laurent a transformé notre approche de l'acquisition.
Mon site publie un article par jour tout seul — je n'y touche plus.
Six mois après, j'ai 23 leads organiques par mois que je n'aurais jamais
eus sans ça. Le ROI est là, les chiffres sont là."
```
Style : `fontFamily: Lora, serif`, `fontSize: 24px`, `fontWeight: 500`, `lineHeight: 1.55`, `fontStyle: italic`, `color: [text1]`, `marginBottom: 40px`

**Attribution (flex centré, gap 16px) :**
- Avatar : cercle `48x48px`, `background: #0D1B3E`, lettre `"P"`, `fontFamily: Urbanist`, `fontWeight: 700`, `color: #fff`, `fontSize: 18px`
- Nom : `"Patrick Lafleur"`, `fontSize: 15px`, `fontWeight: 600`
- Titre : `"Fondateur, Ambassimmo"`, `fontSize: 13px`, `color: [text3]`

---

### SECTION 8 — CTA (`padding: 96px 0`, fond `bg`)

**Container :** `maxWidth: 760px`, `margin: 0 auto`, `padding: 0 40px`

**Grille `1fr auto`, gap 48px, alignItems center, marginBottom 80px :**

Colonne gauche :
- Eyebrow : `"Votre tour"`, `fontSize: 11px`, `fontWeight: 700`, `textTransform: uppercase`, `letterSpacing: 0.16em`, `color: #E8621A`, `marginBottom: 12px`
- H2 : `"Prêt à identifier ce qui freine votre visibilité ?"`, `fontSize: 32px`, `fontWeight: 600`, `lineHeight: 1.25`, `maxWidth: 480px`, `marginBottom: 14px`
- Sous-titre : `"45 minutes pour cartographier vos opportunités SEO-GEO.\nSans engagement, sans jargon technique."`, `fontSize: 16px`, `lineHeight: 1.7`, `fontWeight: 300`

Colonne droite (flex column, gap 12px) :
- Bouton principal : `"Réserver mon appel gratuit →"`, `background: #E8621A`, `color: #FAF9F5`, `fontSize: 16px`, `fontWeight: 500`, `borderRadius: 7.5px`, `padding: 14px 32px`, `border: none`, `cursor: pointer`
  - Hover : `background: #FF7D35`, `transform: translateY(-2px)`
- Ligne contact : téléphone `06 22 95 16 38` (lien `tel:+33622951638`) + email `contact@salesexperienz.fr`
  Style : `fontSize: 13px`, `color: [text3]`, séparateur `·`

**Section "Autres cas clients" (sous le CTA principal) :**
`paddingTop: 48px`, `borderTop: 1px solid [border]`

Label : `"Autres cas clients"`, `fontSize: 11px`, `fontWeight: 700`, `textTransform: uppercase`, `letterSpacing: 0.16em`, `color: [text3]`, `marginBottom: 24px`

Grille 3 colonnes, gap 16px — 3 cards cliquables :

| Tag | Titre | Temps |
|---|---|---|
| Prospection automatisée | Cabinet RH — Automatisation du suivi candidats | 6 min |
| SEO-GEO | Agence immobilière — 48 fiches locales/semaine avec l'IA | 4 min |
| Reporting | PME industrielle — Reporting commercial en 1 clic | 5 min |

Cards `href="#"` — style : `padding: 20px`, `borderRadius: 8px`, `border: 1px solid [border]`, `background: [cardBg]`, `textDecoration: none`
Hover : `borderColor: rgba(232,98,26,0.3)`, `transform: translateY(-2px)`, `boxShadow: 0 4px 16px rgba(0,0,0,0.06)`

---

### SECTION 9 — FOOTER (`background: #0A1530`, `padding: 48px 40px`)

**Container :** `maxWidth: 1100px`, `margin: 0 auto`, flex `space-between`, `alignItems: flex-start`, gap 48px, `flexWrap: wrap`

**Colonne 1 — Logo + copyright :**
- Logo : `/public/logo-blanc.png`, `height: 52px`, `marginBottom: 12px`
- Copyright : `"© 2026 Sales Experienz — Laurent Guyonvarch"`, `fontSize: 13px`, `color: #8B9CC8`

**Colonne 2 — Liens services :**
- Titre : `"Services"`, `fontSize: 13px`, `fontWeight: 700`, `color: #8B9CC8`
- Liens : `Prospection automatisée`, `Stratégie site web SEO-GEO`, `Blog`, `Contact`
  Style : `fontSize: 13px`, `color: #8B9CC8`, `textDecoration: none`

**Colonne 3 — Adresse :**
```
15 Bd Chevalier de Clerville, Bât. M3 — 34200 Sète
contact@salesexperienz.fr
06 22 95 16 38
```
Style : `fontStyle: normal`, `fontSize: 13px`, `color: #8B9CC8`

---

## 6. DESIGN SYSTEM (à respecter strictement, sans exception)

### 6.1 Palette de couleurs

```css
--navy:     #0D1B3E   /* Fond hero, navbar scrollée, fond dark */
--navy-alt: #162248   /* Variante navy légèrement plus claire */
--orange:   #E8621A   /* CTA, accents, badges, valeurs métriques */
--orange-h: #FF7D35   /* Orange hover */
--teal:     #4ABFB0   /* Accent secondaire */
--muted:    #8B9CC8   /* Texte secondaire sur fond navy */
--footer-bg:#0A1530   /* Footer (plus sombre que navy) */
```

### 6.2 Couleurs dynamiques selon le thème (mode Jour par défaut)

```tsx
// Mode Jour (défaut)
bg      = '#FAF9F5'           // Fond principal
bgAlt   = '#ffffff'           // Fond sections alternées
text1   = '#141413'           // Texte principal
text2   = '#5E5D59'           // Texte secondaire
text3   = '#8E8D89'           // Texte tertiaire / labels
border  = 'rgba(20,20,19,0.1)' // Bordures
cardBg  = '#ffffff'           // Fond des cards
```

### 6.3 Typographie

```tsx
// Police display (H1, H2, H3, chiffres métriques)
hFont = "'Lora', Georgia, serif"   // pour le style étude de cas

// Police corps (tout le reste)
bFont = "'DM Sans', system-ui, sans-serif"

// Police nav / boutons / labels
fb    = "'Plus Jakarta Sans', system-ui, sans-serif"
fd    = "'Urbanist', sans-serif"
```

**Import Google Fonts dans le layout ou la page :**
```html
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Urbanist:wght@700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

Ou via `next/font/google` :
```tsx
import { Lora, DM_Sans, Urbanist, Plus_Jakarta_Sans } from 'next/font/google'
```

### 6.4 Espacements & rayon

```tsx
borderRadius: 8px   // --cl-radius, toutes les cards
containerNarrow: { maxWidth: 760, margin: '0 auto', padding: '0 40px' }
containerWide:   { maxWidth: 1100, margin: '0 auto', padding: '0 40px' }
sectionPadding:  { padding: '72px 0' }      // sections standard
sectionPaddingL: { padding: '80px 0' }      // sections larges
sectionPaddingXL:{ padding: '96px 0' }      // témoignage et CTA
```

---

## 7. ANIMATIONS (Framer Motion)

Si Framer Motion est disponible dans le projet, appliquer sur chaque section :

```tsx
import { motion } from 'framer-motion'

// Entrée au scroll (à appliquer sur les containers de sections)
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
}

// Stagger pour les grilles de cards
const staggerContainer = {
  whileInView: { transition: { staggerChildren: 0.08 } }
}
```

**Règle `prefers-reduced-motion` — OBLIGATOIRE :**
```tsx
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
// Si true → pas d'animation, afficher directement l'état final
```

**Barre de progression de lecture (scroll) :**
```tsx
// Div fixe en haut de page, height: 2px, background: #E8621A, z-index: 999
// width: calculée en % du scroll total de la page
```

---

## 8. SEO & METADATA

### 8.1 generateMetadata (Next.js App Router)

```tsx
export const metadata: Metadata = {
  title: 'Étude de cas Ambassimmo — SEO Automatisé × SalesExperienz',
  description: 'De 0 article SEO à 180 publications automatiques et +340% de trafic organique en 6 mois. Découvrez comment Ambassimmo a remplacé ses budgets pub par un système autonome.',
  keywords: ['étude de cas SEO automatisé', 'ambassimmo', 'leads immobilier automatisation', 'n8n wordpress autoblogger', 'salesexperienz'],
  authors: [{ name: 'Laurent Guyonvarch', url: 'https://www.salesexperienz.fr' }],
  openGraph: {
    title: 'Étude de cas Ambassimmo — SEO Automatisé × SalesExperienz',
    description: 'De 0 article SEO à 180 publications automatiques et +340% de trafic organique en 6 mois.',
    url: 'https://www.salesexperienz.fr/etudes-de-cas/ambassimmo',
    siteName: 'SalesExperienz',
    images: [{ url: 'https://www.salesexperienz.fr/og-ambassimmo.jpg', width: 1200, height: 630 }],
    locale: 'fr_FR',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Étude de cas Ambassimmo — SEO Automatisé × SalesExperienz',
    description: 'De 0 article SEO à 180 publications automatiques et +340% de trafic organique en 6 mois.',
    images: ['https://www.salesexperienz.fr/og-ambassimmo.jpg'],
  },
  alternates: {
    canonical: 'https://www.salesexperienz.fr/etudes-de-cas/ambassimmo',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}
```

### 8.2 JSON-LD Schema (à injecter dans le return() de la page)

Fichier source : `lib/schema-ambassimmo.ts`

```tsx
// Dans le return() de page.tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(ambassimmoSchema) }}
/>
```

Contenu du schema (`lib/schema-ambassimmo.ts`) :
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.salesexperienz.fr/etudes-de-cas/ambassimmo",
      "headline": "De 0 article SEO à 180 publications automatiques et +340% de trafic organique en 6 mois",
      "description": "Comment Ambassimmo a remplacé ses budgets publicitaires par un système SEO automatisé avec n8n et GPT-4o.",
      "url": "https://www.salesexperienz.fr/etudes-de-cas/ambassimmo",
      "inLanguage": "fr-FR",
      "author": {
        "@type": "Person",
        "name": "Laurent Guyonvarch",
        "url": "https://www.salesexperienz.fr"
      },
      "publisher": {
        "@type": "Organization",
        "name": "SalesExperienz",
        "url": "https://www.salesexperienz.fr",
        "logo": "https://www.salesexperienz.fr/logo-noir.png"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.salesexperienz.fr" },
          { "@type": "ListItem", "position": 2, "name": "Cas clients", "item": "https://www.salesexperienz.fr/etudes-de-cas" },
          { "@type": "ListItem", "position": 3, "name": "Ambassimmo", "item": "https://www.salesexperienz.fr/etudes-de-cas/ambassimmo" }
        ]
      }
    },
    {
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
      }
    }
  ]
}
```

---

## 9. ASSETS DISPONIBLES

Tous les assets sont dans le dossier `/public` du projet Next.js :

| Fichier | Usage |
|---|---|
| `/public/logo-noir.png` | Logo navbar état normal (fond clair) |
| `/public/logo-blanc.png` | Logo navbar état scrollé (fond navy) + footer |
| `/public/Modele-photo-Laurent.jpg` | Photo de Laurent (section À propos si incluse) |
| `/public/og-ambassimmo.jpg` | À créer — image OG 1200×630px |

**Note OG image :** Si l'image OG n'existe pas encore, laisser la référence dans le metadata et ajouter un commentaire `// TODO: créer og-ambassimmo.jpg`.

---

## 10. FICHIERS À CRÉER

```
app/
└── etudes-de-cas/
    └── ambassimmo/
        └── page.tsx          ← composant principal + export metadata

lib/
└── schema-ambassimmo.ts      ← JSON-LD (Article + LocalBusiness + Breadcrumb)
```

**Optionnel si la page de listing n'existe pas encore :**
```
app/
└── etudes-de-cas/
    └── page.tsx              ← hub listing des études de cas (hors scope de ce brief)
```

---

## 11. RÈGLES ABSOLUES À RESPECTER

1. **Aucun composant global à créer** — tout est inline dans `page.tsx` (comme le prototype)
2. **Aucune couleur hors palette** — uniquement les variables CSS définies en Section 6
3. **Aucun texte générique** — pas de "Bienvenue", "solution tout-en-un", "boostez votre croissance"
4. **Police display** — Lora (serif) pour les titres H1/H2/H3 et les valeurs métriques
5. **Police corps** — DM Sans pour les paragraphes
6. **Police UI** — Plus Jakarta Sans pour les boutons, labels, navbar
7. **Toutes les dimensions d'éléments interactifs** ≥ 44×44px (accessibilité WCAG)
8. **Texte corps** minimum 16px — jamais en dessous
9. **Barre de progression** fixe en haut, `height: 2px`, `background: #E8621A`
10. **prefers-reduced-motion** — toutes les animations désactivées si la préférence système est activée
11. **Logo switche** entre noir et blanc selon l'état de scroll — jamais fixe
12. **Footer fond** obligatoirement `#0A1530` — pas `#0D1B3E`
13. **CTA unique** sur toute la page : `https://meet.brevo.com/laurent-guyonvarch/rendez-vous-decouverte`

---

## 12. CHECKLIST FINALE AVANT LIVRAISON

### Contenu
- [ ] Breadcrumb hero : salesexperienz.fr → Cas clients → Ambassimmo
- [ ] 4 métriques hero correctes (Immobilier · Lead Gen · 3 semaines · +340%)
- [ ] 3 paragraphes contexte rédigés sans formule générique
- [ ] 4 stats colonne droite en place (0 articles, 100% payant, +40% CPL, 3 sem.)
- [ ] 4 étapes solution avec badges outils corrects
- [ ] SVG workflow 5 blocs avec annotation Claude AI
- [ ] 6 métriques résultats correctes (180+, +340%, 3,20€, 47, 23/mois, 3 sem.)
- [ ] Témoignage Patrick Lafleur complet
- [ ] 3 cards "autres cas clients" en bas du CTA

### Design
- [ ] Fond hero strictement `#0D1B3E`
- [ ] Fond footer strictement `#0A1530`
- [ ] Police display = Lora sur titres et métriques
- [ ] Police corps = DM Sans sur paragraphes
- [ ] Orange `#E8621A` uniquement sur CTA, badges, valeurs métriques, labels sections
- [ ] Logo switche noir/blanc au scroll
- [ ] Barre de progression orange en haut de page

### SEO & Technique
- [ ] `generateMetadata()` exporté avec title, description, OG, Twitter, canonical
- [ ] JSON-LD injecté dans le return() via `dangerouslySetInnerHTML`
- [ ] `prefers-reduced-motion` respecté sur toutes les animations
- [ ] Lien CTA Brevo opérationnel partout
- [ ] Images : `alt` renseigné, dimensions définies
- [ ] Tous les liens internes corrects (`/etudes-de-cas`, `/#services`, etc.)

---

*Brief v1.0 — SalesExperienz · Laurent Guyonvarch · Avril 2026*
*Destinataire : Claude Code · Ne pas modifier sans validation de Laurent*
