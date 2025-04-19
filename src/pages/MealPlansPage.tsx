import { useState, useEffect } from 'react'
import { WeeklyMealPlan, Recipe } from '../types/recipe'
import { getAllMealPlans, getRecipeById } from '../utils/recipeUtils'
import { getCurrentMealPlanId } from '../utils/storageUtils'
import MealPlanDisplay from '../components/mealplan/MealPlanDisplay'
import { useCurrentMealPlan } from '../hooks/useMealPlan'

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
  const { currentMealPlan, setAsCurrentMealPlan } = useCurrentMealPlan()

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

  const handleSelectAsCurrent = (planId: number) => {
    setAsCurrentMealPlan(planId)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Meal Plans</h2>
      
      {loading ? (
        <p className="text-center">Loading meal plans...</p>
      ) : mealPlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mealPlans.map((plan) => (
            <MealPlanDisplay 
              key={plan.id}
              mealPlan={plan}
              isCurrentPlan={currentMealPlan?.id === plan.id}
              onSelectAsCurrent={() => handleSelectAsCurrent(plan.id)}
              showSelectButton={true}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No meal plans available.</p>
      )}
    </div>
  )
}

export default MealPlansPage