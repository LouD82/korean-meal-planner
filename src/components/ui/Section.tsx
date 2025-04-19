import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
}

/**
 * Section component for organizing content with optional title and description
 */
const Section: React.FC<SectionProps> = ({
  children,
  title,
  description,
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  contentClassName = '',
}) => {
  return (
    <section className={`mb-8 ${className}`}>
      {title && (
        <h2 className={`text-2xl font-semibold mb-2 text-gray-900 ${titleClassName}`}>
          {title}
        </h2>
      )}
      
      {description && (
        <p className={`text-gray-600 mb-4 ${descriptionClassName}`}>
          {description}
        </p>
      )}
      
      <div className={contentClassName}>{children}</div>
    </section>
  );
};

export default Section;