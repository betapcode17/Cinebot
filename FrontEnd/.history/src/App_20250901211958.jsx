import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { MovieProvider } from "./context/MovieDetailContext";

import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import CinemaMovies from "./pages/CinemaMovies";
import TvShows from "./pages/TvShows";
import TVShowDetail from "./pages/TVShowDetail";
import TVShowWatch from "./pages/TVShowWatch";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Favorites from "./pages/Favorites";

import {
  getTrendingMovies,
  getPopularMovies,
  searchMovies,
} from "./api/movieApi";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const handleSearch = async (value) => {
    try {
      const results = await searchMovies(value);
      setSearchData(results);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trending, popular] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies(),
        ]);
        setTrendingMovies(trending);
        setTopRatedMovies(popular);
      } catch (err) {
        console.error("Error fetching movies:", err);
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
            <Route path="/tv/:id" element={<TVShowDetail />} />
            <Route path="/tv/:id/watch" element={<TVShowWatch />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/favo" element={<Favorites />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </MovieProvider>
  );
}

export default App;
