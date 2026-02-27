import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar-custom">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">🏥</span>
        <span className="brand-text">
          Telemedicine Patient <span className="brand-highlight">Dashboard</span>
        </span>
      </Link>
      <div className="nav-links">
        <Link to="/" className={`nav-link-item ${location.pathname === "/" ? "active" : ""}`}>
          <span className="nav-icon">🏠</span> Home
        </Link>
        <Link
          to="/register"
          className={`nav-link-item ${location.pathname === "/register" ? "active" : ""}`}
        >
          <span className="nav-icon">📝</span> Register
        </Link>
        <Link
          to="/patients"
          className={`nav-link-item ${location.pathname === "/patients" ? "active" : ""}`}
        >
          <span className="nav-icon">📋</span> Patients
        </Link>
      </div>
    </nav>
  );
}
