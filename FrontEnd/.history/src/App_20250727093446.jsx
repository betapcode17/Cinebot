import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import MovieDetail from "./pages/MovieDetail";
import CinemaMovies from "./pages/CinemaMovies";
import TvShows from "./pages/TvShows";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Home from "./pages/Home"; // chuyển Home vào thư mục pages

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
        "https://api.themoviedb.org/3/movie/popular?language=vi&page=1",
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
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Header onSearch={handleSearch} />
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  trendingMovies={trendingMovies}
                  topRatedMovies={topRatedMovies}
                  searchData={searchData}
                  onSearch={handleSearch}
                />
              }
            />
            <Route path="/movies" element={<CinemaMovies />} />
            <Route path="/tvshows" element={<TvShows />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </MovieProvider>
  );
}

export default App;
