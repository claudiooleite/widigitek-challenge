import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/slices/favoritesSlice'; 

function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef(null);
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites); // Correct selector

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

    return (
        <div style={{ maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
            <h1>Restaurants</h1>
            {restaurants.map(restaurant => (
                <div key={restaurant._id} style={{ borderBottom: '1px solid #ddd', padding: '10px', cursor: 'pointer' }}>
                    <Link to={`/restaurant/${restaurant._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {restaurant.image?.url && (
                            <img src={restaurant.image.url} alt={restaurant.name}
                                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
                        )}
                        <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}>{restaurant.name}</p>
                    </Link>

                    {/* Favorite Button */}
                    <button
                        onClick={() => dispatch(toggleFavorite(restaurant._id))}
                        style={{
                            background: favorites.includes(restaurant._id) ? 'gold' : 'gray',
                            padding: '5px 10px',
                            border: 'none',
                            cursor: 'pointer'
                        }}>
                        {favorites.includes(restaurant._id) ? '★ Favorited' : '☆ Favorite'}
                    </button>
                </div>
            ))}
            {hasMore && <div id="load-more-trigger" style={{ height: '20px' }}></div>}
        </div>
    );
}

export default RestaurantList;
