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

  const API_TOKEN = import.meta.env.VITE_API_KEY;
  const IMG_URL =
    import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w300";

  const headers = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const { query, genre, sortBy, year } = filters;

      let url = `https://api.themoviedb.org/3/discover/movie?language=vi&page=${page}`;

      if (query)
        url = `https://api.themoviedb.org/3/search/movie?query=${query}&language=vi&page=${page}`;
      if (genre) url += `&with_genres=${genre}`;
      if (sortBy) url += `&sort_by=${sortBy}`;
      if (year) url += `&primary_release_year=${year}`;

      try {
        const res = await axios.get(url, headers);
        setMovies(res.data.results);
        setTotalPages(res.data.total_pages > 500 ? 500 : res.data.total_pages); // giới hạn TMDB
      } catch (err) {
        console.error("Lỗi load phim:", err);
      }
    };

    fetchMovies();
  }, [filters, page]);

  return (
    <div className="bg-[#111] px-4 py-6 text-white">
      <div className="max-w-7xl mx-auto">
        {" "}
        {/* div để căn giữa */}
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          setPage={setPage}
        />
        <h2 className="text-2xl font-semibold mb-4 ">Phim lẻ</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
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
