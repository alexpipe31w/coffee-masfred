'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/store/cart';

const formatCOP = (amount: string | number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(Number(amount));

export function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, updateItem, removeItem } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  const lines    = cart?.lines ?? [];
  const total    = cart?.cost?.totalAmount?.amount ?? '0';
  const hasItems = lines.length > 0;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart(); };
    if (isOpen) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeCart]);

  const handleCheckout = () => {
    if (!cart?.checkoutUrl) return;
    window.location.href = cart.checkoutUrl;
  };

  return (
    <>
      <style>{`
        .cart-overlay {
          position: fixed;
          inset: 0;
          z-index: 50;
          background: rgba(61,26,10,0.55);
          backdrop-filter: blur(4px);
          transition: opacity 0.3s ease;
        }
        .cart-overlay.open  { opacity: 1; pointer-events: auto; }
        .cart-overlay.close { opacity: 0; pointer-events: none; }

        .cart-drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          z-index: 51;
          width: 100%;
          max-width: 400px;
          background: #FFF6D3;
          display: flex;
          flex-direction: column;
          box-shadow: -8px 0 40px rgba(61,26,10,0.2);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .cart-drawer.open  { transform: translateX(0); }
        .cart-drawer.close { transform: translateX(100%); }

        .cart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(100,48,24,0.1);
          flex-shrink: 0;
        }
        .cart-header h2 {
          font-family: var(--font-playfair);
          font-weight: 700;
          font-size: 20px;
          color: #643018;
          margin: 0;
        }
        .cart-header p {
          font-family: var(--font-inter);
          font-size: 12px;
          color: rgba(61,26,10,0.5);
          margin: 3px 0 0;
        }
        .cart-close-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(100,48,24,0.07);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #643018;
          transition: background 0.2s ease;
          flex-shrink: 0;
        }
        .cart-close-btn:hover { background: rgba(100,48,24,0.15); }

        .cart-body {
          flex: 1;
          overflow-y: auto;
          overscroll-behavior: contain;
        }
        .cart-body::-webkit-scrollbar { width: 4px; }
        .cart-body::-webkit-scrollbar-track { background: transparent; }
        .cart-body::-webkit-scrollbar-thumb { background: rgba(100,48,24,0.15); border-radius: 4px; }

        /* Estado vacío */
        .cart-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 48px 24px;
          text-align: center;
        }
        .cart-empty-icon { font-size: 52px; margin-bottom: 16px; }
        .cart-empty h3 {
          font-family: var(--font-playfair);
          font-weight: 700;
          font-size: 18px;
          color: #643018;
          margin: 0 0 8px;
        }
        .cart-empty p {
          font-family: var(--font-inter);
          font-size: 13px;
          color: rgba(61,26,10,0.5);
          margin: 0 0 24px;
          line-height: 1.6;
        }
        .cart-empty-btn {
          padding: 10px 28px;
          border-radius: 99px;
          background: #643018;
          color: #FFF6D3;
          font-family: var(--font-inter);
          font-weight: 600;
          font-size: 13px;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .cart-empty-btn:hover { background: #8B4513; }

        /* Items */
        .cart-items { list-style: none; margin: 0; padding: 0; }
        .cart-item {
          display: flex;
          gap: 14px;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(100,48,24,0.07);
          align-items: flex-start;
        }
        .cart-item-img {
          position: relative;
          width: 72px;
          height: 72px;
          border-radius: 12px;
          overflow: hidden;
          background: linear-gradient(135deg, #643018 0%, #3D1A0A 100%);
          flex-shrink: 0;
        }
        .cart-item-info {
          flex: 1;
          min-width: 0;
        }
        .cart-item-name {
          font-family: var(--font-playfair);
          font-weight: 700;
          font-size: 14px;
          color: #643018;
          margin: 0 0 3px;
          /* permitir wrap en nombres largos */
          white-space: normal;
          word-break: break-word;
          line-height: 1.3;
        }
        .cart-item-variant {
          font-family: var(--font-inter);
          font-size: 11px;
          color: rgba(61,26,10,0.45);
          margin: 0 0 6px;
        }
        .cart-item-price {
          font-family: var(--font-inter);
          font-weight: 700;
          font-size: 15px;
          color: #643018;
          margin: 0;
        }
        .cart-item-controls {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-between;
          gap: 10px;
          flex-shrink: 0;
        }
        .cart-remove-btn {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid rgba(100,48,24,0.15);
          color: rgba(61,26,10,0.4);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .cart-remove-btn:hover {
          background: #fee2e2;
          border-color: #fca5a5;
          color: #dc2626;
        }
        .cart-remove-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .cart-qty {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1px solid rgba(100,48,24,0.12);
          border-radius: 99px;
          padding: 3px 6px;
        }
        .cart-qty-btn {
          width: 24px; height: 24px;
          border-radius: 50%;
          background: transparent;
          border: none;
          color: #643018;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.15s ease;
          line-height: 1;
        }
        .cart-qty-btn:hover:not(:disabled) { background: rgba(100,48,24,0.1); }
        .cart-qty-btn:disabled { opacity: 0.35; cursor: not-allowed; }
        .cart-qty-num {
          font-family: var(--font-inter);
          font-weight: 600;
          font-size: 14px;
          color: #3D1A0A;
          min-width: 18px;
          text-align: center;
        }

        /* Footer */
        .cart-footer {
          border-top: 1px solid rgba(100,48,24,0.1);
          padding: 20px 24px;
          background: #fff;
          flex-shrink: 0;
        }
        .cart-subtotal {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .cart-subtotal-label {
          font-family: var(--font-inter);
          font-size: 13px;
          color: rgba(61,26,10,0.55);
        }
        .cart-subtotal-value {
          font-family: var(--font-playfair);
          font-weight: 700;
          font-size: 20px;
          color: #643018;
        }
        .cart-shipping-note {
          font-family: var(--font-inter);
          font-size: 11px;
          color: rgba(61,26,10,0.4);
          text-align: center;
          margin: 0 0 16px;
        }
        .cart-checkout-btn {
          width: 100%;
          padding: 14px;
          border-radius: 99px;
          background: linear-gradient(135deg, #643018 0%, #3D1A0A 100%);
          color: #FFF6D3;
          font-family: var(--font-inter);
          font-weight: 700;
          font-size: 15px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 16px rgba(100,48,24,0.3);
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
          margin-bottom: 12px;
        }
        .cart-checkout-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(100,48,24,0.4);
        }
        .cart-checkout-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .cart-secure {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-family: var(--font-inter);
          font-size: 11px;
          color: rgba(61,26,10,0.4);
        }

        /* Skeleton */
        .cart-skeleton { padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; }
        .cart-skeleton-item { display: flex; gap: 14px; }
        .cart-skeleton-img { width: 72px; height: 72px; border-radius: 12px; background: rgba(100,48,24,0.08); flex-shrink: 0; animation: skeletonPulse 1.5s ease-in-out infinite; }
        .cart-skeleton-lines { flex: 1; display: flex; flex-direction: column; gap: 8px; padding-top: 4px; }
        .cart-skeleton-line { height: 12px; border-radius: 6px; background: rgba(100,48,24,0.08); animation: skeletonPulse 1.5s ease-in-out infinite; }
        @keyframes skeletonPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }

        @media (max-width: 480px) {
          .cart-drawer { max-width: 100%; }
          .cart-item { padding: 14px 16px; gap: 12px; }
          .cart-header { padding: 16px 18px; }
          .cart-footer { padding: 16px 18px; }
        }
      `}</style>

      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? 'open' : 'close'}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Tu carrito de compras"
        className={`cart-drawer ${isOpen ? 'open' : 'close'}`}
      >

        {/* Header */}
        <div className="cart-header">
          <div>
            <h2>Tu Carrito</h2>
            {hasItems && (
              <p>{lines.reduce((a, l) => a + l.quantity, 0)} producto(s)</p>
            )}
          </div>
          <button className="cart-close-btn" onClick={closeCart} aria-label="Cerrar carrito">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="cart-body">

          {/* Vacío */}
          {!hasItems && !isLoading && (
            <div className="cart-empty">
              <div className="cart-empty-icon">☕</div>
              <h3>Tu carrito está vacío</h3>
              <p>Aún no has agregado ningún café</p>
              <button className="cart-empty-btn" onClick={closeCart}>
                Ver Nuestros Cafés
              </button>
            </div>
          )}

          {/* Skeleton */}
          {isLoading && !hasItems && (
            <div className="cart-skeleton">
              {[1, 2].map(i => (
                <div key={i} className="cart-skeleton-item">
                  <div className="cart-skeleton-img" />
                  <div className="cart-skeleton-lines">
                    <div className="cart-skeleton-line" style={{ width: '70%' }} />
                    <div className="cart-skeleton-line" style={{ width: '45%' }} />
                    <div className="cart-skeleton-line" style={{ width: '30%' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Items */}
          {hasItems && (
            <ul className="cart-items" role="list">
              {lines.map((line) => (
                <li key={line.id} className="cart-item">

                  {/* Imagen */}
                  <div className="cart-item-img">
                    {line.merchandise.product.featuredImage ? (
                      <Image
                        src={line.merchandise.product.featuredImage.url}
                        alt={line.merchandise.product.title}
                        fill
                        style={{ objectFit: 'contain', padding: '6px' }}
                        sizes="72px"
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
                        ☕
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="cart-item-info">
                    <p className="cart-item-name">{line.merchandise.product.title}</p>
                    <p className="cart-item-variant">{line.merchandise.title}</p>
                    <p className="cart-item-price">{formatCOP(line.cost.totalAmount.amount)}</p>
                  </div>

                  {/* Controles */}
                  <div className="cart-item-controls">
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeItem(line.id)}
                      disabled={isLoading}
                      aria-label={`Eliminar ${line.merchandise.product.title}`}
                    >
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>

                    <div className="cart-qty">
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateItem(line.id, line.quantity - 1)}
                        disabled={isLoading}
                        aria-label="Reducir cantidad"
                      >
                        −
                      </button>
                      <span className="cart-qty-num">{line.quantity}</span>
                      <button
                        className="cart-qty-btn"
                        onClick={() => updateItem(line.id, line.quantity + 1)}
                        disabled={isLoading}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {hasItems && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span className="cart-subtotal-label">Subtotal</span>
              <span className="cart-subtotal-value">{formatCOP(total)}</span>
            </div>
            <p className="cart-shipping-note">Envíos y descuentos calculados en el checkout</p>

            <button
              className="cart-checkout-btn"
              onClick={handleCheckout}
              disabled={isLoading || !cart?.checkoutUrl}
            >
              {isLoading ? (
                <>
                  <span style={{
                    width: '16px', height: '16px', borderRadius: '50%',
                    border: '2px solid rgba(255,246,211,0.3)',
                    borderTopColor: '#FFF6D3',
                    animation: 'spin 0.7s linear infinite',
                    display: 'inline-block',
                  }} />
                  Procesando...
                </>
              ) : (
                <>
                  Ir a Pagar
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </>
              )}
            </button>

            <div className="cart-secure">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              Pago 100% seguro vía Stockup
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
