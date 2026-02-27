import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:5000/api/patients";

export default function Registration() {
  const [formData, setFormData] = useState({
    fullName: "",
    patientNumber: "",
    email: "",
    contactNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // ─── Frontend Validation ──────────────────────
  function validate() {
    const errs = {};

    // Full Name
    if (!formData.fullName.trim()) {
      errs.fullName = "Full Name is required";
    } else if (formData.fullName.trim().length < 4 || formData.fullName.trim().length > 15) {
      errs.fullName = "Full Name must be 4–15 characters";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName.trim())) {
      errs.fullName = "Full Name must not contain numbers or special characters";
    }

    // Patient Number
    if (!formData.patientNumber.trim()) {
      errs.patientNumber = "Patient Number is required";
    } else if (!/^[A-Za-z0-9\-]+$/.test(formData.patientNumber.trim())) {
      errs.patientNumber = "Patient Number must be alphanumeric (e.g., A-12, PtN203)";
    }

    // Email
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please provide a valid email address";
    }

    // Contact Number
    if (!formData.contactNumber.trim()) {
      errs.contactNumber = "Contact Number is required";
    } else if (!/^\d{11}$/.test(formData.contactNumber.trim())) {
      errs.contactNumber = "Contact Number must be exactly 11 digits";
    }

    return errs;
  }

  // ─── Handle Submit ────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();
    setServerErrors([]);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      await axios.post(API_URL, {
        fullName: formData.fullName.trim(),
        patientNumber: formData.patientNumber.trim(),
        email: formData.email.trim(),
        contactNumber: formData.contactNumber.trim(),
      });
      setSubmitted(true);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setServerErrors(err.response.data.errors);
      } else {
        setServerErrors(["Something went wrong. Please try again."]);
      }
    } finally {
      setLoading(false);
    }
  }

  // ─── Handle Clear ─────────────────────────────
  function handleClear() {
    setFormData({ fullName: "", patientNumber: "", email: "", contactNumber: "" });
    setErrors({});
    setServerErrors([]);
  }

  // ─── Handle Input Change ──────────────────────
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear field error on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  }

  // ─── Success View ─────────────────────────────
  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="page-wrapper">
          <div className="registration-container">
            <div className="success-message">
              <div className="success-icon">✅</div>
              <h3>Thank You for Registration!</h3>
              <p>Your information has been saved successfully.</p>
              <div className="home-buttons">
                <button
                  className="btn-primary-custom"
                  onClick={() => {
                    setSubmitted(false);
                    handleClear();
                  }}
                >
                  Register Another Patient
                </button>
                <Link to="/patients" className="btn-outline-custom">
                  View Patients List
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ─── Registration Form ────────────────────────
  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="registration-container">
          <h2>📝 Patient Registration</h2>

          {serverErrors.length > 0 && (
            <div className="server-errors">
              {serverErrors.map((err, i) => (
                <p key={i}>⚠️ {err}</p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter full name (4–15 characters)"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? "is-invalid" : ""}
              />
              {errors.fullName && <div className="error-text">{errors.fullName}</div>}
            </div>

            {/* Patient Number */}
            <div className="form-group">
              <label>Patient Number</label>
              <input
                type="text"
                name="patientNumber"
                placeholder="e.g., A-12, PtN203"
                value={formData.patientNumber}
                onChange={handleChange}
                className={errors.patientNumber ? "is-invalid" : ""}
              />
              {errors.patientNumber && (
                <div className="error-text">{errors.patientNumber}</div>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "is-invalid" : ""}
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>

            {/* Contact Number */}
            <div className="form-group">
              <label>Contact Number</label>
              <input
                type="text"
                name="contactNumber"
                placeholder="11-digit number"
                value={formData.contactNumber}
                onChange={handleChange}
                className={errors.contactNumber ? "is-invalid" : ""}
              />
              {errors.contactNumber && (
                <div className="error-text">{errors.contactNumber}</div>
              )}
            </div>

            {/* Buttons */}
            <div className="form-buttons">
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
              <button type="button" className="btn-clear" onClick={handleClear}>
                Clear All
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
