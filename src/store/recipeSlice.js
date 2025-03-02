import { createSlice } from '@reduxjs/toolkit';

const CACHE_DURATION = {
  featured: 5 * 60 * 1000, // 5 minutes
  random: 5 * 60 * 1000,   // 5 minutes
  search: 2 * 60 * 1000,   // 2 minutes
  details: 30 * 60 * 1000  // 30 minutes
};

const initialState = {
  featured: {
    items: [],
    loading: false,
    lastFetched: null,
    tags: null,
  },
  random: {
    items: [],
    loading: false,
    lastFetched: null,
  },
  search: {
    items: {},  // Store search results by query
    loading: false,
    currentQuery: '',
  },
  recipeDetails: {
    items: {},
    loading: false,
  },
};

const isCacheValid = (timestamp, duration) => {
  if (!timestamp) return false;
  return Date.now() - timestamp < duration;
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setFeaturedRecipes: (state, action) => {
      const { recipes, tags } = action.payload;
      state.featured.items = recipes;
      state.featured.tags = tags;
      state.featured.lastFetched = Date.now();
    },
    setRandomRecipes: (state, action) => {
      state.random.items = action.payload;
      state.random.lastFetched = Date.now();
    },
    setSearchResults: (state, action) => {
      const { query, items } = action.payload;
      state.search.items[query] = {
        results: items,
        lastFetched: Date.now()
      };
      state.search.currentQuery = query;
    },
    setRecipeDetails: (state, action) => {
      state.recipeDetails.items[action.payload.id] = {
        ...action.payload,
        lastFetched: Date.now(),
      };
    },
    setLoading: (state, action) => {
      const { type, loading } = action.payload;
      state[type].loading = loading;
    },
  },
});

export const {
  setFeaturedRecipes,
  setRandomRecipes,
  setSearchResults,
  setRecipeDetails,
  setLoading,
} = recipeSlice.actions;

// Thunks
export const fetchFeaturedRecipes = (tags) => async (dispatch, getState) => {
  const { featured } = getState().recipes;
  const sameTagsAsLastFetch = JSON.stringify(tags) === JSON.stringify(featured.tags);
  
  if (
    featured.items.length > 0 &&
    sameTagsAsLastFetch &&
    isCacheValid(featured.lastFetched, CACHE_DURATION.featured)
  ) {
    return;
  }

  dispatch(setLoading({ type: 'featured', loading: true }));
  try {
    const { getFeaturedRecipes } = await import('../api/spoonacular');
    const recipes = await getFeaturedRecipes(tags);
    dispatch(setFeaturedRecipes({ recipes, tags }));
  } catch (error) {
    console.error('Error fetching featured recipes:', error);
  } finally {
    dispatch(setLoading({ type: 'featured', loading: false }));
  }
};

export const fetchRandomRecipes = () => async (dispatch, getState) => {
  const { random } = getState().recipes;
  
  if (
    random.items.length > 0 &&
    isCacheValid(random.lastFetched, CACHE_DURATION.random)
  ) {
    return;
  }

  dispatch(setLoading({ type: 'random', loading: true }));
  try {
    const { getRandomRecipes } = await import('../api/spoonacular');
    const recipes = await getRandomRecipes();
    dispatch(setRandomRecipes(recipes));
  } catch (error) {
    console.error('Error fetching random recipes:', error);
  } finally {
    dispatch(setLoading({ type: 'random', loading: false }));
  }
};

export const searchRecipesThunk = (query) => async (dispatch, getState) => {
  const { search } = getState().recipes;
  const cachedSearch = search.items[query];
  
  if (
    cachedSearch?.results?.length > 0 &&
    isCacheValid(cachedSearch.lastFetched, CACHE_DURATION.search)
  ) {
    dispatch(setSearchResults({ query, items: cachedSearch.results }));
    return;
  }

  dispatch(setLoading({ type: 'search', loading: true }));
  try {
    const { searchRecipes } = await import('../api/spoonacular');
    const recipes = await searchRecipes(query);
    dispatch(setSearchResults({ query, items: recipes }));
  } catch (error) {
    console.error('Error searching recipes:', error);
  } finally {
    dispatch(setLoading({ type: 'search', loading: false }));
  }
};

export const fetchRecipeDetails = (id) => async (dispatch, getState) => {
  const { recipeDetails } = getState().recipes;
  const cachedRecipe = recipeDetails.items[id];
  
  if (
    cachedRecipe &&
    isCacheValid(cachedRecipe.lastFetched, CACHE_DURATION.details)
  ) {
    return;
  }

  dispatch(setLoading({ type: 'recipeDetails', loading: true }));
  try {
    const { getRecipeById } = await import('../api/spoonacular');
    const recipe = await getRecipeById(id);
    if (recipe) {
      dispatch(setRecipeDetails(recipe));
    }
  } catch (error) {
    console.error('Error fetching recipe details:', error);
  } finally {
    dispatch(setLoading({ type: 'recipeDetails', loading: false }));
  }
};

export default recipeSlice.reducer; 