export interface SiteConfig {
  name: string;
  author: string;
  title: string;
  description: string;
  url: string;
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
}

export type ProjectCategory =
  | "All"
  | "AI & Speech"
  | "Systems & Backend"
  | "Fintech & Web3"
  | "Open Data"
  | "Developer Tools"
  | "Web Apps";

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
  category: Exclude<ProjectCategory, "All">;
  featured: boolean;
  tags: string[];
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

export type ExperienceKind =
  | "Founder"
  | "Internship"
  | "Full-time"
  | "Contract"
  | "Hackathon"
  | "Bootcamp"
  | "Fellowship"
  | "Volunteer"
  | "Open Source"
  | "Competition";

/** An organisation named on an experience entry, with an optional logo and website. */
export interface OrganizationRef {
  name: string;
  url?: string;
  logo?: GalleryImage;
}

export interface ExperienceItem {
  id: string;
  kind: ExperienceKind;
  /** The role you held, or what you did: "Backend Intern", "Team Lead", "Finalist". */
  role: string;
  /** The company, programme, or organiser. */
  organization: string;
  organizationUrl?: string;
  location: string;
  /** "YYYY-MM", or "YYYY" when the month is not known. */
  startDate: string;
  /** Omit for a one-day event such as a hackathon, or set to "Present" if ongoing. */
  endDate?: string | "Present";
  /** One line: what this was and what you were responsible for. */
  summary: string;
  /** Concrete things you did or shipped. Numbers only if you can stand behind them. */
  highlights?: string[];
  /** Placement, award, or recognition: "1st place", "Top 10 of 120 teams". */
  outcome?: string;
  technologies?: string[];
  /** The organisation's logo, shown beside the title. Resolved by assetUrl(). */
  logo?: GalleryImage;
  /** Organisations this was done together with. They share the entry, logos and title line. */
  collaborators?: OrganizationRef[];
  /** Photos, the first one is the cover. They open in a lightbox. */
  images?: GalleryImage[];
  /** Certificate, project page, or write-up. */
  link?: string;
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

export interface GalleryImage {
  /** Path resolved by assetUrl() — e.g. "/events/ieee-spax-banner.jpg" (served from R2). */
  src: string;
  /** Describe the photo for someone who cannot see it. Also shown as the lightbox caption. */
  alt: string;
}

export type CommunityEventKind =
  | "Workshop"
  | "Conference"
  | "Meetup"
  | "Hackathon"
  | "Talk"
  | "Training";

export interface CommunityEvent {
  id: string;
  title: string;
  /** The community, company, or programme that ran it. */
  host: string;
  kind: CommunityEventKind;
  /** "attended" = you joined it, "spoke" = you presented, "mentored" = you helped run it. */
  role: "attended" | "spoke" | "mentored";
  /** "YYYY-MM" or "YYYY-MM-DD". Omit if the date is not confirmed yet. */
  date?: string;
  /** Lists this event first within its year, ahead of the date order. */
  pinned?: boolean;
  /** For multi-day events, the last day, in the same format as `date`. */
  endDate?: string;
  location: string;
  format?: "In person" | "Virtual" | "Hybrid";
  /** Photos, the first one is the cover. They open in a lightbox. */
  images?: GalleryImage[];
  summary: string;
  /** What it changed in your work. This is the part a reader actually cares about. */
  takeaway?: string;
  /** Slides, a write-up, or the event page itself. */
  link?: string;
}

export type CertificationKind = "Certificate" | "Award";

export interface Certification {
  id: string;
  kind: CertificationKind;
  /** The name on the certificate: "Elements of AI". */
  title: string;
  /** Who issued it. */
  issuer: string;
  /** Partner institutions named on the certificate. */
  partners?: string[];
  /** "YYYY-MM-DD", "YYYY-MM" or "YYYY" — when it was issued or awarded. */
  date: string;
  /** What the document itself calls it: "Certificate of Completion". */
  credential?: string;
  /** "2 ECTS credits", "8-week programme". */
  detail?: string;
  /** What it covered, in your own words. */
  summary: string;
  skills?: string[];
  /** The certificate scan or photo. Opens in a lightbox. */
  image: GalleryImage;
  /** "document" (default) shows the whole certificate; "photo" crops to fill the frame. */
  imageFit?: "document" | "photo";
  /** Public verification page. Only add one you have confirmed opens. */
  verifyUrl?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  institutionUrl?: string;
  location: string;
  /** Year the programme ends, e.g. "2027". */
  graduation: string;
  /** True while the programme is still running. */
  current?: boolean;
}
