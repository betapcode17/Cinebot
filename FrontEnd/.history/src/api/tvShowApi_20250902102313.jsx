import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    accept: "application/json",
  },
});

export const getTVShow = async (filters = {}, page = 1) => {
  const { query, genre, country, year, sortBy } = filters;

  let url;
  let params = { language: "vi-VN", page };

  if (query) {
    url = "/search/tv";
    params.query = query;
  } else {
    url = "/discover/tv";
    if (genre) params.with_genres = genre;
    if (country) params.with_origin_country = country;
    if (sortBy) params.sort_by = sortBy;
    if (year) params.first_air_date_year = year;
  }

  const res = await api.get(url, { params });
  return res.data;
};

export const getTVShowDetail = async (id) => {
  const res = await api.get(`/tv/${id}`, {
    params: { language: "vi-VN" },
  });
  return res.data;
};

export const getTVShowEpisodes = async (id, seasonNumber = 1) => {
  const res = await api.get(`/tv/${id}/season/${seasonNumber}`, {
    params: { language: "vi-VN" },
  });
  return res.data?.episodes || [];
};

export const getTrailer = async (id) => {
  const res = await api.get(`/tv/${id}/videos`, {
    params: { language: "vi-VN" },
  });
  return res.data.results.filter(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );
};

export const getEpisodeDetail = async (
  seriesId,
  seasonNumber,
  episodeNumber
) => {
  
    const res = await api.get(`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`,
    params: { language: "vi-VN" },
  });

};
