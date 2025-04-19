/**
 * Utility functions for working with local storage
 */

// Constants
const CURRENT_MEAL_PLAN_KEY = 'korean-meal-planner-current-plan';

/**
 * Saves the current meal plan ID to local storage
 * @param planId The ID of the selected meal plan
 */
export const saveCurrentMealPlanId = (planId: number): void => {
  try {
    localStorage.setItem(CURRENT_MEAL_PLAN_KEY, planId.toString());
  } catch (error) {
    console.error('Error saving current meal plan to local storage:', error);
  }
};

/**
 * Gets the current meal plan ID from local storage
 * @returns The ID of the current meal plan, or null if none is set
 */
export const getCurrentMealPlanId = (): number | null => {
  try {
    const planId = localStorage.getItem(CURRENT_MEAL_PLAN_KEY);
    return planId ? parseInt(planId, 10) : null;
  } catch (error) {
    console.error('Error retrieving current meal plan from local storage:', error);
    return null;
  }
};

/**
 * Clears the current meal plan from local storage
 */
export const clearCurrentMealPlan = (): void => {
  try {
    localStorage.removeItem(CURRENT_MEAL_PLAN_KEY);
  } catch (error) {
    console.error('Error clearing current meal plan from local storage:', error);
  }
};
