import { Check } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useWizard } from '../../context/WizardContext';
import { useColorPalette } from '../../hooks/useColorPalette';
import { getContrastTextColor } from '../../utils/colorUtils';

interface OvernightExperienceHighlightProps {
  headline?: string;
  description?: string;
  highlights?: string[];
  ctaText?: string;
  image?: string;
}

export function OvernightExperienceHighlight(props: OvernightExperienceHighlightProps) {
  const { wizardData } = useWizard();
  const palette = useColorPalette();
  
  // Check if both seasonal and overnight are selected
  const allowedModels = new Set<string>();
  if (wizardData.primaryBusinessModel) {
    allowedModels.add(wizardData.primaryBusinessModel);
  }
  wizardData.secondaryBusinessModels.forEach(model => allowedModels.add(model));
  
  // Only render if BOTH seasonal AND overnight are selected
  const shouldRender = allowedModels.has('seasonal') && allowedModels.has('overnight');
  
  if (!shouldRender) {
    return null;
  }
  
  const headline = props.headline || 'Weekend Camping Made Easy';
  const description = props.description || 
    'Not ready for a full seasonal commitment? Test the waters with our flexible overnight camping options. Perfect for weekend getaways, special occasions, or trying out the park before booking a seasonal site.';
  
  const highlights = props.highlights || [
    'Full hookup sites available for short stays',
    'Access to all seasonal amenities and facilities',
    'Easy online booking for last-minute trips'
  ];
  
  const ctaText = props.ctaText || 'Book Overnight Stay';
  const image = props.image || 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200';
  
  const accentTextColor = getContrastTextColor(palette.colors.accent);

  return (
    <section className="py-16" style={{ backgroundColor: palette.colors.background }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Image */}
          <div className="order-2 md:order-1">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src={image}
                alt="Overnight camping experience"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
          
          {/* Right: Content */}
          <div className="order-1 md:order-2">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: palette.colors.text }}
            >
              {headline}
            </h2>
            
            <p 
              className="text-lg mb-6"
              style={{ color: palette.colors.textMuted }}
            >
              {description}
            </p>
            
            {/* Bullet Highlights */}
            <ul className="space-y-3 mb-8">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div 
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: palette.colors.accent }}
                  >
                    <Check className="w-4 h-4" style={{ color: accentTextColor }} />
                  </div>
                  <span 
                    className="text-lg"
                    style={{ color: palette.colors.text }}
                  >
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
            
            {/* CTA Button */}
            <button
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
              style={{ 
                backgroundColor: palette.colors.accent,
                color: accentTextColor
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = palette.colors.accentHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = palette.colors.accent;
              }}
            >
              {ctaText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
