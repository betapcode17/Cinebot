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
export const getSingleMovies = async ({
  page = 1,
  limit = 10,
  sortField = "_id",
  sortType = "asc",
  sortLang = "long-tieng",
  category = "",
  country = "",
  year = "",
}) => {
  try {
    const params = {
      page,
      limit,
      sort_field: sortField,
      sort_type: sortType,
      sort_lang: sortLang,
      category: category,
      country: country,
      filterYear: year,
    };
    // Loại bỏ các tham số rỗng
    Object.keys(params).forEach(
      (key) =>
        (params[key] === "" || params[key].length === 0) && delete params[key]
    );
    const res = await api.get(`/v1/api/danh-sach/phim-bo`, { params }); // Sử dụng phim-bo
    console.log("Raw API Response:", res.data); // Debug raw data
    console.log("Items:", res.data.data.items); // In ra mảng items

    return {
      items: res.data.data.items || [],
      totalPages: res.data.data.params?.pagination?.totalPages || 1,
    };
  } catch (err) {
    console.error(
      "Lỗi getSingleMovies - Chi tiết:",
      err.response?.data || err.message
    );
    return { items: [], totalPages: 1 };
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

export const getContry = async () => {
  try {
    const res = await api.get("quoc-gia");
    return res.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// TV SHOW API

export const getSeriesMovies = async (page = 1, limit = 10) => {
  try {
    const res = await api.get(`/v1/api/danh-sach/phim-bo`, {
      params: { page, limit },
    });
    console.log("Raw API Response:", res.data);
    console.log("Items:", res.data.data.items);

    return {
      items: res.data.data.items || [],
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

export const search = async ({
  keyword = "",
  page = 1,
  limit = 12,
  sortField = "_id",
  sortType = "asc",
  sortLang = "long-tieng",
  category = "",
  country = "",
  year = "",
}) => {
  try {
    const params = {
      keyword,
      page,
      limit,
      sort_field: sortField,
      sort_type: sortType,
      sort_lang: sortLang,
      category,
      country,
      year,
    };
    // Loại bỏ các tham số undefined hoặc rỗng
    Object.keys(params).forEach((key) =>
      !params[key] && params[key] !== 0 ? delete params[key] : {}
    );
    const res = await api.get(`https://phimapi.com/v1/api/tim-kiem`, {
      params,
    });
    return res.data.data?.items || []; // Giả định API trả về { data: { items: [...] } }
  } catch (err) {
    console.error("Lỗi search:", err.response?.data || err.message);
    return [];
  }
};
