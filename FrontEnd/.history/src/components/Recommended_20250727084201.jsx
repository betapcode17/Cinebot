import React, { useEffect, useState } from "react";
import axios from "axios";

const Recommended = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const API_TOKEN = import.meta.env.VITE_API_KEY;
  const IMG_URL =
    import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w200";

  const headers = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?language=vi&page=1",
          headers
        );
        setRecommendedMovies(response.data.results.slice(0, 10));
      } catch (error) {
        console.error("Error fetching recommended movies:", error);
      }
    };

    fetchRecommendedMovies();
  }, []);

  return (
    <div className="mt-12">
      <h3
        className="text-xl font-bold text-red-500 mb-4
            "
      >
        Có thể bạn sẽ thích
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recommendedMovies.map((movie) => (
          <div key={movie.id} className="flex items-center gap-3 mb-4">
            <img
              src={`${IMG_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-16 h-24 object-cover rounded"
            />
            <div className="text-sm">
              <p className="font-semibold text-white">{movie.title}</p>
              <p className="text-gray-400 text-xs">
                {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
