# Korean Meal Planner Project Setup

This document outlines the setup process for the Korean Meal Planner application, including the technology choices, project structure, and design decisions made during Session 7.

## Technology Stack

As decided in previous sessions, the Korean Meal Planner application uses the following technologies:

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Component Library**: Chakra UI
- **State Management**: Zustand
- **Data Storage**: JSON (static data) + IndexedDB with Dexie.js (user data)

## Project Initialization

The project was initialized using Vite with the React-TypeScript template:

```bash
npm create vite@latest . -- --template react-ts
```

## Project Structure

The project follows a modular structure with the following directories:

```
korean-meal-planner/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components for routing
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── data/           # Static data and data management
│   ├── types/          # TypeScript type definitions
│   ├── theme/          # Chakra UI theme configuration
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
├── docs/               # Project documentation
└── ...                 # Configuration files
```

## Chakra UI Configuration

Chakra UI was installed and configured with a custom theme inspired by traditional Korean colors:

```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

The ChakraProvider was added to the main application entry point (`main.tsx`) to provide the theme to all components:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
```

## Korean-Inspired Color Palette (Obangsaek)

The application uses a color theme inspired by the traditional Korean color scheme known as Obangsaek (오방색). Obangsaek consists of five colors that have deep cultural significance in Korean tradition:

### The Five Traditional Colors

1. **White (백/Baek)** - #FFFFFF
   - Represents: Purity, innocence, peace
   - Direction: West
   - Element: Metal

2. **Black (흑/Heuk)** - #000000
   - Represents: Wisdom, knowledge
   - Direction: North
   - Element: Water

3. **Blue/Green (청/Cheong)** - #1E63B3
   - Represents: Growth, harmony, youth, hope
   - Direction: East
   - Element: Wood

4. **Red (적/Jeok)** - #D81921
   - Represents: Passion, energy, happiness
   - Direction: South
   - Element: Fire

5. **Yellow (황/Hwang)** - #FFC61A
   - Represents: Center, authority, earth
   - Direction: Center
   - Element: Earth

### Secondary Colors (Ogansaek)

In addition to the five primary colors, we've included secondary colors created by combining the primary Obangsaek colors:

- **Green**: #1D7E45 (Yellow + Blue)
- **Light Blue**: #8ECBEE (Blue + White)
- **Bright Red**: #FF6B6B (Red + White)
- **Sulfur Yellow**: #D4B32A (Yellow + Black)
- **Violet**: #9C2B85 (Red + Black)

### Implementation in Theme

The colors are implemented in the Chakra UI theme configuration (`src/theme/index.ts`):

```typescript
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
  
  // Semantic colors for application use
  brand: {
    primary: '#1E63B3', // Blue (Cheong)
    secondary: '#D81921', // Red (Jeok)
    accent: '#FFC61A', // Yellow (Hwang)
    muted: '#8ECBEE', // Light Blue
  },
};
```

## State Management

Zustand was installed for state management:

```bash
npm install zustand
```

Zustand was chosen for its simplicity and minimal boilerplate compared to Redux, while still providing powerful state management capabilities.

## Path Aliases

Path aliases were configured in `vite.config.ts` to simplify imports:

```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
    '@components': path.resolve(__dirname, './src/components'),
    '@pages': path.resolve(__dirname, './src/pages'),
    '@hooks': path.resolve(__dirname, './src/hooks'),
    '@utils': path.resolve(__dirname, './src/utils'),
    '@data': path.resolve(__dirname, './src/data'),
    '@types': path.resolve(__dirname, './src/types'),
    '@theme': path.resolve(__dirname, './src/theme'),
  },
},
```

## Next Steps

The next steps for the project will include:

1. Creating reusable components for recipes and meal planning
2. Setting up routing with React Router
3. Implementing state management with Zustand
4. Creating JSON data structures for Korean recipes
5. Developing the meal planning interface
6. Implementing grocery list generation functionality
