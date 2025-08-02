import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);

  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const VIDEO_URL = import.meta.env.VITE_VIDEO_URL;

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
              accept: "application/json",
            },
          }
        );
        setMovie(res.data);
      } catch (err) {
        console.error("Error fetching movie detail:", err);
      }
    };
    const fetchMovieTrailer = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
              accept: "application/json",
            },
          }
        );
        const trailer = res.data.results.find(
          (video) => video.type === "Trailer"
        );
        setVideoKey(trailer ? trailer.key : null);
      } catch (err) {
        console.error("Error fetching movie trailer:", err);
      }
    };

    fetchMovieDetail();
    fetchMovieTrailer();
  }, [id]);

  if (!movie)
    return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 mt-20">
        <img
          src={`${import.meta.env.VITE_IMG_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-72 md:w-96 rounded-xl shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="mb-2">
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className="mb-2">
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
          <p className="mb-4">
            <strong>Overview:</strong> {movie.overview}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-red-600 rounded-full text-sm font-medium"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
