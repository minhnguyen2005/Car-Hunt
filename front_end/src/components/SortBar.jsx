import React, { useState } from "react";
import { List, Grid, Search, ArrowUpDown } from "lucide-react";
import "../styles/SortBar.css";

const SortBar = ({ viewMode, setViewMode, onSearch, onSortChange }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) onSearch(value);
  };

  return (
    <div className="sortbar">
      {/* Search box */}
      <div className="sortbar-left">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search cars..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      {/* Sort + View toggle */}
      <div className="sortbar-right">
        <div className="sort-group">
          <ArrowUpDown size={18} className="sort-icon" />
          <select
            className="sort-select"
            onChange={(e) => onSortChange && onSortChange(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            title="Grid View"
          >
            <Grid size={18} />
          </button>
          <button
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            title="List View"
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortBar;
