import React, { useState } from 'react';
import { useCart } from '../store/cart';

export default function ProductCard({ p }) {
  const { add } = useCart();
  const [message, setMessage] = useState("");

  function handleAdd() {
    add(p);
    setMessage("Product added to cart");
    setTimeout(() => setMessage(""), 1500);
  }

  return (
    <div className="card prod" style={{ position: "relative" }}>

      {/* SIMPLE POPUP MESSAGE */}
      {message && (
        <div style={{
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#E57C00",
          color: "white",
          padding: "8px 16px",
          borderRadius: "8px",
          fontWeight: "600",
          zIndex: 1000,
        }}>
          {message}
        </div>
      )}

      <img src={p.img} alt={p.title} />

      <div className="info">
        <h4>{p.title}</h4>
        <p>{p.category}</p>
        <div>${p.price}</div>

        <button className="btn btn-accent" onClick={handleAdd}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
