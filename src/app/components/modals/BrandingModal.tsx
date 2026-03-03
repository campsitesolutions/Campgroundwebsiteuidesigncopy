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
      <div className="bg-white rounded-xl max-w-5xl w-full my-8 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white border-b border-gray-200 p-10 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Campground Branding</h2>
              <p className="text-gray-600 mt-3 text-lg">Customize your park's identity and visual style</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-10">
          <div className="space-y-10">
            {/* Company Name */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Type className="w-5 h-5 text-gray-400" />
                Campground Name
              </label>
              <input
                type="text"
                value={formData.companyName || ''}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
                placeholder="e.g., Pine Valley RV Resort"
              />
              <p className="text-sm text-gray-500 mt-2">
                This will appear in all navigation headers
              </p>
            </div>

            {/* Logo URL */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-gray-400" />
                Logo Image URL (Optional)
              </label>
              <input
                type="url"
                value={formData.logoUrl || ''}
                onChange={(e) => handleChange('logoUrl', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="https://example.com/logo.png"
              />
              <p className="text-sm text-gray-500 mt-2">
                💡 For best results with color generation, use images from: <strong>Unsplash</strong>, <strong>Imgur</strong>, or your own CORS-enabled server. Recommended size: 200x60px
              </p>
            </div>

            {/* Logo Upload */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
              <label className="block text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
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
              <p className="text-sm text-blue-700 mt-3 font-medium">
                ✨ Uploaded files work perfectly with color generation! No CORS issues. Max file size: 5MB.
              </p>
            </div>

            {/* Logo Preview */}
            {console.log('formData.logoUrl:', formData.logoUrl ? 'EXISTS' : 'NULL')}
            {formData.logoUrl && (
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-base font-semibold text-gray-900">Logo Preview:</p>
                  <button
                    type="button"
                    onClick={handleGenerateFromLogo}
                    disabled={isGeneratingColors}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
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
                <div className="bg-white p-6 rounded-lg border border-gray-300 inline-block">
                  <ImageWithFallback
                    src={formData.logoUrl}
                    alt="Logo preview"
                    className="h-12 w-auto object-contain"
                  />
                </div>
                {colorError && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800 font-semibold mb-2">⚠️ Color Generation Failed</p>
                    <p className="text-sm text-red-700 whitespace-pre-line">{colorError}</p>
                  </div>
                )}
              </div>
            )}

            {/* Color Palette Selection */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Palette className="w-5 h-5 text-gray-400" />
                Color Palette
              </label>
              <p className="text-gray-600 mb-6 text-base">
                Choose the atmosphere you want your park to convey.
              </p>
              
              {/* Custom Palette Option (if generated) */}
              {formData.customPalette && (
                <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-300 rounded-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <span className="font-semibold text-purple-900 text-base">Custom Palette (Generated from Logo)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange('colorPaletteId', 'custom')}
                    className={`relative w-full rounded-xl overflow-hidden transition-all duration-300 ${
                      formData.colorPaletteId === 'custom' 
                        ? 'shadow-lg ring-2 ring-purple-400' 
                        : 'shadow-sm hover:shadow-md'
                    }`}
                    style={{
                      backgroundColor: formData.colorPaletteId === 'custom' 
                        ? `${formData.customPalette.primary}08` 
                        : '#FFFFFF'
                    }}
                  >
                    {/* Primary color strip at top */}
                    <div 
                      className="w-full h-12" 
                      style={{ backgroundColor: formData.customPalette.primary }}
                    />
                    
                    {/* Content */}
                    <div className="p-6 bg-white/90">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-3">
                          <div 
                            className="w-5 h-5 rounded-full shadow-inner" 
                            style={{ 
                              backgroundColor: formData.customPalette.primary,
                              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                            }} 
                          />
                          <div 
                            className="w-5 h-5 rounded-full shadow-inner" 
                            style={{ 
                              backgroundColor: formData.customPalette.secondary,
                              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                            }} 
                          />
                          <div 
                            className="w-5 h-5 rounded-full shadow-inner" 
                            style={{ 
                              backgroundColor: formData.customPalette.accent,
                              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                            }} 
                          />
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-600 font-mono">{formData.customPalette.primary}</p>
                          <p className="text-xs text-gray-600 font-mono">{formData.customPalette.secondary}</p>
                          <p className="text-xs text-gray-600 font-mono">{formData.customPalette.accent}</p>
                        </div>
                      </div>
                    </div>

                    {/* Check indicator */}
                    {formData.colorPaletteId === 'custom' && (
                      <div className="absolute top-3 right-3 bg-purple-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold shadow-lg">
                        ✓
                      </div>
                    )}
                  </button>
                </div>
              )}
              
              {/* Prefab Palettes */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {colorPalettes.map((palette) => {
                  const isSelected = formData.colorPaletteId === palette.id || (!formData.colorPaletteId && palette.id === 'evergreen-reserve');
                  return (
                    <button
                      key={palette.id}
                      type="button"
                      onClick={() => handleChange('colorPaletteId', palette.id)}
                      className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                        isSelected 
                          ? 'shadow-xl ring-3 ring-offset-2 scale-[1.02]' 
                          : 'shadow-sm hover:shadow-md'
                      }`}
                      style={{
                        backgroundColor: isSelected 
                          ? `${palette.colors.primary}08` 
                          : '#FFFFFF',
                        ringColor: isSelected ? palette.colors.primary : 'transparent',
                        transform: isSelected ? 'scale(1.02)' : 'scale(1)'
                      }}
                    >
                      {/* Primary color strip at top */}
                      <div 
                        className="w-full h-12" 
                        style={{ backgroundColor: palette.colors.primary }}
                      />
                      
                      {/* Content */}
                      <div className="p-6 bg-white/90">
                        <div className="font-semibold text-sm text-gray-900 mb-3">{palette.name}</div>
                        <div className="flex gap-2 mb-3 justify-center">
                          <div 
                            className="w-5 h-5 rounded-full shadow-inner" 
                            style={{ 
                              backgroundColor: palette.colors.primary,
                              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                            }} 
                          />
                          <div 
                            className="w-5 h-5 rounded-full shadow-inner" 
                            style={{ 
                              backgroundColor: palette.colors.secondary,
                              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                            }} 
                          />
                          <div 
                            className="w-5 h-5 rounded-full shadow-inner" 
                            style={{ 
                              backgroundColor: palette.colors.accent,
                              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                            }} 
                          />
                        </div>
                        <div className="text-xs text-gray-500">{palette.description}</div>
                      </div>

                      {/* Check indicator */}
                      {isSelected && (
                        <div 
                          className="absolute top-3 right-3 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-xl"
                          style={{ backgroundColor: palette.colors.primary }}
                        >
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preview Section */}
            <div className="space-y-5">
              <p className="text-base font-semibold text-gray-900">Preview Your Brand Experience:</p>
              
              {/* Mini Homepage Preview */}
              <div 
                className="rounded-2xl overflow-hidden border border-gray-300"
                style={{ 
                  height: '880px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)'
                }}
              >
                {/* Minimal Browser Chrome */}
                <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                    <div className="w-2 h-2 rounded-full bg-gray-400" />
                  </div>
                  <div className="flex-1 mx-3 bg-white rounded px-3 py-0.5 text-xs text-gray-400 font-mono">
                    {formData.companyName ? formData.companyName.toLowerCase().replace(/\s+/g, '') : 'yourcampground'}.com
                  </div>
                </div>
                
                {/* Navigation Bar - Surface Background */}
                <div 
                  className="px-8 py-4 border-b"
                  style={{ 
                    backgroundColor: selectedPalette?.colors.secondary,
                    borderColor: `${selectedPalette?.colors.primary}10`
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                      {formData.logoUrl ? (
                        <ImageWithFallback
                          src={formData.logoUrl}
                          alt="Logo"
                          className="h-8 w-auto object-contain"
                        />
                      ) : (
                        <div 
                          className="w-8 h-8 rounded flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: selectedPalette?.colors.primary }}
                        >
                          {formData.companyName ? formData.companyName.charAt(0).toUpperCase() : 'C'}
                        </div>
                      )}
                      <div className="flex gap-6 text-sm" style={{ color: selectedPalette?.colors.textLight }}>
                        <span>Sites</span>
                        <span>Amenities</span>
                        <span>Rates</span>
                        <span>Contact</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="px-6 py-2 rounded-lg font-semibold text-sm transition-all shadow-sm"
                      style={{ 
                        backgroundColor: selectedPalette?.colors.accent,
                        color: '#FFFFFF'
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>

                {/* Hero Section - Large, Immersive */}
                <div 
                  className="relative flex items-center justify-center text-center px-12 py-20"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1400&q=80)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      backgroundColor: selectedPalette?.colors.primary,
                      opacity: 0.88
                    }}
                  />
                  <div className="relative z-10 max-w-2xl">
                    <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                      Your Perfect Outdoor Escape
                    </h1>
                    <p className="text-white/95 text-lg mb-9 leading-relaxed">
                      Experience nature, comfort, and community in Ontario's wilderness
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button
                        type="button"
                        className="px-8 py-3 rounded-lg font-bold text-base transition-all shadow-lg"
                        style={{ 
                          backgroundColor: selectedPalette?.colors.accent,
                          color: '#FFFFFF'
                        }}
                      >
                        Explore Sites
                      </button>
                      <button
                        type="button"
                        className="px-8 py-3 rounded-lg font-bold text-base transition-all border-2 border-white text-white"
                      >
                        View Amenities
                      </button>
                    </div>
                  </div>
                </div>

                {/* Light Content Section - Surface Background */}
                <div 
                  className="px-10 py-14"
                  style={{ backgroundColor: selectedPalette?.colors.secondary }}
                >
                  <div className="max-w-3xl mx-auto text-center">
                    <h2 
                      className="text-3xl font-bold mb-4"
                      style={{ color: selectedPalette?.colors.primary }}
                    >
                      Everything You Need for the Perfect Stay
                    </h2>
                    <div 
                      className="w-16 h-1 mx-auto mb-5 rounded-full"
                      style={{ backgroundColor: selectedPalette?.colors.accent }}
                    />
                    <p 
                      className="text-base leading-relaxed"
                      style={{ color: selectedPalette?.colors.text }}
                    >
                      From spacious sites with full hookups to family-friendly amenities and scenic nature trails, 
                      we offer the complete camping experience for adventurers of all ages. Our park combines modern 
                      comfort with natural beauty.
                    </p>
                  </div>
                </div>

                {/* Alternate Section - Tinted Primary Background */}
                <div 
                  className="px-10 py-14"
                  style={{ 
                    backgroundColor: selectedPalette?.colors.primary,
                    opacity: 0.95
                  }}
                >
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                      <div 
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4"
                        style={{ 
                          backgroundColor: selectedPalette?.colors.accent,
                          color: '#FFFFFF'
                        }}
                      >
                        Featured
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        Premium Camping Experience
                      </h3>
                    </div>
                    <div className="grid grid-cols-3 gap-8 text-center">
                      <div>
                        <div className="text-3xl mb-3">⛺</div>
                        <h4 className="font-bold text-white text-sm mb-2">Premium Sites</h4>
                        <p className="text-white/80 text-xs leading-relaxed">
                          Full hookups & spacious lots
                        </p>
                      </div>
                      <div>
                        <div className="text-3xl mb-3">🏊</div>
                        <h4 className="font-bold text-white text-sm mb-2">Family Fun</h4>
                        <p className="text-white/80 text-xs leading-relaxed">
                          Pool, playground & activities
                        </p>
                      </div>
                      <div>
                        <div className="text-3xl mb-3">🌲</div>
                        <h4 className="font-bold text-white text-sm mb-2">Nature Trails</h4>
                        <p className="text-white/80 text-xs leading-relaxed">
                          Miles of scenic paths
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strong Full-Width Action CTA Band */}
                <div 
                  className="px-10 py-16 text-center"
                  style={{ 
                    backgroundColor: selectedPalette?.colors.accent
                  }}
                >
                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-3xl font-bold text-white mb-5">
                      Ready to Make Memories?
                    </h3>
                    <p className="text-white/95 text-lg mb-8 leading-relaxed">
                      Book your perfect campsite today
                    </p>
                    <button
                      type="button"
                      className="px-12 py-4 rounded-lg font-bold text-lg transition-all border-3 border-white shadow-xl"
                      style={{ 
                        backgroundColor: '#FFFFFF',
                        color: selectedPalette?.colors.accent,
                        borderWidth: '3px'
                      }}
                    >
                      Check Availability →
                    </button>
                  </div>
                </div>

                {/* Dark Footer - Deep Primary */}
                <div 
                  className="px-8 py-6 border-t"
                  style={{ 
                    backgroundColor: selectedPalette?.colors.primaryDark,
                    borderColor: `${selectedPalette?.colors.primary}30`
                  }}
                >
                  <div className="flex justify-between items-center text-xs text-white/50">
                    <p>
                      © 2026 {formData.companyName || 'Your Campground'}
                    </p>
                    <div className="flex gap-5">
                      <span className="hover:text-white/80 transition-colors cursor-pointer" 
                        style={{ 
                          '--hover-color': selectedPalette?.colors.accent 
                        } as React.CSSProperties}
                      >
                        Privacy
                      </span>
                      <span className="hover:text-white/80 transition-colors cursor-pointer">
                        Terms
                      </span>
                      <span className="hover:text-white/80 transition-colors cursor-pointer">
                        Contact
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Reference */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-5">Color System:</p>
                <div className="grid grid-cols-3 gap-5">
                  <div>
                    <div 
                      className="w-full h-14 rounded-lg mb-2 border border-gray-300 shadow-sm"
                      style={{ backgroundColor: selectedPalette?.colors.primary }}
                    />
                    <p className="text-xs text-gray-600 font-mono">{selectedPalette?.colors.primary}</p>
                    <p className="text-xs font-semibold text-gray-700 mt-1">Primary (Brand)</p>
                  </div>
                  <div>
                    <div 
                      className="w-full h-14 rounded-lg mb-2 border border-gray-300 shadow-sm"
                      style={{ backgroundColor: selectedPalette?.colors.secondary }}
                    />
                    <p className="text-xs text-gray-600 font-mono">{selectedPalette?.colors.secondary}</p>
                    <p className="text-xs font-semibold text-gray-700 mt-1">Surface (Background)</p>
                  </div>
                  <div>
                    <div 
                      className="w-full h-14 rounded-lg mb-2 border border-gray-300 shadow-sm"
                      style={{ backgroundColor: selectedPalette?.colors.accent }}
                    />
                    <p className="text-xs text-gray-600 font-mono">{selectedPalette?.colors.accent}</p>
                    <p className="text-xs font-semibold text-gray-700 mt-1">Action (CTAs)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-10 pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-8 py-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg text-lg"
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