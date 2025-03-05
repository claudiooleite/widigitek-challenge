import { createSlice } from '@reduxjs/toolkit';

// Load favorites from localStorage when the app starts
const loadFavorites = () => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: loadFavorites(),
    reducers: {
        toggleFavorite: (state, action) => {
            const restaurantId = action.payload;
            let updatedFavorites;

            if (state.includes(restaurantId)) {
                // Remove from favorites
                updatedFavorites = state.filter(id => id !== restaurantId);
            } else {
                // Add to favorites
                updatedFavorites = [...state, restaurantId];
            }

            // ✅ Save updated favorites to localStorage
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

            return updatedFavorites; // Return updated state
        }
    }
});

// Export actions
export const { toggleFavorite } = favoritesSlice.actions;

// Export reducer
export default favoritesSlice.reducer;
