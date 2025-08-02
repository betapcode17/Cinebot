// src/service/UserService.js
import axios from "axios";

export const loginApi = async (username, password) => {
  return await axios.post("http://localhost:8080/api/auth/login", {
    username,
    password,
  });
};

export const registerApi = async (email, password) => {
  return await axios.post("http://localhost:8080/api/auth/register", {
    email,
    password,
  });
};
