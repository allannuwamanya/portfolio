import { Metadata } from "next";
import { projectsData } from "@/data/projects";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects",
  description: "Showcase of featured software projects, case studies, and architectures.",
};

export default function ProjectsPage() {
  return (
    <div className="container max-w-6xl py-28">
      <div className="mb-14 max-w-2xl">
        <p className="mb-3 font-mono text-sm uppercase tracking-wider text-accent">03 / project archive</p>
        <h1 className="text-5xl font-black tracking-tight sm:text-6xl">Built to be useful.</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          A working archive of products, systems, and experiments. The public GitHub profile is the most complete view of my repositories.
        </p>
        <Link
          href="https://github.com/allannuwamanya"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline"
        >
          <Github className="h-4 w-4" /> Browse GitHub <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {projectsData.map((project, index) => (
          <div
            key={project.id}
            className="group rounded-[1.25rem] border border-border/80 bg-card p-7 text-card-foreground transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow"
          >
            <div className="mb-10 flex items-center justify-between">
              <span className="font-mono text-xs text-accent">0{index + 1}</span>
              <span className="rounded-full border border-border px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{project.category}</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight">{project.title}</h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-[10px] font-bold text-muted-foreground">{tag}</span>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-4 border-t border-border/70 pt-5">
              {project.demoUrl && <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-accent hover:underline">Live demo ↗</Link>}
              {project.repoUrl && <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-muted-foreground hover:text-foreground">Source ↗</Link>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
