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
export const addToFavoritesApi = async (
  accountId,
  sessionId,
  mediaId,
  mediaType = "movie",
  isFavorite = true
) => {
  const res = await axios.post(
    `account/${accountId}/favorite`,
    {
      media_type: mediaType,
      media_id: mediaId,
      favorite: isFavorite,
    },
    {
      params: {
        session_id: sessionId,
      },
    }
  );
  return res.data;
};

// Lay danh sach phim 
export const getFavoriteMoviesApi = async (accountId,sessionId,page = 1)=>{
  const res = await API_LOGIN.
}