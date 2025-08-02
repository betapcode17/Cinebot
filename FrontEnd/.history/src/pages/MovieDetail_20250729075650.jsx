import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Recommended from "../components/Recommended";

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

    const fetchTrailer = async () => {
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
    fetchTrailer();
  }, [id]);

  if (!movie)
    return <div className="text-white text-center mt-10">Đang tải...</div>;

  return (
    <div className="bg-[#111] text-white p-6 pt-28 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Phần chi tiết phim */}
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src={`${IMG_URL}${movie.poster_path}`}
              alt={movie.title}
              className="w-64 md:w-72 rounded-xl shadow"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2 uppercase">
                {movie.title}
              </h1>
              <p className="text-gray-400 italic">{movie.tagline}</p>

              <div className="space-y-1 mt-4 text-sm md:text-base">
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
              </div>

              <button className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold">
                XEM PHIM
              </button>
            </div>
          </div>

          {/* Trailer */}
          {videoKey && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-2 text-red-400">Trailer</h2>
              <div className="aspect-video w-full rounded overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${videoKey}`}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Nội dung */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-red-500 mb-2">
              NỘI DUNG CHI TIẾT
            </h2>
            <p className="text-gray-300">{movie.overview}</p>
          </div>
          {/* Thông tin thêm */}
          <div>
            <Recommended type="movie" /> {/* Cinema Movies */}
          </div>
        </div>

        {/* Bảng xếp hạng và sắp chiếu */}
        <div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
