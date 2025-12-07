import React, { useEffect, useState, useCallback } from "react";
import FilterSidebar from "../components/FilterSidebar";
import SearchSortBar from "../components/SearchSortBar";
import CarList from "../components/CarList";
import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";
import { getCars } from "../api/mockApi";
import {
  BASE_QUERY_NEW,
  handleSearchFactory,
  handleSidebarChangeFactory,
} from "../utils/catalogUtils";
import "../styles/NewCars.css";

export default function NewCars() {
  const [viewMode, setViewMode] = useState("list");
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState({ ...BASE_QUERY_NEW });

  const fetchData = useCallback(
    async (opts = {}, showLoader = true) => {
      if (showLoader) setLoading(true);
      try {
        const res = await getCars({ ...query, ...opts });
        setCars(res.data);
        if (allCars.length === 0) setAllCars(res.data);
      } catch (err) {
        console.error("Error fetching cars:", err);
      } finally {
        if (showLoader) setTimeout(() => setLoading(false), 800);
      }
    },
    [query, allCars.length]
  );

  useEffect(() => {
    fetchData({}, true);
  }, []);

  const handleSearch = handleSearchFactory({
    baseQuery: BASE_QUERY_NEW,
    getAllCars: () => allCars,
    setCars,
    setQuery,
    fetchData,
  });

  const handleSidebarChange = handleSidebarChangeFactory({
    baseQuery: BASE_QUERY_NEW,
    getAllCars: () => allCars,
    getQuery: () => query,
    setCars,
    setQuery,
    fetchData,
  });

  return (
    <div className="newcars-page">
      <Loader visible={loading} fullscreen />

      <PageHeader title="New Cars" />

      <div className="newcars-layout">
        <aside className="sidebar">
          <FilterSidebar onChange={handleSidebarChange} />
        </aside>

        <main className="main-content">
          <SearchSortBar
            onSearch={handleSearch}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          <div className="results-count">Showing {cars.length} results</div>
          <CarList cars={cars} viewMode={viewMode} />
        </main>
      </div>
    </div>
  );
}
