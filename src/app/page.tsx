import { stockupFetch } from '@/lib/stockup/client';
import { adaptProduct } from '@/lib/stockup/adapters';
import { HeroSection }      from '@/components/sections/HeroSection';
import { OrigenSection }    from '@/components/sections/OrigenSection';
import { ProductosSection } from '@/components/sections/ProductosSection';
import type { Product }     from '@/lib/stockup/types';
import { ParallaxDivider }  from '@/components/sections/ParallaxDivider';
import { ProcesoSection }   from '@/components/sections/ProcesoSection';
import { NotasSection } from '@/components/sections/NotasSection';
import { BlogSection } from '@/components/sections/BlogSection';
import { ResenasSection } from '@/components/sections/ResenasSection';
import { ContactoSection } from '@/components/sections/ContactoSection';


export default async function HomePage() {
  let productos: Product[] = [];

  try {
    const data = await stockupFetch<any>('/products?isActive=true&limit=20', {}, 60);
    productos = (data.data ?? []).map(adaptProduct);
  } catch (e) {
    console.error('[HomePage] Error cargando productos:', e);
  }

  return (
    <main>
      <HeroSection />
      <OrigenSection />
      <ProductosSection productos={productos} />
      <ParallaxDivider />
      <ProcesoSection />
      <ParallaxDivider />
      <NotasSection />
      <ParallaxDivider />
      <BlogSection />
      <ParallaxDivider />
      <ResenasSection />
      <ParallaxDivider />
      <ContactoSection />
    </main>
  );
}