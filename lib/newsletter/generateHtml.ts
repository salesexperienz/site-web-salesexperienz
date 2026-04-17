import { EditorState, ColorPalette, BrandSettings } from './types';
import { FONT_PAIRS, DEFAULT_BRAND } from './constants';
import { escapeHtml, formatLines } from './utils';

function brandVars(brand: BrandSettings) {
  const sp = brand.spacing === 'compact' ? 0.75 : brand.spacing === 'spacious' ? 1.35 : 1;
  const px = (n: number) => `${Math.round(n * sp)}px`;
  const radius = brand.corners === 'rounded' ? '8px' : '0px';
  const radiusSm = brand.corners === 'rounded' ? '6px' : '0px';
  const radiusBtn = brand.corners === 'rounded' ? '4px' : '0px';
  const pair = FONT_PAIRS[brand.fontPair];
  const hFont = pair.heading;
  const bFont = pair.body;
  const gFont = pair.gFont;
  const fontImport = gFont
    ? `<style>@import url('https://fonts.googleapis.com/css2?family=${gFont}&display=swap');</style>`
    : '';
  const logoHtml = brand.logoUrl
    ? `<img src="${escapeHtml(brand.logoUrl)}" alt="Logo" style="height:36px;max-width:140px;object-fit:contain;display:block;margin:0 auto ${px(16)} auto;" />`
    : '';
  return { px, radius, radiusSm, radiusBtn, hFont, bFont, fontImport, logoHtml };
}

function renderS2Item(s: string, num: string, colors: ColorPalette, bFont: string, last = false): string {
  const lines = s.split('\n');
  const title = escapeHtml(lines[0] || '');
  const body = escapeHtml(lines.slice(1).join(' ').trim());
  return `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:${last ? '24' : '12'}px;"><tr>
    <td valign="top" width="24" style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;color:${colors.accent};padding-top:2px;">${num}</td>
    <td style="padding-left:10px;"><p style="margin:0 0 3px;font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:${colors.primary};">${title}</p><p style="margin:0;font-family:${bFont};font-size:14px;line-height:24px;color:${colors.textPrimary};">${body}</p></td>
  </tr></table>`;
}

function renderS3Item(line: string, last: boolean, colors: ColorPalette, bFont: string): string {
  const margin = last ? '24' : '8';
  const idx = line.indexOf(' — ');
  if (idx === -1) {
    return `<p style="margin:0 0 ${margin}px;font-family:${bFont};font-size:15px;line-height:26px;color:${colors.textPrimary};">${escapeHtml(line)}</p>`;
  }
  const bold = escapeHtml(line.slice(0, idx));
  const rest = escapeHtml(line.slice(idx));
  return `<p style="margin:0 0 ${margin}px;font-family:${bFont};font-size:15px;line-height:26px;color:${colors.textPrimary};"><strong style="color:${colors.primary};">${bold}</strong>${rest}</p>`;
}

function renderImageBlock(url: string, radiusSm: string): string {
  if (!url || !url.trim()) return '';
  return `<div style="padding:0 0 28px;"><img src="${escapeHtml(url)}" width="100%" style="display:block;border-radius:${radiusSm};" alt=""/></div>`;
}

function imagesAt(pos: string, state: EditorState, radiusSm: string): string {
  return [
    state.img1After === pos ? renderImageBlock(state.img1, radiusSm) : '',
    state.img2After === pos ? renderImageBlock(state.img2, radiusSm) : '',
  ].join('');
}

function renderAction(text: string, num: string, last: boolean, colors: ColorPalette, bFont: string): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" border="0"${last ? '' : ' style="margin-bottom:12px;"'}><tr>
    <td valign="top" style="width:34px;padding-top:1px;"><div style="background:${colors.accent};border-radius:50%;width:24px;height:24px;text-align:center;line-height:24px;font-family:Arial,sans-serif;font-size:11px;font-weight:700;color:#fff;">${num}</div></td>
    <td style="padding-left:10px;"><p style="margin:0;font-family:${bFont};font-size:14px;line-height:24px;color:${colors.textPrimary};">${escapeHtml(text)}</p></td>
  </tr></table>`;
}

// Contenu seul — pour la prévisualisation dans le navigateur (dangerouslySetInnerHTML)
export function generateNewsletterBody(state: EditorState, colors: ColorPalette, brand: BrandSettings = DEFAULT_BRAND): string {
  const { px, radius, radiusSm, radiusBtn, hFont, bFont, fontImport, logoHtml } = brandVars(brand);
  const tlines = state.titre.split('\n');
  return `${fontImport}<div style="background:${colors.background};padding:${px(24)} ${px(12)};font-family:${bFont};">
