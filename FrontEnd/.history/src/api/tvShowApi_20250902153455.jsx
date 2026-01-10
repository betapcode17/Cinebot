import axios from "axios";

const api = axios.create({
  baseURL: "https://phimapi.com",
  headers: {
    accept: "application/json",
  },
});

export const getSeriesMovies = async (page = 1, limit = 10) => {
  try {
    const res = await api.get(`/v1/api/danh-sach/phim-bo`, {
      params: { page, limit },
    });
    return res.data.items || [];
  } catch (err) {
    console.error("Lỗi getSeriesMovies:", err);
    return [];
  }
};
