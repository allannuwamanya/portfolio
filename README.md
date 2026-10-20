# Allan Nuwamanya — Portfolio

Personal portfolio and engineering archive for Allan Nuwamanya, a full-stack engineer working on speech-AI infrastructure, durable backends, and open data. Built as a fully static site and hosted on Cloudflare Pages, with photos on Cloudflare R2.

## Stack

- **Framework**: Next.js 15 (App Router, `output: "export"`), React 19
- **Language**: TypeScript, strict mode
- **Styling**: Tailwind CSS 3 with CSS-variable design tokens (`src/app/globals.css`)
- **Motion**: [Motion](https://motion.dev/), with `prefers-reduced-motion` respected
- **Validation**: Zod (contact form)
- **Icons**: Lucide, plus brand marks generated from [Simple Icons](https://simpleicons.org) (CC0)
- **Fonts**: Google Sans / Google Sans Code (SIL OFL), self-hosted from `public/fonts`

## Project structure

```
src/
├── app/                  # Routes: /, about, experience, certifications, events, projects,
│                         # projects/[slug], skills, blog, contact — plus sitemap, robots, manifest, OG image, 404
├── components/
│   ├── layout/           # Navbar, Footer, Container
│   ├── sections/         # One component per page body (Hero, Experience, Events, ...)
│   ├── projects/         # Filterable project archive
│   └── shared/           # PhotoGallery, Lightbox, CertificateCard, TechTag, EmptyState, brand icons
├── data/                 # All content, as typed arrays — edit these, not the components
└── lib/                  # Site config, asset URL helper, utilities
scripts/fetch-tech-icons.mjs   # Regenerates src/components/shared/tech-icon-paths.ts
public/_headers                # Cloudflare Pages security and cache headers
```

## Getting started

Requires Node.js 20 or newer.

```bash
npm ci
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

| Script              | Purpose                                         |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Development server                              |
| `npm run build`     | Static export to `./out`                        |
| `npm run lint`      | ESLint                                          |
| `npm run typecheck` | Generates Next types, then `tsc --noEmit`       |
| `npm run icons`     | Re-fetch brand icon paths from Simple Icons     |

## Editing content

Everything on the site comes from `src/data/`. Each file documents its own shape at the top.

| File            | Controls                                                     |
| --------------- | ------------------------------------------------------------ |
| `personal.ts`   | Name, headline, bio, location, headline numbers              |
| `projects.ts`   | Project cards and case studies                               |
| `experience.ts` | Internships, hackathons, bootcamps, fellowships, jobs        |
| `events.ts`     | Workshops, conferences, talks, with photo galleries          |
| `certifications.ts` | Certificates and awards, with the full document on click |
| `skills.ts`     | Tech stack categories                                        |
| `../lib/constants.ts` | Site URL, social links, navigation                     |

- **Résumé**: drop a file at `public/resume.pdf`. The résumé buttons appear on the next build; until then they are replaced by "Get in touch".
- **Photos** live in Cloudflare R2 (below) and are referenced by path.

## Images on Cloudflare R2

Photos and certificate scans live in the `portfolio-assets` R2 bucket, served from its public address, which is set as `NEXT_PUBLIC_ASSETS_URL`. Paths in the data files (`/events/…`, `/experience/…`, `/certifications/…`) are resolved against it by `src/lib/asset-url.ts`.

To add photos:

```bash
npm run upload -- ~/Downloads/new-photos events     # uploads each file to portfolio-assets/events/
```

Then reference them in the data files, e.g. `{ src: "/events/my-photo.jpg", alt: "…" }`. Photos open in a lightbox, so write `alt` as a caption for someone who cannot see the image.

The `*.r2.dev` address is fine to start with but is rate limited. For heavier traffic, attach a custom domain to the bucket in the Cloudflare dashboard (R2 → bucket → Settings → Custom Domains) and update `NEXT_PUBLIC_ASSETS_URL`.

## Deploying to Cloudflare Pages

The site is published to the `allannuwamanya` Pages project, served at https://allannuwamanya.tech (also reachable at allannuwamanya.pages.dev), by direct upload:

1. Put `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` in `.env.local`, along with `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_ASSETS_URL` (see `.env.example`). `.env.local` is gitignored.
2. Run `npm run deploy`. It builds the static export and uploads `./out`.

`NEXT_PUBLIC_*` variables are inlined at build time, so change them and redeploy.

The custom domain is attached under the Pages project's **Custom domains** tab (`www` 301-redirects to the apex), and photos are served from `assets.allannuwamanya.tech`, a custom domain on the R2 bucket. To change the domain, update both in Cloudflare, then set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_ASSETS_URL` before the next deploy. Use a token scoped to Pages and R2 only, and rotate it if it is ever shared.

GitHub Actions (`.github/workflows/ci.yml`) runs lint, type check, and build on every push and pull request.

## Contact form

The form posts to Formspree when `NEXT_PUBLIC_FORMSPREE_ENDPOINT` is set. Otherwise it opens a prefilled `mailto:` link, so a visitor's message is never lost.

## License

MIT for the code. Google Sans fonts are under the SIL Open Font License (`public/fonts/OFL.txt`).
