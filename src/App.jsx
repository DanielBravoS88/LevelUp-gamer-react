import React,{useEffect,useMemo,useState} from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Banner from './components/Banner.jsx'
import ProductGrid from './components/ProductGrid.jsx'
import Cart from './components/Cart.jsx'
import PurchaseSummary from './components/PurchaseSummary.jsx'
import RegisterModal from './components/RegisterModal.jsx'
import Reviews from './components/Reviews.jsx'
import Footer from './components/Footer.jsx'
import productsData from './data/products.json'
import CartDock from './components/CartDock.jsx'
import CheckoutModal from './components/CheckoutModal.jsx'

const chips=['Todos','PS5','Switch','Consolas','Accesorios']

function Home({state}){
  const {filter,setFilter,q,setQ,order,setOrder,add,items} = state
  return (<>
    <Header q={q} setQ={setQ} onOpenLogin={()=>state.setLoginOpen(true)} onOpenCart={()=>state.setCartOpen(true)} cartQty={state.totalQty}/>
    <Banner/>
    <main>
      <section className="container promos-row">
        <a className="promo" href="#"><div className="promo-title">Promo 1: Figuras / Anime</div><div className="promo-sub">Hasta -20% esta semana</div></a>
        <a className="promo" href="#"><div className="promo-title">Promo 2: Accesorios PS5</div><div className="promo-sub">Controles, headsets, carga</div></a>
      </section>
      <section className="container headline">
        <div className="headline-inner">
          <h2>Juegos PS5 y Nintendo Switch en Chile</h2>
          <p className="text">Entrega rápida, precios exclusivos y 100% originales. ¡Acumula puntos <b>LevelUp</b> por compras y referidos!</p>
          <div className="kpis" aria-label="Beneficios">
            <span>⭐ 4.8/5 reseñas</span><span>🚚 Envío a domicilio</span><span>🛡️ Garantía de autenticidad</span><span>🎮 Comunidad y guías</span>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="toolbar">
          <div className="filters">
            {chips.map(c => <span key={c} className={'chip'+(filter===c?' active':'')} onClick={()=>setFilter(c)}>{c}</span>)}
            <select value={order} onChange={e=>setOrder(e.target.value)}>
              <option value="popular">Ordenar por popularidad</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="name-asc">Nombre A–Z</option>
            </select>
          </div>
          <button className="btn neon" onClick={()=>alert('Suscripción registrada. Revisa tu correo para el cupón de -20%.')}>Suscríbete -20% OFF</button>
        </div>
  <ProductGrid items={items} onAdd={add}/>
  </div>
  <Reviews/>
  <section className="container section">
        <h3>Noticias y guías para gamers</h3>
        <div className="blog">
          <article className="post"><h4>¿Cómo elegir tu primer mando pro?</h4><p className="desc">Consejos prácticos para jugar shooters y carreras con mayor precisión.</p></article>
          <article className="post"><h4>PS5 vs. Switch: ¿qué te conviene?</h4><p className="desc">Comparamos catálogo, accesorios y ecosistema para ayudarte a decidir.</p></article>
          <article className="post"><h4>Guía: canjea tus puntos LevelUp</h4><p className="desc">Sube de nivel y consigue descuentos al referir amigos y completar retos.</p></article>
        </div>
      </section>
      <section className="container section">
        <h3>Mapa y eventos</h3>
        <div style={{border:'1px solid var(--muted)',borderRadius:12,overflow:'hidden'}}>
          <iframe className="map-mini" title="Mapa LevelUp" src="https://www.google.com/maps?q=Pedro%20Aguirre%20Cerda%205254%20Huechuraba&output=embed" width="100%" height="220" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
        </div>
      </section>
    </main>
    <Footer/>
    <Cart open={state.cartOpen} items={state.cart} changeQty={state.changeQty} removeItem={state.remove} total={state.total} onClose={()=>state.setCartOpen(false)}/>
    <RegisterModal open={state.loginOpen} onClose={()=>state.setLoginOpen(false)}/>
  </>)
}

export default function App(){
  const navigate = useNavigate()
  const [products,setProducts] = useState([])
  const [filter,setFilter] = useState('Todos')
  const [q,setQ] = useState('')
  const [order,setOrder] = useState('popular')
  const [cartOpen,setCartOpen] = useState(false)
  const [loginOpen,setLoginOpen] = useState(false)
  const [checkoutOpen,setCheckoutOpen] = useState(false)
  const [cart,setCart] = useState(()=>{ try { return JSON.parse(localStorage.getItem('cart')||'[]') } catch { return [] } })

  useEffect(()=>{ setProducts(Array.isArray(productsData)?productsData:[]) },[])

  useEffect(()=>{ localStorage.setItem('cart', JSON.stringify(cart)) },[cart])

  const items = useMemo(()=>{
    let arr=[...products]
    if(filter!=='Todos') arr = arr.filter(p=>p.category===filter)
    if(q){ const s=q.toLowerCase(); arr = arr.filter(p => (p.name+' '+(p.description||'')).toLowerCase().includes(s)) }
    if(order==='price-asc') arr.sort((a,b)=>a.price-b.price)
    if(order==='price-desc') arr.sort((a,b)=>b.price-a.price)
    if(order==='name-asc') arr.sort((a,b)=>a.name.localeCompare(b.name))
    return arr
  },[products,filter,q,order])

  const totalQty = useMemo(()=> cart.reduce((a,b)=>a+b.qty,0), [cart])
  const total = useMemo(()=> cart.reduce((s,i)=>s+i.price*i.qty,0), [cart])

  const add = (p) => setCart(c => { const f=c.find(i=>i.name===p.name); return f?c.map(i=>i.name===p.name?{...i,qty:i.qty+1}:i):[...c,{...p,qty:1}] })
  const buyNow = (p) => { add(p); setCheckoutOpen(true) }
  const changeQty = (name,d) => setCart(c => c.map(i => i.name===name?{...i,qty:Math.max(1,i.qty+d)}:i))
  const remove = (name) => setCart(c => c.filter(i => i.name !== name))
  const clearCart = () => setCart([])

  useEffect(()=>{
    const onKey = (e)=>{
      if(e.key==='Escape'){
        setCartOpen(false)
        setLoginOpen(false)
        setCheckoutOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return ()=>window.removeEventListener('keydown', onKey)
  },[])

  const state = { filter,setFilter,q,setQ,order,setOrder,add,items,buyNow,
                  cart,changeQty,remove,total,totalQty,
                  cartOpen,setCartOpen,loginOpen,setLoginOpen }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home state={state}/>} />
        <Route path="/resumen" element={<>
          <Header q={q} setQ={setQ} onOpenLogin={()=>setLoginOpen(true)} onOpenCart={()=>setCartOpen(true)} cartQty={totalQty}/>
          <PurchaseSummary cart={cart} clearCart={clearCart}/>
          <Footer/>
          <Cart open={cartOpen} items={cart} changeQty={changeQty} removeItem={remove} total={total} onClose={()=>setCartOpen(false)}/>
          <RegisterModal open={loginOpen} onClose={()=>setLoginOpen(false)}/>
        </>} />
      </Routes>
      <CartDock count={totalQty} onOpen={()=>setCartOpen(true)} />
      <CheckoutModal open={checkoutOpen} cart={cart} onPay={()=>{ alert('Pago realizado. ¡Gracias!'); setCheckoutOpen(false); clearCart(); navigate('/') }} onClose={()=>setCheckoutOpen(false)} />
    </>
  )
}
