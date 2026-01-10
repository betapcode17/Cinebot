import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { getSingleMovies } from "../api/movieApi";

const CinemaMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({ query: "", year: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12; // Số phim / page

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      // Nếu có tìm kiếm

      // Dùng getSingleMovies
      const res = await getSingleMovies(page, limit);
      setMovies(res.items || []);
      // Tạm giả sử totalPages = 10 nếu API không trả pagination
      setTotalPages(10);
    } catch (err) {
      console.error("Lỗi load phim:", err);
      setMovies([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [filters, page]);

  return (
    <div className="bg-[#111] px-4 py-6 text-white">
      <div className="max-w-7xl mx-auto">
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          setPage={setPage}
        />
        <h2 className="text-2xl font-semibold mb-4">Phim lẻ</h2>

        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : movies.length === 0 ? (
          <p className="text-center">No movies found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.slug} movie={movie} type="movie" />
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </div>
  );
};

export default CinemaMovies;
