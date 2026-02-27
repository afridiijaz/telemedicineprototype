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

    if (!formData.fullName.trim()) {
      errs.fullName = "Full Name is required";
    } else if (formData.fullName.trim().length < 4 || formData.fullName.trim().length > 15) {
      errs.fullName = "Full Name must be 4–15 characters";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName.trim())) {
      errs.fullName = "Full Name must not contain numbers or special characters";
    }

    if (!formData.patientNumber.trim()) {
      errs.patientNumber = "Patient Number is required";
    } else if (!/^[A-Za-z0-9\-]+$/.test(formData.patientNumber.trim())) {
      errs.patientNumber = "Patient Number must be alphanumeric (e.g., A-12, PtN203)";
    }

    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please provide a valid email address";
    }

    if (!formData.contactNumber.trim()) {
      errs.contactNumber = "Contact Number is required";
    } else if (!/^\+?\d{11}$/.test(formData.contactNumber.trim())) {
      errs.contactNumber = "Contact Number must be exactly 11 digits";
    }

    return errs;
  }

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
      if (err.response?.data?.errors) {
        setServerErrors(err.response.data.errors);
      } else {
        setServerErrors(["Something went wrong. Please try again."]);
      }
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setFormData({ fullName: "", patientNumber: "", email: "", contactNumber: "" });
    setErrors({});
    setServerErrors([]);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "contactNumber") {
      // Strip everything except digits and + sign
      const filtered = value.replace(/[^\d+]/g, "");
      // Truncate so that no more than 11 digits are kept (+ doesn't count)
      let digitCount = 0;
      let result = "";
      for (const char of filtered) {
        if (/\d/.test(char)) {
          if (digitCount < 11) {
            result += char;
            digitCount++;
          }
        } else {
          result += char; // keep + sign
        }
      }
      setFormData({ ...formData, contactNumber: result });
      if (errors.contactNumber) {
        setErrors({ ...errors, contactNumber: "" });
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  }

  // ─── Success View ─────────────────────────────
  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="page-wrapper">
          <div className="registration-container fade-in">
            <div className="success-message">
              <div className="success-checkmark">
                <div className="check-circle">
                  <span className="check-icon">✓</span>
                </div>
              </div>
              <h3>Thank You for Registration!</h3>
              <p>Patient data has been saved to the database successfully.</p>
              <div className="home-buttons" style={{ marginTop: "24px" }}>
                <button
                  className="btn-primary-custom"
                  onClick={() => {
                    setSubmitted(false);
                    handleClear();
                  }}
                >
                  ➕ Register Another
                </button>
                <Link to="/patients" className="btn-outline-custom">
                  📋 View Patients
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
        <div className="registration-container fade-in">
          {/* Form Header */}
          <div className="form-header">
            <div className="form-header-icon">📋</div>
            <h2 style={{ color: "#ffffff", textShadow: "0 2px 8px rgba(0,0,0,0.18)" }}>
              Patient Registration
            </h2>
            <p className="form-subtitle">Fill in all the required fields to register a new patient</p>
          </div>

          {serverErrors.length > 0 && (
            <div className="server-errors">
              {serverErrors.map((err, i) => (
                <p key={i}>⚠️ {err}</p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>
                <span className="label-icon">👤</span> Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter full name (4–15 characters)"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? "is-invalid" : ""}
              />
              {errors.fullName && <div className="error-text">❌ {errors.fullName}</div>}
            </div>

            <div className="form-group">
              <label>
                <span className="label-icon">🔢</span> Patient Number
              </label>
              <input
                type="text"
                name="patientNumber"
                placeholder="e.g., A-12, PtN203"
                value={formData.patientNumber}
                onChange={handleChange}
                className={errors.patientNumber ? "is-invalid" : ""}
              />
              {errors.patientNumber && (
                <div className="error-text">❌ {errors.patientNumber}</div>
              )}
            </div>

            <div className="form-group">
              <label>
                <span className="label-icon">📧</span> Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "is-invalid" : ""}
              />
              {errors.email && <div className="error-text">❌ {errors.email}</div>}
            </div>

            <div className="form-group">
              <label>
                <span className="label-icon">📞</span> Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                placeholder="11-digit number (e.g., 09123456789)"
                value={formData.contactNumber}
                onChange={handleChange}
                className={errors.contactNumber ? "is-invalid" : ""}
              />
              {errors.contactNumber && (
                <div className="error-text">❌ {errors.contactNumber}</div>
              )}
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner"></span> Submitting...
                  </span>
                ) : (
                  "🚀 Submit"
                )}
              </button>
              <button type="button" className="btn-clear" onClick={handleClear}>
                🗑️ Clear All
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
