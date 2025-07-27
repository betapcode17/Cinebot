const FilterBar = ({ filters, setFilters, setPage }) => {
  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setPage(1);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <input
        type="text"
        name="query"
        value={filters.query}
        onChange={handleChange}
        placeholder="Từ khóa..."
        className="bg-gray-800 px-4 py-2 rounded text-white"
      />
      <select
        name="genre"
        value={filters.genre}
        onChange={handleChange}
        className="bg-gray-800 px-4 py-2 rounded text-white"
      >
        <option value="">Thể loại</option>
        <option value="28">Hành động</option>
        <option value="35">Hài</option>
        {/* Add more genres */}
      </select>
      <select
        name="sortBy"
        value={filters.sortBy}
        onChange={handleChange}
        className="bg-gray-800 px-4 py-2 rounded text-white"
      >
        <option value="">Sắp xếp</option>
        <option value="popularity.desc">Phổ biến</option>
        <option value="release_date.desc">Mới nhất</option>
      </select>
      <select
        name="year"
        value={filters.year}
        onChange={handleChange}
        className="bg-gray-800 px-4 py-2 rounded text-white"
      >
        <option value="">Năm</option>
        {[...Array(10)].map((_, i) => {
          const year = 2025 - i;
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterBar;
