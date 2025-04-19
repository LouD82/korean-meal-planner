import { createBrowserRouter, Outlet } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RecipesPage from './pages/RecipesPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import MealPlansPage from './pages/MealPlansPage'
import GroceryListPage from './pages/GroceryListPage'
import SettingsPage from './pages/SettingsPage'
import Layout from './components/layout/Layout'

/**
 * Root layout component that wraps all routes with the application layout
 */
const RootLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

/**
 * Application router configuration
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'recipes',
        element: <RecipesPage />,
      },
      {
        path: 'recipe/:id',
        element: <RecipeDetailPage />,
      },
      {
        path: 'meal-plans',
        element: <MealPlansPage />,
      },
      {
        path: 'grocery-list',
        element: <GroceryListPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: '*',
        element: (
          <div className="container mx-auto p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
            <p className="mb-4">The page you're looking for doesn't exist.</p>
            <a 
              href="/" 
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Go Home
            </a>
          </div>
        ),
      },
    ],
  },
])

export default router