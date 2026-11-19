/** @type {import('postcss-load-config').Config} */
export default {
  plugins: {
    // Tailwind v4 is CSS-first: the design tokens live in app/globals.css
    // under @theme, and there is no tailwind.config.ts. Vendor prefixing is
    // handled internally, so autoprefixer is no longer a dependency.
    "@tailwindcss/postcss": {},
  },
}
