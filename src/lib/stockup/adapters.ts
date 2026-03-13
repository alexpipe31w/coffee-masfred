import type { Product, Variant, Cart } from './types';

// ─── Variante ─────────────────────────────────────────────
function adaptVariant(raw: any): Variant {
  return {
    id: raw.id,
    title: raw.name,
    price: {
      amount: parseFloat(raw.price).toFixed(2),
      currencyCode: 'COP',
    },
    availableForSale: raw.isActive === true && raw.stock > 0,
    sku: raw.sku ?? '',
  };
}

// ─── Producto ─────────────────────────────────────────────
export function adaptProduct(raw: any): Product {
  const activeVariants = (raw.variants ?? []).filter(
    (v: any) => v.isActive === true,
  );

  // Precio mínimo entre variantes activas (o precio base)
  const prices = activeVariants.map((v: any) =>
    parseFloat(v.price ?? raw.price),
  );
  const minPrice = prices.length
    ? prices.reduce((a: number, b: number) => Math.min(a, b))
    : parseFloat(raw.price);

  return {
    id: raw.id,
    title: raw.name,
    description: raw.description || '',
    price: { amount: minPrice.toFixed(2), currencyCode: 'COP' },
    featuredImage: raw.images?.[0]
      ? { url: raw.images[0], width: 800, height: 800 }
      : null,
    images: (raw.images ?? []).map((url: string) => ({
      url,
      width: 800,
      height: 800,
    })),
    variants: activeVariants.map(adaptVariant),
    availableForSale: raw.isActive === true && raw.stock > 0,
    hasVariants: raw.hasVariants === true,
  };
}

// ─── Carrito ──────────────────────────────────────────────
function buildCheckoutUrl(cart: any): string {
  const slug  = process.env.NEXT_PUBLIC_STOCKUP_TENANT_SLUG!;
  const base  = process.env.NEXT_PUBLIC_STOCKUP_URL!;
  const items = cart?.items ?? [];

  if (!items.length || !cart?.sessionId) return '';

  const url = new URL(
    `${base}/checkout/${slug}/${items[0].productId}`,
  );
  url.searchParams.append('cartSessionId', cart.sessionId);
  return url.toString();
}

export function adaptCart(raw: any): Cart {
  return {
    id: raw?.id ?? '',
    lines: (raw?.items ?? []).map((item: any) => ({
      id: item.id,
      quantity: item.quantity,
      cost: {
        totalAmount: {
          amount: (parseFloat(item.price) * item.quantity).toFixed(2),
          currencyCode: 'COP',
        },
      },
      merchandise: {
        id: item.variantId ?? item.productId,
        title: item.variant?.name ?? 'Default',
        product: {
          id: item.productId,
          title: item.product?.name ?? '',
          featuredImage: item.product?.images?.[0]
            ? { url: item.product.images[0], width: 200, height: 200 }
            : null,
        },
      },
    })),
    cost: {
      totalAmount: {
        amount: parseFloat(raw?.totalValue ?? '0').toFixed(2),
        currencyCode: 'COP',
      },
    },
    checkoutUrl: buildCheckoutUrl(raw),
  };
}