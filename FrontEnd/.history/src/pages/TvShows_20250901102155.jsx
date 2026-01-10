import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

// Import API functions
import { getTVShow } from "../api/tvShowApi";

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

  useEffect(() => {
    const fetchShows = async () => {
      try {
        // Gọi API từ file api
        const res = await getTVShow(filters, page);

        setShows(res.results); // vì getTVShow return res.data
        setTotalPages(res.total_pages > 500 ? 500 : res.total_pages);
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
          {shows.map((item) => (
            <MovieCard key={item.id} data={item} type="tv" />
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
