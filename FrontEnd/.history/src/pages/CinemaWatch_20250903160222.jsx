import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Recommended from "../components/Recommended";
import { getMovieDetail } from "../api/kkPhimApi";

const CinemaWatch = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [servers, setServers] = useState([]);
  const [selectedServer, setSelectedServer] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsLoading(true);
      try {
        const response = await getMovieDetail(id);
        console.log("API Response:", response);

        if (response && response.movie) {
          setMovie(response.movie);
          setServers(Array.isArray(response.episodes) ? response.episodes : []);
          if (response.episodes?.length > 0) {
            const selected =
              response.episodes.find((s) =>
                s.server_name.includes("Vietsub")
              ) || response.episodes[0];
            setSelectedServer(selected);
            setSelectedVideo(selected.server_data?.[0] || null);
          } else if (response.movie.trailer_url || response.movie.link_embed) {
            setSelectedVideo({
              link_embed:
                response.movie.link_embed || response.movie.trailer_url,
            });
          }
        } else {
          setMovie(null);
          setServers([]);
          setSelectedVideo(null);
        }
      } catch (err) {
        console.error("Error fetching movie detail:", err);
        setMovie(null);
        setServers([]);
        setSelectedVideo(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (isLoading) {
    return <div className="text-white text-center mt-10">Đang tải...</div>;
  }

  if (!movie || !selectedVideo) {
    return (
      <div className="text-white text-center mt-10">
        Không tìm thấy phim hoặc video
      </div>
    );
  }

  return (
    <div className="bg-[#111] text-white px-4 py-8 min-h-screen pt-28">
      {/* Video player */}
      <div className="max-w-7xl mx-auto w-full mb-8">
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-black">
          {selectedVideo.link_embed ? (
            <iframe
              src={selectedVideo.link_embed}
              width="100%"
              height="100%"
              allowFullScreen
              frameBorder="0"
            />
          ) : (
            <div className="text-white text-center">Không có video để phát</div>
          )}
        </div>
        <h2 className="text-2xl font-bold mt-4">{movie.name}</h2>
        <p className="text-gray-400">
          {selectedVideo.filename || "Không có thông tin video"}
        </p>
      </div>

      {/* Server selection & sidebar */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-6">
          {servers.length > 1 && (
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
                  setSelectedVideo(selected.server_data?.[0] || null);
                }}
              >
                {servers.map((server) => (
                  <option key={server.server_name} value={server.server_name}>
                    {server.server_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Movie info */}
          <div>
            <h3 className="text-xl font-bold mb-2">THÔNG TIN PHIM</h3>
            <p className="text-gray-300">{movie.content || "Không có mô tả"}</p>
            <p className="text-gray-300">Thời lượng: {movie.time || "N/A"}</p>
            <p className="text-gray-300">
              Chất lượng: {movie.quality || "N/A"}
            </p>
          </div>

          {/* Recommended */}
          <div className="mt-8">
            <Recommended type="movie" />
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

export default CinemaWatch;
