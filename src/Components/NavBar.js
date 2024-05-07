import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Assets/PomodoroLogo.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={Logo}
            alt="Logo"
            className={`logo ${isHovered ? "logo-hovered" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li
              className={`nav-item ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/">
                Pomodoro Timer
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/breathing-exercises" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/breathing-exercises">
                Breathing Exercises
              </Link>
            </li>
            <li
              className={`nav-item ${
                location.pathname === "/stretching" ? "active" : ""
              }`}
            >
              <Link className="nav-link" to="/stretching">
                Stretching
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
