import React, { useEffect, useState } from "react";
import "../styles/Banner.css";

const bannerImages = [
  "/assets/banner1.jpg",
  "/assets/banner2.jpg",
  "/assets/banner3.jpg",
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động đổi ảnh sau mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="banner"
      style={{ backgroundImage: `url(${bannerImages[currentIndex]})` }}
    >
      <div className="banner-overlay">
        <div className="banner-text">
          <h1>Find your dream car</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </section>
  );
}
