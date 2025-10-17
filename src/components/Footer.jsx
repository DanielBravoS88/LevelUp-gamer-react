import React from 'react'
export default function Footer(){
  return (<footer className="lp-footer">
    <div className="lp-footer__container">
      <div className="lp-footer__col lp-footer__brand"><h3 className="lp-footer__title">LevelUp <span>Gamer</span></h3></div>
      <div className="lp-footer__col"><h4 className="lp-footer__heading">Horario de atención tienda web</h4>
        <ul className="lp-footer__list"><li>Lunes a Viernes</li><li>De 08:00 AM a 17:30</li><li>Email: <a href="mailto:soporte@levelup.cl">soporte@levelup.cl</a></li></ul>
      </div>
      <div className="lp-footer__col"><h4 className="lp-footer__heading">Corporativo</h4>
        <ul className="lp-footer__links">
          <li><a href="#">Nuestras Tiendas</a></li><li><a href="#">Derechos del consumidor</a></li><li><a href="#">Preguntas Frecuentes</a></li>
          <li><a href="#">¿Quieres trabajar en LevelUp?</a></li><li><a href="#">Garantías</a></li><li><a href="#">Cambios y Devoluciones</a></li>
          <li><a href="#">Política de cookies</a></li><li><a href="#">Acerca de Nosotros</a></li>
        </ul>
      </div>
      <div className="lp-footer__col"><h4 className="lp-footer__heading">Mi cuenta</h4>
        <ul className="lp-footer__links"><li><a href="#">Historial de pedidos</a></li><li><a href="#">Favoritos</a></li><li><a href="#">Mi cuenta</a></li><li><a href="#">Mis direcciones</a></li></ul>
        <img src="/img/pagos_tarjetas.png" alt="Tarjetas de crédito y débito aceptadas" className="lp-footer__payments" />
      </div>
    </div>
    <div className="lp-footer__copy">© {new Date().getFullYear()} LevelUp Gamer · Todos los derechos reservados.</div>
  </footer>)
}