<div style="max-width:560px;margin:0 auto;">
<div style="background:${colors.primary};padding:${px(12)} ${px(24)};border-radius:${radius} ${radius} 0 0;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="font-family:Arial,sans-serif;font-size:10px;color:#A8BEDA;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(state.bandeauTitre)}</td>
    <td align="right" style="font-family:Arial,sans-serif;font-size:10px;color:${colors.accent};letter-spacing:1px;text-transform:uppercase;">${escapeHtml(state.edition)}</td>
  </tr></table>
</div>
<div style="background:${colors.backgroundSecondary};padding:${px(36)} ${px(32)} ${px(28)};">
  ${logoHtml}
  <p style="margin:0 0 ${px(14)};font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">${escapeHtml(state.categorie)}</p>
  <h1 style="margin:0 0 ${px(14)};font-family:${hFont};font-size:26px;line-height:36px;font-weight:700;color:${colors.primary};">${tlines.map((l) => escapeHtml(l)).join('<br/>')}</h1>
  <p style="margin:0 0 ${px(20)};font-family:${bFont};font-size:15px;line-height:26px;color:${colors.textSecondary};font-style:italic;">${escapeHtml(state.soustitre)}</p>
  <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="border-bottom:2px solid ${colors.accent};width:50px;">&nbsp;</td>
    <td style="border-bottom:1px solid ${colors.borderTertiary};">&nbsp;</td>
  </tr></table>
</div>
<div style="background:${colors.backgroundSecondary};padding:0 ${px(32)} ${px(28)};">
  <p style="margin:0 0 ${px(14)};font-family:${bFont};font-size:15px;line-height:26px;color:${colors.textPrimary};">Salut,</p>
  ${formatLines(state.intro, '', colors.textPrimary, bFont)}
</div>
${imagesAt('intro', state, radiusSm)}
<div style="background:${colors.backgroundSecondary};padding:0 ${px(32)} ${px(28)};">
  <div style="background:${colors.background};border-radius:${radiusSm};border-left:4px solid ${colors.accent};padding:${px(16)} ${px(20)};">
    <p style="margin:0 0 ${px(10)};font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">Ce que tu vas trouver ici</p>
    ${formatLines(state.sommaire, '', colors.primary, bFont)}
  </div>
</div>
${imagesAt('sommaire', state, radiusSm)}
<div style="background:${colors.backgroundSecondary};padding:0 ${px(32)};">
  <div style="border-bottom:1px solid ${colors.borderTertiary};padding-bottom:6px;margin-bottom:${px(12)};">
    <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">01 · Le vrai problème</p>
  </div>
  <h2 style="margin:0 0 ${px(12)};font-family:${hFont};font-size:20px;line-height:28px;font-weight:700;color:${colors.primary};">${escapeHtml(state.s1titre)}</h2>
  ${formatLines(state.s1corps, '', colors.textPrimary, bFont)}
  <div style="background:#EEF3FA;border-left:4px solid #2B5BA8;padding:${px(14)} ${px(18)};margin-bottom:${px(28)};">
    <p style="margin:0;font-family:${bFont};font-size:14px;line-height:24px;color:${colors.primary};font-style:italic;">${escapeHtml(state.s1resume)}</p>
  </div>
</div>
${imagesAt('s1', state, radiusSm)}
<div style="background:${colors.backgroundSecondary};padding:0 ${px(32)};"><div style="border-bottom:1px solid ${colors.borderTertiary};margin-bottom:0;">&nbsp;</div></div>
<div style="background:${colors.backgroundSecondary};padding:${px(24)} ${px(32)} 0;">
  <div style="border-bottom:1px solid ${colors.borderTertiary};padding-bottom:6px;margin-bottom:${px(12)};">
    <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">02 · Les erreurs fréquentes</p>
  </div>
  <h2 style="margin:0 0 ${px(16)};font-family:${hFont};font-size:20px;line-height:28px;font-weight:700;color:${colors.primary};">${escapeHtml(state.s2titre)}</h2>
  ${renderS2Item(state.s2item1, '01', colors, bFont)}
  ${renderS2Item(state.s2item2, '02', colors, bFont)}
  ${renderS2Item(state.s2item3, '03', colors, bFont, true)}
