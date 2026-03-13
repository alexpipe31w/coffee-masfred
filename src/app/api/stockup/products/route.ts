import { NextRequest, NextResponse } from 'next/server';
import { stockupFetch } from '@/lib/stockup/client';
import { adaptProduct } from '@/lib/stockup/adapters';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // ─── Sanitizar y validar parámetros ───────────────────
    const featured   = searchParams.get('featured') === 'true';
    const limit      = Math.min(
      Math.max(parseInt(searchParams.get('limit') || '20'), 1),
      100, // máximo permitido por Stockup
    );
    const page       = Math.max(parseInt(searchParams.get('page') || '1'), 1);
    const categoryId = searchParams.get('categoryId');
    const search     = searchParams.get('search');

    // ─── Construir query hacia Stockup ────────────────────
    const query = new URLSearchParams();
    query.set('isActive', 'true');
    query.set('limit', String(limit));
    query.set('page',  String(page));
    if (featured)   query.set('featured', 'true');
    if (categoryId) query.set('categoryId', categoryId);
    // search se ignora si featured=true (comportamiento de Stockup)
    if (search && !featured) query.set('search', search);

    const data = await stockupFetch<any>(
      `/products?${query}`,
      {},
      60, // revalidate 60s
    );

    const products = (data.data ?? []).map(adaptProduct);

    return NextResponse.json(
      { products, meta: data.meta ?? {} },
      {
        headers: {
          'Cache-Control': 's-maxage=60, stale-while-revalidate=120',
        },
      },
    );
  } catch (error) {
    console.error('[API /products] Error:', error);
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 },
    );
  }
}