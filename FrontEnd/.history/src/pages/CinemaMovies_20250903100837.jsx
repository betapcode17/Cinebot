import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const CinemaMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://phimapi.com/v1/api/danh-sach/phim-le?page=${page}&limit=20`
        );
        const data = await res.json();

        if (data?.data?.items?.length > 0) {
          setMovies(data.data.items);
          setHasMore(true);
        } else {
          setHasMore(false); // không còn data thì disable Next
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setHasMore(false);
      }
    };
    fetchMovies();
  }, [page]);

  return (
    <div className="mt-20 px-6">
      <FilterBar />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
        hasMore={hasMore}
      />
    </div>
  );
};

export default CinemaMovies;
