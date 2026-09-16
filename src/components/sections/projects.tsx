"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, Github, ExternalLink, ArrowRight } from "lucide-react";
import { projectsData } from "@/data/projects";
import { siteConfig } from "@/lib/constants";

const CARD_GRADIENTS = [
  "from-emerald-500/30 via-teal-500/15 to-transparent",
  "from-violet-500/30 via-purple-500/15 to-transparent",
  "from-blue-500/30 via-indigo-500/15 to-transparent",
];

const CARD_ACCENT_COLORS = [
  "text-emerald-400",
  "text-violet-400",
  "text-blue-400",
];

function ProjectCard({ project, index }: { project: (typeof projectsData)[number]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.12 }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      className="gradient-border bento-card group relative flex flex-col gap-5 overflow-hidden"
    >
      {/* Card number */}
      <span
        className={`absolute top-4 right-5 font-mono text-[11px] font-bold tracking-widest ${CARD_ACCENT_COLORS[index % 3]} opacity-60`}
      >
        0{index + 1}
      </span>

      {/* Gradient image area */}
      <motion.div
        style={{ y }}
        className={`relative -mx-6 -mt-6 h-52 overflow-hidden bg-gradient-to-br ${CARD_GRADIENTS[index % 3]}`}
      >
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="text-6xl font-black font-mono text-foreground/[0.07] group-hover:text-foreground/[0.14] transition-colors duration-700 select-none">
            {project.title
              .split(" ")
              .map((w) => w[0])
              .join("")
              .slice(0, 3)}
          </div>
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
            {project.category}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-bold text-accent transition-colors hover:bg-accent/20"
          >
            View case study <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </motion.div>

      {/* Card content */}
      <div className="flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2 pr-6">
          <h3 className="font-black text-foreground leading-snug text-lg">{project.title}</h3>
        </div>

        <span className="w-fit rounded-full border border-border/60 bg-secondary/60 px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
          {project.category}
        </span>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{project.tagline}</p>

        {project.metrics && project.metrics.length > 0 && (
          <div className="flex gap-5 mt-1">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex flex-col">
                <span className={`text-base font-black ${CARD_ACCENT_COLORS[index % 3]}`}>{m.value}</span>
                <span className="text-[10px] text-muted-foreground">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-border/50 bg-secondary/50 px-2 py-0.5 text-[10px] font-bold text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card footer */}
      <div className="flex items-center gap-3 border-t border-border/40 pt-4">
        {project.demoUrl && (
          <Link
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground transition-colors hover:text-accent"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Live
          </Link>
        )}
        {project.repoUrl && (
          <Link
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground transition-colors hover:text-accent"
          >
            <Github className="h-3.5 w-3.5" /> Source
          </Link>
        )}
        <Link
          href={`/projects/${project.slug}`}
          className="ml-auto inline-flex items-center gap-1 text-xs font-black text-accent hover:underline"
        >
          Case study <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const featured = projectsData.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-40" />

      {/* Decorative large background number */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none text-[22vw] font-black leading-none text-foreground/[0.02] lg:text-[16vw]"
      >
        03
      </div>

      <div className="container max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="font-mono text-sm text-accent mb-3 tracking-wider uppercase">03 / selected work</p>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              A few things I&apos;ve{" "}
              <span className="gradient-text">shipped</span>
            </h2>
            <p className="mt-4 max-w-lg text-base text-muted-foreground leading-relaxed">
              Production-grade software I&apos;ve designed, built, and deployed — from SaaS platforms to distributed systems.
            </p>
          </div>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline"
          >
            Browse all repositories <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-6 py-3.5 text-sm font-bold text-foreground backdrop-blur-sm transition-all hover:border-accent/50 hover:bg-accent/5"
          >
            View all projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
