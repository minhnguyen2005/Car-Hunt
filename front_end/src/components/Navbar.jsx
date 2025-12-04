import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png"; // đổi path nếu khác
import { getCurrentUser, logoutUser, isAdmin } from "../api/authApi";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-link">
          <img src={logo} alt="AutoHunt Logo" className="logo" />
        </Link>
      </div>

      <div className="navbar-center">
        <Link to="/newcars" className="nav-link">
          New Cars
        </Link>
        <Link to="/used-cars" className="nav-link">
          Used Cars
        </Link>
        <Link to="/compare" className="nav-link">
          Compare
        </Link>
        <Link to="/sell" className="nav-link">
          Sell
        </Link>

        <div className="dropdown">
          <button className="dropbtn">Article ▾</button>
          <div className="dropdown-content">
            <Link to="/news">News</Link>
            <Link to="/reviews">Reviews</Link>
          </div>
        </div>
      </div>

      <div className="navbar-right">
        {user ? (
          <div className="dropdown user-menu">
            <button type="button" className="user-trigger">
              <i className="fa fa-user" /> {user.name || user.email}
            </button>
            <div className="dropdown-content user-dropdown">
              <div className="user-profile">
                <p className="user-email">{user.email}</p>
              </div>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/signin" className="nav-link">
            <i className="fa fa-user"></i> Sign in
          </Link>
        )}

        <div className="dropdown">
          <button className="dropbtn">🌐 EN ▾</button>
          <div className="dropdown-content">
            <button>EN</button>
            <button>VN</button>
          </div>
        </div>

        {isAdmin() && (
          <Link to="/admin" className="nav-link">
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
