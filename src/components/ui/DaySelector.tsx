import React from 'react';
import { WeekDay } from '../../types/settings';
import './theme.css';

interface DaySelectorProps {
  selectedDays: WeekDay[];
  onChange: (days: WeekDay[]) => void;
  disabled?: boolean;
}

/**
 * DaySelector Component
 * Allows users to select one or more days of the week
 */
const DaySelector: React.FC<DaySelectorProps> = ({ 
  selectedDays, 
  onChange,
  disabled = false
}) => {
  const daysOfWeek: WeekDay[] = [
    'sunday', 
    'monday', 
    'tuesday', 
    'wednesday', 
    'thursday', 
    'friday', 
    'saturday'
  ];
  
  /**
   * Toggle a day's selection
   */
  const toggleDay = (day: WeekDay) => {
    if (disabled) return;
    
    if (selectedDays.includes(day)) {
      // Remove day if already selected
      onChange(selectedDays.filter(d => d !== day));
    } else {
      // Add day if not selected
      onChange([...selectedDays, day]);
    }
  };
  
  /**
   * Format day name for display
   */
  const formatDay = (day: string): string => {
    return day.charAt(0).toUpperCase() + day.slice(1, 3);
  };
  
  return (
    <div className="day-selector-container">
      <div className="day-selector">
        {daysOfWeek.map(day => (
          <button
            key={day}
            type="button"
            className={`day-button ${selectedDays.includes(day) ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={() => toggleDay(day)}
            disabled={disabled}
            aria-pressed={selectedDays.includes(day)}
            aria-label={day}
          >
            {formatDay(day)}
          </button>
        ))}
      </div>
      
      <style>
        {`
          .day-selector-container {
            margin-bottom: 1rem;
          }
          
          .day-selector {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          
          .day-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            border: 1px solid #d1d5db;
            background-color: white;
            font-size: 0.75rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
          }
          
          .day-button:hover:not(.disabled) {
            border-color: #166534;
            color: #166534;
          }
          
          .day-button.selected {
            background-color: #166534;
            color: white;
            border-color: #166534;
          }
          
          .day-button.disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          
          @media (max-width: 640px) {
            .day-button {
              width: 2rem;
              height: 2rem;
              font-size: 0.7rem;
            }
            
            .day-selector {
              justify-content: center;
            }
          }
        `}
      </style>
    </div>
  );
};

export default DaySelector;