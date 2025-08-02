import { useContext } from "react";
import { AuthContext } from "../context/AuthContextContext"; // hoặc AuthContext nếu gộp file

export const useAuth = () => {
  return useContext(AuthContext);
};
