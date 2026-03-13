'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type Categoria = 'todos' | 'recetas' | 'proceso' | 'origen';

const POSTS = [
  {
    id: 1,
    categoria: 'recetas' as Categoria,
    categoriaLabel: 'Receta',
    categoriaColor: '#C8963E',
    titulo: 'Café Frío en Casa — Cold Brew 24h',
    descripcion: 'La forma más suave de disfrutar el Guadalupe. Sin calor, sin amargura, solo la dulzura natural del proceso natural.',
    tiempo: '10 min + 24h reposo',
    dificultad: 'Fácil',
    imagen: '/images/coldbrew.png',
    pasos: [
      'Muele 80g de café Guadalupe en molido grueso.',
      'Mezcla con 1 litro de agua fría en un frasco de vidrio.',
      'Tapa y refrigera 18–24 horas.',
      'Filtra con papel de filtro o tela fina.',
      'Sirve sobre hielo. Puedes agregar leche o tomarla sola.',
    ],
    fecha: 'Marzo 2025',
    lectura: '3 min',
  },
  {
    id: 2,
    categoria: 'recetas' as Categoria,
    categoriaLabel: 'Receta',
    categoriaColor: '#C8963E',
    titulo: 'Espresso en Casa sin Máquina — Moka Pot',
    descripcion: 'Con una moka italiana y el Isnos fermentado, puedes tener un espresso potente y aromático en minutos.',
    tiempo: '8 min',
    dificultad: 'Media',
    imagen: '/images/moka.png',
    pasos: [
      'Llena la cámara inferior con agua hasta la válvula.',
      'Pon 20g de Isnos molido fino en el filtro sin apretar.',
      'Ensambla y pon a fuego medio-bajo.',
      'Cuando escuches el borboteo final, retira del fuego.',
      'Sirve de inmediato. El Isnos da notas florales intensas.',
    ],
    fecha: 'Febrero 2025',
    lectura: '4 min',
  },
  {
    id: 3,
    categoria: 'proceso' as Categoria,
    categoriaLabel: 'Proceso',
    categoriaColor: '#AAC071',
    titulo: 'Por Qué el Proceso Natural Cambia Todo',
    descripcion: 'Cuando la cereza se seca completa al sol, los azúcares del fruto se concentran en el grano. Así nace la dulzura del Guadalupe.',
    tiempo: null,
    dificultad: null,
    imagen: '/images/proceso.png',
    pasos: [
      'La cereza madura se cosecha y se extiende en camas africanas.',
      'El sol del Huila (1.700 msnm) seca la fruta durante 20–30 días.',
      'Los azúcares fermentan naturalmente dentro de la cereza.',
      'El resultado: cuerpo pleno, dulzura de fruta y chocolate.',
      'Es el proceso más antiguo del mundo cafetero.',
    ],
    fecha: 'Enero 2025',
    lectura: '5 min',
  },
  {
    id: 4,
    categoria: 'origen' as Categoria,
    categoriaLabel: 'Origen',
    categoriaColor: '#8B4513',
    titulo: 'Guadalupe vs Isnos — ¿Cuál es tu Café?',
    descripcion: 'Dos municipios del sur del Huila, separados por 30km, con perfiles de taza completamente distintos. Te ayudamos a elegir.',
    tiempo: null,
    dificultad: null,
    imagen: '/images/guadalupe-isnos.png',
    pasos: [
      'Guadalupe (1.700m): clima cálido, variedad Catimore, proceso Natural.',
      'Isnos (1.800m): microclima fresco, variedad Caturra, fermentación controlada.',
      'Guadalupe → cuerpo pleno, chocolate, caramelo. Para tomar con leche.',
      'Isnos → acidez brillante, floral, cítrico. Para tomar negro.',
      'Nuestro consejo: empieza con los dos y descubre tu favorito.',
    ],
    fecha: 'Diciembre 2024',
    lectura: '4 min',
  },
  {
    id: 5,
    categoria: 'recetas' as Categoria,
    categoriaLabel: 'Receta',
    categoriaColor: '#C8963E',
    titulo: 'Café de Olla Colombiano — La Receta de la Abuela',
    descripcion: 'Con panela, canela y el Guadalupe molido grueso. La forma en que se tomaba el café en las fincas del Huila.',
    tiempo: '15 min',
    dificultad: 'Fácil',
    imagen: '/images/olla.png',
    pasos: [
      'Hierve 1 litro de agua con 1 rama de canela y 2 cucharadas de panela.',
      'Agrega 4 cucharadas de café Guadalupe molido grueso.',
      'Baja el fuego y deja reposar 5 minutos sin hervir.',
      'Filtra con colador fino.',
      'Sirve en pocillo de barro. Es el sabor de las raíces.',
    ],
    fecha: 'Noviembre 2024',
    lectura: '3 min',
  },
  {
    id: 6,
    categoria: 'proceso' as Categoria,
    categoriaLabel: 'Proceso',
    categoriaColor: '#AAC071',
    titulo: 'Fermentación Controlada — El Secreto del Isnos',
    descripcion: 'La fermentación no es un accidente. Es ciencia aplicada al café para despertar notas que el grano no podría dar de otra forma.',
    tiempo: null,
    dificultad: null,
    imagen: '/images/fermentacion.png',
    pasos: [
      'La cereza se despulpa y el mucílago queda sobre el grano.',
      'Se deja fermentar en tanques entre 24 y 48 horas controladas.',
      'La temperatura y el pH se monitorean constantemente.',
      'La fermentación rompe los azúcares y crea ácidos orgánicos únicos.',
      'El resultado: acidez brillante, notas de durazno y floral.',
    ],
    fecha: 'Octubre 2024',
    lectura: '6 min',
  },
];

