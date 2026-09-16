import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: "AI, Speech & Data Engineering",
    skills: [
      { name: "Python 3.10+", level: "Expert" },
      { name: "PyTorch & Deep Learning", level: "Proficient" },
      { name: "Speech-AI Pipelines (ASR/TTS)", level: "Expert" },
      { name: "Low-Resource NLP (Luganda)", level: "Expert" },
      { name: "Pandas & Data Normalization", level: "Expert" },
      { name: "Mypy (Strict) & Ruff Tooling", level: "Expert" },
    ],
  },
  {
    title: "Distributed Systems & Backend",
    skills: [
      { name: "TypeScript & Node.js", level: "Expert" },
      { name: "NestJS Clean Architecture", level: "Expert" },
      { name: "Temporal.io Workflows", level: "Proficient" },
      { name: "Django REST Framework", level: "Proficient" },
      { name: "PostgreSQL & PostGIS", level: "Expert" },
      { name: "Prisma & Drizzle ORM", level: "Expert" },
      { name: "Redis & Celery Queues", level: "Proficient" },
    ],
  },
  {
    title: "Modern Web & Mobile UI",
    skills: [
      { name: "Next.js 15 (App Router)", level: "Expert" },
      { name: "React 19 / 18", level: "Expert" },
      { name: "Tailwind CSS & Modern UI", level: "Expert" },
      { name: "Framer Motion & Micro-interactions", level: "Expert" },
      { name: "React Native / Expo 54", level: "Proficient" },
      { name: "WebAssembly (WASM) in Browser", level: "Proficient" },
    ],
  },
  {
    title: "Fintech, Web3 & DevOps",
    skills: [
      { name: "Flutterwave Mobile-Money APIs", level: "Expert" },
      { name: "TRON Network (TRC20 USDT)", level: "Proficient" },
      { name: "Supabase & Serverless DBs", level: "Expert" },
      { name: "Docker & Containerization", level: "Proficient" },
      { name: "GitHub Actions CI/CD", level: "Expert" },
      { name: "Linux Administration & Bash", level: "Expert" },
    ],
  },
];
