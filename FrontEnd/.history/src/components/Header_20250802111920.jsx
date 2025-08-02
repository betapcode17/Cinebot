import PropTypes from "prop-types";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import { useAuth } from "../hooks/useAuth";

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("tat-ca");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // ✅ Chuyển về home sau logout
  };

  const countryOptions = [
    { value: "tat-ca", label: "Tất cả" },
    { value: "anh", label: "Anh" },
    { value: "my", label: "Mỹ" },
    { value: "trung-quoc", label: "Trung Quốc" },
    { value: "canada", label: "Canada" },
    { value: "nhat-ban", label: "Nhật Bản" },
    { value: "han-quoc", label: "Hàn Quốc" },
    { value: "phap", label: "Pháp" },
    { value: "dai-loan", label: "Đài Loan" },
    { value: "hong-kong", label: "Hồng Kông" },
    { value: "thai-lan", label: "Thái Lan" },
    { value: "duc", label: "Đức" },
    { value: "an-do", label: "Ấn Độ" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-[9999] bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1 className="text-2xl font-bold text-red-600 uppercase">Cinebot</h1>
        </div>

        <nav className="flex flex-wrap items-center justify-center space-x-4 text-sm md:text-base">
          <Link to="/" className="hover:text-red-500 transition">
            Home
          </Link>
          <Dropdown
            label="Genre"
            options={[
              { value: "action", label: "Action" },
              { value: "comedy", label: "Comedy" },
            ]}
            onSelect={(value) => console.log("Selected Genre:", value)}
          />
          <Dropdown
            label="Country"
            options={countryOptions}
            onSelect={(value) => setCountry(value)}
          />
          <Link to="/movies" className="hover:text-red-500 transition">
            Cinema Movies
          </Link>
          <Link to="/tvshows" className="hover:text-red-500 transition">
            TV Shows
          </Link>
        </nav>

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
          {user ? (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-300">Hi, {user.username}</span>
              <button
                onClick={handleLogout}
                className="hover:text-red-500 transition"
              >
                Logout
              </button>
            </div>
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
