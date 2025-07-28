import { useNavigate } from "react-router-dom";

const MovieCard = ({ data, type }) => {
  const navigate = useNavigate();

  // Xác định đường dẫn dựa theo type (movie / tv)
  const path = type === "tv" ? `/tv/${data.id}` : `/movie/${data.id}`;

  return (
    <div
      onClick={() => navigate(path)}
      className="cursor-pointer hover:scale-105 transition duration-300"
    >
      <img
        src={`${import.meta.env.VITE_IMG_URL}${data.poster_path}`}
        alt={data.title || data.name}
        className="w-full h-auto rounded"
      />
      <p className="text-sm mt-2 text-center">{data.title || data.name}</p>
    </div>
  );
};

export default MovieCard;
