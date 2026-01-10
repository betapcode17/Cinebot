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
    console.log("Raw API Response:", res.data); // Debug raw data
    console.log("Items:", res.data.data.items); // In ra mảng items

    return {
      items: res.data.data.items || [], // lấy đúng items
      totalPages: res.data.data.pagination?.totalPages || 1,
    };
  } catch (err) {
    console.error(
      "Lỗi getSingleMovies - Chi tiết:",
      err.response?.data || err.message
    );
    return { items: [], totalPages: 1 };
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
