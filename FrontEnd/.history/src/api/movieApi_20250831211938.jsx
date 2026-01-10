import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    accept: "application/json",
  },
});

// Trending
export const getTrendingMovies = async () => {
  const res = await api.get("/trending/movie/day", {
    params: { language: "vi-VN" },
  });
  return res.data.results;
};

// Popular
export const getPopularMovies = async () => {
  const res = await api.get("/movie/popular", {
    params: { language: "vi-VN", page: 1 },
  });
  return res.data.results;
};

// Search
export const searchMovies = async (query) => {
  if (!query) return [];
  const res = await api.get("/search/movie", {
    params: { query, include_adult: false, language: "vi-VN", page: 1 },
  });
  return res.data.results;
};

// Credits
export const getMovieCredits = async (id) => {
  const res = await api.get(`/movie/${id}/credits`, {
    params: { language: "vi-VN" },
  });
  return res.data;
};

// Trailer
export const getTrailer = async (id) => {
  const res = await api.get(`/movie/${id}/videos`, {
    params: { language: "vi-VN" },
  });
  return res.data.results; // ✅ trả về array video
};

// Movie detail
export const getMovieDetail = async (id) => {
  const res = await api.get(`/movie/${id}`, {
    params: { language: "vi-VN" },
  });
  return res.data;
};

// TV show episodes
export const getTVShowEpisodes = async (id, seasonNumber) => {
  const res = await api.get(`/tv/${id}/season/${seasonNumber}`, {
    params: { language: "vi-VN" },
  });
  return res.data.episodes; // ✅ không phải results
};
