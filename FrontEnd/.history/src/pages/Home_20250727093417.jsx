const Home = ({ trendingMovies, topRatedMovies, searchData, onSearch }) => {
  return (
    <div className="h-full bg-black text-white min-h-screen pb-10 relative">
      <Banner />
      {searchData.length === 0 && (
        <>
          <MovieList title="Phim Hot" data={trendingMovies.slice(0, 10)} />
          <MovieList title="Phim đề cử" data={topRatedMovies.slice(0, 10)} />
        </>
      )}
      {searchData.length > 0 && <MovieSearch data={searchData} />}
    </div>
  );
};

export default Home; // ✅ phải có dòng này
