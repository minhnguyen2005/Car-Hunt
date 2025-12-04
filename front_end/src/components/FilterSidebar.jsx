import React, { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import "../styles/FilterSidebar.css";

const additionalSections = [
  "Model",
  "Body Type",
  "Transmission",
  "Fuel Type",
  "Drivetrain",
  "Passenger Capacity",
  "Exterior Color",
];

export default function FilterSidebar({ onChange }) {
  const [brands, setBrands] = useState([]);
  const [years, setYears] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [condition, setCondition] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [expanded, setExpanded] = useState({
    year: true,
    brand: true,
    model: false,
    "body-type": false,
    transmission: false,
    "fuel-type": false,
    drivetrain: false,
    "passenger-capacity": false,
    "exterior-color": false,
  });

  const brandList = useMemo(
    () => ["Toyota", "Honda", "Mazda", "Ford", "BMW", "Kia", "Audi"],
    []
  );
  const yearList = useMemo(
    () => [2025, 2024, 2023, 2022, 2021, 2020, 2019],
    []
  );

  const handleBrandChange = (brand) => {
    setBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleYearChange = (year) => {
    setYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const handleSliderChange = (value) => {
    const max = Number(value);
    setPriceRange([0, max]);
  };

  const handleApply = () => {
    onChange({
      brands,
      years,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      condition,
      search: searchTerm,
    });
  };

  const handleReset = () => {
    setBrands([]);
    setYears([]);
    setSearchTerm("");
    setCondition("all");
    setPriceRange([0, 3000000]);
    onChange({ reset: true });
  };

  const toggleSection = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-title">Filter</div>

      <div className="filter-search">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-condition">
        <p>Condition</p>
        <div className="condition-options">
          {["all", "new", "used"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="condition"
                checked={condition === option}
                onChange={() => setCondition(option)}
              />
              <span>{option.charAt(0).toUpperCase() + option.slice(1)}</span>
            </label>
          ))}
        </div>
      </div>

      <div
        className={`filter-section collapsible ${expanded.year ? "open" : ""}`}
      >
        <button
          type="button"
          className="collapsible-trigger"
          onClick={() => toggleSection("year")}
        >
          <span>Year</span>
          <ChevronDown size={16} />
        </button>
        {expanded.year && (
          <>
            <ul className="filter-list">
              {yearList.map((year) => (
                <li
                  key={year}
                  className={`filter-option ${
                    years.includes(year) ? "checked" : ""
                  }`}
                  onClick={() => handleYearChange(year)}
                >
                  <input
                    type="checkbox"
                    checked={years.includes(year)}
                    readOnly
                  />
                  <span>{year}</span>
                </li>
              ))}
            </ul>
            <button type="button" className="link-sm">
              See More
            </button>
          </>
        )}
      </div>

      <div
        className={`filter-section collapsible ${expanded.brand ? "open" : ""}`}
      >
        <button
          type="button"
          className="collapsible-trigger"
          onClick={() => toggleSection("brand")}
        >
          <span>Brand</span>
          <ChevronDown size={16} />
        </button>
        {expanded.brand && (
          <>
            <div className="brand-search">
              <input type="text" placeholder="Search here" />
            </div>
            <ul className="filter-list">
              {brandList.map((brand) => (
                <li
                  key={brand}
                  className={`filter-option ${
                    brands.includes(brand) ? "checked" : ""
                  }`}
                  onClick={() => handleBrandChange(brand)}
                >
                  <input
                    type="checkbox"
                    checked={brands.includes(brand)}
                    readOnly
                  />
                  <span>{brand}</span>
                </li>
              ))}
            </ul>
            <button type="button" className="link-sm">
              See More
            </button>
          </>
        )}
      </div>

      {additionalSections.map((label) => {
        const key = label.toLowerCase().replace(/\s+/g, "-");
        return (
          <div
            key={key}
            className={`filter-section collapsible ${
              expanded[key] ? "open" : ""
            }`}
          >
            <button
              type="button"
              className="collapsible-trigger"
              onClick={() => toggleSection(key)}
            >
              <span>{label}</span>
              <ChevronDown size={16} />
            </button>
          </div>
        );
      })}

      <div className="filter-section price-section">
        <div className="price-header">
          <span>Price Range</span>
          <strong>
            ${priceRange[0].toLocaleString()} - $
            {priceRange[1].toLocaleString()}
          </strong>
        </div>
        <div className="price-controls">
          <input
            type="range"
            min="0"
            max="3000000"
            step="50000"
            value={priceRange[1]}
            onChange={(e) => handleSliderChange(e.target.value)}
          />
        </div>
      </div>

      <div className="filter-actions">
        <button type="button" className="reset-btn" onClick={handleReset}>
          Reset Filter
        </button>
        <button type="button" className="apply-btn" onClick={handleApply}>
          Apply Filter
        </button>
      </div>
    </div>
  );
}
