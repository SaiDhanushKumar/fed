import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../store/cart'
import { useAuth } from '../store/auth'

export default function Navbar(){
  const {items} = useCart()
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const count = items.reduce((s,i)=> s+i.qty,0)

  function doLogout(){ logout(); nav('/') }

  return (
    <header className="header">
      <div className="nav-inner">
        <div style={{display:'flex',gap:20,alignItems:'center'}}>
          <div className="brand">Tribal Handicrafts Marketplace</div>

          {/* Show Home for everyone */}
          <Link to="/" style={{color:'#fff',opacity:0.9,textDecoration:'none'}}>Home</Link>

          {/* Role-specific navigation */}
          {!user && (
            <>
              <Link to="/customer" style={{color:'#fff',opacity:0.9,textDecoration:'none'}}>Customer</Link>
              <Link to="/artisan" style={{color:'#fff',opacity:0.9,textDecoration:'none'}}>Artisan</Link>
              <Link to="/admin" style={{color:'#fff',opacity:0.9,textDecoration:'none'}}>Admin</Link>
            </>
          )}

          {user && user.role === 'customer' && <Link to="/customer" style={{color:'#fff',opacity:0.9,textDecoration:'none'}}>Customer</Link>}
          {user && user.role === 'artisan' && <Link to="/artisan" style={{color:'#fff',opacity:0.9,textDecoration:'none'}}>Artisan</Link>}
          {user && user.role === 'admin' && <Link to="/admin" style={{color:'#fff',opacity:0.9,textDecoration:'none'}}>Admin</Link>}
          {user && user.role === 'consultant' && <Link to="/consultant" style={{color:'#fff',opacity:0.9,textDecoration:'none'}}>Consultant</Link>}
        </div>

        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <Link to="/cart" style={{color:'#fff',textDecoration:'none'}}>Cart ({count})</Link>
          {user ? (
            <div style={{display:'flex',gap:10,alignItems:'center'}}>
              <div style={{color:'#fff'}}>{user.name} ({user.role})</div>
              <button className="btn btn-light" onClick={doLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" style={{color:'#fff',textDecoration:'none'}}>Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}
