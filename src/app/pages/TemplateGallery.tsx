import { Header } from '../components/layout/Header';
import { Footer } from '../components/sections/Footer';
import { templates } from '../data/templates';
import { Link } from 'react-router';
import { ArrowRight, Monitor, Smartphone } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useColorPalette } from '../hooks/useColorPalette';
import { getContrastTextColor } from '../utils/colorUtils';

export function TemplateGallery() {
  const palette = useColorPalette();
  const accentTextColor = getContrastTextColor(palette.colors.accent);
  const primaryTextColor = getContrastTextColor(palette.colors.primary);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section 
          className="text-white py-20 relative"
        >
          <div className="absolute inset-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1692469487396-b2094bfe4689?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
              alt="Campground Overview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#2C3E50]/90 via-[#2C3E50]/80 to-[#2C3E50]/70"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Welcome to CampSite Solutions Showroom
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white">
              Explore professional campground website templates designed specifically for Ontario parks. 
              Choose a template, customize sections, and get started in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/wizard"
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all inline-flex items-center justify-center gap-2 shadow-lg"
              >
                Start Quick Setup Wizard
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/library"
                className="bg-white hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors inline-flex items-center justify-center gap-2 text-[#2C3E50]"
              >
                Browse Section Library
              </Link>
            </div>
            <p className="text-sm text-white/80 mt-4">
              ✨ New! Complete our 2-minute wizard to get personalized recommendations
            </p>
          </div>
        </section>

        {/* Templates Grid */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Template</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Each template is optimized for specific campground business models. Preview them below.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-200 flex flex-col"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                    <ImageWithFallback
                      src={
                        template.id === 'seasonal' ? 'https://images.unsplash.com/photo-1601662408847-2b3f79efb76c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' :
                        template.id === 'overnight' ? 'https://images.unsplash.com/photo-1761010785765-7c9ccb8a44b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600' :
                        'https://images.unsplash.com/photo-1692469487396-b2094bfe4689?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600'
                      }
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span 
                        className="bg-white px-3 py-1 rounded-full text-sm font-bold"
                        style={{ color: palette.colors.accent }}
                      >
                        {template.primaryModel.charAt(0).toUpperCase() + template.primaryModel.slice(1)} Focus
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-2xl font-bold mb-3">{template.name}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{template.description}</p>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Includes {template.sections.length} sections
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {template.sections.slice(0, 3).map((sectionId) => (
                          <span
                            key={sectionId}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                          >
                            {sectionId.replace(/-/g, ' ')}
                          </span>
                        ))}
                        {template.sections.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            +{template.sections.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/t/${template.slug}`}
                        className="flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-[#2C3E50]"
                        style={{ 
                          backgroundColor: palette.colors.accent
                        }}
                      >
                        <Monitor className="w-4 h-4" />
                        View Template
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to Customize?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Browse our section library to mix and match components, then build your custom layout.
            </p>
            <Link
              to="/library"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-colors text-[#2C3E50]"
              style={{ 
                backgroundColor: palette.colors.accent
              }}
            >
              Explore Section Library
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}