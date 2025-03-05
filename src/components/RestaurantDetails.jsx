import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/slices/favoritesSlice'; 

function RestaurantDetails() {
    const [restaurant, setRestaurant] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const response = await axios.get(`https://api.wefood.dev/restaurants/${id}`);
                setRestaurant(response.data);
            } catch (error) {
                console.error('Error fetching restaurant details:', error);
            }
        };

        fetchRestaurantDetails();
    }, [id]);

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center', padding: '20px' }}>
            {restaurant ? (
                <div>
                    {restaurant.image?.url && (
                        <img src={restaurant.image.url} alt={restaurant.name}
                            style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px' }} />
                    )}

                    <h1 style={{ fontSize: '24px', margin: '10px 0' }}>{restaurant.name}</h1>

                    {restaurant.addressInfo?.address && (
                        <p style={{ fontSize: '16px', fontWeight: 'bold' }}>📍 {restaurant.addressInfo.address}</p>
                    )}

                    <div style={{ marginTop: '10px' }}>
                        {restaurant.contacts?.email && <p>📧 Email: {restaurant.contacts.email}</p>}
                        {restaurant.contacts?.phoneNumber && <p>📞 Phone: {restaurant.contacts.phoneNumber}</p>}
                    </div>

                    {/* Favorite Button */}
                    <button
                        onClick={() => dispatch(toggleFavorite(restaurant._id))}
                        style={{
                            background: favorites.includes(restaurant._id) ? 'gold' : 'gray',
                            padding: '10px',
                            border: 'none',
                            cursor: 'pointer'
                        }}>
                        {favorites.includes(restaurant._id) ? '★ Favorited' : '☆ Favorite'}
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default RestaurantDetails;
