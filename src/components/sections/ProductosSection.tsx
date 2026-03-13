'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/store/cart';
import type { Product } from '@/lib/stockup/types';

const formatCOP = (n: string | number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(Number(n));

// ─── SVG íconos ───────────────────────────────────────────
const IconCart = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>
);
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconLoading = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
    </path>
  </svg>
);

type AddState = 'idle' | 'loading' | 'success';

// ─── ProductCard ──────────────────────────────────────────
function ProductCard({ producto }: { producto: Product }) {
  const firstVariant = producto.variants[0];
  const [varianteId, setVarianteId] = useState<string | null>(
    firstVariant?.id ?? null,
  );
  const [addState, setAddState] = useState<AddState>('idle');
  const { addItem } = useCart();

  const varianteActual = producto.variants.find(v => v.id === varianteId);
  const precioActual   = varianteActual
    ? varianteActual.price.amount
    : producto.price.amount;

  const disponible = varianteActual
    ? varianteActual.availableForSale
    : producto.availableForSale;

  const handleAddToCart = async () => {
    if (addState !== 'idle' || !disponible) return;
    setAddState('loading');
    try {
      await addItem(
        producto.id,
        producto.hasVariants ? varianteId : null,
        1,
        parseFloat(precioActual),
      );
      setAddState('success');
      setTimeout(() => setAddState('idle'), 2000);
    } catch {
      setAddState('idle');
    }
  };

  const btnConfig = {
    idle:    { label: 'Agregar al carrito', bg: '#643018', icon: <IconCart /> },
    loading: { label: 'Agregando...',        bg: '#8B4513', icon: <IconLoading /> },
    success: { label: '¡Agregado!',          bg: '#AAC071', icon: <IconCheck /> },
  }[addState];

  return (
    <article
      style={{
        borderRadius: '24px', overflow: 'hidden',
        border: '1px solid rgba(100,48,24,0.1)',
        boxShadow: '0 4px 20px rgba(100,48,24,0.08)',
        background: '#fff',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        display: 'flex', flexDirection: 'column',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(100,48,24,0.18)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(100,48,24,0.08)';
      }}
    >
      {/* ─── Imagen ───────────────────────────────── */}
      <div style={{
        position: 'relative', height: '220px',
        background: 'linear-gradient(135deg, #643018 0%, #3D1A0A 100%)',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {producto.featuredImage ? (
          <Image
            src={producto.featuredImage.url}
            alt={producto.title}
            fill
            style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: 'rgba(255,246,211,0.08)',
              border: '2px solid rgba(200,150,62,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 10px',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(200,150,62,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
                <line x1="6" y1="1" x2="6" y2="4"/>
                <line x1="10" y1="1" x2="10" y2="4"/>
                <line x1="14" y1="1" x2="14" y2="4"/>
              </svg>
            </div>
            <span style={{
              fontFamily: 'var(--font-playfair)', fontSize: '12px',
              color: 'rgba(255,246,211,0.35)', fontStyle: 'italic',
            }}>
              Imagen próximamente
            </span>
          </div>
        )}

        {/* Badge disponibilidad */}
        <div style={{
          position: 'absolute', top: '14px', right: '14px',
          padding: '4px 10px', borderRadius: '99px',
          background: disponible ? 'rgba(170,192,113,0.2)' : 'rgba(0,0,0,0.3)',
          border: `1px solid ${disponible ? 'rgba(170,192,113,0.5)' : 'rgba(255,255,255,0.1)'}`,
          color: disponible ? '#AAC071' : 'rgba(255,255,255,0.4)',
          fontSize: '10px', fontFamily: 'var(--font-inter)', fontWeight: 600,
          backdropFilter: 'blur(8px)',
        }}>
          {disponible ? '● Disponible' : '● Agotado'}
        </div>
      </div>

      {/* ─── Body ─────────────────────────────────── */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>

        <h3 style={{
          fontFamily: 'var(--font-playfair)', fontWeight: 700,
          fontSize: '20px', color: '#643018', lineHeight: 1.25,
          marginBottom: '8px',
        }}>
          {producto.title}
        </h3>

        {producto.description && (
          <p style={{
            fontFamily: 'var(--font-lora)', fontStyle: 'italic',
            fontSize: '13px', color: 'rgba(61,26,10,0.68)',
            lineHeight: 1.7, marginBottom: '16px',
          }}>
            {producto.description}
          </p>
        )}

        {/* Selector variante */}
        {producto.hasVariants && producto.variants.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <p style={{
              fontSize: '10px', fontFamily: 'var(--font-inter)',
              color: 'rgba(61,26,10,0.4)', textTransform: 'uppercase',
              letterSpacing: '0.1em', marginBottom: '8px',
            }}>
              Presentación
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {producto.variants.map((v) => {
                const selected = v.id === varianteId;
                return (
                  <button
                    key={v.id}
                    onClick={() => setVarianteId(v.id)}
                    disabled={!v.availableForSale}
                    style={{
                      padding: '7px 16px', borderRadius: '99px',
                      fontSize: '12px', fontFamily: 'var(--font-inter)',
                      fontWeight: 500, cursor: v.availableForSale ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s ease',
                      background: selected ? '#643018' : 'transparent',
                      color: selected ? '#FFF6D3' : v.availableForSale ? '#643018' : 'rgba(100,48,24,0.3)',
                      border: `1px solid ${selected ? '#643018' : v.availableForSale ? 'rgba(100,48,24,0.3)' : 'rgba(100,48,24,0.1)'}`,
                      opacity: v.availableForSale ? 1 : 0.5,
                    }}
                  >
                    {v.title}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Precio + Botón */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto', gap: '12px',
          // En vez de flexWrap que rompe el layout, dejamos que el botón
          // se encoja si hace falta — flex-shrink está permitido por defecto
        }}>
          <div style={{ flexShrink: 0 }}>
            <p style={{
              fontSize: '10px', fontFamily: 'var(--font-inter)',
              color: 'rgba(61,26,10,0.4)', textTransform: 'uppercase',
              letterSpacing: '0.1em', marginBottom: '2px',
            }}>
              Precio
            </p>
            <p style={{
              fontFamily: 'var(--font-playfair)', fontWeight: 700,
              fontSize: 'clamp(18px, 4vw, 22px)', color: '#643018', lineHeight: 1,
            }}>
              {formatCOP(precioActual)}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={addState !== 'idle' || !disponible}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '11px 18px', borderRadius: '99px',
              background: !disponible ? 'rgba(100,48,24,0.2)' : btnConfig.bg,
              color: '#FFF6D3',
              fontFamily: 'var(--font-inter)', fontWeight: 600,
              fontSize: '13px', border: 'none',
              cursor: addState !== 'idle' || !disponible ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s ease, transform 0.2s ease',
              boxShadow: disponible ? '0 4px 16px rgba(100,48,24,0.25)' : 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              if (addState === 'idle' && disponible)
                (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            {!disponible ? 'Agotado' : (
              <>{btnConfig.icon}{btnConfig.label}</>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Sección principal ────────────────────────────────────
export function ProductosSection({ productos }: { productos: Product[] }) {
  return (
    <section
      id="productos"
      style={{
        background: 'linear-gradient(180deg, #FFF6D3 0%, #fff8e8 100%)',
        padding: 'clamp(48px, 8vw, 80px) 0',
        position: 'relative', overflow: 'hidden',
      }}
      aria-labelledby="productos-titulo"
    >
      {/* Fondo sutil */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, opacity: 0.025, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #643018 1.5px, transparent 1.5px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        // clamp: mínimo 16px en móvil, ideal 5vw, máximo 24px en desktop
        padding: '0 clamp(16px, 5vw, 24px)',
        position: 'relative', zIndex: 1,
      }}>

        {/* ─── Título ─────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(36px, 6vw, 56px)' }}>
          <span style={{
            display: 'block', fontSize: '11px', fontFamily: 'var(--font-inter)',
            fontWeight: 600, letterSpacing: '0.4em', color: '#AAC071',
            textTransform: 'uppercase', marginBottom: '12px',
          }}>
            Nuestros Cafés
          </span>
          <h2
            id="productos-titulo"
            style={{
              fontFamily: 'var(--font-playfair)', fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: '#643018',
              marginBottom: '16px', lineHeight: 1.2,
            }}
          >
            Dos Orígenes, Un Solo Amor
          </h2>
          <p style={{
            fontFamily: 'var(--font-lora)', fontStyle: 'italic',
            color: 'rgba(61,26,10,0.65)', fontSize: 'clamp(14px, 2vw, 17px)',
            maxWidth: '440px', margin: '0 auto', lineHeight: 1.7,
          }}>
            Cuatro formas de disfrutar lo mejor del Huila
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '24px' }}>
            <div style={{ width: '64px', height: '1px', background: 'rgba(100,48,24,0.2)' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C8963E' }} />
            <div style={{ width: '64px', height: '1px', background: 'rgba(100,48,24,0.2)' }} />
          </div>
        </div>

        {/* ─── Grid productos ─────────────────────── */}
        {productos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{
              fontFamily: 'var(--font-lora)', fontStyle: 'italic',
              color: 'rgba(61,26,10,0.4)', fontSize: '16px',
            }}>
              Cargando productos...
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            // min(100%, 320px) evita que la columna mínima supere el ancho disponible
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(20px, 4vw, 32px)',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            {productos.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        )}

        {/* ─── Info envíos ────────────────────────── */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
          gap: '12px', marginTop: 'clamp(32px, 5vw, 48px)',
        }}>
          {[
            { icon: '🚚', texto: 'Envíos a toda Colombia'        },
            { icon: '☕', texto: 'Fresco del tostador'           },
            { icon: '📦', texto: '500g con válvula resellable'   },
          ].map((item) => (
            <div
              key={item.texto}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 18px', borderRadius: '99px',
                background: 'rgba(100,48,24,0.05)',
                border: '1px solid rgba(100,48,24,0.1)',
                fontSize: '13px', fontFamily: 'var(--font-inter)', color: '#3D1A0A',
                whiteSpace: 'nowrap',
              }}
            >
              <span>{item.icon}</span>
              <span>{item.texto}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
