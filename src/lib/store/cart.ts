'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart } from '@/lib/stockup/types';

// ─── SessionId ────────────────────────────────────────────
// Se genera una sola vez y persiste para toda la vida del carrito
const getOrCreateSessionId = (): string => {
  let id = localStorage.getItem('masfred-cart-session');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('masfred-cart-session', id);
  }
  return id;
};

// ─── Tipos del store ──────────────────────────────────────
interface CartStore {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  sessionId: string;
  addItem: (
    productId: string,
    variantId: string | null,
    quantity: number,
    price: number,
  ) => Promise<void>;
  updateItem: (cartItemId: string, quantity: number) => Promise<void>;
  removeItem: (cartItemId: string) => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
}

// ─── Store ────────────────────────────────────────────────
export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      isOpen: false,
      isLoading: false,
      // typeof window guard para SSR
      sessionId:
        typeof window !== 'undefined' ? getOrCreateSessionId() : '',

      addItem: async (productId, variantId, quantity, price) => {
        set({ isLoading: true });
        try {
          const res = await fetch('/api/stockup/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              sessionId: get().sessionId,
              productId,
              variantId,
              quantity,
              price, // referencial — el servidor siempre verifica
            }),
          });

          if (!res.ok) throw new Error(`Cart error: ${res.status}`);

          const data = await res.json();
          set({ cart: data, isOpen: true });
        } catch (e) {
          console.error('[Cart] addItem:', e);
          throw e; // re-throw para que el componente muestre el error
        } finally {
          set({ isLoading: false });
        }
      },

      updateItem: async (cartItemId, quantity) => {
        set({ isLoading: true });
        try {
          const res = await fetch('/api/stockup/cart', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItemId, quantity }),
          });

          if (!res.ok) throw new Error(`Cart update error: ${res.status}`);

          const data = await res.json();
          set({ cart: data });
        } finally {
          set({ isLoading: false });
        }
      },

      // quantity: 0 elimina el item (no hay endpoint DELETE en Stockup)
      removeItem: (cartItemId) => get().updateItem(cartItemId, 0),

      openCart:  () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: 'masfred-cart',
      // Solo persistir cart y sessionId — no estados de UI
      partialize: (state) => ({
        cart: state.cart,
        sessionId: state.sessionId,
      }),
    },
  ),
);
