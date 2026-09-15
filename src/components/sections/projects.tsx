"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Github, ExternalLink, ArrowRight } from "lucide-react";
import { projectsData } from "@/data/projects";
import { fadeUp } from "@/lib/animations";
import { siteConfig } from "@/lib/constants";

const CARD_GRADIENTS = [
  "from-emerald-500/20 via-teal-500/10 to-transparent",
  "from-violet-500/20 via-purple-500/10 to-transparent",
  "from-blue-500/20 via-indigo-500/10 to-transparent",
];

export function ProjectsSection() {
  const featured = projectsData.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-50" />

      <div className="container max-w-6xl relative z-10">
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          className="mb-14 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="font-mono text-sm text-accent mb-3 tracking-wider uppercase">03 / selected work</p>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">A few things I&apos;ve shipped</h2>
          </div>
          <Link href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline">
            Browse all repositories <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <motion.article
              key={project.id}
              custom={i + 1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="gradient-border bento-card group flex flex-col gap-5 overflow-hidden"
            >
              {/* Gradient image area */}
              <div className={`relative -mx-6 -mt-6 h-44 overflow-hidden bg-gradient-to-br ${CARD_GRADIENTS[i % 3]}`}>
                {/* Grid pattern */}
                <div className="absolute inset-0 dot-grid opacity-30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="text-5xl font-black font-mono text-foreground/10 group-hover:text-foreground/20 transition-colors duration-500">
                    {project.title.split(" ").map(w => w[0]).join("").slice(0, 3)}
                  </div>
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-border to-transparent" />
                  <div className="text-xs font-mono text-muted-foreground/50">{project.category}</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                {/* Hover: view project overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    View project <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-black text-foreground leading-snug">{project.title}</h3>
                  <span className="flex-shrink-0 rounded-full bg-accent/10 border border-accent/20 px-2.5 py-0.5 text-[10px] font-bold text-accent">
                    {project.category}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{project.tagline}</p>

                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex gap-4">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col">
                        <span className="text-base font-black gradient-text">{m.value}</span>
                        <span className="text-[10px] text-muted-foreground">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="rounded-lg border border-border/60 bg-secondary/60 px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-border/40 pt-4">
                {project.demoUrl && (
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-accent transition-colors">
                    <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                  </Link>
                )}
                {project.repoUrl && (
                  <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-accent transition-colors">
                    <Github className="h-3.5 w-3.5" /> Source
                  </Link>
                )}
                <Link href={`/projects/${project.slug}`}
                  className="ml-auto inline-flex items-center gap-1 text-xs font-black text-accent hover:underline">
                  Case study <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
