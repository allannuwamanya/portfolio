import { Certification } from "@/types";

/**
 * Certificates and awards, newest first is not required — the page sorts by date.
 *
 * Scans and photos live in the R2 bucket (NEXT_PUBLIC_ASSETS_URL) under
 * `certifications/`. Add `verifyUrl` only once you have opened the link and
 * confirmed it resolves for a stranger.
 *
 *   {
 *     id: "cert-slug",
 *     kind: "Certificate",             // Certificate | Award
 *     title: "Elements of AI",
 *     issuer: "University of Helsinki × MinnaLearn",
 *     partners: ["VLIR-UOS"],          // optional
 *     date: "2026-04-12",              // YYYY-MM-DD, YYYY-MM or YYYY
 *     credential: "Certificate of Completion",   // optional: what the document calls itself
 *     detail: "2 ECTS credits",        // optional chip
 *     summary: "What it covered, in your own words.",
 *     skills: ["Machine Learning"],    // optional
 *     image: { src: "/certifications/elements-of-ai.jpg", alt: "..." },
 *     imageFit: "document",            // "photo" to crop a photograph instead
 *     verifyUrl: "https://...",        // optional
 *   }
 */
export const certificationsData: Certification[] = [
  {
    id: "must-python-2026",
    kind: "Certificate",
    title: "Introduction to Python Programming",
    issuer: "Mbarara University of Science & Technology · IUC-UCoBS",
    partners: ["VLIR-UOS", "Vrije Universiteit Brussel", "Ghent University"],
    date: "2026-04-17",
    credential: "Certificate of Participation",
    detail: "13–17 April 2026",
    summary:
      "A five-day hands-on course taught by facilitators from Ghent University: the basics of Python, data structures, scientific computing with NumPy, and plotting with Matplotlib, worked through in Jupyter Notebooks and Google Colab.",
    skills: ["Python", "NumPy", "Matplotlib", "Jupyter"],
    image: {
      src: "/certifications/must-python-programming.jpg",
      alt: "Certificate of Participation in the Python Programming Training at Mbarara University of Science & Technology, 13th to 17th April 2026, signed by the Dean of the Faculty of Computing & Informatics and two Ghent University instructors.",
    },
  },
  {
    id: "elements-of-ai-2026",
    kind: "Certificate",
    title: "Elements of AI",
    issuer: "University of Helsinki × MinnaLearn",
    date: "2026-04-12",
    credential: "Certificate of Completion",
    detail: "2 ECTS credits",
    summary:
      "An online course on the ideas behind artificial intelligence, going past the hype to the maths and logic of neural networks and data science.",
    skills: ["Machine Learning", "Neural Networks", "Data Science"],
    image: {
      src: "/certifications/elements-of-ai.jpg",
      alt: "Elements of AI certificate of completion for a 2 ECTS credits online course, issued by the University of Helsinki and MinnaLearn on 12 April 2026.",
    },
  },
  {
    id: "tech-preneurship-2025",
    kind: "Certificate",
    title: "Tech-Preneurship Bootcamp 2025",
    issuer: "Mbarara University of Science & Technology (IUC-UCoBS) × Kreative Campus",
    date: "2025",
    summary:
      "Presented on stage at the bootcamp's final-day session, where I pitched PayLink, a payments platform that brings mobile money and utilities into one app.",
    skills: ["Entrepreneurship", "Pitching", "FinTech"],
    image: {
      src: "/certifications/tech-preneurship-bootcamp-2025.jpg",
      alt: "Receiving a certificate on stage at the Tech-Preneurship Bootcamp 2025, broadcast live from TIV Mbarara.",
    },
    imageFit: "photo",
  },
  {
    id: "alx-aice-2024",
    kind: "Certificate",
    title: "AI Career Essentials",
    issuer: "ALX Africa",
    date: "2024-07-08",
    credential: "Certificate of Achievement",
    detail: "8-week programme",
    summary:
      "An eight-week programme in AI-augmented professional development: practical generative AI and prompt engineering, plus eight core professional meta-skills including critical thinking, leading self, and communicating for impact.",
    skills: ["Generative AI", "Prompt Engineering", "Critical Thinking"],
    image: {
      src: "/certifications/alx-ai-career-essentials.jpg",
      alt: "ALX AI Career Essentials certificate of achievement for an 8-week programme in AI Augmented Professional Development Skills in the Digital Age, issued 8 July 2024.",
    },
  },
];
