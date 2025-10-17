import React, { useEffect, useMemo, useRef, useState } from 'react'

export default function Banner(){
  // Slides del carrusel (puedes ajustar src y posición de foco)
  const slidesData = useMemo(() => ([
    { src:'/img/banner_ps5_cod_wwii.webp', pos:'left center',  alt:'Call of Duty WWII' },
    { src:'/img/banner_ps5_fc24.jpg',      pos:'center center',alt:'EA Sports FC 24' },
    // Move focus slightly upward on UFC to show more of the fighter's face
    { src:'/img/banner_ps5_ufc5.jpg',      pos:'right 20%',    alt:'UFC 5' },
  ]), [])

  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)
  const reduceMotion = useMemo(() => (
    typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ), [])

  const go = (n, manual=false) => {
    setIndex(prev => {
      const len = slidesData.length
      const next = ((typeof n === 'number' ? n : prev + 1) + len) % len
      return next
    })
    if (manual) restart()
  }
  const next = () => go(index + 1)
  const prev = () => go(index - 1, true)

  const start = () => {
    if (reduceMotion) return
    stop()
    timerRef.current = setInterval(() => {
      setIndex(i => (i + 1) % slidesData.length)
    }, 3500)
  }
  const stop = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }
  const restart = () => { stop(); start() }

  useEffect(() => {
    start()
    const onVis = () => document.hidden ? stop() : start()
    document.addEventListener('visibilitychange', onVis)
    return () => { stop(); document.removeEventListener('visibilitychange', onVis) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Gestos touch
  const x0 = useRef(null)
  const onTouchStart = (e) => { x0.current = e.touches[0].clientX }
  const onTouchEnd = (e) => {
    if (x0.current == null) return
    const dx = e.changedTouches[0].clientX - x0.current
    if (Math.abs(dx) > 40) { if (dx > 0) prev(); else go(index + 1, true) }
    x0.current = null
  }

  return (
    <section className="billboard" id="billboard" onMouseEnter={stop} onMouseLeave={start} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} tabIndex={0}>
      {/* CTA superpuesta */}
      <div className="bb-cta">
        <div className="bb-cta-tag">Novedad</div>
        <h3 className="bb-cta-title">EA SPORTS FC — ¡YA DISPONIBLE!</h3>
        <a className="btn neon bb-cta-btn" href="#">Ver ofertas</a>
      </div>

      {/* Slides */}
      {slidesData.map((s, i) => (
        <div key={s.src} className={"slide" + (i === index ? ' active' : '')}>
          <img src={s.src} alt={s.alt} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:s.pos||'center center'}} />
        </div>
      ))}

      {/* Controles */}
      <button className="bb-nav prev" aria-label="Anterior" onClick={prev}>&lt;</button>
      <button className="bb-nav next" aria-label="Siguiente" onClick={() => go(index + 1, true)}>&gt;</button>
      <div className="bb-dots" id="bbDots">
        {slidesData.map((_, i) => (
          <button key={i} className={i===index? 'active' : ''} aria-label={`Ir al banner ${i+1}`} onClick={() => go(i, true)} />
        ))}
      </div>
    </section>
  )
}
