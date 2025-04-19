import { Recipe, WeeklyMealPlan } from '../types/recipe';
import { UserSettings } from '../types/settings';
import { getAllRecipes, getAllMealPlans } from './recipeUtils';
import { saveUserMealPlans } from './storageUtils';

/**
 * Filter recipes based on user settings and preferences
 * @param recipes The array of recipes to filter
 * @param settings The user settings
 * @returns Filtered recipes
 */
export const filterRecipesByPreferences = (
  recipes: Recipe[],
  settings: UserSettings
): Recipe[] => {
  return recipes.filter(recipe => {
    // Check meal type inclusion
    if (recipe.type === 'lunch' && !settings.mealPlanning.includeLunch) {
      return false;
    }
    if (recipe.type === 'dinner' && !settings.mealPlanning.includeDinner) {
      return false;
    }

    // Check dietary preferences
    if (settings.dietaryPreferences.vegetarian) {
      // Simple check - for a more robust solution, you would need
      // to analyze ingredients for meat products
      if (recipe.name.toLowerCase().includes('beef') || 
          recipe.name.toLowerCase().includes('pork') || 
          recipe.name.toLowerCase().includes('chicken')) {
        return false;
      }
    }

    if (settings.dietaryPreferences.vegan) {
      // Simple check - for a more robust solution, you would need
      // to analyze ingredients for animal products
      if (recipe.name.toLowerCase().includes('beef') || 
          recipe.name.toLowerCase().includes('pork') || 
          recipe.name.toLowerCase().includes('chicken') ||
          recipe.name.toLowerCase().includes('egg') ||
          recipe.name.toLowerCase().includes('milk')) {
        return false;
      }
    }

    // Check for allergies
    if (settings.dietaryPreferences.allergies.length > 0) {
      // Check if any allergen is in the recipe name or ingredients
      for (const allergen of settings.dietaryPreferences.allergies) {
        if (recipe.name.toLowerCase().includes(allergen.toLowerCase())) {
          return false;
        }
        
        // Check ingredients for allergens
        for (const ingredient of recipe.ingredients) {
          if (ingredient.name.toLowerCase().includes(allergen.toLowerCase())) {
            return false;
          }
        }
      }
    }

    return true;
  });
};

/**
 * Get recipes that haven't been used in recent meal plans based on rotation frequency
 * @param recipes All available recipes
 * @param mealPlans Existing meal plans
 * @param settings User settings
 * @returns Recipes that can be used in the next meal plan
 */
export const getEligibleRecipes = (
  recipes: Recipe[],
  mealPlans: WeeklyMealPlan[],
  settings: UserSettings
): { lunchRecipes: Recipe[], dinnerRecipes: Recipe[] } => {
  // Filter recipes based on user preferences
  const filteredRecipes = filterRecipesByPreferences(recipes, settings);
  
  // Split recipes by type
  const lunchRecipes = filteredRecipes.filter(recipe => recipe.type === 'lunch');
  const dinnerRecipes = filteredRecipes.filter(recipe => recipe.type === 'dinner');
  
  // If repeat recipes are allowed, return all filtered recipes
  if (settings.mealPlanning.allowRepeatRecipes) {
    return { lunchRecipes, dinnerRecipes };
  }
  
  // Determine how many weeks back to check based on rotation frequency
  let weeksToCheck = 1; // Default for weekly
  
  if (settings.mealPlanning.rotationFrequency === 'biweekly') {
    weeksToCheck = 2;
  } else if (settings.mealPlanning.rotationFrequency === 'monthly') {
    weeksToCheck = 4;
  }
  
  // Get recent meal plans based on rotation frequency
  // Sort in descending order by week number and take only the relevant number of plans
  const recentMealPlans = [...mealPlans]
    .sort((a, b) => b.weekNumber - a.weekNumber)
    .slice(0, weeksToCheck);
  
  // Get recently used recipe IDs
  const recentLunchRecipeIds = recentMealPlans.map(plan => plan.lunchRecipeId);
  const recentDinnerRecipeIds = recentMealPlans.map(plan => plan.dinnerRecipeId);
  
  // Filter out recently used recipes
  const eligibleLunchRecipes = lunchRecipes.filter(
    recipe => !recentLunchRecipeIds.includes(recipe.id)
  );
  
  const eligibleDinnerRecipes = dinnerRecipes.filter(
    recipe => !recentDinnerRecipeIds.includes(recipe.id)
  );
  
  // If no eligible recipes are found after filtering, return all filtered recipes
  // This is a fallback in case all recipes have been used recently
  return {
    lunchRecipes: eligibleLunchRecipes.length > 0 ? eligibleLunchRecipes : lunchRecipes,
    dinnerRecipes: eligibleDinnerRecipes.length > 0 ? eligibleDinnerRecipes : dinnerRecipes
  };
};

