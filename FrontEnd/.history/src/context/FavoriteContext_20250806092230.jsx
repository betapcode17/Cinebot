import { createContext, useContext,useState } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]);
    };


    const removeFromFavorites = (movieId) => {
        setFavorites((prev)=> prev.filter(movie => movie.id !== movieId));