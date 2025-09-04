import Banner from "../components/Banner";
import MovieList from "../components/MovieList";
import MovieSearch from "../components/MovieSearch";

// props
const Home = ({ trendingMovies, topRatedMovies, searchData }) => {
  const hasSearch = searchData && searchData.length > 0;

  return (
    <div className="min-h-screen bg-black text-white pb-10">
      <Banner />

      {hasSearch ? (
        <MovieSearch data={searchData} />
      ) : (
        <>
          <MovieList
            title="Phim Hot"
            data={(trendingMovies || []).slice(0, 10)}
            renderItem={(movie) => (
              <div key={movie.slug}>
                <img src={movie.poster_url} alt={movie.name} />
                <h3>{movie.name}</h3>
                <p>{movie.year}</p>
              </div>
            )}
          />

          <MovieList
            title="Phim Đề Cử"
            data={(topRatedMovies || []).slice(0, 10)}
            renderItem={(movie) => (
              <div key={movie.slug}>
                <img src={movie.poster_url} alt={movie.name} />
                <h3>{movie.name}</h3>
                <p>{movie.year}</p>
              </div>
            )}
          />
        </>
      )}
    </div>
  );
};

export default Home;
