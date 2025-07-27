import { useNavigate } from "react-router-dom";

const MovieCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${data.id}`)}
      className="cursor-pointer hover:scale-105 transition duration-300"
    >
      <img
        src={`${import.meta.env.VITE_IMG_URL}${data.poster_path}`}
        alt={data.title}
        className="w-full h-auto rounded"
      />
      <p className="text-sm mt-2">{data.title || data.name}</p>
    </div>
  );
};

export default MovieCard;
