import { useState } from "react";
import { AuthContext } from "./AuthContextContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Hàm đăng nhập
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // lưu user để khi refresh không mất
  };

  // ✅ Hàm đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
