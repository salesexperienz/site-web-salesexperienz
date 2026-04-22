
[file-tag: guide_indexation_google_api.md]

### Comment utiliser ce fichier ?
1. Vous pouvez le copier-coller dans un outil comme **Notion**, **GitHub**, ou tout simplement l'ouvrir avec un éditeur de texte.
2. Il est rédigé de manière pédagogique pour qu'un client comprenne la valeur de ce que vous faites (le passage de l'indexation passive à l'indexation active).

### Rappel des points clés pour vos futurs clients :
* **La sécurité avant tout :** Insistez bien sur le fait que la clé JSON ne doit jamais être partagée publiquement.
* **Le rôle "Propriétaire" :** C'est souvent l'étape où les clients bloquent dans la Search Console. Précisez-leur bien qu'un accès "Total" ne suffit pas pour l'API.
* **Le quota :** Rappelez que c'est un outil de "boost" pour 200 URLs par jour, pas un outil de spam.

C'était un plaisir de vous accompagner dans ce "déblocage" technique. Votre site **SalesExperienz** a maintenant tous les outils pour performer !

```python
# Content for the Markdown file
markdown_content = """# Guide : Indexation Forcée via Google Indexing API

Ce document détaille la procédure technique pour forcer l'indexation de pages web (articles de blog, services, etc.) qui sont restées au statut "Détectée, actuellement non indexée" dans la Google Search Console.

## 1. Objectif
Passer d'une indexation **passive** (attendre que Google passe) à une indexation **active** (envoyer un signal prioritaire aux serveurs de Google) pour réduire le délai de visibilité de quelques semaines à quelques heures.

---

## 2. Prérequis Techniques

* **Google Search Console :** Accès administrateur au site concerné.
* **Google Cloud Platform :** Un compte pour créer un projet API.
* **Environnement local :** Node.js installé sur l'ordinateur.

---

## 3. Étape 1 : Configuration Google Cloud (Le Robot)

1.  **Créer un Projet :** Se rendre sur [Google Cloud Console](https://console.cloud.google.com/) et créer un nouveau projet.
2.  **Activer l'API :** Chercher et activer l'API nommée **"Web Search Indexing API"**.
3.  **Compte de Service :** * Aller dans "IAM et administration" > "Comptes de service".
    * Créer un compte de service (ex: `indexation-bot`).
    * Lui attribuer le rôle **Propriétaire** (au niveau du projet).
4.  **Clé JSON :** * Dans l'onglet "Clés" du compte de service, cliquer sur "Ajouter une clé" > "Créer une clé".
    * Choisir le format **JSON**. Le fichier téléchargé contient vos identifiants de connexion sécurisés.

---

## 4. Étape 2 : Autorisations Search Console (La Permission)

Google doit savoir que ce "robot" a le droit de modifier l'indexation du site.

1.  Copier l'adresse email du compte de service (se termine par `@...gserviceaccount.com`).
2.  Aller dans la **Google Search Console** du client.
3.  "Paramètres" > "Utilisateurs et autorisations".
4.  Ajouter l'email et choisir impérativement le rôle **Propriétaire** (obligatoire pour l'utilisation de l'API).

---

## 5. Étape 3 : Mise en œuvre du Script (L'Exécution)

### Installation
À la racine de votre projet, installer la bibliothèque officielle Google :
```bash
npm install googleapis
```

### Configuration du fichier `.gitignore`
**Sécurité Critique :** Ajoutez la ligne suivante à votre fichier `.gitignore` pour ne jamais envoyer la clé sur GitHub :
```text
service-account.json
```

### Le Script (`indexation.mjs`)
Créez un fichier à la racine nommé `indexation.mjs` :

```javascript
import { google } from 'googleapis';

// 1. Liste des URLs à indexer
const urlsToIndex = [
  '[https://www.monsite.fr/blog/article-1](https://www.monsite.fr/blog/article-1)',
  '[https://www.monsite.fr/blog/article-2](https://www.monsite.fr/blog/article-2)'
];

async function requestIndexing() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: './service-account.json', // Votre clé téléchargée
      scopes: ['[https://www.googleapis.com/auth/indexing](https://www.googleapis.com/auth/indexing)'],
    });

    const indexing = google.indexing({ version: 'v3', auth });

    for (const url of urlsToIndex) {
      await indexing.urlNotifications.publish({
        requestBody: { url: url, type: 'URL_UPDATED' },
      });
      console.log(`🚀 Envoyé avec succès : ${url}`);
      await new Promise(resolve => setTimeout(resolve, 500)); // Pause anti-spam
    }
    console.log('🎉 Opération terminée.');
  } catch (error) {
    console.error('❌ Erreur :', error.message);
  }
}

requestIndexing();
```

---

## 6. Lancement et Suivi

1.  **Lancer le script :** Dans le terminal, tapez `node indexation.mjs`.
2.  **Vérification immédiate :** Utiliser la commande `site:https://www.monsite.fr/mon-article` sur Google.
3.  **Vérification Search Console :** Le statut devrait passer de "Non indexée" à "Indexée" sous 24h à 72h.

## 7. Bonnes Pratiques et Limites

* **Quota :** Google limite l'utilisation à 200 requêtes par jour.
* **Usage :** Ne pas accumuler les URLs. Une fois qu'une URL est envoyée, retirez-la du script.
* **Qualité :** L'API force le passage du robot, mais c'est la qualité du contenu qui décide du maintien de l'indexation sur le long terme.
"""

# Generating the file using Python
with open("guide_indexation_google_api.md", "w", encoding="utf-8") as f:
    f.write(markdown_content)
```