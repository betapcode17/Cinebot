const Header = () => {
  return (
    <div className="p-4 bg-black text-white">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Logo */}
        <h1 className="text-3xl uppercase font-bold text-red-700">Movie</h1>

        {/* Menu */}
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-center">
          <a href="#" className="hover:text-red-500">
            Home
          </a>
          <a href="#" className="hover:text-red-500">
            About
          </a>
          <a href="#" className="hover:text-red-500">
            Contact
          </a>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <input
            type="text"
            className="w-full sm:w-auto p-2 rounded bg-gray-800 text-white"
            placeholder="Search..."
          />
          <button className="p-2 bg-red-600 rounded">Search</button>
        </div>

        {/* Auth */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-red-500">
            Login
          </a>
          <a href="#" className="hover:text-red-500">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

// đều của javascript
export default Header;
