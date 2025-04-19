import React from 'react';

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
  const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden';
  const hoverClasses = hoverable ? 'hover:shadow-lg transition-shadow duration-300 cursor-pointer' : '';
  const highlightedClasses = highlighted ? 'border-2 border-green-500' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${highlightedClasses} ${className}`}
      onClick={onClick}
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
  return <div className={`p-4 border-b border-gray-100 ${className}`}>{children}</div>;
};

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return <div className={`p-4 border-t border-gray-100 ${className}`}>{children}</div>;
};
