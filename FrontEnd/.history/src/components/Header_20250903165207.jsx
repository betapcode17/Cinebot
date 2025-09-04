import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import { useAuth } from "../hooks/useAuth";

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const dropdownUserOptions = [
    { value: "profile", label: "Quản lý tài khoản", link: "/profile" },
    { value: "favorites", label: "Phim yêu thích", link: "/favorites" },
    { value: "watchlist", label: "Danh sách Xem sau", link: "/watchlist" },
    { value: "logout", label: "Đăng xuất" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[9999] bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="text-2xl font-bold text-red-600 uppercase">
            Cinebot
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center space-x-10 text-sm md:text-base">
          <Link to="/" className="hover:text-red-500 transition">
            Home
          </Link>

          <Link to="/movies" className="hover:text-red-500 transition">
            Cinema Movies
          </Link>

          <Link to="/tvshows" className="hover:text-red-500 transition">
            TV Shows
          </Link>

          <Link to="/movies" className="hover:text-red-500 transition">
            Cartoon
          </Link>
        </nav>

        {/* Search + User */}
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

          {/* Nếu có user → hiển thị dropdown, không thì Login/Signup */}
          {user ? (
            <Dropdown
              label={`Hi, ${user.username}`}
              options={dropdownUserOptions}
              onSelect={(value) => {
                if (value === "logout") {
                  handleLogout();
                } else if (value === "profile") {
                  navigate("/profile");
                } else if (value === "favorites") {
                  navigate("/favorites");
                } else if (value === "watchlist") {
                  navigate("/watchlist");
                }
              }}
            />
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-red-500 text-sm transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hover:text-red-500 text-sm transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
