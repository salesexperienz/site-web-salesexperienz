import { SECTION_DATA, PLACEHOLDER_VALUES } from '@/lib/newsletter/constants';
import { SectionKey, EditorState } from '@/lib/newsletter/types';
import { AlertCircle } from 'lucide-react';

interface SectionListProps {
  currentSection: SectionKey | null;
  state: EditorState;
  onSelect: (key: SectionKey) => void;
}

export function SectionList({ currentSection, state, onSelect }: SectionListProps) {
  const isPlaceholder = (value: string): boolean =>
    PLACEHOLDER_VALUES.some((p) => value.includes(p));

  return (
    <div className="flex-1 overflow-y-auto">
      {Object.entries(SECTION_DATA).map(([key, config]) => {
        const value = state[key as SectionKey];
        const hasPlaceholder = value && isPlaceholder(value);
        const isActive = currentSection === key;

        return (
          <button
            key={key}
            onClick={() => onSelect(key as SectionKey)}
            className={`w-full flex items-start gap-2.5 px-3.5 py-2 border-l-4 text-left transition-colors ${
              isActive
                ? 'bg-stone-100 border-orange-600'
                : 'border-transparent hover:bg-stone-50'
            }`}
          >
            <span className="flex-shrink-0 text-xs font-medium text-white bg-orange-600 rounded px-1.5 py-0.5 min-w-[28px] text-center">
              {config.n}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-stone-900">{config.label}</div>
              <div className="text-xs text-stone-500 mt-0.5">{config.sub}</div>
            </div>
            {hasPlaceholder && (
              <AlertCircle size={16} className="flex-shrink-0 text-orange-600 mt-1" />
            )}
          </button>
        );
      })}
    </div>
  );
}
