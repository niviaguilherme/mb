/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "image.tmdb.org",
      "m.media-amazon.com",
      "www.afpp.eu",
      "cinema10.com.br",
      "upload.wikimedia.org",
    ],
    unoptimized: true,
  },
  output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
