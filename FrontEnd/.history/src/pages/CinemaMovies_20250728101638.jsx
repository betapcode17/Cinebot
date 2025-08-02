import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import axios from "axios";

const CinemaMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    query: "",
    genre: "",
    country: "",
    year: "",
    sortBy: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_URL =
    import.meta.env.VITE_API_PHIM_LE ||
    "https://phimapi.com/v1/api/danh-sach/phim-le";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${API_URL}?page=${page}`);
        setMovies(res.data.data.items || []);
        setTotalPages(res.data.data.params?.pagination?.totalPages || 1);
      } catch (err) {
        console.error("Lỗi khi tải phim lẻ:", err);
      }
    };

    fetchMovies();
  }, [page]);

  return (
    <div className="bg-[#111] px-4 py-6 text-white">
      <div className="max-w-7xl mx-auto">
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          setPage={setPage}
        />
        <h2 className="text-2xl font-semibold mb-4">Phim lẻ</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie._id} data={movie} type="phimle" />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default CinemaMovies;
