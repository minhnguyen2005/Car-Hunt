import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import {
  getAllSellRequests,
  approveSellRequest,
  rejectSellRequest,
} from "../api/sellApi";
import { getCurrentUser, getCurrentUserInfo } from "../api/authApi";
import "../styles/Admin.css";

export default function Admin() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, approved, rejected
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check if user is admin on mount
  useEffect(() => {
    const checkAdminAccess = async () => {
      const user = getCurrentUser();

      // If no user, redirect to login
      if (!user) {
        alert("Please login to access admin panel");
        navigate("/login");
        return;
      }

      // Try to get fresh user info from server to verify role
      try {
        const userInfo = await getCurrentUserInfo();
        if (!userInfo || userInfo.role !== "admin") {
          alert("Access denied. Admin privileges required.");
          navigate("/");
          return;
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        alert("Failed to verify admin access");
        navigate("/");
        return;
      }

      setCheckingAuth(false);
    };

    checkAdminAccess();
  }, [navigate]);

  useEffect(() => {
    if (!checkingAuth) {
      fetchRequests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, checkingAuth]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const status = filter === "all" ? null : filter;
      const response = await getAllSellRequests(status);
      setRequests(response.data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
      alert("Failed to load sell requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Are you sure you want to approve this request?")) {
      return;
    }

    try {
      setActionLoading(id);
      await approveSellRequest(id, adminNotes);
      alert("Request approved successfully!");
      setSelectedRequest(null);
      setAdminNotes("");
      fetchRequests();
    } catch (error) {
      alert(error.message || "Failed to approve request");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to reject this request?")) {
      return;
    }

    try {
      setActionLoading(id);
      await rejectSellRequest(id, adminNotes);
      alert("Request rejected");
      setSelectedRequest(null);
      setAdminNotes("");
      fetchRequests();
    } catch (error) {
      alert(error.message || "Failed to reject request");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: "Pending", class: "status-pending" },
      approved: { text: "Approved", class: "status-approved" },
      rejected: { text: "Rejected", class: "status-rejected" },
    };
    const badge = badges[status] || badges.pending;
    return <span className={`status-badge ${badge.class}`}>{badge.text}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (checkingAuth || loading) {
    return (
      <div className="admin-page">
        <PageHeader title="Admin Dashboard" />
        <div className="admin-container">
          <div className="loading-message">
            {checkingAuth ? "Verifying access..." : "Loading requests..."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <PageHeader title="Admin Dashboard" />
      <div className="admin-container">
        <div className="admin-header">
          <h2>Sell Requests Management</h2>
          <div className="filter-tabs">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All ({requests.length})
            </button>
            <button
              className={filter === "pending" ? "active" : ""}
              onClick={() => setFilter("pending")}
            >
              Pending ({requests.filter((r) => r.status === "pending").length})
            </button>
            <button
              className={filter === "approved" ? "active" : ""}
              onClick={() => setFilter("approved")}
            >
              Approved ({requests.filter((r) => r.status === "approved").length}
              )
            </button>
            <button
              className={filter === "rejected" ? "active" : ""}
              onClick={() => setFilter("rejected")}
            >
              Rejected ({requests.filter((r) => r.status === "rejected").length}
              )
            </button>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="empty-state">No sell requests found</div>
        ) : (
          <div className="requests-grid">
            {requests.map((request) => (
              <div key={request._id} className="request-card">
                <div className="request-header">
                  <h3>{request.title || "Untitled"}</h3>
                  {getStatusBadge(request.status)}
                </div>

                <div className="request-info">
                  <div className="info-row">
                    <span className="info-label">Condition:</span>
                    <span className="info-value">
                      {request.condition?.toUpperCase()}
                    </span>
                  </div>
                  {request.brand && (
                    <div className="info-row">
                      <span className="info-label">Brand:</span>
                      <span className="info-value">{request.brand}</span>
                    </div>
                  )}
                  {request.model && (
                    <div className="info-row">
                      <span className="info-label">Model:</span>
                      <span className="info-value">{request.model}</span>
                    </div>
                  )}
                  {request.year && (
                    <div className="info-row">
                      <span className="info-label">Year:</span>
                      <span className="info-value">{request.year}</span>
                    </div>
                  )}
                  <div className="info-row">
                    <span className="info-label">Price:</span>
                    <span className="info-value price">
                      ${request.price?.toLocaleString()}
                    </span>
                  </div>
                  {request.userId && (
                    <div className="info-row">
                      <span className="info-label">User:</span>
                      <span className="info-value">
                        {request.userId.name || request.userId.email}
                      </span>
                    </div>
                  )}
                  <div className="info-row">
                    <span className="info-label">Submitted:</span>
                    <span className="info-value">
                      {formatDate(request.createdAt)}
                    </span>
                  </div>
                </div>

                {request.description && (
                  <div className="request-description">
                    <strong>Description:</strong>
                    <p>{request.description}</p>
                  </div>
                )}

                {request.adminNotes && (
                  <div className="admin-notes">
                    <strong>Admin Notes:</strong>
                    <p>{request.adminNotes}</p>
                  </div>
                )}

                <div className="request-actions">
                  <button
                    className="btn-view"
                    onClick={() => setSelectedRequest(request)}
                  >
                    View Details
                  </button>
                  {request.status === "pending" && (
                    <>
                      <button
                        className="btn-approve"
                        onClick={() => handleApprove(request._id)}
                        disabled={actionLoading === request._id}
                      >
                        {actionLoading === request._id
                          ? "Processing..."
                          : "Approve"}
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => handleReject(request._id)}
                        disabled={actionLoading === request._id}
                      >
                        {actionLoading === request._id
                          ? "Processing..."
                          : "Reject"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for viewing details */}
      {selectedRequest && (
        <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Request Details</h2>
              <button
                className="modal-close"
                onClick={() => setSelectedRequest(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <h3>Car Details</h3>
                <div className="detail-grid">
                  <div>
                    <strong>Title:</strong> {selectedRequest.title}
                  </div>
                  <div>
                    <strong>Condition:</strong>{" "}
                    {selectedRequest.condition?.toUpperCase()}
                  </div>
                  <div>
                    <strong>Body Type:</strong>{" "}
                    {selectedRequest.bodyType || "N/A"}
                  </div>
                  <div>
                    <strong>Brand:</strong> {selectedRequest.brand || "N/A"}
                  </div>
                  <div>
                    <strong>Model:</strong> {selectedRequest.model || "N/A"}
                  </div>
                  <div>
                    <strong>Year:</strong> {selectedRequest.year || "N/A"}
                  </div>
                  <div>
                    <strong>Passenger Capacity:</strong>{" "}
                    {selectedRequest.passengerCapacity || "N/A"}
                  </div>
                  <div>
                    <strong>Exterior Color:</strong>{" "}
                    {selectedRequest.exteriorColor || "N/A"}
                  </div>
                </div>
                {selectedRequest.description && (
                  <div>
                    <strong>Description:</strong>
                    <p>{selectedRequest.description}</p>
                  </div>
                )}
              </div>

              <div className="detail-section">
                <h3>Engine Details</h3>
                <div className="detail-grid">
                  <div>
                    <strong>Fuel Type:</strong>{" "}
                    {selectedRequest.fuelType || "N/A"}
                  </div>
                  <div>
                    <strong>Mileage:</strong>{" "}
                    {selectedRequest.mileage
                      ? `${selectedRequest.mileage} km`
                      : "N/A"}
                  </div>
                  <div>
                    <strong>Transmission:</strong>{" "}
                    {selectedRequest.transmission || "N/A"}
                  </div>
                  <div>
                    <strong>Drivetrain:</strong>{" "}
                    {selectedRequest.drivetrain || "N/A"}
                  </div>
                  <div>
                    <strong>Engine Capacity:</strong>{" "}
                    {selectedRequest.engineCapacity
                      ? `${selectedRequest.engineCapacity} cc`
                      : "N/A"}
                  </div>
                  <div>
                    <strong>Power:</strong>{" "}
                    {selectedRequest.power
                      ? `${selectedRequest.power} hp`
                      : "N/A"}
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Dimension</h3>
                <div className="detail-grid">
                  <div>
                    <strong>Length:</strong>{" "}
                    {selectedRequest.length
                      ? `${selectedRequest.length} mm`
                      : "N/A"}
                  </div>
                  <div>
                    <strong>Width:</strong>{" "}
                    {selectedRequest.width
                      ? `${selectedRequest.width} mm`
                      : "N/A"}
                  </div>
                  <div>
                    <strong>Height:</strong>{" "}
                    {selectedRequest.height
                      ? `${selectedRequest.height} mm`
                      : "N/A"}
                  </div>
                  <div>
                    <strong>Cargo Volume:</strong>{" "}
                    {selectedRequest.cargoVolume
                      ? `${selectedRequest.cargoVolume} L`
                      : "N/A"}
                  </div>
                </div>
              </div>

              {selectedRequest.features?.length > 0 && (
                <div className="detail-section">
                  <h3>Features</h3>
                  <div className="features-list">
                    {selectedRequest.features.map((feature, index) => (
                      <span key={index} className="feature-tag">
                        {feature}
                      </span>
                    ))}
                  </div>
                  {selectedRequest.otherFeatures && (
                    <div>
                      <strong>Other:</strong> {selectedRequest.otherFeatures}
                    </div>
                  )}
                </div>
              )}

              <div className="detail-section">
                <h3>Price & Media</h3>
                <div>
                  <strong>Price:</strong> $
                  {selectedRequest.price?.toLocaleString()}
                </div>
                {selectedRequest.videoLink && (
                  <div>
                    <strong>Video Link:</strong>{" "}
                    <a
                      href={selectedRequest.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedRequest.videoLink}
                    </a>
                  </div>
                )}
                {selectedRequest.images?.length > 0 && (
                  <div>
                    <strong>Images:</strong> {selectedRequest.images.length}{" "}
                    file(s)
                  </div>
                )}
              </div>

              {selectedRequest.userId && (
                <div className="detail-section">
                  <h3>User Information</h3>
                  <div>
                    <strong>Name:</strong>{" "}
                    {selectedRequest.userId.name || "N/A"}
                  </div>
                  <div>
                    <strong>Email:</strong> {selectedRequest.userId.email}
                  </div>
                  <div>
                    <strong>Phone:</strong>{" "}
                    {selectedRequest.userId.phone || "N/A"}
                  </div>
                </div>
              )}

              {selectedRequest.status === "pending" && (
                <div className="detail-section">
                  <h3>Admin Action</h3>
                  <div className="form-group">
                    <label>Admin Notes (optional):</label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add notes about this request..."
                      rows="3"
                    />
                  </div>
                  <div className="modal-actions">
                    <button
                      className="btn-approve"
                      onClick={() => handleApprove(selectedRequest._id)}
                      disabled={actionLoading === selectedRequest._id}
                    >
                      {actionLoading === selectedRequest._id
                        ? "Processing..."
                        : "Approve"}
                    </button>
                    <button
                      className="btn-reject"
                      onClick={() => handleReject(selectedRequest._id)}
                      disabled={actionLoading === selectedRequest._id}
                    >
                      {actionLoading === selectedRequest._id
                        ? "Processing..."
                        : "Reject"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
