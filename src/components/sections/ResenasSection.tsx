'use client';

import { useEffect, useRef, useState } from 'react';

const RESENAS = [
  {
    id: 1,
    nombre: 'Valentina Ruiz',
    ciudad: 'Bogotá',
    estrellas: 5,
    texto: 'El Guadalupe es increíble. Nunca había tomado un café tan dulce sin agregarle azúcar. El proceso natural se siente en cada sorbo. Ya pedí mi segunda bolsa.',
    fecha: 'Febrero 2025',
    inicial: 'V',
    color: '#C8963E',
  },
  {
    id: 2,
    nombre: 'Sebastián Torres',
    ciudad: 'Medellín',
    estrellas: 5,
    texto: 'El Isnos fermentado me voló la cabeza. Soy barista y este café tiene un perfil de taza que no envidia nada a los specialty que importamos. Huilense de corazón.',
    fecha: 'Enero 2025',
    inicial: 'S',
    color: '#AAC071',
  },
  {
    id: 3,
    nombre: 'Camila Ospina',
    ciudad: 'Cali',
    estrellas: 5,
    texto: 'El envío llegó súper rápido y el empaque es hermoso. Pero lo mejor es el café — el olor al abrir la bolsa ya lo dice todo. Mis papás también quedaron enamorados.',
    fecha: 'Marzo 2025',
    inicial: 'C',
    color: '#643018',
  },
  {
    id: 4,
    nombre: 'Andrés Molina',
    ciudad: 'Bucaramanga',
    estrellas: 5,
    texto: 'Compré los dos para comparar. El Guadalupe para las mañanas con leche y el Isnos para las tardes negro. Ahora no puedo tomar otro café. Gracias Masfred.',
    fecha: 'Diciembre 2024',
    inicial: 'A',
    color: '#8B4513',
  },
  {
    id: 5,
    nombre: 'Daniela Herrera',
    ciudad: 'Manizales',
    estrellas: 5,
    texto: 'Soy de tierra cafetera y este café me recuerda al de la finca de mi abuela. Limpio, dulce, con cuerpo. Es exactamente "un café que te transporta a tus raíces".',
    fecha: 'Noviembre 2024',
    inicial: 'D',
    color: '#C8963E',
  },
  {
    id: 6,
    nombre: 'Felipe Gómez',
    ciudad: 'Barranquilla',
    estrellas: 5,
    texto: 'En la costa no es fácil conseguir café specialty bueno. Masfred llega en 2 días y la frescura es brutal. El Isnos en cold brew es una experiencia aparte.',
    fecha: 'Octubre 2024',
    inicial: 'F',
    color: '#AAC071',
  },
];

