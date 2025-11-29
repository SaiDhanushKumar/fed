import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ArtisanDashboard() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("orders");
    if (raw) setOrders(JSON.parse(raw));
  }, []);

  return (
    <div className="container">
      <h2>Artisan Dashboard</h2>

      {/* IMPLEMENTATION OF THE SENTENCE */}
      <p style={{ maxWidth: "700px", color: "#555" }}>
        Artisans are the core users of the platform. They create and update 
        their product listings, manage incoming orders, and communicate directly 
        with customers. This provides them with direct access to markets and 
        fair pricing opportunities.
      </p>

      <div className="kpi-grid">
        <div className="kpi">
          Products Listed<br />
          <strong>{JSON.parse(localStorage.getItem("products") || "[]").filter(p => p.artisan).length}</strong>
        </div>

        <div className="kpi">
          Incoming Orders<br />
          <strong>{orders.length}</strong>
        </div>

        <div className="kpi">
          Messages<br />
          <strong>{JSON.parse(localStorage.getItem("chat_messages") || "[]").length}</strong>
        </div>
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: 15 }}>
        <Link to="/artisan/add">
          <button className="btn btn-accent">Add Product</button>
        </Link>

        <Link to="/artisan/products">
          <button className="btn btn-light">My Products</button>
        </Link>

        <Link to="/artisan/orders">
          <button className="btn btn-light">Incoming Orders</button>
        </Link>

        <Link to="/chat">
          <button className="btn btn-light">Customer Chat</button>
        </Link>
      </div>
    </div>
  );
}
