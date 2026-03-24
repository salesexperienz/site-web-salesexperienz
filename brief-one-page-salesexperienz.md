# BRIEF COMPLET — ONE PAGE NEXT.JS
## SalesExperienz — Automatisation & n8n
**À transmettre à Claude Code tel quel**

---

## 1. CONTEXTE DU PROJET

Créer une **one page Next.js** (App Router) pour **SalesExperienz**, l'agence d'automatisation IA de Laurent Guyonvarch. La page est déployée sur **Vercel**.

**Objectif unique de la page :** Pousser le visiteur à réserver un appel découverte de 45 minutes via Brevo.

**Lien CTA principal :**
`https://meet.brevo.com/laurent-guyonvarch/rendez-vous-decouverte`

**Cibles :**
- Dirigeants de PME/TPE qui veulent automatiser leurs opérations
- Consultants/indépendants qui veulent revendre de l'automatisation comme service

---

## 2. PALETTE DE COULEURS

```css
:root {
  --color-bg-primary: #0D1B3E;       /* Fond principal — bleu marine profond */
  --color-bg-secondary: #162248;     /* Sections alternées */
  --color-bg-card: #1E2D5A;          /* Cards, bordures */
  --color-accent-main: #E8621A;      /* Orange brûlé — CTA, mots-clés forts */
  --color-accent-hover: #FF7D35;     /* Orange vif — hover, highlights */
  --color-accent-teal: #4ABFB0;      /* Vert d'eau — icônes, badges */
  --color-text-primary: #FFFFFF;     /* Texte principal */
  --color-text-secondary: #8B9CC8;   /* Texte secondaire, sous-titres */
}
```

**Style général :**
- Fond sombre bleu marine tout au long de la page
- Sections alternées entre `--color-bg-primary` et `--color-bg-secondary`
- Mots-clés importants en orange `--color-accent-main` dans les titres
- Boutons CTA : style **pill** (border-radius: 50px), outline orange ou fond orange
- Touches de vert d'eau `--color-accent-teal` pour les icônes et badges de validation
- Petits points/particules décoratifs subtils sur le fond (comme la capture de référence)

**Typographie :**
- Titres : `Syne` ou `Outfit` (Google Fonts) — bold, impactant
- Corps : `DM Sans` ou `Plus Jakarta Sans` — lisible, moderne
- Jamais Arial, Inter ou Roboto

---

## 3. STRUCTURE DE LA PAGE (8 sections dans l'ordre)

### SECTION 1 — NAVBAR
- Logo texte : **SalesExperienz** (blanc, font titre)
- Liens : Pourquoi automatiser · Services · Comment ça marche · À propos
- Bouton CTA pill orange à droite : **"Réserver un appel"**
- Sticky en haut, fond `--color-bg-primary` avec légère transparence + blur

---

### SECTION 2 — HERO

**Layout :** 2 colonnes — texte à gauche, photo à droite

**Contenu texte :**

Pré-titre (small caps, orange, lettre-espacée) :
```
SALESEXPERIENZ · AUTOMATISATION IA
```

Titre H1 (très grand, blanc + mots-clés orange) :
```
Et si votre prochain levier de croissance
n'était pas un commercial de plus,
mais l'automatisation de vos processus ?
```
→ "levier de croissance" et "automatisation de vos processus" en orange

Sous-titre 1 (blanc, taille normale) :
```
La plupart des entreprises ont un goulot d'étranglement
qui plafonne leur chiffre d'affaires. On commence par le trouver.
```

Sous-titre 2 (bleu-gris secondaire) :
```
Chaque heure passée sur des tâches répétitives est une heure
que vous n'avez pas consacrée à votre croissance.
```

**Bouton CTA (pill, fond orange) :**
```
Réserver un appel découverte
```
Lien : `https://meet.brevo.com/laurent-guyonvarch/rendez-vous-decouverte`

**Texte sous le bouton (petit, bleu-gris) :**
```
Sans engagement — 45 minutes
```

**Colonne droite :**
- Placeholder image avec dimensions 480×560px
- Texte dans le placeholder : "Photo de Laurent Guyonvarch"
- Border-radius: 16px, légère border vert d'eau

---

### SECTION 3 — POURQUOI AUTOMATISER ?

**Fond :** `--color-bg-secondary`

**Pré-titre :**
```
LE DIAGNOSTIC
```

**Titre H2 :**
```
Votre entreprise se reconnaît dans l'une de ces situations ?
```

**4 cards** (grid 2×2 sur desktop, 1 colonne sur mobile) avec icône vert d'eau + titre orange + texte blanc :

