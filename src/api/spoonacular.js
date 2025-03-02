import axios from 'axios';

const API_KEY = 'b2db07b7dbbd4a7ab290b595e65e2207';
const BASE_URL = 'https://api.spoonacular.com/recipes';

// Create axios instance with common configuration
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY
  }
});

// Get first sentence while preserving HTML tags
const getFirstSentence = (text) => {
  const match = text.match(/^([^.!?]+[.!?])/);
  return match ? match[1] : text;
};

// Transform recipe data to our app's format
const transformRecipeData = (recipe) => ({
  id: recipe.id,
  title: recipe.title,
  description: getFirstSentence(recipe.summary),
  imageUrl: recipe.image,
  rating: (recipe.spoonacularScore / 20).toFixed(1),
  cookTime: `${recipe.readyInMinutes} mins`,
  categories: recipe.dishTypes || [],
});

// Group recipes by their primary category
const groupRecipesByCategory = (recipes) => {
  const grouped = {};
  
  recipes.forEach(recipe => {
    const category = recipe.categories[0] || 'Other';
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(recipe);
  });

  // Sort categories alphabetically
  return Object.keys(grouped)
    .sort()
    .reduce((acc, key) => {
      acc[key] = grouped[key];
      return acc;
    }, {});
};

export const getRandomRecipes = async (number = 70) => {
  try {
    const { data } = await api.get('/random', {
      params: { number }
    });
    const recipes = data.recipes.map(transformRecipeData);
    return groupRecipesByCategory(recipes);
  } catch (error) {
    console.error('Error fetching random recipes:', error.response?.data || error.message);
    return {};
  }
};

export const searchRecipes = async (query, number = 9) => {
  try {
    const { data } = await api.get('/complexSearch', {
      params: {
        query,
        number,
        addRecipeInformation: true
      }
    });
    return data.results.map(transformRecipeData);
  } catch (error) {
    console.error('Error searching recipes:', error.response?.data || error.message);
    return [];
  }
};

export const getFeaturedRecipes = async (tags = ['main course'], number = 70) => {
  try {
    const { data } = await api.get('/random', {
      params: {
        number,
        tags: tags.join(',')
      }
    });
    const recipes = data.recipes.map(transformRecipeData);
    return groupRecipesByCategory(recipes);
  } catch (error) {
    console.error('Error fetching featured recipes:', error.response?.data || error.message);
    return {};
  }
};

export const getRecipeById = async (id) => {
  try {
    const { data } = await api.get(`/${id}/information`);
    return {
      id: data.id,
      title: data.title,
      description: data.summary,
      imageUrl: data.image,
      rating: (data.spoonacularScore / 20).toFixed(1),
      cookTime: `${data.readyInMinutes} mins`,
      servings: data.servings,
      categories: data.dishTypes || [],
      ingredients: data.extendedIngredients.map(ingredient => ({
        id: ingredient.id,
        name: ingredient.original,
      })),
      instructions: data.analyzedInstructions[0]?.steps.map(step => ({
        number: step.number,
        step: step.step,
      })) || [],
    };
  } catch (error) {
    console.error('Error fetching recipe details:', error.response?.data || error.message);
    return null;
  }
}; 