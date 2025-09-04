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

export const getMovieCreadits = async (id) => {
  const res = await api.get(`/movie/${id}/credits`, {
    params: { language: "vie" },
  });
  return res.data;
};

//  `https://api.themoviedb.org/3/movie/${id}/videos?language=vi`,
export const getTrailer = async (id) => {
  const res = await api.get(`movie/${id}/videos`, {
    params: { language: "vie" },
  });
  return res.data;
};

export const getMovieDetail = async (id) => {
  const res = await api.get(`movie/${id}`, {
    params: { language: "vie" },
  });
  return res.data;
};

export const getTVShowDetail = async (id) => {
  const res = await api.get(`tv/${id}`, {
    params: {
      language: "vie",
    },
  });
  return res.data;
};
