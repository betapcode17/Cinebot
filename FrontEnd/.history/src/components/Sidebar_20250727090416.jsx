import React, { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const [trending, setTrending] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");

  const API_TOKEN = import.meta.env.VITE_API_KEY;
  const IMG_URL =
    import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w200";

  const headers = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingRes, upcomingRes] = await Promise.all([
          axios.get(
            "https://api.themoviedb.org/3/trending/movie/day?language=vi",
            headers
          ),
          axios.get(
            "https://api.themoviedb.org/3/movie/upcoming?language=vi&page=1",
            headers
          ),
        ]);

        setTrending(trendingRes.data.results.slice(0, 10));
        setComingSoon(upcomingRes.data.results.slice(0, 5));
      } catch (err) {
        console.error("Lỗi khi tải sidebar:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-10">
      {/* BẢNG XẾP HẠNG */}
      <div>
        <h3 className="text-xl font-bold text-red-500 border-b pb-2 border-gray-600">
          BẢNG XẾP HẠNG
        </h3>
        <div className="mt-4 space-y-4">
          {trending.map((item) => (
            <div key={item.id} className="flex gap-3">
              <img
                src={`${IMG_URL}${item.poster_path}`}
                alt={item.title}
                className="w-14 h-20 object-cover rounded"
              />
              <div className="text-sm">
                <p className="font-semibold text-white">{item.title}</p>
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
