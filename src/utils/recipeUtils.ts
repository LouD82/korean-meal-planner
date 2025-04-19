import { Recipe, WeeklyMealPlan } from '../types/recipe';

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

/**
 * Gets all weekly meal plans
 * @returns Promise that resolves to an array of meal plans
 */
export const getAllMealPlans = async (): Promise<WeeklyMealPlan[]> => {
  try {
    // Fetch the meal plans from the JSON file
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
    
    const groceryItems: string[] = [];
    
    // Add lunch recipe ingredients
    if (lunchRecipe) {
      lunchRecipe.ingredients.forEach(ingredient => {
        const item = ingredient.unit 
          ? `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`
          : `${ingredient.amount} ${ingredient.name}`;
        groceryItems.push(item);
      });
    }
    
    // Add dinner recipe ingredients
    if (dinnerRecipe) {
      dinnerRecipe.ingredients.forEach(ingredient => {
        const item = ingredient.unit 
          ? `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`
          : `${ingredient.amount} ${ingredient.name}`;
        groceryItems.push(item);
      });
    }
    
    // In a more advanced implementation, this would combine similar ingredients
    return groceryItems.sort();
  } catch (error) {
    console.error('Error generating grocery list:', error);
    return [];
  }
};
