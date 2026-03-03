export interface ColorPalette {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    primaryHover: string;
    primaryDark: string;
    secondary: string;
    accent: string;
    accentHover: string;
    text: string;
    textLight: string;
  };
}

export const colorPalettes: ColorPalette[] = [
  {
    id: 'evergreen-reserve',
    name: 'Evergreen Reserve',
    description: 'Classic forest tones',
    colors: {
      primary: '#1F3D2B',
      primaryHover: '#2d5a3f',
      primaryDark: '#152820',
      secondary: '#F5F7F5',
      accent: '#D97D41',
      accentHover: '#c26a34',
      text: '#2A2E2C',
      textLight: '#5B6467',
    },
  },
  {
    id: 'lakeside-retreat',
    name: 'Lakeside Retreat',
    description: 'Tranquil waterfront vibes',
    colors: {
      primary: '#1E3A5F',
      primaryHover: '#2d5687',
      primaryDark: '#152840',
      secondary: '#F2F0EB',
      accent: '#3B82A3',
      accentHover: '#2f6a87',
      text: '#1C2F45',
      textLight: '#5B6467',
    },
  },
  {
    id: 'modern-woodland',
    name: 'Modern Woodland',
    description: 'Contemporary forest style',
    colors: {
      primary: '#4E5B31',
      primaryHover: '#677846',
      primaryDark: '#3a4424',
      secondary: '#F7F7F4',
      accent: '#C89B3C',
      accentHover: '#b38834',
      text: '#1C1C1C',
      textLight: '#5B6467',
    },
  },
  {
    id: 'golden-hour-pines',
    name: 'Golden Hour Pines',
    description: 'Warm sunset elegance',
    colors: {
      primary: '#2F4F3F',
      primaryHover: '#3d6752',
      primaryDark: '#233a2f',
      secondary: '#F8F5EF',
      accent: '#D4802D',
      accentHover: '#be7228',
      text: '#2A2E2C',
      textLight: '#5B6467',
    },
  },
  {
    id: 'canadian-shield',
    name: 'Canadian Shield',
    description: 'Natural granite tones',
    colors: {
      primary: '#3E4A4D',
      primaryHover: '#525f62',
      primaryDark: '#2e3739',
      secondary: '#F0F2F2',
      accent: '#5B8C6E',
      accentHover: '#4d7a5e',
      text: '#2A2E2C',
      textLight: '#5B6467',
    },
  },
  {
    id: 'campfire-luxe',
    name: 'Campfire Luxe',
    description: 'Cozy fireside warmth',
    colors: {
      primary: '#6B3E2E',
      primaryHover: '#854d3a',
      primaryDark: '#512e22',
      secondary: '#F8F5F2',
      accent: '#C95D3E',
      accentHover: '#b45236',
      text: '#1C1C1C',
      textLight: '#4A4A4A',
    },
  },
  {
    id: 'harbour-hemlock',
    name: 'Harbour & Hemlock',
    description: 'Coastal forest blend',
    colors: {
      primary: '#1C2F45',
      primaryHover: '#2a4563',
      primaryDark: '#141f2f',
      secondary: '#F3EFE8',
      accent: '#6B9B7A',
      accentHover: '#5a8667',
      text: '#1C2F45',
      textLight: '#5B6467',
    },
  },
  {
    id: 'maple-stone',
    name: 'Maple & Stone',
    description: 'Rustic natural earth',
    colors: {
      primary: '#6A4B3B',
      primaryHover: '#845e4b',
      primaryDark: '#4f382c',
      secondary: '#F5F3F0',
      accent: '#B86D3D',
      accentHover: '#a45f34',
      text: '#28342D',
      textLight: '#5B6467',
    },
  },
  {
    id: 'morning-mist',
    name: 'Morning Mist',
    description: 'Soft dawn atmosphere',
    colors: {
      primary: '#4A6B8A',
      primaryHover: '#5d7f9e',
      primaryDark: '#3a5570',
      secondary: '#F9F8F5',
      accent: '#7BA664',
      accentHover: '#6a9156',
      text: '#2A2E2C',
      textLight: '#5B6467',
    },
  },
  {
    id: 'trailhead-minimal',
    name: 'Trailhead Minimal',
    description: 'Clean outdoor aesthetic',
    colors: {
      primary: '#1F4E4E',
      primaryHover: '#2d6a6a',
      primaryDark: '#163939',
      secondary: '#F7F5F2',
      accent: '#D68A5C',
      accentHover: '#c17a4f',
      text: '#1C1C1C',
      textLight: '#5B6467',
    },
  },
];

export function getColorPalette(id: string): ColorPalette | undefined {
  return colorPalettes.find(p => p.id === id);
}