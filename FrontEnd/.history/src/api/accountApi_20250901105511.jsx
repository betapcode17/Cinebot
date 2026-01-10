import React from "react";
const API_LOGIN = "http://localhost:8080/api/auth/login";
const API_REGISTER = "http://localhost:8080/api/auth/register";

import axios from "axios";

export const loginApi = async (username, password) => {
  return await axios.post(API_LOGIN, {
    username,
    password,
  });
};

export const registerApi = async (email, password) => {
  return await axios.post(API_REGISTER, {
    email,
    password,
  });
};

//
