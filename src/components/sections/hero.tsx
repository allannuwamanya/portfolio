"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, Sparkles, Twitter } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { siteConfig } from "@/lib/constants";
import { fadeUp, letterReveal, staggerContainer } from "@/lib/animations";

const ROLES = [
  "Full-Stack Engineer",
  "TypeScript Developer",
  "Next.js Specialist",
  "API Architect",
  "Open Source Builder",
];

const socialLinks = [
  { href: siteConfig.links.github, icon: Github, label: "GitHub" },
  { href: siteConfig.links.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: siteConfig.links.twitter ?? "#", icon: Twitter, label: "Twitter" },
  { href: `mailto:${siteConfig.links.email}`, icon: Mail, label: "Email" },
];

function TypewriterRole() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx]);

  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-accent">{displayed}</span>
      <span className="cursor-blink" aria-hidden />
    </span>
  );
}

function CursorBlob() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 60, damping: 18 });
  const springY = useSpring(y, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed z-0 h-[400px] w-[400px] rounded-full opacity-25 blur-[80px]"
      style={{
        x: springX,
        y: springY,
        background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)",
      }}
      aria-hidden
    />
  );
}

export function HeroSection() {
  const nameWords = personalInfo.name.split(" ");

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden"
    >
      <CursorBlob />

      {/* Decorative large background number */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[22vw] font-black leading-none text-foreground/[0.025] lg:text-[18vw]"
      >
        01
      </div>

      {/* Grid overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid opacity-40" />

      {/* Radial accent glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.10) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(48 94% 61% / 0.07) 0%, transparent 70%)" }}
      />

      <div className="container relative z-10 max-w-6xl py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr_300px] lg:items-center">

          {/* Left: main content */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">

            {/* Status badge */}
            <motion.div variants={fadeUp} className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-sm">
                <span
                  className="h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0"
                  style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
                />
                <Sparkles className="h-3 w-3" />
                Open to thoughtful collaborations
              </span>
            </motion.div>

            {/* Location */}
            <motion.p variants={fadeUp} className="mb-4 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 text-accent" />
              {personalInfo.location} · Remote-friendly
            </motion.p>

            {/* Name — animated word-by-word */}
            <motion.h1
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mb-4 overflow-hidden text-6xl font-black leading-[0.9] tracking-tight sm:text-7xl lg:text-[6.5rem]"
              style={{ perspective: "600px" }}
            >
              <span className="mb-2 block text-2xl font-mono font-normal tracking-widest text-foreground/20 uppercase">
                Hello, I&apos;m
              </span>
              <span className="flex flex-wrap gap-x-4">
                {nameWords.map((word, i) => (
                  <motion.span
                    key={word}
                    custom={i}
                    variants={letterReveal}
                    className={i === 0 ? "gradient-text" : "text-foreground"}
                    style={{ display: "inline-block" }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-2 font-mono text-lg text-muted-foreground sm:text-xl">
              <span className="text-accent">↳</span>
              <TypewriterRole />
            </motion.div>

            {/* Bio */}
            <motion.p variants={fadeUp} className="mb-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {personalInfo.bio[0]}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mb-10 flex flex-wrap gap-3">
              <Link
                href="#projects"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-accent px-7 text-sm font-bold text-accent-foreground shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_32px_hsl(161_84%_39%_/_0.5)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  See selected work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </Link>

              <Link
                href={siteConfig.links.resume ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card/60 px-7 text-sm font-bold text-foreground backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-accent/50 hover:bg-accent/5"
              >
                <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                Download résumé
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeUp} className="flex items-center gap-2">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-card/40 text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
              <span className="ml-2 font-mono text-xs text-muted-foreground/60">· UTC+3 · Kampala</span>
            </motion.div>
          </motion.div>

          {/* Right: stats panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col gap-3"
          >
            {personalInfo.highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                className="gradient-border bento-card flex flex-col gap-1 py-5 text-center"
              >
                <span className="text-3xl font-black gradient-text">{h.value}</span>
                <span className="text-xs text-muted-foreground">{h.label}</span>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="gradient-border bento-card py-4"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Approach</p>
              <p className="mt-2 text-sm font-bold text-foreground">From first commit to shipped product.</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid grid-cols-3 gap-3 lg:hidden"
        >
          {personalInfo.highlights.map((h) => (
            <div key={h.label} className="bento-card gradient-border flex flex-col gap-1 py-4 text-center">
              <span className="text-xl font-black gradient-text">{h.value}</span>
              <span className="text-[10px] leading-tight text-muted-foreground">{h.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground/40">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="h-4 w-px bg-gradient-to-b from-muted-foreground/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

