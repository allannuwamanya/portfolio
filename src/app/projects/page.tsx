import { Metadata } from "next";
import { projectsData } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Showcase of featured software projects, case studies, and architectures.",
};

export default function ProjectsPage() {
  return (
    <div className="container max-w-5xl py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects Showcase</h1>
        <p className="text-muted-foreground">
          A selection of projects, platforms, and open-source systems I have engineered.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm"
          >
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{project.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
