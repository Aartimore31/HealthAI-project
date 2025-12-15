// src/Components/GetStarted.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./GetStarted.css";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="getstarted-container">
      {/* Hero Section */}
      <section className="gs-hero">
        <h1 className="gs-title">🚀 Let’s Get Started with Health AI</h1>
        <p className="gs-subtitle">
          Explore AI-powered tools for better health, guidance, and wellness.
        </p>
        <button className="gs-btn" onClick={() => navigate("/health-assistant")}>
          Start Your Journey
        </button>
      </section>

      {/* Cards Section */}
      <section className="gs-features">
        <h2 className="gs-section-title">✨ What You Can Do</h2>
        <div className="gs-cards">
          <div
            className="gs-card clickable"
            onClick={() => navigate("/symptom-checker")}
          >
            <span className="gs-icon">🩺</span>
            <h3>AI Symptom Checker</h3>
            <p>Instantly know possible conditions by entering your symptoms.</p>
          </div>

          <div
            className="gs-card clickable"
            onClick={() => navigate("/health-assistant")}
          >
            <span className="gs-icon">💬</span>
            <h3>AI Health Assistant</h3>
            <p>Chat with our AI bot for instant health guidance and tips.</p>
          </div>

          <div
            className="gs-card clickable"
            onClick={() => navigate("/health-risk-prediction")}
          >
            <span className="gs-icon">📊</span>
            <h3>Health Risk Prediction</h3>
            <p>Predict risks like diabetes and heart issues with AI insights.</p>
          </div>

          <div
            className="gs-card clickable"
            onClick={() => navigate("/medicine-reminder")}
          >
            <span className="gs-icon">💊</span>
            <h3>Medicine Reminder</h3>
            <p>Get smart reminders & interaction safety checks for your meds.</p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="gs-final">
        <h2>🌿 Ready to Experience AI Health?</h2>
        <p>
          Track your health, get AI wellness tips, and take control of your future.
        </p>
        <button className="gs-btn glow" onClick={() => navigate("/health-assistant")}>
          Join Now
        </button>
      </section>
    </div>
  );
};

export default GetStarted;
