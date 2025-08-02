import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.Provider";

export const useAuth = () => useContext(AuthContext);
