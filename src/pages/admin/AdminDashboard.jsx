import React, { useEffect, useState } from 'react'

export default function AdminDashboard(){
  const [products,setProducts] = useState([])
  const [orders,setOrders] = useState([])
  const [users,setUsers] = useState([])
  const [apps,setApps] = useState([])
  const [issues,setIssues] = useState([])
  const [newIssueText,setNewIssueText] = useState('')

  useEffect(()=>{
    const p = JSON.parse(localStorage.getItem('products')||'[]')
    const o = JSON.parse(localStorage.getItem('orders')||'[]')
    const u = JSON.parse(localStorage.getItem('users')||'[]')
    const a = JSON.parse(localStorage.getItem('artisan_applications')||'[]')
    const iss = JSON.parse(localStorage.getItem('support_issues')||'[]')

    setProducts(p)
    setOrders(o)
    setUsers(u.length ? u : [
      {id:'u1',name:'Platform Admin',role:'admin'},
      {id:'u2',name:'Maria Santos',role:'artisan'},
      {id:'u3',name:'Guest Buyer',role:'customer'}
    ])
    setApps(a.length ? a : [
      { id: 'a1', name: 'Raju (Tribal Potter)', status: 'pending' },
      { id: 'a2', name: 'Latha (Weaver)', status: 'pending' }
    ])
    setIssues(iss)
    // persist defaults
    if(!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify(u.length ? u : [
      {id:'u1',name:'Platform Admin',role:'admin'},
      {id:'u2',name:'Maria Santos',role:'artisan'},
      {id:'u3',name:'Guest Buyer',role:'customer'}
    ]))
    if(!localStorage.getItem('artisan_applications')) localStorage.setItem('artisan_applications', JSON.stringify(a.length ? a : [
      { id: 'a1', name: 'Raju (Tribal Potter)', status: 'pending' },
      { id: 'a2', name: 'Latha (Weaver)', status: 'pending' }
    ]))
  },[])

  // PRODUCTS: toggle visibility / remove / view consultant status
  function toggleVisibility(id){
    const next = products.map(p => p.id===id? {...p, visible: !p.visible} : p)
    setProducts(next); localStorage.setItem('products', JSON.stringify(next))
  }
  function removeProduct(id){
    const next = products.filter(p => p.id!==id)
    setProducts(next); localStorage.setItem('products', JSON.stringify(next))
  }

  // ORDERS: we'll show list (you can filter / export later)
  // USERS: show recent activity (demo)
  function approveApplication(appId){
    const next = apps.map(a => a.id===appId? {...a, status:'approved'} : a)
    setApps(next); localStorage.setItem('artisan_applications', JSON.stringify(next))
  }

  // ISSUES: create / resolve
  function createIssue(){
    if(!newIssueText.trim()) return
    const issue = { id: 'iss' + Date.now(), text: newIssueText, status: 'open', date: new Date().toISOString() }
    const next = [issue, ...issues]
    setIssues(next); localStorage.setItem('support_issues', JSON.stringify(next))
    setNewIssueText('')
  }
  function resolveIssue(id){
    const next = issues.map(i => i.id===id? {...i, status:'resolved'} : i)
    setIssues(next); localStorage.setItem('support_issues', JSON.stringify(next))
  }

  // compute KPIs
  const totalSales = orders.length
  const revenue = orders.reduce((s,o)=> s + Number(o.total || 0), 0)
  const activeUsers = users.length
  const pendingApps = apps.filter(a=> a.status==='pending').length

  return (
    <div className="container app-layout">
      <aside className="sidebar">
        <div style={{padding:16,fontWeight:700}}>Admin Panel</div>
        <div style={{marginTop:20}}>
          <div className="nav-item">Dashboard</div>
          <div className="nav-item">Product Listings</div>
          <div className="nav-item">Transactions</div>
          <div className="nav-item">User Activities</div>
          <div className="nav-item">Support</div>
        </div>
      </aside>

      <main className="content">
        <h2>Admin Dashboard</h2>

        {/* KPI row */}
        <div className="kpi-grid" style={{marginTop:12}}>
          <div className="kpi">Total Sales<br/><strong>{totalSales}</strong></div>
          <div className="kpi">Revenue<br/><strong>${revenue.toFixed(2)}</strong></div>
          <div className="kpi">Active Users<br/><strong>{activeUsers}</strong></div>
          <div className="kpi">Pending Applications<br/><strong>{pendingApps}</strong></div>
        </div>

        {/* PRODUCTS management */}
        <div className="card" style={{marginTop:20}}>
          <h3>Product Listings</h3>
          {products.length===0 ? <p>No products yet.</p> : products.map(p=>(
            <div key={p.id} style={{display:'flex',alignItems:'center',gap:12,padding:'8px 0',borderBottom:'1px solid #eee'}}>
              <img src={p.img} style={{width:80,height:60,objectFit:'cover',borderRadius:6}}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:700}}>{p.title}</div>
                <div style={{color:'#6b6b6b'}}>{p.category} • By: {p.artisan || 'Unknown'}</div>
                <div style={{marginTop:6,color:'#777'}}>{p.reviewStatus ? `Review: ${p.reviewStatus}` : ''} {p.consultantFeedback?`• Feedback: ${p.consultantFeedback}`:''}</div>
              </div>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <button onClick={()=>toggleVisibility(p.id)} className="btn btn-light">{p.visible ? 'Hide' : 'Show'}</button>
                <button onClick={()=>removeProduct(p.id)} className="btn btn-light">Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* TRANSACTIONS */}
        <div className="card" style={{marginTop:20}}>
          <h3>Transactions</h3>
          {orders.length===0 ? <p>No transactions yet.</p> : orders.map(o=>(
            <div key={o.id} style={{padding:'8px 0',borderBottom:'1px solid #eee'}}>
              <div style={{fontWeight:700}}>Order {o.id} — ${Number(o.total).toFixed(2)}</div>
              <div style={{color:'#6b6b6b'}}>Customer: {o.customerDetails ? o.customerDetails.name : 'Guest'} • Items: {o.items.length} • Date: {new Date(o.date).toLocaleString()}</div>
            </div>
          ))}
        </div>

        {/* USER ACTIVITIES & APPLICATIONS */}
        <div className="card" style={{marginTop:20}}>
          <h3>User Activities</h3>
          <div style={{marginBottom:12}}>
            <strong>Registered Users</strong>
            {users.map(u=> <div key={u.id} style={{padding:'6px 0'}}>{u.name} • <small>{u.role}</small></div>)}
          </div>

          <div style={{marginTop:12}}>
            <strong>Artisan Applications</strong>
            {apps.length===0 ? <p>No applications.</p> : apps.map(a=>(
              <div key={a.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:'1px solid #f2f2f2'}}>
                <div>{a.name} • <small>{a.status}</small></div>
                {a.status==='pending' && <button className="btn btn-accent" onClick={()=>approveApplication(a.id)}>Approve</button>}
              </div>
            ))}
          </div>
        </div>

        {/* SUPPORT / ISSUES */}
        <div className="card" style={{marginTop:20}}>
          <h3>Support & Issues</h3>
          <div style={{display:'flex',gap:8,marginBottom:12}}>
            <input placeholder="Describe an issue or note" value={newIssueText} onChange={e=>setNewIssueText(e.target.value)} />
            <button className="btn btn-accent" onClick={createIssue}>Create</button>
          </div>

          {issues.length===0 ? <p>No issues reported.</p> : issues.map(i=>(
            <div key={i.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'1px solid #eee'}}>
              <div>
                <div style={{fontWeight:700}}>{i.text}</div>
                <div style={{color:'#6b6b6b'}}>{new Date(i.date).toLocaleString()}</div>
              </div>
              <div>
                {i.status==='open' ? <button className="btn btn-light" onClick={()=>resolveIssue(i.id)}>Resolve</button> : <span style={{color:'#0a7'}}>Resolved</span>}
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  )
}
