import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import CustomerHome from './pages/customer/CustomerHome'
import Cart from './pages/customer/Cart'
import Checkout from './pages/customer/Checkout'
import OrderSuccess from './pages/customer/OrderSuccess'
import ArtisanDashboard from './pages/artisan/ArtisanDashboard'
import ArtisanAdd from './pages/artisan/ArtisanAdd'
import MyProducts from './pages/artisan/MyProducts'
import Orders from './pages/artisan/Orders'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProductManagement from './pages/admin/ProductManagement'
import Reports from './pages/admin/Reports'
import ConsultantDashboard from './pages/consultant/ConsultantDashboard'
import Login from './pages/auth/Login'
import Navbar from './components/Navbar'
import { CartProvider } from './store/cart'
import { AuthProvider, useAuth } from './store/auth'
import Home from "./pages/Home";
import Register from "./pages/auth/Register";

function Protected({ children, roles }){
  const { user } = useAuth()
  if(!user) return <Navigate to="/login" replace />
  if(roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

export default function AppRouter(){
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/customer' element={<Protected roles={['customer']}><CustomerHome /></Protected>} />
          <Route path='/cart' element={<Protected roles={['customer']}><Cart /></Protected>} />
          <Route path='/checkout' element={<Protected roles={['customer']}><Checkout /></Protected>} />
          <Route path='/success' element={<Protected roles={['customer']}><OrderSuccess /></Protected>} />

          <Route path='/artisan' element={<Protected roles={['artisan']}><ArtisanDashboard /></Protected>} />
          <Route path='/artisan/add' element={<Protected roles={['artisan']}><ArtisanAdd /></Protected>} />
          <Route path='/artisan/products' element={<Protected roles={['artisan']}><MyProducts /></Protected>} />
          <Route path='/artisan/orders' element={<Protected roles={['artisan']}><Orders /></Protected>} />

          <Route path='/admin' element={<Protected roles={['admin']}><AdminDashboard /></Protected>} />
          <Route path='/admin/products' element={<Protected roles={['admin']}><ProductManagement /></Protected>} />
          <Route path='/admin/reports' element={<Protected roles={['admin']}><Reports /></Protected>} />

          <Route path='/consultant' element={<Protected roles={['consultant']}><ConsultantDashboard /></Protected>} />
          <Route path="/home" element={<Home />} />
<Route path="/register" element={<Register />} />

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}
