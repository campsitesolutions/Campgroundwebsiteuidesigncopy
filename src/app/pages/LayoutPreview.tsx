import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { sections } from '../data/sections';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface PreviewData {
  sectionIds: string[];
  branding: {
    companyName: string;
    logoUrl?: string;
  };
  paletteColors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  contactInfo: {
    parkName: string;
    contactName: string;
    email: string;
    phone?: string;
    website?: string;
    primaryModel: string;
    notes?: string;
  };
  timestamp: number;
}

export function LayoutPreview() {
  const { id } = useParams();
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (id) {
      const stored = localStorage.getItem(`campsite_preview_${id}`);
      if (stored) {
        setPreviewData(JSON.parse(stored));
      } else {
        setNotFound(true);
      }
    }
  }, [id]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Preview Not Found</h1>
          <p className="text-gray-600 mb-6">
            This preview link may have expired or doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#2C3E50] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a252f] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!previewData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E8D5B5] border-t-[#2C3E50] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  const selectedSectionData = previewData.sectionIds
    .map(id => sections.find(s => s.id === id))
    .filter(Boolean) as typeof sections;

  const { branding, paletteColors, contactInfo } = previewData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#2C3E50] text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{contactInfo.parkName}</h1>
              <p className="text-[#E8D5B5] text-sm">Custom Website Layout Preview</p>
            </div>
            <Link
              to="/"
              className="bg-[#E8D5B5] text-[#2C3E50] px-4 py-2 rounded-lg font-semibold hover:bg-[#D4C5A5] transition-colors text-sm"
            >
              CampSite Solutions
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Contact Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Lead Submitted Successfully
              </h2>
              <p className="text-gray-600">
                This is the custom layout designed for {contactInfo.parkName}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 bg-gray-50 rounded-lg p-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Contact Name</p>
              <p className="font-semibold text-gray-900">{contactInfo.contactName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Email</p>
              <p className="font-semibold text-gray-900">{contactInfo.email}</p>
            </div>
            {contactInfo.phone && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <p className="font-semibold text-gray-900">{contactInfo.phone}</p>
              </div>
            )}
            {contactInfo.website && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Website</p>
                <p className="font-semibold text-gray-900">{contactInfo.website}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600 mb-1">Business Model</p>
              <p className="font-semibold text-gray-900 capitalize">{contactInfo.primaryModel}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Sections Selected</p>
              <p className="font-semibold text-gray-900">{selectedSectionData.length} sections</p>
            </div>
          </div>

          {contactInfo.notes && (
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">Additional Notes</p>
              <p className="text-gray-900 bg-gray-50 rounded-lg p-4 whitespace-pre-wrap">
                {contactInfo.notes}
              </p>
            </div>
          )}
        </div>

        {/* Layout Preview */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Branding Header */}
          <div 
            className="py-12 px-8 text-center text-white"
            style={{ backgroundColor: paletteColors.primary }}
          >
            <h2 className="text-3xl font-bold mb-2">
              {branding.companyName || contactInfo.parkName}
            </h2>
            <p className="text-white/80">Custom Website Layout</p>
          </div>

          {/* Section List */}
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Layout Structure ({selectedSectionData.length} sections)
            </h3>

            <div className="space-y-3">
              {selectedSectionData.map((section, index) => (
                <div
                  key={section.id}
                  className="flex items-center gap-4 p-4 rounded-lg border-l-4 transition-all hover:shadow-md"
                  style={{
                    backgroundColor: index % 2 === 0 ? '#f9fafb' : '#ffffff',
                    borderLeftColor: paletteColors.accent,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ backgroundColor: paletteColors.primary }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{section.name}</h4>
                    <p className="text-sm text-gray-600">{section.description}</p>
                  </div>
                  <div className="hidden sm:flex flex-wrap gap-2">
                    {section.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className="py-6 px-8 text-center"
            style={{ backgroundColor: paletteColors.secondary }}
          >
            <p className="text-gray-600 text-sm">
              Built with CampSite Solutions
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Ready to bring this vision to life?
          </p>
          <Link
            to="/"
            className="inline-block bg-[#2C3E50] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1a252f] transition-colors"
          >
            Explore More Templates
          </Link>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            Preview generated on {new Date(previewData.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
