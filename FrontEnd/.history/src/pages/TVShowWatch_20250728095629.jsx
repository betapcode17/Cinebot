import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Recommended from "../components/Recommended";

const TVShowWatch = () => {
  const { id } = useParams();
  const [tvshow, setTVShow] = useState(null);
  const [seasonNumber, setSeasonNumber] = useState(1);
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

    fetchTVShowDetail();
  }, [id]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?language=vi`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        setEpisodes(res.data.episodes);
        setSelectedEpisode(res.data.episodes[0]);
      } catch (err) {
        console.error("Error fetching episodes:", err);
      }
    };

    if (id && seasonNumber) {
      fetchEpisodes();
    }
  }, [id, seasonNumber]);

  if (!tvshow || !selectedEpisode) {
    return <div className="text-white text-center mt-10">Đang tải...</div>;
  }

  return (
    <div className="bg-[#111] text-white px-4 py-8 min-h-screen pt-28">
      {/* Video Player */}
      <div className="w-full aspect-video mb-8">
        <iframe
          src={`https://www.youtube.com/embed/dQw4w9WgXcQ`} // Thay bằng trailer nếu có
          className="w-full h-full rounded-xl"
          allowFullScreen
        ></iframe>
      </div>

      {/* Grid bắt đầu từ TẬP PHIM */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Main content */}
        <div className="md:col-span-3 space-y-6">
          {/* Chọn season */}
          <div className="bg-[#0f0f0f] border border-[#333] rounded-md p-4 shadow">
            <label className="text-yellow-400 font-semibold mr-2">
              Chọn mùa:
            </label>
            <select
              className="bg-gray-800 text-white px-2 py-1 rounded"
              value={seasonNumber}
              onChange={(e) => setSeasonNumber(Number(e.target.value))}
            >
              {Array.from({ length: tvshow.number_of_seasons }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Mùa {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn tập phim */}
          <div className="bg-[#0f0f0f] border border-[#333] rounded-md p-4 shadow">
            <h3 className="text-xl font-bold mb-4 text-white">
              TẬP PHIM{" "}
              <span className="bg-yellow-500 text-black text-xs ml-2 px-2 py-1 rounded">
                Phụ đề
              </span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {episodes.map((ep) => (
                <button
                  key={ep.id}
                  className={`px-4 py-1 rounded font-semibold text-sm ${
                    selectedEpisode?.id === ep.id
                      ? "bg-pink-600 text-white"
                      : "bg-white text-black hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedEpisode(ep)}
                >
                  {ep.episode_number}
                </button>
              ))}
            </div>
          </div>

          {/* Nội dung chi tiết */}
          <div className="bg-[#0f0f0f] border border-[#333] rounded-md p-4 shadow">
            <h3 className="text-xl font-bold mb-3 text-yellow-300 uppercase">
              Nội dung chi tiết
            </h3>
            <h2 className="text-2xl font-bold text-white mb-2">
              {tvshow.name}
            </h2>
            <p className="text-gray-300">{tvshow.overview}</p>
          </div>

          {/* Gợi ý phim */}
          <div className="mt-8">
            <Recommended />
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default TVShowWatch;
