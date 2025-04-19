import React, { useState, KeyboardEvent } from 'react';
import { Button } from './Button';
import './theme.css';

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  allowDuplicates?: boolean;
}

/**
 * TagInput Component
 * Allows users to add and remove tags (strings) to a list
 */
const TagInput: React.FC<TagInputProps> = ({
  tags,
  setTags,
  placeholder = 'Add item and press Enter',
  maxTags = 10,
  allowDuplicates = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  /**
   * Add a new tag to the list
   */
  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    
    if (!trimmedTag) return;
    
    // Check for duplicates if not allowed
    if (!allowDuplicates && tags.includes(trimmedTag)) {
      setError(`"${trimmedTag}" already exists`);
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    // Check for max tags limit
    if (tags.length >= maxTags) {
      setError(`Maximum of ${maxTags} items allowed`);
      setTimeout(() => setError(null), 3000);
      return;
    }
    
    setTags([...tags, trimmedTag]);
    setInputValue('');
    setError(null);
  };

  /**
   * Remove a tag from the list
   */
  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  /**
   * Handle key press events
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Add tag on Enter
    if (e.key === 'Enter' && inputValue) {
      e.preventDefault();
      addTag(inputValue);
    }
    
    // Remove last tag on Backspace if input is empty
    if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className="tag-input-container">
      <div className="tag-input-wrapper">
        {tags.map((tag, index) => (
          <div key={`${tag}-${index}`} className="tag">
            <span>{tag}</span>
            <button 
              type="button" 
              className="tag-remove-btn" 
              onClick={() => removeTag(index)}
              aria-label={`Remove ${tag}`}
            >
              &times;
            </button>
          </div>
        ))}
        
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="tag-input"
          aria-label={placeholder}
        />
      </div>
      
      {inputValue && (
        <Button 
          variant="secondary" 
          size="small" 
          onClick={() => addTag(inputValue)}
          className="tag-add-btn"
        >
          Add
        </Button>
      )}
      
      {error && <div className="tag-input-error">{error}</div>}
      
      <style jsx>{`
        .tag-input-container {
          margin-bottom: 1rem;
        }
        
        .tag-input-wrapper {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          border: 1px solid #d1d5db;
          border-radius: 0.25rem;
          padding: 0.25rem;
          min-height: 2.5rem;
          background-color: white;
        }
        
        .tag {
          display: flex;
          align-items: center;
          background-color: #e2f5ea;
          color: #166534;
          border-radius: 0.25rem;
          padding: 0.25rem 0.5rem;
          margin: 0.25rem;
          font-size: 0.875rem;
          max-width: 100%;
          overflow: hidden;
        }
        
        .tag span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .tag-remove-btn {
          background: none;
          border: none;
          color: #166534;
          cursor: pointer;
          margin-left: 0.25rem;
          font-size: 1rem;
          line-height: 1;
          display: flex;
          align-items: center;
        }
        
        .tag-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 0.5rem;
          font-size: 0.875rem;
          min-width: 50px;
        }
        
        .tag-add-btn {
          margin-top: 0.5rem;
        }
        
        .tag-input-error {
          color: #b91c1c;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }
      `}</style>
    </div>
  );
};

export default TagInput;