const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search gigs..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
    />
  );
};

export default SearchBar;
