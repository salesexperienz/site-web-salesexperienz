import { SectionConfig, ColorPalette, EditorState, BrandSettings, FontPairKey } from './types';

export const SECTION_DATA: Record<string, SectionConfig> = {
  bandeauTitre: { n: '00', label: 'Bandeau — Titre email', sub: 'Texte blanc en haut à gauche' },
  edition: { n: '01', label: 'Numéro & thème', sub: 'Bandeau bleu supérieur' },
  categorie: { n: '02', label: 'Catégorie', sub: 'Label orange hero' },
  titre: { n: '03', label: 'Titre principal', sub: 'Grand titre bleu' },
  soustitre: { n: '04', label: 'Sous-titre', sub: 'Accroche italique' },
  intro: { n: '05', label: 'Introduction', sub: '3-5 lignes après Salut', multi: true },
  sommaire: { n: '06', label: 'Sommaire', sub: '5 points bénéfices', multi: true },
  s1titre: { n: '07', label: 'Section 1 — Titre', sub: 'Le vrai problème' },
  s1corps: { n: '07b', label: 'Section 1 — Corps', sub: 'Paragraphes du problème', multi: true },
  s1resume: { n: '08', label: 'Section 1 — Résumé', sub: 'Citation encadrée' },
  s2titre: { n: '09', label: 'Section 2 — Titre', sub: 'Les erreurs fréquentes' },
  s2item1: { n: '09a', label: 'Section 2 — Erreur 1', sub: 'Ligne 1 = titre, suite = corps', multi: true },
  s2item2: { n: '09b', label: 'Section 2 — Erreur 2', sub: 'Ligne 1 = titre, suite = corps', multi: true },
  s2item3: { n: '09c', label: 'Section 2 — Erreur 3', sub: 'Ligne 1 = titre, suite = corps', multi: true },
  s3titre: { n: '10', label: 'Section 3 — Titre', sub: 'Mon expérience' },
  s3items: { n: '10b', label: 'Section 3 — Points clés', sub: 'Format : Titre — description', multi: true },
  s4titre: { n: '10c', label: 'Section 4 — Titre', sub: '4ème partie de la newsletter' },
  s4corps: { n: '10d', label: 'Section 4 — Corps', sub: 'Paragraphes de la section 4', multi: true },
  chiffre: { n: '11', label: 'Chiffre clé', sub: 'Ex: 46 %' },
  chiffreTexte: { n: '11b', label: 'Chiffre clé — Texte', sub: 'Phrase explicative' },
  actionsH: { n: '12', label: 'Actions — Titre', sub: 'Bloc conseils pratiques' },
  action1: { n: '12a', label: 'Action 1', sub: 'Texte de la 1ère action' },
  action2: { n: '12b', label: 'Action 2', sub: 'Texte de la 2ème action' },
  action3: { n: '12c', label: 'Action 3', sub: 'Texte de la 3ème action' },
  ctotire: { n: '13', label: 'CTA — Titre ressource', sub: 'Bloc foncé lien guide' },
  conclu: { n: '14', label: 'Conclusion', sub: '3-5 lignes finales', multi: true },
  ps: { n: '15', label: 'Post-scriptum', sub: 'Ligne personnelle finale' },
  img1: { n: 'I1', label: 'Image 1', sub: 'URL + position dans la newsletter', type: 'image' as const },
  img2: { n: 'I2', label: 'Image 2', sub: 'URL + position dans la newsletter', type: 'image' as const },
  footerTitre: { n: '16a', label: 'Footer — Titre section', sub: 'Ex: Si tu veux aller plus loin…' },
  rdv: { n: '16', label: 'URL RDV (Calendly)', sub: 'Lien signature' },
  rdvTexte: { n: '16b', label: 'RDV — Texte du lien', sub: 'Titre cliquable RDV' },
  rdvDesc: { n: '16c', label: 'RDV — Description', sub: 'Phrase sous le lien RDV' },
  guide: { n: '17', label: 'URL Guide', sub: 'Lien téléchargement' },
  guideTexte: { n: '17b', label: 'Guide — Texte du lien', sub: 'Titre cliquable guide' },
  guideDesc: { n: '17c', label: 'Guide — Description', sub: 'Phrase sous le lien guide' },
  siteUrl: { n: '17d', label: 'Site web — URL', sub: 'Lien vers ton site' },
  siteTexte: { n: '17e', label: 'Site web — Texte du lien', sub: 'Titre cliquable site' },
  siteDesc: { n: '17f', label: 'Site web — Description', sub: 'Phrase sous le lien site' },
  youtube: { n: '18', label: 'URL YouTube', sub: 'Footer' },
  linkedin: { n: '18b', label: 'URL LinkedIn', sub: 'Footer' },
  footerNom: { n: '18c', label: 'Footer — Nom & marque', sub: 'Ex: Sales Expérienz · Prénom Nom' },
};

