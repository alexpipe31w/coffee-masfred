'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export function ParallaxDivider() {
  const divRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!divRef.current || !imgRef.current) return;
      const rect     = divRef.current.getBoundingClientRect();
      const center   = rect.top + rect.height / 2;
      const viewport = window.innerHeight / 2;
      const offset   = (center - viewport) * 0.25;
      imgRef.current.style.transform = `translateY(${offset}px) scale(1.2)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={divRef}
      style={{
        position: 'relative',
        height: '320px',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Imagen con parallax */}
      <div
        ref={imgRef}
        style={{
          position: 'absolute',
          inset: '-20% 0',
          transition: 'transform 0.1s linear',
        }}
      >
        <Image
          src="/images/background.png"
          alt=""
          fill
          quality={85}
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          sizes="100vw"
        />
      </div>

      {/* Overlay oscuro */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(61,26,10,0.62)',
        zIndex: 1,
      }} />

      {/* Fade top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '80px',
        background: 'linear-gradient(to bottom, #FFF6D3, transparent)',
        zIndex: 2,
      }} />

      {/* Fade bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
        background: 'linear-gradient(to top, #FFF6D3, transparent)',
        zIndex: 2,
      }} />

      {/* Texto central */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 24px',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '16px',
          marginBottom: '16px',
        }}>
          <div style={{ width: '48px', height: '1px', background: 'rgba(200,150,62,0.6)' }} />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(200,150,62,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
            <line x1="6" y1="1" x2="6" y2="4"/>
            <line x1="10" y1="1" x2="10" y2="4"/>
            <line x1="14" y1="1" x2="14" y2="4"/>
          </svg>
          <div style={{ width: '48px', height: '1px', background: 'rgba(200,150,62,0.6)' }} />
        </div>

        <p style={{
          fontFamily: 'var(--font-lora)',
          fontStyle: 'italic',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
          color: 'rgba(255,246,211,0.92)',
          maxWidth: '560px',
          lineHeight: 1.7,
          textShadow: '0 2px 12px rgba(0,0,0,0.4)',
        }}>
          "Cada grano cuenta la historia de una montaña,
          una familia y una pasión por el café perfecto."
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
          <div style={{ width: '48px', height: '1px', background: 'rgba(200,150,62,0.6)' }} />
          <span style={{
            fontSize: '11px', fontFamily: 'var(--font-inter)',
            color: 'rgba(200,150,62,0.7)', letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}>
            Huila · Colombia
          </span>
          <div style={{ width: '48px', height: '1px', background: 'rgba(200,150,62,0.6)' }} />
        </div>
      </div>
    </div>
  );
}