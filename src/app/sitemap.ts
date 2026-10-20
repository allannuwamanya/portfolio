import type { MetadataRoute } from "next";
import { mainNav, siteConfig } from "@/lib/constants";
import { projectsData } from "@/data/projects";

// Required alongside `output: "export"`: metadata routes must declare that
// they are static or Next refuses to prerender them.
export const dynamic = "force-static";

const PRIORITY: Record<string, number> = {
  "/projects": 0.9,
  "/experience": 0.7,
  "/skills": 0.7,
  "/certifications": 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  // Built from the nav so a new page can never be left out of the sitemap.
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    ...mainNav
      .filter((item) => item.href !== "/blog") // placeholder page, kept out of the index
      .map((item) => ({
      url: `${base}${item.href}/`,
      changeFrequency: "monthly" as const,
      priority: PRIORITY[item.href] ?? 0.6,
    })),
  ];

  const projectRoutes: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `${base}/projects/${project.slug}/`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
