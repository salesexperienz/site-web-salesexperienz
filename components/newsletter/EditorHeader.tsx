import { EditorState } from '@/lib/newsletter/types';
import { countFilledSections } from '@/lib/newsletter/utils';

interface EditorHeaderProps {
  state: EditorState;
}

export function EditorHeader({ state }: EditorHeaderProps) {
  const filled = countFilledSections(state);
  const total = Object.keys(state).length;
  const percentage = Math.round((filled / total) * 100);

  return (
    <div className="p-3.5 border-b border-stone-200 bg-white">
      <h2 className="text-sm font-medium text-stone-900 mb-1">Éditeur de newsletter</h2>
      <p className="text-xs text-stone-600 mb-2">Clique une section → modifie → applique</p>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange-600 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs font-medium text-stone-600 whitespace-nowrap">
          {filled}/{total}
        </span>
      </div>
    </div>
  );
}
