import { Recipe } from '../../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: (recipe: Recipe) => void;
}

/**
 * RecipeCard component displays a recipe card with key information
 */
const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  const { name, description, prepTime, cookTime, imageUrl, type } = recipe;
  
  // Calculate total time (prep + cook)
  const totalTime = prepTime + cookTime;
  
  // Handle click event
  const handleClick = () => {
    if (onClick) {
      onClick(recipe);
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      onClick={handleClick}
    >
      {/* Recipe Image */}
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={imageUrl || '/placeholder-recipe.jpg'} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Recipe Type Badge */}
      <div className="px-4 pt-4">
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
          type === 'lunch' ? 'bg-amber-200 text-amber-800' : 'bg-indigo-200 text-indigo-800'
        }`}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>

      {/* Recipe Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        
        <p className="text-gray-600 text-sm mb-4 truncate">
          {description}
        </p>
        
        {/* Time Information */}
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Prep: {prepTime} min</span>
          </div>
          
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Cook: {cookTime} min</span>
          </div>
          
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Total: {totalTime} min</span>
          </div>
        </div>
        
        {/* View Detail Button */}
        <button 
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
