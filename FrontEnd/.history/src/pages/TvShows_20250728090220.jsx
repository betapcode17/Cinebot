import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import axios from "axios";

const TvShows = () => {
  const [shows, setShows] = useState([]);
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
    const fetchShows = async () => {
      const { query, genre, sortBy, year } = filters;

      let url = `https://api.themoviedb.org/3/discover/tv?language=vi&page=${page}`;

      if (query)
        url = `https://api.themoviedb.org/3/search/tv?query=${query}&language=vi&page=${page}`;
      if (genre) url += `&with_genres=${genre}`;
      if (sortBy) url += `&sort_by=${sortBy}`;
      if (year) url += `&first_air_date_year=${year}`;

      try {
        const res = await axios.get(url, headers);
        setShows(res.data.results);
        setTotalPages(res.data.total_pages > 500 ? 500 : res.data.total_pages);
      } catch (err) {
        console.error("Lỗi load TV Shows:", err);
      }
    };

    fetchShows();
  }, [filters, page]);

  return (
    <div className="bg-[#111] px-4 py-6 text-white flex justify-center">
      <div className="w-full max-w-7xl">
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          setPage={setPage}
        />
        <h2 className="text-2xl font-semibold mb-4">TV Shows</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {shows.map((show) => (
            <MovieCard key={show.id} data={show} type="tv" />
          ))}
        </div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default TvShows;
