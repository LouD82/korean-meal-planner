import { extendTheme } from '@chakra-ui/react';

/**
 * Korean-inspired color theme based on Obangsaek (오방색)
 * 
 * Obangsaek is the traditional Korean color scheme consisting of five colors:
 * - White (백/Baek): Purity, innocence, peace, metal
 * - Black (흑/Heuk): Wisdom, knowledge, water
 * - Blue/Green (청/Cheong): Growth, harmony, wood
 * - Red (적/Jeok): Passion, energy, fire
 * - Yellow (황/Hwang): Center, earth, fertility
 * 
 * Each color has cultural significance and is associated with cardinal directions and elements.
 */

const colors = {
  // Primary colors from Obangsaek
  obangsaek: {
    white: '#FFFFFF', // Baek (백) - West - Metal
    black: '#000000', // Heuk (흑) - North - Water
    blue: '#1E63B3', // Cheong (청) - East - Wood
    red: '#D81921', // Jeok (적) - South - Fire
    yellow: '#FFC61A', // Hwang (황) - Center - Earth
  },
  
  // Secondary colors (Ogansaek - combinations of Obangsaek colors)
  ogansaek: {
    green: '#1D7E45', // Yellow + Blue
    lightBlue: '#8ECBEE', // Blue + White
    brightRed: '#FF6B6B', // Red + White
    sulfurYellow: '#D4B32A', // Yellow + Black
    violet: '#9C2B85', // Red + Black
  },
  
  // Neutral palette derived from traditional Korean aesthetics
  neutral: {
    50: '#F7F7F7',
    100: '#E8E8E8',
    200: '#D4D4D4',
    300: '#A6A6A6',
    400: '#737373',
    500: '#595959',
    600: '#404040',
    700: '#262626',
    800: '#171717',
    900: '#0A0A0A',
  },
  
  // Semantic colors
  brand: {
    primary: '#1E63B3', // Blue (Cheong)
    secondary: '#D81921', // Red (Jeok)
    accent: '#FFC61A', // Yellow (Hwang)
    muted: '#8ECBEE', // Light Blue
  },
};

const fonts = {
  heading: '"Noto Sans KR", system-ui, sans-serif',
  body: '"Noto Sans KR", system-ui, sans-serif',
};

const theme = extendTheme({
  colors,
  fonts,
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'neutral.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.primary',
          color: 'white',
          _hover: {
            bg: 'blue.600',
          },
        },
        outline: {
          borderColor: 'brand.primary',
          color: 'brand.primary',
        },
        secondary: {
          bg: 'brand.secondary',
          color: 'white',
          _hover: {
            bg: 'red.600',
          },
        },
        accent: {
          bg: 'brand.accent',
          color: 'black',
          _hover: {
            bg: 'yellow.500',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        color: 'neutral.800',
        fontWeight: 'bold',
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'lg',
          boxShadow: 'md',
          overflow: 'hidden',
        },
      },
    },
  },
});

export default theme;
