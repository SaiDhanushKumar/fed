import React, { useEffect, useState } from 'react'
export default function Orders(){
  const [orders,setOrders] = useState([])
  useEffect(()=>{
    const raw = localStorage.getItem('orders')
    if(raw) setOrders(JSON.parse(raw))
  },[])
  return (
    <div className="container">
      <h2>Orders Received</h2>
      <div className="card">
        {orders.length===0 ? <p>No orders yet.</p> : orders.map(o=> (
          <div key={o.id} style={{marginBottom:12}}>
            <div style={{fontWeight:700}}>Order {o.id} - ${Number(o.total).toFixed(2)}</div>
            <div style={{color:'#6b6b6b'}}>Items: {o.items.length} • {new Date(o.date).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
