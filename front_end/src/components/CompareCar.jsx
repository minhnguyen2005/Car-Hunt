import React from "react";
import "./Component.css";

const CompareCar = () => {
  return (
    <section className="compare-section">
      <h2>Compare Cars</h2>
      <div className="compare-cards">
        <div className="compare-card">
          <h3>Toyota Corolla Altis</h3>
          <p>1.8L Engine • 140 HP • 6-Speed Automatic</p>
          <p>Fuel Efficiency: 15 km/L</p>
          <button className="btn-search">Select</button>
        </div>

        <div className="compare-card">
          <h3>Kia K3</h3>
          <p>1.6L Engine • 138 HP • 6-Speed Automatic</p>
          <p>Fuel Efficiency: 14.5 km/L</p>
          <button className="btn-search">Select</button>
        </div>

        <div className="compare-card">
          <h3>Hyundai Elantra</h3>
          <p>1.6L Turbo • 201 HP • 7-Speed DCT</p>
          <p>Fuel Efficiency: 13 km/L</p>
          <button className="btn-search">Select</button>
        </div>
      </div>
    </section>
  );
};

export default CompareCar;
