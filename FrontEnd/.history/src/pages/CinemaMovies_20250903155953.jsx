import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import { getSingleMovies } from "../api/kkPhimApi";

const CinemaMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({ query: "", year: "" });
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true); // còn dữ liệu hay không
  const limit = 12; // số phim mỗi trang

  const fetchMovies = async (pageNum) => {
    setIsLoading(true);
    try {
      const { items } = await getSingleMovies(pageNum, limit);
      if (!items || items.length === 0) {
        // không còn dữ liệu nữa
        setHasMoreData(false);
        return;
      }
      setMovies(items);
      setPage(pageNum);
      setHasMoreData(true);
    } catch (err) {
      console.error("Lỗi load phim:", err.response?.data || err.message);
      setMovies([]);
      setHasMoreData(false);
    } finally {
      setIsLoading(false);
    }
  };

  // gọi lần đầu
  useEffect(() => {
    fetchMovies(1);
  }, [filters]);

  // Lấy danh sách số trang để hiển thị (tối đa 10 số)
  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(1, page - 4);
    let end = start + maxVisible - 1;

    // Nếu đang ở gần trang đầu thì fix lại
    if (page <= 5) {
      start = 1;
      end = maxVisible;
    }

    let pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Xử lý khi chọn trang
  const handlePageChange = (newPage) => {
    if (newPage !== page) {
      fetchMovies(newPage);
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

        <h2 className="text-2xl font-semibold mb-4">Phim lẻ</h2>

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
              disabled={!hasMoreData && p > page}
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
            disabled={!hasMoreData}
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
