// Solo se ejecuta en el servidor — NUNCA importar en Client Components
const BASE_URL = process.env.STOCKUP_API_URL!;
const API_KEY  = process.env.STOCKUP_API_KEY!;

if (!BASE_URL || !API_KEY) {
  throw new Error('[Stockup] Faltan variables de entorno: STOCKUP_API_URL o STOCKUP_API_KEY');
}

export async function stockupFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  revalidate = 60,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
      ...options.headers,
    },
    // Solo cachear GETs — mutaciones nunca
    next: options.method && options.method !== 'GET'
      ? undefined
      : { revalidate },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Stockup error ${res.status}`);
  }

  return res.json();
}