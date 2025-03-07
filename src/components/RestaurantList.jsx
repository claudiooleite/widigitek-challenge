import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import '../App.css';

// 📌 Default fallback image for restaurants without an image
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?q=80&w=2710&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

function RestaurantList() {
    // 📌 State to manage restaurant data and pagination
    const [restaurants, setRestaurants] = useState([]);
    const [offset, setOffset] = useState(0);
    const [showFavorites, setShowFavorites] = useState(false); // ✅ Toggle to filter favorite restaurants
    const limit = 10; // Number of restaurants to fetch per request
    const [hasMore, setHasMore] = useState(true); // Tracks if there are more restaurants to load
    const observer = useRef(null); // Ref for infinite scrolling observer
    const dispatch = useDispatch();

    // 📌 Get the list of favorited restaurant IDs from Redux state
    const favorites = useSelector(state => state.favorites);

    // 📌 Fetch restaurants from the API
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get(`https://api.wefood.dev/restaurants?offset=${offset}&limit=${limit}`);
                const newRestaurants = response.data.docs;

                // 📌 Ensure no duplicate restaurants are added when paginating
                setRestaurants(prev => {
                    const uniqueRestaurants = new Map();
                    [...prev, ...newRestaurants].forEach(item => {
                        uniqueRestaurants.set(item._id, item);
                    });
                    return Array.from(uniqueRestaurants.values());
                });

                // 📌 If fewer restaurants are returned, it means there are no more to load
                if (newRestaurants.length < limit) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, [offset]);

    // 📌 Infinite Scroll: Automatically loads more restaurants when reaching the bottom
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

    // 📌 Filter restaurants based on favorites toggle
    const displayedRestaurants = showFavorites
        ? restaurants.filter(restaurant => favorites.includes(restaurant._id))
        : restaurants;

    return (
        <div className="max-w-5xl mx-auto mt-8">
            {/* 📌 Toggle Button: Show All vs. Only Favorites */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => setShowFavorites(prev => !prev)}
                    className="px-6 py-2 text-lg font-semibold rounded-md transition bg-main hover:bg-blue-100 to-blue-300"
                >
                    {showFavorites ? "Show All Restaurants ☆" : "Show Favorites ★"}
                </button>
            </div>

            {/* 📌 Grid Layout for Restaurant Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedRestaurants.length > 0 ? (
                    displayedRestaurants.map(restaurant => (
                        <div key={restaurant._id} className="relative border border-secondary p-4 rounded-lg shadow-md transition transform hover:scale-105">

                            {/* 📌 Favorite Button - Positioned at the top-right of the image */}
                            <button
                                onClick={() => dispatch(toggleFavorite(restaurant._id))}
                                className={`absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-full shadow-md transition ${favorites.includes(restaurant._id) ? 'bg-[#FFD180] text-black' : 'bg-gray-300 text-gray-700'
                                    } hover:scale-110`}
                            >
                                <h1 className="text-xl">{favorites.includes(restaurant._id) ? '★' : '☆'}</h1>
                            </button>

                            {/* 📌 Restaurant Image with Fallback */}
                            <Link to={`/restaurant/${restaurant._id}`} className="block">
                                <img
                                    src={restaurant.image?.url || FALLBACK_IMAGE}
                                    alt={restaurant.name}
                                    className="w-full sm:object-fill object-cover h-40 rounded-t-md bg-gray-100"
                                />
                                {/* 📌 Restaurant Name */}
                                <p className="text-lg text-center font-bold p-3 my-2">{restaurant.name}</p>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg text-gray-600 col-span-3">No favorite restaurants found.</p>
                )}
            </div>

            {/* 📌 Infinite Scroll Trigger - Only appears when not filtering favorites */}
            {hasMore && !showFavorites && <div id="load-more-trigger" className="h-20"></div>}
        </div>
    );
}

export default RestaurantList;
