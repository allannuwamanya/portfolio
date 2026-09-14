# Allan Nuwamanya — Modern Developer Portfolio

A modern, high-performance developer portfolio and personal website engineered with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS.

---

## ⚡ Tech Stack & Architecture

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components & Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with CSS variables & `@tailwindcss/container-queries`
- **UI & Primitives**: [shadcn/ui](https://ui.shadcn.com/) and [Radix UI](https://www.radix-ui.com/) patterns
- **Motion**: [Motion (Framer Motion)](https://motion.dev/) for smooth micro-interactions
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) with zero flash of unstyled content (Dark/Light mode)
- **Icons**: [Lucide React](https://lucide.dev/)
- **SEO & Social**: Dynamic OpenGraph images, automated `sitemap.xml`, and `robots.txt`
- **Package Manager**: [npm](https://www.npmjs.com/)

---

## 📁 Project Structure

```
├── .github/
│   └── workflows/ci.yml       # Automated GitHub Actions CI pipeline
├── public/                    # Static assets (images, project screenshots, og-images)
├── src/
│   ├── app/                   # Next.js App Router routes & layouts
│   │   ├── (site)/
│   │   │   ├── layout.tsx     # Root layout with ThemeProvider and global metadata
│   │   │   ├── page.tsx       # Portfolio landing page
│   │   │   └── globals.css    # Tailwind directives & CSS design tokens
│   │   ├── api/contact/       # Type-safe contact API route handler (Zod validated)
│   │   ├── blog/              # Technical writing & article routes
│   │   ├── projects/          # Expanded project showcase catalog
│   │   ├── robots.ts          # Search engine crawler policies
│   │   └── sitemap.ts         # Automated sitemap generator
│   ├── components/
│   │   ├── layout/            # Container, Navbar, Footer, MobileNav
│   │   ├── providers/         # ThemeProvider & Context providers
│   │   ├── sections/          # Page sections (Hero, Bento, Projects, Experience, Skills, Contact)
│   │   ├── shared/            # ThemeToggle, ProjectCard, TechBadge, CommandMenu
│   │   └── ui/                # Core primitives (Button, Card, Badge, Input, etc.)
│   ├── content/               # MDX content files for projects and blog posts
│   ├── data/                  # Strongly-typed data sources
│   │   ├── experience.ts      # Career & education history
│   │   ├── personal.ts        # Author bio, titles, links, and status
│   │   ├── projects.ts        # Portfolio projects catalogue
│   │   └── skills.ts          # Tech stack & categorized skills
│   ├── lib/
│   │   ├── constants.ts       # Site navigation, metadata & links configuration
│   │   └── utils.ts           # Classnames merging (cn helper), date formatting
│   └── types/
│       └── index.ts           # Comprehensive TypeScript interfaces & domain types
├── components.json            # shadcn/ui configuration
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies and scripts
├── postcss.config.mjs         # PostCSS configuration
├── tailwind.config.ts         # Tailwind theme & design tokens configuration
└── tsconfig.json              # TypeScript strict configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or newer recommended, v24 supported)
- [pnpm](https://pnpm.io/) (v9 or v11)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/allannuwamanya/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or: npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   pnpm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Customization

- **Personal Info & Socials**: Edit [`src/data/personal.ts`](src/data/personal.ts) and [`src/lib/constants.ts`](src/lib/constants.ts).
- **Projects**: Add or modify your featured work in [`src/data/projects.ts`](src/data/projects.ts).
- **Experience**: Update your work history in [`src/data/experience.ts`](src/data/experience.ts).
- **Skills**: Update your tech stack in [`src/data/skills.ts`](src/data/skills.ts).

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub.
2. Import the repository into [Vercel](https://vercel.com/new).
3. Next.js presets will be automatically detected.
4. Set any required environment variables in your Vercel project settings.
5. Click **Deploy**.

---

## 📄 License

This project is licensed under the MIT License.
