/**
 * Determines if a color is light or dark based on its hex value
 * Returns true if the color is light (needs dark text)
 */
export function isLightColor(hexColor: string): boolean {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return true if color is light (luminance > 0.5)
  return luminance > 0.5;
}

/**
 * Returns appropriate text color (black or white) based on background color
 */
export function getContrastTextColor(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? '#1C1C1C' : '#FFFFFF';
}
