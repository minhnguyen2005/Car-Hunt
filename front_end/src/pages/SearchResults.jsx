import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import CarCard from "../components/CarCard";
import { getCars } from "../api/mockApi";
import "../styles/SearchResults.css";

function parseFilters(search) {
  const params = new URLSearchParams(search);
  const condition = params.get("condition") || "all";
  return {
    keyword: params.get("keyword") || "",
    model: params.get("model") || "",
    brand: params.get("brand") || "",
    location: params.get("location") || "",
    price: params.get("price") ? Number(params.get("price")) : undefined,
    condition: condition === "all" ? "all" : condition,
  };
}

export default function SearchResults() {
  const location = useLocation();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const filters = useMemo(
    () => parseFilters(location.search),
    [location.search]
  );

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      try {
        const response = await getCars({
          q: filters.keyword,
          model: filters.model || undefined,
          brand: filters.brand || undefined,
          maxPrice: filters.price,
          condition: filters.condition || "all",
          limit: 30,
        });
        let list = response.data || [];
        if (filters.location) {
          const needle = filters.location.toLowerCase();
          list = list.filter((car) =>
            car.location?.toLowerCase().includes(needle)
          );
        }
        setCars(list);
      } finally {
        setLoading(false);
      }
    }

    fetchResults();
  }, [filters]);

  return (
    <div className="search-results-page">
      <Loader visible={loading} />
      <div className="search-headline">
        <p className="breadcrumb">
          <Link to="/">Homepage</Link> / Search
        </p>
        <h1>Search Results</h1>
        <p className="subtitle">
          Showing {cars.length} result{cars.length === 1 ? "" : "s"} for{" "}
          {filters.keyword ? `"${filters.keyword}"` : "all vehicles"}
        </p>
        <div className="filter-summary">
          {filters.model && <span>Model: {filters.model}</span>}
          {filters.brand && <span>Brand: {filters.brand}</span>}
          {filters.location && <span>Location: {filters.location}</span>}
          {filters.condition !== "all" && (
            <span>Condition: {filters.condition}</span>
          )}
          {filters.price && (
            <span>Max price: ${filters.price.toLocaleString()}</span>
          )}
          {!filters.model &&
            !filters.brand &&
            !filters.location &&
            filters.condition === "all" &&
            !filters.price && <span>All filters</span>}
        </div>
      </div>

      <div className="search-grid">
        {cars.length === 0 && !loading ? (
          <p className="empty-message">
            No vehicles match your filters. Try adjusting your search.
          </p>
        ) : (
          cars.map((car) => <CarCard key={car.id} car={car} viewMode="grid" />)
        )}
      </div>
    </div>
  );
}
