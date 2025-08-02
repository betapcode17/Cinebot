return (
  <div className="flex justify-center mt-24 mb-6">
    <div className="w-full max-w-7xl px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Từ khóa */}
        <input
          type="text"
          name="query"
          value={filters.query}
          onChange={handleChange}
          placeholder="Từ khóa..."
          className="col-span-2 sm:col-span-1 bg-[#1e293b] text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Loại phim */}
        <select
          name="type"
          value={filters.type || ""}
          onChange={handleChange}
          className="bg-[#1e293b] text-white px-4 py-2 rounded-md"
        >
          <option value="">Phim lẻ</option>
        </select>

        {/* Thể loại */}
        <select
          name="genre"
          value={filters.genre}
          onChange={handleChange}
          className="bg-[#1e293b] text-white px-4 py-2 rounded-md"
        >
          <option value="">Thể loại</option>
          <option value="28">Hành động</option>
          <option value="35">Hài</option>
          <option value="18">Tâm lý</option>
          <option value="27">Kinh dị</option>
        </select>

        {/* Quốc gia */}
        <select
          name="country"
          value={filters.country}
          onChange={handleChange}
          className="bg-[#1e293b] text-white px-4 py-2 rounded-md"
        >
          <option value="">Quốc gia</option>
          <option value="US">Mỹ</option>
          <option value="KR">Hàn Quốc</option>
          <option value="JP">Nhật Bản</option>
          <option value="VN">Việt Nam</option>
        </select>

        {/* Năm */}
        <select
          name="year"
          value={filters.year}
          onChange={handleChange}
          className="bg-[#1e293b] text-white px-4 py-2 rounded-md"
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

        {/* Sắp xếp */}
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
          className="bg-[#1e293b] text-white px-4 py-2 rounded-md"
        >
          <option value="">Sắp xếp</option>
          <option value="popularity.desc">Phổ biến</option>
          <option value="release_date.desc">Mới nhất</option>
        </select>
      </div>

      {/* Nút lọc phim */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleFilter}
          className="bg-[#475569] hover:bg-[#ef4444] text-white px-4 py-2 rounded-md transition-colors duration-200"
        >
          Lọc phim
        </button>
      </div>
    </div>
  </div>
);
