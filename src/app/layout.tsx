import type { Metadata } from "next";
import { Playfair_Display, Inter, Lora, Cormorant_SC } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { Navbar }     from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Footer } from '@/components/layout/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';

/* ─── FUENTES ─────────────────────────────────────────── */
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

/* ─── SEO METADATA ────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://coffeemasfred.com"),

  title: {
    default: "Coffee Masfred | Café Especial del Huila, Colombia",
    template: "%s | Coffee Masfred",
  },
  description:
    "Café especial colombiano del Huila. Origen Guadalupe e Isnos, 1700–1800 msnm. Proceso natural y fermentado. Notas de chocolate, caramelo, floral y frutal. Envíos a toda Colombia.",

  keywords: [
    "café especial colombiano",
    "café del Huila",
    "café Guadalupe Huila",
    "café Isnos Huila",
    "café especial tipo exportación",
    "café natural Colombia",
    "café fermentado Colombia",
    "comprar café especial Colombia",
    "café artesanal colombiano",
    "Coffee Masfred",
    "café 1700 msnm",
    "notas chocolate café",
    "café floral frutal",
  ],

  authors: [{ name: "Coffee Masfred", url: "https://coffeemasfred.com" }],
  creator: "Coffee Masfred",
  publisher: "Coffee Masfred",

  /* ─── Open Graph (Facebook, WhatsApp, LinkedIn) ─── */
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://coffeemasfred.com",
    siteName: "Coffee Masfred",
    title: "Coffee Masfred | Café Especial del Huila, Colombia",
    description:
      "Un café que te transporta a tu pasado, a tus raíces. Especial tipo exportación desde Guadalupe e Isnos, Huila.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Coffee Masfred — Café Especial del Huila Colombia",
      },
    ],
  },

  /* ─── Twitter / X Card ─── */
  twitter: {
    card: "summary_large_image",
    title: "Coffee Masfred | Café Especial del Huila, Colombia",
    description:
      "Un café que te transporta a tu pasado, a tus raíces. Especial tipo exportación desde el Huila.",
    images: ["/images/og-image.jpg"],
  },

  /* ─── Canonical + robots ─── */
  alternates: {
    canonical: "https://coffeemasfred.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ─── Icons ─── */
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

/* ─── ROOT LAYOUT ─────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable} ${lora.variable} ${cormorant.variable}`}
    >
      <body className="font-body antialiased">
        <JsonLd />
        <Navbar />
        <CartDrawer />
        {children}
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}