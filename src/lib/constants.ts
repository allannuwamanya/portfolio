import { NavItem, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Allan Nuwamanya",
  author: "Allan Nuwamanya",
  title: "Allan Nuwamanya | Full-Stack Software Engineer",
  description:
    "Full-stack software engineer crafting high-performance modern web applications, scalable distributed backends, and responsive user experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://allannuwamanya.dev",
  ogImage: "/images/allan.jpg",
  links: {
    github: "https://github.com/allannuwamanya",
    linkedin: "https://linkedin.com/in/allan-nuwamanya",
    twitter: "https://x.com/allannuwamanya",
    email: "allannuwamanya@example.com",
    resume: "/resume.pdf",
  },
};

export const mainNav: NavItem[] = [
  { title: "About", href: "/about" },
  { title: "Experience", href: "/experience" },
  { title: "Projects", href: "/projects" },
  { title: "Skills", href: "/skills" },
  { title: "Writing", href: "/blog" },
  { title: "Contact", href: "/contact" },
];
