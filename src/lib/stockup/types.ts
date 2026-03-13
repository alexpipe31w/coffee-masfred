// Tipos internos de la app — independientes de Stockup

export interface Variant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: 'COP' };
  availableForSale: boolean;
  sku: string;
  image: { url: string; width: number; height: number } | null; // ← nuevo
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: { amount: string; currencyCode: 'COP' };
  featuredImage: { url: string; width: number; height: number } | null;
  images: { url: string; width: number; height: number }[];
  variants: Variant[];
  availableForSale: boolean;
  hasVariants: boolean;
}

export interface CartLine {
  id: string;
  quantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: 'COP' };
  };
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      title: string;
      featuredImage: { url: string; width: number; height: number } | null;
    };
  };
}

export interface Cart {
  id: string;
  lines: CartLine[];
  cost: {
    totalAmount: { amount: string; currencyCode: 'COP' };
  };
  checkoutUrl: string;
}