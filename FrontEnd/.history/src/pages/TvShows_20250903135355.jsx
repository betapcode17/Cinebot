import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import { getSeriesMovies } from "../api/tvShowApi";

const TvShows = () => {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ query: "", year: "" });
  const [hasMoreData, setHasMoreData] = useState(true);
  const limit = 12;

  const fetchShows = async (pageNum) => {
    setIsLoading(true);
    try {
      const items = await getSeriesMovies(pageNum, page);
      if (!items || items.length === 0) {
        // không còn dữ liệu nữa
        setHasMoreData(false);
        return;
      }
      setShows(items);
      setPage(pageNum);
      setHasMoreData(true);
    } catch (err) {
      console.error("Lỗi load TV Shows:", err);
      setShows([]);
      setHasMoreData(false);
    } finally {
      setIsLoading(false);
    }
  };

  // gọi lần đầu
  useEffect(() => {
    fetchShows(1);
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
