/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com', 'images.pexels.com', 'plus.unsplash.com'],
  },
  // Disable all development indicators including the logo at bottom
  devIndicators: false,
};

module.exports = nextConfig;