export const DEFAULT_COLORS: ColorPalette = {
  primary: '#1E3A5F',
  primaryDark: '#2B5BA8',
  accent: '#E8742A',
  textPrimary: '#2C2C2C',
  textSecondary: '#6B7A8D',
  background: '#F4F1EC',
  backgroundSecondary: '#fff',
  borderTertiary: '#EEEBE5',
};

export const DEFAULT_STATE: EditorState = {
  edition: 'Édition #04 · Visibilité locale',
  categorie: 'SEO & Visibilité locale',
  titre: 'Une semaine. Une fiche.\nLa première page de Google.',
  soustitre:
    "Comment j'ai positionné Sales Expérienz — et ce que tu peux faire dès cette semaine pour ne plus être invisible localement.",
  intro:
    "Tu as une vraie offre. Tu bosses sérieusement. Mais quand quelqu'un dans ta ville tape ton activité sur Google… ce n'est pas toi qui apparaît. Ce n'est pas un problème de compétence. C'est un problème de visibilité.\n\nIl y a quelques semaines, j'ai décidé de m'occuper sérieusement de ma fiche Google My Business pour Sales Expérienz. En moins d'une semaine, j'étais positionné sur l'activité d'agence marketing dans ma zone. Pas avec de la pub. Avec de la méthode.\n\nDans cette édition, je t'explique ce que j'ai fait, pourquoi ça marche — et ce que tu peux appliquer dès aujourd'hui.",
  sommaire:
    '→ Pourquoi tu es invisible sur Google (même si tu as une fiche)\n→ Les 3 erreurs que font presque tous les entrepreneurs locaux\n→ Ce que j\'ai fait concrètement en une semaine chrono\n→ Les leviers simples que tu peux activer sans budget\n→ Comment aller encore plus loin si tu veux dominer ta zone',
  s1titre: 'Tu as une fiche. Mais elle ne sert à rien.',
  s1corps:
    "La plupart des entrepreneurs ont bien créé leur fiche Google My Business. Mais elle est vide. Ou presque. Google ne comprend pas ce que tu fais, pour qui, et dans quelle zone.\n\nIl regarde 3 piliers : la pertinence, la proximité et la notoriété. Si l'un manque, tu n'apparais pas.",
  s1resume:
    '"En résumé : une fiche vide, c\'est comme une vitrine éteinte. Les passants ne s\'arrêtent pas. Google non plus."',
  s2titre: 'Les 3 erreurs qui te coûtent des clients chaque jour',
  s2item1:
    "La catégorie mal choisie\nC'est la décision la plus stratégique. Si tu mets \"Consultant\" alors que tu fais de l'automatisation marketing, tu passes à côté de tes vrais clients.",
  s2item2:
    "Aucune activité sur la fiche\nGoogle favorise les fiches vivantes. Une fiche sans activité depuis six mois envoie un signal clair : cette entreprise n'existe peut-être plus.",
  s2item3:
    "Les incohérences NAP\nSi ton nom, adresse et téléphone ne sont pas identiques partout… Google perd confiance. Et quand Google perd confiance, il te pénalise.",
  s3titre: "Ce que j'ai fait concrètement en une semaine",
  s3items:
    "La catégorie principale — la plus précise, pas la plus générique.\nChaque champ rempli — description, services, attributs, photos.\nDe l'activité — un post par semaine, CTA et zone géographique.\nLa cohérence fiche ↔ site — chaque service = une page dédiée.",
  s4titre: 'Titre de la section 4',
  s4corps: 'Contenu de la section 4.',
  chiffre: '46 %',
  chiffreTexte:
    "des recherches Google ont une intention locale. Sans fiche optimisée, tu es invisible pour près de la moitié des requêtes liées à ton activité.",
  actionsH: '3 actions. 30 minutes. Des effets visibles cette semaine.',
  action1: "Ouvre ta fiche Google My Business et vérifie ta catégorie principale. Est-elle vraiment la plus précise ?",
  action2: "Compte les champs vides : description, services, attributs, photos. Remplis-en au moins 3 aujourd'hui.",
  action3: "Publie un Google Post cette semaine. Mentionne ta ville. Ajoute un CTA. 10 minutes.",
  ctotire: 'Guide complet — Dominer Google Maps avec ta fiche GBP',
  conclu:
    'Google My Business, c\'est le seul endroit où tu peux être visible devant tes concurrents — sans payer un centime de publicité.\n\nLa vraie question : combien de clients as-tu déjà perdus pendant que tu remettais ça à plus tard ?\n\nCette semaine, prends 30 minutes. Ouvre ta fiche. Applique les trois actions.',
  ps: 'Si une seule chose devait rester de cette édition — ta fiche Google My Business est peut-être la source de revenus la plus sous-exploitée de ton business. Elle t\'attend.',
  img1: '',
  img1After: 'none',
  img2: '',
  img2After: 'none',
  footerTitre: 'Si tu veux aller plus loin avec moi',
  rdv: 'LIEN_RDV_ICI',
  rdvTexte: 'Réserver un RDV stratégique gratuit (45 min)',
  rdvDesc: 'On analyse ta situation et je te donne un plan d\'action concret',
  guide: 'LIEN_GUIDE_ICI',
  guideTexte: 'Télécharger le guide SEO & GBP 2026',
  guideDesc: 'Tout ce qu\'il faut pour dominer Google localement — gratuit',
  siteUrl: 'https://salesexperienz.fr',
  siteTexte: 'Découvrir salesexperienz.fr',
  siteDesc: 'Automatisation, prospection, SEO & visibilité — tout est là',
  youtube: 'LIEN_YOUTUBE_ICI',
  linkedin: 'https://linkedin.com/in/autrementconseil',
  footerNom: 'Sales Expérienz · Laurent Guyonvarch',
  bandeauTitre: 'Les emails privés de Laurent',
};

