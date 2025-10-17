import React,{useEffect,useMemo,useState} from 'react'

const defaultSeed = [
  {id:1, name:'Felipe Retamal', text:'Funciona perfecto. Primera compra y repetiré ✨', score:5},
  {id:2, name:'Ronaldo Soto', text:'Confiables y rápidos. Feliz con la compra 🙌', score:5},
  {id:3, name:'Dgo', text:'Tercera vez comprando y plus todos los meses 💯', score:5},
]

export default function Reviews(){
  const [items,setItems]=useState(()=>{
    try{
      const saved = JSON.parse(localStorage.getItem('reviews')||'[]')
      return Array.isArray(saved) && saved.length ? saved : defaultSeed
    }catch{return defaultSeed}
  })
  const [name,setName]=useState('')
  const [text,setText]=useState('')
  const [score,setScore]=useState(5)
  const [editing,setEditing]=useState(null)

  useEffect(()=>{localStorage.setItem('reviews',JSON.stringify(items))},[items])

  const stars = useMemo(()=>[1,2,3,4,5],[])
  const Stars = ({value,editable=false,onPick}) => (
    <span className="stars" aria-label={`Puntuación ${value}/5`}>
      {stars.map(i => (
        <span key={i} role={editable? 'button':'img'} aria-label={editable?`Elegir ${i} estrellas`:undefined}
          onClick={editable?()=>onPick?.(i):undefined}
          style={{cursor:editable?'pointer':'default',color:i<=value?'gold':'#888',fontSize:18,marginRight:2}}>
          ★
        </span>
      ))}
    </span>
  )

  const resetForm = ()=>{ setName(''); setText(''); setScore(5); setEditing(null) }
  const add=(e)=>{ e.preventDefault(); if(!name.trim()||!text.trim())return; setItems([...items,{id:Date.now(),name:name.trim(),text:text.trim(),score}]); resetForm() }
  const startEdit=(id)=>{ const r=items.find(i=>i.id===id); if(r){ setEditing(id); setName(r.name); setText(r.text); setScore(r.score||5) } }
  const saveEdit=(e)=>{ e.preventDefault(); setItems(items.map(i=>i.id===editing?{...i,name,text,score}:i)); resetForm() }
  const cancelEdit=()=>resetForm()
  const del=(id)=>setItems(items.filter(i=>i.id!==id))

  return (
    <section className="container section">
      <h3>Lo que dicen nuestros clientes</h3>
      <form onSubmit={editing?saveEdit:add} style={{display:'grid',gridTemplateColumns:'1fr 2fr auto',gap:8,marginBottom:12}}>
        <input placeholder="Tu nombre" value={name} onChange={e=>setName(e.target.value)} required/>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <input placeholder="Tu reseña" value={text} onChange={e=>setText(e.target.value)} style={{flex:1}} required/>
          <Stars value={score} editable onPick={setScore}/>
        </div>
        <button className="btn primary">{editing?'Guardar':'Añadir'}</button>
        {editing && <button type="button" className="btn" onClick={cancelEdit}>Cancelar</button>}
      </form>
      <div className="reviews">
        {items.map(r=>(
          <div className="review" key={r.id}>
            <strong>{r.name}</strong>
            <div><Stars value={r.score||5}/></div>
            <p className="desc">{r.text}</p>
            <div style={{display:'flex',gap:8}}>
              <button className="btn" onClick={()=>startEdit(r.id)}>Editar</button>
              <button className="btn" onClick={()=>del(r.id)}>Eliminar</button>
            </div>
          </div>
        ))}
        {!items.length && <div className="desc">Aún no hay reseñas. ¡Escribe la primera! ✨</div>}
      </div>
    </section>
  )
}
