export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://coffeemasfred.com/#organization",
        name: "Coffee Masfred",
        url: "https://coffeemasfred.com",
        logo: {
          "@type": "ImageObject",
          url: "https://coffeemasfred.com/images/logo.png",
        },
        description:
          "Café especial colombiano del Huila. Origen Guadalupe e Isnos.",
        address: {
          "@type": "PostalAddress",
          addressRegion: "Huila",
          addressCountry: "CO",
        },
        sameAs: [
          "https://instagram.com/coffeemasfred",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://coffeemasfred.com/#website",
        url: "https://coffeemasfred.com",
        name: "Coffee Masfred",
        publisher: { "@id": "https://coffeemasfred.com/#organization" },
        inLanguage: "es-CO",
      },
      {
        "@type": "Product",
        name: "Café Masfred Guadalupe",
        description:
          "Café especial variedad Catimore, proceso Natural. Notas de chocolate, caramelo y frutos secos. Origen Guadalupe, Huila, 1700 msnm.",
        brand: { "@type": "Brand", name: "Coffee Masfred" },
        offers: {
          "@type": "Offer",
          price: "40000",
          priceCurrency: "COP",
          availability: "https://schema.org/InStock",
          seller: { "@id": "https://coffeemasfred.com/#organization" },
        },
      },
      {
        "@type": "Product",
        name: "Café Masfred Isnos",
        description:
          "Café especial variedad Caturra, proceso Lavado/Fermentado. Notas dulces, frutales y florales. Origen Isnos, Huila, 1800 msnm.",
        brand: { "@type": "Brand", name: "Coffee Masfred" },
        offers: {
          "@type": "Offer",
          price: "40000",
          priceCurrency: "COP",
          availability: "https://schema.org/InStock",
          seller: { "@id": "https://coffeemasfred.com/#organization" },
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}