</div>
${imagesAt('s2', state, radiusSm)}
<div style="background:${colors.backgroundSecondary};padding:0 ${px(32)};"><div style="border-bottom:1px solid ${colors.borderTertiary};">&nbsp;</div></div>
<div style="background:${colors.backgroundSecondary};padding:${px(24)} ${px(32)} 0;">
  <div style="border-bottom:1px solid ${colors.borderTertiary};padding-bottom:6px;margin-bottom:${px(12)};">
    <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">03 · Mon expérience</p>
  </div>
  <h2 style="margin:0 0 ${px(12)};font-family:${hFont};font-size:20px;line-height:28px;font-weight:700;color:${colors.primary};">${escapeHtml(state.s3titre)}</h2>
  ${state.s3items.split('\n').filter((l) => l.trim()).map((l, i, arr) => renderS3Item(l, i === arr.length - 1, colors, bFont)).join('')}
</div>
${imagesAt('s3', state, radiusSm)}
<div style="background:${colors.backgroundSecondary};padding:0 ${px(32)};"><div style="border-bottom:1px solid ${colors.borderTertiary};">&nbsp;</div></div>
<div style="background:${colors.backgroundSecondary};padding:${px(24)} ${px(32)} ${px(28)};">
  <div style="border-bottom:1px solid ${colors.borderTertiary};padding-bottom:6px;margin-bottom:${px(12)};">
    <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">04 · À retenir</p>
  </div>
  <h2 style="margin:0 0 ${px(12)};font-family:${hFont};font-size:20px;line-height:28px;font-weight:700;color:${colors.primary};">${escapeHtml(state.s4titre)}</h2>
  ${formatLines(state.s4corps, '', colors.textPrimary, bFont)}
</div>
${imagesAt('s4', state, radiusSm)}
<div style="background:${colors.backgroundSecondary};padding:0 ${px(32)} ${px(28)};">
  <div style="background:${colors.primary};border-radius:${radius};padding:${px(24)};">
    <p style="margin:0 0 ${px(4)};font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">Le chiffre qui change tout</p>
    <p style="margin:0 0 ${px(10)};font-family:${hFont};font-size:40px;line-height:48px;font-weight:700;color:#fff;">${escapeHtml(state.chiffre)}</p>
    <p style="margin:0;font-family:${bFont};font-size:14px;line-height:24px;color:#A8BEDA;">${escapeHtml(state.chiffreTexte)}</p>
  </div>
</div>
<div style="background:${colors.backgroundSecondary};padding:0 ${px(32)} ${px(28)};">
  <p style="margin:0 0 ${px(6)};font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">Ce que tu peux faire dès aujourd'hui</p>
  <h2 style="margin:0 0 ${px(18)};font-family:${hFont};font-size:20px;line-height:28px;font-weight:700;color:${colors.primary};">${escapeHtml(state.actionsH)}</h2>
  ${renderAction(state.action1, '1', false, colors, bFont)}
  ${renderAction(state.action2, '2', false, colors, bFont)}
  ${renderAction(state.action3, '3', true, colors, bFont)}
</div>
${imagesAt('actions', state, radiusSm)}
<div style="background:${colors.backgroundSecondary};padding:0 ${px(32)} ${px(28)};">
  <div style="background:${colors.primary};border-radius:${radius};padding:${px(24)};">
    <p style="margin:0 0 ${px(6)};font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">Pour aller plus loin</p>
    <p style="margin:0 0 ${px(16)};font-family:${hFont};font-size:17px;line-height:26px;font-weight:700;color:#fff;">${escapeHtml(state.ctotire)}</p>
    <div style="text-align:center;"><a href="${escapeHtml(state.guide)}" style="display:inline-block;background:${colors.accent};color:#fff;font-family:Arial,sans-serif;font-size:13px;font-weight:700;text-decoration:none;padding:${px(12)} ${px(22)};border-radius:${radiusBtn};">📥 Télécharger le guide gratuitement →</a></div>
  </div>
