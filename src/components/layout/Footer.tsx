'use client';

import Link from 'next/link';


const LINKS_NAV = [
  { label: 'Nuestro Café',  href: '#origen'    },
  { label: 'Productos',     href: '#productos'  },
  { label: 'El Proceso',    href: '#proceso'    },
  { label: 'Notas en Taza', href: '#notas'      },
  { label: 'Blog',          href: '#blog'       },
  { label: 'Reseñas',       href: '#resenas'    },
  { label: 'Contacto',      href: '#contacto'   },
];

const REDES = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/coffeemasfred',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/573103275824?text=Hola!%20Quiero%20pedir%20un%20café%20Masfred%20☕',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: '#0f0503',
        borderTop: '1px solid rgba(200,150,62,0.15)',
        padding: '60px 0 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Fondo sutil */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #C8963E 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0 24px', position: 'relative', zIndex: 1,
      }}>

        {/* ─── Fila principal ──────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '48px',
          paddingBottom: '48px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>

          {/* Columna 1 — Logo + descripción */}
          <div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '11px',
                fontWeight: 600,
                color: '#AAC071',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                marginBottom: '2px',
              }}>
                Coffee
              </div>
              <div style={{
                fontFamily: 'var(--font-cormorant)',
                fontWeight: 700,
                fontSize: '32px',
                color: '#FFF6D3',
                letterSpacing: '0.08em',
                lineHeight: 1,
              }}>
                MASFRED
              </div>
            </div>

            <p style={{
              fontFamily: 'var(--font-lora)',
              fontStyle: 'italic',
              fontSize: '13px',
              color: 'rgba(255,246,211,0.45)',
              lineHeight: 1.8,
              marginBottom: '24px',
              maxWidth: '240px',
            }}>
              "un café que te transporta a tu pasado, a tus raíces..."
            </p>

            {/* Redes sociales */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {REDES.map((red) => (
                <a
                  key={red.label}
                  href={red.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={red.label}
                  style={{
                    width: '38px', height: '38px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,246,211,0.5)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = 'rgba(200,150,62,0.15)';
                    e.currentTarget.style.borderColor = 'rgba(200,150,62,0.4)';
                    e.currentTarget.style.color = '#C8963E';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = 'rgba(255,246,211,0.5)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {red.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2 — Navegación */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-inter)', fontWeight: 600,
              fontSize: '11px', color: 'rgba(255,246,211,0.35)',
              textTransform: 'uppercase', letterSpacing: '0.2em',
              marginBottom: '20px',
            }}>
              Navegación
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {LINKS_NAV.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '14px',
                    color: 'rgba(255,246,211,0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease, padding-left 0.2s ease',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.color = '#C8963E';
                    e.currentTarget.style.paddingLeft = '6px';
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.currentTarget.style.color = 'rgba(255,246,211,0.5)';
                    e.currentTarget.style.paddingLeft = '0';
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Columna 3 — Productos */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-inter)', fontWeight: 600,
              fontSize: '11px', color: 'rgba(255,246,211,0.35)',
              textTransform: 'uppercase', letterSpacing: '0.2em',
              marginBottom: '20px',
            }}>
              Nuestros Cafés
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { nombre: 'Guadalupe Natural',   sub: 'Catimore · 1.700 msnm'   },
                { nombre: 'Isnos Fermentado',      sub: 'Caturra · 1.800 msnm'    },
              ].map((p) => (
                <div
                  key={p.nombre}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => document.querySelector('#productos')?.scrollIntoView({ behavior: 'smooth' })}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(200,150,62,0.08)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,150,62,0.2)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                >
                  <p style={{
                    fontFamily: 'var(--font-playfair)', fontWeight: 700,
                    fontSize: '14px', color: '#FFF6D3', marginBottom: '3px',
                  }}>
                    {p.nombre}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-inter)', fontSize: '11px',
                    color: 'rgba(200,150,62,0.6)',
                  }}>
                    {p.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* ─── Fila inferior ───────────────────────── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '24px 0',
        }}>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '12px',
            color: 'rgba(255,246,211,0.25)',
          }}>
            © {year} Coffee Masfred · Guadalupe, Huila · Colombia 🇨🇴
          </p>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-inter)', fontSize: '11px',
              color: 'rgba(255,246,211,0.2)',
            }}>
              Hecho con
            </span>
            <span style={{ fontSize: '13px' }}>☕</span>
            <span style={{
              fontFamily: 'var(--font-inter)', fontSize: '11px',
              color: 'rgba(255,246,211,0.2)',
            }}>
              y mucho amor desde el Huila
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}