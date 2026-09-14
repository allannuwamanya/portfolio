"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Clock, CalendarDays } from "lucide-react";
import { fadeUp } from "@/lib/animations";

const placeholderPosts = [
  {
    slug: "building-scalable-apis-nodejs",
    title: "Building Scalable REST APIs with Node.js and TypeScript",
    description: "A deep dive into architecture patterns, error handling, and performance optimization for production-grade APIs.",
    publishedAt: "2025-08-15",
    readTime: "8 min read",
    tags: ["Node.js", "TypeScript", "API"],
  },
  {
    slug: "nextjs-15-app-router-patterns",
    title: "Next.js 15 App Router: Patterns You Should Know",
    description: "Exploring Server Components, parallel routes, intercepting routes, and streaming to build better Next.js applications.",
    publishedAt: "2025-07-28",
    readTime: "6 min read",
    tags: ["Next.js", "React"],
  },
  {
    slug: "css-modern-techniques-2025",
    title: "CSS Techniques That Will Make Your UI Stand Out in 2025",
    description: "From container queries to anchor positioning and scroll-driven animations — the CSS features shaping modern UIs.",
    publishedAt: "2025-07-10",
    readTime: "5 min read",
    tags: ["CSS", "UI", "Frontend"],
  },
];

export function BlogPreviewSection() {
  return (
    <section id="writing" className="py-24">
      <div className="container max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <p className="font-mono text-sm text-accent mb-2">// writing</p>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Thoughts &amp; articles
            </h2>
          </div>
          <Link href="/blog" className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline">
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
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bento-card group flex flex-col gap-4"
            >
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-accent/20 bg-accent/5 px-2 py-0.5 text-[10px] font-medium text-accent">
                    {tag}
                  </span>
                ))}
              </div>

              <Link href={`/blog/${post.slug}`}>
                <h3 className="font-bold text-foreground leading-snug group-hover:text-accent transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
              </Link>

              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                {post.description}
              </p>

              <div className="flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
