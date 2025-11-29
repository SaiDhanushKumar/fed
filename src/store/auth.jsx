import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// DEMO USERS
const DEMO_USERS = [
  { username: "admin", password: "admin123", role: "admin", name: "Admin User" },
  { username: "artisan", password: "artisan123", role: "artisan", name: "Artisan User" },
  { username: "customer", password: "customer123", role: "customer", name: "Customer User" },
  { username: "consultant", password: "consult123", role: "consultant", name: "Consultant User" }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // LOAD LOGIN STATE
  useEffect(() => {
    const raw = localStorage.getItem("auth_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  // LOGIN FUNCTION
  function login(username, password, role) {
    const found = DEMO_USERS.find(
      user => user.username === username && user.password === password && user.role === role
    );

    if (!found) {
      return { ok: false, message: "Incorrect username or password" };
    }

    // SAVE LOGIN STATE
    localStorage.setItem("auth_user", JSON.stringify(found));
    setUser(found);

    return { ok: true, user: found };
  }

  // LOGOUT
  function logout() {
    localStorage.removeItem("auth_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
