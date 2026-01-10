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
    <div className="bg-[#0f0f0f] border border-[#333] rounded-md p-4 shadow">
      <h3 className="text-xl font-bold mb-3 text-yellow-300 uppercase">
        Nội dung chi tiết
      </h3>
      <h2 className="text-xl font-bold">{episode.name}</h2>

      <p>{episode.overview}</p>
    </div>
  );
};

export default EpisodeDetail;
