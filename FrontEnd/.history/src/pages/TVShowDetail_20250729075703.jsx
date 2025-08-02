import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Recommended from "../components/Recommended";

const TVShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [videoKey, setVideoKey] = useState(null);

  const IMG_URL =
    import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w500";
  const API_TOKEN = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchTVDetail = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?language=vi`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        setShow(res.data);
      } catch (err) {
        console.error("Error fetching TV show detail:", err);
      }
    };

    const fetchTrailer = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/videos?language=vi`,
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

    fetchTVDetail();
    fetchTrailer();
  }, [id]);

  if (!show)
    return <div className="text-white text-center mt-10">Đang tải...</div>;

  return (
    <div className="bg-[#111] text-white p-6 pt-28 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Chi tiết */}
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src={
                show.poster_path
                  ? `${IMG_URL}${show.poster_path}`
                  : "/no-poster.png"
              }
              alt={show.name}
              className="w-64 md:w-72 rounded-xl shadow"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2 uppercase">{show.name}</h1>
              <p className="text-gray-400 italic">{show.tagline || ""}</p>

              <div className="space-y-1 mt-4 text-sm md:text-base">
                <p>
                  <strong>Số mùa:</strong> {show.number_of_seasons}
                </p>
                <p>
                  <strong>Số tập:</strong> {show.number_of_episodes}
                </p>
                <p>
                  <strong>Quốc gia:</strong>{" "}
                  {show.origin_country?.join(", ") || "Không rõ"}
                </p>
                <p>
                  <strong>Thể loại:</strong>{" "}
                  {show.genres?.map((g) => g.name).join(", ") || "Không rõ"}
                </p>
                <p>
                  <strong>Ngày phát sóng đầu tiên:</strong>{" "}
                  {new Date(show.first_air_date).toLocaleDateString("vi-VN")}
                </p>
                <p>
                  <strong>Đánh giá:</strong> ⭐ {show.vote_average.toFixed(1)}
                  /10 ({show.vote_count} lượt)
                </p>
              </div>

              <Link to={`/tv/${show.id}/watch`}>
                <button className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold">
                  XEM PHIM
                </button>
              </Link>
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
            <p className="text-gray-300">{show.overview}</p>
          </div>

          {/* Gợi ý */}
          <div className="mt-8">
            <Recommended type="tv" /> // TV Shows
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default TVShowDetail;
