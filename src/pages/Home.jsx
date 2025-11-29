import React from "react";
import { useAuth } from "../store/auth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>Welcome {user?.name || "Guest"}</h1>
      <h3>Role: {user?.role || "None"}</h3>

      <p style={{ color: "#555", marginTop: 10 }}>
        Select your dashboard from the navigation above.
      </p>

      <div
        className="card"
        style={{ marginTop: 30, padding: 20, borderRadius: 10 }}
      >
        <h2>Explore Our Platform</h2>
        <p>Navigate using the menu above based on your role.</p>
      </div>
    </div>
  );
}
