'use client';

import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/lib/store/cart';

const NAV_LINKS = [
  { label: 'Inicio',    href: '#inicio', },
  { label: 'Origen',   href: '#origen',},
  { label: 'Café',     href: '#productos', },
  { label: 'Proceso',  href: '#proceso',   },
  { label: 'Blog',     href: '#blog',      },
  { label: 'Reseñas',  href: '#resenas',   },
  { label: 'Contacto', href: '#contacto',  },
];

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [badgeBump, setBadgeBump] = useState(false);
  const { openCart, cart }        = useCart();
  const prevCount                 = useRef(0);

  const itemCount = cart?.lines?.reduce((acc, l) => acc + l.quantity, 0) ?? 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (itemCount > prevCount.current) {
      setBadgeBump(true);
      const t = setTimeout(() => setBadgeBump(false), 400);
      return () => clearTimeout(t);
    }
    prevCount.current = itemCount;
  }, [itemCount]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, menuOpen ? 300 : 0);
  };

  return (
    <>
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to   { transform: translateX(0);     opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(12px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>

      {/* ─── Header ─────────────────────────────────── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(255,246,211,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? '0 2px 20px rgba(100,48,24,0.1)' : 'none',
        padding: scrolled ? '12px 0' : '20px 0',
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <button
            onClick={() => handleNavClick('#inicio')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
            aria-label="Coffee Masfred — Inicio"
          >
            <div style={{
              fontSize: '10px', fontFamily: 'var(--font-inter)', fontWeight: 600,
              color: '#AAC071', letterSpacing: '0.3em', textTransform: 'uppercase',
              lineHeight: 1, marginBottom: '2px',
            }}>
              Coffee
            </div>
            <div style={{
              fontFamily: 'var(--font-cormorant)', fontWeight: 700,
              fontSize: '22px', color: '#643018', letterSpacing: '0.06em', lineHeight: 1,
            }}>
              MASFRED
            </div>
          </button>

          {/* Nav desktop */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="hidden-mobile">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-inter)', fontSize: '13px',
                  fontWeight: 500, color: '#3D1A0A',
                  padding: '4px 0', position: 'relative',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#643018'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#3D1A0A'; }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Acciones */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

            {/* Carrito */}
            <button
              onClick={openCart}
              aria-label={`Carrito — ${itemCount} productos`}
              style={{
                position: 'relative', padding: '8px', borderRadius: '50%',
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#643018', transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(100,48,24,0.08)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {itemCount > 0 && (
                <span style={{
                  position: 'absolute', top: '2px', right: '2px',
                  minWidth: '17px', height: '17px', padding: '0 3px',
                  borderRadius: '99px',
                  background: '#AAC071', color: '#3D1A0A',
                  fontSize: '10px', fontWeight: 700,
                  fontFamily: 'var(--font-inter)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: badgeBump ? 'scale(1.3)' : 'scale(1)',
                  transition: 'transform 0.2s ease',
                }}>
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </button>

            {/* Comprar desktop */}
            <button
              onClick={() => handleNavClick('#productos')}
              className="hidden-mobile"
              style={{
                padding: '9px 20px', borderRadius: '99px',
                background: '#643018', color: '#FFF6D3',
                fontFamily: 'var(--font-inter)', fontWeight: 600,
                fontSize: '13px', border: 'none', cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 12px rgba(100,48,24,0.25)',
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
              Comprar
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="show-mobile"
              style={{
                padding: '8px', borderRadius: '10px',
                background: menuOpen ? 'rgba(100,48,24,0.1)' : 'none',
                border: 'none', cursor: 'pointer',
                color: '#643018', transition: 'background 0.2s ease',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {menuOpen ? (
                  <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                ) : (
                  <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile overlay ──────────────────────────── */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 55,
            background: 'rgba(61,26,10,0.5)',
            backdropFilter: 'blur(4px)',
          }}
          aria-hidden="true"
        />
      )}

      {/* ─── Mobile drawer ───────────────────────────── */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0,
          width: '280px', zIndex: 60,
          background: '#FFF6D3',
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex', flexDirection: 'column',
          boxShadow: menuOpen ? '4px 0 40px rgba(61,26,10,0.2)' : 'none',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {/* Header drawer */}
        <div style={{
          padding: '24px 24px 20px',
          borderBottom: '1px solid rgba(100,48,24,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontSize: '9px', fontFamily: 'var(--font-inter)', fontWeight: 600,
              color: '#AAC071', letterSpacing: '0.35em', textTransform: 'uppercase',
              marginBottom: '2px',
            }}>
              Coffee
            </div>
            <div style={{
              fontFamily: 'var(--font-cormorant)', fontWeight: 700,
              fontSize: '26px', color: '#643018', letterSpacing: '0.06em', lineHeight: 1,
            }}>
              MASFRED
            </div>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
            style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(100,48,24,0.06)',
              border: '1px solid rgba(100,48,24,0.1)',
              color: '#643018', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav style={{ flex: 1, padding: '16px 16px', overflowY: 'auto' }}>
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              style={{
                width: '100%', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '13px 16px', borderRadius: '14px',
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-inter)', fontWeight: 500,
                fontSize: '15px', color: '#3D1A0A',
                transition: 'background 0.15s ease, color 0.15s ease',
                marginBottom: '4px',
                animation: menuOpen ? `fadeInUp 0.4s ease ${i * 50}ms both` : 'none',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(100,48,24,0.07)';
                (e.currentTarget as HTMLElement).style.color = '#643018';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'none';
                (e.currentTarget as HTMLElement).style.color = '#3D1A0A';
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA bottom */}
        <div style={{
          padding: '20px 20px 32px',
          borderTop: '1px solid rgba(100,48,24,0.08)',
        }}>

          <p style={{
            textAlign: 'center', fontSize: '12px',
            fontFamily: 'var(--font-inter)',
            color: 'rgba(61,26,10,0.4)',
          }}>
            Huila, Colombia 🇨🇴
          </p>
        </div>
      </div>

      {/* CSS helpers para show/hide */}
      <style>{`
        @media (min-width: 768px) {
          .show-mobile  { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
        @media (max-width: 767px) {
          .show-mobile  { display: flex !important; }
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}