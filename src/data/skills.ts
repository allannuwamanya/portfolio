import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    skills: [
      { name: "TypeScript", level: "Expert" },
      { name: "React 19 / 18", level: "Expert" },
      { name: "Next.js (App Router)", level: "Expert" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "HTML5 / Semantic Web", level: "Expert" },
      { name: "Framer Motion / Motion", level: "Proficient" },
    ],
  },
  {
    title: "Backend & Systems",
    skills: [
      { name: "Node.js / Express", level: "Expert" },
      { name: "PostgreSQL", level: "Proficient" },
      { name: "REST & GraphQL APIs", level: "Expert" },
      { name: "Prisma ORM", level: "Proficient" },
      { name: "Redis", level: "Proficient" },
      { name: "MongoDB", level: "Proficient" },
    ],
  },
  {
    title: "DevOps & Cloud Tools",
    skills: [
      { name: "Git & GitHub", level: "Expert" },
      { name: "Docker", level: "Proficient" },
      { name: "CI/CD Workflows", level: "Proficient" },
      { name: "Vercel / AWS", level: "Proficient" },
      { name: "Linux / Bash", level: "Proficient" },
      { name: "Postman", level: "Expert" },
    ],
  },
];
