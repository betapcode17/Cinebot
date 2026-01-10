// useAuth.js
import { useContext } from "react";
import { AuthContext } from "./AuthProvider"; // hoặc nơi bạn khai báo

export const useAuth = () => useContext(AuthContext);
