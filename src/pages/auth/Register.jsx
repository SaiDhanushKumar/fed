// src/pages/auth/Register.jsx
import React, { useState } from "react";
import { useAuth } from "../../store/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    role: "customer",
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    village: "",
    mandal: "",
    address: "",
    pincode: ""
  });
  const [error, setError] = useState("");

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (!form.username.trim()) return "Username is required";
    if (!form.password) return "Password is required";
    if (form.password.length < 5) return "Password must be at least 5 characters";
    if (form.password !== form.confirmPassword) return "Passwords do not match";
    if (!form.phone.trim()) return "Phone number is required";
    // optionally validate pincode etc.
    return null;
  }

  async function doRegister(e) {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }

    const payload = {
      role: form.role,
      username: form.username.trim(),
      password: form.password,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      village: form.village.trim(),
      mandal: form.mandal.trim(),
      address: form.address.trim(),
      pincode: form.pincode.trim()
    };

    const res = register(payload);
    if (!res.ok) {
      setError(res.message || "Registration failed");
      return;
    }

    // redirect based on role
    if (payload.role === "admin") nav("/admin");
    else if (payload.role === "artisan") nav("/artisan");
    else if (payload.role === "consultant") nav("/consultant");
    else nav("/customer");
  }

  return (
    <div className="container">
      <div style={{ maxWidth: 760, margin: "30px auto" }} className="card">
        <h2>Create an account</h2>
        <form onSubmit={doRegister} style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <label style={{ minWidth: 100 }}>Role</label>
            <select name="role" value={form.role} onChange={update}>
              <option value="customer">Customer</option>
              <option value="artisan">Artisan</option>
              <option value="admin">Admin</option>
              <option value="consultant">Consultant</option>
            </select>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <input name="name" placeholder="Full name" value={form.name} onChange={update} />
            <input name="email" placeholder="Email" value={form.email} onChange={update} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <input name="username" placeholder="Username" value={form.username} onChange={update} />
            <input name="phone" placeholder="Phone number" value={form.phone} onChange={update} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <input type="password" name="password" placeholder="Password" value={form.password} onChange={update} />
            <input type="password" name="confirmPassword" placeholder="Confirm password" value={form.confirmPassword} onChange={update} />
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            <input name="city" placeholder="City" value={form.city} onChange={update} />
            <input name="village" placeholder="Village" value={form.village} onChange={update} />
            <input name="mandal" placeholder="Mandal" value={form.mandal} onChange={update} />
            <textarea name="address" placeholder="Full address" value={form.address} onChange={update} style={{ minHeight: 80 }} />
            <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={update} />
          </div>

          {error && <div style={{ color: "red" }}>{error}</div>}

          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Link to="/login" style={{ alignSelf: "center", color: "#666" }}>Already have an account? Login</Link>
            <button className="btn btn-accent" type="submit">Create account</button>
          </div>
        </form>
      </div>
    </div>
  );
}
