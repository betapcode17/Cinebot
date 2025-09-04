import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getSingleMovies } from "../api/movieApi"; // Import các hàm API
import { getSeriesMovies } from "../api/tvShowApi";
const Recommended = ({ type = "movie" }) => {
  const [items, setItems] = useState([]);
  const IMG_URL =
    import.meta.env.VITE_IMG_URL || "https://image.tmdb.org/t/p/w300";

  // Transform image URL using the VITE_IMG_URL environment variable
  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/150"; // Fallback image
    const imagePath = url.replace("https://phimimg.com/", "");
    return `${IMG_URL}${encodeURIComponent(imagePath)}`; // Thích hợp với phimapi.com
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (type === "tv") {
          data = await getSeriesMovies({}, 1, 20); // nhớ truyền {} làm filters
        } else {
          data = await getSingleMovies(1, 20);
        }

        if (data && Array.isArray(data.items)) {
          setItems(data.items);
        } else {
          console.warn("No valid items found in API response:", data);
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
              to={`/${type === "tv" ? "tv" : "movie"}/${item.slug}`} // Sử dụng id hoặc _id
              key={item.id || item._id}
              className="block"
            >
              <div className="bg-gray-900 rounded overflow-hidden shadow-md hover:scale-105 transition transform duration-200 cursor-pointer">
                <img
                  src={getImageUrl(item.poster_url || item.thumb_url)}
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
