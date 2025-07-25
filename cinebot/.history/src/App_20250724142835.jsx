import { useEffect } from "react";
import Banner from "./components/Banner";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import { useState } from "react";
import MovieSearch from "./components/MovieSearch";
import { MovieProvider } from "./context/MovieDetailContext";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const [searchData, setSearchData] = useState([]);

  const handleSearch = async (value) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=vi&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };
    if (value === "") return setSearchData([]);
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setSearchData(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async function () {
      const urls = [
        "https://api.themoviedb.org/3/trending/movie/day?language=vi",
        "https://api.themoviedb.org/3/movie/top_rated?language=vi",
      ];

      const apiKey = import.meta.env.VITE_API_KEY;

      if (!apiKey) {
        console.error(
          "❌ API Key không tồn tại. Kiểm tra lại biến môi trường VITE_API_KEY."
        );
        return;
      }

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      };

      try {
        const fetchMovies = async (url) =>
          await fetch(url, options).then((response) => response.json());

        const response = await Promise.all(urls.map(fetchMovies));

        if (response[0].success === false) {
          console.error("❌ Lỗi từ TMDB:", response[0].status_message);
        } else {
          setTrendingMovies(response[0].results);
          setTopRatedMovies(response[1].results);
        }
      } catch (error) {
        console.error("❌ Lỗi khi fetch:", error);
      }
    })();
  }, []);

  return (
    <>
      <MovieProvider>
        <div className="h-full bg-black text-white min-h-screen pb-10 relative">
          <Header onSearch={handleSearch} />
          <Banner />
          {searchData.length === 0 && (
            <MovieList title="Phim Hot" data={trendingMovies.slice(0, 10)} />
          )}
          {searchData.length === 0 && (
            <MovieList title="Phim đề cử" data={topRatedMovies.slice(0, 10)} />
          )}

          {searchData.length > 0 && <MovieSearch data={searchData} />}
        </div>
      </MovieProvider>
    </>
  );
}

export default App;
