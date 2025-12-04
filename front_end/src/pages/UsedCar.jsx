import React, { useEffect, useState, useCallback } from "react";
import FilterSidebar from "../components/FilterSidebar";
import SearchSortBar from "../components/SearchSortBar";
import CarList from "../components/CarList";
import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";
import { getCarsByTag } from "../api/mockApi";
import "../styles/NewCars.css";

const BASE_QUERY = {
  q: "",
  sortBy: "",
  condition: "used",
  page: 1,
  limit: 12,
  minPrice: 0,
  maxPrice: 3000000,
  brand: null,
  model: null,
  year: null,
};

export default function UsedCar() {
  const [viewMode, setViewMode] = useState("list");
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(() => ({ ...BASE_QUERY }));

  const fetchData = useCallback(
    async (opts = {}, showLoader = true) => {
      const nextQuery = { ...query, ...opts, condition: "used" };
      if (showLoader) setLoading(true);
      try {
        const res = await getCarsByTag("used", nextQuery);
        setCars(res.data);
        if (allCars.length === 0) setAllCars(res.data);
      } catch (err) {
        console.error("Error fetching used cars:", err);
      } finally {
        if (showLoader) setTimeout(() => setLoading(false), 800);
      }
    },
    [query, allCars.length]
  );

  useEffect(() => {
    fetchData({}, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  const handleSearch = debounce((opts) => {
    const term = opts.q?.trim() || "";
    if (term === "") {
      const randomCars = allCars.sort(() => 0.5 - Math.random()).slice(0, 6);
      setCars(randomCars);
      setQuery({ ...BASE_QUERY });
      return;
    }
    const next = { ...query, ...opts, page: 1, condition: "used" };
    setQuery(next);
    fetchData(next, false);
  }, 500);

  const handleSidebarChange = (opts) => {
    if (opts.reset) {
      setCars(allCars);
      setQuery({ ...BASE_QUERY });
      return;
    }
    const selectedBrand = opts.brands?.[0] || null;
    const selectedYear = opts.years?.[0] || null;
    const next = {
      ...query,
      brand: selectedBrand,
      year: selectedYear,
      minPrice:
        typeof opts.minPrice === "number" ? opts.minPrice : query.minPrice,
      maxPrice:
        typeof opts.maxPrice === "number" ? opts.maxPrice : query.maxPrice,
      page: 1,
      condition: "used",
    };
    setQuery(next);
    fetchData(next, false);
  };

  return (
    <div className="newcars-page">
      <Loader visible={loading} fullscreen />

      <PageHeader title="Used Cars" />

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
