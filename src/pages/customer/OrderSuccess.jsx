import React from 'react'
import { Link } from 'react-router-dom'
export default function OrderSuccess(){
  return (
    <div className="container">
      <div className="card" style={{textAlign:'center',padding:40}}>
        <h2>Thank you! Your order has been placed.</h2>
        <p>Payment method: Cash on Delivery</p>
        <p>We will notify you when your order ships.</p>
        <Link to="/customer">Continue shopping</Link>
      </div>
    </div>
  )
}