</div>
<div style="background:${colors.backgroundSecondary};padding:0 ${px(32)} ${px(28)};">
  <div style="border-top:1px solid ${colors.borderTertiary};padding-top:${px(24)};">
    ${formatLines(state.conclu, '', colors.textPrimary, bFont)}
    <p style="margin:0 0 ${px(4)};font-family:${bFont};font-size:15px;color:${colors.textSecondary};font-style:italic;">À très vite,</p>
    <p style="margin:0 0 ${px(20)};font-family:${hFont};font-size:20px;font-weight:700;color:${colors.primary};">Laurent</p>
    <div style="border-top:1px solid ${colors.borderTertiary};padding-top:${px(16)};">
      <p style="margin:0;font-family:${bFont};font-size:13px;line-height:22px;color:#8A8A8A;font-style:italic;"><strong style="color:${colors.accent};">PS :</strong> ${escapeHtml(state.ps)}</p>
    </div>
  </div>
</div>
${imagesAt('conclu', state, radiusSm)}
<div style="background:${colors.background};padding:${px(24)} ${px(32)};">
  <p style="margin:0 0 ${px(14)};font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8A8A8A;">${escapeHtml(state.footerTitre)}</p>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;"><tr>
    <td valign="top" width="22"><span style="font-size:14px;">📅</span></td>
    <td style="padding-left:8px;"><a href="${escapeHtml(state.rdv)}" style="font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:${colors.primary};text-decoration:none;border-bottom:1px solid ${colors.primary};">${escapeHtml(state.rdvTexte)}</a><p style="margin:2px 0 0;font-family:${bFont};font-size:12px;color:#8A8A8A;font-style:italic;">${escapeHtml(state.rdvDesc)}</p></td>
  </tr></table>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;"><tr>
    <td valign="top" width="22"><span style="font-size:14px;">📥</span></td>
    <td style="padding-left:8px;"><a href="${escapeHtml(state.guide)}" style="font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:${colors.primary};text-decoration:none;border-bottom:1px solid ${colors.primary};">${escapeHtml(state.guideTexte)}</a><p style="margin:2px 0 0;font-family:${bFont};font-size:12px;color:#8A8A8A;font-style:italic;">${escapeHtml(state.guideDesc)}</p></td>
  </tr></table>
  <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td valign="top" width="22"><span style="font-size:14px;">🌐</span></td>
    <td style="padding-left:8px;"><a href="${escapeHtml(state.siteUrl)}" style="font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:${colors.primary};text-decoration:none;border-bottom:1px solid ${colors.primary};">${escapeHtml(state.siteTexte)}</a><p style="margin:2px 0 0;font-family:${bFont};font-size:12px;color:#8A8A8A;font-style:italic;">${escapeHtml(state.siteDesc)}</p></td>
  </tr></table>
</div>
<div style="background:${colors.primary};padding:${px(20)} ${px(32)};border-radius:0 0 ${radius} ${radius};">
  <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="font-family:Arial,sans-serif;font-size:11px;color:#A8BEDA;line-height:18px;">
      <strong style="color:#fff;">${escapeHtml(state.footerNom)}</strong><br/>
      <a href="#" style="color:${colors.accent};text-decoration:underline;">Se désabonner</a>
    </td>
    <td align="right" valign="top">
      <a href="${escapeHtml(state.linkedin)}" style="font-family:Arial,sans-serif;font-size:10px;color:#A8BEDA;text-decoration:none;display:block;margin-bottom:4px;">LinkedIn →</a>
      <a href="${escapeHtml(state.youtube)}" style="font-family:Arial,sans-serif;font-size:10px;color:#A8BEDA;text-decoration:none;display:block;">YouTube →</a>
    </td>
  </tr></table>
