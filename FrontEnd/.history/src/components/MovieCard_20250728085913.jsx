import { useNavigate } from "react-router-dom";

const MovieCard = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (data.type === "movie") {
      navigate(`/movies/${data.id}`);
    } else if (data.type === "tv") {
      navigate(`/tvshows/${data.id}`);
    }
  };

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {/* Hiển thị poster phim */}
      <img src={data.posterUrl} alt={data.title} />
      <h3>{data.title}</h3>
    </div>
  );
};

export default MovieCard;