export const PLACEHOLDER_VALUES = ['LIEN_', 'http'];

export const PRESET_THEMES: Array<{ id: string; label: string; colors: ColorPalette }> = [
  {
    // Noir profond + orange vif — signature Sales Expérienz
    id: 'noir-orange', label: 'Noir & Orange',
    colors: { primary: '#1A1A1A', primaryDark: '#2C2C2C', accent: '#E8742A', textPrimary: '#1A1A1A', textSecondary: '#6B6B6B', background: '#F4F1EC', backgroundSecondary: '#ffffff', borderTertiary: '#E4E0D8' },
  },
  {
    // Bleu marine foncé + corail chaud
    id: 'marine-corail', label: 'Marine & Corail',
    colors: { primary: '#0F2B5B', primaryDark: '#1A3F7A', accent: '#D95F3B', textPrimary: '#1A2A3A', textSecondary: '#5A6A7A', background: '#F4F1EC', backgroundSecondary: '#ffffff', borderTertiary: '#E2DED6' },
  },
  {
    // Ardoise sombre + or chaud
    id: 'ardoise-or', label: 'Ardoise & Or',
    colors: { primary: '#2B3040', primaryDark: '#3D4460', accent: '#C9A84C', textPrimary: '#2B3040', textSecondary: '#7A7D8D', background: '#F4F1EC', backgroundSecondary: '#ffffff', borderTertiary: '#E4E1D8' },
  },
  {
    // Vert forêt profond + ambre doré
    id: 'foret-ambre', label: 'Forêt & Ambre',
    colors: { primary: '#1C3829', primaryDark: '#2D5A42', accent: '#D4913A', textPrimary: '#1A2A22', textSecondary: '#5A7260', background: '#F4F1EC', backgroundSecondary: '#ffffff', borderTertiary: '#DDE6DA' },
  },
  {
    // Bordeaux intense + sable cuivré
    id: 'bordeaux-sable', label: 'Bordeaux & Sable',
    colors: { primary: '#52141E', primaryDark: '#6E1F2C', accent: '#BF9B6F', textPrimary: '#2C1A1E', textSecondary: '#8A6B6F', background: '#F4F1EC', backgroundSecondary: '#ffffff', borderTertiary: '#E8DDD8' },
  },
];

export const FONT_PAIRS: Record<FontPairKey, { heading: string; body: string; label: string; gFont: string | null }> = {
  classic:      { heading: 'Georgia,serif',                          body: 'Georgia,serif',              label: 'Georgia',        gFont: null },
  editorial:    { heading: "'Trebuchet MS',Arial,sans-serif",        body: "'Trebuchet MS',Arial,sans-serif", label: 'Trebuchet MS', gFont: null },
  elegant:      { heading: "'Palatino Linotype',Georgia,serif",      body: "'Palatino Linotype',Georgia,serif", label: 'Palatino', gFont: null },
  modern:       { heading: 'Arial,sans-serif',                       body: 'Arial,sans-serif',           label: 'Arial',          gFont: null },
  contemporary: { heading: 'Verdana,Geneva,sans-serif',              body: 'Verdana,Geneva,sans-serif',  label: 'Verdana',        gFont: null },
};

export const DEFAULT_BRAND: BrandSettings = {
  fontPair: 'classic',
  spacing: 'normal',
  corners: 'rounded',
  logoUrl: '',
};
