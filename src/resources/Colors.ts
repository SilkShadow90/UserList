type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

export enum ColorSchemes {
  default = 'default',
  dark = 'dark',
}

const defaultColors = {
  primary: '#333333',
  placeholder: '#8b8b8b',
  placeholderBackground: '#b2b2b222',
  accent: '#c3c3c3',
  link: '#317e9b',
} as const;

type ColorSet = Record<keyof typeof defaultColors, Color>;

const darkColors: Partial<ColorSet> = {
  primary: '#f3f3f3',
  placeholder: '#f3f3f340',
  placeholderBackground: '#b2b2b212',
  accent: '#0a78ffcc',
} as const;

export const Colors: Record<ColorSchemes, Partial<ColorSet>> = {
  [ColorSchemes.default]: defaultColors,
  [ColorSchemes.dark]: {
    ...defaultColors,
    ...darkColors,
  },
} as const;
