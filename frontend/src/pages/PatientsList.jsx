import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:5000/api/patients";

export default function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPatients() {
      try {
        const res = await axios.get(API_URL);
        setPatients(res.data.patients);
      } catch (err) {
        setError("Failed to load patients. Please make sure the server is running.");
      } finally {
        setLoading(false);
      }
    }
    fetchPatients();
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="patients-container">
          <h2>📋 Registered Patients List</h2>

          {loading && <div className="loading-spinner">⏳ Loading patients...</div>}

          {error && (
            <div className="server-errors">
              <p>⚠️ {error}</p>
            </div>
          )}

          {!loading && !error && patients.length === 0 && (
            <div className="no-patients">
              No patients registered yet. Go to{" "}
              <a href="/register">Patient Registration</a> to add one.
            </div>
          )}

          {!loading && patients.length > 0 && (
            <div className="patients-table">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Patient Number</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr key={patient._id}>
                      <td>{index + 1}</td>
                      <td>{patient.fullName}</td>
                      <td>{patient.patientNumber}</td>
                      <td>{patient.email}</td>
                      <td>{patient.contactNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer Credit – Colorful */}
          <div className="footer-credit">
            Application Developed &amp; Maintained by BC240201639, BS Computer Science
          </div>
        </div>
      </div>
    </>
  );
}
