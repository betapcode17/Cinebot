import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"; // cần: npm install react-icons

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl uppercase font-bold text-red-700">CineBot</div>

        {/* Hamburger icon for mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Menu for desktop */}
        <nav className="hidden md:flex flex-1 justify-center space-x-6">
          <a href="#" className="hover:text-red-500 transition">
            Home
          </a>
          <a href="#" className="hover:text-red-500 transition">
            Genre
          </a>
          <a href="#" className="hover:text-red-500 transition">
            Country
          </a>
          <a href="#" className="hover:text-red-500 transition">
            Cinema Movies
          </a>
          <a href="#" className="hover:text-red-500 transition">
            TV Shows
          </a>
        </nav>

        {/* Search + Auth */}
        <div className="hidden md:flex items-center space-x-3">
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

      {/* Dropdown Menu for mobile */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 px-4">
          <nav className="flex flex-col space-y-2">
            <a href="#" className="hover:text-red-500 transition">
              Home
            </a>
            <a href="#" className="hover:text-red-500 transition">
              Genre
            </a>
            <a href="#" className="hover:text-red-500 transition">
              Country
            </a>
            <a href="#" className="hover:text-red-500 transition">
              Cinema Movies
            </a>
            <a href="#" className="hover:text-red-500 transition">
              TV Shows
            </a>
          </nav>

          <div className="mt-4 flex flex-col space-y-2">
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
      )}
    </header>
  );
};

export default Header;
