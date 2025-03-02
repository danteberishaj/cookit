import React from 'react';
import PropTypes from 'prop-types';

const RecipeCard = ({ 
  title, 
  description, 
  rating, 
  cookTime, 
  imageUrl, 
  onClick 
}) => {
  return (
    <div 
      className="bg-[#191919] rounded-lg overflow-hidden cursor-pointer hover:bg-[#252525] transition-colors duration-200"
      onClick={onClick}
    >
      <div 
        className="h-48 bg-gray-700 bg-cover bg-center"
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
      />
      <div className="p-4">
        <h3 className="text-xl mb-2 text-white">{title}</h3>
        <p className="text-gray-400 mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center text-sm text-gray-400">
          {rating && (
            <>
              <span>⭐ {rating.toFixed(1)}</span>
              <span className="mx-2">•</span>
            </>
          )}
          {cookTime && <span>{cookTime}</span>}
        </div>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number,
  cookTime: PropTypes.string,
  imageUrl: PropTypes.string,
  onClick: PropTypes.func,
};

export default RecipeCard; 