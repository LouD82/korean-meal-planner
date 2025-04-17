import { NavLink } from 'react-router-dom'

/**
 * Navigation component for the application
 */
const Navigation = () => {
  return (
    <nav className="bg-green-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <NavLink 
              to="/" 
              className="text-white font-bold py-4 mr-6 hover:text-green-200"
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/recipes" 
              className={({ isActive }) => 
                isActive 
                  ? "text-green-200 font-bold py-4 mr-6" 
                  : "text-white font-bold py-4 mr-6 hover:text-green-200"
              }
            >
              Recipes
            </NavLink>
            <NavLink 
              to="/meal-plans" 
              className={({ isActive }) => 
                isActive 
                  ? "text-green-200 font-bold py-4 mr-6" 
                  : "text-white font-bold py-4 mr-6 hover:text-green-200"
              }
            >
              Meal Plans
            </NavLink>
            <NavLink 
              to="/grocery-list" 
              className={({ isActive }) => 
                isActive 
                  ? "text-green-200 font-bold py-4" 
                  : "text-white font-bold py-4 hover:text-green-200"
              }
            >
              Grocery List
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation