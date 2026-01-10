import React, { useState } from "react";

const FavoritesPage = () => {
  // Danh sách phim yêu thích (demo, sau này bạn có thể lấy từ API hoặc localStorage)
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

  // Xóa phim khỏi danh sách
  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((movie) => movie.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Danh sách phim yêu thích</h2>

      {favorites.length === 0 ? (
        <p className="text-gray-600">
          Bạn chưa thêm phim nào vào danh sách yêu thích.
        </p>
      ) : (
        <table className="min-w-full  border border-white shadow-md rounded-lg overflow-hidden">
          <thead className="">
            <tr>
              <th className="py-3 px-4 border-b text-left">Poster</th>
              <th className="py-3 px-4 border-b text-left">Tên phim</th>
              <th className="py-3 px-4 border-b text-left">Năm</th>
              <th className="py-3 px-4 border-b text-left">Thể loại</th>
              <th className="py-3 px-4 border-b text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((movie) => (
              <tr key={movie.id} className="hover:bg-red">
                <td className="py-3 px-4 border-b">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-16 rounded-md shadow"
                  />
                </td>
                <td className="py-3 px-4 border-b">{movie.title}</td>
                <td className="py-3 px-4 border-b">{movie.year}</td>
                <td className="py-3 px-4 border-b">{movie.genre}</td>
                <td className="py-3 px-4 border-b text-center">
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
