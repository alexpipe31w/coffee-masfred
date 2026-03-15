'use client';

import { useEffect, useRef, useState } from 'react';

const CAFES = [
  {
    id: 'guadalupe',
    nombre: 'Guadalupe',
    subtitulo: 'Proceso Natural',
    descripcion: 'Una taza redonda, de cuerpo pleno y dulzura natural. El sol del Huila concentrado en cada sorbo.',
    color: '#C8963E',
    notas: [
      { emoji: '🍫', label: 'Chocolate negro', intensidad: 90 },
      { emoji: '🍯', label: 'Caramelo',         intensidad: 80 },
      { emoji: '🌰', label: 'Frutos secos',     intensidad: 70 },
      { emoji: '🌾', label: 'Panela',           intensidad: 60 },
    ],
  },
  {
    id: 'isnos',
    nombre: 'Isnos',
    subtitulo: 'Lavado / Fermentado',
    descripcion: 'Una taza brillante, de acidez elegante y final dulce. La complejidad de la fermentación controlada.',
    color: '#AAC071',
    notas: [
      { emoji: '🍑', label: 'Durazno',       intensidad: 85 },
      { emoji: '🌸', label: 'Floral',        intensidad: 80 },
      { emoji: '🍊', label: 'Cítrico suave', intensidad: 65 },
      { emoji: '🍬', label: 'Azúcar morena', intensidad: 75 },
    ],
  },
];

const PARTICULAS = [
  { w: 2.5, h: 2.5, left: '5%',  top: '10%', color: 'rgba(200,150,62,0.3)',  anim: 'float-0', dur: '3s'   },
  { w: 2.0, h: 2.0, left: '12%', top: '25%', color: 'rgba(170,192,113,0.2)', anim: 'float-1', dur: '3.5s' },
  { w: 3.0, h: 3.0, left: '22%', top: '60%', color: 'rgba(200,150,62,0.3)',  anim: 'float-2', dur: '4s'   },
  { w: 2.0, h: 2.0, left: '35%', top: '80%', color: 'rgba(170,192,113,0.2)', anim: 'float-0', dur: '4.5s' },
  { w: 2.5, h: 2.5, left: '48%', top: '15%', color: 'rgba(200,150,62,0.3)',  anim: 'float-1', dur: '5s'   },
  { w: 2.0, h: 2.0, left: '58%', top: '45%', color: 'rgba(170,192,113,0.2)', anim: 'float-2', dur: '5.5s' },
  { w: 3.0, h: 3.0, left: '68%', top: '70%', color: 'rgba(200,150,62,0.3)',  anim: 'float-0', dur: '6s'   },
  { w: 2.0, h: 2.0, left: '75%', top: '30%', color: 'rgba(170,192,113,0.2)', anim: 'float-1', dur: '6.5s' },
  { w: 2.5, h: 2.5, left: '82%', top: '55%', color: 'rgba(200,150,62,0.3)',  anim: 'float-2', dur: '7s'   },
  { w: 2.0, h: 2.0, left: '88%', top: '85%', color: 'rgba(170,192,113,0.2)', anim: 'float-0', dur: '7.5s' },
  { w: 3.0, h: 3.0, left: '93%', top: '20%', color: 'rgba(200,150,62,0.3)',  anim: 'float-1', dur: '8s'   },
  { w: 2.0, h: 2.0, left: '97%', top: '50%', color: 'rgba(170,192,113,0.2)', anim: 'float-2', dur: '8.5s' },
];

function BarraIntensidad({ intensidad, color, active }: {
  intensidad: number;
  color: string;
  active: boolean;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setWidth(intensidad), 300);
    return () => clearTimeout(t);
  }, [active, intensidad]);

  return (
    <div style={{
      width: '100%', height: '4px',
      borderRadius: '99px',
      background: 'rgba(255,255,255,0.1)',
      overflow: 'hidden',
    }}>
      <div style={{
        height: '100%',
        width: `${width}%`,
        borderRadius: '99px',
        background: color,
        transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: `0 0 8px ${color}80`,
      }} />
    </div>
  );
}

