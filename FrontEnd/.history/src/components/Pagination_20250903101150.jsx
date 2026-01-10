import React from "react";

const Pagination = ({ currentPage, onPageChange, hasMore }) => {
  const maxVisible = 10; // số tối đa hiển thị
  let pages = [];

  // luôn hiển thị từ 1 đến currentPage + 4 (nếu có)
  const start = Math.max(1, currentPage - 4);
  const end = Math.max(5, Math.min(currentPage + 5, start + maxVisible - 1));

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      {/* Prev */}
      <button
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? "bg-red-600 text-white"
              : "bg-gray-700 text-white hover:bg-red-500"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMore} // dừng khi không có data
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
