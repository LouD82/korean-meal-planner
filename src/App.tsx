import { useState, useEffect } from 'react'
import './App.css'
import { Recipe, WeeklyMealPlan } from './types/recipe'
import { getAllRecipes, getCurrentMealPlan } from './utils/recipeUtils'
import RecipeCard from './components/recipes/RecipeCard'

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [currentMealPlan, setCurrentMealPlan] = useState<WeeklyMealPlan | null>(null)
  const [loading, setLoading] = useState(true)
  // Using setSelectedRecipe to avoid TypeScript error
  const [, setSelectedRecipe] = useState<Recipe | null>(null)

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
    setSelectedRecipe(recipe)
    // In the future, this will navigate to a recipe detail page or show a modal
    console.log('Recipe selected:', recipe.name)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center">Korean Meal Planner</h1>
        <p className="text-center text-gray-600 mt-2">
          Plan your weekly Korean meals with easy batch-cooking recipes
        </p>
      </header>

      <main>
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
      </main>

      <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
        <p>Korean Meal Planner - Save money and eat well with batch-cooked Korean meals</p>
      </footer>
    </div>
  )
}

export default App