const CATEGORIAS: { id: Categoria; label: string }[] = [
  { id: 'todos',   label: 'Todos'   },
  { id: 'recetas', label: 'Recetas' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'origen',  label: 'Origen'  },
];

// ─── Detectar cuántas columnas hay en el grid ────────────────────────────────
function useColumnas(gridRef: React.RefObject<HTMLDivElement | null>, count: number) {
  const [columnas, setColumnas] = useState(3);

  useEffect(() => {
    const calcular = () => {
      if (!gridRef.current) return;
      const items = gridRef.current.children;
      if (items.length < 2) { setColumnas(1); return; }
      // Comparar el top del primer y segundo item real (no paneles)
      const tops = Array.from(items)
        .filter(el => !(el as HTMLElement).dataset.panel)
        .map(el => (el as HTMLElement).getBoundingClientRect().top);
      let cols = 1;
      const firstTop = tops[0];
      for (let i = 1; i < tops.length; i++) {
        if (Math.abs(tops[i] - firstTop) < 4) cols++;
        else break;
      }
      setColumnas(cols);
    };

    calcular();
    const ro = new ResizeObserver(calcular);
    if (gridRef.current) ro.observe(gridRef.current);
    return () => ro.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return columnas;
}

function PostCard({ post, selected, onToggle }: {
  post: typeof POSTS[0];
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      onClick={onToggle}
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        border: `1px solid ${selected ? post.categoriaColor + '60' : 'rgba(100,48,24,0.1)'}`,
        background: selected ? '#fffbf2' : '#fff',
        boxShadow: selected
          ? `0 8px 32px rgba(100,48,24,0.16), inset 0 0 0 1px ${post.categoriaColor}30`
          : '0 2px 16px rgba(100,48,24,0.06)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        if (!selected) {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(100,48,24,0.14)';
        }
      }}
      onMouseLeave={e => {
        if (!selected) {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(100,48,24,0.06)';
        }
      }}
    >
      {/* Imagen */}
      <div style={{
        height: '160px', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f5ead8 0%, #ede0c4 100%)',
      }}>
        {post.imagen ? (
          <Image
            src={post.imagen}
            alt={post.titulo}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(200,150,62,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
            <line x1="6" y1="1" x2="6" y2="4"/>
            <line x1="10" y1="1" x2="10" y2="4"/>
            <line x1="14" y1="1" x2="14" y2="4"/>
          </svg>
        )}
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          padding: '3px 10px', borderRadius: '99px',
          background: `${post.categoriaColor}25`,
          border: `1px solid ${post.categoriaColor}50`,
          color: post.categoriaColor,
          fontSize: '10px', fontFamily: 'var(--font-inter)',
          fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', backdropFilter: 'blur(8px)',
        }}>
          {post.categoriaLabel}
        </div>
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          padding: '3px 8px', borderRadius: '99px',
          background: 'rgba(0,0,0,0.25)',
          color: 'rgba(255,246,211,0.85)',
          fontSize: '10px', fontFamily: 'var(--font-inter)',
          backdropFilter: 'blur(8px)',
        }}>
          {post.lectura}
        </div>
        {/* Flecha apuntando al panel */}
        {selected && (
          <div style={{
            position: 'absolute', bottom: '-1px', left: '50%',
            transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderBottom: `12px solid #fffbf2`,
            filter: 'drop-shadow(0 -2px 2px rgba(100,48,24,0.08))',
          }} />
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', fontFamily: 'var(--font-inter)', color: 'rgba(61,26,10,0.4)' }}>
            {post.fecha}
          </span>
          {post.tiempo && (
            <>
              <span style={{ color: 'rgba(61,26,10,0.2)' }}>·</span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-inter)', color: 'rgba(61,26,10,0.4)' }}>
                ⏱ {post.tiempo}
              </span>
            </>
          )}
          {post.dificultad && (
            <>
              <span style={{ color: 'rgba(61,26,10,0.2)' }}>·</span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-inter)', color: post.categoriaColor, fontWeight: 600 }}>
                {post.dificultad}
              </span>
            </>
          )}
        </div>
        <h3 style={{
          fontFamily: 'var(--font-playfair)', fontWeight: 700,
          fontSize: '15px', color: '#643018', lineHeight: 1.3,
        }}>
          {post.titulo}
        </h3>
        <p style={{
          fontFamily: 'var(--font-lora)', fontStyle: 'italic',
          fontSize: '12px', color: 'rgba(61,26,10,0.6)',
          lineHeight: 1.65, flex: 1,
        }}>
          {post.descripcion}
        </p>
        <span style={{
          fontSize: '12px', fontFamily: 'var(--font-inter)',
          fontWeight: 600, color: post.categoriaColor, marginTop: '4px',
        }}>
          {selected ? 'Cerrar ↑' : 'Leer más →'}
        </span>
      </div>
    </article>
  );
}

