import { google } from 'googleapis';

const urlsToIndex = [];

async function requestIndexing() {
  try {
    // La méthode officielle de Google qui s'occupe de lire le fichier JSON proprement
    const auth = new google.auth.GoogleAuth({
      keyFile: './service-account.json',
      scopes: ['https://www.googleapis.com/auth/indexing'],
    });

    // Création du client d'indexation natif
    const indexing = google.indexing({
      version: 'v3',
      auth: auth,
    });

    console.log('✅ Connecté avec succès à l\'API Google');

    for (const url of urlsToIndex) {
      try {
        await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        });
        console.log(`🚀 Envoyé avec succès : ${url}`);
      } catch (err) {
        console.error(`⚠️ Échec pour ${url} : ${err.message}`);
      }
      
      // Petite pause pour être gentil avec les serveurs de Google
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('🎉 Terminé ! L\'ordre d\'exploration a été donné pour toutes vos pages.');

  } catch (error) {
    console.error('❌ Erreur fatale :', error.message);
  }
}

requestIndexing();