import { EditorState, ColorPalette, BrandSettings } from '@/lib/newsletter/types';
import { DEFAULT_BRAND } from '@/lib/newsletter/constants';
import { generateNewsletterBody } from '@/lib/newsletter/generateHtml';

interface PreviewProps {
  state: EditorState;
  colors: ColorPalette;
  brand?: BrandSettings;
  isMobile: boolean;
}

export function Preview({ state, colors, brand = DEFAULT_BRAND, isMobile }: PreviewProps) {
  const html = generateNewsletterBody(state, colors, brand);

  return (
    <div className="flex-1 min-h-0 bg-stone-100 overflow-y-auto">
      <div className={`flex flex-col items-center ${isMobile ? 'p-5' : 'p-3'}`}>
        <div
          className={`w-full transition-all duration-250 bg-white rounded-lg overflow-hidden shadow-lg ${
            isMobile ? 'max-w-[390px]' : 'max-w-[640px]'
          }`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
