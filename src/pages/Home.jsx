import React from 'react';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const popularRecipes = [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      description: 'Authentic Italian pasta with creamy egg sauce',
      rating: 4.9,
      cookTime: '30 mins',
      imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      title: 'Beef Burger',
      description: 'Juicy homemade burger with special sauce',
      rating: 4.7,
      cookTime: '25 mins',
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      title: 'Green Salad',
      description: 'Fresh and healthy mixed greens with vinaigrette',
      rating: 4.5,
      cookTime: '15 mins',
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80'
    }
  ];

  const handleRecipeClick = (recipeId) => {
    // TODO: Implement navigation to recipe detail page
    console.log(`Clicked recipe ${recipeId}`);
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">Welcome to Creme</h2>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Popular Recipes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRecipes.map((recipe) => (
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
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-[#191919] p-4 rounded-lg">
          <h3 className="text-xl mb-2">Recent Activity</h3>
          <p className="text-gray-400">See what's cooking in the community</p>
        </div>
        <div className="bg-[#191919] p-4 rounded-lg">
          <h3 className="text-xl mb-2">Trending</h3>
          <p className="text-gray-400">Check out what's hot right now</p>
        </div>
        <div className="bg-[#191919] p-4 rounded-lg">
          <h3 className="text-xl mb-2">Collections</h3>
          <p className="text-gray-400">Browse curated recipe collections</p>
        </div>
      </section>
    </div>
  );
};

export default Home; 