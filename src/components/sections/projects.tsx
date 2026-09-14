"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Github, ExternalLink, ArrowRight } from "lucide-react";
import { projectsData } from "@/data/projects";
import { fadeUp } from "@/lib/animations";

export function ProjectsSection() {
  const featured = projectsData.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="projects" className="py-24">
      <div className="container max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="font-mono text-sm text-accent mb-2">// featured work</p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Things I&apos;ve built
            </h2>
          </div>
          <Link href="/projects" className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
            View all projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <motion.article
              key={project.id}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bento-card group flex flex-col gap-5 overflow-hidden"
            >
              {/* Placeholder image area */}
              <div className="relative -mx-6 -mt-6 h-44 overflow-hidden bg-gradient-to-br from-secondary to-secondary/50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
                    <div className="text-4xl font-black font-mono">
                      {project.title.split(" ").map((w) => w[0]).join("").slice(0, 3)}
                    </div>
                    <div className="text-xs">{project.category}</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-foreground leading-snug">{project.title}</h3>
                  <span className="flex-shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent border border-accent/20">
                    {project.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{project.tagline}</p>

                {project.metrics && project.metrics.length > 0 && (
                  <div className="flex gap-3">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col">
                        <span className="text-sm font-bold text-foreground">{m.value}</span>
                        <span className="text-[10px] text-muted-foreground">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-1 mt-auto">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-border pt-4">
                {project.demoUrl && (
                  <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-accent transition-colors">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live Demo
                  </Link>
                )}
                {project.repoUrl && (
                  <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-accent transition-colors">
                    <Github className="h-3.5 w-3.5" />
                    Source
                  </Link>
                )}
                <Link href={`/projects/${project.slug}`}
                  className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
                  Case study
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
