import { useState } from 'react';
import { WeeklyMealPlan } from '../types/recipe';
import { useSettings } from './useSettings';
import { useCurrentMealPlan } from './useMealPlan';
import { generateMealPlan, saveMealPlan } from '../utils/mealPlanGenerator';

/**
 * Interface for the meal plan generator hook return value
 */
interface UseMealPlanGeneratorReturn {
  generateNewMealPlan: () => Promise<WeeklyMealPlan | null>;
  isGenerating: boolean;
  error: string | null;
  success: string | null;
}

/**
 * Custom hook for meal plan generation functionality
 * @returns Meal plan generator functions and state
 */
export const useMealPlanGenerator = (): UseMealPlanGeneratorReturn => {
  const { settings } = useSettings();
  const { setAsCurrentMealPlan } = useCurrentMealPlan();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  /**
   * Generate a new meal plan based on user settings
   * @returns Promise that resolves to the newly generated meal plan or null if an error occurred
   */
  const generateNewMealPlan = async (): Promise<WeeklyMealPlan | null> => {
    try {
      setIsGenerating(true);
      setError(null);
      setSuccess(null);
      
      // Generate a new meal plan based on user settings
      const newMealPlan = await generateMealPlan(settings);
      
      // Save the new meal plan
      await saveMealPlan(newMealPlan);
      
      // Set success message
      setSuccess(`New meal plan for Week ${newMealPlan.weekNumber} created successfully!`);
      
      // Automatically set as current meal plan if that's the user's preference
      if (settings.mealPlanning.autoSelectNewPlan) {
        setAsCurrentMealPlan(newMealPlan.id);
      }
      
      return newMealPlan;
    } catch (error) {
      console.error('Error generating meal plan:', error);
      setError('There was an error generating your meal plan. Please try again.');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateNewMealPlan,
    isGenerating,
    error,
    success
  };
};
