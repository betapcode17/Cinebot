const Header = () => {
  return (
    <div className="p-4 bg-black flex justify-between items-center">
      {/* Logo bên trái */}
      <div>
        <h1 className="text-[30px] uppercase font-bold text-red-700">
          CineBot
        </h1>
      </div>

      {/* Các link ở giữa */}
      <div className="flex items-center space-x-4">
        <a href="#" className="text-white">
          Home
        </a>
        <a href="#" className="text-white">
          Genre
        </a>
        <a href="#" className="text-white">
          Country
        </a>
        <a href="#" className="text-white">
          Cinema Movies
        </a>
        <a href="#" className="text-white">
          TV Shows
        </a>
      </div>

      {/* Search và Login/Signup bên phải */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="p-2 rounded text-white bg-gray-900 focus:outline-none"
          placeholder="Search..."
        />
        <button className="p-2 bg-red-600 text-white rounded">Search</button>
        <a href="#" className="text-white">
          Login
        </a>
        <a href="#" className="text-white">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Header;
