import React, { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import { getSeriesMovies } from "../api/kkPhimApi";

const TvShows = () => {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    query: "",
    year: "",
    category: "",
    country: "",
    sortBy: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Lấy từ API
  const limit = 12; // Số show mỗi trang

  const fetchShows = async (pageNum) => {
    setIsLoading(true);
    try {
      const { items, totalPages: apiTotalPages } = await getSeriesMovies({
        page: pageNum,
        limit,
        sortField: filters.sortBy
          ? filters.sortBy.split(".")[0] || "_id"
          : "_id",
        sortType: filters.sortBy,
        sortLang: "",
        category: filters.category,
        country: filters.country,
        year: filters.year,
      }); // Lấy items từ API
      if (!items || items.length === 0) {
        // Không còn dữ liệu nữa
        setShows([]);
        return;
      }
      setShows(items);
      setPage(pageNum);
    } catch (err) {
      console.error("Lỗi load TV Shows:", err.response?.data || err.message);
      setShows([]);
      setHasMoreData(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Gọi lần đầu
  useEffect(() => {
    fetchShows(1);
  }, [filters]);

  // Lấy danh sách số trang để hiển thị (tối đa 5 số)
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
      fetchShows(newPage);
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
              <MovieCard
                key={item._id || item.id || item.slug}
                movie={item}
                type="tv"
              />
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center gap-2">
          {/* Prev */}
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 rounded border bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
          >
            Prev
          </button>

          {/* Page numbers */}
          {getVisiblePages().map((p) => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              disabled={!hasMoreData && p > page}
              className={`px-3 py-1 rounded border ${
                p === page
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {p}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={!hasMoreData}
            className="px-3 py-1 rounded border bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TvShows;
