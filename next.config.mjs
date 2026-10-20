import { existsSync } from "node:fs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export. Cloudflare Pages serves ./out from the domain root, so
  // there is no basePath or assetPrefix to maintain.
  output: "export",

  // The static export cannot run Next's image optimiser. Event photos live in a
  // Cloudflare R2 bucket (see src/lib/asset-url.ts) and Cloudflare serves them.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "**.r2.dev" },
      { protocol: "https", hostname: "**.r2.cloudflarestorage.com" },
    ],
  },

  // Each route becomes <route>/index.html, which static hosts resolve cleanly.
  trailingSlash: true,

  reactStrictMode: true,

  env: {
    // Résumé buttons appear automatically once public/resume.pdf exists.
    NEXT_PUBLIC_RESUME_URL: existsSync("public/resume.pdf") ? "/resume.pdf" : "",
  },
};

export default nextConfig;
