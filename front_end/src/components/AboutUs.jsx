import React from "react";
import "./Component.css";

const AboutUs = () => {
  return (
    <section className="about-section">
      <img src="/images/about.jpg" alt="About Us" />
      <div className="about-content">
        <h2>About Us</h2>
        <p>
          Welcome to <strong>AutoWorld</strong> — your trusted destination for
          discovering, comparing, and choosing your next dream car.
        </p>
        <p>
          We offer a wide range of vehicles, expert reviews, and transparent
          information to help you make the best decision possible.
        </p>
        <p>
          Our mission is to simplify your car-buying journey with innovative
          tools and real-time data so you can drive away with confidence.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
