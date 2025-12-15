// src/Components/GovDashboard.jsx
import React from "react";
import "./GovDashboard.css";

const GovDashboard = () => {
  return (
    <div className="gov-dashboard-container">
      {/* Hero Section */}
      <section className="gov-hero">
        <div className="gov-hero-content">
          <h1>Government Health Dashboard</h1>
          <p>
            Monitor AI-driven health initiatives, vaccination campaigns, and
            public health schemes in real-time.
          </p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="gov-metrics">
        <h2>Key Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <h3>1,200,000</h3>
            <p>Beneficiaries Covered</p>
          </div>
          <div className="metric-card">
            <h3>350</h3>
            <p>Active Health Schemes</p>
          </div>
          <div className="metric-card">
            <h3>75%</h3>
            <p>Vaccination Coverage</p>
          </div>
          <div className="metric-card">
            <h3>1200+</h3>
            <p>AI Health Alerts Sent</p>
          </div>
        </div>
      </section>

      {/* Health Schemes */}
      <section className="gov-schemes">
        <h2>Ongoing Health Schemes</h2>
        <div className="schemes-grid">
          <div className="scheme-card">
            <h3>National Immunization Program</h3>
            <p>
              Ensuring children are fully vaccinated nationwide with AI
              monitoring.
            </p>
          </div>
          <div className="scheme-card">
            <h3>AI Health Assist for Rural Areas</h3>
            <p>
              Providing instant health guidance via AI chatbots for remote
              villages.
            </p>
          </div>
          <div className="scheme-card">
            <h3>Digital Health Records</h3>
            <p>
              AI-driven health tracking for millions of citizens, centralized
              reporting.
            </p>
          </div>
          <div className="scheme-card">
            <h3>Mental Health Support</h3>
            <p>
              AI-assisted counseling services for citizens with mental health
              needs.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="gov-impact">
        <h2>Impact Analysis</h2>
        <div className="impact-grid">
          <div className="impact-card">
            <h3>Lives Improved</h3>
            <p>Over 1 million people benefitted from AI health programs.</p>
          </div>
          <div className="impact-card">
            <h3>Rural Coverage</h3>
            <p>70% of rural population now has AI health assistance access.</p>
          </div>
          <div className="impact-card">
            <h3>AI Alerts</h3>
            <p>
              Real-time alerts sent for health emergencies and disease
              outbreaks.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="gov-footer">
        <p>© 2025 National AI Health Dashboard | Government of India</p>
      </footer>
    </div>
  );
};

export default GovDashboard;
