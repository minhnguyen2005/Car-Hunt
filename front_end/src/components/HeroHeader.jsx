import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/HeroHeader.css";

const filterTabs = ["All", "New", "Used"];
const models = ["Sedan", "SUV", "Coupe"];
const brands = ["Toyota", "Ford", "Honda", "BMW", "Audi"];
const slides = [
  "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
  "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
  "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
  "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg",
];

export default function HeroHeader() {
  const [activeTab, setActiveTab] = useState("All");
  const [price, setPrice] = useState(150000);
  const [keyword, setKeyword] = useState("");
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const heroStyle = useMemo(
    () => ({
      backgroundImage: `url(${slides[currentSlide]})`,
    }),
    [currentSlide]
  );

  const goToSlide = (index) => {
    const total = slides.length;
    setCurrentSlide(((index % total) + total) % total);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (model) params.set("model", model);
    if (brand) params.set("brand", brand);
    if (locationInput.trim()) params.set("location", locationInput.trim());
    if (price) params.set("price", price);
    if (activeTab !== "All") params.set("condition", activeTab.toLowerCase());

    const queryString = params.toString();
    navigate(queryString ? `/search?${queryString}` : "/search");
  };

  return (
    <header className="hero-header" style={heroStyle}>
      <div className="hero-overlay" />
      <div className="hero-slider-nav">
        <button
          type="button"
          className="slider-btn"
          onClick={() => goToSlide(currentSlide - 1)}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          className="slider-btn"
          onClick={() => goToSlide(currentSlide + 1)}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="hero-content">
        <div>
          <p className="hero-tag">AutoHunt</p>
          <h1>Find your dream car</h1>
          <p className="hero-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="hero-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={index === currentSlide ? "active" : ""}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="hero-filter">
          <div className="hero-filter-tabs">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="hero-filter-row">
            <label className="filter-field">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </label>
            <label className="filter-field select">
              <span>Model</span>
              <select
                value={model}
                onChange={(event) => setModel(event.target.value)}
              >
                <option value="" disabled>
                  Model
                </option>
                {models.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} />
            </label>
            <label className="filter-field select">
              <span>Brand</span>
              <select
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
              >
                <option value="" disabled>
                  Brand
                </option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} />
            </label>
          </div>

          <div className="hero-filter-row">
            <label className="filter-field">
              <MapPin size={16} />
              <input
                type="text"
                placeholder="Location"
                value={locationInput}
                onChange={(event) => setLocationInput(event.target.value)}
              />
            </label>

            <div className="filter-range">
              <div className="range-label">
                <SlidersHorizontal size={16} />
                <span>Price Range</span>
                <p>$0 - ${Number(price).toLocaleString()}</p>
              </div>
              <input
                type="range"
                min="0"
                max="3000000"
                step="50000"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>

            <button
              type="button"
              className="hero-search-btn"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="hero-scroll-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </button>
    </header>
  );
}
