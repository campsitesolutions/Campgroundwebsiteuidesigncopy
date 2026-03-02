import { X, Image as ImageIcon, Type, Palette, Sparkles, Loader2, Upload } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { BrandingSettings, CustomColorPalette } from '../../context/SectionContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { colorPalettes, getColorPalette } from '../../data/colorPalettes';
import { getContrastTextColor } from '../../utils/colorUtils';
import { useColorPalette } from '../../hooks/useColorPalette';
import { extractColorsFromImage } from '../../utils/colorExtractor';

interface BrandingModalProps {
  currentBranding: BrandingSettings;
  onSave: (data: BrandingSettings) => void;
  onClose: () => void;
}

export function BrandingModal({ currentBranding, onSave, onClose }: BrandingModalProps) {
  const [formData, setFormData] = useState<BrandingSettings>(currentBranding);
  const [isGeneratingColors, setIsGeneratingColors] = useState(false);
  const [colorError, setColorError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const palette = useColorPalette();
  const modalAccentTextColor = getContrastTextColor(palette.colors.accent);

  useEffect(() => {
    setFormData(currentBranding);
  }, [currentBranding]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleChange = (key: keyof BrandingSettings, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setColorError('Please upload a valid image file (PNG, JPG, SVG, etc.)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setColorError('Image file is too large. Please use an image smaller than 5MB.');
      return;
    }

    // Clear any previous errors
    setColorError(null);

    // Convert file to data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      console.log('File loaded successfully, data URL length:', dataUrl?.length);
      if (dataUrl) {
        setFormData(prev => {
          console.log('Updating formData with new logo URL');
          return { ...prev, logoUrl: dataUrl };
        });
      }
    };
    reader.onerror = () => {
      setColorError('Failed to read the image file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateFromLogo = async () => {
    if (!formData.logoUrl) {
      setColorError('Please enter a logo URL first');
      return;
    }

    setIsGeneratingColors(true);
    setColorError(null);

    try {
      const customPalette = await extractColorsFromImage(formData.logoUrl);
      setFormData(prev => ({
        ...prev,
        customPalette,
        colorPaletteId: 'custom' // Set to 'custom' to indicate custom palette is active
      }));
    } catch (error) {
      setColorError(error instanceof Error ? error.message : 'Failed to generate colors from logo');
    } finally {
      setIsGeneratingColors(false);
    }
  };

  // Use custom palette if available and selected, otherwise use prefab palette
  const selectedPalette = formData.colorPaletteId === 'custom' && formData.customPalette
    ? { id: 'custom', name: 'Custom (From Logo)', description: 'Generated from your logo', colors: formData.customPalette }
    : formData.colorPaletteId 
    ? getColorPalette(formData.colorPaletteId) 
    : colorPalettes[0];
  const accentTextColor = selectedPalette ? getContrastTextColor(selectedPalette.colors.accent) : '#FFFFFF';

  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 overflow-y-auto"
      style={{ zIndex: 9999 }}
      onClick={(e) => {
        // Close modal when clicking backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg max-w-4xl w-full my-8 relative" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white border-b border-gray-200 p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Campground Branding</h2>
              <p className="text-gray-600 mt-1">Set your logo, company name, and color scheme</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Type className="w-4 h-4 text-gray-500" />
                Campground Name
              </label>
              <input
                type="text"
                value={formData.companyName || ''}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
                placeholder="e.g., Pine Valley RV Resort"
              />
              <p className="text-xs text-gray-500 mt-1">
                This will appear in all navigation headers
              </p>
            </div>

            {/* Logo URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-gray-500" />
                Logo Image URL (Optional)
              </label>
              <input
                type="url"
                value={formData.logoUrl || ''}
                onChange={(e) => handleChange('logoUrl', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="https://example.com/logo.png"
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 For best results with color generation, use images from: <strong>Unsplash</strong>, <strong>Imgur</strong>, or your own CORS-enabled server. Recommended size: 200x60px
              </p>
            </div>

            {/* Logo Upload */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-2 border-blue-200">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-600" />
                Or Upload Logo from Your Computer (Recommended)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*"
                  id="logo-file-input"
                />
                <label
                  htmlFor="logo-file-input"
                  className="flex-1 px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg bg-white hover:bg-blue-50 transition-colors cursor-pointer flex items-center justify-center gap-2 text-blue-700 font-semibold"
                >
                  <Upload className="w-5 h-5" />
                  {formData.logoUrl && formData.logoUrl.startsWith('data:') ? 'Change Logo File' : 'Choose Logo File'}
                </label>
              </div>
              <p className="text-xs text-blue-700 mt-2 font-medium">
                ✨ Uploaded files work perfectly with color generation! No CORS issues. Max file size: 5MB.
              </p>
            </div>

            {/* Logo Preview */}
            {console.log('formData.logoUrl:', formData.logoUrl ? 'EXISTS' : 'NULL')}
            {formData.logoUrl && (
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-gray-700">Logo Preview:</p>
                  <button
                    type="button"
                    onClick={handleGenerateFromLogo}
                    disabled={isGeneratingColors}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingColors ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Generate Colors from Logo
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-white p-4 rounded border border-gray-300 inline-block">
                  <ImageWithFallback
                    src={formData.logoUrl}
                    alt="Logo preview"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                {colorError && (
                  <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 font-semibold mb-2">⚠️ Color Generation Failed</p>
                    <p className="text-sm text-red-700 whitespace-pre-line">{colorError}</p>
                  </div>
                )}
              </div>
            )}

            {/* Color Palette Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-gray-500" />
                Color Palette
              </label>
              <p className="text-xs text-gray-600 mb-3 bg-blue-50 p-2 rounded border border-blue-200">
                💡 Click any palette to preview it below. Changes apply to your layout when you click "Save Branding".
              </p>
              
              {/* Custom Palette Option (if generated) */}
              {formData.customPalette && (
                <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-900">Custom Palette (Generated from Logo)</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange('colorPaletteId', 'custom')}
                    className={`relative w-full border-2 rounded-lg p-4 transition-all hover:scale-102 ${
                      formData.colorPaletteId === 'custom' ? 'border-purple-600 ring-2 ring-purple-200 bg-white' : 'border-purple-300 hover:border-purple-400 bg-white/50'
                    }`}
                  >
                    {formData.colorPaletteId === 'custom' && (
                      <div className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        ✓
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <div className="w-12 h-12 rounded-lg border-2 border-white shadow-md" style={{ backgroundColor: formData.customPalette.primary }} />
                        <div className="w-12 h-12 rounded-lg border-2 border-white shadow-md" style={{ backgroundColor: formData.customPalette.secondary }} />
                        <div className="w-12 h-12 rounded-lg border-2 border-white shadow-md" style={{ backgroundColor: formData.customPalette.accent }} />
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600 font-mono">{formData.customPalette.primary}</p>
                        <p className="text-xs text-gray-600 font-mono">{formData.customPalette.secondary}</p>
                        <p className="text-xs text-gray-600 font-mono">{formData.customPalette.accent}</p>
                      </div>
                    </div>
                  </button>
                </div>
              )}
              
              {/* Prefab Palettes */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {colorPalettes.map((palette) => {
                  const isSelected = formData.colorPaletteId === palette.id || (!formData.colorPaletteId && palette.id === 'evergreen-reserve');
                  return (
                    <button
                      key={palette.id}
                      type="button"
                      onClick={() => handleChange('colorPaletteId', palette.id)}
                      className={`relative border-2 rounded-lg p-3 transition-all hover:scale-105 ${
                        isSelected ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          ✓
                        </div>
                      )}
                      <div className="space-y-2">
                        <div className="font-semibold text-xs text-gray-900">{palette.name}</div>
                        <div className="flex gap-1">
                          <div className="w-6 h-6 rounded" style={{ backgroundColor: palette.colors.primary }} />
                          <div className="w-6 h-6 rounded" style={{ backgroundColor: palette.colors.secondary }} />
                          <div className="w-6 h-6 rounded" style={{ backgroundColor: palette.colors.accent }} />
                        </div>
                        <div className="text-xs text-gray-500">{palette.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preview Section */}
            <div 
              className="rounded-lg p-6 border-2"
              style={{ 
                backgroundColor: selectedPalette ? selectedPalette.colors.primary : '#166534',
                borderColor: selectedPalette ? selectedPalette.colors.accent : '#f97316'
              }}
            >
              <p className="text-sm font-semibold text-white mb-4">Full Preview with Selected Colors:</p>
              
              {/* Navigation Preview */}
              <div className="bg-white rounded-lg border border-gray-300 p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {formData.logoUrl ? (
                      <ImageWithFallback
                        src={formData.logoUrl}
                        alt="Logo"
                        className="h-8 w-auto object-contain"
                      />
                    ) : (
                      <div 
                        className="w-8 h-8 rounded flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: selectedPalette?.colors.primary }}
                      >
                        {formData.companyName ? formData.companyName.charAt(0).toUpperCase() : 'C'}
                      </div>
                    )}
                    <span className="font-bold text-lg text-gray-900">
                      {formData.companyName || 'Campground Name'}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg font-semibold text-white transition-colors"
                    style={{ 
                      backgroundColor: selectedPalette?.colors.accent,
                      color: accentTextColor
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>

              {/* Content Cards Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Card 1 - Primary Color */}
                <div className="bg-white rounded-lg p-4 border-2" style={{ borderColor: selectedPalette?.colors.primary }}>
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-3"
                    style={{ backgroundColor: selectedPalette?.colors.primary }}
                  >
                    ★
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Featured Section</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Primary color used for headers and key branding elements.
                  </p>
                  <button
                    type="button"
                    className="w-full py-2 rounded-lg font-semibold transition-colors"
                    style={{ 
                      backgroundColor: selectedPalette?.colors.primary,
                      color: '#FFFFFF'
                    }}
                  >
                    Primary Button
                  </button>
                </div>

                {/* Card 2 - Secondary Color */}
                <div className="bg-white rounded-lg p-4 border-2" style={{ borderColor: selectedPalette?.colors.secondary }}>
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold mb-3"
                    style={{ 
                      backgroundColor: selectedPalette?.colors.secondary,
                      color: selectedPalette?.colors.primary 
                    }}
                  >
                    ◆
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Secondary Feature</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Secondary color for backgrounds and subtle accents.
                  </p>
                  <button
                    type="button"
                    className="w-full py-2 rounded-lg font-semibold border-2 transition-colors"
                    style={{ 
                      backgroundColor: selectedPalette?.colors.secondary,
                      borderColor: selectedPalette?.colors.primary,
                      color: selectedPalette?.colors.primary
                    }}
                  >
                    Secondary Button
                  </button>
                </div>
              </div>

              {/* CTA Banner Preview */}
              <div 
                className="mt-4 rounded-lg p-6 text-center"
                style={{ backgroundColor: selectedPalette?.colors.accent }}
              >
                <h3 
                  className="text-xl font-bold mb-2"
                  style={{ color: accentTextColor }}
                >
                  Ready to Experience Nature?
                </h3>
                <p 
                  className="mb-4 opacity-90"
                  style={{ color: accentTextColor }}
                >
                  Accent color creates high-impact CTAs and important highlights.
                </p>
                <button
                  type="button"
                  className="px-6 py-3 rounded-lg font-semibold border-2 transition-colors"
                  style={{ 
                    backgroundColor: accentTextColor === '#000000' ? '#FFFFFF' : selectedPalette?.colors.primary,
                    borderColor: accentTextColor,
                    color: accentTextColor === '#000000' ? selectedPalette?.colors.accent : '#FFFFFF'
                  }}
                >
                  Accent CTA Button
                </button>
              </div>

              {/* Color Chips */}
              <div className="mt-4 bg-white rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-700 mb-3">Color Values:</p>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <div 
                      className="w-full h-12 rounded mb-1 border border-gray-300"
                      style={{ backgroundColor: selectedPalette?.colors.primary }}
                    />
                    <p className="text-xs text-gray-600 font-mono">{selectedPalette?.colors.primary}</p>
                    <p className="text-xs text-gray-500">Primary</p>
                  </div>
                  <div>
                    <div 
                      className="w-full h-12 rounded mb-1 border border-gray-300"
                      style={{ backgroundColor: selectedPalette?.colors.secondary }}
                    />
                    <p className="text-xs text-gray-600 font-mono">{selectedPalette?.colors.secondary}</p>
                    <p className="text-xs text-gray-500">Secondary</p>
                  </div>
                  <div>
                    <div 
                      className="w-full h-12 rounded mb-1 border border-gray-300"
                      style={{ backgroundColor: selectedPalette?.colors.accent }}
                    />
                    <p className="text-xs text-gray-600 font-mono">{selectedPalette?.colors.accent}</p>
                    <p className="text-xs text-gray-500">Accent</p>
                  </div>
                </div>
              </div>
            </div>
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
                color: modalAccentTextColor
              }}
            >
              Save Branding
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}