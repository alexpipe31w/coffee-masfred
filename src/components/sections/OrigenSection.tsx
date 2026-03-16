'use client';

import { useEffect, useRef, useState } from 'react';

const FINCAS = [
  {
    id: 'guadalupe',
    nombre: 'Guadalupe',
    region: 'Guadalupe, Huila',
    elevacion: 1700,
    variedad: 'Catimore',
    proceso: 'Natural',
    descripcion: 'Las cerezas maduran bajo el sol directo del Huila. Sin fermentación, el grano conserva toda su dulzura natural, dando notas intensas de chocolate y caramelo en taza.',
    notas: [
      { label: 'Chocolate', color: '#643018' },
      { label: 'Caramelo',  color: '#C8963E' },
      { label: 'Frutos secos', color: '#8B4513' },
    ],
    badge: 'Proceso Natural',
    badgeBg: 'rgba(200,150,62,0.15)',
    badgeColor: '#C8963E',
    badgeBorder: 'rgba(200,150,62,0.4)',
  },
  {
    id: 'isnos',
    nombre: 'Isnos',
    region: 'Isnos, Huila',
    elevacion: 1800,
    variedad: 'Caturra',
    proceso: 'Lavado / Fermentado',
    descripcion: 'En las alturas de Isnos, la fermentación controlada transforma los azúcares del grano en notas florales, frutales y una dulzura compleja que sorprende en cada taza.',
    notas: [
      { label: 'Miel',      color: '#C8963E' },
      { label: 'Caña de Azúcar',       color: '#AAC071' },
      { label: 'Cítrico suave', color: '#8B4513' },
    ],
    badge: 'Fermentado',
    badgeBg: 'rgba(170,192,113,0.15)',
    badgeColor: '#AAC071',
    badgeBorder: 'rgba(170,192,113,0.4)',
  },
];

// SVG íconos
const IconPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconMountain = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3l4 8 5-5 5 15H2L8 3z"/>
  </svg>
);

const IconLeaf = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

const IconCoffee = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/>
    <line x1="10" y1="1" x2="10" y2="4"/>
    <line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);

const IconFire = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/>
  </svg>
);

const IconDot = ({ color }: { color: string }) => (
  <svg width="8" height="8" viewBox="0 0 8 8">
    <circle cx="4" cy="4" r="4" fill={color} />
  </svg>
);

function ElevacionCounter({ target, active }: { target: number; active: boolean }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current || !spanRef.current) return;
    started.current = true;
    const duration = 1400;
    const from = target - 200;
    const startTs = Date.now();
    const tick = () => {
      const progress = Math.min((Date.now() - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const val = Math.round(from + (target - from) * eased);
      if (spanRef.current) spanRef.current.textContent = val.toLocaleString('es-CO');
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target]);

  return <span ref={spanRef}>{(target - 200).toLocaleString('es-CO')}</span>;
}

