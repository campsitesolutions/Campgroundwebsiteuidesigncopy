import { Phone } from 'lucide-react';
import { useColorPalette } from '../../hooks/useColorPalette';
import { getContrastTextColor } from '../../utils/colorUtils';

export function TopBar() {
  const palette = useColorPalette();
  const textColor = getContrastTextColor(palette.colors.primary);
  
  return (
    <div 
      className="py-2 px-4" 
      style={{ backgroundColor: palette.colors.primary, color: textColor }}
    >
      <div className="container mx-auto flex justify-between items-center text-sm">
        <span className="font-medium">Season Open: May 1 – October 31</span>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span>(705) 555-CAMP</span>
        </div>
      </div>
    </div>
  );
}