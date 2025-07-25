import banner from "../assets/banner.jpg";

export function Banner() {
  return (
    <div
      className="relative bg-cover bg-center w-full h-screen flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Movie Web
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Discover and explore movies with your friends. Enjoy curated content,
          latest releases and personalized recommendations.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <button className="bg-red-700 hover:bg-red-800 px-6 py-2 rounded-full text-white text-sm font-semibold">
            Get Started
          </button>
          <button className="bg-white hover:bg-gray-200 px-6 py-2 rounded-full text-red-700 text-sm font-semibold">
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
}
