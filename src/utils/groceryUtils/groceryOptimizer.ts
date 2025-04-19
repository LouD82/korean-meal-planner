/**
 * Grocery list optimization utilities
 * Combines duplicate ingredients and aggregates amounts
 */

import { Ingredient } from '../../types/recipe';
import { 
  normalizeUnit,
  normalizeAmount,
  areUnitsCompatible,
  convertUnit,
  chooseBestUnit
} from './unitConversion';

/**
 * Normalized ingredient with parsed amounts and standardized units
 */
interface NormalizedIngredient {
  name: string;
  amount: number;
  unit: string;
  originalUnit: string;
  originalAmount: string;
}

/**
 * Normalizes ingredient names for better matching
 * @param name The ingredient name to normalize
 * @returns Normalized ingredient name
 */
const normalizeIngredientName = (name: string): string => {
  if (!name) return '';
  
  // Lowercase and trim
  let normalized = name.toLowerCase().trim();
  
  // Remove qualifying words and parenthetical content
  normalized = normalized
    .replace(/\(.*?\)/g, '') // Remove parenthetical content
    .replace(/optional/gi, '')
    .replace(/to taste/gi, '')
    .replace(/fresh/gi, '')
    .replace(/dried/gi, '')
    .replace(/ground/gi, '')
    .replace(/minced/gi, '')
    .replace(/diced/gi, '')
    .replace(/chopped/gi, '')
    .replace(/sliced/gi, '')
    .replace(/large/gi, '')
    .replace(/medium/gi, '')
    .replace(/small/gi, '')
    .replace(/ripe/gi, '')
    .trim();
  
  // Handle specific ingredient aliases
  const ingredientAliases: Record<string, string> = {
    'scallions': 'green onions',
    'green onion': 'green onions',
    'spring onions': 'green onions',
    'soya sauce': 'soy sauce',
    'brown rice': 'rice',
    'white rice': 'rice',
    'jasmine rice': 'rice',
    'short-grain rice': 'rice',
    'short grain rice': 'rice',
    'sea salt': 'salt',
    'kosher salt': 'salt',
    'table salt': 'salt',
    'gochugaru': 'korean chili flakes',
    'korean chili powder': 'korean chili flakes',
  };
  
  return ingredientAliases[normalized] || normalized;
};

/**
 * Determines if two ingredients are essentially the same and can be combined
 * @param ing1 The first ingredient
 * @param ing2 The second ingredient
 * @returns True if ingredients can be combined, false otherwise
 */
const areIngredientsCompatible = (
  ing1: NormalizedIngredient,
  ing2: NormalizedIngredient
): boolean => {
  // Names must match
  if (ing1.name !== ing2.name) {
    return false;
  }
  
  // If both have units, they must be compatible
  if (ing1.unit && ing2.unit) {
    return areUnitsCompatible(ing1.unit, ing2.unit);
  }
  
  // If one has a unit and the other doesn't, we can't combine them
  if ((ing1.unit && !ing2.unit) || (!ing1.unit && ing2.unit)) {
    return false;
  }
  
  // Both have no units, can be combined
  return true;
};

/**
 * Combines two compatible ingredients
 * @param ing1 The first ingredient
 * @param ing2 The second ingredient
 * @returns Combined ingredient
 */
const combineIngredients = (
  ing1: NormalizedIngredient,
  ing2: NormalizedIngredient
): NormalizedIngredient => {
  // If names don't match or units aren't compatible, return first ingredient
  if (!areIngredientsCompatible(ing1, ing2)) {
    return ing1;
  }
  
  // Determine the best unit to use
  const bestUnit = chooseBestUnit(ing1.unit, ing2.unit);
  
  // Convert amounts to the best unit
  let amount1 = ing1.amount;
  let amount2 = ing2.amount;
  
  if (ing1.unit !== bestUnit && ing1.unit) {
    const converted = convertUnit(ing1.amount, ing1.unit, bestUnit);
    if (converted !== null) {
      amount1 = converted;
    }
  }
  
  if (ing2.unit !== bestUnit && ing2.unit) {
    const converted = convertUnit(ing2.amount, ing2.unit, bestUnit);
    if (converted !== null) {
      amount2 = converted;
    }
  }
  
  // Create new combined ingredient
  return {
    name: ing1.name,
    amount: amount1 + amount2,
    unit: bestUnit,
    originalUnit: bestUnit,
    originalAmount: `${amount1 + amount2}`
  };
};

