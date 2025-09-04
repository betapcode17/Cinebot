import React, { useEffect, useState } from "react";
import { getFavoriteTVShowApi, getFavoriteMovieApi } from "../api/accountApi";
import { useAuth } from "../hooks/useAuth";

const FavoritesPage = () => {
  const [favoriteTV, setFavoriteTV] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const accountId = user?.accountId;
  const sessionId = user?.sessionId;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!accountId || !sessionId) {
          setFavoriteTV([]);
          setFavoriteMovies([]);
          return;
        }

        // Lấy TV favorites
        const tvData = await getFavoriteTVShowApi(accountId, sessionId);
        setFavoriteTV(tvData.results || []);

        // Lấy Movie favorites
        const movieData = await getFavoriteMovieApi(accountId, sessionId);
        setFavoriteMovies(movieData.results || []);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách yêu thích:", err);
        setFavoriteTV([]);
        setFavoriteMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [accountId, sessionId]);

  if (loading) {
    return <div className="text-white mt-20 p-6">Đang tải...</div>;
  }

  const renderTable = (items, type = "TV") => (
    <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden mb-8">
      <thead className="bg-gray-800">
        <tr>
          <th className="py-3 px-4 border-b border-gray-700 text-left">
            Poster
          </th>
          <th className="py-3 px-4 border-b border-gray-700 text-left">
            {type === "TV" ? "Tên chương trình" : "Tên phim"}
          </th>
          <th className="py-3 px-4 border-b border-gray-700 text-left">
            {type === "TV" ? "Ngày phát sóng đầu tiên" : "Ngày phát hành"}
          </th>
          <th className="py-3 px-4 border-b border-gray-700 text-left">
            Đánh giá
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id} className="hover:bg-gray-700 transition-colors">
            <td className="py-3 px-4 border-b border-gray-700">
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                    : "/no-poster.png"
                }
                alt={item.name || item.title}
                className="w-16 rounded-md shadow"
              />
            </td>
            <td className="py-3 px-4 border-b border-gray-700">
              {item.name || item.title || "N/A"}
            </td>
            <td className="py-3 px-4 border-b border-gray-700">
              {item.first_air_date || item.release_date
                ? new Date(
                    item.first_air_date || item.release_date
                  ).toLocaleDateString("vi-VN")
                : "N/A"}
            </td>
            <td className="py-3 px-4 border-b border-gray-700">
              {item.vote_average?.toFixed(1) || "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-6 mt-20 text-white">
      <h2 className="text-2xl font-bold mb-6">
        Danh sách chương trình TV yêu thích
      </h2>
      {favoriteTV.length === 0 ? (
        <p className="text-gray-400 mb-8">
          Bạn chưa thêm chương trình TV nào vào danh sách yêu thích.
        </p>
      ) : (
        renderTable(favoriteTV, "TV")
      )}

      <h2 className="text-2xl font-bold mb-6">Danh sách phim yêu thích</h2>
      {favoriteMovies.length === 0 ? (
        <p className="text-gray-400">
          Bạn chưa thêm phim nào vào danh sách yêu thích.
        </p>
      ) : (
        renderTable(favoriteMovies, "Movie")
      )}
    </div>
  );
};

export default FavoritesPage;