</div>
</div></div>`;
}

// Document HTML complet — pour l'export (téléchargement ZIP / HTML)
export function generateNewsletterHtml(state: EditorState, colors: ColorPalette, brand: BrandSettings = DEFAULT_BRAND): string {
  const { px, radius, radiusSm, radiusBtn, hFont, bFont, logoHtml } = brandVars(brand);
  const tlines = state.titre.split('\n');
  const gFontLink = FONT_PAIRS[brand.fontPair].gFont
    ? `<link href="https://fonts.googleapis.com/css2?family=${FONT_PAIRS[brand.fontPair].gFont}&display=swap" rel="stylesheet"/>`
    : '';
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${escapeHtml(state.edition)}</title>
${gFontLink}
<style type="text/css">
body,table,td,p,a,h1,h2{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;margin:0;padding:0;}
table,td{mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;}
body{background-color:${colors.background};font-family:${bFont};}
img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none;}
@media only screen and (max-width:600px){
  .container{width:100%!important;max-width:100%!important;}
  .mp{padding:20px 16px!important;}
  h1{font-size:22px!important;line-height:30px!important;}
}
</style></head>
<body style="background-color:${colors.background};margin:0;padding:0;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${colors.background};">
<tr><td align="center" style="padding:${px(24)} ${px(12)};">
<table class="container" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">

<tr><td style="background-color:${colors.primary};padding:${px(12)} ${px(24)};border-radius:${radius} ${radius} 0 0;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="font-family:Arial,sans-serif;font-size:10px;color:#A8BEDA;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(state.bandeauTitre)}</td>
    <td align="right" style="font-family:Arial,sans-serif;font-size:10px;color:${colors.accent};letter-spacing:1px;text-transform:uppercase;">${escapeHtml(state.edition)}</td>
  </tr></table>
</td></tr>

<tr><td style="background-color:${colors.backgroundSecondary};padding:${px(36)} ${px(32)} ${px(28)};">
  ${logoHtml}
  <p style="margin:0 0 ${px(14)};font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">${escapeHtml(state.categorie)}</p>
  <h1 style="margin:0 0 ${px(14)};font-family:${hFont};font-size:26px;line-height:36px;font-weight:700;color:${colors.primary};">${tlines.map((l) => escapeHtml(l)).join('<br/>')}</h1>
  <p style="margin:0 0 ${px(20)};font-family:${bFont};font-size:15px;line-height:26px;color:${colors.textSecondary};font-style:italic;">${escapeHtml(state.soustitre)}</p>
  <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="border-bottom:2px solid ${colors.accent};width:50px;">&nbsp;</td>
    <td style="border-bottom:1px solid ${colors.borderTertiary};">&nbsp;</td>
  </tr></table>
</td></tr>

<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)} ${px(28)};">
  <p style="margin:0 0 ${px(14)};font-family:${bFont};font-size:15px;line-height:26px;color:${colors.textPrimary};">Salut,</p>
  ${formatLines(state.intro, '', colors.textPrimary, bFont)}
</td></tr>
${imagesAt('intro', state, radiusSm) ? `<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)};">${imagesAt('intro', state, radiusSm)}</td></tr>` : ''}

<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)} ${px(28)};">
  <div style="background:${colors.background};border-radius:${radiusSm};border-left:4px solid ${colors.accent};padding:${px(16)} ${px(20)};">
    <p style="margin:0 0 ${px(10)};font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">Ce que tu vas trouver ici</p>
    ${formatLines(state.sommaire, '', colors.primary, bFont)}
  </div>
</td></tr>
${imagesAt('sommaire', state, radiusSm) ? `<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)};">${imagesAt('sommaire', state, radiusSm)}</td></tr>` : ''}

<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)};">
  <div style="border-bottom:1px solid ${colors.borderTertiary};padding-bottom:6px;margin-bottom:${px(12)};">
    <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">01 · Le vrai problème</p>
  </div>
  <h2 style="margin:0 0 ${px(12)};font-family:${hFont};font-size:20px;line-height:28px;font-weight:700;color:${colors.primary};">${escapeHtml(state.s1titre)}</h2>
  ${formatLines(state.s1corps, '', colors.textPrimary, bFont)}
  <div style="background:#EEF3FA;border-left:4px solid #2B5BA8;padding:${px(14)} ${px(18)};margin-bottom:${px(28)};">
    <p style="margin:0;font-family:${bFont};font-size:14px;line-height:24px;color:${colors.primary};font-style:italic;">${escapeHtml(state.s1resume)}</p>
  </div>
</td></tr>
${imagesAt('s1', state, radiusSm) ? `<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)};">${imagesAt('s1', state, radiusSm)}</td></tr>` : ''}

<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)};"><div style="border-bottom:1px solid ${colors.borderTertiary};">&nbsp;</div></td></tr>

