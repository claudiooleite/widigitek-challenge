import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "../store/slices/favoritesSlice"; // Import your actual reducer
import axios from "axios";
import RestaurantDetails from "../components/RestaurantDetails";
import { vi } from "vitest";

// ✅ Mock API response
vi.mock("axios");

const mockRestaurant = {
    _id: "test-id",
    name: "Mock Restaurant",
    addressInfo: { address: "123 Test Street" },
    contacts: { email: "test@restaurant.com", phoneNumber: "123-456-7890" },
    image: { url: "https://via.placeholder.com/150" },
    cuisines: [{ name: { en: "Italian" } }],
};

describe("RestaurantDetails Component", () => {
    let store;

    beforeEach(() => {
        axios.get.mockResolvedValue({ data: mockRestaurant });

        // ✅ Create a real Redux store
        store = configureStore({
            reducer: { favorites: favoritesReducer },
            preloadedState: { favorites: [] },
        });
    });

    test("renders restaurant details and toggles favorite", async () => {
        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/restaurant/test-id"]}>
                    <Routes>
                        <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        // ✅ Wait for restaurant name to appear
        await waitFor(() => expect(screen.getByText("Mock Restaurant")).toBeInTheDocument());

        // ✅ Find the favorite button (initial state: "☆")
        const favoriteButton = screen.getByText("☆");
        expect(favoriteButton).toBeInTheDocument();

        // ✅ Click to toggle favorite state
        fireEvent.click(favoriteButton);

        // ✅ Wait for UI to update (Redux state change)
        await waitFor(() => expect(screen.getByText("★")).toBeInTheDocument());
    });
});
