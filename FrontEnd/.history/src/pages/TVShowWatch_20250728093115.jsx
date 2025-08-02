import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TVShowWatch = () => {
  const { id } = useParams();
  const [tvshow, setTVShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const API_TOKEN = import.meta.env.VITE_API_KEY;
  const IMG_URL =
    import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w300";

  useEffect(() => {
    const fetchTVShowDetail = async () => {
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
        setTVShow(res.data);
      } catch (err) {
        console.error("Error fetching TV show detail:", err);
      }
    };
    const fetchEpisodes = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/episodes?language=vi`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        setEpisodes(res.data);
      } catch (err) {
        console.error("Error fetching episodes:", err);
      }
    };
    fetchTVShowDetail();
    fetchEpisodes();
  }, [id, API_TOKEN]);

  if (!tvshow || !selectedEpisode) {
    return <div className="text-white text-center mt-10">Đang tải...</div>;
  }
  return (
    <div className="bg-[#111] text-white px-4 py-8 min-h-screen pt-28">
      {/* Player */}
      <div className="w-full aspect-video mb-4">
        <iframe
          src={`https://www.youtube.com/embed/dQw4w9WgXcQ`} // Thay bằng key thật nếu có
          className="w-full h-full rounded-xl"
          allowFullScreen
        ></iframe>
      </div>

      {/* Chọn tập */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 text-yellow-400">TẬP PHIM</h3>
        <div className="flex flex-wrap gap-2">
          {episodes.map((ep) => (
            <button
              key={ep.id}
              className={`px-4 py-1 rounded ${
                selectedEpisode.id === ep.id
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
              onClick={() => setSelectedEpisode(ep)}
            >
              {ep.episode_number}
            </button>
          ))}
        </div>
      </div>

      {/* Mô tả tập */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-red-500 mb-2 uppercase">
          {tvshow.name}
        </h2>
        <p className="text-sm text-gray-300 italic mb-2">
          Tập {selectedEpisode.episode_number}: {selectedEpisode.name}
        </p>
        <p className="text-gray-400">{selectedEpisode.overview}</p>
      </div>

      {/* Nội dung phim */}
      <div>
        <h3 className="text-xl font-semibold mb-2 text-red-400">
          Nội dung chi tiết
        </h3>
        <p className="text-gray-300">{tvshow.overview}</p>
      </div>
    </div>
  );
};

export default TVShowWatch;
