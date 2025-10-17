import React, { useEffect, useMemo } from 'react'

const CLP = new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0})
const money = n => CLP.format(n||0)

export default function CheckoutModal({ open, cart=[], onPay, onClose }){
  const email = useMemo(()=> (localStorage.getItem('user_email')||'').trim().toLowerCase(),[])
  const isDuoc = useMemo(()=>/@duoc\.cl$/.test(email),[email])
  const subtotal = useMemo(()=>cart.reduce((s,i)=>s+i.price*i.qty,0),[cart])
  const descuento = useMemo(()=>isDuoc?Math.round(subtotal*0.2):0,[subtotal,isDuoc])
  const total = useMemo(()=>subtotal-descuento,[subtotal,descuento])

  useEffect(()=>{
    const onKey=(e)=>{ if(e.key==='Escape' && open){ onClose?.() } }
    window.addEventListener('keydown', onKey)
    return ()=>window.removeEventListener('keydown', onKey)
  },[open,onClose])

  if(!open) return null
  return (
    <div className="modal open" role="dialog" aria-modal="true" style={{zIndex:100}}>
      <div className="box" style={{maxWidth:600,background:'linear-gradient(135deg,#181c2f 0%,#232a4d 100%)',color:'#fff',borderRadius:18,boxShadow:'0 8px 32px #0004'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}}>
          <div style={{background:'#fff',borderRadius:'50%',width:60,height:60,display:'flex',alignItems:'center',justifyContent:'center',marginRight:12}}>
            <span style={{fontFamily:'Orbitron',fontSize:'2rem',color:'#232a4d',fontWeight:700}}>LU</span>
          </div>
          <div>
            <h3 style={{margin:0,fontFamily:'Orbitron',fontSize:'1.5rem',color:'#fff'}}>LevelUp Gamer</h3>
            <div style={{fontSize:13,color:'#b3b8d6'}}>Pedro Aguirre Cerda 5254, Huechuraba</div>
          </div>
        </div>
        <div style={{fontSize:13,color:'#b3b8d6',marginBottom:12,textAlign:'center'}}>
          Fecha: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}<br/>
          Nº Boleta: <b style={{color:'#ffd700'}}>{Math.floor(Math.random()*900000+100000)}</b>
        </div>
        <table style={{width:'100%',borderCollapse:'collapse',marginBottom:16,fontSize:15,background:'#232a4d',borderRadius:12,overflow:'hidden'}}>
          <thead>
            <tr style={{background:'#232a4d',color:'#ffd700'}}>
              <th style={{textAlign:'left',padding:8}}>Producto</th>
              <th style={{textAlign:'center',padding:8}}>Cantidad</th>
              <th style={{textAlign:'right',padding:8}}>Precio unitario</th>
              <th style={{textAlign:'right',padding:8}}>Subtotal</th>
              <th style={{textAlign:'right',padding:8}}>Descuento</th>
              <th style={{textAlign:'right',padding:8}}>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item)=>{
              const subtotalIt = item.price*item.qty
              const descIt = isDuoc? Math.round(subtotalIt*0.2):0
              const totalIt = subtotalIt - descIt
              return (
                <tr key={item.name}>
                  <td style={{padding:8}}>
                    <div style={{fontWeight:600}}>{item.name}</div>
                    <div style={{fontSize:12,color:'#b3b8d6'}}>{item.description||''}</div>
                  </td>
                  <td style={{textAlign:'center'}}>{item.qty}</td>
                  <td style={{textAlign:'right'}}>{money(item.price)}</td>
                  <td style={{textAlign:'right'}}>{money(subtotalIt)}</td>
                  <td style={{textAlign:'right'}}>{descIt? ('-'+money(descIt)) : '—'}</td>
                  <td style={{textAlign:'right',fontWeight:700}}>{money(totalIt)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div style={{display:'flex',justifyContent:'space-between',gap:16,marginBottom:10}}>
          <div>
            <div style={{color:'#b3b8d6'}}>Total sin descuento:</div>
            <div style={{fontWeight:700}}>{money(subtotal)}</div>
          </div>
          <div>
            <div style={{color:'#b3b8d6'}}>Descuento aplicado:</div>
            <div style={{fontWeight:700,color:'#ffd700'}}>{descuento?('-'+money(descuento)):'$0'}</div>
          </div>
          <div>
            <div style={{color:'#b3b8d6'}}>Total a pagar:</div>
            <div style={{fontWeight:700,fontSize:18,color:'#ffd700'}}>{money(total)}</div>
          </div>
        </div>
        <div style={{display:'flex',justifyContent:'flex-end',gap:10}}>
          <button className="btn primary" onClick={onPay}>Pagar</button>
          <button className="btn" style={{background:'#ffd700',color:'#232a4d',fontWeight:700}} onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  )
}
