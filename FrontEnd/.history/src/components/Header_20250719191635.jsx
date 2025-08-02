const Header = () => {
  return (
    <div className="p-4 bg-black flex items-center justify-between relative">
      {/* Logo */}
      <div className="text-[30px] uppercase font-bold text-red-700">
        CineBot
      </div>

      {/* Menu - căn giữa tuyệt đối */}
      <div className="absolute header__menu-center -translate-x-1/2 flex items-center space-x-6">
        <a href="#" className="text-white hover:text-red-500">
          Home
        </a>
        <a href="#" className="text-white hover:text-red-500">
          Genre
        </a>
        <a href="#" className="text-white hover:text-red-500">
          Country
        </a>
        <a href="#" className="text-white hover:text-red-500">
          Cinema Movies
        </a>
        <a href="#" className="text-white hover:text-red-500">
          TV Shows
        </a>
      </div>

      {/* Search + Auth */}
      <div className="flex items-center space-x-3">
        <input
          type="text"
          className="px-3 py-2 rounded text-white bg-gray-900 focus:outline-none"
          placeholder="Search..."
        />
        <button className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Search
        </button>
        <a href="#" className="text-white hover:text-red-500">
          Login
        </a>
        <a href="#" className="text-white hover:text-red-500">
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Header;

/* Add this CSS to your global stylesheet or import it in this file */
<style>
.header__menu-center {
  left: 50%;
}
</style>
