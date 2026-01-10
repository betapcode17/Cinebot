import React, { useEffect, useState } from "react";
import { getTrendingMovies } from "../api/movieApi";

const Sidebar = () => {
  const [trending, setTrending] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const IMG_URL = import.meta.env.VITE_IMG_URL; // Định nghĩa IMG_URL từ biến môi trường

  // Transform image URL using the VITE_IMG_URL environment variable
  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/150"; // Fallback image
    const imagePath = url.replace("https://phimimg.com/", "");
    return `${IMG_URL}${encodeURIComponent(imagePath)}`;
  };

  // Fetch trending data
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const [trending] = await Promise.all([getTrendingMovies()]);
        // Đảm bảo trả về mảng
        setTrending(trending || []).slice(0, 10);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchTrending();
  }, []);

  // Fetch coming soon (giả sử dùng endpoint riêng hoặc lọc từ trending)
  useEffect(() => {
    const fetchComingSoon = async () => {
      try {
        const [trending] = await Promise.all([getTrendingMovies()]);
        // Đảm bảo trả về mảng
        setComingSoon(trending || []).slice(0, 5);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchComingSoon();
  }, []);

  return (
    <div className="space-y-10">
      {/* BẢNG XẾP HẠNG */}
      <div>
        <h3 className="text-xl font-bold text-red-500 border-b pb-2 border-gray-600">
          BẢNG XẾP HẠNG
        </h3>

        {/* Danh sách phim trending */}
        <div className="mt-4 space-y-4">
          {trending.length > 0 ? (
            trending.map((item) => (
              <div
                key={item.id || item._id}
                className="flex gap-3 cursor-pointer hover:bg-gray-800 p-1 rounded"
              >
                <img
                  src={getImageUrl(item.poster_url || item.thumb_url)}
                  alt={item.title || item.name || "Poster"}
                  className="w-14 h-20 object-cover rounded"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/150")
                  }
                />
                <div className="text-sm">
                  <p className="font-semibold text-white line-clamp-2">
                    {item.title || item.name || "Unknown Title"}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {item.popularity?.toFixed(0) || "N/A"} lượt xem
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">Không có dữ liệu</p>
          )}
        </div>
      </div>

      {/* SẮP CHIẾU */}
      <div>
        <h3 className="text-xl font-bold text-red-500 border-b pb-2 border-gray-600">
          SẮP CHIẾU
        </h3>
        <div className="mt-4 space-y-4">
          {comingSoon.length > 0 ? (
            comingSoon.map((item) => (
              <div key={item.id || item._id} className="flex gap-3">
                <img
                  src={getImageUrl(item.poster_url || item.thumb_url)}
                  alt={item.title || item.name || "Poster"}
                  className="w-14 h-20 object-cover rounded"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/150")
                  }
                />
                <div className="text-sm">
                  <p className="font-semibold text-white">
                    {item.title || item.name || "Unknown Title"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">Không có dữ liệu</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
