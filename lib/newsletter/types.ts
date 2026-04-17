export interface SectionConfig {
  n: string;
  label: string;
  sub: string;
  multi?: boolean;
  type?: 'text' | 'color' | 'image';
}

export type FontPairKey = 'classic' | 'editorial' | 'elegant' | 'modern' | 'contemporary';
export type SpacingKey = 'compact' | 'normal' | 'spacious';
export type CornersKey = 'rounded' | 'square';

export interface BrandSettings {
  fontPair: FontPairKey;
  spacing: SpacingKey;
  corners: CornersKey;
  logoUrl: string;
}

export interface ColorPalette {
  primary: string;
  primaryDark: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  background: string;
  backgroundSecondary: string;
  borderTertiary: string;
}

export interface EditorState {
  edition: string;
  categorie: string;
  titre: string;
  soustitre: string;
  intro: string;
  sommaire: string;
  s1titre: string;
  s1corps: string;
  s1resume: string;
  s2titre: string;
  s2item1: string;
  s2item2: string;
  s2item3: string;
  s3titre: string;
  s3items: string;
  s4titre: string;
  s4corps: string;
  chiffre: string;
  chiffreTexte: string;
  actionsH: string;
  action1: string;
  action2: string;
  action3: string;
  ctotire: string;
  conclu: string;
  ps: string;
  img1: string;
  img1After: string;
  img2: string;
  img2After: string;
  footerTitre: string;
  rdv: string;
  rdvTexte: string;
  rdvDesc: string;
  guide: string;
  guideTexte: string;
  guideDesc: string;
  siteUrl: string;
  siteTexte: string;
  siteDesc: string;
  youtube: string;
  linkedin: string;
  footerNom: string;
  bandeauTitre: string;
}

export type SectionKey = keyof EditorState;
