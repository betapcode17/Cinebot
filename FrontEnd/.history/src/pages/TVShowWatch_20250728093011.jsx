import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TVShowWatch = () => {
  const { id } = useParams();
  const [tvshow, setTVShow] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const API_TOKEN = import.meta.env.VITE_API_KEY;
  const IMG_URL =
    import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w300";

  useEffect(() => {
    const fetchTVShowDetail = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?language=vi`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        setTVShow(res.data);
      } catch (err) {
        console.error("Error fetching TV show detail:", err);
      }
    };
    const fetchEpisodes = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/episodes?language=vi`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              accept: "application/json",
            },
          }
        );
        setEpisodes(res.data);
      } catch (err) {
        console.error("Error fetching episodes:", err);
      }
    };
    fetchTVShowDetail();
    fetchEpisodes();
  }, [id, API_TOKEN]);

  if (!tvshow || !selectedEpisode) {
    return <div className="text-white text-center mt-10">Đang tải...</div>;
  }
  return;
};
