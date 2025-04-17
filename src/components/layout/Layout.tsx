import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'

interface LayoutProps {
  children: ReactNode
}

/**
 * Layout component that wraps the entire application and provides common elements
 */
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-600 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold hover:text-green-200 transition-colors">
            Korean Meal Planner
          </Link>
        </div>
      </header>
      
      <Navigation />
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>Korean Meal Planner - Save money and eat well with batch-cooked Korean meals</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout