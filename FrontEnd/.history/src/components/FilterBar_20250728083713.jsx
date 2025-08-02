import React from "react";

const FilterBar = ({ filters, setFilters, setPage }) => {
  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setPage(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
    >
      {/* Row 1 */}
      <input
        type="text"
        name="query"
        value={filters.query}
        onChange={handleChange}
        placeholder="Từ khóa..."
        className="bg-gray-800 px-4 py-2 rounded text-white placeholder-gray-400 col-span-1"
      />
      <select
        name="mediaType"
        value={filters.mediaType || ""}
        onChange={handleChange}
        className="bg-gray-800 px-4 py-2 rounded text-white"
      >
        <option value="">Phim lẻ</option>
        <option value="movie">Phim lẻ</option>
        <option value="tv">TV Show</option>
      </select>
      <select
        name="genre"
        value={filters.genre}
        onChange={handleChange}
        className="bg-gray-800 px-4 py-2 rounded text-white"
      >
        <option value="">Thể loại</option>
        <option value="28">Hành động</option>
        <option value="35">Hài</option>
        <option value="18">Tâm lý</option>
        <option value="10749">Lãng mạn</option>
        {/* Thêm thể loại nếu muốn */}
      </select>

      {/* Row 2 */}
      <select
        name="country"
        value={filters.country}
        onChange={handleChange}
        className="bg-gray-800 px-4 py-2 rounded text-white"
      >
        <option value="">Quốc gia</option>
        <option value="US">Mỹ</option>
        <option value="JP">Nhật</option>
        <option value="KR">Hàn</option>
        <option value="VN">Việt Nam</option>
        {/* Thêm quốc gia nếu cần */}
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
      <div className="flex items-center gap-2">
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
          className="bg-gray-800 px-4 py-2 rounded text-white w-full"
        >
          <option value="">Sắp xếp</option>
          <option value="popularity.desc">Phổ biến</option>
          <option value="release_date.desc">Mới nhất</option>
        </select>
        <button
          type="submit"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
        >
          Lọc phim
        </button>
      </div>
    </form>
  );
};

export default FilterBar;
