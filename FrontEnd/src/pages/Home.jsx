import Banner from "../components/Banner";
import MovieList from "../components/MovieList";
import MovieSearch from "../components/MovieSearch";

const Home = ({ trendingMovies, topRatedMovies, searchData }) => {
  const hasSearch = searchData && searchData.length > 0;

  return (
    <div className="min-h-screen bg-black text-white pb-10">
      <Banner />

      {hasSearch ? (
        <MovieSearch data={searchData} />
      ) : (
        <>
          <MovieList title="Phim Hot" data={trendingMovies.slice(0, 10)} />
          <MovieList title="Phim Đề Cử" data={topRatedMovies.slice(0, 10)} />
        </>
      )}
    </div>
  );
};

export default Home;
