import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: [
        "Inter var", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont",
        '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", '"Noto Sans"', "sans-serif",
        '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"',
      ],
      serif: [
        "ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif",
      ],
      mono: [
        "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas",
        '"Liberation Mono"', '"Courier New"', "monospace",
      ],
      display: ['"Clash Display"', "sans-serif"],
    },
    extend: {
      colors: {
        htb: {
          dark: "#0a0a0a",
          darker: "#050505",
          light: "#e0e0e0",
          lighter: "#f5f5f5",
          accent: "#9fef00",
          accentDark: "#7bcb00",
          accentLight: "#c1ff4d",
          muted: "#1a1a1a",
          primary: "#3b82f6",
          secondary: "#4ade80",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        cyber: "0 0 10px rgba(59, 130, 246, 0.5)",
        "cyber-md": "0 0 15px rgba(59, 130, 246, 0.5)",
        "cyber-lg": "0 0 20px rgba(59, 130, 246, 0.5)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out 2s infinite",
        shine: "shine 2s infinite",
        bounce: "bounce 2s infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            fontFeatureSettings: '"calt", "ccmp", "kern", "rlig", "ss01"',
            fontVariantLigatures: "common-ligatures",
            maxWidth: "none",
          },
        },
        dark: {
          css: {
            color: "#e0e0e0",
            a: {
              color: "#9fef00",
              "&:hover": { color: "#c1ff4d" },
            },
            h1: { color: "#f5f5f5" },
            h2: { color: "#f5f5f5" },
            h3: { color: "#f5f5f5" },
            strong: { color: "#f5f5f5" },
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwindcss-font-inter")({ importFontWeights: [400, 500, 600, 700] }),
  ],
} satisfies Config;

export default config;
