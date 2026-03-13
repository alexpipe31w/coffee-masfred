'use client';

import { useEffect, useRef, useState } from 'react';

const PASOS = [
  {
    numero: '01',
    titulo: 'Cultivo',
    descripcion: 'A más de 1.700 metros, bajo la sombra de los árboles del Huila. El clima perfecto para un café de altura.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    ),
  },
  {
    numero: '02',
    titulo: 'Cosecha Manual',
    descripcion: 'Selección a mano, cereza por cereza, en su punto óptimo de madurez. Solo las mejores entran al proceso.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/>
        <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/>
        <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/>
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
      </svg>
    ),
  },
  {
    numero: '03',
    titulo: 'Beneficio',
    descripcion: 'Natural: secado al sol directo preservando los azúcares. Lavado: fermentación controlada para notas complejas.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
  },
  {
    numero: '04',
    titulo: 'Tostión Media',
    descripcion: 'Tostión media para resaltar los sabores únicos de cada origen sin quemar los aceites esenciales del grano.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/>
      </svg>
    ),
  },
  {
    numero: '05',
    titulo: 'Empaque 500g',
    descripcion: 'Bolsa con válvula de desgasificación y cierre resellable. Diseñada para preservar la frescura y los aromas.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
  {
    numero: '06',
    titulo: 'Tu Taza',
    descripcion: 'Cada sorbo es un viaje al corazón del Huila. El resultado de meses de dedicación en una sola taza.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        <line x1="6" y1="1" x2="6" y2="4"/>
        <line x1="10" y1="1" x2="10" y2="4"/>
        <line x1="14" y1="1" x2="14" y2="4"/>
      </svg>
    ),
  },
];

function PasoCard({ paso, index, active }: {
  paso: typeof PASOS[0];
  index: number;
  active: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => setVisible(true), index * 120);
    return () => clearTimeout(timer);
  }, [active, index]);

  return (
    <div
      ref={cardRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '32px 24px',
        borderRadius: '20px',
        border: '1px solid rgba(100,48,24,0.1)',
        background: '#fff',
        boxShadow: '0 2px 16px rgba(100,48,24,0.06)',
        transition: 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(100,48,24,0.15)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(100,48,24,0.06)';
      }}
    >
      {/* Número */}
      <span style={{
        fontFamily: 'var(--font-cormorant)',
        fontWeight: 700,
        fontSize: '13px',
        color: 'rgba(200,150,62,0.6)',
        letterSpacing: '0.2em',
        marginBottom: '16px',
      }}>
        {paso.numero}
      </span>

      {/* Ícono */}
      <div style={{
        width: '64px', height: '64px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #643018 0%, #3D1A0A 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#C8963E',
        marginBottom: '20px',
        boxShadow: '0 8px 24px rgba(100,48,24,0.25)',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'rotate(10deg) scale(1.1)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'rotate(0) scale(1)';
      }}
      >
        {paso.icon}
      </div>

      {/* Título */}
      <h3 style={{
        fontFamily: 'var(--font-playfair)',
        fontWeight: 700,
        fontSize: '17px',
        color: '#643018',
        marginBottom: '10px',
        lineHeight: 1.3,
      }}>
        {paso.titulo}
      </h3>

      {/* Descripción */}
      <p style={{
        fontFamily: 'var(--font-lora)',
        fontStyle: 'italic',
        fontSize: '13px',
        color: 'rgba(61,26,10,0.65)',
        lineHeight: 1.75,
      }}>
        {paso.descripcion}
      </p>
    </div>
  );
}

export function ProcesoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      style={{
        background: '#FFF6D3',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="proceso-titulo"
    >
      {/* Fondo sutil */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #643018 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0 24px', position: 'relative', zIndex: 1,
      }}>

        {/* ─── Título ─────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{
            display: 'block', fontSize: '11px',
            fontFamily: 'var(--font-inter)', fontWeight: 600,
            letterSpacing: '0.4em', color: '#AAC071',
            textTransform: 'uppercase', marginBottom: '12px',
          }}>
            El Proceso
          </span>
          <h2
            id="proceso-titulo"
            style={{
              fontFamily: 'var(--font-playfair)', fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#643018',
              marginBottom: '16px', lineHeight: 1.2,
            }}
          >
            Del Grano a tu Taza
          </h2>
          <p style={{
            fontFamily: 'var(--font-lora)', fontStyle: 'italic',
            color: 'rgba(61,26,10,0.65)', fontSize: '17px',
            maxWidth: '440px', margin: '0 auto', lineHeight: 1.7,
          }}>
            Cada paso fue pensado para que tu taza sea perfecta
          </p>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '12px', marginTop: '24px',
          }}>
            <div style={{ width: '64px', height: '1px', background: 'rgba(100,48,24,0.2)' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C8963E' }} />
            <div style={{ width: '64px', height: '1px', background: 'rgba(100,48,24,0.2)' }} />
          </div>
        </div>

        {/* ─── Grid pasos ─────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {PASOS.map((paso, i) => (
            <PasoCard key={paso.numero} paso={paso} index={i} active={active} />
          ))}
        </div>

        {/* ─── CTA final ──────────────────────────── */}
        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <p style={{
            fontFamily: 'var(--font-lora)', fontStyle: 'italic',
            fontSize: '18px', color: 'rgba(61,26,10,0.7)',
            marginBottom: '24px', lineHeight: 1.7,
          }}>
            "un café que te transporta a tu pasado, a tus raíces..."
          </p>
          <button
            onClick={() => document.querySelector('#productos')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              padding: '14px 36px', borderRadius: '99px',
              background: '#643018', color: '#FFF6D3',
              fontFamily: 'var(--font-inter)', fontWeight: 600,
              fontSize: '14px', border: 'none', cursor: 'pointer',
              transition: 'background 0.2s ease, transform 0.2s ease',
              boxShadow: '0 8px 32px rgba(100,48,24,0.3)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#8B4513';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '#643018';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            Pedir mi café ahora
          </button>
        </div>
      </div>
    </section>
  );
}