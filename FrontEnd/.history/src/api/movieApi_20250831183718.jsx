import axios from "axios";

const API_BASE = "https://api.themoviedb.org/3/trending/movie/day?language=vi";
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    accept: "application/json",
  },
});

export const getAllMovies = async () => {
  const res = await api.get("/trending/movie/day", {
    params: { language: "vi" },
  });
  return res.data;
};

export const getMovieByID = async (id) => {
  const res = await api.get(`/movie/${id}`, {
    params: { language: "vi" },
  });
  return res.data;
};
