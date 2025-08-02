import React, { createContext, useState, useContext } from "react";

// 1. Tạo context
const AuthContext = createContext();

// 2. Tạo Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Tạo custom hook để sử dụng dễ hơn
export const useAuth = () => useContext(AuthContext);
