import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Star,
  MapPin,
  Calendar,
  Gauge,
  Zap,
  Users,
  GitCompare,
} from "lucide-react";
import { addToCompare, isInCompare, canAddMore } from "../utils/compareUtils";
import "../styles/CarCard.css";

const CarCard = ({ car, viewMode = "list" }) => {
  const navigate = useNavigate();
  const [inCompare, setInCompare] = useState(false);
  const [canAdd, setCanAdd] = useState(true);

  useEffect(() => {
    setInCompare(isInCompare(car.id));
    setCanAdd(canAddMore());
  }, [car.id]);

  const rating = car.rating || 4;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const starClassName = (index) => {
    if (index < fullStars) return "star-icon filled";
    if (index === fullStars && hasHalfStar) return "star-icon half";
    return "star-icon";
  };

  const handleAddToCompare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (addToCompare(car.id)) {
      setInCompare(true);
      setCanAdd(canAddMore());
    } else if (!canAdd) {
      alert("You can only compare up to 3 cars. Please remove one first.");
    }
  };

  return (
    <article className={`car-card ${viewMode}`}>
      <div className="car-image">
        <img src={car.img} alt={car.name} />
      </div>

      <div className="car-info">
        <div className="car-header">
          <div className="car-title-group">
            <h3 className="car-title">{car.name}</h3>
          </div>

          <div className="car-price-row">
            <span className="car-price">
              ${car.price?.toLocaleString() || car.price}
            </span>
            {car.originalPrice && car.originalPrice > car.price && (
              <span className="car-price-original">
                ${car.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <p className="car-location">
          <MapPin size={16} />
          {car.location}
        </p>

        <div className="car-meta">
          <span>
            <Calendar size={16} />
            {car.year}
          </span>
          {car.driveType && (
            <span>
              <Gauge size={16} />
              {car.driveType}
            </span>
          )}
          <span>
            <Zap size={16} />
            {car.fuel || "Electric"}
          </span>
          <span>
            <Users size={16} />
            {car.seats || 5} Seats
          </span>
        </div>

        <div className="car-bottom">
          <div className="car-rating">
            {[...Array(5)].map((_, index) => (
              <Star key={index} size={16} className={starClassName(index)} />
            ))}
            <span className="car-reviews">
              ({car.reviews || 12}
              {viewMode === "list" ? " Reviews" : ""})
            </span>
          </div>

          <div className="car-actions">
            <button
              className={`compare-btn ${inCompare ? "in-compare" : ""}`}
              onClick={handleAddToCompare}
              title={inCompare ? "Already in compare" : "Add to compare"}
              disabled={inCompare}
            >
              <GitCompare size={16} />
              {inCompare ? "Added" : "Compare"}
            </button>
            <Link to={`/cars/${car.id}`} className="car-btn">
              {viewMode === "list" ? "View Details" : "Details"}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CarCard;
