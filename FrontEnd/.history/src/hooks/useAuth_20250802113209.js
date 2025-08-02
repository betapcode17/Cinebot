import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Đúng đường dẫn

export const useAuth = () => useContext(AuthContext);
