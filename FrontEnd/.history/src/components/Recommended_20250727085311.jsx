import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ Thêm dòng này

const Recommended = () => {
  const [movies, setMovies] = useState([]);

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
    const fetchRecommended = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?language=vi&page=1",
          headers
        );
        setMovies(res.data.results.slice(0, 20));
      } catch (err) {
        console.error("Lỗi khi tải danh sách gợi ý:", err);
      }
    };

    fetchRecommended();
  }, []);

  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-yellow-500 mb-4">
        CÓ THỂ BẠN SẼ THÍCH
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="bg-gray-900 rounded overflow-hidden shadow-md hover:scale-105 transition transform duration-200 cursor-pointer">
              <img
                src={`${IMG_URL}${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-2 text-sm text-white font-medium line-clamp-2">
                {movie.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
