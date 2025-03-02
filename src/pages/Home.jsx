import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../components/RecipeCard';
import SkeletonRecipeCard from '../components/SkeletonRecipeCard';
import { fetchRandomRecipes } from '../store/recipeSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: recipesByCategory, loading, lastFetched } = useSelector((state) => state.recipes.random);

  useEffect(() => {
    const isCacheValid = lastFetched && Date.now() - lastFetched < 5 * 60 * 1000; // 5 minutes cache
    
    if (!isCacheValid || Object.keys(recipesByCategory).length === 0) {
      dispatch(fetchRandomRecipes());
    }
  }, [dispatch, lastFetched, recipesByCategory]);

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const renderRecipeSection = (category, recipes) => (
    <section key={category} className="mb-12">
      <h3 className="text-5xl mb-6 font-['PalmerLakePrint'] capitalize">{category}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            description={recipe.description}
            rating={parseFloat(recipe.rating)}
            cookTime={recipe.cookTime}
            imageUrl={recipe.imageUrl}
            onClick={() => handleRecipeClick(recipe.id)}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">Welcome to Creme</h2>
      
      <div className="mb-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, index) => (
              <SkeletonRecipeCard key={index} />
            ))}
          </div>
        ) : Object.keys(recipesByCategory).length === 0 ? (
          <div className="text-gray-400">No recipes available at the moment.</div>
        ) : (
          Object.entries(recipesByCategory).map(([category, recipes]) =>
            renderRecipeSection(category, recipes)
          )
        )}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#191919] p-6 rounded-lg hover:bg-[#252525] transition-colors cursor-pointer" onClick={() => navigate('/search')}>
          <h3 className="text-xl mb-2">Find Recipes</h3>
          <p className="text-gray-400">Search our collection of delicious recipes</p>
        </div>
        <div className="bg-[#191919] p-6 rounded-lg hover:bg-[#252525] transition-colors cursor-pointer" onClick={() => navigate('/featured')}>
          <h3 className="text-xl mb-2">Featured</h3>
          <p className="text-gray-400">Check out our featured recipes</p>
        </div>
        <div className="bg-[#191919] p-6 rounded-lg hover:bg-[#252525] transition-colors">
          <h3 className="text-xl mb-2">Latest Updates</h3>
          <p className="text-gray-400">See what's new in the community</p>
        </div>
      </section>
    </div>
  );
};

export default Home; 