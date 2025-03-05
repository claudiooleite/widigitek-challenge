import { createSlice } from '@reduxjs/toolkit';

// Retrieve favorites from local storage to initialize state
const loadFavorites = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: loadFavorites(),
  },
  reducers: {
    addFavorite: (state, action) => {
      const newFavorite = action.payload;
      // Prevent adding duplicates
      if (!state.favorites.some(fav => fav._id === newFavorite._id)) {
        state.favorites.push(newFavorite);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      const idToRemove = action.payload;
      state.favorites = state.favorites.filter(fav => fav._id !== idToRemove);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
