import { Menu, Phone, Mail, X } from 'lucide-react';
import { useState } from 'react';
import { SectionCustomization } from '../../context/SectionContext';
import { useSections } from '../../context/SectionContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useColorPalette } from '../../hooks/useColorPalette';

interface NavigationCenteredProps {
  customization?: SectionCustomization;
}

export function NavigationCentered({ customization = {} }: NavigationCenteredProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { branding } = useSections();
  const palette = useColorPalette();
  
  // Use global branding first, then section customization, then defaults
  const companyName = branding.companyName || customization.companyName || 'Campground Name';
  const logoUrl = branding.logoUrl || customization.logoUrl;
  const phone = customization.phone || '555-123-4567';

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Accommodations', href: '#' },
    { label: 'Amenities', href: '#' },
    { label: 'Rates', href: '#' },
    { label: 'Gallery', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
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

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
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

          {/* Right Side - Contact Info */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href={`tel:${phone}`} 
              className="flex items-center transition-colors"
              style={{ color: palette.colors.text }}
              onMouseEnter={(e) => e.currentTarget.style.color = palette.colors.primary}
              onMouseLeave={(e) => e.currentTarget.style.color = palette.colors.text}
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-medium">{phone}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            style={{ color: palette.colors.text }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
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
                href={`tel:${phone}`}
                className="flex items-center transition-colors py-2"
                style={{ color: palette.colors.text }}
              >
                <Phone className="w-4 h-4 mr-2" />
                <span className="font-medium">{phone}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}