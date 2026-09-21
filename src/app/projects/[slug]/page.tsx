import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  ExternalLink,
  Tag,
  Layers,
  Star,
  CheckCircle2,
  Cpu,
  Workflow,
  Sparkles,
} from "lucide-react";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import React from "react";

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
    ? {
        title: `${project.title} — Case Study & Architecture`,
        description: `${project.tagline}. ${project.description}`,
      }
    : { title: "Project Not Found" };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((item) => item.slug === slug);

  if (!project) notFound();

  const caseStudy = project.caseStudy;

  return (
    <article className="min-h-screen">
      {/* Hero Header */}
      <div className="border-b border-border bg-card">
        <div className="container max-w-4xl py-24">
          <Link
            href="/projects"
            className="group mb-12 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to engineering archive
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">
              {project.category}
            </span>
            {project.stars !== undefined && project.stars > 0 && (
              <span className="flex items-center gap-1.5 font-mono text-xs font-bold text-muted-foreground">
                <Star className="h-3 w-3" />
                {project.stars} Stars
              </span>
            )}
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-foreground">
            {project.title}
          </h1>

          <p className="mt-6 text-xl font-medium leading-relaxed text-foreground/80">
            {project.tagline}
          </p>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-3xl">
            {project.description}
          </p>

          {/* Action links */}
          <div className="mt-10 flex flex-wrap gap-4">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 text-sm font-bold text-background transition-transform hover:scale-105"
              >
                Visit Live Site <ExternalLink className="h-4 w-4" />
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-bold text-foreground transition-all hover:bg-secondary"
              >
                View Source <Github className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="container max-w-4xl py-20">
        {/* Core Specs */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-20">
          <div className="flex flex-col gap-1 border-l-2 border-border pl-4">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Year</span>
            <span className="font-mono font-medium text-foreground">{caseStudy?.year || "2024"}</span>
          </div>
          <div className="flex flex-col gap-1 border-l-2 border-border pl-4">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Role</span>
            <span className="font-medium text-foreground">{caseStudy?.role || "Lead Engineer"}</span>
          </div>
          <div className="flex flex-col gap-1 border-l-2 border-border pl-4">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Stack</span>
            <span className="font-medium text-foreground">{project.tags.slice(0,2).join(", ")}</span>
          </div>
          {project.metrics && project.metrics.length > 0 && (
            <div className="flex flex-col gap-1 border-l-2 border-accent pl-4">
              <span className="text-xs font-bold text-accent uppercase tracking-widest">Scale</span>
              <span className="font-bold text-foreground">{project.metrics[0].value}</span>
            </div>
          )}
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_250px]">
          {/* Main Case Study Content */}
          <div className="space-y-16">
            
            {/* The Problem */}
            <section>
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-black text-foreground">
                <span className="h-6 w-1.5 rounded-full bg-accent" />
                The Challenge
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {caseStudy?.problem.map((para, i) => (
                  <p key={i}>{para}</p>
                )) || <p>No challenge documentation provided.</p>}
              </div>
            </section>

            {/* Architecture / Solution */}
            <section>
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-black text-foreground">
                <span className="h-6 w-1.5 rounded-full bg-accent" />
                Architecture &amp; Solution
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                {caseStudy?.solution.map((para, i) => (
                  <p key={i}>{para}</p>
                )) || <p>No architecture documentation provided.</p>}
              </div>

              {/* ASCII Diagram if it exists */}
              {caseStudy?.architectureDiagram && (
                <div className="my-8 rounded-xl border border-border bg-[#0d0d0d] p-6 overflow-x-auto">
                  <div className="mb-4 flex items-center gap-2">
                    <Workflow className="h-4 w-4 text-muted-foreground" />
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">System Architecture</span>
                  </div>
                  <pre className="font-mono text-[10px] sm:text-xs leading-[1.1] text-foreground/80 selection:bg-accent/30 selection:text-accent">
                    {caseStudy.architectureDiagram}
                  </pre>
                </div>
              )}
            </section>

            {/* Key Features */}
            {caseStudy?.features && (
              <section>
                <h2 className="mb-6 flex items-center gap-2 text-2xl font-black text-foreground">
                  <span className="h-6 w-1.5 rounded-full bg-accent" />
                  Key Implementations
                </h2>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {caseStudy.features.map((feature, i) => (
                    <li key={i} className="flex gap-3 rounded-xl border border-border bg-card p-5">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            {/* Tech Stack */}
            <div>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground">
                <Layers className="h-4 w-4" /> Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-secondary px-3 py-1.5 text-xs font-bold text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics */}
            {project.metrics && project.metrics.length > 0 && (
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground">
                  <Sparkles className="h-4 w-4" /> Impact
                </h3>
                <div className="flex flex-col gap-3">
                  {project.metrics.map((metric, i) => (
                    <div key={i} className="rounded-lg border border-border bg-card p-4">
                      <div className="text-xl font-black text-foreground mb-1">{metric.value}</div>
                      <div className="text-xs font-medium text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
