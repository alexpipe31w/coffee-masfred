'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart } from '@/lib/stockup/types';

// ─── SessionId ────────────────────────────────────────────
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
              price,
            }),
          });

          if (!res.ok) throw new Error(`Cart error: ${res.status}`);

          const data = await res.json();
          set({ cart: data, isOpen: true });
        } catch (e) {
          console.error('[Cart] addItem:', e);
          throw e;
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
            body: JSON.stringify({
              cartId: get().cart?.id,  // ← cartId del carrito actual
              itemId: cartItemId,       // ← itemId en vez de cartItemId
              quantity,
            }),
          });

          if (!res.ok) throw new Error(`Cart update error: ${res.status}`);

          const data = await res.json();
          set({ cart: data });
        } finally {
          set({ isLoading: false });
        }
      },

      removeItem: (cartItemId) => get().updateItem(cartItemId, 0),

      openCart:  () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: 'masfred-cart',
      partialize: (state) => ({
        cart: state.cart,
        sessionId: state.sessionId,
      }),
    },
  ),
);