/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.pexels.com',
        pathname: '**',
      },
    ],
  },
  // Disable all development indicators including the logo at bottom
  devIndicators: false,
};

module.exports = nextConfig;
