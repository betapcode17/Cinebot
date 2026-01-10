import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import axios from "axios";

const CinemaMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    query: "",
    year: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const headers = {
    headers: {
      accept: "application/json",
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      let url = `https://phimapi.com/v1/api/danh-sach/phim-le?page=${page}`;

      if (filters.query) {
        url = `https://phimapi.com/v1/api/tim-kiem?keyword=${filters.query}&page=${page}`;
      }
      if (filters.year) {
        url += `&year=${filters.year}`; // Assuming KKPhim supports year filtering; verify with API docs
      }

      try {
        const res = await axios.get(url, headers);
        setMovies(res.data.items || []);
        setTotalPages(res.data.pagination?.totalPages || 1);
      } catch (err) {
        console.error("Lỗi load phim:", err);
        setMovies([]);
        setTotalPages(1);
      }
    };

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.slug} data={movie} type="movie" />
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
