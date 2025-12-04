import React from "react";
import "../styles/Loader.css";
import logo from "../assets/logo.png"; // ✅ thay đường dẫn logo thật của bạn

export default function Loader({ visible = false, fullscreen = false }) {
  if (!visible) return null;

  return (
    <div className={`loader-overlay ${fullscreen ? "fullscreen" : ""}`}>
      <div className="loader-content">
        <img src={logo} alt="Logo" className="loader-logo" />
        <div className="spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
}
