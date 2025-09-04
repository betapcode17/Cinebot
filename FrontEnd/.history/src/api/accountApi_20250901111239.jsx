import axios from "axios";

const API_REGISTER = "http://localhost:8080/api/auth/register";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // 🔑 V4 Auth
  },
});

export const loginApi = async (username, password) => {
  try {
    // B1: Tạo request token
    const { data: tokenData } = await api.get(`/authentication/token/new`);
    const requestToken = tokenData.request_token;

    // B2: Validate với login
    await api.post(`/authentication/token/validate_with_login`, {
      username,
      password,
      request_token: requestToken,
    });

    // B3: Tạo session ID
    const { data: sessionData } = await api.post(
      `/authentication/session/new`,
      {
        request_token: requestToken,
      }
    );
    const sessionId = sessionData.session_id;

    // B4: Lấy accountId
    const { data: accountData } = await api.get(`/account`, {
      params: { session_id: sessionId },
    });

    return { sessionId, accountId: accountData.id };
  } catch (error) {
    console.error("loginApi error:", error.response?.data || error.message);
    throw error;
  }
};

export const registerApi = async (email, password) => {
  const res = await axios.post(API_REGISTER, { email, password });
  return res.data;
};

export const addToFavoritesApi = async (
  accountId,
  sessionId,
  mediaId,
  mediaType = "movie",
  isFavorite = true
) => {
  const { data } = await api.post(
    `/account/${accountId}/favorite`,
    {
      media_type: mediaType,
      media_id: mediaId,
      favorite: isFavorite,
    },
    {
      params: { session_id: sessionId },
    }
  );
  return data;
};

export const getFavoriteMoviesApi = async (accountId, sessionId, page = 1) => {
  const { data } = await api.get(`/account/${accountId}/favorite/movies`, {
    params: { session_id: sessionId, page },
  });
  return data;
};
