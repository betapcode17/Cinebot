import PropTypes from "prop-types";
import Banner from "../components/Banner";
import MovieList from "../components/MovieList";
import MovieSearch from "../components/MovieSearch";

const Home = ({ trendingMovies, seriesMovies, searchData }) => {
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
          />
          <MovieList
            title="Phim Đề Cử"
            data={(seriesMovies || []).slice(0, 10)}
          />
        </>
      )}
    </div>
  );
};

Home.propTypes = {
  trendingMovies: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      name: PropTypes.string,
      title: PropTypes.string,
      poster_url: PropTypes.string,
      thumb_url: PropTypes.string,
    })
  ),
  seriesMovies: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      name: PropTypes.string,
      title: PropTypes.string,
      poster_url: PropTypes.string,
      thumb_url: PropTypes.string,
    })
  ),
  searchData: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string,
      name: PropTypes.string,
      title: PropTypes.string,
      poster_url: PropTypes.string,
      thumb_url: PropTypes.string,
    })
  ),
};

export default Home;
