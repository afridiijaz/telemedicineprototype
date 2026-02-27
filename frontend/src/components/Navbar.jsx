import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar-custom">
      <Link to="/" className="navbar-brand">
        🏥 Smart Patient Dashboard
      </Link>
      <div className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link
          to="/register"
          className={location.pathname === "/register" ? "active" : ""}
        >
          Register
        </Link>
        <Link
          to="/patients"
          className={location.pathname === "/patients" ? "active" : ""}
        >
          Patients List
        </Link>
      </div>
    </nav>
  );
}
