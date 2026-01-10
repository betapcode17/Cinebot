import axios from "axios";

const api = axios.create({
  baseURL: "https://phimapi.com",
  headers: {
    accept: "application/json",
  },
});

// 🔹 Phim mới cập nhật (Newly Updated Movies)
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

// 🔹 Phim lẻ (Single Movies)
export const getSingleMovies = async (page = 1, limit = 10) => {
  try {
    const res = await api.get(`/v1/api/danh-sach/phim-le`, {
      params: { page, limit },
    });
    return res.data.items || [];
  } catch (err) {
    console.error("Lỗi getSingleMovies:", err);
    return [];
  }
};

// 🔹 Phim bộ (Series)
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

// 🔹 Phim hoạt hình (Animations)
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

// 🔹 TV Shows
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

// 🔹 Tìm kiếm phim (Search Movies)
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

// 🔹 Thông tin chi tiết phim (Movie Details)
export const getMovieDetail = async (slug) => {
  try {
    const res = await api.get(`/phim/${slug}`);
    return res.data || {};
  } catch (err) {
    console.error("Lỗi getMovieDetail:", err);
    return {};
  }
};

// 🔹 Danh sách thể loại (Genres - Note: Not explicitly documented)
export const getGenres = async () => {
  try {
    const res = await api.get(`/the-loai`);
    return res.data || [];
  } catch (err) {
    console.error("Lỗi getGenres:", err);
    return [];
  }
};
