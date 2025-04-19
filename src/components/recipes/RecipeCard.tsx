import { Recipe } from '../../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: (recipe: Recipe) => void;
}

/**
 * Enhanced RecipeCard component displays a recipe card with key information
 */
const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  const { name, description, prepTime, cookTime, imageUrl, type, servings } = recipe;
  
  // Calculate total time (prep + cook)
  const totalTime = prepTime + cookTime;
  
  // Handle click event
  const handleClick = () => {
    if (onClick) {
      onClick(recipe);
    }
  };

  // Badge styles
  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    borderRadius: '9999px',
    padding: '0.25rem 0.75rem',
    fontSize: '0.875rem'
  };

  // Type-specific badge style
  const typeBadgeStyle = {
    ...badgeStyle,
    backgroundColor: type === 'lunch' ? '#fde68a' : '#c7d2fe',
    color: type === 'lunch' ? '#92400e' : '#3730a3'
  };

  return (
    <div 
      style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s, box-shadow 0.3s',
        transform: 'translateY(0)'
      }}
      onClick={handleClick}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        e.currentTarget.style.transform = 'translateY(-0.25rem)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Recipe Image */}
      <div style={{ position: 'relative', width: '100%', height: '12rem', overflow: 'hidden' }}>
        <img 
          src={imageUrl || '/placeholder-recipe.jpg'} 
          alt={name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
          <span style={typeBadgeStyle}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>
      </div>

      {/* Recipe Content */}
      <div style={{ padding: '1.25rem' }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold', 
          color: '#111827', 
          marginBottom: '0.5rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {name}
        </h3>
        
        <p className="line-clamp-2" style={{ 
          color: '#4b5563', 
          fontSize: '0.875rem', 
          marginBottom: '1rem',
          height: '2.5rem'
        }}>
          {description}
        </p>
        
        {/* Info Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', 
          gap: '0.75rem',
          marginBottom: '1rem',
          fontSize: '0.875rem'
        }}>
          <div style={{ 
            backgroundColor: '#f9fafb', 
            padding: '0.5rem', 
            borderRadius: '0.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <span style={{ color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.025em' }}>
              Prep Time
            </span>
            <span style={{ fontWeight: '500', color: '#1f2937' }}>
              {prepTime} min
            </span>
          </div>
          
          <div style={{ 
            backgroundColor: '#f9fafb', 
            padding: '0.5rem', 
            borderRadius: '0.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <span style={{ color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.025em' }}>
              Cook Time
            </span>
            <span style={{ fontWeight: '500', color: '#1f2937' }}>
              {cookTime} min
            </span>
          </div>
          
          <div style={{ 
            backgroundColor: '#f9fafb', 
            padding: '0.5rem', 
            borderRadius: '0.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <span style={{ color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.025em' }}>
              Total Time
            </span>
            <span style={{ fontWeight: '500', color: '#1f2937' }}>
              {totalTime} min
            </span>
          </div>
          
          <div style={{ 
            backgroundColor: '#f9fafb', 
            padding: '0.5rem', 
            borderRadius: '0.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <span style={{ color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.025em' }}>
              Servings
            </span>
            <span style={{ fontWeight: '500', color: '#1f2937' }}>
              {servings}
            </span>
          </div>
        </div>
        
        {/* View Detail Button */}
        <button
          style={{
            backgroundColor: '#16a34a',
            color: 'white',
            fontWeight: '500',
            padding: '0.5rem 0',
            borderRadius: '0.375rem',
            width: '100%',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
