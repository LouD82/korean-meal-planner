export interface Ingredient {
  name: string;
  amount: string;
  unit?: string;
}

export interface Step {
  description: string;
}

export interface Recipe {
  id: string;
  name: string;
  type: 'lunch' | 'dinner';
  description: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  ingredients: Ingredient[];
  steps: Step[];
  batchCookingInstructions?: string;
  imageUrl?: string;
}

export interface WeeklyMealPlan {
  id: number;
  weekNumber: number;
  lunchRecipeId: string;
  dinnerRecipeId: string;
}
