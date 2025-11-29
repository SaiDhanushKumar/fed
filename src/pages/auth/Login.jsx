// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../../store/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login(){
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // optional, let user choose or leave blank
  const [error, setError] = useState("");
  const nav = useNavigate();

  function doLogin(e) {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Username/email and password are required");
      return;
    }
    const res = login({ username, password, role: role || undefined });
    if (!res.ok) {
      setError(res.message || "Login failed");
      return;
    }
    // redirect based on role
    const r = res.user.role;
    if (r === "admin") nav("/admin");
    else if (r === "artisan") nav("/artisan");
    else if (r === "consultant") nav("/consultant");
    else nav("/customer");
  }

  return (
    <div className="container">
      <div style={{ maxWidth:480, margin: "30px auto" }} className="card">
        <h3 style={{ marginTop: 0 }}>Sign in</h3>
        <form onSubmit={doLogin} style={{ display: "grid", gap: 10 }}>
          <input placeholder="Username or email" value={username} onChange={(e)=>setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <select value={role} onChange={(e)=>setRole(e.target.value)}>
            <option value="">Login as (optional)</option>
            <option value="customer">Customer</option>
            <option value="artisan">Artisan</option>
            <option value="admin">Admin</option>
            <option value="consultant">Consultant</option>
          </select>

          {error && <div style={{ color: "red" }}>{error}</div>}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link to="/register">Create an account</Link>
            <button className="btn btn-accent" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
