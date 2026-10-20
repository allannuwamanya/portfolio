import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";

/** Absolute URL for a site path. Every page uses a trailing slash (next.config trailingSlash). */
export function absoluteUrl(path = "/") {
  const clean = path === "/" ? "/" : `/${path.replace(/^\/|\/$/g, "")}/`;
  return `${siteConfig.url}${clean}`;
}

/** Trims text to a search-snippet length on a word boundary. */
export function snippet(text: string, max = 160) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

/**
 * Per-page metadata. Setting `title` alone would leave the root layout's
 * Open Graph title, description and URL on every page, so each page restates them.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: fullTitle, description, siteName: siteConfig.name, locale: "en_US" },
    twitter: { card: "summary_large_image", title: fullTitle, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export const PERSON_ID = `${siteConfig.url}/#person`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

/** Site-wide identity: who is behind the site, and the official profiles that confirm it. */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${siteConfig.url}/`,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: siteConfig.name,
      url: `${siteConfig.url}/`,
      image: `${siteConfig.url}/images/allan-circle.jpg`,
      jobTitle: "Software Engineer",
      description: siteConfig.description,
      address: { "@type": "PostalAddress", addressLocality: "Kampala", addressCountry: "UG" },
      worksFor: { "@type": "Organization", name: "Langratia", url: "https://langratia.com/" },
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "Mbarara University of Science & Technology",
        url: "https://www.must.ac.ug",
      },
      knowsAbout: [
        "Software engineering",
        "Web application development",
        "Artificial intelligence",
        "Speech AI for low-resource languages",
        "Backend systems",
      ],
      sameAs: [siteConfig.links.github, siteConfig.links.linkedin, siteConfig.links.twitter].filter(Boolean),
    },
  ],
};

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
