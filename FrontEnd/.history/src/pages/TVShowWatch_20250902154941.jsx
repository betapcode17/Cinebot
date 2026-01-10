import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Recommended from "../components/Recommended";
import { getTVShowDetail, getTVShowEpisodes } from "../api/tvShowApi";
import ReactPlayer from "react-player"; // For HLS streaming

const TVShowWatch = () => {
  const { id } = useParams();
  const [tvshow, setTVShow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [seasonNumber, setSeasonNumber] = useState(1);
  const [servers, setServers] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  useEffect(() => {
    const fetchTVShowDetail = async () => {
      setIsLoading(true);
      try {
        const response = await getTVShowDetail(id);
        console.log(response); // Log to verify API response
        setTVShow(response.movie);
        setServers(response.episodes || []); // Store all servers (Vietsub, Lồng Tiếng)
        if (response.episodes?.length > 0) {
          setSelectedServer(response.episodes[0]); // Default to first server (Vietsub)
          setEpisodes(response.episodes[0].server_data || []); // Default to first server's episodes
          if (response.episodes[0].server_data?.length > 0) {
            setSelectedEpisode(response.episodes[0].server_data[0]); // Default to first episode
          }
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

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await getTVShowEpisodes(id, seasonNumber);
        console.log(response); // Log to verify API response
        setServers(response.episodes || []);
        if (response.episodes?.length > 0) {
          const selected =
            servers.find(
              (s) => s.server_name === selectedServer?.server_name
            ) || response.episodes[0];
          setSelectedServer(selected);
          setEpisodes(selected.server_data || []);
          if (selected.server_data?.length > 0) {
            setSelectedEpisode(selected.server_data[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching episodes:", err);
        setEpisodes([]);
        setSelectedEpisode(null);
      }
    };

    if (id && seasonNumber) {
      fetchEpisodes();
    }
  }, [id, seasonNumber, selectedServer?.server_name]);

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
            url={selectedEpisode.link_m3u8}
            controls
            width="100%"
            height="100%"
            className="rounded-xl"
            config={{
              file: {
                attributes: {
                  crossOrigin: "anonymous",
                },
                hlsOptions: {
                  xhrSetup: (xhr) => {
                    xhr.withCredentials = true; // Handle CORS if needed
                  },
                },
              },
            }}
          />
        </div>
        <h2 className="text-2xl font-bold mt-4">
          {tvshow.name} - {selectedEpisode.name}
        </h2>
        <p className="text-gray-400">{selectedEpisode.filename}</p>
      </div>

      {/* Grid for episodes and sidebar */}
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
              {/* Assume one season for now, adjust if API provides season data */}
              <option value={1}>Mùa 1</option>
            </select>
          </div>

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
                setSelectedEpisode(selected.server_data[0] || null);
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
