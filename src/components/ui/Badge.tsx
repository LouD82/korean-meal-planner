import React from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'lunch' | 'dinner';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

/**
 * Reusable Badge component for status indicators and labels
 */
const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'sm',
  className = '',
}) => {
  // Base classes for all badges
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full';
  
  // Size-specific classes
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };
  
  // Variant-specific classes
  const variantClasses = {
    primary: 'bg-green-100 text-green-800',
    secondary: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-amber-100 text-amber-800',
    info: 'bg-blue-100 text-blue-800',
    lunch: 'bg-amber-200 text-amber-800',
    dinner: 'bg-indigo-200 text-indigo-800',
  };
  
  return (
    <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;