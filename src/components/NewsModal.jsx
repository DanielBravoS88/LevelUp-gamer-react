import React from 'react';

export default function NewsModal({ open, onClose, article }) {
  if (!open || !article) return null;

  const articles = {
    'mando-pro': {
      title: '¿Cómo elegir tu primer mando pro?',
      emoji: '🎮',
      content: [
        {
          subtitle: '¿Por qué un mando pro?',
          text: 'Los mandos profesionales ofrecen ventajas competitivas: respuesta más rápida, mayor precisión y botones personalizables que pueden marcar la diferencia entre ganar y perder.'
        },
        {
          subtitle: '🎯 Características clave a considerar:',
          list: [
            '<strong>Gatillos adaptables</strong>: Reducen el tiempo de reacción en shooters',
            '<strong>Palancas intercambiables</strong>: Para ajustar la sensibilidad según el juego',
            '<strong>Botones traseros programables</strong>: Ejecuta acciones sin soltar los sticks',
            '<strong>Peso y ergonomía</strong>: Debe sentirse cómodo en sesiones largas',
            '<strong>Batería de larga duración</strong>: Mínimo 12 horas de juego continuo'
          ]
        },
        {
          subtitle: '🏆 Recomendaciones por tipo de juego:',
          list: [
            '<strong>Shooters (COD, Apex)</strong>: Prioriza gatillos rápidos y botones traseros',
            '<strong>Carreras (F1, Gran Turismo)</strong>: Busca gatillos analógicos suaves',
            '<strong>Deportes (FIFA, NBA)</strong>: Sticks de alta precisión y D-pad responsivo',
            '<strong>Battle Royale</strong>: Mandos ligeros con buena batería'
          ]
        },
        {
          subtitle: '💰 Rangos de precio:',
          text: '<strong>Gama de entrada ($40k-$60k)</strong>: PowerA, Nacon básicos<br/><strong>Gama media ($80k-$120k)</strong>: Razer Wolverine, Nacon Revolution<br/><strong>Gama alta ($150k+)</strong>: Xbox Elite Series 2, Scuf, Astro C40'
        },
        {
          subtitle: '⚡ Tip LevelUp:',
          text: 'Visita nuestra tienda para probar los mandos antes de comprar. Además, acumulas puntos que puedes canjear por accesorios. ¡Pregunta por nuestro programa de prueba gratuita!'
        }
      ]
    },
    'ps5-vs-switch': {
      title: 'PS5 vs. Switch: ¿qué te conviene?',
      emoji: '⚔️',
      content: [
        {
          subtitle: '🎮 Dos filosofías diferentes',
          text: 'PlayStation 5 y Nintendo Switch representan experiencias completamente distintas. La PS5 apuesta por gráficos de última generación y juegos AAA, mientras que Switch prioriza la portabilidad y exclusivos únicos.'
        },
        {
          subtitle: '🔥 PlayStation 5: Poder y espectáculo',
          list: [
            '<strong>Gráficos 4K/120fps</strong>: La mejor calidad visual del mercado',
            '<strong>Tiempos de carga ultra rápidos</strong>: SSD que elimina las esperas',
            '<strong>DualSense</strong>: Retroalimentación háptica revolucionaria',
            '<strong>Catálogo AAA</strong>: God of War, Spider-Man, Horizon, Final Fantasy XVI',
            '<strong>PlayStation Plus</strong>: Cientos de juegos incluidos en la suscripción',
            '<strong>Precio</strong>: $500k-$600k (más juegos a $60k-$80k)'
          ]
        },
        {
          subtitle: '🌟 Nintendo Switch: Diversión en cualquier lugar',
          list: [
            '<strong>Portabilidad total</strong>: Juega en casa o en viaje sin interrupciones',
            '<strong>Exclusivos Nintendo</strong>: Zelda, Mario, Pokémon, Splatoon, Animal Crossing',
            '<strong>Multijugador local</strong>: Perfecta para reuniones y familia',
            '<strong>Biblioteca indie</strong>: Miles de juegos independientes geniales',
            '<strong>Duración de batería</strong>: 4-9 horas según el modelo',
            '<strong>Precio</strong>: $300k-$350k (juegos $40k-$60k)'
          ]
        },
        {
          subtitle: '🤔 ¿Cuál elegir?',
          text: '<strong>Elige PS5 si:</strong><br/>• Quieres la mejor experiencia gráfica<br/>• Juegas principalmente en casa<br/>• Te gustan los juegos de mundo abierto épicos<br/>• Priorizas multijugador online competitivo<br/><br/><strong>Elige Switch si:</strong><br/>• Viajas frecuentemente o quieres jugar fuera de casa<br/>• Te encantan los juegos de Nintendo<br/>• Juegas con familia y amigos localmente<br/>• Prefieres sesiones de juego más cortas y casuales'
        },
        {
          subtitle: '💡 ¿Y si puedes tener ambas?',
          text: 'La combinación perfecta para un gamer completo. PS5 para las noches épicas en casa, Switch para el viaje diario. ¡En LevelUp tenemos planes de financiamiento!'
        }
      ]
    },
    'puntos-levelup': {
      title: 'Guía: canjea tus puntos LevelUp',
      emoji: '⭐',
      content: [
        {
          subtitle: '🎯 ¿Qué son los puntos LevelUp?',
          text: 'Nuestro programa de recompensas que transforma cada compra en beneficios. Mientras más compras, más descuentos y premios exclusivos desbloqueas.'
        },
        {
          subtitle: '💰 ¿Cómo gano puntos?',
          list: [
            '<strong>Compras</strong>: 1 punto por cada $1.000 gastados',
            '<strong>Registro inicial</strong>: 500 puntos de bienvenida',
            '<strong>Cumpleaños</strong>: 1.000 puntos en tu mes especial',
            '<strong>Reseñas de productos</strong>: 100 puntos por cada reseña verificada',
            '<strong>Referidos</strong>: 2.000 puntos cuando un amigo hace su primera compra',
            '<strong>Misiones mensuales</strong>: Hasta 5.000 puntos completando desafíos',
            '<strong>Compra juegos usados</strong>: Triple puntos en selección de usados'
          ]
        },
        {
          subtitle: '🎁 ¿Qué puedo canjear?',
          list: [
            '<strong>2.000 pts</strong>: Cupón de $5.000 en tu próxima compra',
            '<strong>5.000 pts</strong>: Cupón de $15.000 + envío gratis',
            '<strong>10.000 pts</strong>: Cupón de $35.000 + accesorio sorpresa',
            '<strong>20.000 pts</strong>: Cupón de $80.000 + mando inalámbrico',
            '<strong>50.000 pts</strong>: Consola recondicionada o juego AAA gratis'
          ]
        },
        {
          subtitle: '🏅 Niveles y beneficios:',
          text: '<strong>Bronce (0-9.999 pts)</strong>: Ofertas estándar<br/><strong>Plata (10k-24.999 pts)</strong>: Acceso anticipado a ofertas + 10% más puntos<br/><strong>Oro (25k-49.999 pts)</strong>: Descuentos exclusivos + 25% más puntos<br/><strong>Platino (50k+)</strong>: Eventos VIP + lanzamientos anticipados + 50% más puntos'
        },
        {
          subtitle: '🎮 Misiones del mes de diciembre:',
          list: [
            '✅ Compra 3 juegos diferentes: 1.500 puntos',
            '✅ Trae un amigo a la tienda: 2.000 puntos',
            '✅ Comparte en redes sociales tu compra: 500 puntos',
            '✅ Participa en torneo de tienda: 3.000 puntos',
            '✅ Trade-in de juego usado: 1.000 puntos'
          ]
        },
        {
          subtitle: '⚡ Tips para maximizar puntos:',
          text: '• Espera ofertas doble punto (cada 15 días)<br/>• Combina cupones con puntos para mejores deals<br/>• Los puntos no vencen mientras compres 1 vez al año<br/>• Refiere amigos antes de grandes lanzamientos<br/>• Sigue nuestro Instagram para códigos bonus'
        },
        {
          subtitle: '📱 Consulta tus puntos:',
          text: 'Ingresa a "Mi Cuenta" en el menú superior o descarga nuestra app LevelUp Gamer para ver tu saldo en tiempo real, historial de canjes y misiones activas.'
        }
      ]
    }
  };

  const data = articles[article];

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal news-modal">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">&times;</button>
        
        <div className="news-modal-header">
          <span className="news-emoji">{data.emoji}</span>
          <h2>{data.title}</h2>
        </div>

        <div className="news-modal-content">
          {data.content.map((section, idx) => (
            <div key={idx} className="news-section">
              {section.subtitle && <h3>{section.subtitle}</h3>}
              {section.text && <p dangerouslySetInnerHTML={{ __html: section.text }} />}
              {section.list && (
                <ul className="news-list">
                  {section.list.map((item, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="news-cta">
            <button className="btn primary" onClick={onClose}>
              ¡Entendido! 🎮
            </button>
            <button className="btn" onClick={onClose}>
              Volver a noticias
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