**Card 1 — L'absence d'orchestration**
```
Vous avez les outils. Vous avez les idées.
Mais rien ne se parle, rien n'est coordonné.
Chaque process vit dans son coin.
```

**Card 2 — Le goulot invisible**
```
Vous avez la vision, les clients, l'envie de scaler —
mais quelque chose coince. Ce "quelque chose",
c'est souvent un process manuel que personne
n'a jamais pensé à automatiser.
```

**Card 3 — La roue du hamster**
```
Vous travaillez plus pour gagner pareil.
Vos journées sont pleines mais votre chiffre d'affaires,
lui, ne bouge pas.
```

**Card 4 — Le coût caché du temps perdu**
```
Chaque heure passée sur de la saisie, des relances manuelles
ou du reporting est une heure que vous ne facturez pas.
Calculez : ça fait combien par an ?
```

---

### SECTION 4 — LA CARTE DES OPPORTUNITÉS

**Fond :** `--color-bg-primary`

**Pré-titre :**
```
L'OFFRE SIGNATURE
```

**Titre H2 :**
```
La Carte des Opportunités :
découvrez exactement quoi automatiser — et pourquoi
```

**Texte intro :**
```
Avant de construire quoi que ce soit, on cartographie ensemble
votre entreprise. On identifie les goulots, on mesure le temps
perdu, on priorise les quick wins. Vous repartez avec un plan
clair, chiffré, actionnable.
```

**4 étapes** (timeline horizontale sur desktop, verticale mobile)
Chaque étape : numéro en orange + titre + description

**Étape 1 — Observer**
```
Lister toutes les tâches répétitives de votre équipe.
Rien ne passe entre les mailles.
```

**Étape 2 — Mesurer**
```
Temps × Fréquence = heures perdues et ROI annuel réel.
Des chiffres concrets, pas des estimations.
```

**Étape 3 — Prioriser**
```
Méthode ICE : Impact, Confiance, Facilité.
On commence par ce qui rapporte le plus vite.
```

**Étape 4 — Tester**
```
1 automatisation pilote, mesurée et documentée.
La preuve par l'exemple avant de scaler.
```

**Tableau ROI** (3 lignes, 4 colonnes) :

| Tâche | Temps | Fréquence | ROI annuel |
|---|---|---|---|
| Triage emails support | 2 min/email | 250/semaine | 28 000 €/an |
| Relances commerciales | 15 min/relance | 20/semaine | 17 000 €/an |
| Traitement des factures | 10 min/facture | 50/semaine | 28 000 €/an |

Style tableau : fond `--color-bg-card`, bordures subtiles bleu, header en orange

**Bouton CTA centré (pill, outline orange) :**
```
Identifier mes opportunités →
```
Lien : `https://meet.brevo.com/laurent-guyonvarch/rendez-vous-decouverte`

---

### SECTION 5 — CE QUE VOUS POUVEZ AUTOMATISER

**Fond :** `--color-bg-secondary`

**Pré-titre :**
```
VOS LEVIERS DE CROISSANCE
```

**Titre H2 :**
```
Automatisez ce qui compte vraiment
```

**Sous-titre :**
```
Chaque process automatisé est une heure récupérée,
une erreur évitée, un levier de croissance activé.
```

---

#### RANGÉE 1 — 4 grandes cards (grid 4 colonnes desktop, 2×2 tablette, 1 colonne mobile)
Chaque grande card : icône vert d'eau (grand) + titre H3 blanc + description + tag thématique orange

**Grande card 1 — Visibilité & Contenu**
- Icône : ✦
- Tag : `Croissance organique`
- Titre : `Visibilité & Contenu`
- Texte :
```
Blog SEO, posts LinkedIn, vidéos — publiés automatiquement
selon votre stratégie éditoriale. Votre marque gagne
en visibilité chaque jour, sans y passer vos nuits.
```

**Grande card 2 — Prospection automatisée**
- Icône : ◎
- Tag : `Acquisition`
- Titre : `Prospection automatisée`
- Texte :
```
Séquences email et LinkedIn déclenchées par des signaux
d'intention réels. Vous ne contactez que des prospects
qui ont déjà levé la main.
```

**Grande card 3 — Acquisition & Conversion**
- Icône : ⚡
- Tag : `Revenue`
- Titre : `Acquisition & Conversion`
- Texte :
```
Lead scoring automatique, qualification en temps réel,
routing vers le bon commercial. Aucun prospect chaud
ne passe entre les mailles.
```

