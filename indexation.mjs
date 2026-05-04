import { google } from 'googleapis';

// Ajouter les URLs ici avant de lancer, vider après chaque envoi (quota : 200/jour)
// Envoi du 26/04/2026 : 83 URLs soumises (pages principales + 72 articles blog)
// Envoi du 04/05/2026 : corrections audit SEO (canonicals, redirects, doublons)
const urlsToIndex = [];

async function requestIndexing() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: './service-account.json',
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    const indexing = google.indexing({
      version: 'v3',
      auth: auth,
    });

    console.log(`✅ Connecté à l'API Google — ${urlsToIndex.length} URLs à envoyer`);

    for (const url of urlsToIndex) {
      try {
        await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });
        console.log(`🚀 Envoyé : ${url}`);
      } catch (err) {
        console.error(`⚠️ Échec pour ${url} : ${err.message}`);
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('🎉 Terminé ! Toutes les pages ont été soumises à Google.');

  } catch (error) {
    console.error('❌ Erreur fatale :', error.message);
  }
}

requestIndexing();