function PanelExpandido({ post, onCerrar }: {
  post: typeof POSTS[0];
  onCerrar: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll suave al panel cuando aparece
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, []);

  return (
    <div
      ref={panelRef}
      data-panel="true"
      style={{
        gridColumn: '1 / -1',          // ocupa toda la fila del grid
        borderRadius: '20px',
        background: '#fffbf2',
        border: `1px solid ${post.categoriaColor}40`,
        boxShadow: '0 8px 40px rgba(100,48,24,0.12)',
        padding: 'clamp(20px, 4vw, 32px)',
        position: 'relative',
        animation: 'panelIn 0.28s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <style>{`
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Botón cerrar */}
      <button
        onClick={onCerrar}
        style={{
          position: 'absolute', top: '16px', right: '16px',
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'rgba(100,48,24,0.08)',
          border: '1px solid rgba(100,48,24,0.12)',
          color: '#643018', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', fontWeight: 700,
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(100,48,24,0.15)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(100,48,24,0.08)'; }}
        aria-label="Cerrar"
      >
        ✕
      </button>

      {/* Header */}
      <div style={{ marginBottom: '24px', paddingRight: '48px' }}>
        <div style={{
          display: 'inline-block',
          padding: '3px 12px', borderRadius: '99px',
          background: `${post.categoriaColor}20`,
          border: `1px solid ${post.categoriaColor}40`,
          color: post.categoriaColor,
          fontSize: '10px', fontFamily: 'var(--font-inter)',
          fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', marginBottom: '10px',
        }}>
          {post.categoriaLabel}
        </div>
        <h3 style={{
          fontFamily: 'var(--font-playfair)', fontWeight: 700,
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: '#643018',
          lineHeight: 1.3, marginBottom: '8px',
        }}>
          {post.titulo}
        </h3>
        <p style={{
          fontFamily: 'var(--font-lora)', fontStyle: 'italic',
          fontSize: '14px', color: 'rgba(61,26,10,0.6)', lineHeight: 1.7,
          maxWidth: '640px',
        }}>
          {post.descripcion}
        </p>
      </div>

      {/* Pasos */}
      <div>
        <p style={{
          fontSize: '10px', fontFamily: 'var(--font-inter)',
          color: 'rgba(61,26,10,0.4)', textTransform: 'uppercase',
          letterSpacing: '0.15em', marginBottom: '14px', fontWeight: 600,
        }}>
          {post.categoria === 'recetas' ? 'Preparación paso a paso' : 'Cómo funciona'}
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
          gap: '10px',
        }}>
          {post.pasos.map((paso, i) => (
            <div
              key={i}
              style={{
                display: 'flex', gap: '12px', alignItems: 'flex-start',
                padding: '12px 14px', borderRadius: '12px',
                background: '#fff',
                border: '1px solid rgba(100,48,24,0.08)',
              }}
            >
              <span style={{
                minWidth: '24px', height: '24px', borderRadius: '50%',
                background: post.categoriaColor,
                color: '#fff', fontSize: '11px',
                fontFamily: 'var(--font-inter)', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {i + 1}
              </span>
              <span style={{
                fontSize: '13px', fontFamily: 'var(--font-inter)',
                color: '#3D1A0A', lineHeight: 1.6,
              }}>
                {paso}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Construir lista intercalada: cards + panel inline ───────────────────────
function buildItems(
  posts: typeof POSTS,
  expandidoId: number | null,
  columnas: number,
) {
  if (expandidoId === null) return posts.map(p => ({ type: 'card' as const, post: p }));

  const idx = posts.findIndex(p => p.id === expandidoId);
  const filaExpandida = Math.floor(idx / columnas);
  const insertarEn = (filaExpandida + 1) * columnas; // después de la última card de esa fila

  const items: ({ type: 'card'; post: typeof POSTS[0] } | { type: 'panel'; post: typeof POSTS[0] })[] = [];
  posts.forEach((post, i) => {
    items.push({ type: 'card', post });
    if (i === insertarEn - 1 || (i === posts.length - 1 && i < insertarEn)) {
      const expandedPost = posts.find(p => p.id === expandidoId)!;
      items.push({ type: 'panel', post: expandedPost });
    }
  });
  return items;
}

export function BlogSection() {
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>('todos');
  const [expandido, setExpandido] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const postsFiltrados = categoriaActiva === 'todos'
    ? POSTS
    : POSTS.filter(p => p.categoria === categoriaActiva);

  const columnas = useColumnas(gridRef, postsFiltrados.length);
  const items = buildItems(postsFiltrados, expandido, columnas);

  return (
    <section
      id="blog"
      style={{
        background: '#fff8e8',
        padding: 'clamp(48px, 8vw, 80px) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="blog-titulo"
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, opacity: 0.025, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #643018 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0 clamp(16px, 5vw, 24px)', position: 'relative', zIndex: 1,
      }}>

        {/* ─── Título ─────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(32px, 6vw, 48px)' }}>
          <span style={{
            display: 'block', fontSize: '11px',
            fontFamily: 'var(--font-inter)', fontWeight: 600,
            letterSpacing: '0.4em', color: '#AAC071',
            textTransform: 'uppercase', marginBottom: '12px',
          }}>
            Blog & Recetas
          </span>
          <h2
            id="blog-titulo"
            style={{
              fontFamily: 'var(--font-playfair)', fontWeight: 700,
              fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: '#643018',
              marginBottom: '14px', lineHeight: 1.2,
            }}
          >
            Aprende a Disfrutar tu Café
          </h2>
          <p style={{
            fontFamily: 'var(--font-lora)', fontStyle: 'italic',
            color: 'rgba(61,26,10,0.65)', fontSize: 'clamp(14px, 2vw, 17px)',
            maxWidth: '440px', margin: '0 auto', lineHeight: 1.7,
          }}>
            Recetas, procesos y todo lo que necesitas saber
          </p>
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '12px', marginTop: '20px',
          }}>
            <div style={{ width: '64px', height: '1px', background: 'rgba(100,48,24,0.2)' }} />
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#C8963E' }} />
            <div style={{ width: '64px', height: '1px', background: 'rgba(100,48,24,0.2)' }} />
          </div>
        </div>

        {/* ─── Filtros ─────────────────────────────── */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: '8px', marginBottom: '32px', flexWrap: 'wrap',
        }}>
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategoriaActiva(cat.id);
                setExpandido(null);
              }}
              style={{
                padding: '8px 22px', borderRadius: '99px',
                fontFamily: 'var(--font-inter)', fontWeight: 600,
                fontSize: '13px', cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: categoriaActiva === cat.id ? '#643018' : 'transparent',
                color: categoriaActiva === cat.id ? '#FFF6D3' : 'rgba(61,26,10,0.5)',
                border: `1px solid ${categoriaActiva === cat.id ? '#643018' : 'rgba(100,48,24,0.2)'}`,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ─── Grid con panel inline ───────────────── */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '20px',
          }}
        >
          {items.map((item, i) =>
            item.type === 'card' ? (
              <PostCard
                key={item.post.id}
                post={item.post}
                selected={expandido === item.post.id}
                onToggle={() => setExpandido(expandido === item.post.id ? null : item.post.id)}
              />
            ) : (
              <PanelExpandido
                key={`panel-${item.post.id}`}
                post={item.post}
                onCerrar={() => setExpandido(null)}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
