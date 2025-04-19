import React from 'react';
import { Link } from 'react-router-dom';
import { EnhancedMealPlan } from '../../hooks/useMealPlan';

interface MealPlanDisplayProps {
  mealPlan: EnhancedMealPlan;
  isCurrentPlan?: boolean;
  onSelectAsCurrent?: () => void;
  showSelectButton?: boolean;
}

/**
 * Component to display a meal plan with its recipes
 */
const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ 
  mealPlan, 
  isCurrentPlan = false, 
  onSelectAsCurrent,
  showSelectButton = false
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${isCurrentPlan ? 'border-2 border-green-500' : ''}`}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Week {mealPlan.weekNumber}</h3>
          {isCurrentPlan && (
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
              Current Plan
            </span>
          )}
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold text-amber-800 mb-2">Lunch</h4>
          {mealPlan.lunchRecipe ? (
            <div className="flex items-center">
              <div className="w-16 h-16 mr-4 overflow-hidden rounded">
                <img 
                  src={mealPlan.lunchRecipe.imageUrl || '/placeholder-recipe.jpg'} 
                  alt={mealPlan.lunchRecipe.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <Link 
                  to={`/recipe/${mealPlan.lunchRecipeId}`}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  {mealPlan.lunchRecipe.name}
                </Link>
                <p className="text-sm text-gray-500">
                  {mealPlan.lunchRecipe.prepTime + mealPlan.lunchRecipe.cookTime} min total
                </p>
              </div>
            </div>
          ) : (
            <p>Recipe not found</p>
          )}
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold text-indigo-800 mb-2">Dinner</h4>
          {mealPlan.dinnerRecipe ? (
            <div className="flex items-center">
              <div className="w-16 h-16 mr-4 overflow-hidden rounded">
                <img 
                  src={mealPlan.dinnerRecipe.imageUrl || '/placeholder-recipe.jpg'} 
                  alt={mealPlan.dinnerRecipe.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <Link 
                  to={`/recipe/${mealPlan.dinnerRecipeId}`}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  {mealPlan.dinnerRecipe.name}
                </Link>
                <p className="text-sm text-gray-500">
                  {mealPlan.dinnerRecipe.prepTime + mealPlan.dinnerRecipe.cookTime} min total
                </p>
              </div>
            </div>
          ) : (
            <p>Recipe not found</p>
          )}
        </div>
        
        <div className="mt-4 space-y-2">
          <Link 
            to={`/grocery-list?week=${mealPlan.weekNumber}`}
            className="block w-full bg-green-600 text-white py-2 text-center rounded-md hover:bg-green-700 transition-colors duration-300"
          >
            Generate Grocery List
          </Link>
          
          {showSelectButton && !isCurrentPlan && onSelectAsCurrent && (
            <button 
              onClick={onSelectAsCurrent}
              className="block w-full border-2 border-green-600 text-green-600 py-2 text-center rounded-md hover:bg-green-50 transition-colors duration-300"
            >
              Select as Current Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlanDisplay;