export function OrigenSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ─── Responsive styles ─────────────────────────────────────────── */}
      <style>{`
        .origen-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          max-width: 900px;
          margin: 0 auto;
        }

        .origen-card-header {
          padding: 28px 28px 24px;
          background: linear-gradient(135deg, #643018 0%, #3D1A0A 100%);
        }

        .origen-card-header-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          gap: 12px;
        }

        .origen-card-nombre {
          font-weight: 700;
          font-size: 26px;
          color: #FFF6D3;
          line-height: 1.2;
        }

        .origen-elevacion-num {
          font-weight: 700;
          font-size: 48px;
          color: #C8963E;
          line-height: 1;
        }

        .origen-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 99px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .origen-body {
          padding: 24px 28px 28px;
        }

        .origen-attrs {
          display: flex;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(100,48,24,0.08);
          background: #FFF6D3;
          margin-bottom: 20px;
        }

        .origen-colombia-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 99px;
          background: rgba(100,48,24,0.06);
          border: 1px solid rgba(100,48,24,0.12);
          font-size: 13px;
          color: #3D1A0A;
          text-align: center;
        }

        /* ── Mobile (≤ 480px) ── */
        @media (max-width: 480px) {
          .origen-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .origen-card-header {
            padding: 20px 20px 18px;
          }

          .origen-card-nombre {
            font-size: 22px;
          }

          .origen-elevacion-num {
            font-size: 38px;
          }

          .origen-badge {
            font-size: 10px;
            padding: 5px 10px;
          }

          .origen-body {
            padding: 18px 20px 22px;
          }

          .origen-colombia-badge {
            font-size: 12px;
            padding: 8px 14px;
          }
        }

        /* ── Tablet (481px – 767px) ── */
        @media (min-width: 481px) and (max-width: 767px) {
          .origen-grid {
            grid-template-columns: 1fr;
            gap: 28px;
            max-width: 540px;
          }

          .origen-elevacion-num {
            font-size: 42px;
          }
        }

        /* ── Card hover (only on devices that support hover) ── */
        @media (hover: hover) {
          .origen-card:hover {
            transform: translateY(-6px) !important;
            box-shadow: 0 16px 48px rgba(100,48,24,0.2) !important;
          }
        }
      `}</style>

      <section
        id="origen"
        ref={sectionRef}
        style={{ backgroundColor: '#FFF6D3', padding: 'clamp(48px, 8vw, 80px) 0', position: 'relative', overflow: 'hidden' }}
        aria-labelledby="origen-titulo"
      >
        {/* Patrón de fondo */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, #643018 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(16px, 5vw, 24px)', position: 'relative', zIndex: 1 }}>

          {/* ─── Título ─────────────────────────────── */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 6vw, 56px)' }}>
            <span style={{
              display: 'block', fontSize: '11px', fontFamily: 'var(--font-inter)',
              fontWeight: 600, letterSpacing: '0.4em', color: '#AAC071',
              textTransform: 'uppercase', marginBottom: '12px',
            }}>
              Origen
            </span>
            <h2
              id="origen-titulo"
              style={{
                fontFamily: 'var(--font-playfair)', fontWeight: 700,
                fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: '#643018',
                marginBottom: '16px', lineHeight: 1.2,
              }}
            >
              Desde las Montañas del Huila
            </h2>
            <p style={{
              fontFamily: 'var(--font-lora)', fontStyle: 'italic',
              color: 'rgba(61,26,10,0.65)', fontSize: 'clamp(15px, 2vw, 18px)',
              maxWidth: '480px', margin: '0 auto', lineHeight: 1.7,
            }}>
              Donde la niebla abraza los cafetales y cada cereza es seleccionada a mano
            </p>
            {/* Divisor */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '24px' }}>
              <div style={{ width: '64px', height: '1px', background: 'rgba(100,48,24,0.2)' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C8963E' }} />
              <div style={{ width: '64px', height: '1px', background: 'rgba(100,48,24,0.2)' }} />
            </div>
          </div>

          {/* ─── Cards ──────────────────────────────── */}
          <div className="origen-grid">
            {FINCAS.map((finca) => (
              <article
                key={finca.id}
                className="origen-card"
                style={{
                  borderRadius: '24px', overflow: 'hidden',
                  border: '1px solid rgba(100,48,24,0.1)',
                  boxShadow: '0 4px 20px rgba(100,48,24,0.1)',
                  background: '#fff',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                {/* Header */}
                <div className="origen-card-header">
                  <div className="origen-card-header-top">
                    <div>
                      <h3
                        className="origen-card-nombre"
                        style={{ fontFamily: 'var(--font-playfair)' }}
                      >
                        {finca.nombre}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', color: 'rgba(255,246,211,0.6)' }}>
                        <IconPin />
                        <span style={{ fontFamily: 'var(--font-inter)', fontSize: '13px' }}>
                          {finca.region}
                        </span>
                      </div>
                    </div>
                    <span
                      className="origen-badge"
                      style={{
                        fontFamily: 'var(--font-inter)',
                        background: finca.badgeBg,
                        color: finca.badgeColor,
                        border: `1px solid ${finca.badgeBorder}`,
                      }}
                    >
                      {finca.badge}
                    </span>
                  </div>

                  {/* Elevación */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(200,150,62,0.7)', marginBottom: '4px' }}>
                      <IconMountain />
                    </div>
                    <span
                      className="origen-elevacion-num"
                      style={{ fontFamily: 'var(--font-playfair)' }}
                    >
                      <ElevacionCounter target={finca.elevacion} active={active} />
                    </span>
                    <span style={{ color: 'rgba(255,246,211,0.45)', fontFamily: 'var(--font-inter)', fontSize: '13px', marginBottom: '6px' }}>
                      msnm
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="origen-body">

                  {/* Atributos */}
                  <div className="origen-attrs">
                    {[
                      { icon: <IconLeaf />,   label: 'Variedad', value: finca.variedad },
                      { icon: <IconCoffee />, label: 'Proceso',  value: finca.proceso  },
                      { icon: <IconFire />,   label: 'Tostión',  value: 'Media'        },
                    ].map((attr, i) => (
                      <div
                        key={attr.label}
                        style={{
                          flex: 1, textAlign: 'center', padding: '12px 8px',
                          borderRight: i < 2 ? '1px solid rgba(100,48,24,0.08)' : 'none',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'center', color: '#C8963E', marginBottom: '4px' }}>
                          {attr.icon}
                        </div>
                        <p style={{
                          fontSize: '9px', fontFamily: 'var(--font-inter)',
                          color: 'rgba(61,26,10,0.4)', textTransform: 'uppercase',
                          letterSpacing: '0.08em', marginBottom: '3px',
                        }}>
                          {attr.label}
                        </p>
                        <p style={{
                          fontSize: '11px', fontFamily: 'var(--font-inter)',
                          fontWeight: 600, color: '#643018', lineHeight: 1.3,
                        }}>
                          {attr.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Descripción */}
                  <p style={{
                    fontFamily: 'var(--font-lora)', fontStyle: 'italic',
                    fontSize: '14px', color: 'rgba(61,26,10,0.72)',
                    lineHeight: 1.8, marginBottom: '20px',
                  }}>
                    "{finca.descripcion}"
                  </p>

                  {/* Notas en taza */}
                  <div>
                    <p style={{
                      fontSize: '10px', fontFamily: 'var(--font-inter)',
                      color: 'rgba(61,26,10,0.4)', textTransform: 'uppercase',
                      letterSpacing: '0.1em', marginBottom: '10px',
                    }}>
                      Notas en taza
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {finca.notas.map((nota) => (
                        <span
                          key={nota.label}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            fontSize: '12px', fontFamily: 'var(--font-inter)',
                            padding: '5px 12px', borderRadius: '99px',
                            background: '#FFF6D3', color: '#3D1A0A',
                            border: '1px solid rgba(100,48,24,0.15)',
                          }}
                        >
                          <IconDot color={nota.color} />
                          {nota.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Badge Colombia */}
          <div style={{ textAlign: 'center', marginTop: 'clamp(32px, 5vw, 48px)' }}>
            <span className="origen-colombia-badge" style={{ fontFamily: 'var(--font-inter)' }}>
              🇨🇴 Café especial colombiano · Tipo exportación
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
