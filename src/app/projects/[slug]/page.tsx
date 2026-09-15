import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((item) => item.slug === slug);

  return project
    ? { title: project.title, description: project.description }
    : { title: "Project not found" };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <article className="container max-w-4xl py-28">
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to projects
      </Link>

      <header className="mt-14 max-w-3xl">
        <p className="font-mono text-sm uppercase tracking-wider text-accent">{project.category}</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-7xl">{project.title}</h1>
        <p className="mt-6 text-xl leading-relaxed text-muted-foreground">{project.description}</p>
      </header>

      <div className="mt-10 flex flex-wrap gap-3">
        {project.demoUrl && (
          <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-accent-foreground shadow-glow">
            Live demo <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
        {project.repoUrl && (
          <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold hover:border-accent/50">
            <Github className="h-4 w-4" /> Source
          </Link>
        )}
      </div>

      <div className="mt-16 grid gap-5 sm:grid-cols-2">
        <section className="bento-card">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">The brief</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{project.tagline}</p>
        </section>
        <section className="bento-card">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Stack</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-bold text-muted-foreground">{tag}</span>
            ))}
          </div>
        </section>
      </div>

      {project.metrics && (
        <section className="mt-5 rounded-[1.25rem] border border-border/80 bg-card p-7">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">Measured outcomes</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-4xl font-black gradient-text">{metric.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
