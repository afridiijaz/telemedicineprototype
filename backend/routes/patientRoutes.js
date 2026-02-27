const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

// ---------- Validation Middleware (Backend) ----------
function validatePatient(req, res, next) {
  const { fullName, patientNumber, email, contactNumber } = req.body;
  const errors = [];

  // Full Name validation
  if (!fullName || fullName.trim() === "") {
    errors.push("Full Name is required");
  } else {
    if (fullName.trim().length < 4 || fullName.trim().length > 15) {
      errors.push("Full Name must be 4–15 characters");
    }
    if (!/^[A-Za-z\s]+$/.test(fullName.trim())) {
      errors.push("Full Name must not contain numbers or special characters");
    }
  }

  // Patient Number validation
  if (!patientNumber || patientNumber.trim() === "") {
    errors.push("Patient Number is required");
  } else if (!/^[A-Za-z0-9\-]+$/.test(patientNumber.trim())) {
    errors.push("Patient Number must be alphanumeric (e.g., A-12, PtN203)");
  }

  // Email validation
  if (!email || email.trim() === "") {
    errors.push("Email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.push("Please provide a valid email address");
  }

  // Contact Number validation
  if (!contactNumber || contactNumber.trim() === "") {
    errors.push("Contact Number is required");
  } else if (!/^\d{11}$/.test(contactNumber.trim())) {
    errors.push("Contact Number must be exactly 11 digits");
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
}

// ---------- POST /api/patients – Register a patient ----------
router.post("/", validatePatient, async (req, res) => {
  try {
    const { fullName, patientNumber, email, contactNumber } = req.body;

    const patient = await Patient.create({
      fullName: fullName.trim(),
      patientNumber: patientNumber.trim(),
      email: email.trim(),
      contactNumber: contactNumber.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Thank You for Registration!",
      patient,
    });
  } catch (err) {
    // Mongoose validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, errors: messages });
    }
    res.status(500).json({ success: false, errors: ["Server error"] });
  }
});

// ---------- GET /api/patients – List all patients ----------
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json({ success: true, patients });
  } catch (err) {
    res.status(500).json({ success: false, errors: ["Server error"] });
  }
});

module.exports = router;
