import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Recipe } from '../types/recipe'
import { getAllRecipes } from '../utils/recipeUtils'
import RecipeCard from '../components/recipes/RecipeCard'

/**
 * RecipesPage component that displays all available recipes
 */
const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        setLoading(true)
        
        // Load recipes
        const recipesData = await getAllRecipes()
        setRecipes(recipesData)
      } catch (error) {
        console.error('Error loading recipes:', error)
      } finally {
        setLoading(false)
      }
    }

    loadRecipes()
  }, [])

  const handleRecipeClick = (recipe: Recipe) => {
    // Navigate to the recipe detail page
    navigate(`/recipe/${recipe.id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">All Recipes</h2>
      
      {loading ? (
        <p className="text-center">Loading recipes...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onClick={handleRecipeClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default RecipesPage