import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to access URL params

function RestaurantDetails() {
    const [restaurant, setRestaurant] = useState(null);
    const { id } = useParams(); // Get the restaurant ID from the URL

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const response = await axios.get(`https://api.wefood.dev/restaurants/${id}`);
                setRestaurant(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching restaurant details:', error);
            }
        };

        fetchRestaurantDetails();
    }, [id]); // Dependency array includes id to refetch if it changes

    return (
        <div>
            {restaurant ? (
                <div>
                    <h1>{restaurant.name}</h1>
                    <p>{restaurant.addressInfo.address}</p>
                    <p>{restaurant.contacts.email}</p>
                    <p>{restaurant.contacts.phoneNumber}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default RestaurantDetails;
