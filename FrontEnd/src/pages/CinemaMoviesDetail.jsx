import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // Thay useNavigate bằng Link
import Sidebar from "../components/Sidebar";
import Recommended from "../components/Recommended";
import { getMovieDetail } from "../api/kkPhimApi";
import { useAuth } from "../hooks/useAuth";
import { addToFavoritesApi } from "../api/accountApi";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const IMG_URL = import.meta.env.VITE_IMG_URL;

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsLoading(true);
      try {
        const response = await getMovieDetail(id);
        setMovie(response.movie); // API response nests data under 'movie'
      } catch (err) {
        console.error("Error fetching movie detail:", err);
        setMovie(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  const handleAddFavorite = async () => {
    if (!user) {
      alert("Bạn cần đăng nhập để thêm vào yêu thích");
      return;
    }

    try {
      const res = await addToFavoritesApi(
        movie.id,
        "movie",
        true,
        user.accountId,
        user.sessionId
      );
      alert(res.status_message || "Đã thêm vào yêu thích!");
    } catch (err) {
      console.error("Error adding to favorites:", err);
      alert("Lỗi khi thêm vào yêu thích");
    }
  };

  // Transform image URL using VITE_IMG_URL
  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/150";
    const imagePath = url.replace("https://phimimg.com/", "");
    return `${IMG_URL}${encodeURIComponent(imagePath)}`;
  };

  // Extract YouTube video key from trailer_url
  const getVideoKey = (url) => {
    if (!url) return null;
    const match = url.match(/(?:v=)([^&]+)/);
    return match ? match[1] : null;
  };

  if (isLoading) {
    return <div className="text-white text-center mt-10">Đang tải...</div>;
  }

  if (!movie) {
    return (
      <div className="text-white text-center mt-10">Không tìm thấy phim</div>
    );
  }

  return (
    <div className="bg-[#111] text-white p-6 pt-28 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Phần chi tiết phim */}
        <div className="md:col-span-2">
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src={getImageUrl(movie.poster_url)}
              alt={movie.name}
              className="w-64 md:w-72 rounded-xl shadow"
              loading="lazy"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2 uppercase">
                {movie.name}
              </h1>
              <p className="text-gray-400 italic">{movie.origin_name}</p>

              <div className="space-y-1 mt-4 text-sm md:text-base">
                <p>
                  <strong>Thời lượng:</strong> {movie.time}
                </p>
                <p>
                  <strong>Quốc gia:</strong>{" "}
                  {movie.country?.map((c) => c.name).join(", ") || "Không rõ"}
                </p>
                <p>
                  <strong>Thể loại:</strong>{" "}
                  {movie.category?.map((g) => g.name).join(", ") || "Không rõ"}
                </p>
                <p>
                  <strong>Năm phát hành:</strong> {movie.year}
                </p>
                {/* Diễn viên và đạo diễn */}
                {(movie.actor?.length > 0 || movie.director?.length > 0) && (
                  <div className="mt-2">
                    <p className="text-sm">
                      <strong> Đạo diễn: </strong>
                      {movie.director?.join(", ") || "Không rõ"}
                    </p>

                    <p>
                      <strong>Diễn viên: </strong>
                      {movie.actor?.join(", ") || "Không rõ"}
                    </p>
                  </div>
                )}
                <p>
                  <strong>Đánh giá:</strong> ⭐ {movie.tmdb?.vote_average || 0}
                  /10 ({movie.tmdb?.vote_count || 0} lượt)
                </p>
              </div>

              <div className="flex flex-row gap-x-4">
                <Link
                  to={`/movie/${movie.slug || movie.id || "unknown"}/watch`}
                >
                  <button className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold">
                    XEM PHIM
                  </button>
                </Link>
                <button
                  onClick={handleAddFavorite}
                  className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold"
                >
                  Yêu thích
                </button>
              </div>
            </div>
          </div>

          {/* Trailer */}
          {movie.trailer_url && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-2 text-red-400">Trailer</h2>
              <div className="aspect-video w-full rounded overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${getVideoKey(
                    movie.trailer_url
                  )}`}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Nội dung */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-red-500 mb-2">
              NỘI DUNG CHI TIẾT
            </h2>
            <p className="text-gray-300">{movie.content}</p>
          </div>

          {/* Thông tin thêm */}
          <div>
            <Recommended type="movie" />
          </div>
        </div>

        {/* Bảng xếp hạng và sắp chiếu */}
        <div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