/**
 * Get the next week number based on existing meal plans
 * @param mealPlans Existing meal plans
 * @returns The next week number
 */
export const getNextWeekNumber = (mealPlans: WeeklyMealPlan[]): number => {
  if (mealPlans.length === 0) {
    return 1;
  }
  
  // Find the highest week number
  const highestWeek = Math.max(...mealPlans.map(plan => plan.weekNumber));
  return highestWeek + 1;
};

/**
 * Get the next available meal plan ID
 * @param mealPlans Existing meal plans
 * @returns The next available ID
 */
export const getNextMealPlanId = (mealPlans: WeeklyMealPlan[]): number => {
  if (mealPlans.length === 0) {
    return 1;
  }
  
  // Find the highest ID
  const highestId = Math.max(...mealPlans.map(plan => plan.id));
  return highestId + 1;
};

/**
 * Randomly select a recipe from an array of recipes
 * @param recipes Array of recipes to choose from
 * @returns Randomly selected recipe
 */
export const selectRandomRecipe = (recipes: Recipe[]): Recipe => {
  if (recipes.length === 0) {
    throw new Error('No recipes available to select from');
  }
  
  const randomIndex = Math.floor(Math.random() * recipes.length);
  return recipes[randomIndex];
};

/**
 * Generate a new meal plan based on user settings
 * @param settings User settings
 * @returns Promise that resolves to the newly generated meal plan
 */
export const generateMealPlan = async (settings: UserSettings): Promise<WeeklyMealPlan> => {
  try {
    // Load all recipes and meal plans
    const recipes = await getAllRecipes();
    const mealPlans = await getAllMealPlans();
    
    // Get eligible recipes based on user settings and existing meal plans
    const { lunchRecipes, dinnerRecipes } = getEligibleRecipes(recipes, mealPlans, settings);
    
    // Randomly select recipes for the new meal plan
    const selectedLunchRecipe = selectRandomRecipe(lunchRecipes);
    const selectedDinnerRecipe = selectRandomRecipe(dinnerRecipes);
    
    // Create the new meal plan
    const newMealPlan: WeeklyMealPlan = {
      id: getNextMealPlanId(mealPlans),
      weekNumber: getNextWeekNumber(mealPlans),
      lunchRecipeId: selectedLunchRecipe.id,
      dinnerRecipeId: selectedDinnerRecipe.id
    };
    
    return newMealPlan;
  } catch (error) {
    console.error('Error generating meal plan:', error);
    throw error;
  }
};

/**
 * Save a new meal plan to the data store
 * @param newMealPlan The new meal plan to save
 * @returns Promise that resolves when the meal plan is saved
 */
export const saveMealPlan = async (newMealPlan: WeeklyMealPlan): Promise<void> => {
  try {
    // Load existing meal plans
    const mealPlans = await getAllMealPlans();
    
    // Add the new meal plan
    mealPlans.push(newMealPlan);
    
    // Load all recipe data
    const response = await fetch('/data/recipes.json');
    if (!response.ok) {
      throw new Error('Failed to fetch recipe data');
    }
    
    const data = await response.json();
    
    // Update meal plans in the data
    data.weeklyMealPlans = mealPlans;
    
    // For a real app, this would involve an API call to save the data
    // In this client-side implementation, we'll keep it in memory for now
    // In the future, this could save to local storage or interact with a backend API
    console.log('Meal plan saved:', newMealPlan);
    
    // For demo/development, this will simulate saving by returning after a short delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Since this is a client-side app, persist the meal plans in local storage
    // We use the utility function to save the meal plans in a standardized way
    saveUserMealPlans(JSON.stringify(mealPlans));
    
    return;
  } catch (error) {
    console.error('Error saving meal plan:', error);
    throw error;
  }
};
