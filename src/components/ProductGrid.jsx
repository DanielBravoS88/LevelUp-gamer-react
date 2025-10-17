import React from 'react'
const CLP = new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0})
const money = n => CLP.format(n||0)
export default function ProductGrid({ items=[], onAdd }){
  return (<div className="grid" aria-live="polite">
    {items.map(p => (<article className="card" key={p.name}>
      <div className="media"><span className="tag">{p.category}</span>
  <img src={p.image.startsWith('/')?p.image:('/'+p.image)} alt={p.name} loading="lazy" />
      </div>
      <div className="body">
        <h3 className="title">{p.name}</h3>
        <div className="price">{money(p.price)}</div>
        <p className="desc">{(p.description||'').slice(0,120)}...</p>
        <div className="row">
          <button className="btn primary" onClick={()=>onAdd(p)}>Agregar</button>
        </div>
      </div>
    </article>))}
  </div>)
}
