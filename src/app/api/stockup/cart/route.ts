import { NextRequest, NextResponse } from 'next/server';
import { stockupFetch } from '@/lib/stockup/client';
import { adaptCart } from '@/lib/stockup/adapters';

async function getVerifiedPrice(
  productId: string,
  variantId?: string | null,
): Promise<number | null> {
  try {
    const data = await stockupFetch<any>(`/products/${productId}`, {}, 30);
    const product = data.data;
    if (!product) return null;
    if (variantId) {
      const variant = product.variants?.find(
        (v: any) => v.id === variantId && v.isActive === true,
      );
      return variant ? parseFloat(variant.price ?? product.price) : null;
    }
    return parseFloat(product.price);
  } catch {
    return null;
  }
}

function isValidUUID(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, productId, variantId, quantity, price: clientPrice } = body;

    if (!sessionId || !productId || !quantity) {
      return NextResponse.json(
        { error: 'Campos requeridos: sessionId, productId, quantity' },
        { status: 400 },
      );
    }

    if (!isValidUUID(sessionId) || !isValidUUID(productId)) {
      return NextResponse.json({ error: 'Formato de ID inválido' }, { status: 400 });
    }

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < 1 || qty > 99) {
      return NextResponse.json({ error: 'Cantidad inválida' }, { status: 400 });
    }

    if (variantId && !isValidUUID(variantId)) {
      return NextResponse.json({ error: 'Formato de variantId inválido' }, { status: 400 });
    }

    const verifiedPrice = await getVerifiedPrice(productId, variantId);
    if (verifiedPrice === null) {
      return NextResponse.json({ error: 'Producto no disponible' }, { status: 422 });
    }

    if (clientPrice && Math.abs(clientPrice - verifiedPrice) > 0.01) {
      console.warn(`[SECURITY] Price mismatch — productId: ${productId} | client: ${clientPrice} | real: ${verifiedPrice}`);
    }

    const data = await stockupFetch<any>('/cart', {
      method: 'POST',
      body: JSON.stringify({
        sessionId,
        productId,
        variantId: variantId ?? null,
        quantity: qty,
        price: verifiedPrice,
      }),
    });

    return NextResponse.json(adaptCart(data.data));
  } catch (error) {
    console.error('[API /cart POST] Error:', error);
    return NextResponse.json({ error: 'Error al agregar al carrito' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { cartId, itemId, quantity } = body;

    if (!cartId || !itemId) {
      return NextResponse.json({ error: 'cartId e itemId son requeridos' }, { status: 400 });
    }

    if (!isValidUUID(cartId) || !isValidUUID(itemId)) {
      return NextResponse.json({ error: 'Formato de ID inválido' }, { status: 400 });
    }

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < 0 || qty > 99) {
      return NextResponse.json({ error: 'Cantidad inválida' }, { status: 400 });
    }

    const data = await stockupFetch<any>('/cart', {
      method: 'PATCH',
      body: JSON.stringify({ cartId, itemId, quantity: qty }),
    });

    return NextResponse.json(adaptCart(data.data));
  } catch (error) {
    console.error('[API /cart PATCH] Error:', error);
    return NextResponse.json({ error: 'Error al actualizar carrito' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const sessionId = searchParams.get('sessionId');

    if (!sessionId || !isValidUUID(sessionId)) {
      return NextResponse.json({ error: 'sessionId inválido' }, { status: 400 });
    }

    const data = await stockupFetch<any>(`/cart?sessionId=${sessionId}`, {}, 0);
    return NextResponse.json(adaptCart(data.data));
  } catch (error) {
    console.error('[API /cart GET] Error:', error);
    return NextResponse.json({ error: 'Error al obtener carrito' }, { status: 500 });
  }
}