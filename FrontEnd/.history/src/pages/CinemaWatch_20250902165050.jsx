import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Recommended from "../components/Recommended";
import { getTVShowDetail } from "../api/tvShowApi"; // Sử dụng tạm, có thể thay bằng movieApi
import ReactPlayer from "react-player"; // For HLS streaming

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
        const response = await getTVShowDetail(id); // Giả sử dùng chung API, thay bằng movieApi nếu cần
        console.log("API Response:", response); // Debug
        if (response && response.movie) {
          setMovie(response.movie);
          // Giả định episodes chứa server_data cho movie
          setServers(Array.isArray(response.episodes) ? response.episodes : []);
          if (response.episodes?.length > 0) {
            const selected =
              response.episodes.find((s) =>
                s.server_name.includes("Vietsub")
              ) || response.episodes[0];
            setSelectedServer(selected);
            setSelectedVideo(selected.server_data?.[0] || null); // Chọn video đầu tiên của server
          } else if (response.movie.trailer_url) {
            // Nếu không có episodes, dùng trailer_url làm fallback
            setSelectedVideo({ link_m3u8: response.movie.trailer_url });
          }
        } else {
          console.error("Invalid API response:", response);
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
        <div className="w-full aspect-video">
          {selectedVideo?.link_m3u8 ? (
            <ReactPlayer
              url={selectedVideo.link_m3u8}
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
              onError={(e) => console.error("Video playback error:", e)}
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

      {/* Grid for server selection and sidebar */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Main content */}
        <div className="md:col-span-3 space-y-6">
          {/* Chọn server */}
          {servers.length > 1 && ( // Chỉ hiển thị nếu có nhiều server
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

          {/* Gợi ý phim */}
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
