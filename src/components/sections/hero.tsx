"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Github, Linkedin, Mail, Download, MapPin, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { personalInfo } from "@/data/personal";
import { staggerContainer, fadeUp } from "@/lib/animations";

const ROLES = [
  "Full-Stack Engineer",
  "UI/UX Craftsman",
  "Open Source Builder",
  "API Architect",
  "Performance Nerd",
];

function useTypewriter(words: string[], speed = 75, deleteSpeed = 35, pause = 2000) {
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

      {/* ── Animated mesh background ── */}
      <div className="mesh-bg absolute inset-0" />
      <div className="dot-grid absolute inset-0 opacity-30 dark:opacity-15" />

      {/* ── Large blurred orbs ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(161 84% 39% / 0.12) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(263 70% 60% / 0.10) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, hsl(213 93% 60% / 0.05) 0%, transparent 70%)" }}
      />

      <div className="container relative z-10 max-w-6xl py-20">
        <div className="grid gap-16 lg:grid-cols-[1fr_auto] lg:items-center">

          {/* ── Left: main content ── */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">

            {/* Status badge */}
            <motion.div variants={fadeUp} className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-sm">
                <span
                  className="h-2 w-2 rounded-full bg-emerald-400"
                  style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
                />
                <Sparkles className="h-3 w-3" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Location */}
            <motion.p variants={fadeUp} className="mb-3 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <MapPin className="h-3 w-3 text-accent" />
              {personalInfo.location} · Remote-friendly
            </motion.p>

            {/* Name — BIG */}
            <motion.h1 variants={fadeUp} className="mb-3 text-6xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              <span className="block text-foreground/20 text-2xl font-mono font-normal mb-2 tracking-widest uppercase">
                Hello, I&apos;m
              </span>
              <span className="gradient-text">{personalInfo.name.split(" ")[0]}</span>
              <br />
              <span className="text-foreground">{personalInfo.name.split(" ").slice(1).join(" ")}</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={fadeUp} className="mb-6 flex items-center gap-2 font-mono text-lg text-muted-foreground sm:text-xl">
              <span className="text-accent text-xl">//</span>
              <span className="text-foreground font-medium">{role}</span>
              <span className="cursor-blink" />
            </motion.div>

            {/* Bio */}
            <motion.p variants={fadeUp} className="mb-10 max-w-lg text-base text-muted-foreground leading-relaxed sm:text-lg">
              {personalInfo.bio[0]}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mb-10 flex flex-wrap gap-3">
              <Link
                href="#projects"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-accent px-7 text-sm font-bold text-accent-foreground shadow-glow transition-all duration-300 hover:shadow-[0_4px_32px_hsl(161_84%_39%_/_0.5)] hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                {/* shine sweep */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </Link>

              <Link
                href={siteConfig.links.resume ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card/60 px-7 text-sm font-bold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-accent/5 hover:scale-105"
              >
                <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                Resume
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
                  className="group flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-card/40 text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:border-accent/50 hover:bg-accent/10 hover:text-accent hover:scale-110"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
              <span className="ml-2 font-mono text-xs text-muted-foreground/60">· let&apos;s connect</span>
            </motion.div>
          </motion.div>

          {/* ── Right: floating stats card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
            className="hidden lg:flex flex-col gap-3 w-52"
          >
            {personalInfo.highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.5, ease: "easeOut" }}
                style={{ animation: `float ${3 + i * 0.5}s ease-in-out infinite` }}
                className="gradient-border bento-card flex flex-col gap-1 py-5 text-center"
              >
                <span className="text-3xl font-black gradient-text">{h.value}</span>
                <span className="text-xs text-muted-foreground">{h.label}</span>
              </motion.div>
            ))}

            {/* Code snippet card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="gradient-border bento-card py-4"
              style={{ animation: "float 4s ease-in-out infinite 1.5s" }}
            >
              <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">
                <span className="text-violet-400">const</span>{" "}
                <span className="text-emerald-400">dev</span>{" "}
                <span className="text-foreground/40">=</span>{" "}
                <span className="text-blue-400">{`{`}</span>
                <br />
                <span className="pl-3 text-orange-300">passion</span>
                <span className="text-foreground/40">:</span>{" "}
                <span className="text-emerald-300">&quot;∞&quot;</span>
                <br />
                <span className="text-blue-400">{`}`}</span>
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
          className="mt-16 grid grid-cols-3 gap-3 lg:hidden"
        >
          {personalInfo.highlights.map((h) => (
            <div key={h.label} className="bento-card gradient-border flex flex-col gap-1 py-4 text-center">
              <span className="text-xl font-black gradient-text">{h.value}</span>
              <span className="text-[10px] text-muted-foreground leading-tight">{h.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-muted-foreground/50"
      >
        scroll
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-6 w-px bg-gradient-to-b from-accent/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
