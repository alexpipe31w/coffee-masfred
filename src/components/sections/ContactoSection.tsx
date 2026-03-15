'use client';

const WHATSAPP_NUMBER = '573232848455'; // ← pon tu número aquí
const WHATSAPP_MESSAGE = encodeURIComponent('Hola! Quiero pedir un café Masfred ☕');

const INFO = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Ubicación',
    valor: 'kilometro 12 vía al juncal, Condominio llanos de vimianzo, Palermo - Huila',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    label: 'Instagram',
    valor: '@coffeemasfred',
    link: 'https://instagram.com/coffeemasfred',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    valor: 'coffee.masfred@gmail.com',
    link: 'mailto:coffee.masfred@gmail.com',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    label: 'Envíos',
    valor: 'A toda Colombia — 2 a 5 días hábiles',
  },
];

export function ContactoSection() {
  return (
    <>
      <style>{`
        .contacto-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          align-items: start;
        }

        .contacto-cta-box {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 40px 32px;
          text-align: center;
        }

        .contacto-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          border-radius: 99px;
          background: #25D366;
          color: #fff;
          font-family: var(--font-inter);
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          box-shadow: 0 8px 32px rgba(37,211,102,0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          white-space: nowrap;
        }

        .contacto-info-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* ── Mobile (≤ 480px) ── */
        @media (max-width: 480px) {
          .contacto-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .contacto-cta-box {
            padding: 28px 20px;
            border-radius: 20px;
          }

          .contacto-wa-btn {
            width: 100%;
            justify-content: center;
            font-size: 14px;
            padding: 13px 20px;
          }
        }

        /* ── Tablet (481px – 767px) ── */
        @media (min-width: 481px) and (max-width: 767px) {
          .contacto-grid {
            grid-template-columns: 1fr;
            max-width: 520px;
            margin: 0 auto;
            gap: 28px;
          }
        }

        /* ── Hover solo en dispositivos que lo soportan ── */
        @media (hover: hover) {
          .contacto-wa-btn:hover {
            transform: scale(1.04);
            box-shadow: 0 12px 40px rgba(37,211,102,0.45);
          }
        }
      `}</style>

      <section
        id="contacto"
        style={{
          background: 'linear-gradient(180deg, #3D1A0A 0%, #1a0a04 100%)',
          padding: 'clamp(48px, 8vw, 80px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-labelledby="contacto-titulo"
      >
        {/* Fondo sutil */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, #C8963E 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div style={{
          maxWidth: '1000px', margin: '0 auto',
          padding: '0 clamp(16px, 5vw, 24px)',
          position: 'relative', zIndex: 1,
        }}>

          {/* ─── Título ─────────────────────────────── */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 6vw, 56px)' }}>
            <span style={{
              display: 'block', fontSize: '11px',
              fontFamily: 'var(--font-inter)', fontWeight: 600,
              letterSpacing: '0.4em', color: '#AAC071',
              textTransform: 'uppercase', marginBottom: '12px',
            }}>
              Contacto
            </span>
            <h2
              id="contacto-titulo"
              style={{
                fontFamily: 'var(--font-playfair)', fontWeight: 700,
                fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: '#FFF6D3',
                marginBottom: '14px', lineHeight: 1.2,
              }}
            >
              Hablemos de Café
            </h2>
            <p style={{
              fontFamily: 'var(--font-lora)', fontStyle: 'italic',
              color: 'rgba(255,246,211,0.55)', fontSize: 'clamp(14px, 2vw, 17px)',
              maxWidth: '400px', margin: '0 auto', lineHeight: 1.7,
            }}>
              Pedidos, preguntas o simplemente para hablar de café
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

          {/* ─── Layout dos columnas ─────────────────── */}
          <div className="contacto-grid">

            {/* ── Columna izquierda — WhatsApp CTA ──── */}
            <div className="contacto-cta-box">
              {/* Ícono WhatsApp */}
              <div style={{
                width: '80px', height: '80px',
                borderRadius: '50%',
                background: 'rgba(37,211,102,0.12)',
                border: '1px solid rgba(37,211,102,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px',
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-playfair)', fontWeight: 700,
                fontSize: 'clamp(18px, 3vw, 22px)', color: '#FFF6D3', marginBottom: '12px',
              }}>
                Escríbenos por WhatsApp
              </h3>
              <p style={{
                fontFamily: 'var(--font-lora)', fontStyle: 'italic',
                fontSize: '14px', color: 'rgba(255,246,211,0.55)',
                lineHeight: 1.7, marginBottom: '28px',
              }}>
                Respondemos en minutos. Pedidos, dudas sobre el café o simplemente para charlar.
              </p>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contacto-wa-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chatear ahora
              </a>

              <p style={{
                marginTop: '20px',
                fontFamily: 'var(--font-inter)', fontSize: '12px',
                color: 'rgba(255,246,211,0.3)',
              }}>
                Lun – Sáb · 8am – 8pm
              </p>
            </div>

            {/* ── Columna derecha — Info ──────────────── */}
            <div className="contacto-info-col">
              {INFO.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '16px',
                    padding: '20px 24px',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    transition: 'background 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(200,150,62,0.08)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,150,62,0.2)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                  }}
                >
                  <div style={{ color: '#C8963E', flexShrink: 0, marginTop: '2px' }}>
                    {item.icon}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{
                      fontFamily: 'var(--font-inter)', fontWeight: 600,
                      fontSize: '11px', color: 'rgba(255,246,211,0.4)',
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      marginBottom: '4px',
                    }}>
                      {item.label}
                    </p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target={item.link.startsWith('http') ? '_blank' : undefined}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        style={{
                          fontFamily: 'var(--font-inter)', fontSize: '14px',
                          color: '#FFF6D3', textDecoration: 'none',
                          borderBottom: '1px solid rgba(200,150,62,0.3)',
                          transition: 'border-color 0.2s ease',
                          wordBreak: 'break-word',
                        }}
                      >
                        {item.valor}
                      </a>
                    ) : (
                      <p style={{
                        fontFamily: 'var(--font-inter)', fontSize: '14px',
                        color: '#FFF6D3',
                        wordBreak: 'break-word',
                      }}>
                        {item.valor}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {/* Colombia badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '16px 24px',
                borderRadius: '16px',
                background: 'rgba(200,150,62,0.08)',
                border: '1px solid rgba(200,150,62,0.2)',
                marginTop: '4px',
              }}>
                <span style={{ fontSize: '28px', flexShrink: 0 }}>🇨🇴</span>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-inter)', fontWeight: 600,
                    fontSize: '13px', color: '#FFF6D3', marginBottom: '2px',
                  }}>
                    100% Colombiano
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-lora)', fontStyle: 'italic',
                    fontSize: '12px', color: 'rgba(255,246,211,0.45)',
                  }}>
                    Del Huila para el mundo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
