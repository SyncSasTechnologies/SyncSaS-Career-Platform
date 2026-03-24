const FilterSidebar = ({ category, setCategory }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ padding: "10px", width: "100%" }}
      >
        <option value="">All Categories</option>
        <option value="Web Development">Web Development</option>
        <option value="Design">Design</option>
        <option value="Backend">Backend</option>
      </select>
    </div>
  );
};

export default FilterSidebar;
