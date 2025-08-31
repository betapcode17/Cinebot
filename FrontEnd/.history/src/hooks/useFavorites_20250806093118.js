import { useContext } from "react";
import { FavoriteContext } from "./FavoriteContext"; // chỉnh đúng path nếu cần

export const useFavorites = () => {
  return useContext(FavoriteContext);
};
