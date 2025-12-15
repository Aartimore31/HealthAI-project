// src/Components/Home.jsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const features = [
  { title: "AI Symptom Checker", description: "Enter symptoms, AI suggests possible conditions.", icon: "🩺", route: "/symptom-checker" },
  { title: "AI Health Assistant (Chatbot)", description: "Chat with AI for instant health guidance.", icon: "💬", route: "/health-assistant" },
  { title: "Health Risk Prediction", description: "AI predicts risk for diseases like diabetes, heart issues.", icon: "📊", route: "/health-risk-prediction" },
  { title: "Medicine Reminder & Interaction Checker", description: "Reminds users to take medicine and checks harmful drug interactions.", icon: "💊", route: "/medicine-reminder" },
  { title: "Personal Health Dashboard", description: "Track daily health data and view AI-generated trends & reports.", icon: "📈" },
  { title: "AI-Powered Ayurveda / Wellness Tips", description: "Personalized natural remedies and lifestyle suggestions.", icon: "🌿" },
  { title: "AI Health Timeline & Reports", description: "Predicts future health progress with charts and graphs.", icon: "📅" },
];

const Home = () => {
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  const handleMouseMove = (e, idx) => {
    const card = cardRefs.current[idx];
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;
    card.style.transform = `rotateY(${dx * 15}deg) rotateX(${-dy * 15}deg) scale(1.05)`;
  };

  const handleMouseLeave = (idx) => {
    const card = cardRefs.current[idx];
    card.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
  };

  const handleCardClick = (route) => {
    if (route) navigate(route);
  };

  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Health AI</h1>
          <p>Your personal AI-powered health companion</p>
          <button className="cta-button" onClick={() => navigate("/getstarted")}>
            Get Started
          </button>

          {/* ✅ Government Dashboard Button */}
          <button
            className="gov-dashboard-btn"
            onClick={() => navigate("/gov-dashboard")}
          >
            Go to Government Health Dashboard
          </button>
        </div>
        <div className="hero-image">
          <img src="https://cdn-icons-png.flaticon.com/512/201/201623.png" alt="AI Health" />
        </div>
      </section>

      <section className="features">
        <h2>Our Features</h2>
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="feature-card clickable"
              ref={(el) => (cardRefs.current[idx] = el)}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              onClick={() => handleCardClick(feature.route)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