<tr><td style="background-color:${colors.backgroundSecondary};padding:${px(24)} ${px(32)} 0;">
  <div style="border-bottom:1px solid ${colors.borderTertiary};padding-bottom:6px;margin-bottom:${px(12)};">
    <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">02 · Les erreurs fréquentes</p>
  </div>
  <h2 style="margin:0 0 ${px(16)};font-family:${hFont};font-size:20px;line-height:28px;font-weight:700;color:${colors.primary};">${escapeHtml(state.s2titre)}</h2>
  ${renderS2Item(state.s2item1, '01', colors, bFont)}
  ${renderS2Item(state.s2item2, '02', colors, bFont)}
  ${renderS2Item(state.s2item3, '03', colors, bFont, true)}
</td></tr>
${imagesAt('s2', state, radiusSm) ? `<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)};">${imagesAt('s2', state, radiusSm)}</td></tr>` : ''}

<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)};"><div style="border-bottom:1px solid ${colors.borderTertiary};">&nbsp;</div></td></tr>

<tr><td style="background-color:${colors.backgroundSecondary};padding:${px(24)} ${px(32)} 0;">
  <div style="border-bottom:1px solid ${colors.borderTertiary};padding-bottom:6px;margin-bottom:${px(12)};">
    <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">03 · Mon expérience</p>
  </div>
  <h2 style="margin:0 0 ${px(12)};font-family:${hFont};font-size:20px;line-height:28px;font-weight:700;color:${colors.primary};">${escapeHtml(state.s3titre)}</h2>
  ${state.s3items.split('\n').filter((l) => l.trim()).map((l, i, arr) => renderS3Item(l, i === arr.length - 1, colors, bFont)).join('')}
</td></tr>
${imagesAt('s3', state, radiusSm) ? `<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)};">${imagesAt('s3', state, radiusSm)}</td></tr>` : ''}

<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)};"><div style="border-bottom:1px solid ${colors.borderTertiary};">&nbsp;</div></td></tr>

<tr><td style="background-color:${colors.backgroundSecondary};padding:${px(24)} ${px(32)} ${px(28)};">
  <div style="border-bottom:1px solid ${colors.borderTertiary};padding-bottom:6px;margin-bottom:${px(12)};">
    <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">04 · À retenir</p>
  </div>
  <h2 style="margin:0 0 ${px(12)};font-family:${hFont};font-size:20px;line-height:28px;font-weight:700;color:${colors.primary};">${escapeHtml(state.s4titre)}</h2>
  ${formatLines(state.s4corps, '', colors.textPrimary, bFont)}
</td></tr>
${imagesAt('s4', state, radiusSm) ? `<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)};">${imagesAt('s4', state, radiusSm)}</td></tr>` : ''}

<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)} ${px(28)};">
  <div style="background:${colors.primary};border-radius:${radius};padding:${px(24)};">
    <p style="margin:0 0 ${px(4)};font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">Le chiffre qui change tout</p>
    <p style="margin:0 0 ${px(10)};font-family:${hFont};font-size:40px;line-height:48px;font-weight:700;color:#fff;">${escapeHtml(state.chiffre)}</p>
    <p style="margin:0;font-family:${bFont};font-size:14px;line-height:24px;color:#A8BEDA;">${escapeHtml(state.chiffreTexte)}</p>
  </div>
</td></tr>

<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)} ${px(28)};">
  <p style="margin:0 0 ${px(6)};font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">Ce que tu peux faire dès aujourd'hui</p>
  <h2 style="margin:0 0 ${px(18)};font-family:${hFont};font-size:20px;line-height:28px;font-weight:700;color:${colors.primary};">${escapeHtml(state.actionsH)}</h2>
  ${renderAction(state.action1, '1', false, colors, bFont)}
  ${renderAction(state.action2, '2', false, colors, bFont)}
  ${renderAction(state.action3, '3', true, colors, bFont)}
</td></tr>
${imagesAt('actions', state, radiusSm) ? `<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)};">${imagesAt('actions', state, radiusSm)}</td></tr>` : ''}

<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)} ${px(28)};">
  <div style="background:${colors.primary};border-radius:${radius};padding:${px(24)};">
    <p style="margin:0 0 ${px(6)};font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${colors.accent};">Pour aller plus loin</p>
    <p style="margin:0 0 ${px(16)};font-family:${hFont};font-size:17px;line-height:26px;font-weight:700;color:#fff;">${escapeHtml(state.ctotire)}</p>
    <div style="text-align:center;"><a href="${escapeHtml(state.guide)}" style="display:inline-block;background:${colors.accent};color:#fff;font-family:Arial,sans-serif;font-size:13px;font-weight:700;text-decoration:none;padding:${px(12)} ${px(22)};border-radius:${radiusBtn};">&#128229; Télécharger le guide gratuitement &rarr;</a></div>
  </div>
