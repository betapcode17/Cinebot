import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Dropdown = ({ options, onSelect, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleOptionClick = (opt) => {
    if (opt.link) {
      navigate(opt.link);
    } else {
      onSelect(opt.value); // ➤ Gọi callback nếu không có link
    }
    setIsOpen(false);
  };

  // Xác định số lượng cột dựa trên số item
  const itemCount = options.length;
  let columnCount = 1;
  let widthClass = "w-48"; // Độ rộng mặc định (192px)

  if (itemCount > 5) {
    columnCount = 2; // 2 cột nếu vượt 5 item
    widthClass = "w-72"; // Tăng độ rộng lên 288px
  }
  if (itemCount > 10) {
    columnCount = 3; // 3 cột nếu vượt 10 item
    widthClass = "w-96"; // Tăng độ rộng lên 384px
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="text-white hover:text-red-500 transition text-sm md:text-base px-1 py-2 flex items-center gap-1"
        style={{ background: "transparent" }}
      >
        {label}
        <svg
          className="w-4 h-4"
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
        <div
          className={`absolute mt-2 ${widthClass} bg-gray-700 text-white rounded shadow-lg z-10 grid grid-cols-${columnCount} gap-1`}
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleOptionClick(opt)}
              className="px-4 py-2 hover:bg-gray-600 cursor-pointer text-left"
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
      link: PropTypes.string, // optional: điều hướng
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default Dropdown;
