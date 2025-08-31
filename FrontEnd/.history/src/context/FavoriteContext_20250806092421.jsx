import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((m) => m.id === movieId);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

// Remove useFavorites from this file to avoid Fast Refresh issues.
