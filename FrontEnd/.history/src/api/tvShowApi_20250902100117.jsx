import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    accept: "application/json",
  },
});

// TV show list (có filter + search)
export const getTVShow = async (filters, page = 1) => {
  const { query, genre, country, year, sortBy } = filters;

  let url = `/discover/tv?language=vi-VN&page=${page}`;

  if (query) url = `/search/tv?query=${query}&language=vi-VN&page=${page}`;
  if (genre) url += `&with_genres=${genre}`;
  if (country) url += `&with_origin_country=${country}`;
  if (sortBy) url += `&sort_by=${sortBy}`;
  if (year) url += `&first_air_date_year=${year}`;

  const res = await api.get(url);
  return res.data;
};

// TV show detail
export const getTVShowDetail = async (id) => {
  const res = await api.get(`/tv/${id}`, {
    params: { language: "vi-VN" },
  });
  return res.data;
};

// TV show episodes
export const getTVShowEpisodes = async (id, seasonNumber) => {
  const res = await api.get(`/tv/${id}/season/${seasonNumber}`, {
    params: { language: "vi-VN" },
  });
  return res.data.episodes;
};

// TV show trailer
export const getTrailer = async (id) => {
  const res = await api.get(`/tv/${id}/videos`, {
    params: { language: "vi-VN" },
  });
  return res.data.result;
};
