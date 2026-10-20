import { ExperienceItem } from "@/types";

/**
 * Internships, jobs, hackathons, fellowships and competitions — newest first
 * is not required, the page sorts by start date.
 *
 * Only list what you can stand behind: every line here is read by recruiters.
 * The page, its filters and the nav link are already wired; add an object and
 * it appears.
 *
 * Photos and certificates go in the R2 bucket (NEXT_PUBLIC_ASSETS_URL) and are
 * referenced by path.
 *
 *   {
 *     id: "exp-kampala-hack-2025",
 *     kind: "Hackathon",   // Founder | Internship | Full-time | Contract | Hackathon |
 *                          // Bootcamp | Fellowship | Volunteer | Open Source | Competition
 *     role: "Backend Engineer",
 *     organization: "Kampala Tech Hackathon",
 *     organizationUrl: "https://...",          // optional
 *     location: "Kampala, Uganda",
 *     startDate: "2025-03",                    // YYYY-MM or YYYY
 *     endDate: "2025-03",                      // optional; "Present" if ongoing
 *     summary: "One line on what it was and what you owned.",
 *     highlights: ["Built X so that Y.", "Shipped Z in 48 hours."],   // optional
 *     outcome: "1st place of 40 teams",        // optional
 *     technologies: ["Python", "FastAPI"],     // optional
 *     logo: { src: "/experience/logos/acme.jpg", alt: "Acme logo" },   // optional, shown beside the title
 *     collaborators: [{ name: "Partner Co", url: "https://...", logo: { src: "...", alt: "..." } }],   // optional, shares the entry
 *     images: [                                // optional; first is the cover, all open in a lightbox
 *       { src: "/experience/kampala-hack-2025.jpg", alt: "The team presenting on stage" },
 *     ],
 *     link: "https://...",                     // optional: certificate / write-up
 *   }
 */
export const experienceData: ExperienceItem[] = [
  {
    id: "langratia-cofounder",
    kind: "Founder",
    role: "Co-founder",
    organization: "Langratia",
    organizationUrl: "https://langratia.com/",
    location: "Uganda",
    startDate: "2026-07",
    endDate: "Present",
    summary:
      "A custom software and enterprise engineering studio that builds digital products, operational systems and secure infrastructure for businesses.",
  },
  {
    id: "blue-ox-kampus-2026",
    kind: "Internship",
    role: "Intern",
    organization: "Blue Ox Kampus",
    organizationUrl: "https://www.blueoxkampus.com/",
    location: "Mbarara, Uganda",
    startDate: "2026-06",
    endDate: "2026-07",
    summary:
      "A collaboration internship between Blue Ox Kampus, a mission-funded creative hub in Mbarara that raises and equips faith-driven creatives, and Odd Shoes, a software company in Mbarara that builds tech products for founders.",
    logo: { src: "/experience/logos/blue-ox-kampus-mark.jpg", alt: "Blue Ox Kampus logo" },
    collaborators: [
      {
        name: "Odd Shoes",
        url: "https://www.oddshoes.dev/",
        logo: { src: "/experience/logos/odd-shoes.jpg", alt: "Odd Shoes logo" },
      },
    ],
  },
  {
    id: "kreative-campus-2025",
    kind: "Internship",
    role: "Intern",
    organization: "Kreative Campus",
    organizationUrl: "https://kreativecampus.org/",
    location: "Mbarara, Uganda",
    startDate: "2025-06",
    endDate: "2025-07",
    summary:
      "Internship at Kreative Campus, an organisation in Mbarara that helps creatives and startups earn income from their skills by connecting talent with markets, training, and commercialisation.",
    logo: { src: "/experience/logos/kreative-campus-wide.jpg", alt: "Kreative Campus logo" },
  },
  {
    id: "paylink-tech-preneurship-2025",
    kind: "Bootcamp",
    role: "Pitched PayLink",
    organization: "Tech-Preneurship Bootcamp 2025 · Mbarara University of Science & Technology (IUC-UCoBS) × Kreative Campus",
    location: "Mbarara, Uganda",
    startDate: "2025",
    summary:
      "Pitched PayLink on the bootcamp's final day: a payments platform that brings mobile-money services and utilities into one seamless app through public APIs, so people no longer need a separate app for each.",
    highlights: [
      "Designed PayLink to consolidate mobile-money services and utilities behind a single interface built on public APIs.",
      "Proposed a business model of a 1.5% transaction fee, sponsored integrations, and premium payment features.",
      "Took a security-first approach to how the platform handles transactions.",
    ],
    technologies: ["Public APIs", "Mobile Money", "FinTech"],
    images: [
      {
        src: "/experience/paylink-pitch-2.jpg",
        alt: "Pitching PayLink on stage at the Tech-Preneurship Bootcamp 2025, broadcast live from TIV Mbarara.",
      },
      {
        src: "/experience/paylink-pitch-1.jpg",
        alt: "Presenting during the session on synergy between IUC-UCoBS Projects 5 and 6, with a teammate at the laptop.",
      },
      {
        src: "/certifications/tech-preneurship-bootcamp-2025.jpg",
        alt: "Receiving a certificate on stage at the end of the bootcamp.",
      },
    ],
  },
];
