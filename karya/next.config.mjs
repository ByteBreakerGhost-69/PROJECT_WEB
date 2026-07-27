import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    // Ganti dengan domain CDN/asset kamu kalau pakai remote image
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap'],
  },
};

export default withNextIntl(nextConfig);
