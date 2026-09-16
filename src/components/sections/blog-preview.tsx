"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Clock, CalendarDays, FileText } from "lucide-react";
import { fadeUp } from "@/lib/animations";

const placeholderPosts = [
  {
    slug: "building-scalable-apis-nodejs",
    title: "Building Scalable REST APIs with Node.js and TypeScript",
    description:
      "A deep dive into architecture patterns, error handling, and performance optimization for production-grade APIs.",
    publishedAt: "2025-08-15",
    readTime: "8 min read",
    tags: ["Node.js", "TypeScript", "API"],
  },
  {
    slug: "nextjs-15-app-router-patterns",
    title: "Next.js 15 App Router: Patterns You Should Know",
    description:
      "Exploring Server Components, parallel routes, intercepting routes, and streaming to build better Next.js applications.",
    publishedAt: "2025-07-28",
    readTime: "6 min read",
    tags: ["Next.js", "React"],
  },
  {
    slug: "css-modern-techniques-2025",
    title: "CSS Techniques That Will Make Your UI Stand Out in 2025",
    description:
      "From container queries to anchor positioning and scroll-driven animations — the CSS features shaping modern UIs.",
    publishedAt: "2025-07-10",
    readTime: "5 min read",
    tags: ["CSS", "UI", "Frontend"],
  },
];

export function BlogPreviewSection() {
  return (
    <section id="writing" className="relative py-28 overflow-hidden">
      {/* Decorative BG number */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[20vw] font-black leading-none text-foreground/[0.025]"
      >
        06
      </div>

      <div className="container max-w-6xl relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="font-mono text-sm text-accent mb-3 tracking-wider uppercase">
              06 / writing
            </p>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Thoughts &amp; <span className="gradient-text">articles</span>
            </h2>
            <p className="mt-4 max-w-lg text-base text-muted-foreground leading-relaxed">
              Deep-dives on engineering patterns, performance, and the craft of building modern web software.
            </p>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:underline"
          >
            Read all articles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="gradient-border bento-card group flex flex-col gap-4"
            >
              {/* Top icon + tags */}
              <div className="flex items-start justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/20 bg-accent/5">
                  <FileText className="h-4 w-4 text-accent" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-accent/20 bg-accent/5 px-2 py-0.5 text-[10px] font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link href={`/blog/${post.slug}`}>
                <h3 className="font-black text-foreground leading-snug transition-colors duration-200 group-hover:text-accent line-clamp-2">
                  {post.title}
                </h3>
              </Link>

              <p className="flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {post.description}
              </p>

              <div className="flex items-center gap-4 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="ml-auto font-bold text-accent hover:underline"
                >
                  Read →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
