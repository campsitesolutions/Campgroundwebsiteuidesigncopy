import { DollarSign, Calendar, Users } from 'lucide-react';
import { useColorPalette } from '../../hooks/useColorPalette';
import { getContrastTextColor } from '../../utils/colorUtils';

export function RatesTeaserStrip() {
  const palette = useColorPalette();
  const accentTextColor = getContrastTextColor(palette.colors.accent);
  
  return (
    <section 
      className="py-12"
      style={{ 
        backgroundColor: palette.colors.accent,
        color: accentTextColor
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <DollarSign className="w-12 h-12 mx-auto mb-3" />
            <p className="text-sm uppercase tracking-wide mb-1 opacity-80">Overnight Sites</p>
            <p className="text-3xl font-bold">$45/night</p>
            <p className="opacity-80 mt-1">Full hookup included</p>
          </div>
          <div>
            <Calendar className="w-12 h-12 mx-auto mb-3" />
            <p className="text-sm uppercase tracking-wide mb-1 opacity-80">Seasonal Sites</p>
            <p className="text-3xl font-bold">$3,200/season</p>
            <p className="opacity-80 mt-1">May 1 – October 31</p>
          </div>
          <div>
            <Users className="w-12 h-12 mx-auto mb-3" />
            <p className="text-sm uppercase tracking-wide mb-1 opacity-80">Group Rates</p>
            <p className="text-3xl font-bold">Contact Us</p>
            <p className="opacity-80 mt-1">Special pricing available</p>
          </div>
        </div>
      </div>
    </section>
  );
}