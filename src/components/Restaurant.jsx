import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/slices/favoritesSlice';

const Restaurant = ({ restaurant }) => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.favorites);
    const isFavorite = favorites.some(fav => fav._id === restaurant._id);

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch(removeFavorite(restaurant._id));
        } else {
            dispatch(addFavorite(restaurant));
        }
    };

    return (
        <div>
            <h3>{restaurant.name}</h3>
            <button onClick={handleFavorite}>
                {isFavorite ? 'Unfavorite' : 'Favorite'}
            </button>
        </div>
    );
};

export default Restaurant;
