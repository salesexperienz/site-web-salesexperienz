'use client'
import { useState, useEffect } from 'react';
import { EditorState, SectionKey, ColorPalette, BrandSettings } from '@/lib/newsletter/types';
import { loadState, saveState, loadColors, saveColors, loadBrand, saveBrand } from '@/lib/newsletter/utils';
import { DEFAULT_COLORS, DEFAULT_BRAND } from '@/lib/newsletter/constants';
import { EditorHeader } from './EditorHeader';
import { SectionList } from './SectionList';
import { Editor } from './Editor';
import { ExportButtons } from './ExportButtons';
import { Preview } from './Preview';
import { BrandPanel } from './BrandPanel';

export function EditorApp() {
  const [state, setState]               = useState<EditorState>(loadState);
  const [colors, setColors]             = useState<ColorPalette>(loadColors);
  const [brand, setBrand]               = useState<BrandSettings>(loadBrand);
  const [currentSection, setCurrentSection] = useState<SectionKey | null>(null);
  const [activeTab, setActiveTab]       = useState<'content' | 'brand'>('content');
  const [isMobile, setIsMobile]         = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [saved, setSaved]               = useState(true);

  useEffect(() => { saveState(state); }, [state]);
  useEffect(() => { saveColors(colors); }, [colors]);
  useEffect(() => { saveBrand(brand); }, [brand]);

  useEffect(() => {
    const check = () => setIsSmallScreen(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleStateChange = (key: SectionKey, value: string) => {
    setState((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };
  const handleImport = (data: Partial<EditorState>) => {
    setState((prev) => ({ ...prev, ...data }));
    setSaved(false);
  };
  const handleColorChange = (colorKey: keyof ColorPalette, value: string) =>
    setColors((prev) => ({ ...prev, [colorKey]: value }));
  const handleBrandChange = (updates: Partial<BrandSettings>) =>
    setBrand((prev) => ({ ...prev, ...updates }));
  const handleResetColors = () => setColors(DEFAULT_COLORS);
  const handleResetAll    = () => { setColors(DEFAULT_COLORS); setBrand(DEFAULT_BRAND); };

  return (
    <div
      className={`bg-stone-50 ${isSmallScreen ? 'flex flex-col' : 'flex'}`}
      style={isSmallScreen ? undefined : { height: 'calc(100vh - 64px)' }}
    >

      {/* Colonne gauche */}
      <div className={`border-stone-200 bg-white flex flex-col ${isSmallScreen ? 'w-full border-b' : 'w-80 min-w-[280px] border-r overflow-hidden'}`}>
        <EditorHeader state={state} />

        {/* Onglets */}
        <div className="flex border-b border-stone-200 flex-shrink-0">
          <button onClick={() => setActiveTab('content')}
            className={`flex-1 py-2 text-xs font-medium transition-colors ${
              activeTab === 'content'
                ? 'text-orange-600 border-b-2 border-orange-600 bg-white'
                : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
            }`}>
            Contenu
          </button>
          <button onClick={() => setActiveTab('brand')}
            className={`flex-1 py-2 text-xs font-medium transition-colors ${
              activeTab === 'brand'
                ? 'text-orange-600 border-b-2 border-orange-600 bg-white'
                : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
            }`}>
            Charte graphique
          </button>
        </div>

        {activeTab === 'content' ? (
          <>
            <SectionList currentSection={currentSection} state={state} onSelect={setCurrentSection} />
            <Editor currentSection={currentSection} state={state} colors={colors}
              onStateChange={handleStateChange} onColorChange={handleColorChange} />
          </>
        ) : (
          <BrandPanel brand={brand} colors={colors} onBrandChange={handleBrandChange}
            onColorChange={handleColorChange} onResetColors={handleResetColors} onResetAll={handleResetAll} />
        )}

        <ExportButtons state={state} colors={colors} brand={brand} onImport={handleImport} />
        <div className="px-3 py-2 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-2 flex-shrink-0">
          <span className="text-xs text-stone-500">
            {saved ? 'Toutes les modifications sont enregistrées.' : 'Modifications non enregistrées.'}
          </span>
          <button
            onClick={() => { saveState(state); setSaved(true); }}
            disabled={saved}
            className={`text-xs px-3 py-1.5 rounded font-medium transition-colors whitespace-nowrap ${
              saved
                ? 'bg-stone-200 text-stone-400 cursor-default'
                : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
          >
            {saved ? 'Enregistré ✓' : 'Enregistrer'}
          </button>
        </div>
      </div>

      {/* Prévisualisation */}
      <div className={`flex flex-col overflow-hidden ${isSmallScreen ? 'w-full' : 'flex-1'}`}
        style={isSmallScreen ? { height: '60vh' } : undefined}
      >
        <div className="px-3 py-2 border-b border-stone-200 bg-white flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-stone-600 font-medium">
            Prévisualisation {isSmallScreen && <span className="text-stone-400 font-normal">↓ fais défiler pour voir</span>}
          </span>
          {!isSmallScreen && (
            <button onClick={() => setIsMobile(!isMobile)}
              className="text-xs px-3 py-1.5 rounded bg-orange-600 hover:bg-orange-700 text-white font-medium transition-colors">
              {isMobile ? 'Vue desktop' : 'Vue mobile'}
            </button>
          )}
        </div>
        <Preview state={state} colors={colors} brand={brand} isMobile={isSmallScreen || isMobile} />
      </div>

    </div>
  );
}
