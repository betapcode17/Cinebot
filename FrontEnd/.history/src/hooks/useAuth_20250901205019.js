import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // ✅ phải khớp tên file AuthContext.jsx

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth() must be used inside an <AuthProvider>");
  }
  return context;
};
