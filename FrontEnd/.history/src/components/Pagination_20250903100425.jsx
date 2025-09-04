import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisible = 5; // số page hiển thị cùng lúc
  const maxPages = 10; // tối đa 10 page được phép hiển thị

  // Tính cụm hiện tại
  const currentGroup = Math.floor((currentPage - 1) / maxVisible);
  const startPage = currentGroup * maxVisible + 1;
  let endPage = Math.min(startPage + maxVisible - 1, totalPages, maxPages);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center space-x-1">
      {/* Nút Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-700"
        }`}
      >
        &lt;
      </button>

      {/* Các số trang */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded ${
            currentPage === page
              ? "bg-blue-600 text-white border-blue-600"
              : "hover:bg-gray-700"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Nút Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || currentPage === maxPages}
        className={`px-3 py-1 border rounded ${
          currentPage === totalPages || currentPage === maxPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-700"
        }`}
      >
        &gt;
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
