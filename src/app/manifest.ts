import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { BASE_PATH } from "@/lib/base-path.mjs";

// Required alongside `output: "export"`.
export const dynamic = "force-static";

// Unlike `<link rel="icon">`, Next does not rewrite the manifest's own URL
// values, so `start_url` and `icons[].src` need the basePath by hand or they
// resolve to the domain root when the site is served from /portfolio.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: `${BASE_PATH}/`,
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: `${BASE_PATH}/icon.png`, sizes: "512x512", type: "image/png" },
      { src: `${BASE_PATH}/apple-icon.png`, sizes: "180x180", type: "image/png" },
    ],
  };
}