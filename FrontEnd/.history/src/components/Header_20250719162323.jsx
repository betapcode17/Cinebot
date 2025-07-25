const Header = () => {
  return (
    <div className="p-4 bg-black flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-[30px] uppercase font-bold text-red-700">Movie</h1>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-white">
            Home
          </a>
          <a href="#" className="text-white">
            About
          </a>
          <a href="#" className="text-white">
            Contact
          </a>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="p-4 rounded text-white bg-gray-900 focus:outline-none"
          placeholder="Search..."
        />
        <button className="p-2 bg-red-600 text-white rounded">Search</button>
      </div>
      <div className="flex items-center space-x-4">
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

// đều của javascript
export default Header;
