const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      minlength: [4, "Full Name must be at least 4 characters"],
      maxlength: [15, "Full Name must not exceed 15 characters"],
      match: [/^[A-Za-z\s]+$/, "Full Name must contain only letters and spaces"],
    },
    patientNumber: {
      type: String,
      required: [true, "Patient Number is required"],
      match: [
        /^[A-Za-z0-9\-]+$/,
        "Patient Number must be alphanumeric (e.g., A-12, PtN203)",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact Number is required"],
      match: [
        /^\d{11}$/,
        "Contact Number must be exactly 11 digits",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
