import { ExperienceItem } from "@/types";

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Full-Stack Software Engineer",
    company: "Tech Innovation Hub",
    location: "Remote",
    startDate: "2023",
    endDate: "Present",
    current: true,
    description: [
      "Architected and shipped modular web applications serving thousands of daily active users.",
      "Optimized frontend bundle size and rendering pipelines, reducing Core Web Vitals LCP by 45%.",
      "Designed resilient REST and GraphQL APIs with automated unit, integration, and end-to-end testing.",
    ],
    technologies: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Docker", "Tailwind CSS"],
  },
  {
    id: "exp-2",
    role: "Software Developer",
    company: "Digital Solutions Lab",
    location: "Kampala, Uganda",
    startDate: "2022",
    endDate: "2023",
    current: false,
    description: [
      "Collaborated in agile cross-functional sprints to deliver client web platforms on deadline.",
      "Engineered interactive dashboards with real-time WebSocket state synchronization.",
      "Streamlined CI/CD pipelines via GitHub Actions, automating testing and zero-downtime deployment.",
    ],
    technologies: ["React", "JavaScript", "Express.js", "MongoDB", "Git", "CSS Modules"],
  },
];
