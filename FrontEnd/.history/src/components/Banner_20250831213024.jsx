import IconRatingHalf from "../assets/rating-half.png";
import IconRating from "../assets/rating.png";
import ImgMovie from "../assets/temp-1.jpeg";
import IconPlay from "../assets/play-button.png";

const Banner = () => {
  return (
    <div
      className="relative w-full h-auto md:h-[600px] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/banner.png')" }}
    >
      {/* Overlay dùng layering với relative + z-index */}
      <div className="w-full h-full bg-black/40 relative z-10 flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-10 gap-10">
        {/* Left content */}
        <div className="w-full md:w-1/2 space-y-6 text-white">
          <p className="inline-block bg-gradient-to-r from-red-600 to-red-300 py-2 px-6 text-sm font-medium">
            TV Show
          </p>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold">Love Heals</h1>

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
              This drama tells the complicated love story of two doctors: Ning
              Zhi Qian (played by Peng Guan Ying) and Ruan Liu Zheng (played by
              Wang Chu Ran). They were once married but got divorced due to
              misunderstandings and past hurts. Six years later, they meet again
              at the hospital and work together. Through various surgeries and
              work challenges, they gradually come to understand each other and
              rekindle their feelings. The film not only focuses on their love
              but also highlights the value of maturity, forgiveness, and
              passion for the medical profession.
            </p>
          </div>

          <div className="flex space-x-4 mt-4">
            <button className="py-2 px-4 bg-black text-white border border-white font-semibold">
              Detail
            </button>
            <button className="py-2 px-4 bg-red-600 text-white font-semibold">
              Watch movie
            </button>
          </div>
        </div>

        {/* Right content */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-[300px] h-[400px] relative group rounded overflow-hidden shadow-lg">
            <div className="w-full h-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 absolute inset-0">
              <img src={IconPlay} alt="play" className="w-16 h-16" />
            </div>
            <img
              src={ImgMovie}
              alt="banner"
              className="object-cover w-full h-full block"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
