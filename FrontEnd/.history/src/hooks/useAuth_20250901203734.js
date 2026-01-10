import { useContext } from "react";
import { AuthContext } from "../context/AuthContextContext"; // hoặc AuthContext nếu gộp file
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return { user: null, login: () => false, logout: () => {} }; // tránh null
  }
  return context;
};
