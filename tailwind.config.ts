import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },

        // NERV palette. One accent (red); everything else is black and white.
        "nerv-black": "#050505",
        "nerv-panel": "#0c0c0c",
        "nerv-line": "#262626",
        "nerv-edge": "#5e5e5e", // 3:1 against black, for control outlines
        "nerv-white": "#f5f5f4",
        "nerv-mute": "#a1a1a1",
        "nerv-dim": "#858585",
        "nerv-red": "#f0141e",

        // Legacy aliases kept so older components still render.
        "nerv-dark": "#0c0c0c",
        "nerv-dark-secondary": "#141414",
        "nerv-light": "#f5f5f4",
        "nerv-gray": "#a1a1a1",
        "nerv-orange": "#f0141e",
        "nerv-green": "#f5f5f4",
        "nerv-blue": "#a1a1a1",
        "nerv-purple": "#a1a1a1",
      },
      fontFamily: {
        display: ["var(--font-matisse)", "Times New Roman", "serif"],
        sans: ["var(--font-archivo)", "Helvetica Neue", "Arial", "sans-serif"],
        matisse: ["var(--font-matisse)", "Times New Roman", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
