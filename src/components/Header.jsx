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
          <a href="#" onClick={(e)=>{e.preventDefault(); onOpenLogin()}}>Regístrate</a>
          <span aria-hidden="true">·</span>
          <a href="#" onClick={(e)=>e.preventDefault()}>Mi cuenta</a>
        </nav>
      </div>
    </div>
    <div className="container topbar">
      <div className="brand"><div className="logo">LU</div><h1>LevelUp Gamer</h1></div>
      <div className="spacer" />
      <div className="actions">
        <button className="btn" id="btnLogin" onClick={onOpenLogin}>Iniciar sesión</button>
        <button className="btn primary cart-button" id="btnCart" onClick={onOpenCart}>
          Carrito <span className="badge" id="cartCount">{cartQty}</span>
        </button>
      </div>
    </div>
  </header>)
}
