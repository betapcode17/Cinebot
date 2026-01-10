import axios from "axios";

const api = axios.create({
  baseURL: "https://phimapi.com",
  headers: {
    accept: "application/json",
  },
});

export const getSeriesMovies = async (filters = {}, page = 1, limit = 10) => {
  try {
    // `/v1/api/danh-sach/phim-bo`;
    let url = 
    const params = { page, limit };

    if (filters.query) {
      url = `/v1/api/tim-kiem`;
      params.keyword = filters.query;
    }
    if (filters.genre) {
      params.category = filters.genre;
    }
    if (filters.country) {
      params.country = filters.country;
    }
    if (filters.year) {
      params.year = filters.year;
    }
    if (filters.sortBy) {
      params.sort_field = filters.sortBy;
    }

    const res = await api.get(url, { params });
    return {
      items: res.data.data.items || [],
      pagination: res.data.data.pagination || { totalPages: 1 },
    };
  } catch (err) {
    console.error("Lỗi getSeriesMovies:", err);
    return { items: [], pagination: { totalPages: 1 } };
  }
};

export const getTVShowDetail = async (slug) => {
  try {
    const res = await api.get(`/phim/${slug}`);
    return res.data || {};
  } catch (err) {
    console.error("Lỗi getMovieDetail:", err);
    return {};
  }
};
