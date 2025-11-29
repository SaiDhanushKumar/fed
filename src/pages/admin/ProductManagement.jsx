import React, { useEffect, useState } from 'react'
export default function ProductManagement(){
  const [products,setProducts] = useState([])
  useEffect(()=>{
    const raw = localStorage.getItem('products')
    if(raw) setProducts(JSON.parse(raw))
  },[])
  function remove(id){
    const next = products.filter(p=> p.id!==id)
    setProducts(next)
    localStorage.setItem('products', JSON.stringify(next))
  }
  return (
    <div className="container">
      <h2>Product Management</h2>
      <div className="card">
        {products.length===0 ? <p>No products.</p> : products.map(p=> (
          <div key={p.id} style={{display:'flex',gap:12,alignItems:'center',marginBottom:8}}>
            <img src={p.img} style={{width:80,height:60,objectFit:'cover',borderRadius:6}}/>
            <div style={{flex:1}}>
              <div style={{fontWeight:700}}>{p.title}</div>
              <div style={{color:'#6b6b6b'}}>${Number(p.price).toFixed(2)}</div>
            </div>
            <button onClick={()=>remove(p.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}
