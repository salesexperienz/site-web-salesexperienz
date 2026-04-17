import { useState } from 'react';
import JSZip from 'jszip';
import { Download, Copy, Upload, Archive } from 'lucide-react';
import { EditorState, ColorPalette, BrandSettings } from '@/lib/newsletter/types';
import { DEFAULT_BRAND } from '@/lib/newsletter/constants';
import { generateNewsletterHtml } from '@/lib/newsletter/generateHtml';

interface ExportButtonsProps {
  state: EditorState;
  colors: ColorPalette;
  brand?: BrandSettings;
  onImport: (data: Partial<EditorState>) => void;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function ExportButtons({ state, colors, brand = DEFAULT_BRAND, onImport }: ExportButtonsProps) {
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');

  const slug = state.edition.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase().slice(0, 40);

  const handleDownloadHtml = () => {
    const html = generateNewsletterHtml(state, colors, brand);
    downloadBlob(new Blob([html], { type: 'text/html' }), `newsletter-${slug}.html`);
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();
    zip.file(`newsletter-${slug}.html`, generateNewsletterHtml(state, colors, brand));
    zip.file(`newsletter-${slug}-data.json`, JSON.stringify(state, null, 2));
    const blob = await zip.generateAsync({ type: 'blob' });
    downloadBlob(blob, `newsletter-${slug}.zip`);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateNewsletterHtml(state, colors, brand));
      alert('HTML copié dans le presse-papiers !');
    } catch {
      alert('Erreur lors de la copie');
    }
  };

  const handleImportSubmit = () => {
    try {
      const parsed = JSON.parse(importText.trim());
      if (typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error();
      onImport(parsed);
      setShowImport(false);
      setImportText('');
      setImportError('');
    } catch {
      setImportError('JSON invalide — colle le JSON généré par le skill /newsletter');
    }
  };

  return (
    <>
      <div className="p-3 border-t border-stone-200 bg-stone-50 flex flex-col gap-2">
        <div className="flex gap-2">
          <button onClick={handleDownloadZip}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-900 hover:bg-blue-950 text-white rounded text-sm font-medium transition-colors">
            <Archive size={15} /> ZIP
          </button>
          <button onClick={handleDownloadHtml}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded text-sm font-medium transition-colors">
            <Download size={15} /> HTML
          </button>
          <button onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-orange-600 text-orange-600 hover:bg-orange-50 rounded text-sm font-medium transition-colors">
            <Copy size={15} /> Copier
          </button>
        </div>
        <button onClick={() => setShowImport(true)}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 border border-stone-300 text-stone-600 hover:bg-stone-100 rounded text-sm font-medium transition-colors">
          <Upload size={15} /> Importer depuis Claude
        </button>
      </div>

      {showImport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg flex flex-col gap-3 p-4">
            <h3 className="text-sm font-semibold text-stone-900">Importer depuis Claude</h3>
            <p className="text-xs text-stone-500">
              Dans ton projet Claude, utilise le skill <code className="bg-stone-100 px-1 rounded">/newsletter</code> puis colle le JSON généré ici.
            </p>
            <textarea
              value={importText}
              onChange={(e) => { setImportText(e.target.value); setImportError(''); }}
              placeholder={'{\n  "titre": "...",\n  "intro": "..."\n}'}
              className="w-full h-48 p-2 text-xs font-mono border border-stone-300 rounded resize-none focus:outline-none focus:border-orange-600"
            />
            {importError && <p className="text-xs text-red-600">{importError}</p>}
            <div className="flex gap-2 justify-end">
              <button onClick={() => { setShowImport(false); setImportText(''); setImportError(''); }}
                className="px-3 py-1.5 text-sm text-stone-600 border border-stone-300 rounded hover:bg-stone-50">
                Annuler
              </button>
              <button onClick={handleImportSubmit} disabled={!importText.trim()}
                className="px-3 py-1.5 text-sm text-white bg-orange-600 rounded hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed">
                Importer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
