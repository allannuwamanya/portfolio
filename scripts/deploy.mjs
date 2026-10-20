/**
 * Builds the static site and publishes ./out to Cloudflare Pages.
 *
 *   npm run deploy
 *
 * Reads CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID from .env.local (gitignored).
 * NEXT_PUBLIC_* values in the same file are inlined into the build.
 */
import { execFileSync } from "node:child_process";

const PROJECT = "allannuwamanya";

process.loadEnvFile(".env.local");
for (const name of ["CLOUDFLARE_API_TOKEN", "CLOUDFLARE_ACCOUNT_ID"]) {
  if (!process.env[name]) {
    console.error(`Missing ${name}. Add it to .env.local (see .env.example).`);
    process.exit(1);
  }
}

const run = (command, args) => execFileSync(command, args, { stdio: "inherit", env: process.env });

run("npm", ["run", "build"]);
run("npx", ["--yes", "wrangler@4", "pages", "deploy", "out", "--project-name", PROJECT, "--branch", "main"]);
