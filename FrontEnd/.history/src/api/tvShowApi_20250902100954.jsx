import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    accept: "application/json",
  },
});

// 📌 Lấy danh sách TV show (discover hoặc search)
export const getTVShow = async (filters = {}, page = 1) => {
  const { query, genre, country, year, sortBy } = filters;

  let url;
  let params = { language: "vi-VN", page };

  if (query) {
    // 🔍 Search TV show
    url = "/search/tv";
    params.query = query;
  } else {
    // 📌 Discover TV show
    url = "/discover/tv";
    if (genre) params.with_genres = genre;
    if (country) params.with_origin_country = country;
    if (sortBy) params.sort_by = sortBy;
    if (year) params.first_air_date_year = year;
  }

  const res = await api.get(url, { params });
  return res.data;
};

// 📌 Chi tiết TV show
export const getTVShowDetail = async (id) => {
  if (!id) throw new Error("❌ TV show ID is required");
  const res = await api.get(`/tv/${id}`, {
    params: { language: "vi-VN" },
  });
  return res.data;
};

// 📌 Danh sách tập phim trong 1 season
export const getTVShowEpisodes = async (id, seasonNumber = 1) => {
  if (!id) throw new Error("❌ TV show ID is required");
  const res = await api.get(`/tv/${id}/season/${seasonNumber}`, {
    params: { language: "vi-VN" },
  });
  return res.data?.episodes || []; // ✅ tránh undefined
};

// 📌 Trailer (lọc trailer YouTube)
export const getTrailer = async (id) => {
  if (!id) throw new Error("❌ TV show ID is required");
  const res = await api.get(`/tv/${id}/videos`, {
    params: { language: "vi-VN" },
  });
  return res.data.results.filter(
    (vid) => vid.type === "Trailer" && vid.site === "YouTube"
  );
};
