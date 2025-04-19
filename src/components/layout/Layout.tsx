import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout component that wraps the entire application and provides common elements
 */
const Layout = ({ children }: LayoutProps) => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: '#f9fafb'
    }}>
      <header style={{ 
        background: 'linear-gradient(to right, #16a34a, #15803d)',
        color: 'white',
        padding: '1rem 0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '0 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link 
            to="/" 
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#bbf7d0'}
            onMouseOut={(e) => e.currentTarget.style.color = 'white'}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ width: '2rem', height: '2rem', marginRight: '0.5rem' }}
            >
              <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
              <path fillRule="evenodd" d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z" clipRule="evenodd" />
            </svg>
            Korean Meal Planner
          </Link>
        </div>
      </header>
      
      <Navigation />
      
      <main style={{ flexGrow: 1, padding: '1.5rem 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          {children}
        </div>
      </main>
      
      <footer style={{ 
        backgroundColor: 'white', 
        borderTop: '1px solid #e5e7eb',
        padding: '2rem 0',
        marginTop: '3rem'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem', textAlign: 'center', color: '#4b5563' }}>
          <p style={{ marginBottom: '0.5rem' }}>Korean Meal Planner - Save money and eat well with batch-cooked Korean meals</p>
          <p style={{ fontSize: '0.875rem' }}>© {new Date().getFullYear()} Korean Meal Planner. All recipes carefully selected for easy batch cooking.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;