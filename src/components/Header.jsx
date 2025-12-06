import React from 'react'
export default function Header({ q, setQ, onOpenLogin, onOpenCart, cartQty=0 }){
  return (<header>
    <div className="noticebar">
      <div className="container nb-inner">
        <a className="nb-link" href="#">Revisa nuestros tiempos de entrega</a>
        <div className="search" role="search">
          <input id="q" value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar juegos, consolas, accesorios…" />
          <button id="btnSearch" onClick={()=>{ /* ya reactivo por input, aquí solo forzamos estado */ setQ(q) }}>Buscar</button>
        </div>
        <nav className="nb-quick">
          <a href="#" onClick={(e)=>e.preventDefault()}>Nuestras tiendas</a>
          <span aria-hidden="true">·</span>
          <a href="#" onClick={(e)=>e.preventDefault()}>Mi cuenta</a>
        </nav>
      </div>
    </div>
    <div className="container topbar">
      <div className="spacer" />
      <div className="actions">
        <button className="btn primary cart-button" id="btnCart" onClick={onOpenCart}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="badge" id="cartCount">{cartQty}</span>
        </button>
      </div>
    </div>
  </header>)
}
