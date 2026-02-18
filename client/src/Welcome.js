import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #2c3e50, #4ca1af)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "40px", marginBottom: "20px" }}>
        Welcome to Todo Manager
      </h1>
      <p style={{ marginBottom: "30px" }}>
        Organize your tasks efficiently and boost productivity 🚀
      </p>
      <button
        onClick={() => navigate("/todos")}
        style={{
          padding: "12px 25px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Get Started
      </button>
    </div>
  );
}

export default Welcome;