import { Menu, Phone, MapPin, X } from 'lucide-react';
import { useState } from 'react';
import { SectionCustomization } from '../../context/SectionContext';
import { useSections } from '../../context/SectionContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useColorPalette } from '../../hooks/useColorPalette';
import { getContrastTextColor } from '../../utils/colorUtils';
import { useWizard } from '../../context/WizardContext';
import { getPrimaryCTA } from '../../utils/ctaTextMapper';

interface NavigationWithCTAProps {
  customization?: SectionCustomization;
}

export function NavigationWithCTA({ customization = {} }: NavigationWithCTAProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { branding } = useSections();
  const { wizardData } = useWizard();
  const palette = useColorPalette();
  
  // Use global branding first, then section customization, then defaults
  const companyName = branding.companyName || customization.companyName || 'Campground Name';
  const logoUrl = branding.logoUrl || customization.logoUrl;
  const tagline = customization.tagline || 'Your Nature Escape';
  const phone = customization.phone || '555-123-4567';
  
  // Get model-specific CTA text
  const ctaText = customization.ctaText || getPrimaryCTA(wizardData);

  const accentTextColor = getContrastTextColor(palette.colors.accent);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Accommodations', href: '#' },
    { label: 'Amenities', href: '#' },
    { label: 'Rates', href: '#' },
    { label: 'About', href: '#' },
  ];

  return (
    <nav style={{ backgroundColor: palette.colors.primary, color: 'white' }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            {logoUrl ? (
              <div>
                <ImageWithFallback
                  src={logoUrl}
                  alt={companyName}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
                <div className="text-sm opacity-80">{tagline}</div>
              </div>
            ) : (
              <div>
                <div className="font-bold text-2xl">
                  {companyName}
                </div>
                <div className="text-sm opacity-80">{tagline}</div>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:opacity-80 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side - CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={`tel:${phone}`}
              className="flex items-center hover:opacity-80 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-medium">{phone}</span>
            </a>
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-md font-semibold transition-colors"
              style={{ 
                backgroundColor: palette.colors.accent,
                color: accentTextColor,
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.colors.accentHover}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.colors.accent}
            >
              {ctaText}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4" style={{ borderTopWidth: '1px', borderColor: 'rgba(255,255,255,0.2)' }}>
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:opacity-80 transition-colors font-medium py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${phone}`}
                className="flex items-center hover:opacity-80 transition-colors py-2"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="font-medium">{phone}</span>
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-md font-semibold transition-colors text-center"
                style={{ 
                  backgroundColor: palette.colors.accent,
                  color: accentTextColor,
                }}
              >
                {ctaText}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}