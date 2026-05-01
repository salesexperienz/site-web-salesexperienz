# Guide — Audit & correction des liens cassés WordPress

Kit de correction des liens cassés adapté pour un site WordPress sur hébergement OVH (mutualisé).
Basé sur la même démarche que le chantier SalesExperienz (Next.js + Sanity).

---

## Prérequis

- Node.js 18+ installé en local
- Accès FTP au serveur OVH
- Accès phpMyAdmin (fourni par OVH dans l'espace client)
- Une clé API Anthropic (claude.ai → API keys)
- Le paquet `htmlparser2` : `npm install htmlparser2`
- Le paquet `@anthropic-ai/sdk` : `npm install @anthropic-ai/sdk`

---

## Vue d'ensemble

```
Étape 1 : audit-wp.mjs          → rapport-wp.json + rapport-wp.md
Étape 2 : analyse-rapport.mjs   → rapport-analyse.json + rapport-analyse.md
Étape 3 : fix-wp-liens.php      → corrections internes (upload FTP + browser)
Étape 4 : fix-wp-externes.mjs   → fix-wp-externes.sql (à importer phpMyAdmin)
Étape 5 : Vérification + routine mensuelle
```

---

## Étape 1 — Audit : découverte de tous les liens cassés

### 1.1 Configuration

Ouvrir `scripts-wp/audit-wp.mjs` et modifier la ligne :

```js
const SITE_URL = 'https://www.client-site.com'   // ← URL exacte du site
```

L'URL doit correspondre exactement au domaine canonique (avec ou sans `www` selon le site).

### 1.2 Lancement

```bash
node scripts-wp/audit-wp.mjs
```

Durée estimée : 3 à 15 min selon le nombre de pages.

Le script :
1. Lit `/sitemap.xml` automatiquement (gère les sitemap index)
2. Crawle chaque page
3. Vérifie chaque lien (HEAD request, fallback GET)
4. Enregistre le contexte autour de chaque lien cassé

### 1.3 Sorties

| Fichier | Contenu |
|---|---|
| `scripts-wp/rapport-wp.json` | Données brutes (JSON) |
| `scripts-wp/rapport-wp.md` | Rapport lisible (Markdown) |

---

## Étape 2 — Analyse : priorisation

```bash
node scripts-wp/analyse-rapport.mjs
```

Agrège les liens par URL cible et trie par fréquence d'apparition.

### Sorties

| Fichier | Contenu |
|---|---|
| `scripts-wp/rapport-analyse.json` | Liste priorisée (JSON) |
| `scripts-wp/rapport-analyse.md` | Tableau récapitulatif |

**Lire `rapport-analyse.md`** pour décider de la stratégie :
- Liens internes → Étape 3 (PHP ou manuel)
- Liens externes → Étape 4 (Claude API)

---

## Étape 3 — Corrections internes (liens vers des pages du même site)

Deux approches selon la complexité :

### Option A — WordPress admin (peu de liens)

1. Aller dans Articles (ou Pages) → ouvrir chaque article concerné
2. Chercher l'URL cassée dans l'éditeur (Ctrl+F)
3. Remplacer par la bonne URL
4. Publier

### Option B — fix-wp-liens.php (plusieurs liens, même pattern)

#### Préparation

1. Ouvrir `scripts-wp/fix-wp-liens.php`
2. Définir une clé secrète :
   ```php
   define('SECRET_KEY', 'mon-mot-de-passe-secret-123');
   ```
3. Renseigner les credentials DB (copiés depuis `wp-config.php` sur le serveur) :
   ```php
   define('WP_DB_HOST',   'localhost');
   define('WP_DB_NAME',   'nom_de_la_base');
   define('WP_DB_USER',   'utilisateur_db');
   define('WP_DB_PASS',   'mot_de_passe_db');
   define('WP_DB_PREFIX', 'wp_');   // vérifier dans wp-config.php
   ```
4. Remplir le tableau `$PATTERNS` depuis `rapport-analyse.md` :
   ```php
   $PATTERNS = [
       'https://www.client-site.com/ancien-slug' => 'https://www.client-site.com/nouveau-slug',
       'https://www.client-site.com/page-supprimee' => 'https://www.client-site.com/page-existante',
   ];
   ```

#### Upload et test

1. Uploader `fix-wp-liens.php` à la **racine du site WordPress** via FTP
   (même dossier que `wp-config.php` et `index.php`)
2. Ouvrir dans le navigateur :
   ```
   https://www.client-site.com/fix-wp-liens.php?key=mon-mot-de-passe-secret-123
   ```
3. Vérifier le tableau (mode dry-run, aucune modification)
4. Si tout est correct, appliquer :
   ```
   https://www.client-site.com/fix-wp-liens.php?key=mon-mot-de-passe-secret-123&apply=1
   ```

#### Après application

- **Supprimer `fix-wp-liens.php` du serveur via FTP** immédiatement
- Vider le cache WordPress (W3 Total Cache, WP Super Cache, LiteSpeed Cache…)

### Option C — Plugin Redirection (recommandé pour les pages supprimées)

Installer le plugin **Redirection** (wordpress.org/plugins/redirection).  
Ajouter une redirection 301 : ancienne URL → nouvelle URL.  
Avantage : conserve le SEO et fonctionne sans toucher la base.

---

## Étape 4 — Corrections externes (liens vers d'autres sites)

### 4.1 Lancement en dry-run

```bash
ANTHROPIC_API_KEY=sk-ant-... node scripts-wp/fix-wp-externes.mjs --dry-run
```

Le script :
1. Lit `rapport-analyse.json` (liens externes cassés)
2. Pour chaque lien : appelle Claude Haiku avec le contexte (page, ancre, paragraphe)
3. Vérifie l'URL suggérée via HTTP
4. Génère `fix-wp-externes.sql`

Coût estimé : ~0,01–0,05 $ pour 50 liens (Claude Haiku)

### 4.2 Vérification du SQL généré

Ouvrir `scripts-wp/fix-wp-externes.sql` et vérifier :
- Les URLs proposées semblent pertinentes
- Les requêtes `UPDATE … REPLACE(…)` semblent correctes
- Les liens commentés `-- SUPPRIMER` correspondent à des cas sans bonne alternative

### 4.3 Application dans phpMyAdmin

1. OVH espace client → Hébergements → votre hébergement → Bases de données
2. Cliquer sur **phpMyAdmin** (ou l'icône correspondante)
3. Sélectionner la base WordPress dans le panneau de gauche
4. Onglet **SQL**
5. Coller le contenu de `fix-wp-externes.sql`
6. Cliquer **Exécuter**

### 4.4 Après application

- Vider le cache WordPress
- Supprimer les fichiers `.sql` du poste local (contiennent des données sensibles)

---

## Étape 5 — Vérification

Relancer l'audit pour confirmer que les corrections ont fonctionné :

```bash
node scripts-wp/audit-wp.mjs
```

Comparer les chiffres avec le premier rapport.  
Objectif : 0 liens internes cassés, liens externes < 5.

---

## Routine mensuelle

Programmer une tâche mensuelle pour détecter les nouvelles régressions :

```bash
# Ajouter au crontab du poste local (1er du mois à 8h)
0 8 1 * * cd /chemin/vers/projet && node scripts-wp/audit-wp.mjs && node scripts-wp/analyse-rapport.mjs
```

Ou utiliser Claude Code `/schedule` pour une routine automatisée avec envoi de rapport par email.

---

## Arbre des fichiers

```
scripts-wp/
  audit-wp.mjs            ← Étape 1 : crawl + détection
  analyse-rapport.mjs     ← Étape 2 : priorisation
  fix-wp-liens.php        ← Étape 3 : corrections internes (FTP)
  fix-wp-externes.mjs     ← Étape 4 : corrections externes (Claude → SQL)
  rapport-wp.json         ← généré par audit-wp.mjs
  rapport-wp.md           ← généré par audit-wp.mjs
  rapport-analyse.json    ← généré par analyse-rapport.mjs
  rapport-analyse.md      ← généré par analyse-rapport.mjs
  fix-wp-externes.sql     ← généré par fix-wp-externes.mjs
  rapport-externes.json   ← généré par fix-wp-externes.mjs
```

---

## Dépannage OVH

**Le sitemap.xml ne répond pas**
→ Vérifier l'URL dans un navigateur. WordPress génère `/sitemap.xml` avec Yoast, Rank Math ou le sitemap natif (WordPress 5.5+).  
→ Si le sitemap n'existe pas, activer Yoast SEO → SEO → Général → Fonctionnalités → Sitemap XML.

**phpMyAdmin refuse d'exécuter le SQL** (timeout sur grosse base)
→ Diviser le fichier SQL en plusieurs parties (une requête UPDATE par exécution).

**WP-CLI disponible ?** (pour vérifier sur OVH)
```bash
ssh user@ftp.cluster0XX.hosting.ovh.net "wp --info"
```
Si disponible, on peut appliquer le SQL directement :
```bash
ssh user@ftp.cluster0XX.hosting.ovh.net "wp db query < fix-wp-externes.sql --path=/home/user/www"
```

**Erreur connexion DB dans fix-wp-liens.php**
→ Sur OVH, le host MySQL n'est pas toujours `localhost` — vérifier dans `wp-config.php`.  
→ Valeur courante sur OVH : `mysql51-XXX.pro` (visible dans l'espace client).
