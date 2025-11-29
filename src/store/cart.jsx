import React, { createContext, useState, useContext, useEffect } from 'react'
const CartContext = createContext()
export function useCart(){ return useContext(CartContext) }

export function CartProvider({children}){
  const [items,setItems] = useState([])

  useEffect(()=>{
    const raw = localStorage.getItem('cart_items')
    if(raw) setItems(JSON.parse(raw))
  },[])

  useEffect(()=>{
    localStorage.setItem('cart_items', JSON.stringify(items))
  },[items])

  function add(item){
    const found = items.find(i=>i.id===item.id)
    if(found){
      setItems(items.map(i=> i.id===item.id ? {...i, qty: i.qty+1} : i))
    } else {
      setItems([...items, {...item, qty:1}])
    }
  }
  function remove(id){ setItems(items.filter(i=>i.id!==id)) }
  function clear(){ setItems([]) }
  function updateQty(id,qty){ setItems(items.map(i=> i.id===id ? {...i, qty} : i)) }

  const total = items.reduce((s,i)=> s + i.price * i.qty, 0)
  return <CartContext.Provider value={{items,add,remove,clear,updateQty,total}}>{children}</CartContext.Provider>
}
