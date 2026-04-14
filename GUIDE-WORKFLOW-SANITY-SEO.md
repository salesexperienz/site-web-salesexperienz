# Guide Workflow — Sanity × Vercel × SEO-GEO
**salesexperienz.fr** — Stack : Next.js 15 · Sanity v5 · Vercel · Tailwind

---

## 1. Architecture de la liaison Vercel ↔ Sanity

### Comment ça fonctionne

```
Sanity Studio (sanity.studio)
    │
    │  webhook POST → /api/indexnow?slug=SLUG  (à chaque publication)
    ▼
Next.js App (Vercel)
    ├── app/blog/[slug]/page.tsx  ← generateStaticParams() lit les posts Sanity
    ├── app/sitemap.ts            ← getPostsForSitemap() liste tous les slugs
    └── app/api/indexnow/route.ts ← notifie Bing/Yandex de la nouvelle URL
```

### Variables d'environnement requises (Vercel Dashboard → Settings → Environment Variables)

| Variable | Valeur | Utilisation |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `0wgbhtrw` | Lecture Sanity côté client |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Jeu de données |
| `INDEXNOW_SECRET` | token secret | Sécuriser le POST /api/indexnow |

### Configurer le webhook Sanity → IndexNow (à faire une seule fois)

1. Ouvrir [manage.sanity.io](https://manage.sanity.io) → projet → **API** → **Webhooks**
2. Créer un webhook :
   - **Name** : IndexNow on publish
   - **URL** : `https://www.salesexperienz.fr/api/indexnow?slug={_id}`  
     ⚠️ Remplacer `{_id}` par la projection GROQ : utiliser le **filter** `_type == "post"` et le **projection** `slug.current`
   - **Trigger on** : `create`, `update`
   - **Filter** : `_type == "post" && defined(slug.current)`
   - **Projection** : `{slug}`
   - **Method** : GET
   - **URL finale** : `https://www.salesexperienz.fr/api/indexnow?slug=$slug.current$`
3. Sauvegarder → tester avec le bouton **Test**

### Configurer le webhook Sanity → Vercel (revalidation automatique)

Pour régénérer les pages statiques sans redéployer manuellement :

1. Vercel Dashboard → projet **salesexperienz** → **Settings** → **Git** → **Deploy Hooks**
2. Créer un hook nommé "Sanity Publish" → copier l'URL
3. Dans Sanity Webhooks, créer un second webhook :
   - **URL** : l'URL Vercel deploy hook copiée
   - **Method** : POST
   - **Filter** : `_type == "post"`
4. À chaque publication d'article, Vercel redéploie automatiquement

---

## 2. Déployer les changements

### Déployer le site (Next.js → Vercel)
```bash
cd "/Users/laurentguyonvarch/Site web Sales experienz"
npm run deploy
# = vercel deploy --prod
```

### Déployer le studio Sanity (interface d'édition)
```bash
cd "/Users/laurentguyonvarch/Site web Sales experienz"
npx sanity deploy
# Studio disponible sur : https://salesexperienz.sanity.studio/
```

**Règle** : toujours déployer Sanity après avoir modifié un schéma (`sanity/schemaTypes/`).

---

## 3. Schéma d'un article Sanity (postType)

Fichier : `sanity/schemaTypes/postType.ts`

| Champ | Type | Usage |
|---|---|---|
| `title` | string | Titre principal affiché (6-12 mots) |
| `slug` | slug | URL de l'article — généré depuis le titre |
| `author` | reference | Référence vers un auteur |
| `mainImage` | image | Image hero de l'article |
| `categories` | array[reference] | Catégories (filtres blog) — doit être publié |
| `publishedAt` | datetime | Date de publication |
| `excerpt` | text | Résumé 2-3 phrases (cartes + métas) |
| `tags` | array[string] | Mots-clés libres (n8n, LinkedIn…) — affichés en couleur dans le hero |
| `body` | blockContent | Contenu complet (Portable Text) |
| `badge` | string (radio) | `popular` = "Le plus lu" / `shared` = "Le plus partagé" |
| `featured` | boolean | ✅ = article mis en avant sur la page /blog |
| `seoTitle` | string | Titre Google (max 60 car.) — différent du titre principal |
| `seoDescription` | text | Meta description (150-160 car.) avec mot-clé + CTA |

---

## 4. Workflow de publication d'un article (étape par étape)

### Dans Sanity Studio (salesexperienz.sanity.studio)

**Étape 1 — Créer les catégories** (si nouvelles)
- Menu gauche → **Categories** → `+`
- Renseigner Title + Slug → **Publish**
- ⚠️ Publier la catégorie AVANT de l'assigner à l'article

**Étape 2 — Créer l'article**
- Menu gauche → **Article de blog** → `+`
- Remplir dans cet ordre :
  1. **Titre** — accrocheur, 6-12 mots
  2. **Slug URL** → cliquer "Generate"
  3. **Image principale** → upload + renseigner le texte alternatif
  4. **Catégories** → assigner 1-2 catégories publiées
  5. **Date de publication** → choisir la date
  6. **Résumé** — 2-3 phrases, donne envie de lire
  7. **Mots-clés / Tags** — taper + Entrée (ex: n8n, LinkedIn, IA)
  8. **Contenu** — corps de l'article avec H2/H3
  9. **Badge** — optionnel (Le plus lu / Le plus partagé)
  10. **Article à la une** — cocher si c'est le featured sur /blog
  11. **Titre SEO** — max 60 car. avec mot-clé principal
  12. **Description SEO** — 150-160 car. avec CTA

**Étape 3 — Publier**
- Bouton **Publish** en haut à droite
- Le webhook déclenche IndexNow → Bing/Yandex indexe l'URL

---

## 5. Optimisation SEO-GEO par article

### Checklist avant publication

```
[ ] Titre principal : question ou promesse concrète (6-12 mots)
[ ] Titre SEO : max 60 car., mot-clé en début de phrase
[ ] Meta description : 150-160 car., mot-clé + verbe d'action + CTA
[ ] Slug : court, en français, sans accents (généré automatiquement)
[ ] Image principale : texte alternatif descriptif renseigné
[ ] Catégorie : au moins 1 catégorie publiée assignée
[ ] Tags : 3-5 mots-clés thématiques (niveau article)
[ ] H2/H3 dans le contenu : structure claire, mot-clé dans les titres
[ ] Excerpt : résumé humain, pas copié depuis le corps de l'article
[ ] Date de publication : date réelle ou légèrement dans le passé
```

### GEO — être cité par les IA (ChatGPT, Perplexity, Claude)

- Utiliser des formulations directes : "Voici comment…", "La méthode est…"
- Inclure des listes numérotées et des tableaux (format facile à extraire)
- Mentionner des chiffres concrets (ex: "10 à 30 RDV qualifiés par mois")
- Citer des outils nommés (n8n, Brevo, DataForSEO, LinkedIn)
- Conclure avec un résumé actionnable en fin d'article

---

## 6. Import d'articles WordPress vers Sanity

### Méthode 1 — Import via script Node.js (recommandée)

**Prérequis**
```bash
npm install @portabletext/html-to-portable-text @sanity/client
```

**Script d'import** — créer `scripts/import-wordpress.ts`

```typescript
import { createClient } from '@sanity/client'
import { htmlToBlocks } from '@portabletext/html-to-portable-text'
import fs from 'fs'

const client = createClient({
  projectId: '0wgbhtrw',
  dataset: 'production',
  apiVersion: '2026-04-13',
  token: process.env.SANITY_WRITE_TOKEN, // token avec droits d'écriture
  useCdn: false,
})

// Charger le fichier JSON exporté de WordPress (via plugin WP JSON Exporter)
const wpPosts = JSON.parse(fs.readFileSync('./wordpress-export.json', 'utf-8'))

async function importPost(wp: any) {
  const body = htmlToBlocks(wp.content, {
    parseSpans: true,
  })

  const slug = wp.slug // déjà en format URL
  const doc = {
    _type: 'post',
    title: wp.title,
    slug: { _type: 'slug', current: slug },
    excerpt: wp.excerpt?.replace(/<[^>]+>/g, '').trim().slice(0, 300),
    publishedAt: wp.date,
    body,
    seoTitle: wp.yoast_title || wp.title,
    seoDescription: wp.yoast_description || '',
  }

  await client.createOrReplace({ ...doc, _id: `wp-${wp.id}` })
  console.log(`✓ Importé : ${wp.title}`)
}

async function run() {
  for (const post of wpPosts) {
    await importPost(post)
  }
  console.log('Import terminé.')
}

run()
```

**Obtenir un token Sanity en écriture**
1. [manage.sanity.io](https://manage.sanity.io) → projet → **API** → **Tokens**
2. Créer un token **Editor** → copier la valeur
3. `export SANITY_WRITE_TOKEN=sk...`
4. `npx tsx scripts/import-wordpress.ts`

### Méthode 2 — Plugin WordPress "WP Sanity Sync"

Pour une synchronisation continue WordPress → Sanity :
- Installer le plugin **WP2Static** ou **Sanity for WordPress** (marketplace WP)
- Configurer avec le projectId `0wgbhtrw` et le token Editor

### Après l'import

- Vérifier les slugs (doublons éventuels)
- Assigner les catégories manuellement dans Sanity Studio
- Renseigner les champs SEO manquants (seoTitle, seoDescription)
- Publier les articles (statut Draft par défaut après import)
- Lancer IndexNow pour soumettre toutes les URLs :
  ```bash
  curl -X POST "https://www.salesexperienz.fr/api/indexnow" \
    -H "x-indexnow-secret: VOTRE_SECRET"
  ```

---

## 7. Soumettre toutes les URLs à IndexNow (en masse)

```bash
# Via curl (remplacer VOTRE_SECRET par la valeur dans Vercel env)
curl -X POST "https://www.salesexperienz.fr/api/indexnow?secret=VOTRE_SECRET"

# Réponse attendue :
# { "ok": true, "urlsSubmitted": 89, "urls": [...] }
```

L'endpoint `/api/indexnow` soumet automatiquement :
- Toutes les pages statiques (homepage, /blog, /services/*)
- Tous les articles Sanity publiés

---

## 8. Checklist de mise en ligne d'un nouvel article

```
[ ] 1. Créer/vérifier les catégories dans Sanity (publiées)
[ ] 2. Rédiger l'article dans Sanity (tous les champs)
[ ] 3. Vérifier : seoTitle ≤ 60 car., seoDescription 150-160 car.
[ ] 4. Publier l'article → webhook IndexNow se déclenche auto
[ ] 5. Si webhook non configuré : curl POST /api/indexnow
[ ] 6. Vérifier l'article sur https://www.salesexperienz.fr/blog/SLUG
[ ] 7. Partager sur LinkedIn avec l'URL de l'article
[ ] 8. Dans Google Search Console → "Demander l'indexation" sur l'URL
```

---

## 9. Fichiers clés à connaître

| Fichier | Rôle |
|---|---|
| `sanity/schemaTypes/postType.ts` | Schéma Sanity — modifier pour ajouter des champs |
| `lib/sanity.ts` | Requêtes GROQ — modifier pour exposer de nouveaux champs |
| `app/blog/page.tsx` | Page listing du blog |
| `app/blog/[slug]/page.tsx` | Template article individuel |
| `app/sitemap.ts` | Sitemap XML dynamique |
| `app/api/indexnow/route.ts` | API IndexNow (GET slug unique / POST masse) |
| `components/BlogFilters.tsx` | Pills de filtre par catégorie |
| `components/ArticleSidebar.tsx` | Sidebar sticky (sommaire + agenda + newsletter) |
| `components/ArticleFooterBlocks.tsx` | Blocs de fin d'article (offre + CTA) |

---

## 10. Commandes de référence

```bash
# Déployer le site
npm run deploy

# Déployer le studio Sanity
npx sanity deploy

# Build local pour tester
npm run build

# Dev local
npm run dev
# → http://localhost:3000
# → http://localhost:3000/studio (Sanity Studio local)
```

---

*Guide créé le 13 avril 2026 — salesexperienz.fr*
