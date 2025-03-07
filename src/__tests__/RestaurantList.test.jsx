import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../store/slices/favoritesSlice';
import RestaurantList from '../components/RestaurantList';

// ✅ Create a Redux store for testing
const store = configureStore({
    reducer: { favorites: favoritesReducer },
});

test('toggles "Show Favorites" button text on click', () => {
    render(
        <Provider store={store}>
            <RestaurantList />
        </Provider>
    );

    // ✅ Find the button
    const toggleButton = screen.getByRole('button', { name: /Show Favorites/i });

    // ✅ Verify initial button text
    expect(toggleButton).toHaveTextContent("Show Favorites ★");

    // ✅ Click the button to toggle "Show All Restaurants"
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent("Show All Restaurants ☆");

    // ✅ Click again to toggle back to "Show Favorites"
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveTextContent("Show Favorites ★");
});
