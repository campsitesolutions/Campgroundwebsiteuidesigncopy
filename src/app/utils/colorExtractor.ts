import { CustomColorPalette } from '../context/SectionContext';

interface RGB {
  r: number;
  g: number;
  b: number;
}

// Convert RGB to hex
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

// Calculate color brightness (perceived luminance)
function getBrightness(r: number, g: number, b: number): number {
  return (r * 299 + g * 587 + b * 114) / 1000;
}

// Calculate color saturation
function getSaturation(r: number, g: number, b: number): number {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max === 0 ? 0 : (max - min) / max;
}

// Adjust color brightness
function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) * (1 + percent / 100)));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) * (1 + percent / 100)));
  const b = Math.min(255, Math.max(0, (num & 0xff) * (1 + percent / 100)));
  return rgbToHex(r, g, b);
}

// Adjust color saturation
function adjustSaturation(r: number, g: number, b: number, factor: number): RGB {
  const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
  return {
    r: Math.min(255, Math.max(0, gray + factor * (r - gray))),
    g: Math.min(255, Math.max(0, gray + factor * (g - gray))),
    b: Math.min(255, Math.max(0, gray + factor * (b - gray)))
  };
}

/**
 * Extract prominent colors from an image URL
 */
export async function extractColorsFromImage(imageUrl: string): Promise<CustomColorPalette> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Only set CORS for external URLs, not data URLs
    const isDataUrl = imageUrl.startsWith('data:');
    if (!isDataUrl) {
      try {
        img.crossOrigin = 'anonymous';
      } catch (e) {
        // Some environments may not support this, continue anyway
      }
    }
    
    img.onload = () => {
      try {
        // Create canvas to analyze image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Scale down image for faster processing
        const scale = Math.min(1, 100 / Math.max(img.width, img.height));
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Try to get pixel data - this will fail if CORS is not supported
        let imageData;
        try {
          imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        } catch (corsError) {
          if (isDataUrl) {
            reject(new Error('Failed to read uploaded image data. Please try a different image.'));
          } else {
            reject(new Error('Image loaded but CORS is not supported. Try one of these options:\n\n1. Upload a logo file using the "Upload Logo" button above\n2. Use images from Unsplash (unsplash.com)\n3. Use images from imgur.com\n4. Use your own CORS-enabled server\n\nOr manually select a color palette below.'));
          }
          return;
        }
        
        const pixels = imageData.data;
        
        // Color counting map
        const colorMap = new Map<string, { count: number; rgb: RGB; brightness: number; saturation: number }>();
        
        // Sample pixels (every 4th pixel for performance)
        for (let i = 0; i < pixels.length; i += 16) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];
          
          // Skip transparent pixels and very light/dark pixels
          if (a < 128) continue;
          const brightness = getBrightness(r, g, b);
          if (brightness > 240 || brightness < 15) continue;
          
          // Group similar colors (reduce to 32 color buckets per channel)
          const bucket = 32;
          const rBucket = Math.floor(r / bucket) * bucket;
          const gBucket = Math.floor(g / bucket) * bucket;
          const bBucket = Math.floor(b / bucket) * bucket;
          
          const key = `${rBucket},${gBucket},${bBucket}`;
          const saturation = getSaturation(r, g, b);
          
          if (colorMap.has(key)) {
            colorMap.get(key)!.count++;
          } else {
            colorMap.set(key, { 
              count: 1, 
              rgb: { r: rBucket, g: gBucket, b: bBucket },
              brightness,
              saturation
            });
          }
        }
        
        // Sort by count to find most common colors
        const sortedColors = Array.from(colorMap.values())
          .sort((a, b) => b.count - a.count);
        
        if (sortedColors.length === 0) {
          reject(new Error('No colors found in image'));
          return;
        }
        
        // Find primary color (most common with good saturation)
        const primaryColor = sortedColors.find(c => c.saturation > 0.2) || sortedColors[0];
        const primary = rgbToHex(primaryColor.rgb.r, primaryColor.rgb.g, primaryColor.rgb.b);
        
        // Find accent color (contrasting and saturated)
        let accentColor = sortedColors.find(c => {
          const colorDiff = Math.abs(c.rgb.r - primaryColor.rgb.r) + 
                           Math.abs(c.rgb.g - primaryColor.rgb.g) + 
                           Math.abs(c.rgb.b - primaryColor.rgb.b);
          return c.saturation > 0.3 && colorDiff > 100;
        });
        
        if (!accentColor) {
          // Generate complementary accent color
          const adjusted = adjustSaturation(
            primaryColor.rgb.r,
            primaryColor.rgb.g,
            primaryColor.rgb.b,
            1.5
          );
          accentColor = {
            rgb: { 
              r: Math.min(255, adjusted.r + 50), 
              g: Math.min(255, adjusted.g + 30), 
              b: adjusted.b 
            },
            count: 0,
            brightness: 0,
            saturation: 0
          };
        }
        const accent = rgbToHex(accentColor.rgb.r, accentColor.rgb.g, accentColor.rgb.b);
        
        // Generate secondary color (lighter version of primary)
        const secondary = adjustBrightness(primary, 40);
        
        resolve({
          primary,
          secondary,
          accent
        });
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image. Make sure the URL is valid and supports CORS.'));
    };
    
    img.src = imageUrl;
  });
}