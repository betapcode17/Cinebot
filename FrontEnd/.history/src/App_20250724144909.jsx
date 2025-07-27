import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";
import { MovieProvider } from "./context/MovieDetailContext";

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (value) => {
    const trimmedValue = value.trim();
    if (trimmedValue === "") {
      setSearchData([]);
      return;
    }

    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        trimmedValue
      )}&include_adult=false&language=vi&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSearchData(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        };

        const [popularRes, topRatedRes] = await Promise.all([
          fetch(
            "https://api.themoviedb.org/3/movie/popular?language=vi&page=1",
            options
          ),
          fetch(
            "https://api.themoviedb.org/3/movie/top_rated?language=vi&page=1",
            options
          ),
        ]);

        if (!popularRes.ok || !topRatedRes.ok) {
          throw new Error(
            `API request failed with status: ${popularRes.status}/${topRatedRes.status}`
          );
        }

        const [popularData, topRatedData] = await Promise.all([
          popularRes.json(),
          topRatedRes.json(),
        ]);

        setPopularMovies(popularData.results || []);
        setTopRatedMovies(topRatedData.results || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="h-full bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <MovieProvider>
      <div className="h-full bg-black text-white min-h-screen pb-10 relative">
        <Header onSearch={handleSearch} />
        <Banner />

        {searchData.length > 0 ? (
          <MovieSearch data={searchData} />
        ) : (
          <>
            <MovieList title="Phim Hot" data={popularMovies.slice(0, 10)} />
            <MovieList title="Phim đề cử" data={topRatedMovies.slice(0, 10)} />
          </>
        )}
      </div>
    </MovieProvider>
  );
}

export default App;
