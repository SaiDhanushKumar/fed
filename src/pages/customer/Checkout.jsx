import React, { useState } from "react";
import { useCart } from "../../store/cart";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    village: "",
    mandal: "",
    address: "",
    pincode: ""
  });

  const [error, setError] = useState("");

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    if (!form.name) return "Please enter your full name";
    if (!form.phone) return "Phone number is required";
    if (!form.city) return "City is required";
    if (!form.village) return "Village name is required";
    if (!form.mandal) return "Mandal is required";
    if (!form.address) return "Full address required";
    if (!form.pincode) return "Pincode is required";
    return null;
  }

  function placeOrder() {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");

    const newOrder = {
      id: "o" + Date.now(),
      items,
      total,
      date: new Date().toISOString(),
      method: "COD",
      customerDetails: form
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    clear();
    nav("/success");
  }

  return (
    <div className="container" style={{ maxWidth: "700px" }}>
      <h2 style={{ marginBottom: "20px" }}>Checkout</h2>

      <div
        className="card"
        style={{
          padding: "25px",
          borderRadius: "12px",
          background: "#fff",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.08)"
        }}
      >
        <h3 style={{ marginBottom: "15px", color: "#E57C00" }}>
          Customer Information
        </h3>

        {/* FORM FIELDS */}
        <div style={{ display: "grid", gap: "15px" }}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={updateField}
            className="input-field"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={updateField}
            className="input-field"
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={updateField}
              className="input-field"
              style={{ flex: 1 }}
            />
            <input
              name="village"
              placeholder="Village"
              value={form.village}
              onChange={updateField}
              className="input-field"
              style={{ flex: 1 }}
            />
          </div>

          <input
            name="mandal"
            placeholder="Mandal"
            value={form.mandal}
            onChange={updateField}
            className="input-field"
          />

          <textarea
            name="address"
            placeholder="Full Address"
            value={form.address}
            onChange={updateField}
            className="input-field"
            style={{ height: "90px", resize: "vertical" }}
          />

          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={updateField}
            className="input-field"
          />
        </div>

        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}

        {/* PAYMENT SECTION */}
        <hr style={{ margin: "25px 0" }} />

        <h3 style={{ color: "#E57C00" }}>Payment Method</h3>
        <p style={{ color: "#555" }}>Cash on Delivery (COD)</p>

        <div
          style={{
            marginTop: "10px",
            background: "#FFF3DF",
            padding: "12px",
            borderRadius: "8px",
            fontWeight: "600",
            color: "#333"
          }}
        >
          Total Amount: ₹{total.toFixed(2)}
        </div>

        <button
          className="btn btn-accent"
          style={{
            marginTop: "25px",
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "10px"
          }}
          onClick={placeOrder}
        >
          Confirm Order
        </button>
      </div>

      {/* EXTRA INPUT STYLING */}
      <style>{`
        .input-field {
          padding: 12px 15px;
          border-radius: 8px;
          border: 1px solid #ddd;
          font-size: 15px;
          outline: none;
          transition: 0.2s;
        }
        .input-field:focus {
          border-color: #E57C00;
          box-shadow: 0 0 4px rgba(229, 124, 0, 0.4);
        }
      `}</style>
    </div>
  );
}
