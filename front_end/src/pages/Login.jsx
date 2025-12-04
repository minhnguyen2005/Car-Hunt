import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo.png";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { loginUser } from "../api/authApi";
import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await loginUser({ email, password });
      if (result.success) {
        // Redirect to home page after successful login
        navigate("/");
        window.location.reload(); // Refresh to update navbar
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="name@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="auth-link">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </form>
        </div>

        <div className="auth-right">
          <img src={logo} alt="AutoHunt Logo" className="auth-logo" />
          <h1>Login</h1>
          <p>Welcome to Autohunt</p>
          <div className="auth-socials">
            <FaFacebookF size={20} />
            <FaInstagram size={20} />
            <FaYoutube size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
