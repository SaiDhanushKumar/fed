import React, { useState } from 'react'
import { useAuth } from '../../store/auth'

export default function ArtisanAdd(){
  const { user } = useAuth()
  const [title,setTitle] = useState('')
  const [category,setCategory] = useState('Pottery')
  const [price,setPrice] = useState('0')
  const [imgData,setImgData] = useState(null)
  const [desc,setDesc] = useState('')
  const [msg,setMsg] = useState('')

  function handleFile(e){
    const f = e.target.files[0]
    if(!f) return
    const reader = new FileReader()
    reader.onload = ()=> setImgData(reader.result)
    reader.readAsDataURL(f)
  }

  function saveProduct(){
    if(!title || !price || !imgData){ setMsg('Please fill title, price and image'); return }
    const products = JSON.parse(localStorage.getItem('products')||'[]')
    const id = 'p'+Date.now()
    const newP = { id, title, category, price: Number(price), img: imgData, desc, artisan: user ? user.name : 'Unknown' }
    products.unshift(newP)
    localStorage.setItem('products', JSON.stringify(products))
    setMsg('Product saved! It will appear for customers.')
    setTitle(''); setPrice('0'); setImgData(null); setDesc('')
  }

  return (
    <div className="container app-layout">
      <aside className="sidebar"><div style={{padding:16,fontWeight:700}}>Artisan</div></aside>
      <main className="content">
        <h2>Add New Product</h2>
        <p>Create a new product listing. Image is stored in localStorage (base64) for demo persistence.</p>
        <div className="card" style={{maxWidth:700}}>
          <div className="form-row">
            <input placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <select value={category} onChange={(e)=>setCategory(e.target.value)}>
              <option>Pottery</option><option>Textiles</option><option>Woodwork</option><option>Jewelry</option>
            </select>
          </div>
          <div className="form-row" style={{marginTop:8}}>
            <input placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)} />
            <input type="file" accept="image/*" onChange={handleFile} />
          </div>
          <div style={{marginTop:8}}>
            <textarea placeholder="Description" value={desc} onChange={(e)=>setDesc(e.target.value)} style={{width:'100%',minHeight:100}} />
          </div>
          {imgData && <div style={{marginTop:8}}><img src={imgData} style={{width:160,borderRadius:8}}/></div>}
          <div style={{marginTop:12,display:'flex',gap:8}}>
            <button className="btn btn-accent" onClick={saveProduct}>Save Product</button>
          </div>
          {msg && <div style={{marginTop:8,color:'#0a7'}}>{msg}</div>}
        </div>
      </main>
    </div>
  )
}
