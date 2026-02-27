import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="home-hero">
        {/* Animated background shapes */}
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">✨ MERN Stack Application</div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
            alt="Patient Dashboard Logo"
            className="hero-logo"
          />
          <h1>
            Telemedicine Patient Dashboard
            <span className="hero-vuid">– BC240440573</span>
          </h1>
          <p>
            A modern and user-friendly application to register patients and
            manage their information efficiently. Built with React.js, Node.js,
            Express.js &amp; MongoDB.
          </p>
          <div className="home-buttons">
            <Link to="/register" className="btn-primary-custom">
              <span>📝</span> Patient Registration
            </Link>
            <Link to="/patients" className="btn-outline-custom">
              <span>📋</span> View Patients List
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-item">
          <div className="stat-number">⚡</div>
          <div className="stat-label">Fast & Reliable</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">🔒</div>
          <div className="stat-label">Validated Input</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">☁️</div>
          <div className="stat-label">Cloud Database</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">📱</div>
          <div className="stat-label">Responsive Design</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Use Smart Patient Dashboard?</h2>
        <p className="features-subtitle">
          Everything you need to manage patient information in one place
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper gradient-1">
              <span className="feature-icon">📝</span>
            </div>
            <h3>Easy Registration</h3>
            <p>
              Simple and validated registration form to add new patients
              quickly and accurately.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper gradient-2">
              <span className="feature-icon">📋</span>
            </div>
            <h3>Patient Records</h3>
            <p>
              View all registered patients in a clean, organized and
              searchable list format.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper gradient-3">
              <span className="feature-icon">✅</span>
            </div>
            <h3>Dual Validation</h3>
            <p>
              Both frontend (React) and backend (Express) validation ensures
              100% accurate data entry.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>
          Smart Patient Dashboard © 2026 — Built with ❤️ using MERN Stack
        </p>
      </footer>
    </>
  );
}
