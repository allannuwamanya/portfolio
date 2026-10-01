"use client";

import { motion } from "motion/react";
import { ArrowRight, FileText } from "lucide-react";
import { GithubIcon } from "@/components/shared/brand-icons";
import { fadeUp } from "@/lib/animations";
import { siteConfig } from "@/lib/constants";

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
          </motion.div>

        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="gradient-border bento-card flex flex-col items-center gap-4 px-6 py-16 text-center"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/5">
            <FileText className="h-5 w-5 text-accent" />
          </div>
          <h3 className="text-xl font-black text-foreground">Writing is on the way</h3>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Long-form notes on speech-AI pipelines, distributed systems, and production
            engineering are being written up now. In the meantime, the repositories are a
            good place to start.
          </p>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline"
          >
            <GithubIcon className="h-4 w-4" />
            Browse the GitHub profile
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
