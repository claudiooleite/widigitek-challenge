import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RestaurantDetails() {
    const [restaurant, setRestaurant] = useState(null);
    const { id } = useParams(); // Get restaurant ID from URL

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
                    {/* Display Restaurant Image */}
                    {restaurant.image?.url && (
                        <img
                            src={restaurant.image.url}
                            alt={restaurant.name}
                            style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '10px' }}
                        />
                    )}

                    {/* Restaurant Name */}
                    <h1 style={{ fontSize: '24px', margin: '10px 0' }}>{restaurant.name}</h1>

                    {/* Address */}
                    {restaurant.addressInfo?.address && (
                        <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                            📍 {restaurant.addressInfo.address}
                        </p>
                    )}

                    {/* Contacts */}
                    <div style={{ marginTop: '10px' }}>
                        {restaurant.contacts?.email && <p>📧 Email: {restaurant.contacts.email}</p>}
                        {restaurant.contacts?.phoneNumber && <p>📞 Phone: {restaurant.contacts.phoneNumber}</p>}
                    </div>

                    {/* Cuisines */}
                    {restaurant.cuisines?.length > 0 && (
                        <div style={{ marginTop: '10px' }}>
                            <h3>Cuisines:</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {restaurant.cuisines.map((cuisine, index) => (
                                    <li key={index} style={{ background: '#eee', padding: '5px', margin: '5px', borderRadius: '5px', display: 'inline-block' }}>
                                        {cuisine.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default RestaurantDetails;
