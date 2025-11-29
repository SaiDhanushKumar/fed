import React, { useState } from "react";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    const res = login(username, password, role);

    if (!res.ok) {
      setError(res.message);
      return;
    }

    if (role === "admin") nav("/admin");
    if (role === "artisan") nav("/artisan");
    if (role === "customer") nav("/customer");
    if (role === "consultant") nav("/consultant");
  }

  return (
    <div style={{
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      height: "100vh",
      background: "#fff7e6"
    }}>
      
      <form onSubmit={handleLogin}
        style={{
          background: "white",
          padding: "32px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
        }}
      >
        <h2 style={{textAlign: "center", marginBottom: "20px"}}>
          Welcome Back 👋
        </h2>

        <label>Role</label>
        <select 
          value={role}
          onChange={(e)=>setRole(e.target.value)}
          style={{width:"100%", padding:"10px", marginBottom:"10px"}}
        >
          <option value="customer">Customer</option>
          <option value="artisan">Artisan</option>
          <option value="admin">Admin</option>
          <option value="consultant">Consultant</option>
        </select>

        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          style={{width:"100%", padding:"10px", marginBottom:"10px"}}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{width:"100%", padding:"10px", marginBottom:"10px"}}
        />

        {error && <p style={{color:"red"}}>{error}</p>}

        <button
          type="submit"
          style={{
            marginTop:"10px",
            width:"100%",
            padding:"10px",
            background:"#ff8c00",
            color:"white",
            border:"none",
            borderRadius:"8px",
            fontWeight:"bold"
          }}
        >
          Login
        </button>

        <div style={{marginTop:"15px", textAlign:"center"}}>
          <strong>Demo Logins:</strong>
          <p>admin / admin123</p>
          <p>artisan / artisan123</p>
          <p>customer / customer123</p>
          <p>consultant / consult123</p>
        </div>
      </form>
    </div>
  );
}
