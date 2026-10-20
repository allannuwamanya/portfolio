import { NavItem, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Allan Nuwamanya",
  author: "Allan Nuwamanya",
  title: "Allan Nuwamanya | Full-Stack Software Engineer",
  description:
    "Full-stack software engineer crafting high-performance modern web applications, scalable distributed backends, and responsive user experiences.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://allannuwamanya.dev").replace(/\/$/, ""),
  links: {
    github: "https://github.com/allannuwamanya",
    linkedin: "https://www.linkedin.com/in/allannuwamanya/",
    twitter: "https://x.com/allannuwamanya_",
    email: "hello@allannuwamanya.dev",
    // Set automatically by next.config.mjs once public/resume.pdf exists.
    resume: process.env.NEXT_PUBLIC_RESUME_URL || undefined,
  },
};

export const mainNav: NavItem[] = [
  { title: "Experience", href: "/experience" },
  { title: "Certifications", href: "/certifications" },
  { title: "Events", href: "/events" },
  { title: "Projects", href: "/projects" },
  { title: "Skills", href: "/skills" },
  { title: "Writing", href: "/blog" },
  { title: "Contact", href: "/contact" },
];
