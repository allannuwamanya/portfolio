"use client";

import { motion } from "motion/react";
import { FileText } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { fadeUp } from "@/lib/animations";
import { siteConfig } from "@/lib/constants";

export function BlogPreviewSection() {
  return (
    <section id="writing" className="relative overflow-hidden py-28">
      <div className="container relative z-10 max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-wider text-accent">Writing</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Thoughts &amp; <span className="gradient-text">articles</span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            Notes on speech-AI pipelines, distributed systems, and the craft of production
            engineering.
          </p>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <EmptyState
            icon={FileText}
            title="First articles are on the way"
            action={{ label: "Browse the GitHub profile", href: siteConfig.links.github, external: true }}
          >
            Long-form write-ups are being prepared. Until then, the repositories — and the case
            studies in the engineering archive — are the best place to see how I think.
          </EmptyState>
        </motion.div>
      </div>
    </section>
  );
}
