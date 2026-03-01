import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useColorPalette } from '../../hooks/useColorPalette';
import { getContrastTextColor } from '../../utils/colorUtils';

export function ContactSection() {
  const palette = useColorPalette();
  const accentTextColor = getContrastTextColor(palette.colors.accent);

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or ready to book? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="font-bold text-2xl mb-6">Send Us a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': palette.colors.primary } as React.CSSProperties}
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': palette.colors.primary } as React.CSSProperties}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': palette.colors.primary } as React.CSSProperties}
                  placeholder="(705) 555-0123"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': palette.colors.primary } as React.CSSProperties}
                  placeholder="Tell us about your camping needs..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: palette.colors.accent,
                  color: accentTextColor
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.colors.accentHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = palette.colors.accent}
              >
                Send Message
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-2xl mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${palette.colors.accent}33` }}
                  >
                    <Phone className="w-6 h-6" style={{ color: palette.colors.primary }} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Phone</p>
                    <p className="text-gray-600">(705) 555-CAMP (2267)</p>
                    <p className="text-sm text-gray-500">Mon-Fri: 9am-6pm</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${palette.colors.accent}33` }}
                  >
                    <Mail className="w-6 h-6" style={{ color: palette.colors.primary }} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <p className="text-gray-600">info@examplecampground.ca</p>
                    <p className="text-sm text-gray-500">We reply within 24 hours</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${palette.colors.accent}33` }}
                  >
                    <MapPin className="w-6 h-6" style={{ color: palette.colors.primary }} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Address</p>
                    <p className="text-gray-600">
                      123 Campground Road
                      <br />
                      Huntsville, ON P1H 1A1
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div 
              className="rounded-xl p-6 border"
              style={{ 
                backgroundColor: `${palette.colors.accent}22`,
                borderColor: `${palette.colors.accent}44`
              }}
            >
              <h4 className="font-bold text-lg mb-2">Park Hours</h4>
              <p className="text-gray-700 mb-4">
                <strong>Season:</strong> May 1 – October 31
              </p>
              <p className="text-gray-700">
                <strong>Office Hours:</strong>
                <br />
                Monday – Friday: 9:00 AM – 6:00 PM
                <br />
                Saturday – Sunday: 10:00 AM – 4:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}