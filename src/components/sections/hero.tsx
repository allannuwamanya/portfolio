"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Github, Linkedin, Mail, Download, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { personalInfo } from "@/data/personal";
import { fadeUp, staggerContainer } from "@/lib/animations";

const ROLES = [
  "Full-Stack Engineer",
  "UI/UX Craftsman",
  "Open Source Builder",
  "API Architect",
  "Performance Nerd",
];

function useTypewriter(words: string[], speed = 80, deleteSpeed = 40, pause = 1800) {
  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const current = words[index % words.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setIsDeleting(true), pause);
      } else {
        setText(current.substring(0, text.length - 1));
        if (text.length - 1 === 0) { setIsDeleting(false); setIndex((i) => i + 1); }
      }
    }, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, words, speed, deleteSpeed, pause]);

  return text;
}

const socialLinks = [
  { href: siteConfig.links.github, icon: Github, label: "GitHub" },
  { href: siteConfig.links.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: `mailto:${siteConfig.links.email}`, icon: Mail, label: "Email" },
];

export function HeroSection() {
  const role = useTypewriter(ROLES);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-16">
      {/* Dot grid */}
      <div className="dot-grid absolute inset-0 opacity-40 dark:opacity-20" />

      {/* Gradient orbs */}
      <div aria-hidden className="pointer-events-none absolute left-1/4 top-1/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute right-1/4 top-2/3 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[100px]" />

      <div className="container relative z-10 max-w-6xl py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Status badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Location */}
          <motion.div variants={fadeUp} className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {personalInfo.location}
          </motion.div>

          {/* Name */}
          <motion.h1 variants={fadeUp} className="mb-4 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I&apos;m{" "}
            <span className="gradient-text">{personalInfo.name.split(" ")[0]}</span>
            <br />
            <span className="text-foreground">{personalInfo.name.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div variants={fadeUp} className="mb-6 font-mono text-xl font-medium text-muted-foreground sm:text-2xl">
            <span className="text-accent">&gt;</span>{" "}
            <span className="text-foreground">{role}</span>
            <span className="inline-block w-0.5 h-5 ml-0.5 align-middle bg-accent animate-blink" />
          </motion.div>

          {/* Bio */}
          <motion.p variants={fadeUp} className="mb-8 max-w-xl text-base text-muted-foreground leading-relaxed sm:text-lg">
            {personalInfo.bio[0]}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mb-10 flex flex-wrap gap-3">
            <Link
              href="#projects"
              className="group inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-accent-foreground transition-all duration-200 hover:bg-accent/90 hover:shadow-glow"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={siteConfig.links.resume ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-secondary px-6 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-secondary/80 hover:border-accent/40"
            >
              <Download className="h-4 w-4" />
              Resume
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
            <span className="text-xs text-muted-foreground ml-1 font-mono">Let&apos;s connect</span>
          </motion.div>
        </motion.div>

        {/* Stat highlights */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
          className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-3 max-w-lg"
        >
          {personalInfo.highlights.map((h) => (
            <div key={h.label} className="bento-card flex flex-col gap-1 py-4 text-center">
              <span className="text-2xl font-bold text-foreground">{h.value}</span>
              <span className="text-xs text-muted-foreground leading-tight">{h.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-muted-foreground"
      >
        <span className="font-mono">scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-border to-transparent" />
      </motion.div>
    </section>
  );
}
