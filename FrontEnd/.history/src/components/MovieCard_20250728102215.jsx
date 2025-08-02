import { useNavigate } from "react-router-dom";

const MovieCard = ({ data }) => {
  const navigate = useNavigate();

  // Dùng slug để định tuyến
  const path = `/phim/${data.slug}`;

  return (
    <div
      onClick={() => navigate(path)}
      className="cursor-pointer hover:scale-105 transition duration-300"
    >
      <img
        src={data.poster_url || data.thumb_url}
        alt={data.name}
        className="w-full h-auto rounded"
      />
      <p className="text-sm mt-2 text-center">{data.name}</p>
    </div>
  );
};

export default MovieCard;