const ESTRELLAS = (n: number) =>
  Array.from({ length: 5 }, (_, i) => (
    <svg
      key={i}
      width="14" height="14"
      viewBox="0 0 24 24"
      fill={i < n ? '#C8963E' : 'none'}
      stroke="#C8963E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ));

function ResenaCard({ resena, visible, delay }: {
  resena: typeof RESENAS[0];
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '24px',
        border: '1px solid rgba(100,48,24,0.08)',
        boxShadow: '0 2px 16px rgba(100,48,24,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s ease`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(100,48,24,0.14)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(100,48,24,0.06)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      <div style={{
        fontSize: '48px',
        fontFamily: 'var(--font-playfair)',
        color: resena.color,
        opacity: 0.2,
        lineHeight: 0.8,
        userSelect: 'none',
      }}>
        "
      </div>

      <div style={{ display: 'flex', gap: '3px', marginTop: '-8px' }}>
        {ESTRELLAS(resena.estrellas)}
      </div>

      <p style={{
        fontFamily: 'var(--font-lora)',
        fontStyle: 'italic',
        fontSize: '14px',
        color: 'rgba(61,26,10,0.75)',
        lineHeight: 1.75,
        flex: 1,
      }}>
        {resena.texto}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        paddingTop: '12px',
        borderTop: '1px solid rgba(100,48,24,0.08)',
      }}>
        <div style={{
          width: '40px', height: '40px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${resena.color} 0%, ${resena.color}99 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff',
          fontFamily: 'var(--font-playfair)',
          fontWeight: 700,
          fontSize: '16px',
          flexShrink: 0,
        }}>
          {resena.inicial}
        </div>
        <div>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 600,
            fontSize: '13px',
            color: '#3D1A0A',
            marginBottom: '2px',
          }}>
            {resena.nombre}
          </p>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '11px',
            color: 'rgba(61,26,10,0.4)',
          }}>
            📍 {resena.ciudad} · {resena.fecha}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ResenasSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const promedio = (RESENAS.reduce((a, r) => a + r.estrellas, 0) / RESENAS.length).toFixed(1);

  return (
    <>
      <style>{`
        .resenas-rating-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #fff;
          border: 1px solid rgba(100,48,24,0.1);
          border-radius: 99px;
          padding: 10px 24px;
          box-shadow: 0 2px 16px rgba(100,48,24,0.08);
          margin-bottom: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .resenas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-bottom: 48px;
        }

        .resenas-cta {
          text-align: center;
          padding: 40px;
          border-radius: 24px;
          background: #fff;
          border: 1px solid rgba(100,48,24,0.08);
          box-shadow: 0 2px 16px rgba(100,48,24,0.06);
        }

        .resenas-cta-btns {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .resenas-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 99px;
          background: #643018;
          color: #FFF6D3;
          font-family: var(--font-inter);
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(100,48,24,0.25);
          white-space: nowrap;
        }

        .resenas-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 28px;
          border-radius: 99px;
          background: transparent;
          border: 1px solid rgba(100,48,24,0.25);
          color: #643018;
          font-family: var(--font-inter);
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          white-space: nowrap;
        }

        /* ── Mobile (≤ 480px) ── */
        @media (max-width: 480px) {
          .resenas-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-bottom: 32px;
          }

          .resenas-cta {
            padding: 24px 20px;
            border-radius: 18px;
          }

          .resenas-btn-primary,
          .resenas-btn-secondary {
            width: 100%;
            justify-content: center;
            font-size: 13px;
            padding: 12px 20px;
          }

          .resenas-cta-btns {
            flex-direction: column;
            align-items: stretch;
          }

          .resenas-rating-badge {
            padding: 8px 16px;
            gap: 8px;
          }
        }

        /* ── Tablet (481px – 767px) ── */
        @media (min-width: 481px) and (max-width: 767px) {
          .resenas-grid {
            grid-template-columns: 1fr;
            max-width: 520px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 36px;
          }

          .resenas-cta {
            padding: 32px 24px;
          }
        }

        /* ── Hover solo en dispositivos que lo soportan ── */
        @media (hover: none) {
          .resenas-btn-primary:hover,
          .resenas-btn-secondary:hover {
            opacity: 1;
          }
        }
      `}</style>

      <section
        id="resenas"
        ref={sectionRef}
        style={{
          background: 'linear-gradient(180deg, #FFF6D3 0%, #fff8e8 100%)',
          padding: 'clamp(48px, 8vw, 80px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-labelledby="resenas-titulo"
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, opacity: 0.025, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, #643018 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          padding: '0 clamp(16px, 5vw, 24px)', position: 'relative', zIndex: 1,
        }}>

          {/* ─── Título ─────────────────────────────── */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 6vw, 56px)' }}>
            <span style={{
              display: 'block', fontSize: '11px',
              fontFamily: 'var(--font-inter)', fontWeight: 600,
              letterSpacing: '0.4em', color: '#AAC071',
              textTransform: 'uppercase', marginBottom: '12px',
            }}>
              Lo que dicen nuestros clientes
            </span>
            <h2
              id="resenas-titulo"
              style={{
                fontFamily: 'var(--font-playfair)', fontWeight: 700,
                fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: '#643018',
                marginBottom: '16px', lineHeight: 1.2,
              }}
            >
              Cada Taza Habla por Sí Sola
            </h2>

            <div className="resenas-rating-badge">
              <div style={{ display: 'flex', gap: '3px' }}>
                {ESTRELLAS(5)}
              </div>
              <span style={{
                fontFamily: 'var(--font-playfair)', fontWeight: 700,
                fontSize: '20px', color: '#643018',
              }}>
                {promedio}
              </span>
              <span style={{
                fontFamily: 'var(--font-inter)', fontSize: '12px',
                color: 'rgba(61,26,10,0.45)',
              }}>
                {RESENAS.length} reseñas verificadas
              </span>
            </div>

            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '12px',
            }}>
              <div style={{ width: '64px', height: '1px', background: 'rgba(100,48,24,0.2)' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C8963E' }} />
              <div style={{ width: '64px', height: '1px', background: 'rgba(100,48,24,0.2)' }} />
            </div>
          </div>

          {/* ─── Grid reseñas ────────────────────────── */}
          <div className="resenas-grid">
            {RESENAS.map((resena, i) => (
              <ResenaCard
                key={resena.id}
                resena={resena}
                visible={visible}
                delay={i * 100}
              />
            ))}
          </div>

          {/* ─── CTA ────────────────────────────────── */}
          <div className="resenas-cta">
            <p style={{
              fontFamily: 'var(--font-playfair)', fontWeight: 700,
              fontSize: 'clamp(17px, 2.5vw, 20px)', color: '#643018', marginBottom: '8px',
            }}>
              ¿Ya probaste Masfred?
            </p>
            <p style={{
              fontFamily: 'var(--font-lora)', fontStyle: 'italic',
              fontSize: '14px', color: 'rgba(61,26,10,0.55)',
              marginBottom: '24px', lineHeight: 1.7,
            }}>
              Tu opinión nos ayuda a llegar a más amantes del café colombiano
            </p>
            <div className="resenas-cta-btns">
              <a
                href="https://g.page/r/TU-GOOGLE-PLACE-ID/review"
                target="_blank"
                rel="noopener noreferrer"
                className="resenas-btn-primary"
              >
                ⭐ Dejar reseña en Google
              </a>
              <button
                onClick={() => document.querySelector('#productos')?.scrollIntoView({ behavior: 'smooth' })}
                className="resenas-btn-secondary"
              >
                ☕ Pedir mi café
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
