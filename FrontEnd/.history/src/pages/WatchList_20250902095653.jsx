import React, { useState } from "react";
const WatchListPage = () => {
  const [watchList, setWatchList] = useState([
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
  const removeFromWatchLists = (id) => {
    setWatchList(watchList.filter((movie) => movie.id !== id));
  };
  return (
    <div className="mt-20">
      <h2
        className="text-2xl font-bold mb-
      "
      >
        Danh sách phim xem sau
      </h2>
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
          {watchList.map((movie) => (
            <tr key={movie.id} className="hover:bg-gray-700 transition-colors">
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
                  onClick={() => removeFromWatchLists(movie.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => removeFromWatchLists()}></button>
    </div>
  );
};

export default WatchListPage;
