import { EditorState, ColorPalette, BrandSettings } from './types';
import { DEFAULT_STATE, DEFAULT_COLORS, DEFAULT_BRAND, PLACEHOLDER_VALUES } from './constants';

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function formatLines(
  s: string,
  style: string = '',
  colorText: string = '#2C2C2C',
  font: string = 'Georgia,serif'
): string {
  return s
    .split('\n')
    .filter((l) => l.trim())
    .map(
      (l) =>
        `<p style="${style}margin:0 0 10px 0;font-family:${font};font-size:15px;line-height:26px;color:${colorText};">${escapeHtml(l)}</p>`
    )
    .join('');
}

export function newlineToBreak(s: string): string {
  return escapeHtml(s).replace(/\n/g, '<br/>');
}

export function loadState(): EditorState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  const saved = localStorage.getItem('newsletterState');
  return saved ? { ...DEFAULT_STATE, ...JSON.parse(saved) } : DEFAULT_STATE;
}

export function saveState(state: EditorState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('newsletterState', JSON.stringify(state));
}

export function loadColors(): ColorPalette {
  if (typeof window === 'undefined') return DEFAULT_COLORS;
  const saved = localStorage.getItem('newsletterColors');
  return saved ? JSON.parse(saved) : DEFAULT_COLORS;
}

export function saveColors(colors: ColorPalette): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('newsletterColors', JSON.stringify(colors));
}

export function getPlaceholderSections(state: EditorState): string[] {
  const sections: string[] = [];
  Object.entries(state).forEach(([key, value]) => {
    if (typeof value === 'string' && PLACEHOLDER_VALUES.some((p) => value.includes(p))) {
      sections.push(key);
    }
  });
  return sections;
}

export function loadBrand(): BrandSettings {
  if (typeof window === 'undefined') return DEFAULT_BRAND;
  const saved = localStorage.getItem('newsletterBrand');
  return saved ? { ...DEFAULT_BRAND, ...JSON.parse(saved) } : DEFAULT_BRAND;
}

export function saveBrand(brand: BrandSettings): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('newsletterBrand', JSON.stringify(brand));
}

export function countFilledSections(state: EditorState): number {
  const total = Object.keys(state).length;
  const placeholders = getPlaceholderSections(state).length;
  return total - placeholders;
}