**Grande card 4 — Relation client & Marketing**
- Icône : ◈
- Tag : `Fidélisation`
- Titre : `Relation client & Marketing`
- Texte :
```
Nurturing, relances, support — chaque interaction
déclenchée au bon moment selon le comportement réel
de votre contact.
```

---

#### RANGÉE 2 — 4 petites cards (grid 4 colonnes desktop, 2×2 tablette, 1 colonne mobile)
Cards plus compactes : icône petit + titre + texte court (2 lignes max)

**Petite card 1 — Onboarding client**
- Icône : →
- Titre : `Onboarding client`
- Texte : `Séquences d'accueil, documents, planification. Votre nouveau client pris en charge dès la signature.`

**Petite card 2 — Reporting & Pilotage**
- Icône : ▦
- Titre : `Reporting & Pilotage`
- Texte : `KPIs consolidés et envoyés automatiquement. Vous pilotez avec des données réelles, pas des tableurs manuels.`

**Petite card 3 — Facturation & Administratif**
- Icône : ◻
- Titre : `Facturation & Administratif`
- Texte : `Factures, relances impayés, contrats. Les tâches sans valeur ajoutée disparaissent de votre agenda.`

**Petite card 4 — Veille & Intelligence marché**
- Icône : ⊕
- Titre : `Veille & Intelligence marché`
- Texte : `Alertes concurrentielles, synthèses automatiques. Vous décidez avec les bonnes informations, au bon moment.`

---

### SECTION 6 — COMMENT ÇA MARCHE

**Fond :** `--color-bg-primary`

**Pré-titre :**
```
LE PROCESS
```

**Titre H2 :**
```
Stratégie + automatisation :
les deux ensemble, pas l'un sans l'autre
```

**Texte intro :**
```
Un workflow sans stratégie, c'est un moteur sans direction.
Chaque automatisation qu'on construit est précédée d'un travail
de conseil : on définit ensemble l'approche commerciale,
éditoriale ou opérationnelle qui va la rendre réellement efficace.
```

**3 étapes** (grande numérotation orange, layout alterné gauche/droite)

**Étape 1 — L'appel découverte + audit stratégique (45 min)**
```
On cartographie vos processus ET on analyse votre stratégie :
commerciale, de visibilité ou opérationnelle.
On identifie non seulement quoi automatiser — mais comment
le faire de façon cohérente avec vos objectifs de croissance.
On calcule le ROI potentiel — chiffres réels, pas d'estimations.
```
Résultat : `Vous repartez avec la Carte des Opportunités ET une direction stratégique claire.`

**Étape 2 — Conseil stratégique + construction (1 à 3 semaines)**
```
Avant d'écrire une seule ligne de workflow, on définit ensemble
la stratégie qui va le rendre efficace :
approche commerciale, séquencement des messages,
architecture éditoriale, KPIs cibles.
Puis on construit, on documente, on teste en sandbox,
on déploie. Vous validez chaque étape.
```
Résultat : `Votre workflow tourne — et vous comprenez pourquoi il fonctionne.`

**Étape 3 — Mesure, ajustement et scale**
```
On suit les résultats semaine après semaine.
On ajuste la stratégie si nécessaire.
On identifie les prochaines opportunités.
Vous êtes propriétaire de vos workflows — à vie.
```
Résultat : `Votre entreprise tourne plus vite, avec une stratégie qui s'affine en continu.`

---

### SECTION 7 — NOS SERVICES

**Fond :** `--color-bg-secondary`

**Pré-titre :**
```
NOS OFFRES
```

**Titre H2 :**
```
Nos écosystèmes les plus demandés
```

**Sous-titre :**
```
Des systèmes prêts à déployer, construits et testés en production.
Chacun est configuré selon votre contexte avant livraison.
```

**3 cards** côte à côte (grid 3 colonnes desktop, 1 colonne mobile)
Chaque card : icône vert d'eau + titre + description + liste de points + bouton

**Card 1 — Auto-Blog SEO**
- Icône : ✦ (étoile/contenu)
- Titre : `Auto-Blog SEO`
- Sous-titre : `Votre machine éditoriale SEO, automatisée`
- Description :
```
3 workflows n8n qui couvrent l'intégralité du cycle éditorial :
détection d'opportunités keywords, architecture Pillar-Cluster
et publication automatisée à ~2€ par article.
```
- Points :
  - De 30 à 365 articles/mois
  - DataForSEO + Claude AI + GPT-4o
  - Optimisation GEO pour ChatGPT et Perplexity
  - Vous pilotez la stratégie, l'IA produit
- Bouton pill outline : `En savoir plus →`
  Lien : `https://meet.brevo.com/laurent-guyonvarch/rendez-vous-de-presentation-automatisation`

