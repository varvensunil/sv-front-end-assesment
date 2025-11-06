import React from "react";
import { useRequests } from "../context/RequestContext";
import { Spinner } from "react-bootstrap";
import { exportToExcel } from "../utils/exportToExcel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";

const RequestsTable = () => {
    const { requests, loading } = useRequests();

    return (
        <div className="container mt-4 mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <h3 className="fw-bold text-dark mb-2">Resource Requests</h3>
                <button
                    className="btn btn-success btn-sm px-4 py-2 d-flex align-items-center gap-2"
                    onClick={() => exportToExcel(requests, "requests_data.csv")}
                >
                    <FontAwesomeIcon icon={faFileCsv} className="me-1" /> 
                    Export
                </button>
            </div>

            {loading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="text-muted mt-2">Loading requests...</p>
                </div>
            ) : requests.length === 0 ? (
                <p className="text-center text-muted mt-5">No matching requests found.</p>
            ) : (
                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-bordered align-middle text-center mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Project Name</th>
                                <th>Required Role</th>
                                <th>Experience</th>
                                <th>Justification</th>
                                <th>Priority</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {requests.map((record, index) => (
                                <tr key={record.id}>
                                    <td>{index + 1}</td>
                                    <td>{record.projectName}</td>
                                    <td>{record.requiredRole}</td>
                                    <td>{record.experienceLevel}</td>
                                    <td className="text-muted small">{record.justification}</td>
                                    <td>
                                        <span
                                            className={`badge px-3 py-2 rounded-pill bg-${record.priority?.toLowerCase() === "high"
                                                ? "danger"
                                                : record.priority?.toLowerCase() === "medium"
                                                    ? "warning text-dark"
                                                    : "info text-dark"
                                                }`}
                                        >
                                            {record.priority || "—"}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className={`badge px-3 py-2 rounded-pill bg-${record.status?.toLowerCase() === "approved"
                                                ? "success"
                                                : record.status?.toLowerCase() === "rejected"
                                                    ? "danger"
                                                    : "secondary"
                                                }`}
                                        >
                                            {record.status || "Pending"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RequestsTable;
