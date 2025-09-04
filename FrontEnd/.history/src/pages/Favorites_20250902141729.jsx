import React, { useState } from "react";
import FavoriteTV from "../components/FavoriteTV";
import FavoriteMovies from "../components/FavoriteMovies";

const FavoritesPage = () => {
  const [tab, setTab] = useState("TV"); // "TV" hoặc "Movie"

  return (
    <div className="p-6 mt-20 text-white bg-[#d4cccc]">
      <h2 className="text-2xl font-bold mb-6">Danh sách yêu thích</h2>

      <div className="flex mb-6">
        <button
          className={`mr-4 px-4 py-2 rounded ${
            tab === "TV" ? "bg-red-600" : "bg-gray-700"
          }`}
          onClick={() => setTab("TV")}
        >
          TV Shows
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tab === "Movie" ? "bg-red-600" : "bg-gray-700"
          }`}
          onClick={() => setTab("Movie")}
        >
          Movies
        </button>
      </div>

      {tab === "TV" ? <FavoriteTV /> : <FavoriteMovies />}
    </div>
  );
};

export default FavoritesPage;
