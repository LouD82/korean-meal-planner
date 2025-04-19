import React from 'react';
import '../ui/theme.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  highlighted?: boolean;
}

/**
 * Reusable Card component for content containers
 */
const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  highlighted = false,
}) => {
  const hoverStyle = hoverable ? {
    cursor: 'pointer',
    transition: 'box-shadow 0.3s',
    ':hover': {
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }
  } : {};
  
  const highlightedStyle = highlighted ? {
    border: '2px solid #22c55e'
  } : {};
  
  return (
    <div 
      className={`card ${className}`}
      onClick={onClick}
      style={{
        ...hoverStyle,
        ...highlightedStyle
      }}
    >
      {children}
    </div>
  );
};

export default Card;

// Additional subcomponents for structured card content
export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return <div 
    className={`${className}`}
    style={{
      padding: 'var(--padding-base, 1rem)',
      borderBottom: '1px solid #e5e7eb'
    }}
  >{children}</div>;
};

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return <div 
    className={`${className}`}
    style={{
      padding: 'var(--padding-base, 1rem)'
    }}
  >{children}</div>;
};

export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return <div 
    className={`${className}`}
    style={{
      padding: 'var(--padding-base, 1rem)',
      borderTop: '1px solid #e5e7eb'
    }}
  >{children}</div>;
};
