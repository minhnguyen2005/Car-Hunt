import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import NewCars from "./pages/NewCars";
import UsedCar from "./pages/UsedCar";
import CarDetail from "./pages/CarDetail";
import ToyotaDetail from "./pages/ToyotaDetail";
import FordDetail from "./pages/FordDetail";
import AudiDetail from "./pages/AudiDetail";
import BMWDetail from "./pages/BMWDetail";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Compare from "./pages/Compare";
import SellCar from "./pages/SellCar";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Scroll to top when route changes
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <Loader visible={loading} fullscreen />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newcars" element={<NewCars />} />
        <Route path="/used-cars" element={<UsedCar />} />
        <Route path="/toyota" element={<ToyotaDetail />} />
        <Route path="/ford" element={<FordDetail />} />
        <Route path="/audi" element={<AudiDetail />} />
        <Route path="/bmw" element={<BMWDetail />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/sell" element={<SellCar />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
