import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  className?: string;
  labelClassName?: string;
}

/**
 * Styled checkbox component with label
 */
const Checkbox: React.FC<CheckboxProps> = ({
  label,
  id,
  className = '',
  labelClassName = '',
  ...props
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        id={id}
        className="h-5 w-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
          className={`ml-3 block text-gray-700 ${labelClassName}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;