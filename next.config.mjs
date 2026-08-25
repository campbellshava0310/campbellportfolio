/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Type errors fail the build. They were previously ignored.
  eslint: { ignoreDuringBuilds: true },
  images: {
    // Images are pre-sized and compressed in public/, so the site renders the
    // same on any host rather than depending on a platform image optimiser.
    unoptimized: true,
  },
}

export default nextConfig
