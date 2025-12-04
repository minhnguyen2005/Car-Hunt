import React, { useEffect, useState, useCallback } from "react";
import FilterSidebar from "../components/FilterSidebar";
import SearchSortBar from "../components/SearchSortBar";
import CarList from "../components/CarList";
import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";
import { getCars } from "../api/mockApi";
import "../styles/NewCars.css";

export default function NewCars() {
  const [viewMode, setViewMode] = useState("list");
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true); // chỉ loader khi load trang

  const [query, setQuery] = useState({
    q: "",
    sortBy: "",
    condition: "all",
    page: 1,
    limit: 12,
    minPrice: 0,
    maxPrice: 3000000,
    brand: null,
    model: null,
    year: null,
  });

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
    // chỉ bật loader khi load trang lần đầu
    fetchData({}, true);
  }, []);

  // ✅ debounce cho search input
  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  // ✅ xử lý search logic
  const handleSearch = debounce((opts) => {
    const term = opts.q?.trim() || "";
    if (term === "") {
      // nếu ô tìm kiếm trống → hiện ngẫu nhiên vài mẫu xe
      const randomCars = allCars.sort(() => 0.5 - Math.random()).slice(0, 6);
      setCars(randomCars);
      setQuery({ ...query, q: "" });
      return;
    }
    const next = { ...query, ...opts, page: 1 };
    setQuery(next);
    fetchData(next, false); // ❌ không loader khi chỉ search
  }, 500);

  // ✅ xử lý thay đổi FilterSidebar
  const handleSidebarChange = (opts) => {
    if (opts.reset) {
      // reset filter → hiển thị lại toàn bộ xe
      setCars(allCars);
      setQuery({
        q: "",
        sortBy: "",
        condition: "all",
        page: 1,
        limit: 12,
        minPrice: 0,
        maxPrice: 3000000,
        brand: null,
        model: null,
        year: null,
      });
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
    };
    setQuery(next);
    fetchData(next, false); // ❌ không loader khi filter
  };

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
