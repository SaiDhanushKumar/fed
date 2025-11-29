import React, { useEffect, useState } from 'react';
import { useAuth } from '../../store/auth';

export default function ChatWindow() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("chat_messages");
    if (raw) setMessages(JSON.parse(raw));
  }, []);

  function send() {
    if (!msg.trim()) return;

    const newMsg = {
      id: "m" + Date.now(),
      sender: user.role,
      text: msg,
      time: new Date().toLocaleTimeString(),
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem("chat_messages", JSON.stringify(updated));
    setMsg("");
  }

  return (
    <div className="container">
      <h2>Chat</h2>

      <div className="card" style={{
        height: "400px",
        overflowY: "auto",
        padding: "12px",
        marginBottom: "12px"
      }}>
        {messages.map((m) => (
          <div key={m.id} style={{marginBottom:10}}>
            <strong>{m.sender === "customer" ? "Customer" : "Artisan"}:</strong>
            <div>{m.text}</div>
            <small style={{color:"#777"}}>{m.time}</small>
          </div>
        ))}
      </div>

      <div style={{display:"flex", gap:8}}>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type message..."
          style={{flex:1, padding:10}}
        />
        <button className="btn btn-accent" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}
