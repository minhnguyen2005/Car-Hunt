import React, { useState } from "react";
import { Search, List, Grid, ChevronDown } from "lucide-react";
import "../styles/SearchSortBar.css";

export default function SearchSortBar({ onSearch, viewMode, setViewMode }) {
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [condition, setCondition] = useState("all");

  const handleInputChange = (value) => {
    setQ(value);
    // Trigger search on input change with debounce handled in parent
    onSearch && onSearch({ q: value, sortBy, condition });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onSearch && onSearch({ q, sortBy: value, condition });
  };

  const handleConditionChange = (value) => {
    setCondition(value);
    onSearch && onSearch({ q, sortBy, condition: value });
  };

  return (
    <div className="search-sort-bar">
      {/* Search Input */}
      <div className="ssb-search">
        <Search size={18} className="ssb-search-icon" />
        <input
          type="text"
          placeholder="Search"
          value={q}
          onChange={(e) => handleInputChange(e.target.value)}
          className="ssb-search-input"
        />
      </div>

      {/* Sort and View Toggle */}
      <div className="ssb-actions">
        {/* Sort Dropdown */}
        <div className="ssb-sort">
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="ssb-sort-select"
          >
            <option value="">Sort By</option>
            <option value="priceAsc">Price: Low → High</option>
            <option value="priceDesc">Price: High → Low</option>
            <option value="yearDesc">Newest</option>
            <option value="name">Name</option>
          </select>
          <ChevronDown className="ssb-sort-icon" size={16} />
        </div>

        {/* View Mode Toggle */}
        <div className="ssb-view-toggle" role="group" aria-label="View mode">
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "active" : ""}
            aria-pressed={viewMode === "list"}
            title="List View"
          >
            <List size={18} />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "active" : ""}
            aria-pressed={viewMode === "grid"}
            title="Grid View"
          >
            <Grid size={18} />
          </button>
        </div>
      </div>

      {/* Condition Filter */}
      <div className="ssb-condition-row">
        <label>
          <input
            type="radio"
            checked={condition === "all"}
            onChange={() => handleConditionChange("all")}
          />
          <span>All</span>
        </label>
        <label>
          <input
            type="radio"
            checked={condition === "new"}
            onChange={() => handleConditionChange("new")}
          />
          <span>New</span>
        </label>
        <label>
          <input
            type="radio"
            checked={condition === "used"}
            onChange={() => handleConditionChange("used")}
          />
          <span>Used</span>
        </label>
      </div>
    </div>
  );
}
