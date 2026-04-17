import { ColorPalette, SectionKey } from '@/lib/newsletter/types';
import { Palette } from 'lucide-react';

interface ColorPaletteProps {
  colors: ColorPalette;
  currentSection: SectionKey | null;
  onColorChange: (colorKey: keyof ColorPalette, value: string) => void;
  onSelectColorSection: () => void;
}

const COLOR_LABELS: Record<keyof ColorPalette, { label: string; sub: string }> = {
  primary:             { label: 'Couleur principale',      sub: 'Bandeau, footer, titres h2' },
  primaryDark:         { label: 'Couleur secondaire',      sub: 'Liens, variante de la principale' },
  accent:              { label: "Couleur d'accentuation",  sub: 'CTA, labels, soulignements' },
  textPrimary:         { label: 'Texte du corps',          sub: 'Paragraphes, intro, conclusion' },
  textSecondary:       { label: 'Texte secondaire',        sub: 'Sous-titre, légendes, italique' },
  background:          { label: 'Fond général',            sub: 'Arrière-plan de la page (beige)' },
  backgroundSecondary: { label: 'Fond des sections',       sub: 'Blocs de contenu (blanc)' },
  borderTertiary:      { label: 'Séparateurs',             sub: 'Lignes de séparation entre blocs' },
};

export function ColorPaletteEditor({ colors, onColorChange }: Omit<ColorPaletteProps, 'currentSection' | 'onSelectColorSection'>) {
  return (
    <div className="p-3 border-t border-stone-200 bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="flex items-center gap-2 mb-3">
        <Palette size={16} className="text-orange-600" />
        <label className="text-xs font-medium text-stone-700 uppercase tracking-wide">Palette de couleurs</label>
      </div>
      <div className="flex flex-col gap-2">
        {(Object.entries(colors) as Array<[keyof ColorPalette, string]>).map(([key, value]) => (
          <div key={key} className="flex items-center gap-3">
            <input
              type="color"
              value={value}
              onChange={(e) => onColorChange(key, e.target.value)}
              className="w-8 h-8 flex-shrink-0 rounded cursor-pointer border border-stone-300"
              title={COLOR_LABELS[key].label}
            />
            <div className="min-w-0">
              <p className="text-xs font-medium text-stone-700 leading-tight">{COLOR_LABELS[key].label}</p>
              <p className="text-xs text-stone-400 leading-tight truncate">{COLOR_LABELS[key].sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
