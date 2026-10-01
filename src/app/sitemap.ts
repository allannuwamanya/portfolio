import type { MetadataRoute } from "next";
import { projectsData } from "@/data/projects";

/**
 * Generated sitemap. With `output: "export"` this is evaluated at build
 * time and emitted as a static /sitemap.xml.
 *
 * next.config.mjs sets basePath to "/portfolio" in production, and Next
 * applies that prefix to metadata routes automatically — so paths here
 * stay unprefixed and relative to the site root.
 */

// Required alongside `output: "export"`: metadata routes must declare that
// they are static or Next refuses to prerender them.
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://allannuwamanya.dev";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/experience`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/projects`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/skills`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/blog`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  // Every project gets its case-study route, matching generateStaticParams.
  const projectRoutes: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}