/** @type {import('next').NextConfig} */
const nextConfig = {
  // Every route on this site is prerendered, so the build emits plain HTML to
  // `out/` rather than a server bundle. That removes the host's Next.js runtime
  // from the deployment path entirely — any static host serves this correctly.
  output: "export",

  reactStrictMode: true,
  poweredByHeader: false,
  // Type errors fail the build. They were previously ignored.
  eslint: { ignoreDuringBuilds: true },
  images: {
    // Images are pre-sized and compressed in public/, so the site renders the
    // same on any host rather than depending on a platform image optimiser.
    // Required for `output: "export"`.
    unoptimized: true,
  },
}

export default nextConfig
