export const BASE_QUERY_NEW = {
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
};

export const BASE_QUERY_USED = {
  ...BASE_QUERY_NEW,
  condition: "used",
};

export function debounce(fn, delay = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function handleSearchFactory({
  baseQuery,
  getAllCars,
  setCars,
  setQuery,
  fetchData,
}) {
  return debounce((opts) => {
    const term = opts.q?.trim() || "";
    if (term === "") {
      const all = getAllCars() || [];
      const randomCars = [...all].sort(() => 0.5 - Math.random()).slice(0, 6);
      setCars(randomCars);
      setQuery({ ...baseQuery, q: "" });
      return;
    }
    const next = { ...baseQuery, ...opts, page: 1 };
    setQuery(next);
    fetchData(next, false);
  }, 500);
}

export function handleSidebarChangeFactory({
  baseQuery,
  getAllCars,
  getQuery,
  setCars,
  setQuery,
  fetchData,
}) {
  return (opts) => {
    if (opts.reset) {
      setCars(getAllCars());
      setQuery({ ...baseQuery });
      return;
    }
    const current = getQuery();
    const selectedBrand = opts.brands?.[0] || null;
    const selectedYear = opts.years?.[0] || null;
    const next = {
      ...current,
      ...baseQuery,
      brand: selectedBrand,
      year: selectedYear,
      minPrice:
        typeof opts.minPrice === "number"
          ? opts.minPrice
          : current.minPrice ?? baseQuery.minPrice,
      maxPrice:
        typeof opts.maxPrice === "number"
          ? opts.maxPrice
          : current.maxPrice ?? baseQuery.maxPrice,
      page: 1,
    };
    setQuery(next);
    fetchData(next, false);
  };
}
