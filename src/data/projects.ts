import { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "project-1",
    slug: "modern-saas-platform",
    title: "Next-Gen SaaS Analytics",
    tagline: "Real-time metrics and event processing engine for modern development teams",
    description:
      "A full-stack analytics platform delivering sub-100ms dashboards, live telemetry streaming, and automated anomaly detection.",
    category: "Full Stack",
    featured: true,
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    image: "/projects/project-1.png",
    demoUrl: "https://demo.example.com",
    repoUrl: "https://github.com/allannuwamanya",
    metrics: [
      { label: "Latency", value: "< 100ms" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    id: "project-2",
    slug: "e-commerce-engine",
    title: "Headless Commerce Storefront",
    tagline: "Ultra-fast headless commerce with dynamic checkout and inventory sync",
    description:
      "Engineered a high-conversion storefront utilizing server-side rendering, edge caching, and resilient Stripe checkout pipelines.",
    category: "Frontend",
    featured: true,
    tags: ["React", "Next.js", "Tailwind CSS", "Stripe API", "Zustand"],
    image: "/projects/project-2.png",
    demoUrl: "https://commerce.example.com",
    repoUrl: "https://github.com/allannuwamanya",
    metrics: [
      { label: "Conversion Lift", value: "+28%" },
      { label: "Lighthouse Score", value: "98/100" },
    ],
  },
  {
    id: "project-3",
    slug: "distributed-task-runner",
    title: "Distributed Background Job Queue",
    tagline: "Fault-tolerant Redis-backed worker queue handling async job workflows",
    description:
      "Engineered an asynchronous task execution system with rate-limiting, exponential retry strategies, and observability metrics.",
    category: "Backend / API",
    featured: true,
    tags: ["Node.js", "TypeScript", "Redis", "Docker", "Express"],
    image: "/projects/project-3.png",
    repoUrl: "https://github.com/allannuwamanya",
    metrics: [
      { label: "Throughput", value: "5k req/s" },
      { label: "Fault Recovery", value: "100%" },
    ],
  },
];
