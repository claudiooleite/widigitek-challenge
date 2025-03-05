import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get('https://api.wefood.dev/restaurants?limit=10');
                setRestaurants(response.data.docs); 
                console.log(response.data.docs); 
            } catch (error) {
                console.error('Error fetching restaurants:', error);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <div>
            <h1>Restaurants</h1>
            {restaurants.map(restaurant => (
                <p key={restaurant._id}>{restaurant.name}</p>
            ))}
        </div>
    );
}

export default RestaurantList;
