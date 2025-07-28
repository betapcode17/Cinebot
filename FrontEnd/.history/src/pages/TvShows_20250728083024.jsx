import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=YOUR_API_KEY`
        );
        setTvShows(res.data.results);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
    };

    fetchTvShows();
  }, []);

  return (
    <div className="px-8 py-10">
      <h2 className="text-3xl font-bold mb-6 text-white">TV Shows</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {tvShows.map((show) => (
          <Link
            to={`/moviedetail/${show.id}`}
            key={show.id}
            className="group transform hover:scale-105 transition duration-300"
          >
            <div className="rounded-xl overflow-hidden shadow-md">
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
                className="w-full h-[280px] object-cover"
              />
              <div className="bg-gray-900 text-white p-2 text-sm text-center">
                <h3 className="truncate group-hover:text-red-500 transition">
                  {show.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TvShows;
