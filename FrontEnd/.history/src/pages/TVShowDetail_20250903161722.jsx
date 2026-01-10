import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Recommended from "../components/Recommended";
import { getTVShowDetail } from "../api/kkPhimApi";
import { addToFavoritesApi } from "../api/accountApi";
import { useAuth } from "../hooks/useAuth";

const TVShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const IMG_URL = import.meta.env.VITE_IMG_URL;

  useEffect(() => {
    const fetchTVDetail = async () => {
      setIsLoading(true);
      try {
        const response = await getTVShowDetail(id);
        console.log(response); // Log to verify API response structure
        setShow(response.movie); // API nests data under 'movie'
      } catch (err) {
        console.error("Error fetching TV show detail:", err);
        setShow(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTVDetail();
  }, [id]);

  const handleAddFavorite = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để thêm vào yêu thích");
      return;
    }

    try {
      const res = await addToFavoritesApi(
        show.id,
        "tv",
        true,
        user.accountId,
        user.sessionId
      );
      alert(res.status_message || "Đã thêm vào yêu thích!");
    } catch (err) {
      console.error("Lỗi khi thêm yêu thích:", err);
      alert("Không thể thêm vào yêu thích");
    }
  };

  // Transform image URL using VITE_IMG_URL
  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/150";
    const imagePath = url.replace("https://phimimg.com/", "");
    return `${IMG_URL}${encodeURIComponent(imagePath)}`;
  };

  // Extract YouTube video key from trailer_url
  const getVideoKey = (url) => {
    if (!url) return null;
    const match = url.match(/(?:v=)([^&]+)/);
    return match ? match[1] : null;
  };

  if (isLoading) {
    return <div className="text-white text-center mt-40">Đang tải...</div>;
  }

  if (!show) {
    return (
      <div className="text-white text-center mt-40">Không tìm thấy phim</div>
    );
  }

  return (
    <div className="bg-[#111] text-white p-6 pt-28 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Chi tiết */}
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src={getImageUrl(show.poster_url)}
              alt={show.name}
              className="w-64 md:w-72 rounded-xl shadow"
              loading="lazy"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2 uppercase">{show.name}</h1>
              <p className="text-gray-400 italic">{show.origin_name || ""}</p>

              <div className="space-y-1 mt-4 text-sm md:text-base">
                <p>
                  <strong>Số tập:</strong> {show.episode_total || "Không rõ"}
                </p>
                <p>
                  <strong>Quốc gia:</strong>{" "}
                  {show.country?.map((c) => c.name).join(", ") || "Không rõ"}
                </p>
                <p>
                  <strong>Thể loại:</strong>{" "}
                  {show.category?.map((g) => g.name).join(", ") || "Không rõ"}
                </p>
                <p>
                  <strong>Năm phát sóng:</strong> {show.year || "Không rõ"}
                </p>
                {/* Diễn viên và đạo diễn */}
                {(show.actor?.length > 0 || show.director?.length > 0) && (
                  <div className="mt-8">
                    <h2 className="text-xl font-bold text-red-400 mb-4">
                      DIỄN VIÊN & ĐẠO DIỄN
                    </h2>
                    <p className="text-sm">
                      <span>
                        Đạo diễn: {show.director?.join(", ") || "Không rõ"}
                      </span>
                      <br />
                      <span>
                        Diễn viên: {show.actor?.join(", ") || "Không rõ"}
                      </span>
                    </p>
                  </div>
                )}
                <p>
                  <strong>Đánh giá:</strong>{" "}
                  {typeof show.tmdb?.vote_average === "number"
                    ? show.tmdb.vote_average.toFixed(1)
                    : "N/A"}
                  /10 ({show.tmdb?.vote_count || 0} lượt)
                </p>
              </div>

              <div className="flex flex-row gap-x-4">
                <Link to={`/tv/${show.slug}/watch`}>
                  <button className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold">
                    XEM PHIM
                  </button>
                </Link>
                <button
                  onClick={handleAddFavorite}
                  className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold"
                >
                  Yêu thích
                </button>
              </div>
            </div>
          </div>

          {/* Trailer */}
          {show.trailer_url && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-2 text-red-400">Trailer</h2>
              <div className="aspect-video w-full rounded overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${getVideoKey(
                    show.trailer_url
                  )}`}
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
            <p className="text-gray-300">{show.content || "Không có mô tả"}</p>
          </div>

          {/* Gợi ý */}
          <div className="mt-8">
            <Recommended type="tv" />
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
