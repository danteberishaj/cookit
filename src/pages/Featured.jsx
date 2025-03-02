import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../components/RecipeCard';
import SkeletonRecipeCard from '../components/SkeletonRecipeCard';
import { fetchFeaturedRecipes } from '../store/recipeSlice';

const Featured = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: recipesByCategory, loading, lastFetched, tags: lastTags } = useSelector((state) => state.recipes.featured);

  useEffect(() => {
    const currentTags = ['main course', 'dinner'];
    const isCacheValid = lastFetched && Date.now() - lastFetched < 5 * 60 * 1000; // 5 minutes cache
    const sameTagsAsLastFetch = JSON.stringify(currentTags) === JSON.stringify(lastTags);
    
    if (!isCacheValid || !sameTagsAsLastFetch || Object.keys(recipesByCategory).length === 0) {
      dispatch(fetchFeaturedRecipes(currentTags));
    }
  }, [dispatch, lastFetched, lastTags, recipesByCategory]);

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const renderRecipeSection = (category, recipes) => (
    <section key={category} className="mb-12">
      <h3 className="text-3xl mb-6 font-['PalmerLakePrint'] capitalize">{category}</h3>
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
      <h2 className="text-2xl font-bold mb-6">Featured Recipes</h2>
      
      <div className="mb-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, index) => (
              <SkeletonRecipeCard key={index} />
            ))}
          </div>
        ) : Object.keys(recipesByCategory).length === 0 ? (
          <div className="text-gray-400">No featured recipes available at the moment.</div>
        ) : (
          Object.entries(recipesByCategory).map(([category, recipes]) =>
            renderRecipeSection(category, recipes)
          )
        )}
      </div>
    </div>
  );
};

export default Featured; 