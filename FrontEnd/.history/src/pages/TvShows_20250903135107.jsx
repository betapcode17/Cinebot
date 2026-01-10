import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { getSeriesMovies } from "../api/tvShowApi";

const TvShows = () => {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const limit = 12;

  useEffect(() => {
    const fetchShows = async () => {
      setIsLoading(true);
      try {
        const res = await getSeriesMovies(filters, page);
        console.log(res); // Log to verify API response structure
        setShows(res.items || []);
        setTotalPages(
          res.pagination?.totalPages > 500
            ? 500
            : res.pagination?.totalPages || 1
        );
      } catch (err) {
        console.error("Lỗi load TV Shows:", err);
        setShows([]);
        setTotalPages(1);
      } finally {
        setIsLoading(false);
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
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : shows.length === 0 ? (
          <p className="text-center">No TV shows found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {shows.map((item) => (
              <MovieCard key={item.id} movie={item} type="tv" />
            ))}
          </div>
        )}
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

export default TvShows;
