export interface SiteConfig {
  name: string;
  author: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    linkedin: string;
    twitter?: string;
    email: string;
    resume?: string;
  };
}

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

export type ProjectCategory =
  | "All"
  | "AI & Speech"
  | "Systems & Backend"
  | "Fintech & Web3"
  | "Open Data"
  | "Web Apps";

export interface CaseStudySection {
  title: string;
  subtitle?: string;
  content: string;
  bullets?: string[];
  codeOrArch?: string;
}

export interface CaseStudyDetails {
  challenge: string;
  approach: string;
  architectureDiagram?: string;
  decisions: { title: string; explanation: string }[];
  impact: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: "AI & Speech" | "Systems & Backend" | "Fintech & Web3" | "Open Data" | "Web Apps";
  featured: boolean;
  tags: string[];
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
  stars?: number;
  metrics?: {
    label: string;
    value: string;
  }[];
  caseStudy?: CaseStudyDetails;
  startDate?: string;
  endDate?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate: string | "Present";
  current: boolean;
  description: string[];
  technologies: string[];
}

export interface Skill {
  name: string;
  icon?: string;
  level?: "Expert" | "Proficient" | "Familiar";
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  published: boolean;
  coverImage?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
