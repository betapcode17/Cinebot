import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import { getSingleMovies } from "../api/kkPhimApi";

const CinemaMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    query: "",
    year: "",
    category: "",
    country: "",
    sortBy: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Lấy từ API

  const limit = 12; // Số phim mỗi trang

  const fetchMovies = async (pageNum) => {
    setIsLoading(true);
    try {
      const { items, totalPages: apiTotalPages } = await getSingleMovies({
        page: pageNum,
        limit,
        sortField: filters.sortBy
          ? filters.sortBy.split(".")[0] || "_id"
          : "_id",
        sortType: filters.sortBy
          ? filters.sortBy.split(".")[1] || "asc"
          : "asc",
        sortLang: "long-tieng",
        category: filters.category,
        country: filters.country,
        year: filters.year,
      });
      if (!items || items.length === 0) {
        setMovies([]);
        return;
      }
      setMovies(items);
      setTotalPages(apiTotalPages);
    } catch (err) {
      console.error("Lỗi load phim:", err.response?.data || err.message);
      setMovies([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  // Chỉ gọi fetchMovies khi page thay đổi (khi nhấn "Lọc phim" hoặc thay đổi trang)
  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  // Lấy danh sách số trang để hiển thị (tối đa 10 số)
  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(1, page - 4);
    let end = Math.min(start + maxVisible - 1, totalPages);

    if (page <= 5) {
      start = 1;
      end = Math.min(maxVisible, totalPages);
    }

    let pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Xử lý khi chọn trang
  const handlePageChange = (newPage) => {
    if (newPage !== page && newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="bg-[#111] px-4 py-6 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Bộ lọc */}
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          setPage={setPage}
        />

        <h2 className="text-2xl font-semibold mb-4">Cinema movies</h2>

        {/* Danh sách phim */}
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : movies.length === 0 ? (
          <p className="text-center">No movies found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie._id || movie.id || movie.slug}
                movie={movie}
                type="movie"
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex justify-center gap-2">
          {/* Prev */}
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 rounded border bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
          >
            Prev
          </button>

          {/* Page numbers */}
          {getVisiblePages().map((p) => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={`px-3 py-1 rounded border ${
                p === page
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {p}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CinemaMovies;
