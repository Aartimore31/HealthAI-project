// src/Components/Navbar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          <span className="logo-text">Health</span>
          <span className="logo-ai">AI</span>
        </NavLink>
      </div>

      {/* Hamburger for Mobile */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Links */}
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
        <li><NavLink to="/getstarted" onClick={() => setMenuOpen(false)}>Get Started</NavLink></li>
        <li><NavLink to="/symptom-checker" onClick={() => setMenuOpen(false)}>Symptom Checker</NavLink></li>
        <li><NavLink to="/health-assistant" onClick={() => setMenuOpen(false)}>Health Assistant</NavLink></li>
        <li><NavLink to="/health-risk-prediction" onClick={() => setMenuOpen(false)}>Health Risk</NavLink></li>
        <li><NavLink to="/medicine-reminder" onClick={() => setMenuOpen(false)}>Medicine Reminder</NavLink></li>
        <li><NavLink to="/gov-dashboard" onClick={() => setMenuOpen(false)}>Gov Dashboard</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
