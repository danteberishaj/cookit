import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../components/RecipeCard';
import { searchRecipesThunk } from '../store/recipeSlice';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { items, loading, currentQuery } = useSelector((state) => state.recipes.search);
  const currentResults = items[currentQuery]?.results || [];
  const searched = currentResults.length > 0 || searchQuery.trim() !== '';

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    dispatch(searchRecipesThunk(searchQuery));
  };

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Search Recipes</h2>
      <form onSubmit={handleSearch} className="max-w-2xl mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for recipes..."
            className="flex-1 px-4 py-2 rounded-lg bg-[#191919] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center text-gray-400">Searching for recipes...</div>
      ) : searched ? (
        currentResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentResults.map((recipe) => (
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
        ) : (
          <div className="text-center text-gray-400">
            No recipes found for "{currentQuery}". Try a different search term.
          </div>
        )
      ) : (
        <div className="text-center text-gray-400">
          Enter a search term to find recipes
        </div>
      )}
    </div>
  );
};

export default Search; 