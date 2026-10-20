/**
 * Uploads every image in a local folder to the R2 bucket under a key prefix.
 *
 *   npm run upload -- ~/Downloads/new-photos events
 *
 * uploads each file to portfolio-assets/events/<filename>. Reference it in the data
 * files as "/events/<filename>". Filenames should be lowercase-with-dashes.
 */
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { extname, join, resolve } from "node:path";

const BUCKET = "portfolio-assets";
const TYPES = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".pdf": "application/pdf" };

const [dirArg, prefixArg] = process.argv.slice(2);
if (!dirArg || !prefixArg) {
  console.error("Usage: npm run upload -- <local-folder> <r2-prefix>   e.g. events | experience | certifications");
  process.exit(1);
}

process.loadEnvFile(".env.local");
const dir = resolve(dirArg.replace(/^~/, process.env.HOME ?? "~"));
const prefix = prefixArg.replace(/^\/|\/$/g, "");

for (const file of readdirSync(dir)) {
  const type = TYPES[extname(file).toLowerCase()];
  if (!type) continue;

  const key = `${BUCKET}/${prefix}/${file}`;
  execFileSync(
    "npx",
    ["--yes", "wrangler@4", "r2", "object", "put", key, "--file", join(dir, file), "--content-type", type, "--cache-control", "public, max-age=31536000, immutable", "--remote"],
    { stdio: "inherit", env: process.env },
  );
}
