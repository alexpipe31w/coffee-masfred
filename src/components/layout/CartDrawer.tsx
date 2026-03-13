'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useCart } from '@/lib/store/cart';

// Formatear precio COP
const formatCOP = (amount: string | number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(Number(amount));

export function CartDrawer() {
  const { cart, isOpen, isLoading, closeCart, updateItem, removeItem } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  const lines     = cart?.lines ?? [];
  const total     = cart?.cost?.totalAmount?.amount ?? '0';
  const hasItems  = lines.length > 0;

  // Cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
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
      {/* ─── Overlay ──────────────────────────────── */}
      <div
        className={`
          fixed inset-0 z-50 bg-tierra/60 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* ─── Drawer ───────────────────────────────── */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Tu carrito de compras"
        className={`
          fixed top-0 right-0 bottom-0 z-50
          w-full max-w-sm
          bg-crema flex flex-col
          shadow-cafe-lg
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >

        {/* ─── Header ─────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cafe/10">
          <div>
            <h2 className="font-display text-lg font-semibold text-cafe">
              Tu Carrito
            </h2>
            {hasItems && (
              <p className="text-xs text-tierra/60 font-body mt-0.5">
                {lines.reduce((a, l) => a + l.quantity, 0)} producto(s)
              </p>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="
              p-2 rounded-full text-cafe
              hover:bg-cafe/10 transition-colors duration-200
            "
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ─── Body ───────────────────────────────── */}
        <div className="flex-1 overflow-y-auto">

          {/* Estado vacío */}
          {!hasItems && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
              <div className="text-6xl mb-4">☕</div>
              <h3 className="font-display text-lg text-cafe mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-sm text-tierra/60 font-body mb-6">
                Aún no has agregado ningún café
              </p>
              <button
                onClick={closeCart}
                className="
                  px-6 py-2.5 rounded-full
                  bg-cafe text-crema text-sm font-medium font-body
                  hover:bg-cafe-lt transition-colors duration-200
                "
              >
                Ver Nuestros Cafés
              </button>
            </div>
          )}

          {/* Loading skeleton */}
          {isLoading && !hasItems && (
            <div className="p-6 space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4 animate-pulse">
                  <div className="w-16 h-16 rounded-xl bg-cafe/10 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-cafe/10 rounded w-3/4" />
                    <div className="h-3 bg-cafe/10 rounded w-1/2" />
                    <div className="h-4 bg-cafe/10 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Lista de items */}
          {hasItems && (
            <ul className="divide-y divide-cafe/10" role="list">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 p-5">

                  {/* Imagen producto */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-cafe/10 shrink-0">
                    {line.merchandise.product.featuredImage ? (
                      <Image
                        src={line.merchandise.product.featuredImage.url}
                        alt={line.merchandise.product.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        ☕
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-sm text-tierra truncate">
                      {line.merchandise.product.title}
                    </p>
                    <p className="text-xs text-tierra/60 font-body mt-0.5">
                      {line.merchandise.title}
                    </p>
                    <p className="font-body font-semibold text-sm text-cafe mt-1">
                      {formatCOP(line.cost.totalAmount.amount)}
                    </p>
                  </div>

                  {/* Controles cantidad */}
                  <div className="flex flex-col items-end justify-between shrink-0">

                    {/* Botón eliminar */}
                    <button
                      onClick={() => removeItem(line.id)}
                      disabled={isLoading}
                      aria-label={`Eliminar ${line.merchandise.product.title}`}
                      className="
                        p-1 rounded text-tierra/40
                        hover:text-red-500 hover:bg-red-50
                        transition-colors duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed
                      "
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* +/- cantidad */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateItem(line.id, line.quantity - 1)}
                        disabled={isLoading}
                        aria-label="Reducir cantidad"
                        className="
                          w-6 h-6 rounded-full border border-cafe/30
                          flex items-center justify-center
                          text-cafe text-sm font-bold
                          hover:bg-cafe hover:text-crema hover:border-cafe
                          transition-all duration-200
                          disabled:opacity-50 disabled:cursor-not-allowed
                        "
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-sm font-medium font-body text-tierra">
                        {line.quantity}
                      </span>
                      <button
                        onClick={() => updateItem(line.id, line.quantity + 1)}
                        disabled={isLoading}
                        aria-label="Aumentar cantidad"
                        className="
                          w-6 h-6 rounded-full border border-cafe/30
                          flex items-center justify-center
                          text-cafe text-sm font-bold
                          hover:bg-cafe hover:text-crema hover:border-cafe
                          transition-all duration-200
                          disabled:opacity-50 disabled:cursor-not-allowed
                        "
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

        {/* ─── Footer con total + checkout ────────── */}
        {hasItems && (
          <div className="border-t border-cafe/10 p-6 space-y-4">

            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-tierra/70">Subtotal</span>
              <span className="font-body font-semibold text-tierra text-sm">
                {formatCOP(total)}
              </span>
            </div>

            <p className="text-xs text-tierra/50 font-body text-center">
              Envíos y descuentos calculados en el checkout
            </p>

            {/* Botón checkout */}
            <button
              onClick={handleCheckout}
              disabled={isLoading || !cart?.checkoutUrl}
              className="
                w-full py-3.5 rounded-full
                bg-cafe text-crema
                font-body font-semibold text-sm
                flex items-center justify-center gap-2
                hover:bg-cafe-lt hover:scale-[1.02]
                active:scale-[0.97]
                transition-all duration-200
                shadow-cafe-md
                disabled:opacity-50 disabled:cursor-not-allowed
                disabled:hover:scale-100
              "
            >
              {isLoading ? (
                <>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-crema/40 border-t-crema rounded-full" />
                  Procesando...
                </>
              ) : (
                <>
                  Ir a Pagar
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>

            {/* Seguridad */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-tierra/50 font-body">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Pago 100% seguro vía Stockup
            </div>
          </div>
        )}
      </div>
    </>
  );
}