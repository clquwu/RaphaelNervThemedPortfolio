import type { Config } from "tailwindcss"

const config: Config = {
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        // Enhanced NERV theme colors based on Evangelion
        "nerv-black": "#000000",        // Pure black for backgrounds
        "nerv-dark": "#0a0a0f",         // Very dark blue-black
        "nerv-dark-secondary": "#1a1a1f", // Secondary dark
        "nerv-red": "#e60012",          // Official NERV red
        "nerv-orange": "#f59e0b",       // Warning/accent orange
        "nerv-light": "#ffffff",        // Pure white for Matisse text
        "nerv-gray": "#e5e7eb",         // Light gray for secondary text
        "nerv-purple": "#6b46c1",       // Eva Unit-01 purple
        "nerv-green": "#10b981",        // System online green
        "nerv-blue": "#3b82f6",         // Technical blue
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        loading: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        // Enhanced Evangelion-style animations
        "eva-compression": {
          "0%": { transform: "scaleX(1)" },
          "100%": { transform: "scaleX(0.8)" },
        },
        "eva-flash": {
          "0%, 100%": { opacity: "0" },
          "10%, 90%": { opacity: "1" },
        },
        "eva-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "eva-glitch": {
          "0%, 100%": { transform: "translateX(0)" },
          "10%": { transform: "translateX(-2px)" },
          "20%": { transform: "translateX(2px)" },
          "30%": { transform: "translateX(-1px)" },
          "40%": { transform: "translateX(1px)" },
          "50%": { transform: "translateX(-2px)" },
          "60%": { transform: "translateX(2px)" },
          "70%": { transform: "translateX(-1px)" },
          "80%": { transform: "translateX(1px)" },
          "90%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "eva-compression": "eva-compression 0.3s ease-out forwards",
        "eva-flash": "eva-flash 2s infinite",
        "eva-pulse": "eva-pulse 2s infinite",
        "eva-glitch": "eva-glitch 0.5s infinite",
      },
      fontFamily: {
        // Font families for authentic Evangelion typography
        matisse: ["var(--font-matisse)", "Times New Roman", "Times", "serif"],
        helvetica: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        futura: ["Futura", "Trebuchet MS", "Arial Narrow", "Arial", "sans-serif"],
        eurostile: ["Eurostile Extended", "Arial Black", "Arial", "sans-serif"],
        mono: ["Courier New", "Courier", "monospace"],
      },
      fontSize: {
        // Specific sizes for Evangelion-style typography
        "eva-title": ["4rem", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "eva-subtitle": ["1.5rem", { lineHeight: "1.2", letterSpacing: "0.1em" }],
        "eva-ui": ["0.875rem", { lineHeight: "1.4", letterSpacing: "0.05em" }],
        "eva-tech": ["0.75rem", { lineHeight: "1.2", letterSpacing: "0.1em" }],
      },
      letterSpacing: {
        "eva-wide": "0.2em",
        "eva-wider": "0.3em",
        "eva-widest": "0.4em",
      },
      transitionProperty: {
        "eva": "transform, opacity, color, background-color, border-color",
      },
      // Custom spacing for Evangelion layouts
      spacing: {
        "eva-xs": "0.25rem",
        "eva-sm": "0.5rem", 
        "eva-md": "1rem",
        "eva-lg": "1.5rem",
        "eva-xl": "2rem",
        "eva-2xl": "3rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config