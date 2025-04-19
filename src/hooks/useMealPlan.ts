import { useState, useEffect } from 'react';
import { WeeklyMealPlan, Recipe } from '../types/recipe';
import { getCurrentMealPlan, getRecipeById } from '../utils/recipeUtils';
import { saveCurrentMealPlanId } from '../utils/storageUtils';

export interface EnhancedMealPlan extends WeeklyMealPlan {
  lunchRecipe?: Recipe;
  dinnerRecipe?: Recipe;
}

/**
 * Custom hook to get the current meal plan with full recipe details
 */
export const useCurrentMealPlan = () => {
  const [currentMealPlan, setCurrentMealPlan] = useState<EnhancedMealPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadCurrentMealPlan = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load the current meal plan
        const mealPlanData = await getCurrentMealPlan();
        
        if (!mealPlanData) {
          setCurrentMealPlan(null);
          return;
        }
        
        // Load recipe details for the meal plan
        const lunchRecipe = await getRecipeById(mealPlanData.lunchRecipeId);
        const dinnerRecipe = await getRecipeById(mealPlanData.dinnerRecipeId);
        
        // Create enhanced meal plan with recipe details
        const enhancedMealPlan: EnhancedMealPlan = {
          ...mealPlanData,
          lunchRecipe,
          dinnerRecipe
        };
        
        setCurrentMealPlan(enhancedMealPlan);
      } catch (error) {
        console.error('Error loading current meal plan:', error);
        setError(error instanceof Error ? error : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    loadCurrentMealPlan();
  }, []);

  /**
   * Function to set a new meal plan as the current one
   * @param planId The ID of the meal plan to set as current
   */
  const setAsCurrentMealPlan = (planId: number) => {
    // Save to local storage
    saveCurrentMealPlanId(planId);
    
    // Reload the current meal plan
    setLoading(true);
    getCurrentMealPlan()
      .then(async (mealPlanData) => {
        if (!mealPlanData) {
          setCurrentMealPlan(null);
          return;
        }
        
        // Load recipe details for the meal plan
        const lunchRecipe = await getRecipeById(mealPlanData.lunchRecipeId);
        const dinnerRecipe = await getRecipeById(mealPlanData.dinnerRecipeId);
        
        // Create enhanced meal plan with recipe details
        const enhancedMealPlan: EnhancedMealPlan = {
          ...mealPlanData,
          lunchRecipe,
          dinnerRecipe
        };
        
        setCurrentMealPlan(enhancedMealPlan);
      })
      .catch((error) => {
        console.error('Error setting current meal plan:', error);
        setError(error instanceof Error ? error : new Error('Unknown error'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { currentMealPlan, loading, error, setAsCurrentMealPlan };
};
