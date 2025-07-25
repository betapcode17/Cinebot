const Header = () => {
  return (
    <header className="p-4 bg-black text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Cột trái: Logo */}
        <div className="text-3xl uppercase font-bold text-red-700">CineBot</div>

        {/* Cột giữa: Menu (căn giữa bằng mx-auto) */}
        <nav className="flex-1 flex justify-center space-x-6">
          <a href="#" className="hover:text-red-500 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            Genre
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            Country
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            Cinema Movies
          </a>
          <a href="#" className="hover:text-red-500 transition-colors">
            TV Shows
          </a>
        </nav>

        {/* Cột phải: Search + Auth */}
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-2 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
          <button className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
            Search
          </button>
          <a href="#" className="hover:text-red-500 transition">
            Login
          </a>
          <a href="#" className="hover:text-red-500 transition">
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
