"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, Github, ExternalLink, ArrowRight, Star } from "lucide-react";
import { projectsData } from "@/data/projects";
import { siteConfig } from "@/lib/constants";

const CARD_GRADIENTS = [
  "from-purple-500/25 via-indigo-500/15 to-transparent",
  "from-blue-500/25 via-cyan-500/15 to-transparent",
  "from-amber-500/25 via-orange-500/15 to-transparent",
  "from-emerald-500/25 via-teal-500/15 to-transparent",
];

const CARD_ACCENT_COLORS = [
  "text-purple-400",
  "text-blue-400",
  "text-amber-400",
  "text-emerald-400",
];

function ProjectCard({ project, index }: { project: (typeof projectsData)[number]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [25, -25]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      className="gradient-border bento-card group relative flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Card number and stars */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={`font-mono text-[11px] font-bold tracking-widest ${CARD_ACCENT_COLORS[index % 4]} opacity-70`}
          >
            0{index + 1}
          </span>
          {project.stars !== undefined && project.stars > 0 && (
            <span className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-black text-amber-400">
              <Star className="h-2.5 w-2.5 fill-amber-400" />
              {project.stars} ⭐
            </span>
          )}
        </div>

        {/* Gradient artwork area */}
        <motion.div
          style={{ y }}
          className={`relative -mx-6 -mt-3 mb-5 h-44 overflow-hidden bg-gradient-to-br ${CARD_GRADIENTS[index % 4]}`}
        >
          <div className="absolute inset-0 dot-grid opacity-25" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="text-5xl font-black font-mono text-foreground/[0.08] group-hover:text-foreground/[0.18] transition-colors duration-700 select-none">
              {project.title
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 3)}
            </div>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
              {project.category}
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
            <Link
              href={`/projects/${project.slug}`}
              className="flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-2 text-xs font-bold text-accent transition-colors hover:bg-accent/25"
            >
              Explore architecture <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Card content */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-black text-foreground leading-snug text-lg group-hover:text-accent transition-colors">
              {project.title}
            </h3>
          </div>

          <p className="font-mono text-xs font-semibold text-accent/90">
            {project.tagline}
          </p>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mt-1">
            {project.description}
          </p>

          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-4 rounded-xl border border-border/50 bg-secondary/30 p-2.5">
              {project.metrics.slice(0, 2).map((m) => (
                <div key={m.label} className="flex flex-col">
                  <span className={`text-sm font-black ${CARD_ACCENT_COLORS[index % 4]}`}>{m.value}</span>
                  <span className="text-[9px] text-muted-foreground">{m.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card footer */}
      <div className="mt-6 border-t border-border/40 pt-4">
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-border/50 bg-secondary/50 px-2 py-0.5 text-[10px] font-bold text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[10px] font-bold text-muted-foreground/50 self-center">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-muted-foreground transition-colors hover:text-accent"
              >
                <ExternalLink className="h-3 w-3" /> Live
              </Link>
            )}
            {project.repoUrl && (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-muted-foreground transition-colors hover:text-accent"
              >
                <Github className="h-3 w-3" /> Code
              </Link>
            )}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 font-black text-accent hover:underline"
          >
            Case study <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const featured = projectsData.filter((p) => p.featured).slice(0, 4);

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
            <p className="font-mono text-sm text-accent mb-3 tracking-wider uppercase">03 / selected systems</p>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Software I&apos;ve{" "}
              <span className="gradient-text">engineered</span>
            </h2>
            <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
              Featured production systems — from African speech-AI frameworks and Temporal workflow engines to self-custody crypto POS bridges.
            </p>
          </div>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline"
          >
            View GitHub profile <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
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
            className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-7 py-3.5 text-sm font-bold text-foreground backdrop-blur-sm transition-all hover:border-accent/50 hover:bg-accent/5"
          >
            Explore all {projectsData.length} projects in archive
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
