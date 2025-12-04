import React, { useState } from "react";
import "../styles/SearchFilter.css";

export default function SearchFilter() {
  const [keyword, setKeyword] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(100000);

  const handleSearch = () => {
    console.log("Search:", { keyword, model, brand, location, price });
  };

  return (
    <div className="search-filter-wrapper">
      <div className="search-filter">
        {/* Tabs */}
        <div className="filter-tabs">
          <button className="tab active">All</button>
          <button className="tab">New</button>
          <button className="tab">Used</button>
        </div>

        {/* Row 1 */}
        <div className="filter-row">
          <input
            type="text"
            className="filter-input"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <select
            className="filter-select"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="">Model</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Coupe">Coupe</option>
          </select>

          <select
            className="filter-select"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="">Brand</option>
            <option value="Toyota">Toyota</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes">Mercedes</option>
          </select>
        </div>

        {/* Row 2 */}
        <div className="filter-row">
          <input
            type="text"
            className="filter-input"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <div className="price-range">
            <label>Price Range</label>
            <input
              type="range"
              min="0"
              max="3000000"
              step="50000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span>${price.toLocaleString()}</span>
          </div>

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
