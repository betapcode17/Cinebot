import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Recommended = ({ type = "movie" }) => {
  const [items, setItems] = useState([]);
  const API_TOKEN = import.meta.env.VITE_API_KEY;
  const IMG_URL =
    import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w300";

  // Transform image URL using the VITE_IMG_URL environment variable
  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/150"; // Fallback image
    return `${IMG_URL}${encodeURIComponent(url)}`; // TMDB không cần replace, chỉ ghép trực tiếp
  };

  const headers = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint =
          type === "tv"
            ? "https://api.themoviedb.org/3/tv/popular?language=vi&page=1"
            : "https://api.themoviedb.org/3/movie/popular?language=vi&page=1";

        const res = await axios.get(endpoint, headers);
        if (res.data.results && Array.isArray(res.data.results)) {
          setItems(res.data.results.slice(0, 20));
        } else {
          console.warn("No results found in API response:", res.data);
          setItems([]);
        }
      } catch (err) {
        console.error("Lỗi khi tải danh sách gợi ý:", err);
        setItems([]);
      }
    };

    fetchData();
  }, [type]);

  return (
    <div className="mt-10 bg-[#0f0f0f] border border-[#333] rounded-md p-4 shadow-md">
      <h3 className="text-xl font-bold text-red-500 mb-4">
        {type === "tv" ? "TV SHOW GỢI Ý" : "CÓ THỂ BẠN SẼ THÍCH"}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.length > 0 ? (
          items.map((item) => (
            <Link
              to={`/${type === "tv" ? "tv" : "movie"}/${item.id}`}
              key={item.id}
              className="block"
            >
              <div className="bg-gray-900 rounded overflow-hidden shadow-md hover:scale-105 transition transform duration-200 cursor-pointer">
                <img
                  src={getImageUrl(item.poster_path)}
                  alt={item.title || item.name || "Poster"}
                  className="w-full h-48 object-cover"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/150")
                  }
                />
                <div className="p-2 text-sm text-white font-medium line-clamp-2">
                  {item.title || item.name || "Unknown Title"}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 text-center">
            Không có gợi ý để hiển thị
          </p>
        )}
      </div>
    </div>
  );
};

Recommended.propTypes = {
  type: PropTypes.oneOf(["movie", "tv"]),
};

export default Recommended;
