import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Recipe } from '../types/recipe'
import { getRecipeById } from '../utils/recipeUtils'

/**
 * RecipeDetailPage component displays detailed information about a specific recipe
 */
const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true)
        
        if (!id) {
          throw new Error('Recipe ID is required')
        }
        
        const recipeData = await getRecipeById(id)
        
        if (!recipeData) {
          throw new Error(`Recipe with ID ${id} not found`)
        }
        
        setRecipe(recipeData)
      } catch (error) {
        console.error('Error loading recipe:', error)
      } finally {
        setLoading(false)
      }
    }

    loadRecipe()
  }, [id])

  const handleBackClick = () => {
    navigate('/')
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Loading recipe...</p>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">Recipe not found</p>
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            onClick={handleBackClick}
          >
            Back to Recipes
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        className="mb-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
        onClick={handleBackClick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Recipes
      </button>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
        <div className="flex flex-col md:flex-row">
          {/* Recipe Image */}
          <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6">
            <img 
              src={recipe.imageUrl || '/placeholder-recipe.jpg'} 
              alt={recipe.name} 
              className="w-full h-auto rounded-lg"
            />
            
            <div className="mt-4">
              <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                recipe.type === 'lunch' ? 'bg-amber-200 text-amber-800' : 'bg-indigo-200 text-indigo-800'
              }`}>
                {recipe.type.charAt(0).toUpperCase() + recipe.type.slice(1)}
              </span>
              
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Prep: {recipe.prepTime} min</span>
                </div>
                
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Cook: {recipe.cookTime} min</span>
                </div>
              </div>
              
              <p className="mt-2 text-sm text-gray-500">
                <span className="font-semibold">Total:</span> {recipe.prepTime + recipe.cookTime} min
              </p>
              
              <p className="mt-2 text-sm text-gray-500">
                <span className="font-semibold">Servings:</span> {recipe.servings}
              </p>
            </div>
          </div>
          
          {/* Recipe Details */}
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{recipe.name}</h1>
            <p className="text-gray-700 mb-6">{recipe.description}</p>
            
            {/* Placeholder for detailed content */}
            <p className="italic text-gray-500 mb-4">
              The full RecipeDetail component will be implemented in the next step with ingredients, steps, and batch cooking instructions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetailPage