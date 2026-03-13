import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cafe:     "#643018",
        verde:    "#AAC071",
        crema:    "#FFF6D3",
        "cafe-lt":"#8B4513",
        tierra:   "#3D1A0A",
        oro:      "#C8963E",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body:    ["var(--font-inter)", "system-ui", "sans-serif"],
        lora:    ["var(--font-lora)", "Georgia", "serif"],
        cormorant:["var(--font-cormorant)", "Georgia", "serif"],
      },
      backgroundImage: {
        "gradient-cafe": "linear-gradient(135deg, #643018 0%, #3D1A0A 100%)",
        "gradient-crema": "linear-gradient(180deg, #FFF6D3 0%, #fff 100%)",
      },
      boxShadow: {
        "cafe-sm": "0 2px 8px rgba(100,48,24,0.15)",
        "cafe-md": "0 4px 20px rgba(100,48,24,0.25)",
        "cafe-lg": "0 8px 40px rgba(100,48,24,0.35)",
      },
      animation: {
        "bounce-badge": "bounceBadge 0.4s ease-out",
        "fade-up":      "fadeUp 0.6s ease-out forwards",
        "steam":        "steam 2s ease-out infinite",
      },
      keyframes: {
        bounceBadge: {
          "0%":   { transform: "scale(1)" },
          "50%":  { transform: "scale(1.4)" },
          "100%": { transform: "scale(1)" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        steam: {
          "0%":   { opacity: "0.6", transform: "translateY(0) scaleX(1)" },
          "100%": { opacity: "0",   transform: "translateY(-40px) scaleX(1.3)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;