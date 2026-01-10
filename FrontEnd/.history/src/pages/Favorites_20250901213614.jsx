import React, { useState } from "react";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "Your Name",
      year: 2016,
      genre: "Anime, Romance",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/0/0b/Your_Name_poster.png",
    },
    {
      id: 2,
      title: "Interstellar",
      year: 2014,
      genre: "Sci-Fi, Adventure",
      poster:
        "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    },
  ]);

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((movie) => movie.id !== id));
  };

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
