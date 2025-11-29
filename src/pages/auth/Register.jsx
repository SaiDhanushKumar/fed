import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    pincode: "",
    role: "customer"
  });

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function register(e) {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

    // Prevent duplicate usernames
    if (users.some(u => u.username === form.username)) {
      alert("Username already exists!");
      return;
    }

    users.push(form);
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    alert("Account created successfully!");
    nav("/");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Account</h2>

      <form onSubmit={register} style={{ display: "grid", gap: 10, maxWidth: 400 }}>
        <select name="role" value={form.role} onChange={update}>
          <option value="customer">Customer</option>
          <option value="artisan">Artisan</option>
        </select>

        <input name="username" placeholder="Username" onChange={update} />
        <input name="password" placeholder="Password" onChange={update} />
        <input name="email" placeholder="Email" onChange={update} />
        <input name="phone" placeholder="Phone Number" onChange={update} />
        <input name="city" placeholder="City" onChange={update} />
        <input name="address" placeholder="Address" onChange={update} />
        <input name="pincode" placeholder="Pincode" onChange={update} />

        <button style={{ background: "#ff7b00", padding: "8px", border: "none", color: "white" }}>
          Register
        </button>
      </form>
    </div>
  );
}
