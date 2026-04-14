# SEO & GEO Playbook — SalesExperienz
> Techniques implémentées sur salesexperienz.fr (Next.js 15 + Sanity CMS + Vercel)  
> Réutilisables sur tout projet Next.js App Router

---

## Table des matières

1. [Metadata statique — pages fixes](#1-metadata-statique--pages-fixes)
2. [Metadata dynamique — pages de contenu (blog)](#2-metadata-dynamique--pages-de-contenu-blog)
3. [Open Graph & Twitter Card](#3-open-graph--twitter-card)
4. [URL canonique](#4-url-canonique)
5. [JSON-LD — BlogPosting (articles)](#5-json-ld--blogposting-articles)
6. [JSON-LD — @graph structuré (homepage)](#6-json-ld--graph-structuré-homepage)
7. [JSON-LD — LocalBusiness + MarketingAgency](#7-json-ld--localbusiness--marketingagency)
8. [JSON-LD — WebSite + SearchAction](#8-json-ld--website--searchaction)
9. [JSON-LD — FAQPage (GEO)](#9-json-ld--faqpage-geo)
10. [Sitemap dynamique (Sanity CMS)](#10-sitemap-dynamique-sanity-cms)
11. [robots.txt — autoriser les bots IA (GEO)](#11-robotstxt--autoriser-les-bots-ia-geo)
12. [IndexNow — soumission programmatique](#12-indexnow--soumission-programmatique)
13. [GEO — Generative Engine Optimization](#13-geo--generative-engine-optimization)
14. [Checklist de lancement](#14-checklist-de-lancement)

---

## 1. Metadata statique — pages fixes

À placer dans chaque `page.tsx` ou dans `layout.tsx` pour les métadonnées globales.

```typescript
// app/services/ma-page/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Titre de la page — Nom du Site | Ville',
  description: 'Description claire de 150-160 caractères. Inclure le mot-clé principal et la localisation.',
  keywords: ['mot-clé 1', 'mot-clé 2', 'ville', 'secteur'],
  authors: [{ name: 'Prénom Nom', url: 'https://monsite.fr/a-propos' }],
}
```

**Règles :**
- `title` : 50-60 caractères max, mot-clé principal en début
- `description` : 150-160 caractères, incite au clic
- Ne jamais dupliquer le même `title` sur deux pages

---

## 2. Metadata dynamique — pages de contenu (blog)

Pour les pages générées depuis un CMS (Sanity, Contentful, etc.).

```typescript
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'

const SITE_URL = 'https://www.monsite.fr'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)          // fetch depuis CMS
  if (!post) return {}

  const title       = post.seoTitle || post.title
  const description = post.seoDescription || post.excerpt || ''
  const canonicalUrl = `${SITE_URL}/blog/${slug}`
  const ogImage = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : `${SITE_URL}/og-default.jpg`

  return {
    title: `${title} | Nom du Site`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Nom du Site',
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author ?? 'Auteur'],
      tags: post.tags ?? [],
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
```

**Points clés :**
- Priorité à `seoTitle`/`seoDescription` du CMS sur les champs génériques
- `type: 'article'` + `publishedTime` pour les articles de blog
- L'image OG doit être 1200×630px minimum

---

## 3. Open Graph & Twitter Card

```typescript
openGraph: {
  title: 'Titre page',
  description: 'Description 150 caractères',
  url: 'https://www.monsite.fr/ma-page',
  siteName: 'Nom du Site',
  type: 'website',           // ou 'article' pour les articles
  locale: 'fr_FR',
  images: [{
    url: 'https://www.monsite.fr/og-image.jpg',
    width: 1200,
    height: 630,
    alt: 'Description de l\'image',
  }],
},
twitter: {
  card: 'summary_large_image',
  title: 'Titre',
  description: 'Description',
  images: ['https://www.monsite.fr/og-image.jpg'],
},
```

**Pour un article (`type: 'article'`) :**
```typescript
openGraph: {
  type: 'article',
  publishedTime: '2026-04-13T08:00:00Z',    // ISO 8601
  modifiedTime: '2026-04-13T10:00:00Z',
  authors: ['Laurent Guyonvarch'],
  tags: ['SEO', 'automatisation', 'n8n'],
}
```

---

## 4. URL canonique

Empêche le duplicate content (ex: paramètres UTM, pagination).

```typescript
// Dans generateMetadata ou metadata statique
alternates: {
  canonical: 'https://www.monsite.fr/ma-page',
},
```

**Règle :** toujours pointer vers l'URL sans trailing slash, sans paramètres query.

---

## 5. JSON-LD — BlogPosting (articles)

À insérer à la fin du JSX de chaque article, **après le `<Footer />`**.

```tsx
// app/blog/[slug]/page.tsx — dans le return JSX
const SITE_URL = 'https://www.monsite.fr'

// ... après <Footer />
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.seoDescription || post.excerpt || '',
      url: `${SITE_URL}/blog/${post.slug.current}`,
      datePublished: post.publishedAt,
      dateModified: post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.author || 'Auteur',
        url: `${SITE_URL}/a-propos`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Nom du Site',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
        },
      },
      image: post.mainImage ? {
        '@type': 'ImageObject',
        url: urlFor(post.mainImage).width(1200).height(630).url(),
        width: 1200,
        height: 630,
      } : undefined,
      keywords: [...(post.categories ?? []), ...(post.tags ?? [])].join(', '),
      inLanguage: 'fr-FR',
      isPartOf: {
        '@type': 'Blog',
        name: 'Blog Nom du Site',
        url: `${SITE_URL}/blog`,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/blog/${post.slug.current}`,
      },
    }),
  }}
/>
```

**Impact :** Google comprend que c'est un article, peut afficher date + auteur dans les SERPs. Perplexity et ChatGPT lisent ce schema pour citer les sources.

---

## 6. JSON-LD — @graph structuré (homepage)

La technique `@graph` lie plusieurs entités entre elles via des `@id`. Google comprend que l'organisation, le site web et la homepage sont la même entité.

```typescript
// app/layout.tsx
const SITE_URL = 'https://www.monsite.fr'

const schemaOrg = {
  '@context': 'https://schema.org',
  '@graph': [

    // ── Entité 1 : Organisation ──────────────────────────────────────────────
    {
      '@type': ['Organization', 'LocalBusiness', 'MarketingAgency'],
      '@id': `${SITE_URL}/#organization`,
      name: 'Nom de l\'entreprise',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}/#logo`,
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
        caption: 'Nom de l\'entreprise',
      },
      sameAs: [
        'https://www.linkedin.com/company/...',
        'https://www.google.com/maps/place/...',  // URL fiche GMB exacte
        'https://www.youtube.com/@...',
      ],
    },

    // ── Entité 2 : WebSite ───────────────────────────────────────────────────
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Nom du Site',
      publisher: { '@id': `${SITE_URL}/#organization` },   // lien vers Organisation
      inLanguage: 'fr-FR',
      // SearchAction = active la sitelinks searchbox dans Google
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },

    // ── Entité 3 : WebPage (homepage) ────────────────────────────────────────
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: 'Titre de la homepage',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'fr-FR',
    },

  ],
}

// Dans le layout JSX :
// <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
```

**Pourquoi `@graph` ?**  
Sans `@graph`, chaque bloc JSON-LD est isolé. Avec `@graph` et des `@id`, Google sait que `/#organization`, `/#website` et `/#webpage` sont la même entité → signal fort pour le Knowledge Panel.

---

## 7. JSON-LD — LocalBusiness + MarketingAgency

⚠️ **Le NAP (Nom, Adresse, Téléphone) doit être IDENTIQUE à la fiche Google Business Profile.**

```typescript
{
  '@type': ['Organization', 'LocalBusiness', 'MarketingAgency'],
  '@id': `${SITE_URL}/#organization`,
  name: 'Sales Experienz',          // identique à GMB
  telephone: '+33622951638',        // identique à GMB
  email: 'contact@salesexperienz.fr',
  foundingDate: '2019-09-01',
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '15 Bd Chevalier de Clerville, Bâtiment M3',
    addressLocality: 'Sète',
    postalCode: '34200',
    addressRegion: 'Hérault',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '43.4028',
    longitude: '3.6975',
  },
  areaServed: [
    { '@type': 'Country', name: 'France' },
    { '@type': 'City', name: 'Sète' },
    { '@type': 'AdministrativeArea', name: 'Hérault' },
  ],
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  }],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+33622951638',
    contactType: 'customer service',
    areaServed: 'FR',
    availableLanguage: 'French',
  },
  founder: {
    '@type': 'Person',
    '@id': `${SITE_URL}/#founder`,
    name: 'Laurent Guyonvarch',
    jobTitle: 'Consultant en automatisation IA',
    sameAs: 'https://www.linkedin.com/in/laurentguyonvarch/',
  },
  makesOffer: [
    {
      '@type': 'Offer',
      name: 'Nom de la prestation',
      description: 'Description courte.',
      url: `${SITE_URL}/services/ma-prestation`,
    },
  ],
}
```

---

## 8. JSON-LD — WebSite + SearchAction

Active la **sitelinks searchbox** (le champ de recherche visible sous votre résultat Google).

```typescript
{
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Nom du Site',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,  // URL de recherche
    },
    'query-input': 'required name=search_term_string',
  },
}
```

**Prérequis :** votre page `/blog` doit accepter le paramètre `?q=` pour filtrer les articles.

---

## 9. JSON-LD — FAQPage (GEO)

Permet à Google d'afficher les Q&R directement dans les SERPs **et** aux IA (ChatGPT, Perplexity, Claude) de citer vos réponses.

```typescript
// lib/schema-faq.ts
export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Combien coûte votre service ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'À partir de 197 €/mois, tout compris. ...',
      },
    },
    {
      '@type': 'Question',
      name: 'Intervenez-vous en dehors de Sète ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, en visioconférence sur toute la France.',
      },
    },
    // ... autres questions
  ],
}

