import { Check } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useWizard, getAllowedModels } from '../../context/WizardContext';
import { useColorPalette } from '../../hooks/useColorPalette';
import { getContrastTextColor } from '../../utils/colorUtils';

interface TrailerSalesHighlightProps {
  headline?: string;
  description?: string;
  highlights?: string[];
  ctaText?: string;
  image?: string;
}

export function TrailerSalesHighlight(props: TrailerSalesHighlightProps) {
  const { wizardData } = useWizard();
  const palette = useColorPalette();
  
  // Compute allowed models using helper
  const allowedModels = getAllowedModels(wizardData);
  
  console.log('🔍 TrailerSalesHighlight - allowedModels:', Array.from(allowedModels));
  
  // Only render if BOTH seasonal AND trailer-sales are selected
  const shouldRender = allowedModels.has('seasonal') && allowedModels.has('trailer-sales');
  
  console.log('🔍 TrailerSalesHighlight - shouldRender:', shouldRender);
  
  if (!shouldRender) {
    return null;
  }
  
  const headline = props.headline || 'Find Your Perfect Trailer';
  const description = props.description || 
    'Ready to make the park your permanent home? Browse our selection of premium park model trailers and RVs available for purchase. Own your getaway and enjoy hassle-free seasonal living.';
  
  const highlights = props.highlights || [
    'Quality pre-owned and new park models available',
    'On-site delivery and setup included',
    'Financing options and trade-ins accepted'
  ];
  
  const ctaText = props.ctaText || 'View Available Trailers';
  const image = props.image || 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200';
  
  const accentTextColor = getContrastTextColor(palette.colors.accent);

  return (
    <section className="py-16" style={{ backgroundColor: palette.colors.background }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Content */}
          <div>
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
          
          {/* Right: Image */}
          <div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src={image}
                alt="Park model trailers for sale"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}