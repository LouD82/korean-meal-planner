import { Recipe, WeeklyMealPlan, Ingredient } from '../types/recipe';

/**
 * Gets all available recipes
 * @returns Promise that resolves to an array of recipes
 */
export const getAllRecipes = async (): Promise<Recipe[]> => {
  try {
    // Fetch the recipes from the JSON file
    const response = await fetch('/data/recipes.json');
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    
    const data = await response.json();
    return data.recipes || [];
  } catch (error) {
    console.error('Error loading recipes:', error);
    return [];
  }
};

/**
 * Gets a specific recipe by ID
 * @param id The recipe ID
 * @returns Promise that resolves to a recipe or undefined if not found
 */
export const getRecipeById = async (id: string): Promise<Recipe | undefined> => {
  const recipes = await getAllRecipes();
  return recipes.find(recipe => recipe.id === id);
};

import { getUserMealPlans } from './storageUtils';

/**
 * Gets all weekly meal plans
 * @returns Promise that resolves to an array of meal plans
 */
export const getAllMealPlans = async (): Promise<WeeklyMealPlan[]> => {
  try {
    // First, check for user-generated meal plans in local storage
    const userMealPlansJson = getUserMealPlans();
    if (userMealPlansJson) {
      try {
        const userMealPlans = JSON.parse(userMealPlansJson);
        // If we have valid user-generated meal plans, return those
        if (Array.isArray(userMealPlans) && userMealPlans.length > 0) {
          return userMealPlans;
        }
      } catch (parseError) {
        console.error('Error parsing user meal plans:', parseError);
        // Continue to fetch from JSON file if parsing fails
      }
    }
    
    // If no user-generated meal plans, fetch the default meal plans from the JSON file
    const response = await fetch('/data/recipes.json');
    if (!response.ok) {
      throw new Error('Failed to fetch meal plans');
    }
    
    const data = await response.json();
    return data.weeklyMealPlans || [];
  } catch (error) {
    console.error('Error loading meal plans:', error);
    return [];
  }
};

import { getCurrentMealPlanId } from './storageUtils';

/**
 * Gets the current weekly meal plan
 * @returns Promise that resolves to the current weekly meal plan
 */
export const getCurrentMealPlan = async (): Promise<WeeklyMealPlan | null> => {
  try {
    const mealPlans = await getAllMealPlans();
    const currentMealPlanId = getCurrentMealPlanId();
    
    // If there's a selected meal plan in local storage, find and return it
    if (currentMealPlanId) {
      const selectedPlan = mealPlans.find(plan => plan.id === currentMealPlanId);
      if (selectedPlan) {
        return selectedPlan;
      }
    }
    
    // If no valid plan is found in local storage, return the first plan (default)
    return mealPlans.length > 0 ? mealPlans[0] : null;
  } catch (error) {
    console.error('Error getting current meal plan:', error);
    return null;
  }
};

import { optimizeGroceryList } from './groceryUtils';

/**
 * Generates a grocery list from a weekly meal plan
 * @param mealPlan The weekly meal plan
 * @returns Promise that resolves to an array of ingredients needed for the meal plan
 */
export const generateGroceryList = async (mealPlan: WeeklyMealPlan): Promise<string[]> => {
  try {
    // Get the recipes for the current meal plan
    const lunchRecipe = await getRecipeById(mealPlan.lunchRecipeId);
    const dinnerRecipe = await getRecipeById(mealPlan.dinnerRecipeId);
    
    const allIngredients: Ingredient[] = [];
    
    // Add lunch recipe ingredients
    if (lunchRecipe) {
      allIngredients.push(...lunchRecipe.ingredients);
    }
    
    // Add dinner recipe ingredients
    if (dinnerRecipe) {
      allIngredients.push(...dinnerRecipe.ingredients);
    }
    
    // Optimize the grocery list by combining duplicate ingredients and similar items
    const optimizedList = optimizeGroceryList(allIngredients);
    
    return optimizedList;
  } catch (error) {
    console.error('Error generating grocery list:', error);
    return [];
  }
};
