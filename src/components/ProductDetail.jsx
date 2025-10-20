import React, { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { slugify } from '../utils/slug'

const CLP = new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0})
const money = n => CLP.format(n||0)

export default function ProductDetail({ products = [], onAdd }){
  const { slug } = useParams()
  const product = useMemo(() => {
    return products.find(p => slugify(p.name) === slug)
  }, [products, slug])

  if (!product) {
    return (
      <div className="container" style={{padding:'20px 0'}}>
        <p>Producto no encontrado.</p>
        <Link to="/" className="btn">Volver</Link>
      </div>
    )
  }

  return (
    <div className="container" style={{padding:'20px 0'}}>
      <nav style={{marginBottom:12}}>
        <Link to="/" className="btn">← Volver</Link>
      </nav>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,maxWidth:1000,margin:'0 auto'}}>
        <div style={{background:'#0a0a0a',border:'1px solid var(--muted)',borderRadius:12,padding:8,display:'grid',placeItems:'center'}}>
          <img src={product.image} alt={product.name} style={{width:'100%',maxHeight:420,objectFit:'contain',background:'#111',borderRadius:12}} />
        </div>
        <div style={{background:'var(--card)',border:'1px solid var(--muted)',borderRadius:12,padding:16}}>
          <span className="chip" style={{marginBottom:8}}>{product.category}</span>
          <h2 style={{margin:'6px 0 10px'}}>{product.name}</h2>
          <div className="price" style={{fontSize:24}}>{money(product.price)}</div>
          <p style={{color:'var(--text-2)'}}>{product.description}</p>
          <div style={{display:'flex',gap:8,marginTop:16}}>
            <button className="btn primary" onClick={() => onAdd(product)}>Agregar al carrito</button>
            <Link className="btn" to="/">Seguir comprando</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
