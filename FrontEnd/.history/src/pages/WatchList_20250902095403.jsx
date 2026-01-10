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
      {
        watchList.length == 0 ?(
             <p className="text-gray-400">
          Bạn chưa thêm phim nào vào danh sách yêu thích.
        </p>
      ) 
         : (
           <div>
        )}
     
    </div>
  );
};

export default WatchListPage;