**Card 2 — DeepSignal** (card mise en avant — légèrement plus grande ou badge "Populaire")
- Icône : ◎ (signal/radar)
- Badge : `Populaire`
- Titre : `DeepSignal`
- Sous-titre : `L'écosystème de prospection automatisée`
- Description :
```
4 modules interconnectés déclenchés par des signaux
d'intention réels : SEO, LinkedIn, Cold Email, Nurturing Brevo.
Vous ne contactez que des prospects qui ont déjà levé la main.
```
- Points :
  - 10 à 60 RDV qualifiés/mois
  - Signaux LinkedIn, Email, SEO, Brevo
  - Personnalisation industrielle par Claude AI
  - Scalable sans recruter
- Bouton pill fond orange : `En savoir plus →`
  Lien : `https://meet.brevo.com/laurent-guyonvarch/rendez-vous-de-presentation-automatisation`

**Card 3 — Impact Vidéo**
- Icône : ▶ (play/vidéo)
- Titre : `Impact Vidéo`
- Sous-titre : `Votre offre en vidéo — sans tournage`
- Description :
```
Coaching commercial + script sur-mesure + vidéo Remotion
livrée en 7 à 14 jours. Votre offre expliquée en 3 minutes,
deployable sur LinkedIn, YouTube et votre landing page.
```
- Points :
  - Coaching stratégique inclus
  - Technologie Remotion (React)
  - Formats 16:9, 9:16, 45 secondes
  - Code Next.js livré clé en main
- Bouton pill outline : `En savoir plus →`
  Lien : `https://meet.brevo.com/laurent-guyonvarch/rendez-vous-de-presentation-automatisation`

---

#### BLOC "SUR MESURE" — sous les 3 cards, pleine largeur

**Style :** card horizontale pleine largeur, fond `--color-bg-primary`, bordure gauche 4px orange (`--color-accent-main`), border-radius 16px, layout 2 colonnes (texte gauche, bouton droite centré verticalement)

