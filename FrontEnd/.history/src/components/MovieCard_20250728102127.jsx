import { useNavigate } from "react-router-dom";

const MovieCard = ({ data }) => {
  const navigate = useNavigate();

  const path = `/phim/${data.slug}`;
  const imageUrl = data.poster_url?.startsWith("http")
    ? data.poster_url
    : `https://img.phimapi.com${data.poster_url}`;

  return (
    <div
      onClick={() => navigate(path)}
      className="cursor-pointer hover:scale-105 transition duration-300"
    >
      <img
        src={imageUrl}
        alt={data.name}
        onError={(e) => {
          console.log("Lỗi ảnh:", e.target.src);
          e.target.src = "/fallback.jpg";
        }}
        className="w-full h-auto rounded"
      />
      <p className="text-sm mt-2 text-center">{data.name}</p>
    </div>
  );
};

export default MovieCard;
