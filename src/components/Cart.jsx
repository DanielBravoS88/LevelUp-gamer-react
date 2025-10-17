import React from 'react'
import { Link } from 'react-router-dom'
const CLP = new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0})
const money = n => CLP.format(n||0)
export default function Cart({ open, items, changeQty, removeItem, total, onClose, onCheckout }){
  return (<aside className={'cart-panel'+(open?' open':'')} id="cartPanel" aria-hidden={!open}>
    <header className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <strong>Tu carrito</strong><button className="btn" onClick={onClose}>Cerrar</button>
    </header>
    <div className="cart-items">
      {items.map(i => (<div className="cart-item" key={i.name}>
        <img src={i.image.startsWith('/')?i.image:('/'+i.image)} alt={i.name} />
        <div><div style={{fontWeight:700}}>{i.name}</div>
          <div style={{color:'var(--text-2)'}}>
            {money(i.price)} · <button className="btn" onClick={()=>changeQty(i.name,-1)}>-</button>{i.qty}<button className="btn" onClick={()=>changeQty(i.name,1)}>+</button>
          </div>
        </div>
        <button className="btn" onClick={()=>removeItem(i.name)}>Quitar</button>
      </div>))}
    </div>
    <div className="cart-footer">
      <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10}}>
        <div><small>Total</small><div id="cartTotal" style={{fontSize:20,fontWeight:800,color:'var(--accent-2)'}}>{money(total)}</div></div>
        {onCheckout
          ? <button className="btn primary" onClick={()=>{ onClose?.(); onCheckout?.() }}>Pagar</button>
          : <Link to="/resumen" className="btn primary" onClick={onClose}>Pagar</Link>}
      </div>
    </div>
  </aside>)
}
