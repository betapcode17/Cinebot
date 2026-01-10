import axios from "axios";

const api = axios.create({
  baseURL: "https://phimapi.com",
  headers: {
    accept: "application/json",
  },
});

export const getTrendingMovies = async (page = 1, limit = 10) => {
  try {
    const res = await api.get(`/danh-sach/phim-moi-cap-nhat`, {
      params: { page, limit },
    });
    return res.data.items || [];
  } catch (err) {
    console.error("Lỗi getTrendingMovies:", err);
    return [];
  }
};
export const getSingleMovies = async (page = 1, limit = 10) => {
  try {
    const res = await api.get(`/v1/api/danh-sach/phim-le`, {
      params: { page, limit },
    });
    console.log("Raw API Response:", res.data.data.items); // Debug raw data
    return {
      items: res.data.items || [], // Đảm bảo items là mảng
      totalPages: res.data.pagination?.totalPages || 1,
    };
  } catch (err) {
    console.error(
      "Lỗi getSingleMovies - Chi tiết:",
      err.response?.data || err.message
    );
    return { items: [], totalPages: 1 };
  }
};

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

export const getAnimatedMovies = async (page = 1, limit = 10) => {
  try {
    const res = await api.get(`/v1/api/danh-sach/hoat-hinh`, {
      params: { page, limit },
    });
    return res.data.items || [];
  } catch (err) {
    console.error("Lỗi getAnimatedMovies:", err);
    return [];
  }
};

export const getTVShows = async (page = 1, limit = 10) => {
  try {
    const res = await api.get(`/v1/api/danh-sach/tv-shows`, {
      params: { page, limit },
    });
    return res.data.items || [];
  } catch (err) {
    console.error("Lỗi getTVShows:", err);
    return [];
  }
};

export const searchMovies = async (query, page = 1, limit = 10) => {
  if (!query) return [];
  try {
    const res = await api.get(`/v1/api/tim-kiem`, {
      params: {
        keyword: query,
        page,
        limit,
      },
    });
    return res.data.items || [];
  } catch (err) {
    console.error("Lỗi searchMovies:", err);
    return [];
  }
};

export const getMovieDetail = async (slug) => {
  try {
    const res = await api.get(`/phim/${slug}`);
    return res.data || {};
  } catch (err) {
    console.error("Lỗi getMovieDetail:", err);
    return {};
  }
};

export const getGenres = async () => {
  try {
    const res = await api.get(`/the-loai`);
    return res.data || [];
  } catch (err) {
    console.error("Lỗi getGenres:", err);
    return [];
  }
};
