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
      const res = await getSingleMovies(page, limit); // Gọi API với page và limit
      console.log("API Response:", res); // Debug response
      setMovies(res.items || []); // Lấy items từ response
      setTotalPages(res.totalPages || 1); // Lấy totalPages từ response
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
  }, [page, filters]); // Chạy lại khi page hoặc filters thay đổi

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
              <MovieCard
                key={movie.id || movie._id || movie.slug} // Sử dụng id, _id, hoặc slug
                movie={movie}
                type="movie"
              />
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
