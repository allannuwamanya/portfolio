/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // Static HTML export for GitHub Pages
  output: "export",

  // basePath for project pages: https://allannuwamanya.github.io/portfolio/
  basePath: isProd ? "/portfolio" : "",
  assetPrefix: isProd ? "/portfolio/" : "",

  // Required for static export — disables Next.js image optimisation
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },

  // Trailing slashes so GitHub Pages resolves routes correctly
  trailingSlash: true,

  reactStrictMode: true,
};

export default nextConfig;
