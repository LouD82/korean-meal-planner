import { useState } from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Enhanced Navigation component with mobile responsiveness
 */
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Base styles for nav links
  const baseNavLinkStyle = {
    fontWeight: '500',
    padding: '0.75rem 0',
    transition: 'color 0.15s',
    textDecoration: 'none'
  };
  
  // Active link style additions
  const activeLinkStyle = {
    color: '#bbf7d0',
    borderBottom: '2px solid #bbf7d0'
  };
  
  // Inactive link style additions
  const inactiveLinkStyle = {
    color: 'white'
  };

  // Mobile link styles
  const mobileLinkStyle = {
    padding: '0.75rem 1rem',
    textDecoration: 'none',
    color: 'white'
  };
  
  const mobileActiveLinkStyle = {
    ...mobileLinkStyle,
    color: '#bbf7d0',
    backgroundColor: '#14532d',
    borderRadius: '0.25rem'
  };
  
  return (
    <nav style={{ 
      backgroundColor: '#166534',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '0 1rem'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between'
        }}>
          {/* Mobile menu button */}
          <button 
            style={{
              display: window.innerWidth < 768 ? 'block' : 'none',
              padding: '0.5rem',
              color: 'white',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={toggleMenu}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: '1.5rem', width: '1.5rem' }}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16m-7 6h7" 
                />
              )}
            </svg>
          </button>
          
          {/* Desktop navigation */}
          <div style={{ 
            display: window.innerWidth >= 768 ? 'flex' : 'none',
            flexDirection: 'row',
            gap: '1.5rem'
          }}>
            <NavLink 
              to="/" 
              style={({ isActive }) => ({
                ...baseNavLinkStyle,
                ...(isActive ? activeLinkStyle : inactiveLinkStyle)
              })}
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/recipes" 
              style={({ isActive }) => ({
                ...baseNavLinkStyle,
                ...(isActive ? activeLinkStyle : inactiveLinkStyle)
              })}
            >
              Recipes
            </NavLink>
            <NavLink 
              to="/meal-plans" 
              style={({ isActive }) => ({
                ...baseNavLinkStyle,
                ...(isActive ? activeLinkStyle : inactiveLinkStyle)
              })}
            >
              Meal Plans
            </NavLink>
            <NavLink 
              to="/grocery-list" 
              style={({ isActive }) => ({
                ...baseNavLinkStyle,
                ...(isActive ? activeLinkStyle : inactiveLinkStyle)
              })}
            >
              Grocery List
            </NavLink>
          </div>
          
          {/* Empty div to maintain flex layout on mobile */}
          <div style={{ display: window.innerWidth < 768 ? 'block' : 'none' }}></div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        style={{ 
          display: window.innerWidth < 768 ? 'block' : 'none',
          position: 'absolute',
          width: '100%',
          backgroundColor: '#166534',
          boxShadow: isMenuOpen ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
          transition: 'all 0.3s ease-in-out',
          maxHeight: isMenuOpen ? '15rem' : '0',
          opacity: isMenuOpen ? '1' : '0',
          overflow: isMenuOpen ? 'visible' : 'hidden'
        }}
      >
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '0 1rem',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <NavLink 
            to="/" 
            style={({ isActive }) => 
              isActive ? mobileActiveLinkStyle : mobileLinkStyle
            }
            onClick={() => setIsMenuOpen(false)}
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/recipes" 
            style={({ isActive }) => 
              isActive ? mobileActiveLinkStyle : mobileLinkStyle
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Recipes
          </NavLink>
          <NavLink 
            to="/meal-plans" 
            style={({ isActive }) => 
              isActive ? mobileActiveLinkStyle : mobileLinkStyle
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Meal Plans
          </NavLink>
          <NavLink 
            to="/grocery-list" 
            style={({ isActive }) => 
              isActive ? mobileActiveLinkStyle : mobileLinkStyle
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Grocery List
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;