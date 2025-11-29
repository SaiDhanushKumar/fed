import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import img3 from '../assets/tribal-3.jpg'
import img4 from '../assets/tribal-4.jpg'
import img5 from '../assets/tribal-5.jpg'
import img6 from '../assets/tribal-6.jpg'
import img7 from '../assets/tribal-7.jpg'
import img8 from '../assets/tribal-8.jpg'
import img9 from '../assets/tribal-9.jpg'
import img10 from '../assets/tribal-10.jpg'
import img11 from '../assets/tribal-11.jpg'
import img12 from '../assets/tribal-12.jpg'

const DEMO = [
  { id:'p1', title:'Bamboo / Grass Basketry – Woven Vessel', category:'Basketry', price:89.99, img:img3 },
  { id:'p2', title:'Terracotta – Clay Engraving / Carving', category:'Terracotta', price:45.00, img:img4 },
  { id:'p3', title:'Tribal Handloom Weaving Cloth', category:'Textiles', price:30.00, img:img5 },
  { id:'p4', title:'Terracotta Clay Jewelry', category:'Jewelry', price:125.00, img:img6 },
  { id:'p5', title:'Painted Elephant Figurine (Wood/Stone)', category:'Sculpture', price:55.00, img:img7 },
  { id:'p6', title:'Sikki Grass / Madurkathi Handicraft Bag', category:'Handicrafts', price:40.00, img:img8 },
  { id:'p7', title:'Wooden Tribal Mask & Pithora Folk Painting', category:'Masks', price:25.00, img:img9 },
  { id:'p8', title:'Warli Painting', category:'Painting', price:65.00, img:img10 },
  { id:'p9', title:'Traditional Tribal Pottery', category:'Pottery', price:35.00, img:img11 },
  { id:'p10', title:'Tribal Mask Art – Clay & Papier-Mâché Mask', category:'Masks', price:20.00, img:img12 },
];


export default function Landing(){
  const [products,setProducts] = useState([])
  useEffect(()=>{
    const raw = localStorage.getItem('products')
    if(raw) setProducts(JSON.parse(raw))
    else {
      setProducts(DEMO)
      localStorage.setItem('products', JSON.stringify(DEMO))
    }
  },[])

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-left">
          <h1>Discover <span style={{color:'var(--accent)'}}>Authentic</span><br/>Tribal Handicrafts</h1>
          <p>Support traditional artisans and preserve cultural heritage through beautiful, handcrafted items that tell stories of generations.</p>
          <div style={{marginTop:18}}>
            <a href="/login"><button className="btn btn-accent">Get Started (Login)</button></a>
          </div>
          <div className="stats" style={{marginTop:28}}>
            <div className="stat"><h3>500+</h3><p>Artisans</p></div>
            <div className="stat"><h3>2000+</h3><p>Products</p></div>
            <div className="stat"><h3>50+</h3><p>Communities</p></div>
          </div>
        </div>

        <div style={{width:'48%'}}>
          <div className="img-grid" style={{marginBottom:12}}>
            <img src={img3} style={{width:'100%',borderRadius:10}}/>
            <img src={img4} style={{width:'100%',borderRadius:10}}/>
            <img src={img5} style={{width:'100%',borderRadius:10}}/>
            <img src={img6} style={{width:'100%',borderRadius:10}}/>
          </div>
          <div className="gallery">
            {[img7,img8,img9,img10,img11,img12].map((s,i)=> <img key={i} src={s} />)}
          </div>
        </div>
      </section>

      <section style={{marginTop:30}}>
        <h3 className="section-title">Featured Handicrafts</h3>
        <div className="products-grid">
          {products.slice(0,6).map(p=> <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  )
}
