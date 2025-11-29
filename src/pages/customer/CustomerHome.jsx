import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'

export default function CustomerHome() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    const raw = localStorage.getItem('products')
    if (raw) {
      const list = JSON.parse(raw)
      setProducts(list)
      setFiltered(list)
    }
  }, [])

  // SEARCH HANDLER — filters in realtime
  function handleSearch(e) {
    const q = e.target.value.toLowerCase()
    setSearch(q)

    const results = products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    )

    setFiltered(results)
  }

  return (
    <div className="container">
      
      {/* TOP SECTION */}
      <div style={{ background: '#FFEEC7', padding: 20, borderRadius: 10 }}>
        <h2>Discover Authentic Tribal Handicrafts</h2>
        <p style={{ color: '#6b6b6b' }}>
          Explore unique handmade treasures crafted by indigenous artisans.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="card" style={{ marginTop: 18 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input
            placeholder="Search products, categories, artisans..."
            value={search}
            onChange={handleSearch}
            style={{
              flex: 1,
              padding: 10,
              borderRadius: 8,
              border: '1px solid #ddd'
            }}
          />

          <button className="btn btn-light">
            Search
          </button>
        </div>
      </div>

      {/* RESULTS */}
      <h3 className="section-title" style={{ marginTop: 20 }}>Handicrafts</h3>

      {filtered.length === 0 ? (
        <div style={{ padding: 20 }}>
          <h4>No results found</h4>
          <p>Try searching with another keyword.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filtered.map(p => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}

    </div>
  )
}
