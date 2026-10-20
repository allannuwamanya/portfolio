import type { Metadata } from "next";
import { projectsData } from "@/data/projects";
import { ProjectsArchive } from "@/components/projects/projects-archive";
import { JsonLd } from "@/components/shared/json-ld";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Software projects by Allan Nuwamanya: the LingualDub speech-AI framework, Open Data Uganda, Saccade, Twill, Collosy and more, each with source code and technical notes.",
  path: "/projects",
});

export default function ProjectsPage() {
  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects by Allan Nuwamanya",
    itemListElement: projectsData.map((project, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: project.title,
      url: absoluteUrl(`/projects/${project.slug}`),
    })),
  };

  return (
    <>
      <ProjectsArchive initialProjects={projectsData} />
      <JsonLd data={list} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }])} />
    </>
  );
}
