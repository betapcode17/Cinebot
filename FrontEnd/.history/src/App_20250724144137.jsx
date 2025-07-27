import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";
import { MovieProvider } from "./context/MovieDetailContext";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (value) => {
    if (value.trim() === "") {
      setSearchData([]);
      return;
    }

    setLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        value
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const urls = [
          "https://api.themoviedb.org/3/trending/movie/day?language=vi",
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        ];

        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          },
        };

        const responses = await Promise.all(
          urls.map((url) =>
            fetch(url, options).then((res) => {
              if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
              }
              return res.json();
            })
          )
        );

        setTrendingMovies(responses[0]?.results || []);
        setTopRatedMovies(responses[1]?.results || []);
      } catch (error) {
        console.error("Fetch movies error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <MovieProvider>
      <div className="h-full bg-black text-white min-h-screen pb-10 relative">
        <Header onSearch={handleSearch} />
        <Banner />

        {loading && <div className="text-center py-10">Loading...</div>}

        {error && (
          <div className="text-center py-10 text-red-500">Error: {error}</div>
        )}

        {!loading && !error && (
          <>
            {searchData.length > 0 ? (
              <MovieSearch data={searchData} />
            ) : (
              <>
                <MovieList
                  title="Phim Hot"
                  data={trendingMovies.slice(0, 10)}
                />
                <MovieList
                  title="Phim đề cử"
                  data={topRatedMovies.slice(0, 10)}
                />
              </>
            )}
          </>
        )}
      </div>
    </MovieProvider>
  );
}

export default App;
