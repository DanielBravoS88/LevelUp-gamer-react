import React from 'react'

export default function CartDock({ count=0, onOpen }){
  return (
    <div className="cart-dock">
      <button className="btn primary cart-button" id="dockCart" onClick={onOpen}>
        Carrito <span className="badge" id="dockCount">{count}</span>
      </button>
    </div>
  )
}
