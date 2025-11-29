import React from 'react'
export default function ArtisanDashboard(){
  return (
    <div className="container app-layout">
      <aside className="sidebar"><div style={{padding:16,fontWeight:700}}>Artisan Portal</div></aside>
      <main className="content">
        <h2>Artisan Dashboard</h2>
        <p>Artisans are the core users of the platform. They create and update their product listings, manage incoming orders, and communicate directly with customers. This provides them with direct access to markets and fair pricing opportunities.</p>
        <div className="kpi-grid">
          <div className="kpi">Total Products<br/><strong>—</strong></div>
          <div className="kpi">Total Revenue<br/><strong>—</strong></div>
          <div className="kpi">Orders<br/><strong>—</strong></div>
          <div className="kpi">Rating<br/><strong>—</strong></div>
        </div>
        <div style={{marginTop:12}}>
          <a href="/artisan/add"><button className="btn btn-accent">Add New Product</button></a>
        </div>
        <div className="container app-layout">
  <aside className="sidebar">...</aside>

  <main className="content">
    <h2>Artisan Dashboard</h2>
    <p>...</p>

    <div className="kpi-grid">
        ...
    </div>

    {/* PLACE CHAT BUTTON RIGHT HERE */}
  </main>
</div>
<div style={{ marginTop: 20 }}>
  <a href="/chat">
    <button className="btn btn-accent">Open Customer Chat</button>
  </a>
</div>
<div className="kpi-grid">
  <div className="kpi">Total Products<br/><strong>—</strong></div>
  <div className="kpi">Total Revenue<br/><strong>—</strong></div>
  <div className="kpi">Orders<br/><strong>—</strong></div>
  <div className="kpi">Rating<br/><strong>—</strong></div>
</div>

{/* ADD CHAT BUTTON HERE */}
<div style={{ marginTop: 20 }}>
  <a href="/chat">
    <button className="btn btn-accent">Open Customer Chat</button>
  </a>
</div>

      </main>
    </div>
  )
}
