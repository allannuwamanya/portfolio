import { BASE_PATH } from "./base-path.mjs";

/**
 * Resolves a public-folder path for use as an image `src`.
 *
 * `output: "export"` forces `images.unoptimized`, and Next's loader returns the
 * src verbatim in that mode — it does *not* prepend `basePath`. Anything served
 * out of `public/` therefore needs the prefix added by hand, or it 404s once
 * the site is served from https://<user>.github.io/portfolio/.
 *
 * Absolute URLs are returned untouched.
 */
export function assetUrl(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}