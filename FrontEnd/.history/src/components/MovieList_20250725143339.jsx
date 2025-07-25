import PropTypes from "prop-types";
import { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MovieContext } from "../context/MovieDetailContext";
import { Link } from "react-router-dom";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

const MovieList = ({ title, data }) => {
  return (
    <div className="my-10 px-10 max-w-full ">
      <h2 className="text-xl uppercase mb-4">{title}</h2>
      <Carousel responsive={responsive} draggable={false}>
        {data?.map((movie) => (
          <Link
            to={`/movie/${movie.id}`} // ✅ Link tới chi tiết phim
            key={movie.id}
            className="bg-cover bg-no-repeat bg-center w-[200px] h-[300px] relative hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
            style={{
              backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${
                movie.poster_path
              })`,
            }}
          >
            <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0 z-0" />
            <div className="relative p-4 flex flex-col items-center justify-end h-full">
              <h3 className="text-md uppercase text-center">
                {movie.name || movie.title || movie.original_title}
              </h3>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array,
};

export default MovieList;
