import "./index.css";

import Header from "./components/Header.jsx";
import Banner from "./components/Banner.jsx";
import MovieList from "./components/MovieList.jsx";

function App() {
  return (
    <div className="bg-black pb-10">
      <Header />
      <Banner />
      <MovieList title={"phim Hot"} />
      <MovieList title={"phim Hành Động"} />
    </div>
  );
}

export default App;
