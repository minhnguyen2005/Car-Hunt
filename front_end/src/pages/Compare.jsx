import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { X, ChevronDown, ChevronUp, Star, ArrowUp, Plus } from "lucide-react";
import { getCars, getCarById } from "../api/mockApi";
import {
  getCompareList,
  addToCompare as addToCompareUtil,
  removeFromCompare as removeFromCompareUtil,
} from "../utils/compareUtils";
import "../styles/Compare.css";

export default function Compare() {
  const [compareList, setCompareList] = useState([]);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCarPicker, setShowCarPicker] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    engine: true,
    dimension: false,
    feature: false,
  });

  useEffect(() => {
    loadCompareList();
    loadAllCars();
  }, []);

  const loadCompareList = () => {
    const ids = getCompareList();
    if (ids.length > 0) {
      Promise.all(ids.map((id) => getCarById(id))).then((results) => {
        setCompareList(results.filter(Boolean));
      });
    } else {
      setCompareList([]);
    }
  };

  const loadAllCars = async () => {
    setLoading(true);
    try {
      const result = await getCars({ limit: 50 });
      setCars(result.data || []);
    } catch (error) {
      console.error("Error loading cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCompare = (carId) => {
    if (addToCompareUtil(carId)) {
      loadCompareList();
    }
  };

  const removeFromCompare = (carId) => {
    removeFromCompareUtil(carId);
    loadCompareList();
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const availableCars = useMemo(() => {
    const compareIds = compareList.map((c) => c.id);
    return cars.filter((car) => !compareIds.includes(car.id));
  }, [cars, compareList]);

  const handleOpenCarPicker = () => {
    if (availableCars.length === 0) return;
    setShowCarPicker(true);
  };

  const handleCloseCarPicker = () => {
    setShowCarPicker(false);
  };

  const handleSelectCar = (carId) => {
    addToCompare(carId);
    setShowCarPicker(false);
  };

  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return (
      <div className="rating-stars">
        {[...Array(5)].map((_, index) => {
          let starClass = "";
          if (index < fullStars) starClass = "filled";
          else if (index === fullStars && hasHalfStar) starClass = "half";
          return <Star key={index} size={16} className={starClass} />;
        })}
      </div>
    );
  };

  const getComparisonData = (field) => {
    return compareList.map((car) => {
      switch (field) {
        case "bodyType":
          return car.bodyType || "N/A";
        case "color":
          return car.color || "N/A";
        case "mileage":
          return car.mileage || "N/A";
        case "transmission":
          return car.transmission || "N/A";
        case "engineCapacity":
          return car.power || "N/A";
        case "length":
          return car.length || "N/A";
        case "width":
          return car.width || "N/A";
        case "height":
          return car.height || "N/A";
        case "cargo":
          return car.cargo || "N/A";
        default:
          return "N/A";
      }
    });
  };

  const getFeatureData = (featureName) => {
    return compareList.map((car) => {
      const features = car.features || [];
      const featureLower = featureName.toLowerCase();
      const hasFeature = features.some((f) =>
        f.toLowerCase().includes(featureLower)
      );
      return hasFeature ? "Yes" : "No";
    });
  };

  return (
    <div className="compare-page">
      <div className="compare-header">
        <p className="breadcrumb">
          <Link to="/">Homepage</Link> - Compare
        </p>
        <h1>Compare Car</h1>
      </div>

      <div className="compare-cards-container">
        {compareList.map((car) => (
          <div key={car.id} className="compare-card">
            <button
              className="remove-btn"
              onClick={() => removeFromCompare(car.id)}
              aria-label="Remove from compare"
            >
              <X size={18} />
            </button>
            {car.condition === "new" && (
              <span className="status-badge">New</span>
            )}
            <img src={car.img} alt={car.name} />
            <h3>{car.name}</h3>
            <p className="price-range">
              ${car.price?.toLocaleString() || "N/A"}
              {car.originalPrice && car.originalPrice > car.price && (
                <span className="original-price">
                  {" "}
                  - ${car.originalPrice.toLocaleString()}
                </span>
              )}
            </p>
            <div className="car-specs">
              <span>{car.year}</span>
              <span>{car.driveType || "N/A"}</span>
              <span>{car.fuel || "N/A"}</span>
              <span>{car.seats || 5}</span>
            </div>
            <div className="car-rating">
              {renderStarRating(car.rating || 4)}
              <span>({car.reviews || 12} Reviews)</span>
            </div>
          </div>
        ))}

        {compareList.length < 3 && (
          <div className="compare-card add-card" onClick={handleOpenCarPicker}>
            <div className="add-card-content">
              <Plus size={48} className="add-icon" />
              <p>Add car to compare</p>
              {availableCars.length === 0 && (
                <p className="add-card-subtext">No more cars available</p>
              )}
            </div>
          </div>
        )}
      </div>

      {compareList.length > 0 && (
        <div className="compare-details">
          <div className="compare-section">
            <button
              className="section-header"
              onClick={() => toggleSection("general")}
            >
              <span>General Info</span>
              {expandedSections.general ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {expandedSections.general && (
              <div className="section-content">
                <table className="compare-table">
                  <tbody>
                    <tr>
                      <td>Body Type</td>
                      {getComparisonData("bodyType").map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Exterior Color</td>
                      {getComparisonData("color").map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="compare-section">
            <button
              className="section-header"
              onClick={() => toggleSection("engine")}
            >
              <span>Engine Details</span>
              {expandedSections.engine ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {expandedSections.engine && (
              <div className="section-content">
                <table className="compare-table">
                  <tbody>
                    <tr>
                      <td>Mileage</td>
                      {getComparisonData("mileage").map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Transmission</td>
                      {getComparisonData("transmission").map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Engine Capacity</td>
                      {getComparisonData("engineCapacity").map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="compare-section">
            <button
              className="section-header"
              onClick={() => toggleSection("dimension")}
            >
              <span>Dimension Details</span>
              {expandedSections.dimension ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {expandedSections.dimension && (
              <div className="section-content">
                <table className="compare-table">
                  <tbody>
                    <tr>
                      <td>Length</td>
                      {getComparisonData("length").map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Width</td>
                      {getComparisonData("width").map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Height</td>
                      {getComparisonData("height").map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Cargo Volume</td>
                      {getComparisonData("cargo").map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="compare-section">
            <button
              className="section-header"
              onClick={() => toggleSection("feature")}
            >
              <span>Feature</span>
              {expandedSections.feature ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
            {expandedSections.feature && (
              <div className="section-content">
                <table className="compare-table">
                  <tbody>
                    <tr>
                      <td>Cruise Control</td>
                      {getFeatureData("cruise").map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Heated Seat</td>
                      {getFeatureData("heated").map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Front Parking Sensor</td>
                      {getFeatureData("parking").map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Bluetooth</td>
                      {getFeatureData("bluetooth").map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Sunroof</td>
                      {getFeatureData("sunroof").map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                    <tr>
                      <td>Upholstery</td>
                      {compareList.map((car, idx) => (
                        <td key={idx}>
                          {car.features?.some((f) =>
                            f.toLowerCase().includes("leather")
                          )
                            ? "Leather"
                            : "Vinyl"}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td>Other</td>
                      {compareList.map((car, idx) => (
                        <td key={idx}>
                          {car.features
                            ?.filter(
                              (f) =>
                                !f.toLowerCase().includes("cruise") &&
                                !f.toLowerCase().includes("heated") &&
                                !f.toLowerCase().includes("parking") &&
                                !f.toLowerCase().includes("bluetooth") &&
                                !f.toLowerCase().includes("sunroof") &&
                                !f.toLowerCase().includes("leather")
                            )
                            .slice(0, 5)
                            .join(", ") || "N/A"}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {compareList.length === 0 && (
        <div className="empty-compare">
          <p>No cars selected for comparison.</p>
          <Link to="/newcars" className="browse-btn">
            Browse Cars
          </Link>
        </div>
      )}

      {showCarPicker && (
        <div className="car-picker-overlay" onClick={handleCloseCarPicker}>
          <div
            className="car-picker-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="car-picker-header">
              <h2>Select a car to compare</h2>
              <button
                className="car-picker-close"
                onClick={handleCloseCarPicker}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            {loading ? (
              <p className="car-picker-loading">Loading cars...</p>
            ) : availableCars.length === 0 ? (
              <p className="car-picker-empty">No more cars available.</p>
            ) : (
              <div className="car-picker-grid">
                {availableCars.map((car) => (
                  <button
                    key={car.id}
                    className="car-picker-item"
                    onClick={() => handleSelectCar(car.id)}
                  >
                    <img src={car.img} alt={car.name} />
                    <div className="car-picker-info">
                      <span className="car-picker-name">{car.name}</span>
                      {car.price && (
                        <span className="car-picker-price">
                          ${car.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <button
        className="scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
}
