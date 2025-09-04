import axios from "axios";

const api = axios.create({
  baseURL: "https://phimapi.com",
  headers: {
    accept: "application/json",
  },
});

// Phim mới cập nhật
export const getTrendingMovies = async (page = 1) => {
  const res = await api.get(`/danh-sach/phim-moi-cap-nhat-v3`, {
    params: { page },
  });
  return res.data.results;
};

// Phim phổ biến
export const getPopularMovies = async (page = 1) => {
  const res = await api.get(`/v1/api/danh-sach/phim-bo`, {
    params: {
      page,
      sort_field: "_id",
      sort_type: "asc",
      sort_lang: "long-tieng",
      limit: 10,
    },
  });
  return res.data.results;
};

// Tìm kiếm phim
export const searchMovies = async (query, page = 1) => {
  if (!query) return [];
  const res = await api.get(`/v1/api/tim-kiem`, {
    params: {
      keyword: query,
      page,
      sort_field: "_id",
      sort_type: "asc",
      sort_lang: "long-tieng",
      limit: 10,
    },
  });
  return res.data.results;
};

// Thông tin chi tiết phim
export const getMovieDetail = async (slug) => {
  const res = await api.get(`/phim/${slug}`);
  return res.data;
};

// Danh sách thể loại
export const getGenres = async () => {
  const res = await api.get(`/the-loai`);
  return res.data;
};
