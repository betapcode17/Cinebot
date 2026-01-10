import React, { useEffect, useState } from "react";
import { getEpisodeDetail } from "../api/tvShowApi";

export const EpisodeDetail = ({ seriesId, seasonNumber, episodeNumber }) => {
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const data = await getEpisodeDetail(
          seriesId,
          seasonNumber,
          episodeNumber
        );
        setEpisode(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEpisode();
  }, [seriesId, seasonNumber, episodeNumber]);

  if (!episode) return <p>Đang tải nội dung tập phim.....</p>;
  return (
    <div className="text-white p-4">
      <h2 className="text-xl font-bold">{episode.name}</h2>
      <p>{episode.episode_number}</p>
      <p>{episode.air_date}</p>
      <p>{episode.overview}</p>
    </div>
  );
};

export default EpisodeDetail;
