import { useSections } from '../context/SectionContext';
import { getColorPalette, colorPalettes } from '../data/colorPalettes';

export function useColorPalette() {
  const { branding } = useSections();
  
  // If custom palette is selected and exists, use it
  if (branding.colorPaletteId === 'custom' && branding.customPalette) {
    return {
      id: 'custom',
      name: 'Custom (From Logo)',
      description: 'Generated from your logo',
      colors: branding.customPalette
    };
  }
  
  // Otherwise use prefab palette
  const paletteId = branding.colorPaletteId || 'evergreen-reserve';
  const palette = getColorPalette(paletteId) || colorPalettes[0];
  
  return palette;
}