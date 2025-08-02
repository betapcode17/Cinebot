import React, { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const [trending, setTrending] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day"); // "day", "week", or "month"

  const API_TOKEN = import.meta.env.VITE_API_KEY;
  const IMG_URL =
    import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w200";

  const headers = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  // Fetch trending data based on timeWindow
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/${timeWindow}?language=vi`,
          headers
        );
        setTrending(res.data.results.slice(0, 10));
      } catch (err) {
        console.error("Lỗi khi tải bảng xếp hạng:", err);
      }
    };

    fetchTrending();
  }, [timeWindow]);

  // Fetch coming soon (chỉ gọi 1 lần)
  useEffect(() => {
    const fetchComingSoon = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/movie/upcoming?language=vi&page=1",
          headers
        );
        setComingSoon(res.data.results.slice(0, 5));
      } catch (err) {
        console.error("Lỗi khi tải sắp chiếu:", err);
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

        {/* Nút chọn thời gian */}
        <div className="flex gap-4 mt-3 text-white text-sm font-medium">
          {["day", "week", "month"].map((time) => (
            <button
              key={time}
              className={`px-4 py-1 rounded ${
                timeWindow === time ? "bg-gray-600" : "hover:text-red-500"
              }`}
              onClick={() => setTimeWindow(time)}
              disabled={time === "month"} // Vì TMDB không hỗ trợ 'month'
            >
              {time === "day" ? "Ngày" : time === "week" ? "Tuần" : "Tháng"}
            </button>
          ))}
        </div>

        {/* Danh sách phim trending */}
        <div className="mt-4 space-y-4">
          {trending.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 cursor-pointer hover:bg-gray-800 p-1 rounded"
            >
              <img
                src={`${IMG_URL}${item.poster_path}`}
                alt={item.title}
                className="w-14 h-20 object-cover rounded"
              />
              <div className="text-sm">
                <p className="font-semibold text-white line-clamp-2">
                  {item.title}
                </p>
                <p className="text-gray-400 text-xs">
                  {item.popularity?.toFixed(0)} lượt xem
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SẮP CHIẾU */}
      <div>
        <h3 className="text-xl font-bold text-red-500 border-b pb-2 border-gray-600">
          SẮP CHIẾU
        </h3>
        <div className="mt-4 space-y-4">
          {comingSoon.map((item) => (
            <div key={item.id} className="flex gap-3">
              <img
                src={`${IMG_URL}${item.poster_path}`}
                alt={item.title}
                className="w-14 h-20 object-cover rounded"
              />
              <div className="text-sm">
                <p className="font-semibold text-white">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
