import { useState } from "react";
import mockGigs from "../data/mockGigs";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import GigList from "../components/GigList";

const GigSearchPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredGigs = mockGigs.filter((gig) => {
    const matchSearch = gig.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category ? gig.category === category : true;
    return matchSearch && matchCategory;
  });

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto" }}>
      <h2>Explore Gigs</h2>
      <SearchBar value={search} onChange={setSearch} />
      <FilterSidebar category={category} setCategory={setCategory} />
      <GigList gigs={filteredGigs} />
    </div>
  );
};

export default GigSearchPage;
