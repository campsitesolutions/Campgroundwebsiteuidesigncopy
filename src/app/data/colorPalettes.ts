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
      secondary: '#2A2E2C',
      accent: '#D8CBB8',
      accentHover: '#c9b9a3',
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
      secondary: '#A89F91',
      accent: '#DCE1E6',
      accentHover: '#c9d1d9',
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
      secondary: '#1C1C1C',
      accent: '#C7BFAE',
      accentHover: '#b5ab98',
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
      secondary: '#F4EFE6',
      accent: '#B38B4D',
      accentHover: '#9f7740',
      text: '#2A2E2C',
      textLight: '#5B6467',
    },
  },
  {
    id: 'canadian-shield',
    name: 'Canadian Shield',
    description: 'Natural granite tones',
    colors: {
      primary: '#5B6467',
      primaryHover: '#6f7a7d',
      primaryDark: '#464d50',
      secondary: '#E8ECEB',
      accent: '#3F5A4F',
      accentHover: '#4f6e60',
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
      secondary: '#4A4A4A',
      accent: '#F1ECE5',
      accentHover: '#e3dccf',
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
      secondary: '#E6DDCF',
      accent: '#8FA38A',
      accentHover: '#7a8f74',
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
      secondary: '#28342D',
      accent: '#B7B2AA',
      accentHover: '#a39d93',
      text: '#28342D',
      textLight: '#5B6467',
    },
  },
  {
    id: 'morning-mist',
    name: 'Morning Mist',
    description: 'Soft dawn atmosphere',
    colors: {
      primary: '#6F8FAF',
      primaryHover: '#87a3c0',
      primaryDark: '#5a7491',
      secondary: '#F8F6F2',
      accent: '#A3B18A',
      accentHover: '#8f9e77',
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
      secondary: '#F5F3EF',
      accent: '#C2A28C',
      accentHover: '#ad8e76',
      text: '#1C1C1C',
      textLight: '#5B6467',
    },
  },
];

export function getColorPalette(id: string): ColorPalette | undefined {
  return colorPalettes.find(p => p.id === id);
}
