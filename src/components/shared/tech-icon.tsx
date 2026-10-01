import { TECH_ICON_PATHS } from "@/components/shared/tech-icon-paths";
import manifest from "@/data/tech-icon-manifest.json";

/**
 * Real brand glyphs for the tech stack, resolved from the names used in
 * `data/skills.ts` and the project tags. Anything without an honest brand mark
 * (Speech-AI, Mypy, Zustand, Stockfish, Flutterwave, Sunmi, TRON) renders a
 * neutral `Boxes` glyph instead of misattributing a logo.
 */

const ALIASES = manifest.aliases as Record<string, string>;

const NEUTRAL = "neutral";

/** Falls back to the neutral glyph so an unknown name never renders blank. */
export function techIconId(name: string): string {
  const direct = ALIASES[name];
  if (direct) return direct;
  // "TypeScript & Node.js" style labels not present verbatim.
  const partial = Object.keys(ALIASES).find(
    (alias) => alias.length > 3 && name.toLowerCase().includes(alias.toLowerCase()),
  );
  return partial ? ALIASES[partial] : NEUTRAL;
}

export function techBrandHex(name: string): string | null {
  return TECH_ICON_PATHS[techIconId(name)]?.hex ?? null;
}

/** WCAG relative luminance. */
function luminance(hex: string): number {
  const n = parseInt(hex.slice(1), 16);
  const channel = (v: number) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const legibleCache = new Map<string, string>();

/**
 * Several of these brands are black-on-light designs (Vercel, Next.js, Express,
 * Temporal, GitHub, Prisma). At their published colour they are literally
 * invisible on a pure-black page, so lift them toward white until they read —
 * keeping the brand hue rather than discarding it for grey.
 */
function legible(hex: string): string {
  const cached = legibleCache.get(hex);
  if (cached) return cached;

  let result = hex;
  if (luminance(hex) < 0.18) {
    const n = parseInt(hex.slice(1), 16);
    const rgb = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    for (let mix = 0.2; mix <= 1; mix += 0.2) {
      result = `#${rgb
        .map((c) => Math.round(c + (255 - c) * mix))
        .map((c) => c.toString(16).padStart(2, "0"))
        .join("")}`;
      if (luminance(result) >= 0.18) break;
    }
  }

  legibleCache.set(hex, result);
  return result;
}

export function TechIcon({
  name,
  className,
  title,
}: {
  /** A skill or tag name, exactly as written in the data. */
  name: string;
  className?: string;
  /** Defaults to `name`. Set when the surrounding label already names it. */
  title?: string;
}) {
  const id = techIconId(name);
  const brand = TECH_ICON_PATHS[id];
  const label = title ?? name;

  if (!brand) {
    // A brand-neutral outline mark: the honest representation for a technology
    // with no logo, rather than borrowing someone else's.
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden={title ? undefined : "true"}
        role={title ? "img" : undefined}
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {title && <title>{label}</title>}
        <path d="M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.73l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      className={className}
      fill={legible(brand.hex)}
    >
      {title && <title>{label}</title>}
      <path d={brand.d} />
    </svg>
  );
}