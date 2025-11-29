import React, { useEffect, useState } from 'react';

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const raw = localStorage.getItem("products");
    if (raw) setProducts(JSON.parse(raw));
  }, []);

  function startEdit(p) {
    setEditingId(p.id);
    setEditData({ ...p });
  }

  function cancelEdit() {
    setEditingId(null);
    setEditData({});
  }

  function saveEdit() {
    const updated = products.map((p) =>
      p.id === editingId ? editData : p
    );
    localStorage.setItem("products", JSON.stringify(updated));
    setProducts(updated);
    cancelEdit();
  }

  function handleImage(e) {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () =>
      setEditData({ ...editData, img: reader.result });
    reader.readAsDataURL(f);
  }

  return (
    <div className="container">
      <h2>My Products</h2>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
        {products.map((p) => (
          <div key={p.id} className="card">
            {editingId === p.id ? (
              <>
                {/* Editable fields */}
                <input
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  style={{width: "100%", marginBottom: 8}}
                  placeholder="Product title"
                />

                <input
                  value={editData.price}
                  onChange={(e) =>
                    setEditData({ ...editData, price: e.target.value })
                  }
                  style={{width: "100%", marginBottom: 8}}
                  placeholder="Price"
                />

                <select
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({ ...editData, category: e.target.value })
                  }
                  style={{width: "100%", marginBottom: 8}}
                >
                  <option>Pottery</option>
                  <option>Textiles</option>
                  <option>Woodwork</option>
                  <option>Jewelry</option>
                </select>

                <textarea
                  value={editData.desc}
                  onChange={(e) =>
                    setEditData({ ...editData, desc: e.target.value })
                  }
                  style={{width: "100%", minHeight: 80}}
                  placeholder="Description"
                />

                {/* Image preview & upload */}
                {editData.img && (
                  <img
                    src={editData.img}
                    style={{width:"100%",borderRadius:6,marginTop:6}}
                  />
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  style={{marginTop:8}}
                />

                <div style={{marginTop:10,display:'flex',gap:8}}>
                  <button className="btn btn-accent" onClick={saveEdit}>
                    Save
                  </button>
                  <button className="btn btn-light" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <img
                  src={p.img}
                  style={{
                    width:"100%",
                    height:120,
                    objectFit:"cover",
                    borderRadius:8,
                  }}
                />
                <div style={{padding:8}}>
                  <div style={{fontWeight:700}}>{p.title}</div>
                  <div style={{color:"#6b6b6b"}}>
                    ${Number(p.price).toFixed(2)}
                  </div>
                  <div><small>{p.category}</small></div>

                  <button
                    className="btn btn-light"
                    style={{marginTop:8}}
                    onClick={() => startEdit(p)}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
