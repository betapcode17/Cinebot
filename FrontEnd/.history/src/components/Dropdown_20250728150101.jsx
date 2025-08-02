// src/components/Dropdown.jsx
const Dropdown = ({ options, onSelect }) => {
  return (
    <div className="relative">
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="px-4 py-2 border rounded"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
