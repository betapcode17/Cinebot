import React, { useEffect, useState } from "react";
import { getFavoriteTVShowApi } from "../api/accountApi";
import { useAuth } from "../hooks/useAuth";

const FavoriteTV = () => {
  const [favoriteTV, setFavoriteTV] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const accountId = user?.accountId;
  const sessionId = user?.sessionId;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!accountId || !sessionId) {
          setFavoriteTV([]);
          return;
        }
        const data = await getFavoriteTVShowApi(accountId, sessionId);
        setFavoriteTV(data.results || []);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách TV yêu thích:", err);
        setFavoriteTV([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [accountId, sessionId]);

  if (loading)
    return <div className="text-white mt-20 p-6">Đang tải TV...</div>;
  if (favoriteTV.length === 0)
    return (
      <p className="text-gray-400 mt-6">
        Bạn chưa thêm chương trình TV nào vào danh sách yêu thích.
      </p>
    );

  return (
    <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden mt-6">
      <thead className="bg-gray-800">
        <tr>
          <th className="py-3 px-4 border-b border-gray-700 text-left">
            Poster
          </th>
          <th className="py-3 px-4 border-b border-gray-700 text-left">
            Tên chương trình
          </th>
          <th className="py-3 px-4 border-b border-gray-700 text-left">
            Ngày phát sóng đầu tiên
          </th>
          <th className="py-3 px-4 border-b border-gray-700 text-left">
            Đánh giá
          </th>
        </tr>
      </thead>
      <tbody>
        {favoriteTV.map((show) => (
          <tr key={show.id} className="hover:bg-gray-700 transition-colors">
            <td className="py-3 px-4 border-b border-gray-700">
              <img
                src={
                  show.poster_path
                    ? `https://image.tmdb.org/t/p/w200${show.poster_path}`
                    : "/no-poster.png"
                }
                alt={show.name}
                className="w-16 rounded-md shadow"
              />
            </td>
            <td className="py-3 px-4 border-b border-gray-700">
              {show.name || "N/A"}
            </td>
            <td className="py-3 px-4 border-b border-gray-700">
              {show.first_air_date
                ? new Date(show.first_air_date).toLocaleDateString("vi-VN")
                : "N/A"}
            </td>
            <td className="py-3 px-4 border-b border-gray-700">
              {show.vote_average?.toFixed(1) || "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FavoriteTV;
