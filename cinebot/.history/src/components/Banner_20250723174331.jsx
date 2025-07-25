import IconRatingHalf from "../assets/rating-half.png";
import IconRating from "../assets/rating.png";
import ImgMovie from "../assets/temp-1.jpeg";
import IconPlay from "../assets/play-button.png";

const Banner = () => {
  return (
    <div
      className="relative w-full h-[1000px] md:h-[600px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/banner.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      <div className="absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-10 md:py-0">
        {/* Left content */}
        <div className="w-full md:w-1/2 space-y-6 text-white">
          <p className="inline-block bg-gradient-to-r from-red-600 to-red-300 py-2 px-6 text-sm font-medium">
            TV Show
          </p>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold">
              Nghe nói em thích tôi
            </h1>

            <div className="flex items-center space-x-2">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  src={IconRating}
                  alt="rating"
                  className="w-6 h-6"
                />
              ))}
              <img src={IconRatingHalf} alt="rating" className="w-6 h-6" />
            </div>

            <p className="text-sm md:text-base leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book.
            </p>
          </div>

          <div className="flex space-x-4 mt-4">
            <button className="py-2 px-4 bg-black text-white border border-white font-semibold">
              Chi tiết
            </button>
            <button className="py-2 px-4 bg-red-600 text-white font-semibold">
              Xem Phim
            </button>
          </div>
        </div>

        {/* Right content */}
        <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
          <div className="w-[300px] h-[400px] relative group rounded overflow-hidden shadow-lg">
            <button className="absolute inset-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <img src={IconPlay} alt="play" className="w-16 h-16" />
            </button>
            <img
              src={ImgMovie}
              alt="banner"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
