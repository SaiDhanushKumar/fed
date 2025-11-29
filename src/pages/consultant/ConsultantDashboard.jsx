import React, { useEffect, useState } from "react";

export default function ConsultantDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("products");
    if (raw) setProducts(JSON.parse(raw));
  }, []);

  function updateStatus(id, status, feedback = "") {
    const updated = products.map((p) =>
      p.id === id
        ? {
            ...p,
            reviewStatus: status,
            approved: status === "approved",
            consultantFeedback: feedback,
          }
        : p
    );

    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  }

  const pending = products.filter((p) => p.reviewStatus !== "approved" && p.reviewStatus !== "rejected");
  const approved = products.filter((p) => p.reviewStatus === "approved");
  const rejected = products.filter((p) => p.reviewStatus === "rejected");

  return (
    <div className="container">
      <h2>Cultural Consultant Dashboard</h2>

      {/* Pending Review */}
      <div className="card" style={{ marginTop: 20 }}>
        <h3>Products Pending Review</h3>

        {pending.length === 0 ? (
          <p>No pending items to review.</p>
        ) : (
          pending.map((p) => (
            <div key={p.id} style={{ marginBottom: 15, borderBottom: "1px solid #ddd", paddingBottom: 10 }}>
              <strong>{p.title}</strong>
              <br />
              <img src={p.img} style={{ width: 120, height: 80, borderRadius: 8, marginTop: 6 }} />
              <p>{p.desc || "No description"}</p>

              {/* Approve */}
              <button
                className="btn btn-accent"
                onClick={() => updateStatus(p.id, "approved")}
                style={{ marginRight: 10 }}
              >
                Approve
              </button>

              {/* Reject */}
              <button
                className="btn btn-light"
                onClick={() => updateStatus(p.id, "rejected")}
                style={{ marginRight: 10 }}
              >
                Reject
              </button>

              {/* Ask for Modification */}
              <button
                className="btn btn-light"
                onClick={() => {
                  const feedback = prompt("Enter correction needed:");
                  if (feedback) updateStatus(p.id, "needs_changes", feedback);
                }}
              >
                Ask for Changes
              </button>
            </div>
          ))
        )}
      </div>

      {/* Approved */}
      <div className="card" style={{ marginTop: 20 }}>
        <h3>Approved Products</h3>

        {approved.length === 0 ? (
          <p>No approved items yet.</p>
        ) : (
          approved.map((p) => (
            <div key={p.id} style={{ marginBottom: 10 }}>
              <strong>{p.title}</strong>
              <div style={{ color: "#0a7" }}>Approved</div>
            </div>
          ))
        )}
      </div>

      {/* Rejected */}
      <div className="card" style={{ marginTop: 20 }}>
        <h3>Rejected Products</h3>

        {rejected.length === 0 ? (
          <p>No rejected items.</p>
        ) : (
          rejected.map((p) => (
            <div key={p.id} style={{ marginBottom: 10 }}>
              <strong>{p.title}</strong>
              <div style={{ color: "red" }}>Rejected</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
