"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github, ExternalLink, Star, Search, Code2 } from "lucide-react";
import { Project, ProjectCategory } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES: ProjectCategory[] = [
  "All",
  "AI & Speech",
  "Systems & Backend",
  "Fintech & Web3",
  "Open Data",
  "Web Apps",
];

export function ProjectsArchive({ initialProjects }: { initialProjects: Project[] }) {
  const [selectedCategory, setSelectedCategory] = React.useState<ProjectCategory>("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredProjects = React.useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tagline.toLowerCase().includes(query) ||
        project.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  return (
    <div className="container max-w-5xl py-24">
      {/* Header */}
      <div className="mb-12">
        <p className="font-mono text-sm text-accent mb-3 tracking-wider uppercase flex items-center gap-2">
          <span className="h-px w-8 bg-accent" /> 03 / engineering archive
        </p>
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-foreground">
          Systems &amp; software
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground font-medium">
          Production systems, AI frameworks, distributed workflow engines, and open
          data infrastructure I've built and published.
        </p>
      </div>

      {/* Filter & Search */}
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between pb-8 border-b border-border">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            const count = category === "All"
              ? initialProjects.length
              : initialProjects.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors",
                  isSelected
                    ? "bg-foreground text-background"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                )}
              >
                <span>{category}</span>
                <span className={cn("text-[10px]", isSelected ? "text-background/70" : "text-muted-foreground/70")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-accent"
          />
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-dashed border-border bg-card p-12 text-center"
          >
            <Code2 className="mx-auto h-8 w-8 text-muted-foreground mb-4" />
            <h3 className="text-base font-bold text-foreground">No projects matched</h3>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="mt-4 text-sm font-bold text-accent hover:underline"
            >
              Reset filters
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">{project.category}</span>
                    {project.stars ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
                        <Star className="h-3 w-3" /> {project.stars}
                      </span>
                    ) : null}
                  </div>

                  <Link href={`/projects/${project.slug}`}>
                    <h2 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </h2>
                  </Link>

                  <p className="mt-1 text-sm font-medium text-foreground/80">
                    {project.tagline}
                  </p>

                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-border flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="rounded bg-secondary px-2 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-bold text-foreground flex items-center gap-1 hover:text-accent transition-colors"
                    >
                      Case Study <ArrowUpRight className="h-3 w-3" />
                    </Link>
                    {project.links.github && (
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {project.links.live && (
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
