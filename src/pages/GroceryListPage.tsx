import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { WeeklyMealPlan } from '../types/recipe'
import { getAllMealPlans, generateGroceryList } from '../utils/recipeUtils'

/**
 * GroceryListPage component that displays the grocery list for a selected meal plan
 */
const GroceryListPage = () => {
  const [searchParams] = useSearchParams()
  const [mealPlan, setMealPlan] = useState<WeeklyMealPlan | null>(null)
  const [groceryItems, setGroceryItems] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const weekParam = searchParams.get('week')
  const weekNumber = weekParam ? parseInt(weekParam, 10) : null

  useEffect(() => {
    const loadGroceryList = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Get all meal plans
        const mealPlans = await getAllMealPlans()
        
        // Find the requested meal plan by week number, or use the first one
        const selectedPlan = weekNumber 
          ? mealPlans.find(plan => plan.weekNumber === weekNumber) 
          : mealPlans[0]
        
        if (!selectedPlan) {
          throw new Error(`No meal plan found for week ${weekNumber}`)
        }
        
        setMealPlan(selectedPlan)
        
        // Generate grocery list for the selected meal plan
        const items = await generateGroceryList(selectedPlan)
        setGroceryItems(items)
      } catch (error) {
        console.error('Error loading grocery list:', error)
        setError(`Error loading grocery list: ${error instanceof Error ? error.message : 'Unknown error'}`)
      } finally {
        setLoading(false)
      }
    }

    loadGroceryList()
  }, [weekNumber])

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Grocery List</h2>
      
      {loading ? (
        <p className="text-center">Loading grocery list...</p>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <p>{error}</p>
          <p className="mt-2">Please select a valid meal plan.</p>
        </div>
      ) : mealPlan ? (
        <div>
          <div className="bg-green-100 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-2">Week {mealPlan.weekNumber} Grocery List</h3>
            <p className="text-gray-600">
              Here's everything you need for your weekly meal plan.
            </p>
          </div>
          
          {groceryItems.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <ul className="divide-y divide-gray-200">
                {groceryItems.map((item, index) => (
                  <li key={index} className="py-3 flex items-center">
                    <input
                      type="checkbox"
                      id={`item-${index}`}
                      className="h-5 w-5 text-green-600 rounded"
                    />
                    <label htmlFor={`item-${index}`} className="ml-3 text-gray-700">
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 flex gap-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  Print List
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                  Copy to Clipboard
                </button>
              </div>
            </div>
          ) : (
            <p>No items in the grocery list.</p>
          )}
        </div>
      ) : (
        <p className="text-center">No meal plan selected.</p>
      )}
    </div>
  )
}

export default GroceryListPage