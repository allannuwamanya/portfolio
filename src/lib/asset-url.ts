/**
 * Resolves an image path from the data files to a URL.
 *
 * Event and experience photos are served from a Cloudflare R2 bucket so the
 * repository stays small. Set NEXT_PUBLIC_ASSETS_URL to the bucket's public
 * origin (e.g. https://assets.allannuwamanya.dev) and write paths relative to
 * it in the data files: "/events/dsa-workshop.jpg".
 *
 * Absolute URLs pass through untouched, and with no bucket configured the path
 * resolves against the site's own `public/` folder.
 */
const ASSETS_URL = (process.env.NEXT_PUBLIC_ASSETS_URL ?? "").replace(/\/$/, "");

export function assetUrl(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${ASSETS_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
