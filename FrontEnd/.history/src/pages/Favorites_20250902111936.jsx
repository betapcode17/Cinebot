import React, { useEffect, useState } from "react";
import { getFavoriteMoviesApi } from "../api/accountApi";
import { useAuth } from "../hooks/useAuth";
const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const accountId = user?.id;
  const sessionId = user?.sessionId;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!accountId || !sessionId) return;
        const data = await getFavoriteMoviesApi(accountId, sessionId);
        setFavorites(data.results || []);
      } catch (err) {
        c;
      }
    };
  });

  return (
    <div className="p-6 mt-20">
      <h2 className="text-2xl font-bold mb-6">Danh sách phim yêu thích</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-400">
          Bạn chưa thêm phim nào vào danh sách yêu thích.
        </p>
      ) : (
        <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden text-white">
          <thead className="bg-gray-800">
            <tr>
              <th className="py-3 px-4 border-b border-gray-700 text-left">
                Poster
              </th>
              <th className="py-3 px-4 border-b border-gray-700 text-left">
                Tên phim
              </th>
              <th className="py-3 px-4 border-b border-gray-700 text-left">
                Năm
              </th>
              <th className="py-3 px-4 border-b border-gray-700 text-left">
                Thể loại
              </th>
              <th className="py-3 px-4 border-b border-gray-700 text-center">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((movie) => (
              <tr
                key={movie.id}
                className="hover:bg-gray-700 transition-colors"
              >
                <td className="py-3 px-4 border-b border-gray-700">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-16 rounded-md shadow"
                  />
                </td>
                <td className="py-3 px-4 border-b border-gray-700">
                  {movie.title}
                </td>
                <td className="py-3 px-4 border-b border-gray-700">
                  {movie.year}
                </td>
                <td className="py-3 px-4 border-b border-gray-700">
                  {movie.genre}
                </td>
                <td className="py-3 px-4 border-b border-gray-700 text-center">
                  <button
                    onClick={() => removeFromFavorites(movie.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FavoritesPage;
