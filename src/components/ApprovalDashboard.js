import React, { useEffect, useState } from "react";
import { useRequests } from "../context/RequestContext";
import { Spinner } from "react-bootstrap";
import ToastMessage from "./ToastMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownAZ, faArrowUpZA } from "@fortawesome/free-solid-svg-icons";

const ApprovalDashboard = () => {
  const { requests, loading, updateStatus, fetchRequests } = useRequests();
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "info",
  });
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [filters, setFilters] = useState({ status: "All", priority: "All" });
  const [sortOrder, setSortOrder] = useState("asc");
  // const [isAdmin, setIsAdmin] = useState(false);

  // 🔐 Simple admin login prompt
  // const adminLogin = () => {
  //   const username = prompt("Enter admin username:");
  //   const password = prompt("Enter admin password:");
  //   if (username === "admin" && password === "admin123") {
  //     showToast("success", "Admin login successful!");
  // setIsAdmin(true);
  //     return true;
  //   } else {
  //     showToast("error", "Access denied! Invalid credentials.");
  //     return false;
  //   }
  // };
 
  const showToast = (variant, message) => { 
    setToast((prev) => ({ ...prev, show: false }));
    setTimeout(() => {
      setToast({ show: true, variant, message });
    }, 100);
  };

  const handleStatusChange = async (id, status) => {
    try {
      // if (!isAdmin && !adminLogin()) return;
      await updateStatus(id, status);
      setTimeout(() => {
        showToast(status, `Status updated to "${status}" successfully!`);
        fetchRequests();
      }, 600);
    } catch (error) {
      console.error("Error updating status:", error);
      showToast("error", "Failed to update status. Please try again.");
    }
  };

  useEffect(() => {
    let filtered = [...requests];

    if (filters.status !== "All") {
      filtered = filtered.filter(
        (r) => r.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    if (filters.priority !== "All") {
      filtered = filtered.filter(
        (r) => r.priority?.toLowerCase() === filters.priority.toLowerCase()
      );
    }

    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.projectName.localeCompare(b.projectName)
        : b.projectName.localeCompare(a.projectName)
    );

    setFilteredRecords(filtered);
  }, [filters, requests, sortOrder]);
 

  return (
    <div className="container mt-4">
      {toast.show && (
        <ToastMessage
          show={toast.show}
          message={toast.message}
          variant={toast.variant}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <h3 className="mb-3 fw-bold text-dark">Approval Data</h3>
 
      <div className="d-flex align-items-center justify-content-end gap-3 mb-4 flex-wrap">
        <div>
          <label className="form-label fw-semibold me-2">Sort:</label>
          <div>
            <button
              className="btn btn-outline-secondary py-2 px-4 btn-sm d-flex align-items-center gap-2"
              onClick={() =>
                setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
              }
            >
              {sortOrder === "asc" ? (
                <>
                  <FontAwesomeIcon icon={faArrowDownAZ} />
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faArrowUpZA} />
                </>
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="form-label fw-semibold me-2">Status:</label>
          <select
            className="form-select form-select-sm shadow-none"
            style={{ width: "160px" }}
            value={filters.status}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, status: e.target.value }))
            }
          >
            <option>All</option>
            <option>approved</option>
            <option>Pending</option>
            <option>rejected</option>
          </select>
        </div>

        <div>
          <label className="form-label fw-semibold me-2">Priority:</label>
          <select
            className="form-select form-select-sm shadow-none"
            style={{ width: "160px" }}
            value={filters.priority}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, priority: e.target.value }))
            }
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>
 
      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <p className="text-muted mt-2">Loading requests...</p>
        </div>
      ) : filteredRecords.length === 0 ? (
        <p className="text-center text-muted mt-4">No matching requests found.</p>
      ) : (
        <div className="row g-4">
          {filteredRecords.map((record) => (
            <div key={record.id} className="col-12 col-lg-4 col-md-6 col-sm-6">
              <div
                className={`card shadow-sm border-0 h-100 ${record.status === "approved"
                  ? "border-success"
                  : record.status === "rejected"
                    ? "border-danger"
                    : "border-warning"
                  }`}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="fw-bold text-dark mb-0">
                      {record.projectName}
                    </h5>
                  </div>
                  <p className="card-text mb-1">
                    <strong>Role:</strong> {record.requiredRole}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Experience:</strong> {record.experienceLevel}
                  </p>
                  <p className="card-text">
                    <strong>Justification:</strong>{" "}
                    <span className="text-muted">{record.justification}</span>
                  </p>
                </div>

                <div className="card-footer bg-light border-top d-flex justify-content-between align-items-center">
                  <span
                    className={`badge ${record.status === "approved"
                      ? "bg-success"
                      : record.status === "rejected"
                        ? "bg-danger"
                        : "bg-secondary"
                      }`}
                  >
                    {record.status}
                  </span>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      disabled={record.status === "approved"}
                      onClick={() => handleStatusChange(record.id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      disabled={record.status === "rejected"}
                      onClick={() => handleStatusChange(record.id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovalDashboard;
