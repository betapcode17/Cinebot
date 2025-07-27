import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);

  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const API_TOKEN = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?language=vi`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
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
          `https://api.themoviedb.org/3/movie/${id}/videos?language=vi`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        const trailer = res.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) setVideoKey(trailer.key);
      } catch (err) {
        console.error("Error fetching trailer:", err);
      }
    };

    fetchMovieDetail();
    fetchMovieTrailer();
  }, [id]);

  if (!movie)
    return <div className="text-white text-center mt-10">Đang tải...</div>;

  return (
    <div className="bg-[#111] text-white p-6 min-h-screen pt-28">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Poster */}
        <div className="flex-shrink-0">
          <img
            src={`${IMG_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-64 md:w-80 rounded-xl shadow-lg"
          />
          <button className="mt-4 w-full py-2 bg-[#e50914] hover:bg-red-700 transition rounded font-semibold">
            XEM PHIM
          </button>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 uppercase">{movie.title}</h1>
          <p className="text-gray-300 italic mb-4">{movie.tagline}</p>

          <div className="space-y-1 text-sm md:text-base">
            <p>
              <strong>Thời lượng:</strong> {movie.runtime} phút
            </p>
            <p>
              <strong>Quốc gia:</strong>{" "}
              {movie.origin_country?.join(", ") || "Không rõ"}
            </p>
            <p>
              <strong>Thể loại:</strong>{" "}
              {movie.genres?.map((g) => g.name).join(", ")}
            </p>
            <p>
              <strong>Ngày phát hành:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Đánh giá:</strong> ⭐ {movie.vote_average}/10 (
              {movie.vote_count} lượt)
            </p>
            <p>
              <strong>Ngôn ngữ:</strong>{" "}
              {movie.original_language?.toUpperCase()}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-yellow-500 mb-2">
              NỘI DUNG CHI TIẾT
            </h2>
            <p className="leading-relaxed text-gray-200">{movie.overview}</p>
          </div>

          {/* Trailer */}
          {videoKey && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2 text-red-500">
                Trailer
              </h2>
              <div className="aspect-video w-full rounded overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoKey}`}
                  title="Movie Trailer"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
