import { BrandSettings, ColorPalette, FontPairKey, SpacingKey, CornersKey } from '@/lib/newsletter/types';
import { PRESET_THEMES, FONT_PAIRS, DEFAULT_COLORS, DEFAULT_BRAND } from '@/lib/newsletter/constants';
import { ColorPaletteEditor } from './ColorPalette';
import { RotateCcw, Palette, Type, Layout, Image } from 'lucide-react';

interface BrandPanelProps {
  brand: BrandSettings;
  colors: ColorPalette;
  onBrandChange: (updates: Partial<BrandSettings>) => void;
  onColorChange: (key: keyof ColorPalette, value: string) => void;
  onResetColors: () => void;
  onResetAll: () => void;
}

const SPACING_OPTIONS: Array<{ value: SpacingKey; label: string }> = [
  { value: 'compact',  label: 'Compact' },
  { value: 'normal',   label: 'Normal' },
  { value: 'spacious', label: 'Aéré' },
];

const CORNERS_OPTIONS: Array<{ value: CornersKey; label: string }> = [
  { value: 'rounded', label: 'Arrondis' },
  { value: 'square',  label: 'Carrés' },
];

function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <span className="text-xs font-medium text-stone-700 uppercase tracking-wide">{label}</span>
    </div>
  );
}

export function BrandPanel({ brand, colors, onBrandChange, onColorChange, onResetColors, onResetAll }: BrandPanelProps) {
  return (
    <div className="flex-1 overflow-y-auto">

      {/* Thèmes prédéfinis */}
      <div className="p-3 border-b border-stone-200">
        <SectionTitle icon={<Palette size={14} className="text-orange-600" />} label="Thèmes prédéfinis" />
        <div className="grid grid-cols-1 gap-1.5">
          {PRESET_THEMES.map((theme) => {
            const isActive = colors.primary === theme.colors.primary && colors.accent === theme.colors.accent;
            return (
              <button key={theme.id}
                onClick={() => Object.entries(theme.colors).forEach(([k, v]) => onColorChange(k as keyof ColorPalette, v))}
                className={`flex items-center gap-3 px-3 py-2 rounded border text-left transition-colors ${
                  isActive ? 'border-orange-600 bg-orange-50' : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}>
                <div className="flex gap-1 flex-shrink-0">
                  <div className="w-4 h-4 rounded-full border border-white/50 shadow-sm" style={{ background: theme.colors.primary }} />
                  <div className="w-4 h-4 rounded-full border border-white/50 shadow-sm" style={{ background: theme.colors.accent }} />
                  <div className="w-4 h-4 rounded-full border border-stone-200 shadow-sm" style={{ background: theme.colors.background }} />
                </div>
                <span className={`text-xs font-medium ${isActive ? 'text-orange-700' : 'text-stone-700'}`}>{theme.label}</span>
                {isActive && <span className="ml-auto text-xs text-orange-600">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Typographie */}
      <div className="p-3 border-b border-stone-200">
        <SectionTitle icon={<Type size={14} className="text-orange-600" />} label="Typographie" />
        <div className="grid grid-cols-1 gap-1.5">
          {(Object.entries(FONT_PAIRS) as Array<[FontPairKey, typeof FONT_PAIRS[FontPairKey]]>).map(([key, pair]) => {
            const isActive = brand.fontPair === key;
            return (
              <button key={key} onClick={() => onBrandChange({ fontPair: key })}
                className={`flex items-center justify-between px-3 py-2 rounded border text-left transition-colors ${
                  isActive ? 'border-orange-600 bg-orange-50' : 'border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                }`}>
                <span className={`text-sm ${isActive ? 'text-orange-700' : 'text-stone-800'}`} style={{ fontFamily: pair.heading }}>
                  {pair.label}
                </span>
                <span className={`text-base ml-2 ${isActive ? 'text-orange-400' : 'text-stone-300'}`} style={{ fontFamily: pair.heading }}>
                  Aa
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-stone-400">Polices compatibles Gmail &amp; Outlook.</p>
      </div>

      {/* Style des blocs */}
      <div className="p-3 border-b border-stone-200">
        <SectionTitle icon={<Layout size={14} className="text-orange-600" />} label="Style des blocs" />
        <p className="text-xs text-stone-500 mb-1.5">Espacement</p>
        <div className="flex gap-1 mb-3">
          {SPACING_OPTIONS.map(({ value, label }) => (
            <button key={value} onClick={() => onBrandChange({ spacing: value })}
              className={`flex-1 py-1.5 text-xs rounded border transition-colors ${
                brand.spacing === value
                  ? 'border-orange-600 bg-orange-50 text-orange-700 font-medium'
                  : 'border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
              }`}>
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-stone-500 mb-1.5">Coins</p>
        <div className="flex gap-1">
          {CORNERS_OPTIONS.map(({ value, label }) => (
            <button key={value} onClick={() => onBrandChange({ corners: value })}
              className={`flex-1 py-1.5 text-xs border transition-colors ${value === 'rounded' ? 'rounded' : 'rounded-none'} ${
                brand.corners === value
                  ? 'border-orange-600 bg-orange-50 text-orange-700 font-medium'
                  : 'border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Logo */}
      <div className="p-3 border-b border-stone-200">
        <SectionTitle icon={<Image size={14} className="text-orange-600" />} label="Logo" />
        <input type="url" value={brand.logoUrl} onChange={(e) => onBrandChange({ logoUrl: e.target.value })}
          placeholder="https://... (URL de l'image)"
          className="w-full p-2 text-xs border border-stone-300 rounded bg-white text-stone-900 focus:outline-none focus:border-orange-600" />
        {brand.logoUrl && (
          <div className="mt-2 p-2 bg-stone-100 rounded flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.logoUrl} alt="Logo aperçu" className="max-h-10 max-w-full object-contain"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
        )}
        <p className="mt-1 text-xs text-stone-400">Affiché dans l&apos;en-tête de la newsletter</p>
      </div>

      {/* Couleurs fine-tuning */}
      <ColorPaletteEditor colors={colors} onColorChange={onColorChange} />

      {/* Réinitialisation */}
      <div className="p-3 border-t border-stone-200 flex flex-col gap-2">
        <button onClick={onResetColors}
          className="flex items-center justify-center gap-1.5 w-full py-2 text-xs border border-stone-300 rounded text-stone-600 hover:bg-stone-100 transition-colors">
          <RotateCcw size={12} /> Réinitialiser les couleurs
        </button>
        <button onClick={onResetAll}
          className="flex items-center justify-center gap-1.5 w-full py-2 text-xs border border-red-200 rounded text-red-600 hover:bg-red-50 transition-colors">
          <RotateCcw size={12} /> Réinitialiser toute la charte
        </button>
      </div>

    </div>
  );
}
