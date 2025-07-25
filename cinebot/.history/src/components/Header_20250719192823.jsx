const Header = () => {
  return (
    <header className="p-4 bg-black flex items-center justify-between relative z-50">
      {/* Logo */}
      <div className="text-3xl uppercase font-bold text-red-700">CineBot</div>

      {/* Menu - căn giữa tuyệt đối */}
      <nav className="left-1/2 -translate-x-1/2 flex items-center space-x-6">
        <a href="#" className="text-white hover:text-red-500 transition-colors">
          Home
        </a>
        <a href="#" className="text-white hover:text-red-500 transition-colors">
          Genre
        </a>
        <a href="#" className="text-white hover:text-red-500 transition-colors">
          Country
        </a>
        <a href="#" className="text-white hover:text-red-500 transition-colors">
          Cinema Movies
        </a>
        <a href="#" className="text-white hover:text-red-500 transition-colors">
          TV Shows
        </a>
      </nav>

      {/* Search + Auth */}
      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 rounded-md bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        />
        <button className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
          Search
        </button>
        <a href="#" className="text-white hover:text-red-500 transition">
          Login
        </a>
        <a href="#" className="text-white hover:text-red-500 transition">
          Sign Up
        </a>
      </div>
    </header>
  );
};

export default Header;
