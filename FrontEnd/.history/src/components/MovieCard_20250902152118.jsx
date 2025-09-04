import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, type }) => {
  const navigate = useNavigate();

  // Xác định đường dẫn dựa theo type (movie / tv)
  const path = type === "tv" ? `/tv/${movie.id}` : `/movie/${movie.id}`;

  return (
    <div
      onClick={() => navigate(path)}
      className="cursor-pointer hover:scale-105 transition duration-300"
    >
      <img
        src={`${movie.poster_url || movie.thumb_url}`}
        alt={movie.title || movie.name}
        className="w-full h-auto rounded"
      />
      <p className="text-sm mt-2 text-center">{movie.title || movie.name}</p>
    </div>
  );
};

export default MovieCard;