</td></tr>

<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)} ${px(28)};">
  <div style="border-top:1px solid ${colors.borderTertiary};padding-top:${px(24)};">
    ${formatLines(state.conclu, '', colors.textPrimary, bFont)}
    <p style="margin:0 0 ${px(4)};font-family:${bFont};font-size:15px;color:${colors.textSecondary};font-style:italic;">À très vite,</p>
    <p style="margin:0 0 ${px(20)};font-family:${hFont};font-size:20px;font-weight:700;color:${colors.primary};">Laurent</p>
    <div style="border-top:1px solid ${colors.borderTertiary};padding-top:${px(16)};">
      <p style="margin:0;font-family:${bFont};font-size:13px;line-height:22px;color:#8A8A8A;font-style:italic;"><strong style="color:${colors.accent};">PS :</strong> ${escapeHtml(state.ps)}</p>
    </div>
  </div>
</td></tr>
${imagesAt('conclu', state, radiusSm) ? `<tr><td style="background-color:${colors.backgroundSecondary};padding:0 ${px(32)};">${imagesAt('conclu', state, radiusSm)}</td></tr>` : ''}

<tr><td style="background-color:${colors.background};padding:${px(24)} ${px(32)};">
  <p style="margin:0 0 ${px(14)};font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8A8A8A;">${escapeHtml(state.footerTitre)}</p>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;"><tr>
    <td valign="top" width="22"><span style="font-size:14px;">&#128197;</span></td>
    <td style="padding-left:8px;"><a href="${escapeHtml(state.rdv)}" style="font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:${colors.primary};text-decoration:none;border-bottom:1px solid ${colors.primary};">${escapeHtml(state.rdvTexte)}</a><p style="margin:2px 0 0;font-family:${bFont};font-size:12px;color:#8A8A8A;font-style:italic;">${escapeHtml(state.rdvDesc)}</p></td>
  </tr></table>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px;"><tr>
    <td valign="top" width="22"><span style="font-size:14px;">&#128229;</span></td>
    <td style="padding-left:8px;"><a href="${escapeHtml(state.guide)}" style="font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:${colors.primary};text-decoration:none;border-bottom:1px solid ${colors.primary};">${escapeHtml(state.guideTexte)}</a><p style="margin:2px 0 0;font-family:${bFont};font-size:12px;color:#8A8A8A;font-style:italic;">${escapeHtml(state.guideDesc)}</p></td>
  </tr></table>
  <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td valign="top" width="22"><span style="font-size:14px;">&#127760;</span></td>
    <td style="padding-left:8px;"><a href="${escapeHtml(state.siteUrl)}" style="font-family:Arial,sans-serif;font-size:14px;font-weight:700;color:${colors.primary};text-decoration:none;border-bottom:1px solid ${colors.primary};">${escapeHtml(state.siteTexte)}</a><p style="margin:2px 0 0;font-family:${bFont};font-size:12px;color:#8A8A8A;font-style:italic;">${escapeHtml(state.siteDesc)}</p></td>
  </tr></table>
</td></tr>

<tr><td style="background-color:${colors.primary};padding:${px(20)} ${px(32)};border-radius:0 0 ${radius} ${radius};">
  <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
    <td style="font-family:Arial,sans-serif;font-size:11px;color:#A8BEDA;line-height:18px;">
      <strong style="color:#fff;">${escapeHtml(state.footerNom)}</strong><br/>
      <a href="#" style="color:${colors.accent};text-decoration:underline;">Se désabonner</a>
    </td>
    <td align="right" valign="top">
      <a href="${escapeHtml(state.linkedin)}" style="font-family:Arial,sans-serif;font-size:10px;color:#A8BEDA;text-decoration:none;display:block;margin-bottom:4px;">LinkedIn &rarr;</a>
      <a href="${escapeHtml(state.youtube)}" style="font-family:Arial,sans-serif;font-size:10px;color:#A8BEDA;text-decoration:none;display:block;">YouTube &rarr;</a>
    </td>
  </tr></table>
</td></tr>

</table>
</td></tr></table>
</body></html>`;
}
