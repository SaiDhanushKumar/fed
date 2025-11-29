// src/store/auth.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export function useAuth() { return useContext(AuthContext); }

// Demo users (kept for testing)
const DEMO_USERS = [
  { id: 1, role: "admin", username: "admin", password: "admin123", name: "Platform Admin", email: "admin@example.com" },
  { id: 2, role: "artisan", username: "artisan", password: "artisan123", name: "Maria Santos", email: "artisan@example.com" },
  { id: 3, role: "customer", username: "customer", password: "customer123", name: "Guest Buyer", email: "customer@example.com" },
  { id: 4, role: "consultant", username: "consultant", password: "consultant123", name: "Cultural Consultant", email: "consultant@example.com" },
];

function getStoredUsers() {
  const raw = localStorage.getItem("users");
  return raw ? JSON.parse(raw) : [];
}

function saveStoredUsers(list) {
  localStorage.setItem("users", JSON.stringify(list));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("auth_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  // login accepts { username, password, role } or email as username
  function login({ username, password, role }) {
    // check demo users first
    const foundDemo = DEMO_USERS.find(u => 
      (u.username === username || u.email === username) &&
      u.password === password &&
      (!role || u.role === role)
    );
    if (foundDemo) {
      localStorage.setItem("auth_user", JSON.stringify(foundDemo));
      setUser(foundDemo);
      return { ok: true, user: foundDemo };
    }

    // check registered users (localStorage)
    const stored = getStoredUsers();
    const found = stored.find(u =>
      (u.username === username || u.email === username) &&
      u.password === password &&
      (!role || u.role === role)
    );
    if (found) {
      localStorage.setItem("auth_user", JSON.stringify(found));
      setUser(found);
      return { ok: true, user: found };
    }

    return { ok: false, message: "Invalid credentials" };
  }

  function logout() {
    localStorage.removeItem("auth_user");
    setUser(null);
  }

  function register(newUser) {
    // newUser: { username, password, role, name, email, phone, city, village, mandal, address, pincode }
    // basic validations (callers should validate too)
    if (!newUser.username || !newUser.password || !newUser.role || !newUser.name || !newUser.email) {
      return { ok: false, message: "Missing required fields" };
    }

    // check username/email uniqueness against demo + stored
    const stored = getStoredUsers();
    const usernameTaken = DEMO_USERS.some(u => u.username === newUser.username) || stored.some(u => u.username === newUser.username);
    const emailTaken = DEMO_USERS.some(u => u.email === newUser.email) || stored.some(u => u.email === newUser.email);
    if (usernameTaken) return { ok: false, message: "Username already taken" };
    if (emailTaken) return { ok: false, message: "Email already registered" };

    // assign id and save
    const id = "u" + Date.now();
    const userToSave = { id, ...newUser };
    const next = [userToSave, ...stored];
    saveStoredUsers(next);

    // optionally auto-login after register
    localStorage.setItem("auth_user", JSON.stringify(userToSave));
    setUser(userToSave);

    return { ok: true, user: userToSave };
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
