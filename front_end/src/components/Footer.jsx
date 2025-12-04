import React from "react";
import "./Component.css";
import logo from "../assets/logo.png";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Logo Section */}
      <div className="footer-logo">
        <img src={logo} alt="AutoHunt Logo" className="logo" />
      </div>

      {/* Footer Content */}
      <div className="footer-content">
        <div className="footer-column">
          <h4>ABOUT US</h4>
          <ul>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>CUSTOMER SERVICE</h4>
          <ul>
            <li>info@car.com</li>
            <li>240-865-3730</li>
          </ul>
        </div>

        <div className="footer-column">
          <p>
            3926 Calvin Street,
            <br />
            Baltimore, Maryland, 21202,
            <br />
            United States
          </p>
          <div className="footer-socials">
            <FaFacebookF />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="footer-bottom">
        <p>2025 AutoHunt. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