// Utilisation dans app/page.tsx :
// <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
```

**Impact GEO :** c'est le schema le plus cité par les LLMs. Rédigez les réponses comme si vous répondiez à une IA — précis, factuels, sans jargon.

---

## 10. Sitemap dynamique (Sanity CMS)

Le sitemap doit être **async** pour inclure tous les articles publiés au moment du build.

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getPostsForSitemap } from '@/lib/sanity'   // ou votre CMS

const SITE_URL = 'https://www.monsite.fr'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL,                              lastModified: new Date(), changeFrequency: 'monthly',  priority: 1   },
    { url: `${SITE_URL}/blog`,                    lastModified: new Date(), changeFrequency: 'daily',    priority: 0.8 },
    { url: `${SITE_URL}/services/ma-page`,        lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.9 },
  ]

  // Articles dynamiques depuis CMS
  let articlePages: MetadataRoute.Sitemap = []
  try {
    const posts = await getPostsForSitemap()
    articlePages = posts.map((post: { slug: string; _updatedAt?: string; publishedAt?: string }) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch {
    // Sanity indisponible au build → sitemap statique uniquement
  }

  return [...staticPages, ...articlePages]
}
```

**Requête Sanity légère pour le sitemap :**
```typescript
// lib/sanity.ts
export async function getPostsForSitemap() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      "slug": slug.current,
      publishedAt,
      _updatedAt
    }
  `)
}
```

---

## 11. robots.txt — autoriser les bots IA (GEO)

Par défaut, certains bots IA sont bloqués. Il faut les **autoriser explicitement** pour la visibilité GEO.

```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*',              allow: '/' },
      // Bots IA — autoriser pour la visibilité GEO
      { userAgent: 'GPTBot',         allow: '/' },
      { userAgent: 'ChatGPT-User',   allow: '/' },
      { userAgent: 'PerplexityBot',  allow: '/' },
      { userAgent: 'ClaudeBot',      allow: '/' },
      { userAgent: 'anthropic-ai',   allow: '/' },
      { userAgent: 'Google-Extended',allow: '/' },
      { userAgent: 'Bingbot',        allow: '/' },
    ],
    sitemap: 'https://www.monsite.fr/sitemap.xml',
  }
}
```

---

## 12. IndexNow — soumission programmatique

Google a supprimé son endpoint de ping en 2024. **IndexNow** est le protocole actuel, supporté par Bing, Yandex, Seznam, Naver.

### A. Génération de la clé

```bash
python3 -c "import uuid; print(uuid.uuid4().hex)"
# Exemple : 4179406d456e457b935114f81e0f1179
```

### B. Fichier de vérification

```
/public/4179406d456e457b935114f81e0f1179.txt
```
Contenu du fichier : la clé elle-même sur une ligne.

### C. Route API Next.js

```typescript
// app/api/indexnow/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPostsForSitemap } from '@/lib/sanity'

