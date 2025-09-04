import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, type }) => {
  const navigate = useNavigate();

  // Xác định đường dẫn dựa theo type (movie / tv) và đảm bảo id hợp lệ
  const getValidId = () => {
    if (!movie) return "unknown";
    return movie._id || "unknown"; // Ưu tiên tmdb.id, sau đó _id
  };

  const path = type === "tv" ? `/tv/${getValidId()}` : `/movie/${getValidId()}`;

  // Transform image URL using the VITE_IMG_URL environment variable
  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/150"; // Fallback image
    const imagePath = url.replace("https://phimimg.com/", "");
    return `${import.meta.env.VITE_IMG_URL}${encodeURIComponent(imagePath)}`;
  };

  return (
    <div
      onClick={() => navigate(path)}
      className="cursor-pointer hover:scale-105 transition duration-300"
    >
      <img
        src={getImageUrl(movie.poster_url || movie.thumb_url)}
        alt={movie.title || movie.name || "Movie Poster"}
        className="w-full h-auto rounded"
        loading="lazy"
      />
      <p className="text-sm mt-2 text-center">
        {movie.title || movie.name || "Unknown Title"}
      </p>
    </div>
  );
};

export default MovieCard;
