import { X, Image as ImageIcon, Type } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SectionCustomization } from '../../context/SectionContext';
import { useColorPalette } from '../../hooks/useColorPalette';
import { getContrastTextColor } from '../../utils/colorUtils';

interface EditSectionModalProps {
  sectionId: string;
  sectionName: string;
  currentCustomization: SectionCustomization;
  onSave: (data: SectionCustomization) => void;
  onClose: () => void;
}

// Define editable fields for each section type
const sectionFields: { [key: string]: { label: string; key: string; type: 'text' | 'textarea' | 'url' }[] } = {
  'hero': [
    { label: 'Headline', key: 'headline', type: 'text' },
    { label: 'Subheadline', key: 'subheadline', type: 'text' },
    { label: 'Button Text', key: 'buttonText', type: 'text' },
    { label: 'Background Image URL', key: 'backgroundImage', type: 'url' },
  ],
  'hero-weather': [
    { label: 'Headline', key: 'headline', type: 'text' },
    { label: 'Subheadline', key: 'subheadline', type: 'text' },
    { label: 'Button Text', key: 'buttonText', type: 'text' },
    { label: 'Background Image URL', key: 'backgroundImage', type: 'url' },
  ],
  'cta-banner': [
    { label: 'Headline', key: 'headline', type: 'text' },
    { label: 'Description', key: 'description', type: 'text' },
    { label: 'Button Text', key: 'buttonText', type: 'text' },
    { label: 'Background Image URL', key: 'backgroundImage', type: 'url' },
  ],
  'seasonal-benefits': [
    { label: 'Headline', key: 'headline', type: 'text' },
    { label: 'Description', key: 'description', type: 'textarea' },
    { label: 'Image URL', key: 'imageUrl', type: 'url' },
  ],
  'gallery-grid': [
    { label: 'Image 1 URL', key: 'image1', type: 'url' },
    { label: 'Image 2 URL', key: 'image2', type: 'url' },
    { label: 'Image 3 URL', key: 'image3', type: 'url' },
    { label: 'Image 4 URL', key: 'image4', type: 'url' },
    { label: 'Image 5 URL', key: 'image5', type: 'url' },
    { label: 'Image 6 URL', key: 'image6', type: 'url' },
    { label: 'Image 7 URL', key: 'image7', type: 'url' },
    { label: 'Image 8 URL', key: 'image8', type: 'url' },
  ],
  'nav-centered': [
    { label: 'Company Name', key: 'companyName', type: 'text' },
    { label: 'Phone Number', key: 'phone', type: 'text' },
  ],
  'nav-with-cta': [
    { label: 'Company Name', key: 'companyName', type: 'text' },
    { label: 'Tagline', key: 'tagline', type: 'text' },
    { label: 'Phone Number', key: 'phone', type: 'text' },
    { label: 'CTA Button Text', key: 'ctaText', type: 'text' },
  ],
  'nav-with-topbar': [
    { label: 'Company Name', key: 'companyName', type: 'text' },
    { label: 'Address', key: 'address', type: 'text' },
    { label: 'Hours', key: 'hours', type: 'text' },
    { label: 'Phone Number', key: 'phone', type: 'text' },
    { label: 'Email', key: 'email', type: 'text' },
    { label: 'CTA Button Text', key: 'ctaText', type: 'text' },
  ],
};

export function EditSectionModal({ sectionId, sectionName, currentCustomization, onSave, onClose }: EditSectionModalProps) {
  const fields = sectionFields[sectionId] || [];
  const [formData, setFormData] = useState<SectionCustomization>(currentCustomization);
  const palette = useColorPalette();
  const accentTextColor = getContrastTextColor(palette.colors.accent);

  useEffect(() => {
    setFormData(currentCustomization);
  }, [currentCustomization]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  if (fields.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Edit Section</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            This section doesn't have customizable fields yet. More editing options coming soon!
          </p>
          <button
            onClick={onClose}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-2xl w-full my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Edit Section</h2>
              <p className="text-gray-600 mt-1">{sectionName}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {fields.map(field => (
              <div key={field.key}>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  {field.type === 'url' ? (
                    <ImageIcon className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Type className="w-4 h-4 text-gray-500" />
                  )}
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    rows={4}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                ) : (
                  <input
                    type={field.type === 'url' ? 'url' : 'text'}
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder={
                      field.type === 'url'
                        ? 'https://example.com/image.jpg or https://images.unsplash.com/...'
                        : `Enter ${field.label.toLowerCase()}`
                    }
                  />
                )}
                {field.type === 'url' && (
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Tip: Use <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Unsplash</a> for free high-quality images
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-lg font-semibold transition-colors"
              style={{ 
                backgroundColor: palette.colors.accent,
                color: accentTextColor
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}