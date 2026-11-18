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
        canvas: "#ffffff",
        primary: "#14140f",
        "surface-muted": "#f6f6f1",
        "text-muted": "#6b6b63",
        accent: {
          DEFAULT: "#d6ff3f",
          dark: "#a9cc2a",
        },
        border: {
          DEFAULT: "#14140f",
          light: "#e2e2dc",
        },
        whatsapp: "#25d366",
        success: "#2fa84f",
        danger: "#e0455a",
      },
      fontFamily: {
        sans: ["var(--font-heading)", "Plus Jakarta Sans", "Poppins", "-apple-system", "sans-serif"],
        heading: ["var(--font-heading)", "Plus Jakarta Sans", "Poppins", "-apple-system", "sans-serif"],
        body: ["var(--font-body)", "Plus Jakarta Sans", "Poppins", "-apple-system", "sans-serif"],
        accent: ["var(--font-accent)", "Baloo 2", "cursive", "sans-serif"],
      },
      borderRadius: {
        card: "18px",
        pill: "999px",
        sm: "10px",
      },
      boxShadow: {
        card: "0 10px 24px rgba(20, 20, 15, 0.08)",
        "card-hover": "0 18px 34px rgba(20, 20, 15, 0.14)",
        glow: "0 6px 0 rgba(214, 255, 63, 0.55)",
        "lime-btn": "0 8px 24px rgba(214, 255, 63, 0.65)",
      },
      maxWidth: {
        "container-max": "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
