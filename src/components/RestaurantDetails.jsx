import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/slices/favoritesSlice';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?q=80&w=2710&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

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
    console.log(restaurant)

    return (
        <div className="flex justify-center items-center min-h-screen bg-background p-6">
            {restaurant ? (
                <div className="relative max-w-3xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
                    
                    {/* Favorite Button - Positioned at the top-right */}
                    <button
                        onClick={() => dispatch(toggleFavorite(restaurant._id))}
                        className={`absolute top-4 rounded-full right-4 shadow-md transition ${
                            favorites.includes(restaurant._id) ? 'bg-yellow-400 text-black' : 'bg-gray-300 text-gray-700'
                        } hover:scale-110`}
                    >
                        <h1 className={'text-3xl'}>{favorites.includes(restaurant._id) ? '★' : '☆'}</h1>
                    </button>

                    {/* Restaurant Image */}
                    <img src={restaurant.image?.url || FALLBACK_IMAGE}  alt={restaurant.name}
                            className="w-full h-72 object-cover" />
                            
                    {/* Content Section */}
                    <div className="p-6 text-center">
                        <h1 className="text-4xl font-bold text-main">{restaurant.name}</h1>

                            {/* Cuisines Section */}
                        {restaurant.cuisines && restaurant.cuisines.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-700">🍽️ Cuisines:</h3>
                                <div className="flex flex-wrap justify-center gap-2 mt-2">
                                    {restaurant.cuisines.map((cuisine, index) => (
                                        <span key={index} className="bg-secondary text-white px-3 py-1 rounded-md text-sm">
                                            {cuisine.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Address */}
                        {restaurant.addressInfo?.address && (
                            <p className="text-lg font-medium text-gray-700 mt-2">
                                📍 {restaurant.addressInfo.address}
                            </p>
                        )}

                        {/* Contact Info */}
                        <div className="mt-4 text-gray-600 space-y-2">
                            {restaurant.contacts?.email && <p className="text-lg">📧 {restaurant.contacts.email}</p>}
                            {restaurant.contacts?.phoneNumber && <p className="text-lg">📞 {restaurant.contacts.phoneNumber}</p>}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-xl text-gray-600">Loading...</p>
            )}
        </div>
    );
}

export default RestaurantDetails;
