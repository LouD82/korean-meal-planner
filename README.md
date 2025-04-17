# Korean Meal Planner

A web application for planning and preparing easy-to-make Korean meals. This app helps users replace meal delivery services with home-cooked Korean meals using ingredients from H-Mart, focusing on recipes that can be batch-cooked on Sundays for the upcoming week.

## Features

- Rotating selection of easy-to-prepare Korean lunch and dinner recipes
- Weekly meal plans with different lunch and dinner options each week
- Detailed recipes with ingredients, instructions, and batch cooking guidance
- Automatically generated grocery lists based on selected meal plans
- Simple, intuitive user interface

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS (to be added)

## Project Structure

```
/docs - Project documentation, research, and planning
/src
  /assets - Static assets like images
  /components - React components
    /layout - Layout components (header, footer, etc.)
    /mealplan - Meal planning related components
    /recipes - Recipe display components
    /grocerylist - Grocery list components
  /hooks - Custom React hooks
  /types - TypeScript type definitions
  /utils - Utility functions
/public - Static assets and data files
```

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LouD82/korean-meal-planner.git
   cd korean-meal-planner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To build the app for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build locally

## Repository

- Repository URL: [https://github.com/LouD82/korean-meal-planner](https://github.com/LouD82/korean-meal-planner)

## License

This project is licensed under the MIT License.
