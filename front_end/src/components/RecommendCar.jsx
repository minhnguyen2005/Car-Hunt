import React, { useEffect, useState } from "react";
import { getFeaturedCars } from "../api/mockApi";
import CarCard from "./CarCard";
import "../styles/RecommendCar.css";

export default function RecommendCar() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getFeaturedCars()
      .then((data) => {
        if (mounted) setList(data || []);
      })
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  return (
    <section className="recommend-section">
      <div className="rec-header">
        <h3>Recommended Cars</h3>
        <div className="tabs">
          <button className="active">New</button>
          <button>Used</button>
        </div>
      </div>
      <div className="rec-grid">
        {loading ? (
          <p style={{ color: "#9fb3bf" }}>Loading...</p>
        ) : (
          list.map((c) => <CarCard key={c.id} car={c} viewMode="grid" />)
        )}
      </div>
    </section>
  );
}
