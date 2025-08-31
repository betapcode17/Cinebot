// src/pages/Favorites.jsx
import { useFavorites } from "../context/FavoriteContext";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Phim yêu thích</h1>
      <div className="grid grid-cols-3 gap-4">
        {favorites.length > 0 ? (
          favorites.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>Bạn chưa thêm phim nào vào yêu thích.</p>
        )}
      </div>
    </div>
  );
};
export default Favorites;
