import { useEffect, useState } from "react";
import { getContry, getGenres } from "../api/kkPhimApi";
import Dropdown from "./Dropdown";

const FilterBar = ({ setFilters, setPage }) => {
  const [draftFilters, setDraftFilters] = useState({
    query: "",
    category: "",
    country: "",
    year: "",
    sortBy: "",
  });
  const [countryOptions, setCountryOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Genre"); // State cho label Genre
  const [selectedCountry, setSelectedCountry] = useState("Country"); // State cho label Country

  useEffect(() => {
    (async () => {
      const countryData = await getContry();
      const genreData = await getGenres();

      const mappedCountryOptions = countryData.map((item) => ({
        value: item.slug || item.name.toLowerCase().replace(/\s+/g, "-"),
        label: item.name,
      }));
      const mappedGenreOptions = genreData.map((item) => ({
        value: item.slug || item.name.toLowerCase().replace(/\s+/g, "-"),
        label: item.name,
      }));
      setCountryOptions([
        { value: "tat-ca", label: "Tất cả" },
        ...mappedCountryOptions,
      ]);
      setGenreOptions(mappedGenreOptions);
    })();
  }, []);

  const handleChange = (e) => {
    setDraftFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFilter = () => {
    setFilters(draftFilters); // Áp dụng draftFilters vào filters
    setPage(1); // Reset page để kích hoạt load dữ liệu
  };

  const handleGenreSelect = (value) => {
    const selectedLabel =
      genreOptions.find((opt) => opt.value === value)?.label || "Genre";
    setSelectedGenre(selectedLabel);
    setDraftFilters((prev) => ({
      ...prev,
      category: value === "tat-ca" ? "" : value,
    }));
  };

  const handleCountrySelect = (value) => {
    const selectedLabel =
      countryOptions.find((opt) => opt.value === value)?.label || "Country";
    setSelectedCountry(selectedLabel);
    setDraftFilters((prev) => ({
      ...prev,
      country: value === "tat-ca" ? "" : value,
    }));
  };

  return (
    <div className="flex justify-center mt-24 mb-6">
      <div className="w-full max-w-7xl px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* Từ khóa */}
          <input
            type="text"
            name="query"
            value={draftFilters.query}
            onChange={handleChange}
            placeholder="Từ khóa..."
            className="col-span-2 sm:col-span-1 bg-[#1e293b] text-white px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-red-500"
          />

          <div className="bg-[#1e293b] text-white px-4 py-2 rounded-md">
            <Dropdown
              label={selectedGenre}
              options={genreOptions}
              onSelect={handleGenreSelect}
            />
          </div>

          <div className="bg-[#1e293b] text-white px-4 py-2 rounded-md">
            <Dropdown
              label={selectedCountry}
              options={countryOptions}
              onSelect={handleCountrySelect}
            />
          </div>

          {/* Năm */}
          <select
            name="year"
            value={draftFilters.year}
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
            value={draftFilters.sortBy}
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
};

export default FilterBar;
