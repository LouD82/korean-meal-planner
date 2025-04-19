/**
 * Types for user settings and preferences
 */

export interface UserSettings {
  // Dietary preferences
  dietaryPreferences: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    lowSodium: boolean;
    allergies: string[];
    spicyLevel: SpicyLevel;
  };
  
  // Recipe servings settings
  servings: {
    defaultServings: number;
    adjustRecipes: boolean;
    mealPrepDays: WeekDay[];
  };
  
  // Meal planning preferences
  mealPlanning: {
    rotationFrequency: RotationFrequency;
    includeLunch: boolean;
    includeDinner: boolean;
    allowRepeatRecipes: boolean;
  };
  
  // Shopping preferences
  shopping: {
    preferredStoreLocation: string;
    combineIngredients: boolean;
    categorizeGroceryList: boolean;
    addExtraItems: string[];
  };
  
  // UI preferences
  ui: {
    darkMode: boolean;
    fontSize: FontSize;
    compactView: boolean;
    showNutritionalInfo: boolean;
    language: Language;
    notificationsEnabled: boolean;
  };
}

export type SpicyLevel = 'none' | 'mild' | 'medium' | 'hot';
export type FontSize = 'small' | 'medium' | 'large';
export type WeekDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
export type RotationFrequency = 'weekly' | 'biweekly' | 'monthly';
export type Language = 'english' | 'korean';

/**
 * Default user settings
 */
export const DEFAULT_USER_SETTINGS: UserSettings = {
  dietaryPreferences: {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    lowSodium: false,
    allergies: [],
    spicyLevel: 'medium',
  },
  servings: {
    defaultServings: 4,
    adjustRecipes: true,
    mealPrepDays: ['sunday'],
  },
  mealPlanning: {
    rotationFrequency: 'weekly',
    includeLunch: true,
    includeDinner: true,
    allowRepeatRecipes: false,
  },
  shopping: {
    preferredStoreLocation: 'H-Mart',
    combineIngredients: true,
    categorizeGroceryList: true,
    addExtraItems: [],
  },
  ui: {
    darkMode: false,
    fontSize: 'medium',
    compactView: false,
    showNutritionalInfo: true,
    language: 'english',
    notificationsEnabled: false,
  },
};
