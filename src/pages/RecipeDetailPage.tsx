import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Recipe } from '../types/recipe'
import { getRecipeById } from '../utils/recipeUtils'
import './RecipeDetailPage.css'

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
    navigate('/recipes')
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
        </div>
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

  // Format batch cooking instructions into a more readable format
  const formatBatchInstructions = (instructions: string) => {
    if (!instructions) return [];
    
    // Split by common delimiters that might separate instructions
    const sections = instructions
      .split(/(?:Refrigerate:|Freeze:|Microwave:|Stovetop:|Thaw:|To reheat:)/g)
      .filter(section => section.trim().length > 0);
    
    const titles = instructions.match(/(?:Refrigerate:|Freeze:|Microwave:|Stovetop:|Thaw:|To reheat:)/g) || [];
    
    return titles.map((title, index) => ({
      title: title.replace(':', ''),
      content: sections[index] ? sections[index].trim() : ''
    }));
  };

  const batchInstructions = recipe.batchCookingInstructions 
    ? formatBatchInstructions(recipe.batchCookingInstructions)
    : [];

  return (
    <div className="container mx-auto px-4 py-8 recipe-section">
      {/* Back button */}
      <div className="print:hidden">
        <button 
          className="mb-6 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
          onClick={handleBackClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Recipes
        </button>
      </div>

      <div className="lg:flex lg:gap-8">
        {/* Left Column (2/3) - Recipe Content */}
        <div className="lg:w-2/3">
          {/* Recipe Header */}
          <div className="mb-8">
            <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4 ${
              recipe.type === 'lunch' ? 'bg-amber-200 text-amber-800' : 'bg-indigo-200 text-indigo-800'
            }`}>
              {recipe.type.charAt(0).toUpperCase() + recipe.type.slice(1)}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{recipe.name}</h1>
            <p className="text-gray-700 mb-6">{recipe.description}</p>
            
            {/* Recipe Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-gray-500 text-sm">Prep Time</div>
                <div className="font-semibold text-lg">{recipe.prepTime} min</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-gray-500 text-sm">Cook Time</div>
                <div className="font-semibold text-lg">{recipe.cookTime} min</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-gray-500 text-sm">Total Time</div>
                <div className="font-semibold text-lg">{recipe.prepTime + recipe.cookTime} min</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-gray-500 text-sm">Servings</div>
                <div className="font-semibold text-lg">{recipe.servings}</div>
              </div>
            </div>
            
            {/* Print Button */}
            <button 
              onClick={() => window.print()}
              className="mb-6 bg-blue-100 text-blue-700 py-2 px-4 rounded hover:bg-blue-200 transition-colors duration-300 print:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
              </svg>
              Print Recipe
            </button>
          </div>
          
          <div className="md:flex md:gap-6 mb-8">
            {/* Ingredients Section */}
            <div className="md:w-1/3 mb-6 md:mb-0">
              <div className="bg-white p-6 rounded-lg shadow-md recipe-section">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ingredients</h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 mt-1.5"></span>
                      <span>
                        <span className="font-medium">{ingredient.amount} {ingredient.unit}</span> {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Instructions Section */}
            <div className="md:w-2/3">
              <div className="bg-white p-6 rounded-lg shadow-md recipe-section">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cooking Instructions</h2>
                <ol className="list-decimal ml-6 space-y-4">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="pl-2">
                      <p>{step.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          
          {/* Recipe Image - Only shown on smaller screens */}
          <div className="lg:hidden mb-8">
            <img 
              src={recipe.imageUrl || '/placeholder-recipe.jpg'} 
              alt={recipe.name} 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          
          {/* Batch Cooking Instructions Section */}
          {recipe.batchCookingInstructions && (
            <div className="mb-8 bg-amber-50 p-6 rounded-lg shadow-md border border-amber-200 recipe-section">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Batch Cooking Instructions</h2>
              
              {batchInstructions.length > 0 ? (
                <div className="space-y-4">
                  {batchInstructions.map((instruction, idx) => (
                    <div key={idx} className="mb-3">
                      <h3 className="font-semibold text-lg text-amber-800">{instruction.title}</h3>
                      <p className="mt-1">{instruction.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="whitespace-pre-line">{recipe.batchCookingInstructions}</p>
              )}
            </div>
          )}
          
          {/* Recipe Notes */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md recipe-section">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Recipe Notes</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>This recipe makes approximately {recipe.servings} servings</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>Perfect for meal prep and can be stored according to the batch cooking instructions</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>Customize spice levels according to your preference</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>For the best flavor, use fresh ingredients when possible</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Right Column (1/3) - Recipe Image (only on larger screens) */}
        <div className="lg:w-1/3 hidden lg:block">
          <div className="sticky top-4">
            <img 
              src={recipe.imageUrl || '/placeholder-recipe.jpg'} 
              alt={recipe.name} 
              className="w-full h-auto rounded-lg shadow-md mb-6"
            />
            
            {/* Quick Reference */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h3 className="font-semibold text-lg mb-2">Quick Reference</h3>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Prep Time:</span> {recipe.prepTime} min</p>
                <p><span className="font-medium">Cook Time:</span> {recipe.cookTime} min</p>
                <p><span className="font-medium">Total Time:</span> {recipe.prepTime + recipe.cookTime} min</p>
                <p><span className="font-medium">Servings:</span> {recipe.servings}</p>
                <p><span className="font-medium">Meal Type:</span> {recipe.type.charAt(0).toUpperCase() + recipe.type.slice(1)}</p>
              </div>
            </div>
            
            {/* Key Ingredients */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-2">Key Ingredients</h3>
              <div className="text-sm space-y-1">
                {recipe.ingredients.slice(0, 5).map((ingredient, index) => (
                  <p key={index}>{ingredient.name}</p>
                ))}
                {recipe.ingredients.length > 5 && (
                  <p className="text-gray-500">+{recipe.ingredients.length - 5} more</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetailPage