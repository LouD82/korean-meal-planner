import React from 'react';
import { WeeklyMealPlan } from '../../types/recipe';
import { useSettings } from '../../hooks/useSettings';
import { useMealPlanGenerator } from '../../hooks/useMealPlanGenerator';

interface MealPlanGeneratorProps {
  onMealPlanGenerated?: (mealPlan: WeeklyMealPlan) => void;
}

/**
 * Component for generating new meal plans based on user preferences
 */
const MealPlanGenerator: React.FC<MealPlanGeneratorProps> = ({ onMealPlanGenerated }) => {
  const { settings } = useSettings();
  const { generateNewMealPlan, isGenerating, error, success } = useMealPlanGenerator();

  // Primary button style
  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16a34a',
    color: 'white',
    fontWeight: '500',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.2s',
    width: '100%',
    fontSize: '1rem'
  };

  // Status message style
  const messageStyle: React.CSSProperties = {
    padding: '0.75rem',
    borderRadius: '0.375rem',
    marginBottom: '1rem',
    fontSize: '0.875rem'
  };

  // Success message style
  const successStyle: React.CSSProperties = {
    ...messageStyle,
    backgroundColor: '#f0fdf4',
    color: '#166534',
    border: '1px solid #dcfce7'
  };

  // Error message style
  const errorStyle: React.CSSProperties = {
    ...messageStyle,
    backgroundColor: '#fef2f2',
    color: '#b91c1c',
    border: '1px solid #fee2e2'
  };

  // Card style
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
    padding: '1.5rem'
  };

  /**
   * Handle meal plan generation
   */
  const handleGenerateMealPlan = async () => {
    const newMealPlan = await generateNewMealPlan();
    
    // Notify parent component if a meal plan was successfully generated
    if (newMealPlan && onMealPlanGenerated) {
      onMealPlanGenerated(newMealPlan);
    }
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: 'bold', 
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center'
      }}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          style={{ height: '1.5rem', width: '1.5rem', marginRight: '0.5rem', color: '#16a34a' }}
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Generate Meal Plan
      </h3>
      
      <p style={{ 
        fontSize: '0.875rem', 
        color: '#4b5563', 
        marginBottom: '1.5rem' 
      }}>
        Create a new meal plan based on your preferences. 
        The plan will include {settings.mealPlanning.includeLunch ? 'lunch' : ''} 
        {settings.mealPlanning.includeLunch && settings.mealPlanning.includeDinner ? ' and ' : ''}
        {settings.mealPlanning.includeDinner ? 'dinner' : ''} recipes that match your dietary preferences.
      </p>
      
      {success && <div style={successStyle}>{success}</div>}
      {error && <div style={errorStyle}>{error}</div>}
      
      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ 
          fontSize: '0.875rem', 
          fontWeight: '600', 
          color: '#4b5563', 
          marginBottom: '0.5rem' 
        }}>
          Current Settings:
        </h4>
        <ul style={{ 
          fontSize: '0.875rem', 
          color: '#4b5563', 
          paddingLeft: '1.5rem', 
          marginBottom: '1rem' 
        }}>
          <li>Rotation: {settings.mealPlanning.rotationFrequency.charAt(0).toUpperCase() + settings.mealPlanning.rotationFrequency.slice(1)}</li>
          <li>Meal Types: {[
            settings.mealPlanning.includeLunch ? 'Lunch' : null,
            settings.mealPlanning.includeDinner ? 'Dinner' : null
          ].filter(Boolean).join(', ')}</li>
          <li>Dietary: {[
            settings.dietaryPreferences.vegetarian ? 'Vegetarian' : null,
            settings.dietaryPreferences.vegan ? 'Vegan' : null,
            settings.dietaryPreferences.glutenFree ? 'Gluten-Free' : null,
            settings.dietaryPreferences.dairyFree ? 'Dairy-Free' : null
          ].filter(Boolean).join(', ') || 'No restrictions'}</li>
          <li>Spicy Level: {settings.dietaryPreferences.spicyLevel.charAt(0).toUpperCase() + settings.dietaryPreferences.spicyLevel.slice(1)}</li>
          <li>Allow Repeats: {settings.mealPlanning.allowRepeatRecipes ? 'Yes' : 'No'}</li>
        </ul>
      </div>
      
      <button 
        onClick={handleGenerateMealPlan}
        disabled={isGenerating}
        style={{
          ...buttonStyle,
          backgroundColor: isGenerating ? '#86efac' : '#16a34a',
          cursor: isGenerating ? 'wait' : 'pointer'
        }}
        onMouseOver={(e) => {
          if (!isGenerating) {
            e.currentTarget.style.backgroundColor = '#15803d';
          }
        }}
        onMouseOut={(e) => {
          if (!isGenerating) {
            e.currentTarget.style.backgroundColor = '#16a34a';
          }
        }}
      >
        {isGenerating ? (
          <>
            <svg 
              className="animate-spin" 
              style={{ 
                height: '1.25rem', 
                width: '1.25rem', 
                marginRight: '0.5rem',
                animation: 'spin 1s linear infinite'
              }}
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem' }}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 4v16m8-8H4" 
              />
            </svg>
            Generate New Meal Plan
          </>
        )}
      </button>
    </div>
  );
};

export default MealPlanGenerator;
