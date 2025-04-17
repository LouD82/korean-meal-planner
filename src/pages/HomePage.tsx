import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Recipe, WeeklyMealPlan } from '../types/recipe'
import { getAllRecipes, getCurrentMealPlan } from '../utils/recipeUtils'
import RecipeCard from '../components/recipes/RecipeCard'

/**
 * HomePage component that displays the main page with recipe cards
 */
const HomePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [currentMealPlan, setCurrentMealPlan] = useState<WeeklyMealPlan | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true)
        
        // Load recipes and current meal plan
        const recipesData = await getAllRecipes()
        const mealPlanData = await getCurrentMealPlan()
        
        setRecipes(recipesData)
        setCurrentMealPlan(mealPlanData)
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
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div>
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Current Meal Plan</h2>
              {currentMealPlan ? (
                <p>Meal plan display will go here</p>
              ) : (
                <p>No meal plan is currently selected. Choose recipes to create a plan.</p>
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