import React from "react";
import CarCard from "./CarCard";
import "../styles/CarList.css";

export default function CarList({ cars = [], viewMode = "list" }) {
  return (
    <section className="car-list-wrapper">
      {/* Results Count */}
      <div className="car-list-toolbar">
        <h2 className="car-list-count">{cars.length} Results</h2>
      </div>

      {/* Car Listings */}
      <div className={`car-list ${viewMode}`}>
        {cars.length > 0 ? (
          cars.map((car) => (
            <CarCard key={car.id || car._id} car={car} viewMode={viewMode} />
          ))
        ) : (
          <div className="no-results">
            <p>No cars found</p>
          </div>
        )}
      </div>
    </section>
  );
}
