import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Recommended from "../components/Recommended";
import { getTVShowEpisodes } from "../api/tvShowApi";
import { getTVShowDetail } from "../api/tvShowApi";
// import EpisodeDetail from "../components/EpisodeDetail";
const TVShowWatch = () => {
  const { id } = useParams();
  const [tvshow, setTVShow] = useState(null);
  const [seasonNumber, setSeasonNumber] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    const fetchTVShowDetail = async () => {
      try {
        const tvshow = await getTVShowDetail(id);
        setTVShow(tvshow);
      } catch (err) {
        console.error("Error fetching TV show detail:", err);
      }
    };

    fetchTVShowDetail();
  }, [id]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const episodes = await getTVShowEpisodes(id, seasonNumber);
        setEpisodes(episodes);
        if (episodes && episodes.length > 0) {
          setSelectedEpisode(episodes[0]);
        }
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
      {/* Video nằm riêng, full width và ở giữa */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="w-full aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/dQw4w9WgXcQ`}
            className="w-full h-full rounded-xl"
            allowFullScreen
          ></iframe>
        </div>
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
          <div>
            <EpisodeDetail
              seriesId={id}
              seasonNumber={seasonNumber}
              episodeNumber={selectedEpisode?.episode_number}
            ></EpisodeDetail>
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
