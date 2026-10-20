"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/shared/brand-icons";
import { personalInfo } from "@/data/personal";
import { siteConfig } from "@/lib/constants";
import { fadeUp, letterReveal, staggerContainer } from "@/lib/animations";
import allanImg from "../../../public/images/allan.jpg";

const socialLinks = [
  { href: siteConfig.links.github, icon: GithubIcon, label: "GitHub" },
  { href: siteConfig.links.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
  { href: siteConfig.links.twitter ?? "#", icon: XIcon, label: "X" },
  { href: `mailto:${siteConfig.links.email}`, icon: Mail, label: "Email" },
];

/** Types the tagline out once, then leaves a blinking cursor. */
function TypewriterTagline() {
  const text = personalInfo.tagline;
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (reduceMotion || typed >= text.length) return;
    const timeout = setTimeout(() => setTyped((n) => n + 1), typed === 0 ? 700 : 55);
    return () => clearTimeout(timeout);
  }, [typed, text, reduceMotion]);

  // Reduced motion: show the whole line at once.
  if (reduceMotion) return <span className="text-accent">{text}</span>;

  return (
    <span className="inline-flex items-center gap-1">
      <span className="sr-only">{text}</span>
      <span className="text-accent" aria-hidden>{text.slice(0, typed)}</span>
      <span className="cursor-blink" aria-hidden />
    </span>
  );
}

function CursorBlob() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 60, damping: 18 });
  const springY = useSpring(y, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduceMotion) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y, reduceMotion]);

  if (reduceMotion) return null;

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
    <section id="home" className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
      <CursorBlob />

      {/* Grid overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid opacity-40" />

      {/* Radial accent glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.10) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(48 94% 61% / 0.07) 0%, transparent 70%)" }}
      />

      <div className="container relative z-10 max-w-6xl py-28 lg:py-24">
        {/* The photo comes first in the source so it leads on phones; on large screens it sits on the right. */}
        <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-center lg:gap-20">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-36 sm:w-44 lg:order-2 lg:w-full"
          >
            <div
              aria-hidden
              className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-accent/30 via-transparent to-amber-400/20 blur-2xl"
            />
            <div className="gradient-border group relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-secondary/20 lg:rounded-[2rem]">
              <Image
                src={allanImg}
                alt={`Portrait of ${personalInfo.name}`}
                fill
                priority
                sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 340px"
                className="object-cover object-top grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 hidden lg:block">
                <p className="text-lg font-black text-foreground">{personalInfo.name}</p>
                <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 text-accent" aria-hidden />
                  {personalInfo.location}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main content */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            {/* Location (the photo carries it on large screens) */}
            <motion.p variants={fadeUp} className="mb-4 flex items-center gap-1.5 font-mono text-xs text-muted-foreground lg:hidden">
              <MapPin className="h-3 w-3 text-accent" aria-hidden />
              {personalInfo.location}
            </motion.p>

            {/* Name, word by word */}
            <motion.h1
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mb-4 overflow-hidden text-6xl font-black leading-[0.9] tracking-tight sm:text-7xl lg:text-[6rem]"
              style={{ perspective: "600px" }}
            >
              <span className="mb-2 block font-mono text-2xl font-normal uppercase tracking-widest text-foreground/20">
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
              <TypewriterTagline />
            </motion.div>

            {/* Bio */}
            <motion.div variants={fadeUp} className="mb-9 max-w-xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {personalInfo.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mb-9 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-xl bg-accent px-7 text-sm font-bold text-accent-foreground shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_32px_hsl(161_84%_39%_/_0.5)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </Link>

              {!siteConfig.links.resume && (
                <Link
                  href="/contact"
                  className="group inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card/60 px-7 text-sm font-bold text-foreground backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-accent/50 hover:bg-accent/5"
                >
                  <Mail className="h-4 w-4" />
                  Get in touch
                </Link>
              )}
              {siteConfig.links.resume && (
                <a
                  href={siteConfig.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card/60 px-7 text-sm font-bold text-foreground backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-accent/50 hover:bg-accent/5"
                >
                  <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                  Download résumé
                </a>
              )}
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
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/40">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="h-4 w-px bg-gradient-to-b from-muted-foreground/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
