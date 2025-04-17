import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { WeeklyMealPlan, Recipe } from '../types/recipe'
import { getAllMealPlans, getRecipeById } from '../utils/recipeUtils'

interface EnhancedMealPlan extends WeeklyMealPlan {
  lunchRecipe?: Recipe
  dinnerRecipe?: Recipe
}

/**
 * MealPlansPage component that displays all available meal plans
 */
const MealPlansPage = () => {
  const [mealPlans, setMealPlans] = useState<EnhancedMealPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMealPlans = async () => {
      try {
        setLoading(true)
        
        // Load meal plans
        const mealPlansData = await getAllMealPlans()
        
        // Load recipe details for each meal plan
        const enhancedMealPlans = await Promise.all(mealPlansData.map(async (plan) => {
          const lunchRecipe = await getRecipeById(plan.lunchRecipeId)
          const dinnerRecipe = await getRecipeById(plan.dinnerRecipeId)
          
          return {
            ...plan,
            lunchRecipe,
            dinnerRecipe
          }
        }))
        
        setMealPlans(enhancedMealPlans)
      } catch (error) {
        console.error('Error loading meal plans:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMealPlans()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Meal Plans</h2>
      
      {loading ? (
        <p className="text-center">Loading meal plans...</p>
      ) : mealPlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mealPlans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Week {plan.weekNumber}</h3>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-amber-800 mb-2">Lunch</h4>
                  {plan.lunchRecipe ? (
                    <div className="flex items-center">
                      <div className="w-16 h-16 mr-4 overflow-hidden rounded">
                        <img 
                          src={plan.lunchRecipe.imageUrl || '/placeholder-recipe.jpg'} 
                          alt={plan.lunchRecipe.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <Link 
                          to={`/recipe/${plan.lunchRecipeId}`}
                          className="text-green-600 hover:text-green-800 font-medium"
                        >
                          {plan.lunchRecipe.name}
                        </Link>
                        <p className="text-sm text-gray-500">
                          {plan.lunchRecipe.prepTime + plan.lunchRecipe.cookTime} min total
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p>Recipe not found</p>
                  )}
                </div>
                
                <div>
                  <h4 className="font-semibold text-indigo-800 mb-2">Dinner</h4>
                  {plan.dinnerRecipe ? (
                    <div className="flex items-center">
                      <div className="w-16 h-16 mr-4 overflow-hidden rounded">
                        <img 
                          src={plan.dinnerRecipe.imageUrl || '/placeholder-recipe.jpg'} 
                          alt={plan.dinnerRecipe.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <Link 
                          to={`/recipe/${plan.dinnerRecipeId}`}
                          className="text-green-600 hover:text-green-800 font-medium"
                        >
                          {plan.dinnerRecipe.name}
                        </Link>
                        <p className="text-sm text-gray-500">
                          {plan.dinnerRecipe.prepTime + plan.dinnerRecipe.cookTime} min total
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p>Recipe not found</p>
                  )}
                </div>
                
                <Link 
                  to={`/grocery-list?week=${plan.weekNumber}`}
                  className="mt-6 block w-full bg-green-600 text-white py-2 text-center rounded-md hover:bg-green-700 transition-colors duration-300"
                >
                  Generate Grocery List
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No meal plans available.</p>
      )}
    </div>
  )
}

export default MealPlansPage