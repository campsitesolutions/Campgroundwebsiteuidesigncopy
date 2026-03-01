import { Tent, Facebook, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router';
import { useColorPalette } from '../../hooks/useColorPalette';
import { useSections } from '../../context/SectionContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Footer() {
  const palette = useColorPalette();
  const { branding } = useSections();
  const companyName = branding.companyName || 'Pine Valley Camp';
  const logoUrl = branding.logoUrl;

  return (
    <footer className="text-white" style={{ backgroundColor: palette.colors.primaryDark }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              {logoUrl ? (
                <ImageWithFallback
                  src={logoUrl}
                  alt={companyName}
                  className="h-8 w-auto object-contain brightness-0 invert"
                />
              ) : (
                <>
                  <Tent className="w-6 h-6" />
                  <span>{companyName}</span>
                </>
              )}
            </div>
            <p className="text-sm mb-4 text-white/80">
              Your premier Ontario campground destination for seasonal sites, overnight camping, and trailer sales.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors text-white"
                style={{ backgroundColor: palette.colors.primary }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.colors.accent}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.colors.primary}
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors text-white"
                style={{ backgroundColor: palette.colors.primary }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.colors.accent}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.colors.primary}
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors text-white"
                style={{ backgroundColor: palette.colors.primary }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.colors.accent}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.colors.primary}
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Site Map</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Amenities</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Events Calendar</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Photo Gallery</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Overnight Camping</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Seasonal Sites</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Trailers for Sale</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Cottage Rentals</a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">Group Bookings</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>123 Campground Road</li>
              <li>Huntsville, ON P1H 1A1</li>
              <li className="pt-2">
                <a href="tel:7055552267" className="hover:text-white transition-colors">
                  (705) 555-CAMP
                </a>
              </li>
              <li>
                <a href="mailto:info@example.ca" className="hover:text-white transition-colors">
                  info@examplecamp.ca
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/80" style={{ borderTop: `1px solid ${palette.colors.primary}` }}>
          <p>© 2026 {companyName}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cancellation Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}