export function NotasSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState<string>('guadalupe');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const cafe = CAFES.find(c => c.id === selected)!;

  return (
    <section
      id="notas"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(180deg, #3D1A0A 0%, #1a0a04 100%)',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="notas-titulo"
    >
      {/* Keyframes */}
      <style>{`
        @keyframes float-0 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes float-1 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes float-2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
        @keyframes steam   { 0% { opacity: 0.5; transform: translateY(0) scaleX(1); } 100% { opacity: 0; transform: translateY(-40px) scaleX(1.3); } }
      `}</style>

      {/* Partículas */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {PARTICULAS.map((p, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${p.w}px`,
              height: `${p.h}px`,
              borderRadius: '50%',
              background: p.color,
              left: p.left,
              top: p.top,
              animation: `${p.anim} ${p.dur} ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div style={{
        maxWidth: '900px', margin: '0 auto',
        padding: '0 24px', position: 'relative', zIndex: 1,
      }}>

        {/* ─── Título ─────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'block', fontSize: '11px',
            fontFamily: 'var(--font-inter)', fontWeight: 600,
            letterSpacing: '0.4em', color: '#AAC071',
            textTransform: 'uppercase', marginBottom: '12px',
          }}>
            Notas en Taza
          </span>
          <h2
            id="notas-titulo"
            style={{
              fontFamily: 'var(--font-playfair)', fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFF6D3',
              marginBottom: '14px', lineHeight: 1.2,
            }}
          >
            Cierra los ojos. ¿Qué sientes?
          </h2>
          <p style={{
            fontFamily: 'var(--font-lora)', fontStyle: 'italic',
            color: 'rgba(255,246,211,0.55)', fontSize: '17px',
            maxWidth: '400px', margin: '0 auto', lineHeight: 1.7,
          }}>
            El territorio del Huila en cada sorbo
          </p>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '12px', marginTop: '20px',
          }}>
            <div style={{ width: '48px', height: '1px', background: 'rgba(200,150,62,0.3)' }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8963E' }} />
            <div style={{ width: '48px', height: '1px', background: 'rgba(200,150,62,0.3)' }} />
          </div>
        </div>

        {/* ─── Selector de café ───────────────────── */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: '12px', marginBottom: '48px',
        }}>
          {CAFES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              style={{
                padding: '10px 28px', borderRadius: '99px',
                fontFamily: 'var(--font-inter)', fontWeight: 600,
                fontSize: '13px', cursor: 'pointer',
                transition: 'all 0.25s ease',
                background: selected === c.id ? c.color : 'transparent',
                color: selected === c.id ? '#3D1A0A' : 'rgba(255,246,211,0.5)',
                border: `1px solid ${selected === c.id ? c.color : 'rgba(255,246,211,0.15)'}`,
                boxShadow: selected === c.id ? `0 4px 20px ${c.color}50` : 'none',
              }}
            >
              {c.nombre}
            </button>
          ))}
        </div>

        {/* ─── Panel de notas ─────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
          alignItems: 'center',
        }}>

          {/* Lado izquierdo — info café */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '24px',
            padding: '32px',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '28px', position: 'relative' }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: `radial-gradient(circle, ${cafe.color}30 0%, transparent 70%)`,
                border: `1px solid ${cafe.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto',
                boxShadow: `0 0 32px ${cafe.color}20`,
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={cafe.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                  <line x1="6" y1="1" x2="6" y2="4"/>
                  <line x1="10" y1="1" x2="10" y2="4"/>
                  <line x1="14" y1="1" x2="14" y2="4"/>
                </svg>
              </div>

              {/* Vapor */}
              <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)' }}>
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      width: '2px', height: '16px',
                      borderRadius: '99px',
                      background: 'rgba(200,150,62,0.4)',
                      left: `${(i - 1) * 10}px`,
                      animation: `steam ${1.5 + i * 0.4}s ease-out ${i * 0.3}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-playfair)', fontWeight: 700,
              fontSize: '22px', color: '#FFF6D3',
              textAlign: 'center', marginBottom: '6px',
            }}>
              {cafe.nombre}
            </h3>
            <p style={{
              fontFamily: 'var(--font-inter)', fontSize: '11px',
              color: cafe.color, textAlign: 'center',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              marginBottom: '20px',
            }}>
              {cafe.subtitulo}
            </p>
            <p style={{
              fontFamily: 'var(--font-lora)', fontStyle: 'italic',
              fontSize: '13px', color: 'rgba(255,246,211,0.6)',
              textAlign: 'center', lineHeight: 1.7,
            }}>
              {cafe.descripcion}
            </p>
          </div>

          {/* Lado derecho — barras */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {cafe.notas.map((nota) => (
              <div key={nota.label}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', marginBottom: '8px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>{nota.emoji}</span>
                    <span style={{
                      fontFamily: 'var(--font-inter)', fontWeight: 500,
                      fontSize: '14px', color: 'rgba(255,246,211,0.85)',
                    }}>
                      {nota.label}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-cormorant)', fontWeight: 700,
                    fontSize: '13px', color: 'rgba(200,150,62,0.6)',
                    letterSpacing: '0.1em',
                  }}>
                    {nota.intensidad}%
                  </span>
                </div>
                <BarraIntensidad
                  intensidad={nota.intensidad}
                  color={cafe.color}
                  active={active}
                />
              </div>
            ))}

            <button
              onClick={() => document.querySelector('#productos')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                marginTop: '8px',
                padding: '12px 28px', borderRadius: '99px',
                background: 'transparent',
                border: `1px solid ${cafe.color}60`,
                color: cafe.color,
                fontFamily: 'var(--font-inter)', fontWeight: 600,
                fontSize: '13px', cursor: 'pointer',
                transition: 'all 0.25s ease',
                alignSelf: 'flex-start',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = `${cafe.color}15`;
                (e.currentTarget as HTMLElement).style.borderColor = cafe.color;
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.borderColor = `${cafe.color}60`;
                (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              }}
            >
              Probar {cafe.nombre} →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}