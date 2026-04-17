import { EditorState, ColorPalette, SectionKey } from '@/lib/newsletter/types';
import { SECTION_DATA } from '@/lib/newsletter/constants';

const IMAGE_POSITIONS = [
  { value: 'none',    label: 'Désactivé' },
  { value: 'intro',   label: "Après l'introduction" },
  { value: 'sommaire',label: 'Après le sommaire' },
  { value: 's1',      label: 'Après la section 1' },
  { value: 's2',      label: 'Après la section 2' },
  { value: 's3',      label: 'Après la section 3' },
  { value: 's4',      label: 'Après la section 4' },
  { value: 'actions', label: 'Après les actions' },
  { value: 'conclu',  label: 'Après la conclusion' },
];

interface EditorProps {
  currentSection: SectionKey | null;
  state: EditorState;
  colors: ColorPalette;
  onStateChange: (key: SectionKey, value: string) => void;
  onColorChange: (colorKey: keyof ColorPalette, value: string) => void;
}

export function Editor({ currentSection, state, onStateChange }: EditorProps) {
  if (!currentSection) return null;

  const config = SECTION_DATA[currentSection];
  const value = state[currentSection];

  if (config.type === 'image') {
    const afterKey = (currentSection + 'After') as SectionKey;
    return (
      <div className="p-3 border-t border-stone-200 bg-stone-50 space-y-3">
        <div>
          <label className="text-xs font-medium text-stone-500 uppercase tracking-wide block mb-1.5">
            URL de l&apos;image
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => onStateChange(currentSection, e.target.value)}
            placeholder="https://exemple.com/image.jpg"
            className="w-full p-2 text-sm border border-stone-300 rounded bg-white text-stone-900 focus:outline-none focus:border-orange-600"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500 uppercase tracking-wide block mb-1.5">
            Placer après
          </label>
          <select
            value={state[afterKey]}
            onChange={(e) => onStateChange(afterKey, e.target.value)}
            className="w-full p-2 text-sm border border-stone-300 rounded bg-white text-stone-900 focus:outline-none focus:border-orange-600"
          >
            {IMAGE_POSITIONS.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
        {value && state[afterKey] !== 'none' && (
          <div className="text-xs text-stone-500">
            Aperçu : image placée {IMAGE_POSITIONS.find(p => p.value === state[afterKey])?.label.toLowerCase()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-3 border-t border-stone-200 bg-stone-50">
      <label className="text-xs font-medium text-stone-500 uppercase tracking-wide block mb-1.5">
        {config.label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onStateChange(currentSection, e.target.value)}
        placeholder="Modifier le contenu..."
        className="w-full p-2 text-sm border border-stone-300 rounded bg-white text-stone-900 focus:outline-none focus:border-orange-600 resize-none"
        style={{ height: config.multi ? '120px' : '80px' }}
      />
      <div className="mt-2 text-xs text-stone-500">
        {value.length} caractères
        {config.multi && ` • ${value.split('\n').filter((l) => l.trim()).length} lignes`}
      </div>
    </div>
  );
}
