'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export function HeroSection() {
  const heroRef  = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Parallax fondo
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      heroRef.current.style.setProperty('--parallax-y', `${window.scrollY * 0.4}px`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToProducts = () =>
    document.querySelector('#productos')?.scrollIntoView({ behavior: 'smooth' });

  const scrollToHistory = () =>
    document.querySelector('#origen')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="inicio"
      ref={heroRef}
      aria-label="Coffee Masfred — Café especial del Huila"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ─── Fondo con parallax ─────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          transform: 'translateY(var(--parallax-y, 0px)) scale(1.1)',
        }}
      >
        <Image
          src="/images/background.png"
          alt="Finca cafetera en el Huila, Colombia"
          fill
          priority
          quality={90}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="100vw"
        />
      </div>

      {/* ─── Overlay gradiente ──────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: `linear-gradient(
            to bottom,
            rgba(61,26,10,0.20) 0%,
            rgba(61,26,10,0.45) 45%,
            rgba(61,26,10,0.80) 100%
          )`,
        }}
      />

      {/* ─── Contenido ──────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {/* Eyebrow */}
        <span style={{
          display: 'block',
          fontSize: '15px',
          fontFamily: 'var(--font-inter)',
          fontWeight: 600,
          letterSpacing: '0.5em',
          color: '#643018',
          textTransform: 'uppercase',
          marginBottom: '12px',
        }}>
          Coffee
        </span>

        {/* ─── H1 MASFRED con glow hover ──────────── */}
        <div
          style={{ marginBottom: '24px' }}
          onMouseEnter={e => {
            const h1 = e.currentTarget.querySelector('h1') as HTMLElement;
            if (h1) {
              h1.style.transform = 'scale(1.05)';
              h1.style.filter = 'drop-shadow(0 0 60px rgba(200,150,62,1))';
            }
          }}
          onMouseLeave={e => {
            const h1 = e.currentTarget.querySelector('h1') as HTMLElement;
            if (h1) {
              h1.style.transform = 'scale(1)';
              h1.style.filter = 'none';
            }
          }}
        >
          <h1
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontWeight: 700,
              fontSize: 'clamp(3.5rem, 13vw, 9rem)',
              color: '#FFF6D3',
              lineHeight: 1,
              letterSpacing: '0.1em',
              userSelect: 'none',
              transition: 'transform 0.5s ease, filter 0.5s ease',
              cursor: 'default',
            }}
          >
            MASFRED
          </h1>
        </div>

        {/* Divisor dorado */}
        <div
          aria-hidden="true"
          style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}
        >
          <div style={{ width: '80px', height: '1px', background: 'rgba(200,150,62,0.6)' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(200,150,62,0.8)' }} />
          <div style={{ width: '80px', height: '1px', background: 'rgba(200,150,62,0.6)' }} />
        </div>

        {/* Eslogan */}
        <p style={{
          fontFamily: 'var(--font-lora)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          color: 'rgba(255,246,211,0.90)',
          maxWidth: '420px',
          lineHeight: 1.8,
          marginBottom: '16px',
          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}>
          "un café que te transporta a tu pasado,
          <br /> a tus raíces..."
        </p>

        {/* Badges origen */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px',
          fontFamily: 'var(--font-inter)',
          fontSize: '13px',
          color: 'rgba(255,246,211,0.65)',
          marginBottom: '40px',
        }}>
          <span>☕ Huila, Colombia</span>
          <span style={{ color: 'rgba(200,150,62,0.5)' }}>·</span>
          <span>1700–1800 msnm</span>
          <span style={{ color: 'rgba(200,150,62,0.5)' }}>·</span>
          <span>Especial tipo exportación</span>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <button
            onClick={scrollToProducts}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#8B4513';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '#643018';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
            style={{
              padding: '14px 32px',
              borderRadius: '99px',
              minWidth: '180px',
              background: '#643018',
              color: '#FFF6D3',
              fontFamily: 'var(--font-inter)',
              fontWeight: 600,
              fontSize: '14px',
              letterSpacing: '0.05em',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s ease, transform 0.2s ease',
              boxShadow: '0 8px 40px rgba(100,48,24,0.5)',
            }}
          >
            Ver Nuestros Cafés
          </button>

          <button
            onClick={scrollToHistory}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,246,211,0.12)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,246,211,0.8)';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,246,211,0.5)';
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
            style={{
              padding: '14px 32px',
              borderRadius: '99px',
              minWidth: '180px',
              background: 'transparent',
              color: '#FFF6D3',
              fontFamily: 'var(--font-inter)',
              fontWeight: 500,
              fontSize: '14px',
              letterSpacing: '0.05em',
              border: '1px solid rgba(255,246,211,0.5)',
              cursor: 'pointer',
              transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
              backdropFilter: 'blur(8px)',
            }}
          >
            Nuestra Historia
          </button>
        </div>
      </div>

      {/* ─── Scroll indicator ───────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          animation: 'bounce 2s infinite',
        }}
      >
        <span style={{
          fontSize: '10px',
          fontFamily: 'var(--font-inter)',
          color: 'rgba(255,246,211,0.4)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          Scroll
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,246,211,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Keyframe bounce */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </section>
  );
}