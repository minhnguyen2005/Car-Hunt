const COMPARE_STORAGE_KEY = "compare_cars";
const MAX_COMPARE_ITEMS = 3;

export const getCompareList = () => {
  const stored = localStorage.getItem(COMPARE_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addToCompare = (carId) => {
  const ids = getCompareList();
  if (!ids.includes(carId) && ids.length < MAX_COMPARE_ITEMS) {
    const newIds = [...ids, carId];
    localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(newIds));
    return true;
  }
  return false;
};

export const removeFromCompare = (carId) => {
  const ids = getCompareList();
  const newIds = ids.filter((id) => id !== carId);
  localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(newIds));
  return newIds;
};

export const isInCompare = (carId) => {
  const ids = getCompareList();
  return ids.includes(carId);
};

export const canAddMore = () => {
  const ids = getCompareList();
  return ids.length < MAX_COMPARE_ITEMS;
};

export const getCompareCount = () => {
  return getCompareList().length;
};
