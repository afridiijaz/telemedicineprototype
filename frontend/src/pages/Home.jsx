import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="home-hero">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
          alt="Patient Dashboard Logo"
        />
        <h1>Smart Patient Dashboard – BC240201639</h1>
        <p>
          A modern and user-friendly application to register patients and manage
          their information efficiently. Get started by registering a new
          patient or viewing the patients list.
        </p>
        <div className="home-buttons">
          <Link to="/register" className="btn-primary-custom">
            📝 Patient Registration
          </Link>
          <Link to="/patients" className="btn-outline-custom">
            📋 View Patients List
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Use Smart Patient Dashboard?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Easy Registration</h3>
            <p>Simple and validated registration form to add new patients quickly.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Patient Records</h3>
            <p>View all registered patients in a clean, organized list format.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Input Validation</h3>
            <p>Both frontend and backend validation ensures accurate data entry.</p>
          </div>
        </div>
      </section>
    </>
  );
}
