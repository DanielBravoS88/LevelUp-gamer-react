import React,{useState} from 'react'
export default function RegisterModal({ open, onClose }){
  const [email,setEmail]=useState(()=>localStorage.getItem('user_email')||'')
  const [age,setAge]=useState(()=>localStorage.getItem('user_age')||'')
  const [msg,setMsg]=useState('')
  if(!open) return null
  const submit=(e)=>{
    e.preventDefault()
    const a=parseInt(age||'0',10)
    if(a<18){alert('Debes ser mayor de 18 años para registrarte.');return}
    localStorage.setItem('user_email',email)
    localStorage.setItem('user_age',String(a))
    const isDuoc=/@duoc\.cl$/.test((email||'').trim().toLowerCase())
    setMsg(isDuoc?'🎉 -20% de por vida por correo @duoc.cl':'Cuenta creada. ¡Bienvenid@!')
    setTimeout(onClose,800)
  }
  return (<div className="modal open" role="dialog" aria-modal="true" style={{position:'fixed',inset:0,background:'rgba(0,0,0,.6)',display:'flex',alignItems:'center',justifyContent:'center',padding:16,zIndex:80}}>
    <div className="box" style={{background:'#0b0b0b',border:'1px solid var(--muted)',borderRadius:16,maxWidth:520,width:'100%',padding:18}}>
      <h3 style={{marginTop:0}}>Crear cuenta</h3>
      <p className="desc">Solo para mayores de 18 años. Correos @duoc.cl obtienen <b>20% de por vida</b>.</p>
      <form className="grid-2" onSubmit={submit}>
        <input placeholder="Nombre" required/><input placeholder="Apellido" required/>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <input type="number" min="18" placeholder="Edad (18+)" value={age} onChange={e=>setAge(e.target.value)} required/>
        <input placeholder="Código de referido (opcional)"/><button className="btn primary" style={{gridColumn:'1/-1'}}>Registrarme</button>
      </form>
      <div className="desc" style={{marginTop:8,color:'var(--accent-2)'}}>{msg}</div>
      <div style={{textAlign:'right',marginTop:10}}><button className="btn" onClick={onClose}>Cerrar</button></div>
    </div>
  </div>)
}
