import React,{useEffect,useMemo,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import API_URL from '../config/api'

const CLP = new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0})
const money = n => CLP.format(n||0)

export default function PurchaseSummary({ cart=[], clearCart }){
  const navigate = useNavigate()
  const { user } = useAuth()
  const [email,setEmail]=useState(()=>localStorage.getItem('user_email')||'')
  const [age,setAge]=useState(()=>parseInt(localStorage.getItem('user_age')||'0',10)||'')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const isDuoc = useMemo(()=>/@duoc\.cl$/.test((email||'').trim().toLowerCase()),[email])
  const subtotal = useMemo(()=>cart.reduce((s,i)=>s+i.price*i.qty,0),[cart])
  const descuento = useMemo(()=>isDuoc?Math.round(subtotal*0.2):0,[subtotal,isDuoc])
  const total = useMemo(()=>subtotal-descuento,[subtotal,descuento])
  const [showReceipt,setShowReceipt]=useState(false)
  const [ordenId, setOrdenId] = useState(null)
  
  const onConfirm = async () => {
    if(!cart.length){alert('Tu carrito está vacío.');return}
    if((age||0)<18){alert('Debes ser mayor de 18 años.');return}
    
    // Verificar que el usuario esté autenticado
    console.log('Usuario actual:', user); // Debug
    
    if (!user || !user.token) {
      alert('Debes iniciar sesión para realizar una compra.');
      navigate('/signin');
      return;
    }

    console.log('Token del usuario:', user.token); // Debug

    setLoading(true);
    setError('');

    try {
      // Preparar datos de la orden
      const orderData = {
        productos: cart.map(item => {
          const producto = {
            nombre: item.name,
            cantidad: item.qty,
            precio: item.price,
            imagen: item.image
          };
          
          // Solo incluir el ID si existe (evita enviar null a MongoDB)
          if (item._id) {
            producto.producto = item._id;
          }
          
          return producto;
        }),
        direccionEnvio: {
          calle: 'Pendiente de confirmación',
          ciudad: 'Santiago',
          region: 'Región Metropolitana',
          codigoPostal: '0000000'
        },
        metodoPago: 'Transferencia', // Cambiado de 'Pendiente' a un valor válido
        precioProductos: subtotal,
        precioEnvio: 0,
        precioTotal: total
      };

      console.log('Enviando orden:', orderData); // Para debug

      // Enviar orden al backend
      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      console.log('Respuesta del servidor:', data); // Para debug

      if (data.success) {
        setOrdenId(data.data._id);
        setShowReceipt(true);
      } else {
        const errorMsg = data.message || 'Error al crear la orden';
        setError(errorMsg);
        console.error('Error del servidor:', data);
        alert('Error: ' + errorMsg + '\n\nDetalles: ' + (data.error || 'Sin detalles adicionales'));
      }
    } catch (err) {
      console.error('Error completo:', err);
      const errorMsg = err.message || 'Error de conexión con el servidor';
      setError(errorMsg);
      alert('Error de conexión:\n' + errorMsg + '\n\nVerifica que el backend esté disponible.');
    } finally {
      setLoading(false);
    }
  }
  const closeReceipt=()=>{
    setShowReceipt(false)
    clearCart()
    navigate('/')
  }
  useEffect(()=>{
    const onKey=(e)=>{ if(e.key==='Escape' && showReceipt){ closeReceipt() } }
    window.addEventListener('keydown', onKey)
    return ()=>window.removeEventListener('keydown', onKey)
  },[showReceipt])
  return (<div className="container" style={{padding:'24px 0 60px'}}>
    <h2>Resumen de compra</h2>
    <p className="desc">Revisa los productos y confirma tu pedido. {isDuoc && 'Descuento DUOC aplicado (-20%).'}</p>
    <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:16}}>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {cart.map(i=>(<div key={i.name} className="cart-item" style={{gridTemplateColumns:'80px 1fr auto',background:'#121212',border:'1px solid #242424'}}>
          <img src={i.image.startsWith('/')?i.image:('/'+i.image)} alt={i.name} style={{width:80,height:80}}/>
          <div><div style={{fontWeight:700}}>{i.name}</div><div style={{color:'var(--text-2)'}}>{money(i.price)} x {i.qty}</div></div>
          <div style={{fontWeight:700}}>{money(i.price*i.qty)}</div>
        </div>))}
        {!cart.length && <div className="desc">No hay productos en el carrito.</div>}
        <Link to="/" className="btn primary" style={{alignSelf:'start'}}>Seguir comprando</Link>
      </div>
      <aside style={{background:'#121212',border:'1px solid #242424',padding:16,borderRadius:12}}>
        <h3>Boleta</h3>
        <div className="desc">Ingresa tu email y edad para validar condiciones.</div>
        <div style={{display:'grid',gap:8,marginTop:8}}>
          <input placeholder="Email" value={email} onChange={e=>{setEmail(e.target.value);localStorage.setItem('user_email',e.target.value)}}/>
          <input placeholder="Edad (18+)" type="number" min="18" value={age} onChange={e=>{setAge(e.target.value);localStorage.setItem('user_age',e.target.value)}}/>
        </div>
        <div style={{borderTop:'1px solid var(--muted)',marginTop:12,paddingTop:12,display:'grid',gap:6}}>
          <div style={{display:'flex',justifyContent:'space-between'}}><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
          <div style={{display:'flex',justifyContent:'space-between'}}><span>Descuento {isDuoc?'DUOC (-20%)':'—'}</span><strong>{isDuoc?('-'+money(descuento)):'$0'}</strong></div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:18}}><span>Total</span><strong style={{fontSize:20}}>{money(total)}</strong></div>
        </div>
        <button 
          className="btn primary" 
          style={{width:'100%',marginTop:12}} 
          onClick={onConfirm} 
          disabled={!cart.length || loading}
        >
          {loading ? 'Procesando...' : 'Confirmar compra'}
        </button>
        {error && <div style={{color:'#ff4444',marginTop:8,fontSize:13}}>{error}</div>}
      </aside>
    </div>
    {showReceipt && (
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
            Nº Orden: <b style={{color:'#ffd700'}}>{ordenId ? ordenId.slice(-8).toUpperCase() : 'ORD-' + Math.floor(Math.random()*900000+100000)}</b>
          </div>
          <div style={{background:'#2ecc71',color:'#fff',padding:12,borderRadius:8,marginBottom:16,textAlign:'center',fontWeight:600}}>
            ✅ ¡Orden creada exitosamente en la base de datos!
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
          <div style={{display:'flex',justifyContent:'flex-end',gap:32,marginBottom:10}}>
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
          <div style={{textAlign:'right'}}>
            <button className="btn primary" style={{background:'#ffd700',color:'#232a4d',fontWeight:700}} onClick={closeReceipt}>Cerrar</button>
          </div>
        </div>
      </div>
    )}
  </div>)
}
