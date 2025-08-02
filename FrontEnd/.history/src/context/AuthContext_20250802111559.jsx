// src/context/AuthContext.jsx
import { useState } from "react";
import { AuthContext } from "./AuthContext"; // ✅ import đúng context

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // Không cần fetch ở đây nếu đã fetch ở LoginPage
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
