import { Metadata } from "next";
import { projectsData } from "@/data/projects";
import { ProjectsArchive } from "@/components/projects/projects-archive";

export const metadata: Metadata = {
  title: "Engineering Projects & Systems",
  description:
    "Curated portfolio of real software systems: LingualDub speech-AI framework, Collosy Temporal engine, Sunmi crypto-fiat POS bridge, and Open Data Uganda.",
};

export default function ProjectsPage() {
  return <ProjectsArchive initialProjects={projectsData} />;
}
