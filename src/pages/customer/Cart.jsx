import React from 'react'
import { useCart } from '../../store/cart'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart(){
  const {items, remove, updateQty, total} = useCart()
  const nav = useNavigate()
  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      <div className="card">
        {items.length===0 ? <p>Your cart is empty — add some beautiful handicrafts!</p> : (
          <div>
            <div className="cart-list">
              {items.map(i=> (
                <div className="cart-item" key={i.id}>
                  <img src={i.img} style={{width:80,height:60,objectFit:'cover',borderRadius:6}} />
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700}}>{i.title}</div>
                    <div style={{color:'#6b6b6b'}}>${Number(i.price).toFixed(2)}</div>
                  </div>
                  <div>
                    <input type="number" value={i.qty} min={1} onChange={(e)=> updateQty(i.id, Math.max(1, Number(e.target.value)))} style={{width:60}}/>
                  </div>
                  <div style={{width:80,textAlign:'right',fontWeight:700}}>${(i.price*i.qty).toFixed(2)}</div>
                  <button onClick={()=>remove(i.id)} style={{marginLeft:12}}>Remove</button>
                </div>
              ))}
            </div>
            <div style={{marginTop:12, textAlign:'right'}}>
              <div style={{fontWeight:700}}>Total: ${total.toFixed(2)}</div>
              <button className="btn btn-accent" style={{marginTop:10}} onClick={()=>nav('/checkout')}>Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
      <div style={{marginTop:12}}>
        <Link to="/">Continue shopping</Link>
      </div>
    </div>
  )
}
