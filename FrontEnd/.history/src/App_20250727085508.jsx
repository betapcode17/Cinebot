import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";
import Recommended from "./components/Recommended";
import { MovieProvider } from "./context/MovieDetailContext";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Footer from "./components/Footer";
import MovieDetail from "./pages/MovieDetail";

function Home({ trendingMovies, topRatedMovies, searchData, onSearch }) {
  return (
    <div className="h-full bg-black text-white min-h-screen pb-10 relative">
      <Banner />
      {searchData.length === 0 && (
        <>
          <MovieList title="Phim Hot" data={trendingMovies.slice(0, 10)} />
          <MovieList title="Phim đề cử" data={topRatedMovies.slice(0, 10)} />
          <Recommended />
        </>
      )}
      {searchData.length > 0 && <MovieSearch data={searchData} />}
    </div>
  );
}

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
    // …same search logic…
  };

  useEffect(() => {
    // …same fetchMovies logic…
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
