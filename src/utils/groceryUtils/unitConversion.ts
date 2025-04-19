/**
 * Unit conversion utilities for grocery list optimization
 * Helps standardize and combine ingredients with compatible measurements
 */

// Known unit conversion mappings
const unitConversions: Record<string, Record<string, number>> = {
  // Volume conversions
  tbsp: { tsp: 3, cup: 0.0625, ml: 15 },
  tsp: { tbsp: 1/3, cup: 0.0208, ml: 5 },
  cup: { tbsp: 16, tsp: 48, ml: 240 },
  ml: { tbsp: 1/15, tsp: 1/5, cup: 1/240 },
  
  // Weight conversions
  oz: { lb: 0.0625, g: 28.35 },
  lb: { oz: 16, g: 453.6 },
  g: { oz: 1/28.35, lb: 1/453.6 },
  
  // Other common equivalents
  clove: { tbsp: 0.5 }, // Assuming 1 clove of garlic ≈ 0.5 tbsp
};

/**
 * Normalizes unit strings to standardized format
 * @param unit The unit string to normalize
 * @returns Normalized unit string
 */
export const normalizeUnit = (unit: string): string => {
  // Handle null or empty units
  if (!unit || unit.trim() === '') {
    return '';
  }
  
  // Remove trailing 's' for plurals and lowercase
  const normalized = unit.trim().toLowerCase();
  
  if (normalized.endsWith('s') && normalized !== 'ounces') {
    return normalized.slice(0, -1);
  }
  
  // Handle common abbreviations and variants
  const unitMappings: Record<string, string> = {
    'tablespoon': 'tbsp',
    'tablespoons': 'tbsp',
    'tbsps': 'tbsp',
    'tbs': 'tbsp',
    'teaspoon': 'tsp',
    'teaspoons': 'tsp',
    'tsps': 'tsp',
    'cups': 'cup',
    'ounces': 'oz',
    'ounce': 'oz',
    'pounds': 'lb',
    'pound': 'lb',
    'grams': 'g',
    'gram': 'g',
    'milliliters': 'ml',
    'milliliter': 'ml',
    'mls': 'ml',
    'millilitres': 'ml',
    'millilitre': 'ml',
    'cloves': 'clove',
  };
  
  return unitMappings[normalized] || normalized;
};

/**
 * Normalizes amount strings to standardized number format
 * @param amount The amount string to normalize
 * @returns Normalized amount as a number
 */
export const normalizeAmount = (amount: string): number => {
  // Handle empty or undefined
  if (!amount || amount.trim() === '') {
    return 1; // Assume 1 as default if no amount is specified
  }
  
  const trimmed = amount.trim();
  
  // Handle ranges by taking the average
  if (trimmed.includes('-')) {
    const [min, max] = trimmed.split('-').map(parsePartialAmount);
    return (min + max) / 2;
  }
  
  // Handle fractions and mixed numbers
  return parsePartialAmount(trimmed);
};

/**
 * Parses a partial amount string, handling fractions and mixed numbers
 * @param amountStr String representation of an amount
 * @returns Numeric value
 */
const parsePartialAmount = (amountStr: string): number => {
  const trimmed = amountStr.trim();
  
  // Handle common fractions
  const fractionMap: Record<string, number> = {
    '¼': 0.25,
    '½': 0.5,
    '¾': 0.75,
    '⅓': 1/3,
    '⅔': 2/3,
    '⅛': 0.125,
    '⅜': 0.375,
    '⅝': 0.625,
    '⅞': 0.875,
  };
  
  // Check if it's a single special fraction character
  if (fractionMap[trimmed]) {
    return fractionMap[trimmed];
  }
  
  // Handle written fractions like "1/2"
  if (trimmed.includes('/')) {
    const [numerator, denominator] = trimmed.split('/').map(part => parseFloat(part.trim()));
    if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
      return numerator / denominator;
    }
  }
  
  // Handle mixed numbers like "1 1/2"
  const mixedMatch = trimmed.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const whole = parseFloat(mixedMatch[1]);
    const numerator = parseFloat(mixedMatch[2]);
    const denominator = parseFloat(mixedMatch[3]);
    if (!isNaN(whole) && !isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
      return whole + (numerator / denominator);
    }
  }
  
  // Regular number
  return parseFloat(trimmed) || 0;
};

/**
 * Attempts to convert an amount from one unit to another
 * @param amount The amount to convert
 * @param fromUnit The source unit
 * @param toUnit The target unit
 * @returns Converted amount or null if conversion is not possible
 */
export const convertUnit = (
  amount: number, 
  fromUnit: string, 
  toUnit: string
): number | null => {
  // Normalize units
  const sourceUnit = normalizeUnit(fromUnit);
  const targetUnit = normalizeUnit(toUnit);
  
  // If units are already the same, no conversion needed
  if (sourceUnit === targetUnit) {
    return amount;
  }
  
  // If one or both units are empty, we can't convert
  if (!sourceUnit || !targetUnit) {
    return null;
  }
  
  // Check if direct conversion exists
  if (unitConversions[sourceUnit]?.[targetUnit]) {
    return amount * unitConversions[sourceUnit][targetUnit];
  }
  
  // Try reverse conversion
  if (unitConversions[targetUnit]?.[sourceUnit]) {
    return amount / unitConversions[targetUnit][sourceUnit];
  }
  
  // No conversion path found
  return null;
};

/**
 * Determines if two units are compatible (can be converted between each other)
 * @param unit1 The first unit
 * @param unit2 The second unit
 * @returns True if units are compatible, false otherwise
 */
export const areUnitsCompatible = (unit1: string, unit2: string): boolean => {
  const sourceUnit = normalizeUnit(unit1);
  const targetUnit = normalizeUnit(unit2);
  
  // Same units are always compatible
  if (sourceUnit === targetUnit) {
    return true;
  }
  
  // Empty units are considered incompatible with all other units
  if (!sourceUnit || !targetUnit) {
    return false;
  }
  
  // Check if direct conversion exists
  if (unitConversions[sourceUnit]?.[targetUnit] || unitConversions[targetUnit]?.[sourceUnit]) {
    return true;
  }
  
  // Check if there's a common unit they can both convert to
  const sourceConversions = unitConversions[sourceUnit];
  const targetConversions = unitConversions[targetUnit];
  
  if (sourceConversions && targetConversions) {
    for (const intermediateUnit in sourceConversions) {
      if (targetConversions[intermediateUnit]) {
        return true;
      }
    }
  }
  
  return false;
};

/**
 * Chooses the best unit when combining two compatible units
 * @param unit1 First unit
 * @param unit2 Second unit
 * @returns The preferred unit for the combined ingredients
 */
export const chooseBestUnit = (unit1: string, unit2: string): string => {
  const norm1 = normalizeUnit(unit1);
  const norm2 = normalizeUnit(unit2);
  
  // If same unit, use that
  if (norm1 === norm2) {
    return norm1;
  }
  
  // If one is empty, use the other
  if (!norm1) return norm2;
  if (!norm2) return norm1;
  
  // Prefer larger units for better readability
  const preferredOrder: Record<string, number> = {
    lb: 1, cup: 2, oz: 3, tbsp: 4, tsp: 5,
    g: 6, ml: 7, clove: 8
  };
  
  // Use the unit with higher precedence
  if (preferredOrder[norm1] && preferredOrder[norm2]) {
    return preferredOrder[norm1] < preferredOrder[norm2] ? norm1 : norm2;
  }
  
  // Default to first unit if no precedence defined
  return norm1;
};