**Icône :** ⚙ (vert d'eau)

**Titre :**
```
Votre besoin ne rentre pas dans une case ?
```

**Texte :**
```
Ces trois écosystèmes couvrent les besoins les plus fréquents —
mais chaque entreprise a ses propres processus, ses propres outils,
ses propres contraintes. On conçoit aussi des automatisations
entièrement sur mesure : de l'audit initial à la mise en production,
selon votre stack et vos objectifs.
```

**Bouton pill fond orange :**
```
Discutons de votre projet →
```
Lien : `https://meet.brevo.com/laurent-guyonvarch/rendez-vous-decouverte`

---

### SECTION 8 — À PROPOS

**Fond :** `--color-bg-primary`

**Layout :** 2 colonnes — photo gauche, texte droite

**Colonne gauche :**
- Placeholder image 400×480px
- Texte placeholder : "Photo de Laurent Guyonvarch"
- Border-radius: 16px

**Colonne droite :**

Pré-titre :
```
À PROPOS
```

Titre H2 :
```
Laurent Guyonvarch
```

Sous-titre (orange) :
```
Consultant en stratégie commerciale & automatisation IA
```

Bio :
```
Consultant en stratégie commerciale depuis 2003, j'accompagne
des entrepreneurs et dirigeants de PME depuis plus de 20 ans.

Depuis 2023, je me suis spécialisé dans l'automatisation IA
appliquée au business — en construisant des écosystèmes n8n
sur mesure que j'utilise moi-même chaque jour pour
salesexperienz.fr.

Je ne vends pas des workflows théoriques.
Je livre des systèmes testés, documentés, qui tournent
en production.
```

**Titre sous la bio :**
```
Stack technique maîtrisée
```

**Logos outils** (row de badges/pills, fond `--color-bg-card`) :
`n8n` · `Claude AI` · `GPT-4o` · `Gemini` · `DataForSEO` · `Brevo` · `WordPress` · `Vercel` · `Next.js` · `Remotion`

---


### SECTION 9 (BIS) — FAQ

**Fond :** `--color-bg-secondary`

**Pré-titre :**
```
VOS QUESTIONS
```

**Titre H2 :**
```
Tout ce que vous voulez savoir
avant de réserver un appel
```

**Style :** Accordion — chaque question cliquable, réponse qui se déplie avec animation. Une seule question ouverte à la fois. Bordure gauche orange sur la question active.

---

**Q1 — Dois-je savoir coder ou connaître n8n pour travailler avec vous ?**
```
Non. Une fois installé et configuré, aucune compétence technique n'est requise.
Vous pilotez la stratégie, l'IA exécute.
Une formation incluse vous rend autonome en 1h30.
```

**Q2 — Comment savez-vous quoi automatiser dans mon entreprise ?**
```
C'est l'objet de la Carte des Opportunités — on commence par un audit structuré
de vos processus avant de construire quoi que ce soit.
On ne propose rien sans avoir d'abord compris votre contexte.
```

**Q3 — Est-ce que ça fonctionne pour mon secteur d'activité ?**
```
L'automatisation s'applique à tout processus répétitif, quel que soit le secteur.
On a accompagné des consultants, des PME industrielles, des e-commerçants et des agences.
Si vous avez des tâches manuelles récurrentes, il y a des opportunités.
```

**Q4 — Combien de temps avant de voir des résultats ?**
```
Les premiers Quick Wins sont mesurables dès la première semaine de déploiement.
Pour les résultats SEO (Auto-Blog), comptez 3 mois d'indexation
et 6 mois de trafic organique mesurable.
```

**Q5 — Je suis propriétaire des workflows après la mission ?**
```
Oui, à 100%. Les workflows n8n, les données, les séquences — tout vous appartient
dès le premier jour. Aucun lock-in, aucune dépendance imposée.
```

**Q6 — Quel est le budget minimum pour démarrer ?**
```
On ne parle pas budget avant d'avoir compris votre situation.
L'appel de découverte est là pour ça — on identifie ensemble les opportunités,
puis on construit une proposition adaptée à votre contexte.
```

**Q7 — Que se passe-t-il si un workflow tombe en panne ?**
```
Chaque livraison inclut une documentation complète et un support post-déploiement.
On forme votre équipe à maintenir les workflows.
Et pour les clients qui le souhaitent, des offres de maintenance mensuelle sont disponibles.
```

---

### SECTION 9 — CTA FINAL

**Fond :** gradient de `--color-bg-secondary` vers `--color-bg-primary`

**Titre H2 (centré, très grand) :**
```
Prêt à identifier ce qui freine
votre croissance ?
```

**Sous-titre :**
```
Réservez un appel de découverte de 45 minutes.
On cartographie ensemble vos opportunités d'automatisation.
Aucune obligation, aucun jargon technique.
```

**Bouton CTA principal (pill, fond orange, grand) :**
```
Réserver mon appel découverte gratuit
```
Lien : `https://meet.brevo.com/laurent-guyonvarch/rendez-vous-decouverte`

**Texte rassurant sous le bouton :**
```
Sans engagement · 45 minutes · 100% en visio
```

---

### FOOTER

- Logo texte : **SalesExperienz**
- Liens : Blog · Contact
- Email : `contact@salesexperienz.fr`
- Téléphone : `06.22.95.16.38`
- Copyright : `© 2026 SalesExperienz — Laurent Guyonvarch`
- Fond : `#0A1530` (légèrement plus sombre que le bg principal)

---


---

## 8. GUIDE DESIGN DÉTAILLÉ

### 8.1 Typographie

```css
/* Google Fonts à importer */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap');

/* Échelle typographique */
--font-display: 'Syne', sans-serif;   /* Titres H1, H2 */
--font-body: 'DM Sans', sans-serif;   /* Corps, sous-titres, boutons */

/* Tailles */
H1 hero        : 56px desktop / 36px mobile — font-weight: 800 — line-height: 1.1
H2 sections    : 42px desktop / 28px mobile — font-weight: 700 — line-height: 1.2
H3 cards       : 22px desktop / 18px mobile — font-weight: 700 — line-height: 1.3
Pré-titres     : 12px — font-weight: 500 — letter-spacing: 0.2em — UPPERCASE
Corps texte    : 17px — font-weight: 400 — line-height: 1.7
Texte secondaire: 15px — color: var(--color-text-secondary)
Boutons        : 16px — font-weight: 500 — letter-spacing: 0.02em
Petits labels  : 13px — font-weight: 400

/* Mots-clés orange dans les titres */
/* Wrapper dans un <span class="text-accent"> */
.text-accent {
  color: var(--color-accent-main);  /* #E8621A */
  /* Pas de glow, pas d'effet — couleur pure, le contraste fait le travail */
}
```

---

### 8.2 Espacements & Rythme vertical

```css
/* Sections */
--section-padding-y: 120px desktop / 80px mobile   /* padding top + bottom */
--section-gap: 0px  /* Les sections se touchent, alternance bg fait la séparation */

/* Intérieur des sections */
--container-max-width: 1200px
--container-padding-x: 80px desktop / 24px mobile

/* Grids de cards */
--card-gap: 24px desktop / 16px mobile

/* Éléments dans les cards */
--card-padding: 32px desktop / 24px mobile

/* Espacement entre pré-titre et H2 */
--pretitle-mb: 12px

/* Espacement entre H2 et sous-titre */
--h2-mb: 20px

/* Espacement entre sous-titre et contenu */
--subtitle-mb: 48px desktop / 32px mobile
```

---

### 8.3 Particules de fond

```
Implémentation : canvas HTML5 ou SVG animé — PAS de librairie lourde type tsparticles
Inspiration : capture de référence fournie (fond bleu marine avec points lumineux subtils)

Specs :
- Nombre : 40 à 60 points par section hero
- Taille : 1.5px à 3px, aléatoire
- Couleur : rgba(255, 255, 255, 0.15) à rgba(255, 255, 255, 0.4)
- Quelques points en orange : rgba(232, 98, 26, 0.3) — ratio 1 pour 8
- Mouvement : très lent, dérive douce (vitesse 0.2 à 0.5px/frame), NO bounce agressif
- Distribution : aléatoire sur tout le fond, densité plus forte vers les bords
- Présent uniquement sur les sections Hero et CTA final
- Implémentation légère : requestAnimationFrame vanilla JS
```

---

### 8.4 Navbar — Scroll behavior

```
État initial (top de page) :
  background: transparent
  backdrop-filter: none
  border-bottom: none

État scrollé (dès 50px de scroll) :
  background: rgba(13, 27, 62, 0.92)    /* --color-bg-primary avec opacité */
  backdrop-filter: blur(12px)
  border-bottom: 1px solid rgba(255, 255, 255, 0.06)
  transition: all 0.3s ease

Logo :
  Font : Syne 700
  Taille : 22px
  Couleur : white
  "Sales" en blanc + "Experienz" en --color-accent-main

Liens nav :
  Font : DM Sans 400, 15px
  Couleur repos : rgba(255,255,255,0.7)
  Couleur hover : white
  Transition : color 0.2s ease
  Underline au hover : none — effet suffit avec la couleur

Bouton CTA navbar :
  Pill outline orange, padding 10px 22px
  Au hover : fond orange, texte blanc, transition 0.2s
```

---

### 8.5 Hero — Layout & Proportions

```
Layout desktop :
  Grid 2 colonnes : 55% texte gauche / 45% image droite
  Alignement vertical : centré
  Min-height section : 100vh
  Padding-top : 140px (compense la navbar sticky)

Colonne texte :
  Pré-titre → H1 → sous-titre 1 → sous-titre 2 → bouton CTA → texte rassurant
  Gap entre éléments : 20px sauf entre sous-titre 2 et bouton (32px)

H1 :
  Font-size : 58px
  Line-height : 1.08
  Les mots "levier de croissance" wrappés dans <span class="text-accent">
  Les mots "automatisation de vos processus" wrappés dans <span class="text-accent">
  Animation : fade-up sur chaque ligne avec stagger 0.1s

Colonne image (placeholder) :
  Dimensions : 480 × 560px
  Border-radius : 20px
  Border : 1.5px solid rgba(74, 191, 176, 0.3)  /* vert d'eau subtil */
  Background placeholder : --color-bg-card
  Légère rotation : transform: rotate(2deg)  /* inclinaison subtile */
  Fond placeholder : gradient de --color-bg-secondary à --color-bg-card

Layout mobile :
  1 colonne — image cachée (display:none) ou petite vignette ronde au-dessus du texte
  H1 : 34px
```

---

### 8.6 Cards — Hover, ombres, bordures

```css
/* État repos */
.card {
  background: var(--color-bg-card);          /* #1E2D5A */
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 32px;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

/* État hover */
.card:hover {
  transform: translateY(-6px);
  border-color: rgba(232, 98, 26, 0.4);      /* orange subtil */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
              0 0 0 1px rgba(232, 98, 26, 0.15);  /* glow orange très léger */
}

/* Icônes dans les cards */
.card-icon {
  width: 44px;
  height: 44px;
  background: rgba(74, 191, 176, 0.12);      /* vert d'eau très transparent */
  border-radius: 10px;
  color: var(--color-accent-teal);           /* #4ABFB0 */
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
  font-size: 20px;
}

/* Grande card vs petite card (section 5) */
.card-large { min-height: 220px; }
.card-small { min-height: 140px; padding: 24px; }
.card-small .card-icon { width: 32px; height: 32px; font-size: 15px; }

/* Card mise en avant (DeepSignal) */
.card-featured {
  border-color: rgba(232, 98, 26, 0.35);
  background: linear-gradient(135deg, #1E2D5A 0%, #24356A 100%);
  position: relative;
}
/* Badge populaire */
.badge-popular {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  background: var(--color-accent-main);
  color: white; font-size: 12px; font-weight: 500;
  padding: 4px 16px; border-radius: 20px;
  letter-spacing: 0.05em; text-transform: uppercase;
}
```

---

### 8.7 Boutons — Micro-animations hover

```css
/* Bouton principal — fond orange */
.btn-primary {
  background: var(--color-accent-main);      /* #E8621A */
  color: white;
  border: 2px solid var(--color-accent-main);
  border-radius: 50px;
  padding: 14px 32px;
  font-family: var(--font-body);
  font-size: 16px; font-weight: 500;
  cursor: pointer;
  position: relative; overflow: hidden;
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-primary:hover {
  background: var(--color-accent-hover);     /* #FF7D35 */
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(232, 98, 26, 0.4);
}
.btn-primary:active { transform: translateY(0px); }

/* Bouton secondaire — outline orange */
.btn-secondary {
  background: transparent;
  color: var(--color-accent-main);
  border: 2px solid var(--color-accent-main);
  border-radius: 50px;
  padding: 14px 32px;
  font-size: 16px; font-weight: 500;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}
.btn-secondary:hover {
  background: var(--color-accent-main);
  color: white;
  transform: translateY(-2px);
}

/* Flèche dans les boutons avec "→" */
/* La flèche glisse de 4px vers la droite au hover */
.btn-arrow span {
  display: inline-block;
  transition: transform 0.2s ease;
  margin-left: 6px;
}
.btn-arrow:hover span { transform: translateX(4px); }

/* Grand bouton CTA final */
.btn-primary-lg {
  padding: 18px 48px;
  font-size: 18px;
}
```

---

### 8.8 FAQ Accordion

```
Composant : accordion Framer Motion — animation de hauteur fluide

Structure HTML :
  <div class="faq-item">
    <button class="faq-question">
      <span>Question text</span>
      <span class="faq-icon">+</span>   ← devient × quand ouvert
    </button>
    <div class="faq-answer">  ← animé en hauteur
      <p>Réponse</p>
    </div>
  </div>

Styles :
  .faq-item :
    border-bottom: 1px solid rgba(255,255,255,0.08)
    padding: 24px 0

  .faq-question :
    width: 100%
    display: flex; justify-content: space-between; align-items: center
    font-size: 18px; font-weight: 500; color: white
    cursor: pointer; background: transparent; border: none
    text-align: left

  .faq-question:hover :
    color: var(--color-accent-main)
    transition: color 0.2s ease

  .faq-item[data-open="true"] .faq-question :
    color: var(--color-accent-main)
    /* + bordure gauche orange sur toute la question */
    border-left: 3px solid var(--color-accent-main)
    padding-left: 16px
    transition: all 0.2s ease

  .faq-icon :
    font-size: 22px; font-weight: 300
    transition: transform 0.3s ease
    color: var(--color-accent-main)
  .faq-item[data-open="true"] .faq-icon :
    transform: rotate(45deg)   /* + devient × */

  .faq-answer :
    font-size: 16px; color: var(--color-text-secondary)
    line-height: 1.7
    padding-top: 16px; padding-right: 40px
    /* Animation Framer Motion : initial height 0 → auto */

Comportement :
  Une seule question ouverte à la fois
  Première question ouverte par défaut au chargement
  Smooth height animation : duration 0.35s, ease [0.4, 0, 0.2, 1]
```

---

### 8.9 Animations & Reveals au scroll

```
Librairie : Framer Motion (useInView hook)
Principe : chaque élément entre en scène depuis le bas avec fade

/* Paramètres de base pour tous les reveals */
initial   : { opacity: 0, y: 30 }
animate   : { opacity: 1, y: 0 }
transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
viewport  : { once: true, margin: "-80px" }

/* Stagger sur les grids de cards */
/* Chaque card a un delay décalé de 0.1s */
card[0] → delay: 0
card[1] → delay: 0.1
card[2] → delay: 0.2
card[3] → delay: 0.3
(max 4 cards en stagger, les suivantes en simultané)

/* Hero — animation à l'entrée de page */
pré-titre  → fade-up, delay: 0.1s
H1 ligne 1 → fade-up, delay: 0.2s
H1 ligne 2 → fade-up, delay: 0.3s
H1 ligne 3 → fade-up, delay: 0.4s
sous-titres → fade-up, delay: 0.5s
bouton CTA  → fade-up, delay: 0.6s
image       → fade-in (opacity seulement) + légère scale 0.97→1, delay: 0.3s

/* Titres H2 de section */
pré-titre + H2 → fade-up groupés, delay: 0

/* Éléments de timeline (section Comment ça marche) */
Chaque étape slide depuis la gauche :
initial: { opacity: 0, x: -30 }
delay: index × 0.15s

/* Tableau ROI (section Carte des Opportunités) */
Chaque ligne du tableau → fade-up, stagger 0.08s

/* NE PAS animer */
La navbar (toujours visible)
Le footer (trop bas, peu vu)
```

---
## 4. SPECS TECHNIQUES NEXT.JS

```
Framework   : Next.js 14+ (App Router)
Déploiement : Vercel
CSS         : Tailwind CSS ou CSS Modules (au choix Claude Code)
Fonts       : Google Fonts — Syne (titres) + DM Sans (corps)
Images      : next/image avec placeholders
Animations  : Framer Motion pour les reveals au scroll
              (staggered fade-up sur les cards)
SEO         : metadata complet dans layout.tsx
              og:title, og:description, og:image
Responsive  : Mobile-first, breakpoints sm/md/lg/xl
```

**Structure de fichiers suggérée :**
```
app/
  layout.tsx        ← metadata SEO + fonts
  page.tsx          ← import de toutes les sections
  globals.css       ← variables CSS couleurs
components/
  Navbar.tsx
  Hero.tsx
  WhyAutomate.tsx
  OpportunityMap.tsx
  WhatToAutomate.tsx
  HowItWorks.tsx
  Services.tsx
  About.tsx
  FAQ.tsx
  FinalCTA.tsx
  Footer.tsx
```

---

## 5. NOTES DESIGN IMPORTANTES

- **Particules décoratives** : petits points lumineux subtils sur les fonds sombres (SVG ou CSS), comme la capture de référence fournie
- **Titres H2** : toujours avec 1-2 mots-clés en orange `--color-accent-main`
- **Boutons** :
  - Principal (fond orange) : `background: var(--color-accent-main); color: white; border-radius: 50px; padding: 14px 32px`
  - Secondaire (outline orange) : `border: 2px solid var(--color-accent-main); color: var(--color-accent-main); border-radius: 50px; background: transparent`
- **Cards** : fond `--color-bg-card`, border subtile `rgba(255,255,255,0.08)`, border-radius 16px
- **Animations** : fade-up au scroll avec Framer Motion, délais décalés sur les grids de cards
- **Hover effects** : légère élévation (translateY -4px) + border orange sur les cards au hover

---

## 6. SEO & GEO — MÉTADONNÉES

```typescript
// app/layout.tsx
export const metadata = {
  title: "Automatisation IA & n8n — SalesExperienz | Laurent Guyonvarch",
  description: "Identifiez ce que votre entreprise peut automatiser avec la Carte des Opportunités. Écosystèmes n8n sur mesure pour accélérer votre croissance sans recruter.",
  keywords: "automatisation n8n, workflows IA, automatisation entreprise, n8n consultant, automatisation processus BtoB",
  openGraph: {
    title: "Automatisation IA & n8n — SalesExperienz",
    description: "Découvrez exactement quoi automatiser dans votre entreprise — et pourquoi.",
    url: "https://salesexperienz.fr",
    siteName: "SalesExperienz",
    locale: "fr_FR",
    type: "website",
  },
}
```

**Schema.org JSON-LD à inclure dans layout.tsx :**
```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "SalesExperienz",
  "description": "Automatisation IA et workflows n8n sur mesure pour entreprises BtoB",
  "url": "https://salesexperienz.fr",
  "telephone": "+33622951638",
  "email": "contact@salesexperienz.fr",
  "founder": {
    "@type": "Person",
    "name": "Laurent Guyonvarch",
    "jobTitle": "Consultant en automatisation IA"
  },
  "serviceType": "Automatisation de processus d'entreprise",
  "areaServed": "FR"
}
```

---

## 7. RÉSUMÉ DES LIENS CTA

| Bouton | Lien |
|---|---|
| Tous les "Réserver un appel découverte" | `https://meet.brevo.com/laurent-guyonvarch/rendez-vous-decouverte` |
| Tous les "En savoir plus" des services | `https://meet.brevo.com/laurent-guyonvarch/rendez-vous-de-presentation-automatisation` |
| "Identifier mes opportunités" (section Carte) | `https://meet.brevo.com/laurent-guyonvarch/rendez-vous-decouverte` |

---

*Brief rédigé le 22 mars 2026 — SalesExperienz / Laurent Guyonvarch*
*À transmettre à Claude Code pour implémentation Next.js*
