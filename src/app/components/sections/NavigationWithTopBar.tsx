import { Menu, Phone, Mail, MapPin, Clock, X } from 'lucide-react';
import { useState } from 'react';
import { SectionCustomization } from '../../context/SectionContext';
import { useSections } from '../../context/SectionContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useColorPalette } from '../../hooks/useColorPalette';
import { getContrastTextColor } from '../../utils/colorUtils';

interface NavigationWithTopBarProps {
  customization?: SectionCustomization;
}

export function NavigationWithTopBar({ customization = {} }: NavigationWithTopBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { branding } = useSections();
  const palette = useColorPalette();
  
  // Use global branding first, then section customization, then defaults
  const companyName = branding.companyName || customization.companyName || 'Campground Name';
  const logoUrl = branding.logoUrl || customization.logoUrl;
  const address = customization.address || '123 Nature Lane, Forest City, ST 12345';
  const hours = customization.hours || 'Open Year-Round';
  const phone = customization.phone || '555-123-4567';
  const email = customization.email || 'info@campground.com';
  const ctaText = customization.ctaText || 'Reserve Your Spot';

  const accentTextColor = getContrastTextColor(palette.colors.accent);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'RV Sites', href: '#' },
    { label: 'Cabins', href: '#' },
    { label: 'Amenities', href: '#' },
    { label: 'Activities', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <nav>
      {/* Top Bar with Info */}
      <div style={{ backgroundColor: palette.colors.primaryDark, color: 'white' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1.5" />
                <span>{hours}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href={`tel:${phone}`} className="flex items-center hover:opacity-80 transition-colors">
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                <span>{phone}</span>
              </a>
              <a href={`mailto:${email}`} className="hidden sm:flex items-center hover:opacity-80 transition-colors">
                <Mail className="w-3.5 h-3.5 mr-1.5" />
                <span>{email}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              {logoUrl ? (
                <ImageWithFallback
                  src={logoUrl}
                  alt={companyName}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <div className="font-bold text-2xl" style={{ color: palette.colors.primary }}>
                  {companyName}
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-colors font-medium"
                  style={{ color: palette.colors.text }}
                  onMouseEnter={(e) => e.currentTarget.style.color = palette.colors.primary}
                  onMouseLeave={(e) => e.currentTarget.style.color = palette.colors.text}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Side - CTA Button */}
            <div className="hidden lg:block">
              <a
                href="#reserve"
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
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              style={{ color: palette.colors.text }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="transition-colors font-medium py-2"
                    style={{ color: palette.colors.text }}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#reserve"
                  className="px-6 py-3 rounded-md font-semibold transition-colors text-center mt-2"
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
      </div>
    </nav>
  );
}