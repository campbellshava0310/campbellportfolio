import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-subtle": "var(--bg-subtle)",
        surface: "var(--surface)",
        fg: "var(--fg)",
        "fg-secondary": "var(--fg-secondary)",
        "fg-muted": "var(--fg-muted)",
        line: "var(--border)",
        "line-strong": "var(--border-strong)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-fg": "var(--accent-fg)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        // Fluid scale. Confident, never billboard-sized.
        display: ["clamp(2.75rem, 1.65rem + 4.6vw, 5.25rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        h1: ["clamp(2.125rem, 1.5rem + 2.7vw, 3.5rem)", { lineHeight: "1.06", letterSpacing: "-0.03em" }],
        h2: ["clamp(1.625rem, 1.25rem + 1.7vw, 2.375rem)", { lineHeight: "1.12", letterSpacing: "-0.026em" }],
        h3: ["clamp(1.1875rem, 1.08rem + 0.45vw, 1.4375rem)", { lineHeight: "1.24", letterSpacing: "-0.018em" }],
        lead: ["clamp(1.0625rem, 0.99rem + 0.42vw, 1.3125rem)", { lineHeight: "1.55", letterSpacing: "-0.012em" }],
        body: ["1rem", { lineHeight: "1.68" }],
        sm: ["0.875rem", { lineHeight: "1.6" }],
        xs: ["0.8125rem", { lineHeight: "1.5" }],
        micro: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.1em" }],
      },
      borderRadius: {
        xs: "var(--r-xs)",
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
      },
      transitionTimingFunction: {
        DEFAULT: "var(--ease)",
        out: "var(--ease-out)",
      },
      maxWidth: {
        prose: "62ch",
        measure: "46ch",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "none" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        "fade-up": "fade-up var(--dur-slow) var(--ease-out) both",
        "fade-in": "fade-in var(--dur) var(--ease) both",
        pulse: "pulse 2.8s var(--ease) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
