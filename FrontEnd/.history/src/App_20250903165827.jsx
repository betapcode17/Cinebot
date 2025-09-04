import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { MovieProvider } from "./context/MovieDetailContext";

import Home from "./pages/Home";
import MovieDetail from "./pages/CinemaMoviesDetail";
import CinemaMovies from "./pages/CinemaMovies";
import TvShows from "./pages/TvShows";
import TVShowDetail from "./pages/TVShowDetail";
import TVShowWatch from "./pages/TVShowWatch";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Favorites from "./pages/Favorites";
import ProfilePage from "./pages/ProfilePage";
import WatchList from "./pages/WatchList";
import { getTrendingMovies, searchMovies } from "./api/kkPhimApi";
import CinemaWatch from "./pages/CinemaWatch";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const handleSearch = async (value) => {
    try {
      const results = await searchMovies(value);
      setSearchData(results || []);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trending] = await Promise.all([getTrendingMovies()]);

        // Đảm bảo trả về mảng
        setTrendingMovies(trending || []);
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
        <div className="flex-grow bg-[#111]">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  trendingMovies={trendingMovies}
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
            <Route path="/movie/:id/watch" element={<CinemaWatch />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="watchlist" element={<WatchList />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </MovieProvider>
  );
}

export default App;
