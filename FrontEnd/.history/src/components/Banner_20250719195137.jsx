import IconRatingHalf from "../assets/rating-half.png";
import IconRating from "../assets/rating.png";
import ImgMovie from "../assets/temp-1.jpeg";
import IconPlay from "../assets/play-button.png";
import BannerBg from "../assets/banner.png"; // Thêm import cho background

const Banner = () => {
  return (
    <div
      className="md:h-[600px] h-[500px] w-full bg-cover bg-center bg-no-repeat relative mt-[75px]"
      style={{ backgroundImage: `url(${BannerBg})` }} // Sử dụng import thay vì đường dẫn tĩnh
    >
      {/* Overlay nền */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="flex flex-col md:flex-row items-center justify-between absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-7xl">
        <div className="md:w-[50%] w-full">
          <div className="flex flex-col space-y-6 items-start p-10">
            <p className="bg-gradient-to-r from-red-600 to-red-300 py-2 px-6">
              TV Show
            </p>
            <div className="flex flex-col space-y-4">
              <h1 className="text-[40px] font-bold text-white">
                Nghe nói em thích tôi
              </h1>
              <div className="flex items-center space-x-3">
                <img src={IconRating} alt="rating" className="w-8 h-8" />
                <img src={IconRating} alt="rating" className="w-8 h-8" />
                <img src={IconRating} alt="rating" className="w-8 h-8" />
                <img src={IconRating} alt="rating" className="w-8 h-8" />
                <img src={IconRatingHalf} alt="rating" className="w-8 h-8" />
              </div>
              <p className="text-white">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book.
              </p>
            </div>
            <div className="flex items-center space-x-5">
              <button className="py-2 px-3 bg-black text-white border border-black font-bold">
                Chi tiết
              </button>
              <button className="py-2 px-3 bg-red-600 text-white font-bold">
                Xem Phim
              </button>
            </div>
          </div>
        </div>
        <div className="md:w-[50%] w-full flex items-center justify-center">
          <div className="w-[300px] h-[400px] relative group">
            <button className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
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
