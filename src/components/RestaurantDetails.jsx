import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RestaurantDetails = () => {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            const response = await axios.get(`https://api.wefood.dev/restaurants/${id}`);
            setRestaurant(response.data);
        };

        fetchRestaurantDetails();
    }, [id]);

    return (
        <div>
            {restaurant ? (
                <>
                    <img src={restaurant.image} alt={restaurant.name} />
                    <h1>{restaurant.name}</h1>
                    <p>{restaurant.address}</p>
                    <p>{restaurant.contacts}</p>
                    <p>{restaurant.cuisines.join(', ')}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default RestaurantDetails;
