import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown"; // Assuming you have a Dropdown component

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  // Danh sách thể loại
  const genreOptions = [
    { value: "hanh-dong", label: "Hành Động" },
    { value: "hai-huoc", label: "Hài Hước" },
    { value: "tam-ly", label: "Tâm Lý" },
  ];

  // Danh sách quốc gia
  const countryOptions = [
    { value: "my", label: "Mỹ" },
    { value: "nhat-ban", label: "Nhật Bản" },
    { value: "han-quoc", label: "Hàn Quốc" },
  ];

  const handleGenreSelect = (value) => {
    console.log("Thể loại đã chọn:", value);
    // navigate(`/the-loai/${value}`); nếu muốn điều hướng
  };

  const handleCountrySelect = (value) => {
    console.log("Quốc gia đã chọn:", value);
    // navigate(`/quoc-gia/${value}`); nếu muốn điều hướng
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[9999] bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Nav */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1 className="text-2xl font-bold text-red-600 uppercase">Cinebot</h1>

          {/* Mobile Nav Toggle if needed */}
          {/* <button className="md:hidden text-white">☰</button> */}
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center space-x-4 text-sm md:text-base">
          <Link to="/" className="hover:text-red-500 transition">
            Home
          </Link>
          <a href="#" className="hover:text-red-500 transition">
            Genre
          </a>
          <a href="#" className="hover:text-red-500 transition">
            Country
          </a>
          <Link
            to="/movies"
            className="text-white hover:text-red-500 transition duration-300"
          >
            Cinema Movies
          </Link>
          <Link
            to="/tvshows"
            className="hover:text-red-500 text-white transition duration-300"
          >
            TV Shows
          </Link>
        </nav>

        {/* Search + Auth */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm w-full md:w-[180px]"
          />
          <button
            onClick={() => onSearch(search)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-semibold transition"
          >
            Search
          </button>
          <Link to="/login" className="hover:text-red-500 text-sm transition">
            Login
          </Link>
          <Link to="/signup" className="hover:text-red-500 text-sm transition">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
