import React,{useEffect,useMemo,useState} from 'react'
import { useAuth } from '../auth/AuthContext'

const defaultSeed = [
  {id:1, name:'Felipe Retamal', text:'Funciona perfecto. Primera compra y repetiré ✨', score:5},
  {id:2, name:'Ronaldo Soto', text:'Confiables y rápidos. Feliz con la compra 🙌', score:5},
  {id:3, name:'Dgo', text:'Tercera vez comprando y plus todos los meses 💯', score:5},
]

export default function Reviews(){
  const { isAdmin } = useAuth()
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
      
      <div className="reviews">
        {items.map(r=>(
          <div className="review" key={r.id}>
            <div className="review-header">
              <strong className="review-name">{r.name}</strong>
              <div className="review-stars"><Stars value={r.score||5}/></div>
            </div>
            <p className="review-text">{r.text}</p>
            {isAdmin && (
              <div className="review-actions">
                <button className="btn btn-edit" onClick={()=>startEdit(r.id)}>Editar</button>
                <button className="btn btn-delete" onClick={()=>del(r.id)}>Eliminar</button>
              </div>
            )}
          </div>
        ))}
        {!items.length && <div className="desc">Aún no hay reseñas. ¡Escribe la primera! ✨</div>}
      </div>

      <div className="review-form-section">
        <h4>Déjanos tu comentario</h4>
        <p className="form-subtitle">Comparte tu experiencia con otros gamers</p>
        <form onSubmit={editing?saveEdit:add} className="review-form">
          <div className="form-row">
            <div className="input-group">
              <label>Tu nombre</label>
              <input 
                placeholder="Escribe tu nombre" 
                value={name} 
                onChange={e=>setName(e.target.value)} 
                required
              />
            </div>
            <div className="input-group rating-group">
              <label>Tu calificación</label>
              <Stars value={score} editable onPick={setScore}/>
            </div>
          </div>
          <div className="input-group">
            <label>Tu reseña</label>
            <textarea 
              placeholder="Cuéntanos qué te pareció tu experiencia..." 
              value={text} 
              onChange={e=>setText(e.target.value)} 
              required
              rows="3"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn primary">
              {editing ? 'Actualizar reseña' : 'Publicar reseña'}
            </button>
            {editing && (
              <button type="button" className="btn secondary" onClick={cancelEdit}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
