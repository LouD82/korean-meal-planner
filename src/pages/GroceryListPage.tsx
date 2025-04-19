import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { WeeklyMealPlan } from '../types/recipe';
import { getAllMealPlans, generateGroceryList } from '../utils/recipeUtils';
import GroceryList from '../components/grocerylist/GroceryList';
import './GroceryListPage.css';

/**
 * Enhanced GroceryListPage component with improved styling
 */
const GroceryListPage = () => {
  const [searchParams] = useSearchParams();
  const [mealPlan, setMealPlan] = useState<WeeklyMealPlan | null>(null);
  const [groceryItems, setGroceryItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const weekParam = searchParams.get('week');
  const weekNumber = weekParam ? parseInt(weekParam, 10) : null;

  useEffect(() => {
    const loadGroceryList = async () => {
      try {
        setLoading(true);
        setError(null);
        setCopied(false);
        
        // Get all meal plans
        const mealPlans = await getAllMealPlans();
        
        // Find the requested meal plan by week number, or use the first one
        const selectedPlan = weekNumber 
          ? mealPlans.find(plan => plan.weekNumber === weekNumber) 
          : mealPlans[0];
        
        if (!selectedPlan) {
          throw new Error(`No meal plan found for week ${weekNumber}`);
        }
        
        setMealPlan(selectedPlan);
        
        // Generate grocery list for the selected meal plan
        const items = await generateGroceryList(selectedPlan);
        setGroceryItems(items);
      } catch (error) {
        console.error('Error loading grocery list:', error);
        setError(`Error loading grocery list: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    loadGroceryList();
  }, [weekNumber]);

  // Handle print function
  const handlePrint = () => {
    window.print();
  };
  
  // Handle copy to clipboard
  const handleCopyToClipboard = () => {
    const text = groceryItems.join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Section styles
  const sectionStyle: React.CSSProperties = {
    marginBottom: '2rem'
  };

  // Section title styles
  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#111827'
  };

  // Section description styles
  const sectionDescriptionStyle: React.CSSProperties = {
    color: '#4b5563',
    marginBottom: '1.5rem'
  };

  // Alert styles
  const alertBaseStyle: React.CSSProperties = {
    padding: '1rem',
    borderRadius: '0.375rem',
    position: 'relative',
    marginBottom: '1rem'
  };

  const successAlertStyle: React.CSSProperties = {
    ...alertBaseStyle,
    backgroundColor: '#f0fdf4',
    color: '#166534',
    border: '1px solid #dcfce7'
  };

  const errorAlertStyle: React.CSSProperties = {
    ...alertBaseStyle,
    backgroundColor: '#fef2f2',
    color: '#991b1b',
    border: '1px solid #fee2e2'
  };

  const infoAlertStyle: React.CSSProperties = {
    ...alertBaseStyle,
    backgroundColor: '#eff6ff',
    color: '#1e40af',
    border: '1px solid #dbeafe'
  };

  // Button styles
  const buttonBaseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    fontWeight: '500',
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

  // Loading spinner styles
  const loadingContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10rem'
  };

  const spinnerStyle: React.CSSProperties = {
    height: '3rem',
    width: '3rem',
    borderRadius: '9999px',
    borderTop: '2px solid #16a34a',
    borderBottom: '2px solid #16a34a',
    borderLeft: '2px solid transparent',
    borderRight: '2px solid transparent',
    animation: 'spin 1s linear infinite'
  };

  return (
    <div>
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Grocery List</h2>
        <p style={sectionDescriptionStyle}>Everything you need for your weekly Korean meal plan.</p>
        
        {loading ? (
          <div style={loadingContainerStyle}>
            <div 
              style={spinnerStyle} 
              className="animate-spin"
            />
          </div>
        ) : error ? (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={errorAlertStyle}>
              <h3 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Error Loading Grocery List</h3>
              <p>{error}</p>
              <p style={{ marginTop: '0.5rem' }}>Please select a valid meal plan.</p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <Link to="/meal-plans" style={{ textDecoration: 'none' }}>
                <button 
                  style={primaryButtonStyle}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                >
                  Go to Meal Plans
                </button>
              </Link>
            </div>
          </div>
        ) : mealPlan ? (
          <div>
            {copied && (
              <div style={successAlertStyle}>
                Grocery list copied to clipboard!
              </div>
            )}
            
            {groceryItems.length > 0 ? (
              <GroceryList
                items={groceryItems}
                weekNumber={mealPlan.weekNumber}
                onPrint={handlePrint}
                onCopyToClipboard={handleCopyToClipboard}
              />
            ) : (
              <div style={infoAlertStyle}>
                No items in the grocery list. This might be due to missing recipe data.
              </div>
            )}
            
            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/meal-plans" style={{ textDecoration: 'none' }}>
                <button 
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
                      d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                    />
                  </svg>
                  Back to Meal Plans
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>No meal plan selected.</p>
            <Link to="/meal-plans" style={{ textDecoration: 'none' }}>
              <button 
                style={primaryButtonStyle}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
              >
                Choose a Meal Plan
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroceryListPage;