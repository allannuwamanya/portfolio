/**
 * The site's public base path, shared by next.config.mjs and by
 * `src/lib/asset-url.ts` so the two can never drift apart.
 *
 * Plain .mjs because next.config.mjs cannot import TypeScript.
 */
export const BASE_PATH = process.env.NODE_ENV === "production" ? "/portfolio" : "";