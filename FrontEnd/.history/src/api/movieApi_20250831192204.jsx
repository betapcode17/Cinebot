import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    accept: "application/json",
  },
});

export const getTrendingMovies = async () => {
  const res = await api.get("/trending/movie/day", {
    params: { language: "vi" },
  });
  return res.data.results;
};

export const getPopularMovies = async () => {
  const res = await api.get("/movie/popular", {
    params: { language: "vi", page: 1 },
  });
  return res.data.results;
};

export const searchMovies = async (query) => {
  if (!query) return [];
  const res = await api.get("/search/movie", {
    params: { query, include_adult: false, language: "vi", page: 1 },
  });
  return res.data.results;
};
