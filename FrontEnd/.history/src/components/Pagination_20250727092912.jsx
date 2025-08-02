const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [currentPage - 1, currentPage, currentPage + 1].filter(
    (p) => p > 0 && p <= totalPages
  );

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 bg-gray-700 rounded"
        >
          &lt;
        </button>
      )}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1 rounded ${
            p === currentPage ? "bg-red-600" : "bg-gray-700"
          }`}
        >
          {p}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 bg-gray-700 rounded"
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default Pagination;
