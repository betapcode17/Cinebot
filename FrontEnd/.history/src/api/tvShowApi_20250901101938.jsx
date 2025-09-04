import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    accept: "application/json",
  },
});

export const getTVShow = async () => {
  const res = await api.get(`/discover/tv`,{
    params :{
      language = "", pa
    }
  });
};

// TV show detail
export const getTVShowDetail = async (id) => {
  const res = await api.get(`/tv/${id}`, {
    params: { language: "vi-VN" },
  });
  return res.data;
};

// TV show episodes
export const getTVShowEpisodes = async (id, seasonNumber) => {
  const res = await api.get(`/tv/${id}/season/${seasonNumber}`, {
    params: { language: "vi-VN" },
  });
  return res.data.episodes; // ✅ không phải results
};

// TV show trailer
export const getTrailer = async (id) => {
  const res = await api.get(`/tv/${id}/videos`, {
    params: {
      language: "vie",
    },
  });
  return res.data;
};
