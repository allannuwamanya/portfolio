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
      <div className="relative overflow-hidden border-b border-border/60 bg-card/30">
        <div aria-hidden className="absolute inset-0 dot-grid opacity-25" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent) / 0.1) 0%, transparent 70%)",
          }}
        />

        <div className="container relative z-10 max-w-4xl py-24">
          <Link
            href="/projects"
            className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to engineering archive
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-accent">
              {project.category}
            </span>
            {project.stars !== undefined && project.stars > 0 && (
              <span className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-black text-amber-400">
                <Star className="h-3 w-3 fill-amber-400" />
                {project.stars} GitHub Stars
              </span>
            )}
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-foreground">
            {project.title}
          </h1>

          <p className="mt-4 text-xl font-medium leading-relaxed text-accent">
            {project.tagline}
          </p>

          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Action links */}
          <div className="mt-8 flex flex-wrap gap-3">
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-glow transition-all hover:scale-105"
              >
                <ExternalLink className="h-4 w-4" />
                Visit live deployment
              </Link>
            )}
            {project.repoUrl && (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3 text-sm font-bold text-foreground backdrop-blur-sm transition-all hover:border-accent/50 hover:bg-accent/5"
              >
                <Github className="h-4 w-4" />
                View source on GitHub
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container max-w-4xl py-16">
        {/* Meta summary cards */}
        <div className="mb-14 grid gap-4 sm:grid-cols-3">
          <div className="gradient-border bento-card flex flex-col gap-1.5 p-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent">
              <Layers className="h-3.5 w-3.5" /> Domain
            </div>
            <p className="text-base font-bold text-foreground">{project.category}</p>
          </div>

          <div className="gradient-border bento-card flex flex-col gap-1.5 p-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent">
              <Tag className="h-3.5 w-3.5" /> Primary Stack
            </div>
            <p className="text-sm font-bold text-foreground line-clamp-1">
              {project.tags.slice(0, 2).join(" · ")}
            </p>
          </div>

          {project.metrics && project.metrics[0] && (
            <div className="gradient-border bento-card flex flex-col gap-1.5 p-5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent">
                <ArrowUpRight className="h-3.5 w-3.5" /> Key Signal
              </div>
              <p className="text-xl font-black gradient-text">{project.metrics[0].value}</p>
              <p className="text-[10px] text-muted-foreground">{project.metrics[0].label}</p>
            </div>
          )}
        </div>

        {/* Tech Badges */}
        <div className="mb-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Complete Technology Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-xl border border-border/80 bg-secondary/70 px-3 py-1.5 text-xs font-bold text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Case Study Narrative */}
        {caseStudy ? (
          <div className="space-y-16">
            {/* 01: The Problem / Context */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-accent">01 /</span>
                <h2 className="text-2xl font-black tracking-tight text-foreground">
                  The Problem &amp; Technical Bottleneck
                </h2>
              </div>
              <div className="ml-5 border-l-2 border-border/80 pl-6">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {caseStudy.challenge}
                </p>
              </div>
            </section>

            {/* 02: Architectural Approach */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-accent">02 /</span>
                <h2 className="text-2xl font-black tracking-tight text-foreground">
                  Architectural Approach &amp; System Design
                </h2>
              </div>
              <div className="ml-5 border-l-2 border-border/80 pl-6 space-y-6">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {caseStudy.approach}
                </p>

                {caseStudy.architectureDiagram && (
                  <div className="rounded-2xl border border-border/90 bg-card/80 p-5 font-mono text-xs text-foreground/90 overflow-x-auto shadow-2xl">
                    <div className="flex items-center gap-2 pb-3 mb-3 border-b border-border/60 text-muted-foreground text-[10px]">
                      <span className="h-2 w-2 rounded-full bg-red-400/80" />
                      <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                      <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                      <span className="ml-2 font-bold uppercase tracking-wider">
                        Topology Overview
                      </span>
                    </div>
                    <pre className="leading-relaxed whitespace-pre font-mono">
                      {caseStudy.architectureDiagram}
                    </pre>
                  </div>
                )}
              </div>
            </section>

            {/* 03: Key Decisions */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-accent">03 /</span>
                <h2 className="text-2xl font-black tracking-tight text-foreground">
                  Key Engineering Decisions &amp; Trade-offs
                </h2>
              </div>
              <div className="ml-5 border-l-2 border-border/80 pl-6 space-y-4">
                {caseStudy.decisions.map((decision, di) => (
                  <div
                    key={decision.title}
                    className="rounded-2xl border border-border/80 bg-card/50 p-5 transition-all hover:border-accent/40"
                  >
                    <h3 className="text-base font-black text-foreground flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-accent" />
                      {decision.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {decision.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 04: Measured Results */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-accent">04 /</span>
                <h2 className="text-2xl font-black tracking-tight text-foreground">
                  Measurable Impact &amp; Deliverables
                </h2>
              </div>
              <div className="ml-5 border-l-2 border-border/80 pl-6">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                  <div className="space-y-3">
                    {caseStudy.impact.map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-400 mt-0.5" />
                        <span className="text-sm font-medium text-foreground/90">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-foreground">Project Summary</h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Browse all projects
          </Link>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-glow transition-all hover:scale-105"
          >
            Discuss technical collaborations
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
