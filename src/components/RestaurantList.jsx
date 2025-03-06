import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import '../App.css';

// Fallback Image
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?q=80&w=2710&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const [offset, setOffset] = useState(0);
    const [showFavorites, setShowFavorites] = useState(false); // ✅ Toggle for filtering favorites
    const limit = 10;
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef(null);
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites); // ✅ Get favorite restaurant IDs

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(`https://api.wefood.dev/restaurants?offset=${offset}&limit=${limit}`);
                const newRestaurants = response.data.docs;

                setRestaurants(prev => {
                    const uniqueRestaurants = new Map();
                    [...prev, ...newRestaurants].forEach(item => {
                        uniqueRestaurants.set(item._id, item);
                    });
                    return Array.from(uniqueRestaurants.values());
                });

                if (newRestaurants.length < limit) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, [offset]);

    useEffect(() => {
        if (!hasMore) return;

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setOffset(prev => prev + limit);
            }
        });

        const target = document.querySelector('#load-more-trigger');
        if (target) observer.current.observe(target);

        return () => observer.current && observer.current.disconnect();
    }, [hasMore]);

    // ✅ Filter restaurants based on favorites
    const displayedRestaurants = showFavorites
        ? restaurants.filter(restaurant => favorites.includes(restaurant._id))
        : restaurants;

    return (
        <div className="max-w-5xl mx-auto mt-8">
            <h1 className="text-3xl font-semibold text-main text-center mb-6">Restaurants</h1>

            {/* ✅ Toggle Favorites Button */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => setShowFavorites(prev => !prev)}
                    className="px-6 py-2 text-lg font-semibold rounded-md transition bg-main hover:bg-blue-700"
                >
                    {showFavorites ? "Show All Restaurants" : "Show Favorites"}
                </button>
            </div>

            {/* ✅ Restaurant Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedRestaurants.length > 0 ? (
                    displayedRestaurants.map(restaurant => (
                        <div key={restaurant._id} className="relative border border-secondary p-4 rounded-lg shadow-md transition transform hover:scale-105">
                            {/* Favorite Button - Positioned on the top-right of the image */}
                            <button
                                onClick={() => dispatch(toggleFavorite(restaurant._id))}
                                className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition ${
                                    favorites.includes(restaurant._id) ? 'bg-yellow-400 text-black' : 'bg-gray-300 text-gray-700'
                                } hover:scale-110`}
                            >
                                {favorites.includes(restaurant._id) ? '★' : '☆'}
                            </button>

                            <Link to={`/restaurant/${restaurant._id}`} className="block">
                                {/* Use fallback image if no image is available */}
                                <img 
                                    src={restaurant.image?.url || FALLBACK_IMAGE} 
                                    alt={restaurant.name} 
                                    className="w-full h-40 object-cover rounded-md bg-gray-100"
                                />
                                <p className="text-lg font-bold mt-2">{restaurant.name}</p>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg text-gray-600 col-span-3">No favorite restaurants found.</p>
                )}
            </div>

            {hasMore && !showFavorites && <div id="load-more-trigger" className="h-20"></div>}
        </div>
    );
}

export default RestaurantList;
