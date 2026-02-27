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
        <div className="patients-container fade-in">
          {/* Page Header */}
          <div className="patients-header">
            <div className="patients-header-icon">📋</div>
            <h2>Registered Patients</h2>
            <p className="patients-subtitle">
              All registered patients from the database are listed below
            </p>
            {!loading && !error && (
              <div className="patients-count">
                <span className="count-badge">{patients.length}</span> Total
                Patients
              </div>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="loading-container">
              <div className="loading-pulse"></div>
              <p>Loading patient records...</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="server-errors">
              <p>⚠️ {error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && patients.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No Patients Found</h3>
              <p>
                No patients have been registered yet. Go to{" "}
                <a href="/register">Patient Registration</a> to add the first
                one.
              </p>
            </div>
          )}

          {/* Patient Table */}
          {!loading && patients.length > 0 && (
            <div className="patients-table">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>👤 Full Name</th>
                    <th>🔢 Patient Number</th>
                    <th>📧 Email</th>
                    <th>📞 Contact Number</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr key={patient._id} className="table-row-animated" style={{ animationDelay: `${index * 0.05}s` }}>
                      <td>
                        <span className="row-number">{index + 1}</span>
                      </td>
                      <td className="name-cell">{patient.fullName}</td>
                      <td>
                        <span className="patient-number-badge">
                          {patient.patientNumber}
                        </span>
                      </td>
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
            Application Developed &amp; Maintained by BC240440573, BS Computer
            Science
          </div>
        </div>
      </div>
    </>
  );
}
