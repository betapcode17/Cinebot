import { useNavigate } from "react-router-dom";

const MovieCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/movie/${data.id}`)}
      className="bg-gray-900 rounded overflow-hidden shadow-md hover:scale-105 transition transform duration-200 cursor-pointer"
    >
      <img src={`${IMG_URL}${data.poster_path}`} alt={data.title} />
      <p>{data.title}</p>
    </div>
  );
};
