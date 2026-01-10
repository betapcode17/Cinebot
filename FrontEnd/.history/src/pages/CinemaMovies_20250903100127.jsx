import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import { getSingleMovies } from "../api/movieApi";

const CinemaMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({ query: "", year: "" });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 12; // số phim mỗi lần lấy

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const { items } = await getSingleMovies(page, limit, filters);

      if (items.length === 0) {
        setHasMore(false); // hết phim
      } else {
        setMovies((prev) => [...prev, ...items]); // nối thêm phim
      }
    } catch (err) {
      console.error("Lỗi load phim:", err.response?.data || err.message);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset khi thay filter
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [filters]);

  // Load phim khi page thay đổi
  useEffect(() => {
    if (hasMore) {
      fetchMovies();
    }
  }, [page, hasMore]);

  return (
    <div className="bg-[#111] px-4 py-6 text-white">
      <div className="max-w-7xl mx-auto">
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          setPage={setPage}
        />
        <h2 className="text-2xl font-semibold mb-4">Phim lẻ</h2>

        {movies.length === 0 && !isLoading && (
          <p className="text-center">No movies found.</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard
              key={movie._id || movie.id || movie.slug}
              movie={movie}
              type="movie"
            />
          ))}
        </div>

        {/* Nút Xem thêm */}
        {hasMore && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold text-white"
              disabled={isLoading}
            >
              {isLoading ? "Đang tải..." : "Xem thêm"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CinemaMovies;
