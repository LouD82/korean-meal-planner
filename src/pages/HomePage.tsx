import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Recipe } from '../types/recipe'
import { getAllRecipes } from '../utils/recipeUtils'
import RecipeCard from '../components/recipes/RecipeCard'
import { useCurrentMealPlan } from '../hooks/useMealPlan'
import MealPlanDisplay from '../components/mealplan/MealPlanDisplay'

/**
 * HomePage component that displays the main page with the current meal plan and recipe cards
 */
const HomePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { currentMealPlan, loading: mealPlanLoading } = useCurrentMealPlan()

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true)
        
        // Load recipes
        const recipesData = await getAllRecipes()
        setRecipes(recipesData)
      } catch (error) {
        console.error('Error loading initial data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadInitialData()
  }, [])

  const handleRecipeClick = (recipe: Recipe) => {
    // Navigate to the recipe detail page
    navigate(`/recipe/${recipe.id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center">Weekly Korean Meal Plans</h2>
        <p className="text-center text-gray-600 mt-2">
          Plan your weekly Korean meals with easy batch-cooking recipes
        </p>
      </div>

      <div>
        {loading || mealPlanLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Current Meal Plan</h2>
              {currentMealPlan ? (
                <div className="max-w-3xl mx-auto">
                  <MealPlanDisplay 
                    mealPlan={currentMealPlan}
                    isCurrentPlan={true}
                  />
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 text-center max-w-3xl mx-auto">
                  <p className="mb-4">No meal plan is currently selected.</p>
                  <a 
                    href="/meal-plans" 
                    className="inline-block bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300"
                  >
                    Choose a Meal Plan
                  </a>
                </div>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Available Recipes</h2>
              {recipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {recipes.map(recipe => (
                    <RecipeCard 
                      key={recipe.id} 
                      recipe={recipe} 
                      onClick={handleRecipeClick}
                    />
                  ))}
                </div>
              ) : (
                <p>Recipe data will be added soon.</p>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage