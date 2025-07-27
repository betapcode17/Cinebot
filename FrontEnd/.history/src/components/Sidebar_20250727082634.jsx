import React, { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);

  const API_TOKEN = import.meta.env.VITE_API_KEY;
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const headers = {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      accept: "application/json",
    },
  };

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          headers
        );
        setTrendingMovies(res.data.results.slice(0, 5));
      } catch (err) {
        console.error("Error fetching trending movies:", err);
      }
    };

    const fetchComingSoonMovies = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/movie/upcoming?language=vi",
          headers
        );
        setComingSoonMovies(res.data.results.slice(0, 5));
      } catch (err) {
        console.error("Error fetching coming soon movies:", err);
      }
    };

    fetchTrendingMovies();
    fetchComingSoonMovies();
  }, []);

  return (
    <aside className="bg-gray-800 text-white p-4 w-64 fixed top-0 left-0 h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Trending Movies</h2>
      <ul className="space-y-2">
        {trendingMovies.map((movie) => (
          <li key={movie.id} className="flex items-center gap-2">
            <img
              src={`${IMG_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-16 h-24 object-cover rounded"
            />
            <span>{movie.title}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold mt-6 mb-4">Coming Soon</h2>
      <ul className="space-y-2">
        {comingSoonMovies.map((movie) => (
          <li key={movie.id} className="flex items-center gap-2">
            <img
              src={`${IMG_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-16 h-24 object-cover rounded"
            />
            <span>{movie.title}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
