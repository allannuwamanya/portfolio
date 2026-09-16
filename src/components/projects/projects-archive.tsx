"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github, ExternalLink, Star, Search, Sparkles, Code2, Database } from "lucide-react";
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

const CATEGORY_STYLES: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  "AI & Speech": {
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    glow: "from-purple-500/20",
  },
  "Systems & Backend": {
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    glow: "from-blue-500/20",
  },
  "Fintech & Web3": {
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    glow: "from-amber-500/20",
  },
  "Open Data": {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    glow: "from-emerald-500/20",
  },
  "Web Apps": {
    border: "border-teal-500/30",
    bg: "bg-teal-500/10",
    text: "text-teal-400",
    glow: "from-teal-500/20",
  },
};

export function ProjectsArchive({ initialProjects }: { initialProjects: Project[] }) {
  const [selectedCategory, setSelectedCategory] = React.useState<ProjectCategory>("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredProjects = React.useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
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
    <div className="container max-w-6xl py-24">
      {/* Header */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            03 / engineering archive
          </span>
          <span className="h-1 w-1 rounded-full bg-accent/60" />
          <span className="font-mono text-xs text-muted-foreground">
            {initialProjects.length} projects documented
          </span>
        </div>
        <h1 className="text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
          Systems &amp; <span className="gradient-text">software</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Real production systems, speech-AI frameworks, distributed workflow engines, and open
          data infrastructure I&apos;ve architected, coded, and published.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            const count =
              category === "All"
                ? initialProjects.length
                : initialProjects.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200",
                  isSelected
                    ? "bg-accent text-accent-foreground shadow-glow-sm"
                    : "border border-border/80 bg-card/60 text-muted-foreground hover:border-accent/40 hover:text-foreground"
                )}
              >
                <span>{category}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 text-[10px]",
                    isSelected ? "bg-accent-foreground/20 text-accent-foreground" : "bg-secondary text-muted-foreground"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by tech or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-border/80 bg-card/60 py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-accent focus:ring-1 focus:ring-accent/30"
          />
        </div>
      </div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[1.5rem] border border-dashed border-border/80 bg-card/40 p-16 text-center"
          >
            <Code2 className="mx-auto h-8 w-8 text-muted-foreground/40 mb-3" />
            <h3 className="text-base font-bold text-foreground">No projects matched your criteria</h3>
            <p className="mt-1 text-sm text-muted-foreground">Try selecting a different category or clearing the search query.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-5 text-xs font-bold text-accent hover:underline"
            >
              Reset all filters
            </button>
          </motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, idx) => {
              const catStyle = CATEGORY_STYLES[project.category] ?? {
                border: "border-emerald-500/30",
                bg: "bg-emerald-500/10",
                text: "text-emerald-400",
                glow: "from-emerald-500/20",
              };

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="gradient-border bento-card group relative flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle top gradient glow */}
                  <div
                    className={cn(
                      "pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br to-transparent blur-2xl transition-opacity group-hover:opacity-100 opacity-40",
                      catStyle.glow
                    )}
                  />

                  {/* Header info */}
                  <div>
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                          catStyle.border,
                          catStyle.bg,
                          catStyle.text
                        )}
                      >
                        {project.category}
                      </span>

                      {project.stars !== undefined && project.stars > 0 && (
                        <span className="flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-black text-amber-400">
                          <Star className="h-2.5 w-2.5 fill-amber-400" />
                          {project.stars}
                        </span>
                      )}
                    </div>

                    <Link href={`/projects/${project.slug}`} className="group/title">
                      <h2 className="text-xl font-black tracking-tight text-foreground transition-colors group-hover/title:text-accent">
                        {project.title}
                      </h2>
                    </Link>

                    <p className="mt-1 font-mono text-xs font-semibold text-accent/80">
                      {project.tagline}
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {project.description}
                    </p>

                    {/* Metrics Callout */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-border/60 bg-secondary/40 p-2.5">
                        {project.metrics.slice(0, 2).map((metric) => (
                          <div key={metric.label} className="flex flex-col">
                            <span className="text-xs font-black text-foreground">{metric.value}</span>
                            <span className="text-[9px] text-muted-foreground">{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom: Tags & Action Links */}
                  <div className="mt-6 border-t border-border/60 pt-4">
                    <div className="mb-4 flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg border border-border/60 bg-secondary/60 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="rounded-lg px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground/60">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-3">
                        {project.demoUrl && (
                          <Link
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-bold text-muted-foreground hover:text-accent transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" /> Live
                          </Link>
                        )}
                        {project.repoUrl && (
                          <Link
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-bold text-muted-foreground hover:text-accent transition-colors"
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
            })}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
