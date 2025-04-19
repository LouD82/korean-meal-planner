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
 * Enhanced component to display a meal plan with its recipes
 */
const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ 
  mealPlan, 
  isCurrentPlan = false, 
  onSelectAsCurrent,
  showSelectButton = false
}) => {
  // Card styles
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
    border: isCurrentPlan ? '2px solid #22c55e' : 'none'
  };

  // Card header styles
  const cardHeaderStyle: React.CSSProperties = {
    backgroundColor: isCurrentPlan ? '#f0fdf4' : '#f9fafb',
    padding: '1rem',
    borderBottom: '1px solid #f3f4f6'
  };

  // Card content styles
  const cardContentStyle: React.CSSProperties = {
    padding: '1rem'
  };

  // Card footer styles
  const cardFooterStyle: React.CSSProperties = {
    padding: '1rem',
    borderTop: '1px solid #f3f4f6',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  };

  // Badge styles
  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dcfce7',
    color: '#166534',
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px'
  };

  // Button styles
  const buttonBaseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    fontWeight: '500',
    borderRadius: '0.375rem',
    width: '100%',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    backgroundColor: '#16a34a',
    color: 'white',
    border: 'none'
  };

  const outlineButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    backgroundColor: 'transparent',
    border: '2px solid #16a34a',
    color: '#16a34a'
  };

  // Section heading styles
  const sectionHeadingStyle: React.CSSProperties = {
    fontWeight: '600',
    marginBottom: '0.75rem',
    display: 'flex',
    alignItems: 'center'
  };

  const lunchHeadingStyle: React.CSSProperties = {
    ...sectionHeadingStyle,
    color: '#92400e'
  };

  const dinnerHeadingStyle: React.CSSProperties = {
    ...sectionHeadingStyle,
    color: '#3730a3',
    marginTop: '1rem'
  };

  // Recipe container styles
  const recipeContainerBaseStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.75rem',
    borderRadius: '0.5rem'
  };

  const lunchContainerStyle: React.CSSProperties = {
    ...recipeContainerBaseStyle,
    backgroundColor: '#fffbeb'
  };

  const dinnerContainerStyle: React.CSSProperties = {
    ...recipeContainerBaseStyle,
    backgroundColor: '#eef2ff'
  };

  // Media queries for responsive design
  React.useEffect(() => {
    const handleResize = () => {
      const lunchContainer = document.getElementById(`lunch-container-${mealPlan.weekNumber}`);
      const dinnerContainer = document.getElementById(`dinner-container-${mealPlan.weekNumber}`);
      const footerElement = document.getElementById(`meal-plan-footer-${mealPlan.weekNumber}`);
      
      if (lunchContainer && dinnerContainer) {
        if (window.innerWidth >= 640) {
          lunchContainer.style.flexDirection = 'row';
          lunchContainer.style.alignItems = 'center';
          dinnerContainer.style.flexDirection = 'row';
          dinnerContainer.style.alignItems = 'center';
        } else {
          lunchContainer.style.flexDirection = 'column';
          lunchContainer.style.alignItems = 'flex-start';
          dinnerContainer.style.flexDirection = 'column';
          dinnerContainer.style.alignItems = 'flex-start';
        }
      }
      
      if (footerElement) {
        if (window.innerWidth >= 640) {
          footerElement.style.flexDirection = 'row';
          footerElement.style.gap = '0.5rem';
        } else {
          footerElement.style.flexDirection = 'column';
          footerElement.style.gap = '0.5rem';
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize
    
    return () => window.removeEventListener('resize', handleResize);
  }, [mealPlan.weekNumber]);

  return (
    <div style={cardStyle}>
      <div style={cardHeaderStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem', color: '#16a34a' }}
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" 
                clipRule="evenodd" 
              />
            </svg>
            Week {mealPlan.weekNumber}
          </h3>
          {isCurrentPlan && (
            <span style={badgeStyle}>
              Current Plan
            </span>
          )}
        </div>
      </div>
      
      <div style={cardContentStyle}>
        <div>
          <h4 style={lunchHeadingStyle}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.25rem', color: '#d97706' }}
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Lunch
          </h4>
          {mealPlan.lunchRecipe ? (
            <div 
              id={`lunch-container-${mealPlan.weekNumber}`}
              style={lunchContainerStyle}
            >
              <div style={{ 
                width: '100%', 
                height: '6rem', 
                marginBottom: '0.75rem', 
                marginRight: '1rem',
                borderRadius: '0.5rem', 
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <img 
                  src={mealPlan.lunchRecipe.imageUrl || '/placeholder-recipe.jpg'} 
                  alt={mealPlan.lunchRecipe.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Link 
                  to={`/recipe/${mealPlan.lunchRecipeId}`}
                  style={{ 
                    color: '#16a34a', 
                    fontWeight: '500', 
                    fontSize: '1.125rem', 
                    display: 'block', 
                    marginBottom: '0.25rem',
                    textDecoration: 'none' 
                  }}
                >
                  {mealPlan.lunchRecipe.name}
                </Link>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  fontSize: '0.875rem', 
                  color: '#4b5563', 
                  marginBottom: '0.5rem' 
                }}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  {mealPlan.lunchRecipe.prepTime + mealPlan.lunchRecipe.cookTime} min total
                </div>
                <p className="line-clamp-2" style={{ 
                  fontSize: '0.875rem', 
                  color: '#4b5563'
                }}>
                  {mealPlan.lunchRecipe.description}
                </p>
              </div>
            </div>
          ) : (
            <div style={{ 
              backgroundColor: '#f3f4f6', 
              padding: '1rem', 
              borderRadius: '0.25rem', 
              color: '#6b7280', 
              textAlign: 'center' 
            }}>
              Recipe not found
            </div>
          )}
        </div>
        
        <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1rem' }}>
          <h4 style={dinnerHeadingStyle}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.25rem', color: '#4f46e5' }}
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Dinner
          </h4>
          {mealPlan.dinnerRecipe ? (
            <div 
              id={`dinner-container-${mealPlan.weekNumber}`}
              style={dinnerContainerStyle}
            >
              <div style={{ 
                width: '100%', 
                height: '6rem', 
                marginBottom: '0.75rem', 
                marginRight: '1rem',
                borderRadius: '0.5rem', 
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <img 
                  src={mealPlan.dinnerRecipe.imageUrl || '/placeholder-recipe.jpg'} 
                  alt={mealPlan.dinnerRecipe.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <Link 
                  to={`/recipe/${mealPlan.dinnerRecipeId}`}
                  style={{ 
                    color: '#16a34a', 
                    fontWeight: '500', 
                    fontSize: '1.125rem', 
                    display: 'block', 
                    marginBottom: '0.25rem',
                    textDecoration: 'none' 
                  }}
                >
                  {mealPlan.dinnerRecipe.name}
                </Link>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  fontSize: '0.875rem', 
                  color: '#4b5563', 
                  marginBottom: '0.5rem' 
                }}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  {mealPlan.dinnerRecipe.prepTime + mealPlan.dinnerRecipe.cookTime} min total
                </div>
                <p className="line-clamp-2" style={{ 
                  fontSize: '0.875rem', 
                  color: '#4b5563'
                }}>
                  {mealPlan.dinnerRecipe.description}
                </p>
              </div>
            </div>
          ) : (
            <div style={{ 
              backgroundColor: '#f3f4f6', 
              padding: '1rem', 
              borderRadius: '0.25rem', 
              color: '#6b7280', 
              textAlign: 'center' 
            }}>
              Recipe not found
            </div>
          )}
        </div>
      </div>
      
      <div 
        id={`meal-plan-footer-${mealPlan.weekNumber}`}
        style={cardFooterStyle}
      >
        <Link 
          to={`/grocery-list?week=${mealPlan.weekNumber}`}
          style={{ textDecoration: 'none', display: 'block', width: '100%' }}
        >
          <button 
            style={primaryButtonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
          >
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
              />
            </svg>
            Generate Grocery List
          </button>
        </Link>
        
        {showSelectButton && !isCurrentPlan && onSelectAsCurrent && (
          <button 
            onClick={onSelectAsCurrent}
            style={outlineButtonStyle}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0fdf4'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
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
                d="M5 13l4 4L19 7" 
              />
            </svg>
            Select as Current Plan
          </button>
        )}
      </div>
    </div>
  );
};

export default MealPlanDisplay;
