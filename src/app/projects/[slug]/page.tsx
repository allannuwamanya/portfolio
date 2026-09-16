import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, Tag, Layers } from "lucide-react";
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
    ? { title: `${project.title} — Case Study`, description: project.description }
    : { title: "Project not found" };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((item) => item.slug === slug);

  if (!project) notFound();

  const caseStudySections = [
    {
      label: "The Problem",
      content:
        "This section will describe the specific technical or design challenge that prompted building this project. What pain point was being solved? What limitations existed in the current landscape?",
    },
    {
      label: "My Approach",
      content:
        "This section explains the decision-making process: why this specific technology stack was chosen, what architectural trade-offs were made, and how the solution was structured from the ground up.",
    },
    {
      label: "Key Engineering Decisions",
      content:
        "Here we dive into the most technically interesting choices — database schema design, caching strategy, real-time synchronization patterns, or performance optimization techniques applied.",
    },
    {
      label: "Results & Impact",
      content:
        "The measurable outcomes of the project — performance benchmarks, user growth, conversion rates, or developer experience improvements achieved after shipping.",
    },
  ];

  return (
    <article>
      {/* Hero header */}
      <div className="relative overflow-hidden border-b border-border/60 bg-card/40">
        <div aria-hidden className="absolute inset-0 dot-grid opacity-30" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.08) 0%, transparent 70%)" }}
        />

        <div className="container relative z-10 max-w-4xl py-24">
          <Link
            href="/projects"
            className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to projects
          </Link>

          <p className="mb-4 font-mono text-sm uppercase tracking-widest text-accent">
            {project.category} · Case Study
          </p>

          <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            {project.title}
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-accent-foreground shadow-glow transition-all hover:scale-105"
              >
                <ExternalLink className="h-4 w-4" />
                Live demo
              </Link>
            )}
            {project.repoUrl && (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-bold transition-all hover:border-accent/50 hover:bg-accent/5"
              >
                <Github className="h-4 w-4" />
                Source code
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container max-w-4xl py-16">
        {/* Meta grid */}
        <div className="mb-14 grid gap-4 sm:grid-cols-3">
          <div className="bento-card flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent">
              <Layers className="h-3.5 w-3.5" /> Category
            </div>
            <p className="font-bold text-foreground">{project.category}</p>
          </div>
          <div className="bento-card flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent">
              <Tag className="h-3.5 w-3.5" /> Tech Stack
            </div>
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 3).map((t, i) => (
                <React.Fragment key={t}>
                  {i > 0 && <span className="text-muted-foreground"> · </span>}
                  <span className="text-xs font-bold text-foreground">{t}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
          {project.metrics && project.metrics[0] && (
            <div className="bento-card flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent">
                <ArrowUpRight className="h-3.5 w-3.5" /> Key Metric
              </div>
              <p className="text-2xl font-black gradient-text">{project.metrics[0].value}</p>
              <p className="text-xs text-muted-foreground">{project.metrics[0].label}</p>
            </div>
          )}
        </div>

        {/* Stack badges */}
        <div className="mb-14">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">Full stack</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-xl border border-border/60 bg-secondary/60 px-3 py-1.5 text-xs font-bold text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Case Study narrative */}
        <div className="space-y-12">
          {caseStudySections.map((section, i) => (
            <section key={section.label}>
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-accent opacity-60">0{i + 1}</span>
                <h2 className="text-2xl font-black text-foreground">{section.label}</h2>
              </div>
              <div className="ml-6 border-l border-border/60 pl-6">
                <p className="text-base leading-relaxed text-muted-foreground">{section.content}</p>
              </div>
            </section>
          ))}
        </div>

        {/* Metrics panel */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-14 rounded-[1.25rem] border border-accent/20 bg-accent/5 p-8">
            <p className="mb-8 font-mono text-xs uppercase tracking-widest text-accent">Measured outcomes</p>
            <div className="grid gap-8 sm:grid-cols-2">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="text-5xl font-black gradient-text">{metric.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> All projects
          </Link>
          <Link
            href="/#contact"
            className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-accent-foreground shadow-glow transition-all hover:scale-105"
          >
            Work together <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

