import { useContext } from "react";
import { AuthContext } from "../context/AuthContextContext"; // Đúng đường dẫn

export const useAuth = () => useContext(AuthContext);
