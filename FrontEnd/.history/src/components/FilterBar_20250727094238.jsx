const FilterBar = ({ filters, setFilters, setPage }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Từ khóa..."
        className="bg-gray-800 text-white px-4 py-2 rounded w-[180px]"
      />
      <select className="bg-gray-800 text-white px-3 py-2 rounded">
        <option>Thể loại</option>
      </select>
      <select className="bg-gray-800 text-white px-3 py-2 rounded">
        <option>Sắp xếp</option>
      </select>
      <select className="bg-gray-800 text-white px-3 py-2 rounded">
        <option>Năm</option>
      </select>
    </div>
  );
};
