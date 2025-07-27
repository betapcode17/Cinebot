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

  const API_TOKEN = import.meta.env.VITE_API_KEY;

  const headers = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  const handleSearch = async (value) => {
    if (!value) return setSearchData([]);
    if (!API_TOKEN) return console.error("Missing API token");

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=vi&page=1`,
        headers
      );
      const data = await response.json();
      if (data.success === false) {
        console.error("TMDB API error:", data.status_message);
        return;
      }
      setSearchData(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (!API_TOKEN) {
        console.error("Missing API token");
        return;
      }

      const urls = [
        "https://api.themoviedb.org/3/trending/movie/day?language=vi",
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      ];

      try {
        const responses = await Promise.all(
          urls.map((url) =>
            fetch(url, headers).then((res) => {
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
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <MovieProvider>
      <div className="h-full bg-black text-white min-h-screen pb-10 relative">
        <Header onSearch={handleSearch} />
        <Banner />
        {searchData.length === 0 && (
          <>
            <MovieList title="Phim Hot" data={trendingMovies.slice(0, 10)} />
            <MovieList title="Phim đề cử" data={topRatedMovies.slice(0, 10)} />
          </>
        )}
        {searchData.length > 0 && <MovieSearch data={searchData} />}
      </div>
    </MovieProvider>
  );
}

export default App;
