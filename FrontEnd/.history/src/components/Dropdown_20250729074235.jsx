import PropTypes from "prop-types";
import { useState, useRef } from "react";

const Dropdown = ({ options, onSelect, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  // Mở dropdown khi hover vào button
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  // Đóng dropdown trễ một chút khi rời khỏi toàn bộ vùng
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150); // delay để tránh đóng sớm khi rê từ button vào menu
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="bg-black text-white px-4 py-2 flex items-center w-full justify-between">
        {label}
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-gray-700 text-white rounded shadow-lg z-10">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onSelect(opt.value);
                setIsOpen(false); // vẫn có thể đóng sau click
              }}
              className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Dropdown;