const SITE_URL      = 'https://www.monsite.fr'
const INDEX_NOW_KEY = '4179406d456e457b935114f81e0f1179'

const STATIC_URLS = [
  SITE_URL,
  `${SITE_URL}/blog`,
  `${SITE_URL}/services/ma-page`,
]

// POST /api/indexnow?secret=MON_SECRET  → soumet toutes les URLs
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret') || req.headers.get('x-indexnow-secret')
  if (secret !== process.env.INDEXNOW_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const posts = await getPostsForSitemap()
  const articleUrls = posts.map((p: { slug: string }) => `${SITE_URL}/blog/${p.slug}`)
  const allUrls = [...STATIC_URLS, ...articleUrls]

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: 'www.monsite.fr',
      key: INDEX_NOW_KEY,
      keyLocation: `${SITE_URL}/${INDEX_NOW_KEY}.txt`,
      urlList: allUrls,
    }),
  })

  return NextResponse.json({ ok: res.ok, urlsSubmitted: allUrls.length })
}

// GET /api/indexnow?slug=mon-article → soumet un article unique (webhook Sanity)
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'Missing slug' }, { status: 400 })

  const url = `${SITE_URL}/blog/${slug}`
  const res = await fetch(
    `https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${INDEX_NOW_KEY}`
  )
  return NextResponse.json({ ok: res.ok, url })
}
```

### D. Variable d'environnement Vercel

```bash
npx vercel env add INDEXNOW_SECRET production
# Valeur : mon-secret-fort-2026
```

### E. Soumission en masse via CLI (script one-shot)

```bash
# Récupère toutes les URLs du sitemap et les envoie à IndexNow
SITEMAP=$(curl -s "https://www.monsite.fr/sitemap.xml")
URLS_JSON=$(echo "$SITEMAP" | grep -o '<loc>[^<]*</loc>' | sed 's/<\/*loc>//g' | python3 -c "
import sys, json
urls = [line.strip() for line in sys.stdin if line.strip()]
print(json.dumps(urls))
")

curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{
    \"host\": \"www.monsite.fr\",
    \"key\": \"VOTRE_CLE\",
    \"keyLocation\": \"https://www.monsite.fr/VOTRE_CLE.txt\",
    \"urlList\": $URLS_JSON
  }"
# HTTP 202 = succès
```

---

## 13. GEO — Generative Engine Optimization

Le GEO vise à être **cité par les IA** (ChatGPT, Perplexity, Claude, Gemini) quand un utilisateur pose une question dans votre domaine.

### Principes fondamentaux

| Levier | Ce que ça fait |
|---|---|
| `BlogPosting` JSON-LD | Les LLMs lisent le schema pour identifier l'auteur et le sujet |
| `FAQPage` JSON-LD | Schema le plus repris par les IA pour les réponses directes |
| `robots.txt` ouvert aux bots IA | Autorise le crawl de ClaudeBot, GPTBot, PerplexityBot |
| Contenu factuel et structuré | Les IA privilégient les réponses précises, chiffrées, sans jargon |
| `sameAs` avec GMB | Relie l'entité web à l'entité locale — signal de confiance fort |
| `areaServed` précis | Les IA géolocalisent les réponses — Sète, Hérault, France |

### Méthode Capsule GEO (spécifique SalesExperienz)

Chaque article intègre dès la génération :
1. Une **réponse directe à une question** dans le premier paragraphe
2. Des **données chiffrées** (prix, durées, pourcentages)
3. La **localisation** (Sète, Hérault, France) dans le contexte
4. Des **entités nommées** (n8n, Claude AI, GPT-4o, DataForSEO) pour le matching sémantique

### robots.txt — bots IA à autoriser

```
GPTBot          → OpenAI / ChatGPT
ChatGPT-User    → ChatGPT browsing
PerplexityBot   → Perplexity AI
ClaudeBot       → Anthropic / Claude
anthropic-ai    → Anthropic crawler
Google-Extended → Gemini / Google AI
Bingbot         → Bing / Copilot
```

---

## 14. Checklist de lancement

### Technique (code)
- [ ] `metadata` sur chaque page statique (title, description, OG, Twitter)
- [ ] `generateMetadata` sur les pages dynamiques (blog/[slug])
- [ ] `alternates.canonical` sur chaque page
- [ ] JSON-LD `@graph` sur la homepage (layout.tsx)
- [ ] JSON-LD `BlogPosting` sur chaque article
- [ ] JSON-LD `FAQPage` sur la homepage ou page FAQ
- [ ] `sitemap.ts` async avec toutes les pages + articles CMS
- [ ] `robots.ts` avec tous les bots IA autorisés
- [ ] Fichier clé IndexNow dans `/public/`
- [ ] Route API `/api/indexnow`
- [ ] Variable d'env `INDEXNOW_SECRET` sur Vercel

### NAP & GMB
- [ ] Nom, Adresse, Téléphone IDENTIQUES entre site et GMB
- [ ] URL fiche GMB dans `sameAs` du schema `Organization`
- [ ] Coordonnées GPS (`geo`) correctes

### Google Search Console
- [ ] Sitemap soumis : `https://monsite.fr/sitemap.xml`
- [ ] Pages prioritaires demandées en indexation manuelle
- [ ] Vérifier "Résultats enrichis" → aucune erreur de schema

### IndexNow (post-lancement)
- [ ] Soumission en masse de toutes les URLs existantes
- [ ] Webhook Sanity configuré → `GET /api/indexnow?slug=SLUG` à chaque publication

### Validation
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) — aucune erreur
- [ ] [Schema.org Validator](https://validator.schema.org) — aucune erreur
- [ ] [Open Graph Debugger](https://developers.facebook.com/tools/debug/) — image OG visible
- [ ] [Twitter Card Validator](https://cards-dev.twitter.com/validator) — card correcte

---

*Document généré le 13 avril 2026 — salesexperienz.fr*