/**
 * Normalizes an ingredient for processing
 * @param ingredient The ingredient to normalize
 * @returns Normalized ingredient object
 */
const normalizeIngredient = (ingredient: Ingredient): NormalizedIngredient => {
  return {
    name: normalizeIngredientName(ingredient.name),
    amount: normalizeAmount(ingredient.amount),
    unit: normalizeUnit(ingredient.unit || ''),
    originalUnit: ingredient.unit || '',
    originalAmount: ingredient.amount
  };
};

/**
 * Formats an amount for display in the grocery list
 * @param amount The numeric amount
 * @returns Formatted amount string
 */
const formatAmount = (amount: number): string => {
  // Handle whole numbers
  if (Number.isInteger(amount)) {
    return amount.toString();
  }
  
  // Handle common fractions for better readability
  const fractionMap: Record<number, string> = {
    0.25: '1/4',
    0.33: '1/3',
    0.5: '1/2',
    0.67: '2/3',
    0.75: '3/4'
  };
  
  // Check if it's close to a common fraction
  for (const [value, display] of Object.entries(fractionMap)) {
    const numValue = parseFloat(value);
    // Use a small epsilon for floating point comparison
    if (Math.abs(amount - numValue) < 0.01) {
      return display;
    }
  }
  
  // Handle mixed numbers
  const wholePart = Math.floor(amount);
  const fractionPart = amount - wholePart;
  
  if (wholePart > 0) {
    // Check for common fractions in the fractional part
    for (const [value, display] of Object.entries(fractionMap)) {
      const numValue = parseFloat(value);
      if (Math.abs(fractionPart - numValue) < 0.01) {
        return `${wholePart} ${display}`;
      }
    }
  }
  
  // Round to 2 decimal places for all other cases
  return amount.toFixed(2).replace(/\.00$/, '').replace(/\.0$/, '');
};

/**
 * Optimizes a list of ingredients by combining duplicates and similar items
 * @param ingredients The array of ingredients to optimize
 * @returns Optimized array of ingredient strings for the grocery list
 */
export const optimizeGroceryList = (ingredients: Ingredient[]): string[] => {
  // Step 1: Normalize all ingredients
  const normalizedIngredients = ingredients.map(normalizeIngredient);
  
  // Step 2: Group ingredients by normalized name
  const groupedIngredients: Record<string, NormalizedIngredient[]> = {};
  
  normalizedIngredients.forEach(normalized => {
    const key = normalized.name;
    if (!groupedIngredients[key]) {
      groupedIngredients[key] = [];
    }
    groupedIngredients[key].push(normalized);
  });
  
  // Step 3: Combine compatible ingredients within each group
  const optimizedIngredients: NormalizedIngredient[] = [];
  
  Object.values(groupedIngredients).forEach(group => {
    if (group.length === 1) {
      // Only one ingredient with this name, no combining needed
      optimizedIngredients.push(group[0]);
    } else {
      // Multiple ingredients with same name, try to combine compatible ones
      const compatibleGroups: NormalizedIngredient[][] = [];
      
      // First, group compatible ingredients together
      group.forEach(ingredient => {
        // Check if this ingredient can be added to any existing group
        let added = false;
        
        for (const compatibleGroup of compatibleGroups) {
          if (areIngredientsCompatible(compatibleGroup[0], ingredient)) {
            compatibleGroup.push(ingredient);
            added = true;
            break;
          }
        }
        
        // If not added to any group, create a new group
        if (!added) {
          compatibleGroups.push([ingredient]);
        }
      });
      
      // Combine ingredients within each compatible group
      compatibleGroups.forEach(compatibleGroup => {
        if (compatibleGroup.length === 1) {
          optimizedIngredients.push(compatibleGroup[0]);
        } else {
          // Combine all ingredients in this compatible group
          let combined = compatibleGroup[0];
          for (let i = 1; i < compatibleGroup.length; i++) {
            combined = combineIngredients(combined, compatibleGroup[i]);
          }
          optimizedIngredients.push(combined);
        }
      });
    }
  });
  
  // Step 4: Format the optimized ingredients for display
  return optimizedIngredients.map(ingredient => {
    const formattedAmount = formatAmount(ingredient.amount);
    
    return ingredient.unit
      ? `${formattedAmount} ${ingredient.unit} ${ingredient.name}`
      : `${formattedAmount} ${ingredient.name}`;
  }).sort();
};
