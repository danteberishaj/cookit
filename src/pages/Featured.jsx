import React from 'react';
import RecipeCard from '../components/RecipeCard';

const Featured = () => {
  const featuredRecipes = [
    {
      id: 1,
      title: 'Homemade Pizza',
      description: 'Classic Italian pizza with a crispy crust',
      rating: 4.8,
      cookTime: '45 mins',
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      title: 'Chicken Curry',
      description: 'Spicy Indian-style curry with tender chicken',
      rating: 4.7,
      cookTime: '60 mins',
      imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      title: 'Chocolate Cake',
      description: 'Rich and moist chocolate dessert',
      rating: 4.9,
      cookTime: '90 mins',
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80'
    },
  ];

  const handleRecipeClick = (recipeId) => {
    // TODO: Implement navigation to recipe detail page
    console.log(`Clicked recipe ${recipeId}`);
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Featured Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            description={recipe.description}
            rating={recipe.rating}
            cookTime={recipe.cookTime}
            imageUrl={recipe.imageUrl}
            onClick={() => handleRecipeClick(recipe.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Featured; 