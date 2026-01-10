import axios from "axios";

const api = axios.create({
  baseURL: "https://phimapi.com",
  headers: {
    accept: "application/json",
  },
});

// 🔹 Phim mới cập nhật (Trending)
export const getTrendingMovies = async (page = 1) => {
  try {
    const res = await api.get(`/danh-sach/phim-moi-cap-nhat-v3`, {
      params: { page },
    });
    return res.data.results || []; // trả về [] nếu undefined
  } catch (err) {
    console.error("Lỗi getTrendingMovies:", err);
    return [];
  }
};

// 🔹 Phim phổ biến / Top Rated
export const getTopRatedMovies = async (page = 1) => {
  try {
    const res = await api.get(`/v1/api/danh-sach/phim-bo`, {
      params: {
        page,
        sort_field: "vote_average", // giả sử KKPhim có điểm đánh giá
        sort_type: "desc",
        limit: 10,
      },
    });
    return res.data.results || [];
  } catch (err) {
    console.error("Lỗi getTopRatedMovies:", err);
    return [];
  }
};

// 🔹 Tìm kiếm phim
export const searchMovies = async (query, page = 1) => {
  if (!query) return [];
  try {
    const res = await api.get(`/v1/api/tim-kiem`, {
      params: {
        keyword: query,
        page,
        sort_field: "_id",
        sort_type: "asc",
        limit: 10,
      },
    });
    return res.data.results || [];
  } catch (err) {
    console.error("Lỗi searchMovies:", err);
    return [];
  }
};

// 🔹 Thông tin chi tiết phim
export const getMovieDetail = async (slug) => {
  try {
    const res = await api.get(`/phim/${slug}`);
    return res.data || {};
  } catch (err) {
    console.error("Lỗi getMovieDetail:", err);
    return {};
  }
};

// 🔹 Danh sách thể loại
export const getGenres = async () => {
  try {
    const res = await api.get(`/the-loai`);
    return res.data || [];
  } catch (err) {
    console.error("Lỗi getGenres:", err);
    return [];
  }
};
