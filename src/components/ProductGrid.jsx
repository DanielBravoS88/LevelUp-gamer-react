import React from 'react'
import { Link } from 'react-router-dom'
import { slugify } from '../utils/slug'
const CLP = new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0})
const money = n => CLP.format(n||0)
export default function ProductGrid({ items=[], onAdd }){
  return (<div className="grid" aria-live="polite">
    {items.map(p => (<article className="card" key={p.name}>
      <Link className="media" to={`/producto/${slugify(p.name)}`}><span className="tag">{p.category}</span>
        <img src={p.image.startsWith('/')?p.image:('/'+p.image)} alt={p.name} loading="lazy" />
      </Link>
      <div className="body">
        <h3 className="title"><Link to={`/producto/${slugify(p.name)}`} style={{color:'inherit'}}>{p.name}</Link></h3>
        <div className="price">{money(p.price)}</div>
        <p className="desc">{(p.description||'').slice(0,120)}...</p>
        <div className="row">
          <button className="btn primary" onClick={()=>onAdd(p)}>Agregar</button>
        </div>
      </div>
    </article>))}
  </div>)
}
