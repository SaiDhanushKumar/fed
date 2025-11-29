import React, { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#E57C00",
      color: "white",
      padding: "12px 20px",
      borderRadius: "8px",
      fontWeight: "600",
      boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
      zIndex: 9999,
      animation: "fadeIn 0.2s ease-out"
    }}>
      {message}
    </div>
  );
}
