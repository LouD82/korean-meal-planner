import React, { useState } from 'react';

interface GroceryListProps {
  items: string[];
  weekNumber: number;
  onPrint?: () => void;
  onCopyToClipboard?: () => void;
}

/**
 * GroceryList component for displaying and interacting with grocery items
 */
const GroceryList: React.FC<GroceryListProps> = ({
  items,
  weekNumber,
  onPrint,
  onCopyToClipboard
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // Handle checkbox change
  const handleCheckboxChange = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  // Get the number of checked items
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  
  // Calculate progress
  const progress = items.length > 0 ? Math.round((checkedCount / items.length) * 100) : 0;
  
  // Default handlers if not provided
  const handlePrint = onPrint || (() => window.print());
  const handleCopy = onCopyToClipboard || (() => {
    const text = items.join('\n');
    navigator.clipboard.writeText(text);
  });

  // Card styles
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
    marginBottom: '1.5rem'
  };

  // Card header styles
  const cardHeaderStyle: React.CSSProperties = {
    backgroundColor: '#f0fdf4',
    padding: '1rem',
    borderBottom: '1px solid #dcfce7'
  };

  // Card content styles
  const cardContentStyle: React.CSSProperties = {
    padding: '1rem'
  };

  // Card footer styles
  const cardFooterStyle: React.CSSProperties = {
    backgroundColor: '#f9fafb',
    padding: '1rem',
    borderTop: '1px solid #f3f4f6',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem'
  };

  // Button styles
  const buttonBaseStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    border: 'none',
    width: '100%'
  };

  const primaryButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    backgroundColor: '#16a34a',
    color: 'white'
  };

  const outlineButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    backgroundColor: 'transparent',
    border: '2px solid #16a34a',
    color: '#16a34a'
  };

  // Progress bar styles
  const progressBarContainerStyle: React.CSSProperties = {
    width: '100%',
    height: '0.5rem',
    backgroundColor: '#e5e7eb',
    borderRadius: '9999px',
    marginTop: '0.5rem'
  };

  const progressBarStyle: React.CSSProperties = {
    height: '0.5rem',
    backgroundColor: '#16a34a',
    borderRadius: '9999px',
    transition: 'width 0.3s',
    width: `${progress}%`
  };

  // List item styles
  const listItemStyle: React.CSSProperties = {
    padding: '0.75rem 0',
    borderBottom: '1px solid #f3f4f6'
  };

  const checkboxWrapperStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center'
  };

  const checkboxStyle: React.CSSProperties = {
    height: '1.25rem',
    width: '1.25rem',
    color: '#16a34a',
    borderRadius: '0.25rem',
    marginRight: '0.75rem',
    cursor: 'pointer'
  };

  const labelStyle: React.CSSProperties = {
    color: '#374151',
    cursor: 'pointer'
  };

  const checkedLabelStyle: React.CSSProperties = {
    ...labelStyle,
    textDecoration: 'line-through',
    color: '#9ca3af'
  };

  // Media queries for responsive design
  React.useEffect(() => {
    const handleResize = () => {
      const footerElement = document.getElementById('grocery-list-footer');
      if (footerElement) {
        if (window.innerWidth >= 640) {
          footerElement.style.flexWrap = 'nowrap';
        } else {
          footerElement.style.flexWrap = 'wrap';
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={cardStyle}>
      <div style={cardHeaderStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>
            Week {weekNumber} Grocery List
          </h3>
          <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>
            {checkedCount} of {items.length} items checked
          </span>
        </div>
        
        {/* Progress bar */}
        <div style={progressBarContainerStyle}>
          <div style={progressBarStyle}></div>
        </div>
      </div>
      
      <div style={cardContentStyle}>
        {items.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {items.map((item, index) => (
              <li key={index} style={listItemStyle}>
                <div style={checkboxWrapperStyle}>
                  <input
                    type="checkbox"
                    id={`grocery-item-${index}`}
                    checked={checkedItems[index] || false}
                    onChange={() => handleCheckboxChange(index)}
                    style={checkboxStyle}
                  />
                  <label 
                    htmlFor={`grocery-item-${index}`} 
                    style={checkedItems[index] ? checkedLabelStyle : labelStyle}
                  >
                    {item}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: 'center', padding: '1rem 0', color: '#6b7280' }}>
            No items in the grocery list.
          </p>
        )}
      </div>
      
      <div id="grocery-list-footer" style={cardFooterStyle}>
        <button 
          onClick={handlePrint}
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
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" 
            />
          </svg>
          Print List
        </button>
        
        <button 
          onClick={handleCopy}
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
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" 
            />
          </svg>
          Copy to Clipboard
        </button>
      </div>
    </div>
  );
};

export default GroceryList;