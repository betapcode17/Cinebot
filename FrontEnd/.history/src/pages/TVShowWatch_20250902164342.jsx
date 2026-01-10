import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Recommended from "../components/Recommended";
import { getTVShowDetail } from "../api/tvShowApi";
import ReactPlayer from "react-player";

const TVShowWatch = () => {
  const { id } = useParams();
  const [tvshow, setTVShow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [servers, setServers] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    const fetchTVShowDetail = async () => {
      setIsLoading(true);
      try {
        const response = await getTVShowDetail(id);
        console.log(response);

        if (response.status) {
          setTVShow(response.movie);

          const epsServers = response.episodes || [];
          setServers(epsServers);

          // Chọn server mặc định là Vietsub nếu có
          const defaultServer =
            epsServers.find((s) => s.server_name.includes("Vietsub")) ||
            epsServers[0] ||
            null;

          setSelectedServer(defaultServer);
          setEpisodes(defaultServer?.server_data || []);
          setSelectedEpisode(defaultServer?.server_data?.[0] || null);
        }
      } catch (err) {
        console.error("Error fetching TV show detail:", err);
        setTVShow(null);
        setServers([]);
        setEpisodes([]);
        setSelectedEpisode(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTVShowDetail();
  }, [id]);

  if (isLoading) {
    return <div className="text-white text-center mt-10">Đang tải...</div>;
  }

  if (!tvshow || !selectedEpisode) {
    return (
      <div className="text-white text-center mt-10">
        Không tìm thấy phim hoặc tập phim
      </div>
    );
  }

  return (
    <div className="bg-[#111] text-white px-4 py-8 min-h-screen pt-28">
      {/* Video player */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="w-full aspect-video">
          <ReactPlayer
            url={selectedEpisode.link_embed}
            controls
            width="100%"
            height="100%"
            className="rounded-xl"
          />
        </div>
        <h2 className="text-2xl font-bold mt-4">
          {tvshow.name} - {selectedEpisode.name}
        </h2>
        <p className="text-gray-400">{selectedEpisode.filename}</p>
      </div>

      {/* Grid for episodes and sidebar */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-6">
          {/* Chọn server */}
          <div className="bg-[#0f0f0f] border border-[#333] rounded-md p-4 shadow">
            <label className="text-yellow-400 font-semibold mr-2">
              Chọn server:
            </label>
            <select
              className="bg-gray-800 text-white px-2 py-1 rounded"
              value={selectedServer?.server_name || ""}
              onChange={(e) => {
                const selected = servers.find(
                  (s) => s.server_name === e.target.value
                );
                setSelectedServer(selected);
                setEpisodes(selected.server_data || []);
                setSelectedEpisode(selected.server_data?.[0] || null);
              }}
            >
              {servers.map((server) => (
                <option key={server.server_name} value={server.server_name}>
                  {server.server_name}
                </option>
              ))}
            </select>
          </div>

          {/* Chọn tập phim */}
          <div className="bg-[#0f0f0f] border border-[#333] rounded-md p-4 shadow">
            <h3 className="text-xl font-bold mb-4 text-white">
              TẬP PHIM{" "}
              <span className="bg-yellow-500 text-black text-xs ml-2 px-2 py-1 rounded">
                {selectedServer?.server_name.includes("Vietsub")
                  ? "Phụ đề"
                  : "Lồng Tiếng"}
              </span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {episodes.map((ep) => (
                <button
                  key={ep.slug}
                  className={`px-4 py-1 rounded font-semibold text-sm ${
                    selectedEpisode?.slug === ep.slug
                      ? "bg-pink-600 text-white"
                      : "bg-white text-black hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedEpisode(ep)}
                >
                  {ep.name}
                </button>
              ))}
            </div>
          </div>

          {/* Episode info */}
          <div>
            <h3 className="text-xl font-bold mb-2">THÔNG TIN TẬP</h3>
            <p className="text-gray-300">{selectedEpisode.filename}</p>
          </div>

          {/* Gợi ý phim */}
          <div className="mt-8">
            <Recommended type="tv" />
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
