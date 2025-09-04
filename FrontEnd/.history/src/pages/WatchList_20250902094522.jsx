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
};

export const WatchList = () => {
  return <div className="mt-20">WatchList</div>;
};

export default WatchList;
