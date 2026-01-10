import React, { useEffect, useState } from "react";
import { getFavoriteMovieApi } from "../api/accountApi";
import { useAuth } from "../hooks/useAuth";

const FavoriteMovies = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const accountId = user?.accountId;
  const sessionId = user?.sessionId;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!accountId || !sessionId) {
          setFavoriteMovies([]);
          return;
        }
        const data = await getFavoriteMovieApi(accountId, sessionId);
        setFavoriteMovies(data.results || []);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách phim yêu thích:", err);
        setFavoriteMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [accountId, sessionId]);

  if (loading)
    return <div className="text-white mt-20 p-6">Đang tải Movie...</div>;
  if (favoriteMovies.length === 0)
    return (
      <p className="text-gray-400 mt-6">
        Bạn chưa thêm phim nào vào danh sách yêu thích.
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
            Tên phim
          </th>
          <th className="py-3 px-4 border-b border-gray-700 text-left">
            Ngày phát hành
          </th>
          <th className="py-3 px-4 border-b border-gray-700 text-left">
            Đánh giá
          </th>
        </tr>
      </thead>
      <tbody>
        {favoriteMovies.map((movie) => (
          <tr key={movie.id} className="hover:bg-gray-700 transition-colors">
            <td className="py-3 px-4 border-b border-gray-700">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "/no-poster.png"
                }
                alt={movie.title}
                className="w-16 rounded-md shadow"
              />
            </td>
            <td className="py-3 px-4 border-b border-gray-700">
              {movie.title || "N/A"}
            </td>
            <td className="py-3 px-4 border-b border-gray-700">
              {movie.release_date
                ? new Date(movie.release_date).toLocaleDateString("vi-VN")
                : "N/A"}
            </td>
            <td className="py-3 px-4 border-b border-gray-700">
              {movie.vote_average?.toFixed(1) || "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FavoriteMovies;
