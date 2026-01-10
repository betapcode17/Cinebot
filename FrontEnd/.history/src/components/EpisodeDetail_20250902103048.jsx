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

  return <div>EpisodeDetail</div>;
};
