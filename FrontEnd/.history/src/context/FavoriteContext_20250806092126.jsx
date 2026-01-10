import { createContext, useContext,useState } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]);
    };