const Header = () => {
  return (
    <div className="p-4 bg-black flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-[40px] uppercase font-bold text-red-700">Movie</h1>
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
        <div></div>
      </div>
    </div>
  );
};

// đều của javascript
export default Header;
