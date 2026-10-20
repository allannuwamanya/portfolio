"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/shared/brand-icons";
import { GithubDashboard } from "@/components/sections/github-stats";
import { personalInfo } from "@/data/personal";
import { siteConfig } from "@/lib/constants";
import type { GithubSnapshot } from "@/lib/github";
import { fadeUp, letterReveal, staggerContainer } from "@/lib/animations";
import portrait from "../../../public/images/allan-circle.jpg";
import dog from "../../../public/images/dog.jpg";

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

  // Plain inline flow, so the cursor follows the last letter even when the line wraps.
  return (
    <span>
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

type Side = "person" | "dog";

/**
 * Two photos share one frame. The one in front slides out, tucks behind the
 * other, and the other comes forward — then it repeats. The photo behind is
 * always partly visible, so there is clearly more to see. A click (or the dots
 * below) swaps them by hand, and reduced motion stops the automatic cycle.
 */
const CARD_FRONT = {
  x: "0%",
  y: "0%",
  scale: 1,
  rotate: 0,
  filter: "brightness(1)",
  zIndex: 2,
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
};
const CARD_BACK = {
  x: ["0%", "60%", "27%"],
  y: ["0%", "4%", "20%"],
  scale: [1, 0.9, 0.74],
  rotate: [0, 7, 5],
  filter: "brightness(0.6)",
  zIndex: [2, 2, 1],
  transition: { duration: 1.2, times: [0, 0.5, 1], ease: "easeInOut" as const },
};
const CARD = { front: CARD_FRONT, back: CARD_BACK };

/** Each photo lands with its own entrance before the swap cycle takes over. */
const ENTRANCE = (delay: number, rotate: number) => ({
  initial: { opacity: 0, scale: 0.55, rotate, y: 40 },
  animate: { opacity: 1, scale: 1, rotate: 0, y: 0 },
  transition: { duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] as const },
});

function Portrait() {
  const reduceMotion = useReducedMotion();
  const [front, setFront] = useState<Side>("person");

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setFront((side) => (side === "person" ? "dog" : "person")), 5600);
    return () => clearInterval(id);
  }, [reduceMotion, front]);

  const swap = () => setFront((side) => (side === "person" ? "dog" : "person"));

  return (
    <div
      className="relative mx-auto aspect-square w-[var(--portrait)] shrink-0 [--portrait:11.5rem] sm:[--portrait:15rem] lg:mx-0 lg:[--portrait:clamp(15rem,40vh,22rem)]"
    >
      {/* Breathing glow */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,hsl(var(--accent)/0.4),transparent_65%)] blur-2xl"
      />

      {/* The dog photo, which starts out behind and slides clear */}
      <motion.div {...ENTRANCE(0.35, 10)} className="absolute inset-0">
        <motion.div
          variants={CARD}
          initial={false}
          animate={front === "dog" ? "front" : "back"}
          onClick={swap}
          className="absolute inset-0 cursor-pointer overflow-hidden rounded-full border-[3px] border-background shadow-[0_20px_60px_-20px_hsl(var(--accent)/0.55)] ring-2 ring-accent/60"
        >
          <Image
            src={dog}
            alt="My dog, a white and brown puppy, being held in a sunny field"
            fill
            sizes="(max-width: 640px) 184px, (max-width: 1024px) 240px, 352px"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* The portrait, exactly as photographed */}
      <motion.div {...ENTRANCE(0, -10)} className="absolute inset-0">
        <motion.div
          variants={CARD}
          initial={false}
          animate={front === "person" ? "front" : "back"}
          onClick={swap}
          className="absolute inset-0 cursor-pointer"
        >
          {/* Slowly rotating ring */}
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-[4px] rounded-full bg-[conic-gradient(from_0deg,hsl(var(--accent)),transparent_35%,hsl(48_94%_61%),transparent_70%,hsl(var(--accent)))]"
          />
          <div className="absolute inset-0 overflow-hidden rounded-full border-[3px] border-background shadow-[0_20px_60px_-20px_hsl(var(--accent)/0.55)]">
            <Image
              src={portrait}
              alt={`Portrait of ${personalInfo.name}`}
              fill
              priority
              sizes="(max-width: 640px) 184px, (max-width: 1024px) 240px, 352px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Orbiting dots */}
      <motion.div
        aria-hidden
        animate={{ rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -inset-5 z-[3]"
      >
        <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-amber-400 shadow-[0_0_12px_hsl(48_94%_61%)]" />
        <span className="absolute bottom-[14%] right-[3%] h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_hsl(var(--accent))]" />
      </motion.div>

      {/* Location chip */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
        transition={{
          opacity: { delay: 1, duration: 0.5 },
          x: { delay: 1, duration: 0.5 },
          y: { delay: 1.5, duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="glass pointer-events-none absolute -left-3 bottom-[14%] z-[4] flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] text-foreground/90 sm:-left-6"
      >
        <MapPin className="h-3 w-3 text-accent" aria-hidden />
        {personalInfo.location.split(" / ")[0]}
      </motion.div>

      {/* Which photo is in front */}
      <div className="absolute -bottom-9 left-1/2 z-[4] flex -translate-x-1/2 gap-2">
        {(["person", "dog"] as const).map((side) => (
          <button
            key={side}
            type="button"
            aria-label={side === "person" ? "Show my portrait" : "Show the photo with my dog"}
            aria-pressed={front === side}
            onClick={() => setFront(side)}
            className={`h-1.5 rounded-full transition-all duration-300 ${front === side ? "w-6 bg-accent" : "w-1.5 bg-foreground/30 hover:bg-foreground/60"}`}
          />
        ))}
      </div>
    </div>
  );
}

export function HeroSection({ snapshot }: { snapshot: GithubSnapshot | null }) {
  const nameWords = personalInfo.name.split(" ");

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <CursorBlob />

      {/* Grid overlay and soft colour washes */}
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid opacity-40" />
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

      <div className="container relative z-10 flex max-w-6xl flex-1 flex-col justify-center gap-9 pb-8 pt-24 lg:gap-10 lg:pt-20">
        {/* Introduction */}
        <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          {/* The portrait leads on phones and sits on the right from lg up */}
          <div className="lg:order-2">
            <Portrait />
          </div>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:order-1">
            <motion.p variants={fadeUp} className="mb-2 font-mono text-sm uppercase tracking-[0.3em] text-foreground/30">
              Hello, I&apos;m
            </motion.p>

            {/* Name, word by word */}
            <motion.h1
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="mb-3 flex flex-wrap gap-x-4 overflow-hidden text-[clamp(2.75rem,7.4vh,5.25rem)] font-black leading-[1.02] tracking-tight max-sm:text-5xl"
              style={{ perspective: "600px" }}
            >
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
            </motion.h1>

            <motion.div variants={fadeUp} className="mb-4 flex items-baseline gap-2 font-mono text-base text-muted-foreground sm:text-lg">
              <span className="text-accent">↳</span>
              <TypewriterTagline />
            </motion.div>

            <motion.div variants={fadeUp} className="mb-6 max-w-xl space-y-3 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              <p>{personalInfo.bio[0]}</p>
              {/* Dropped on short desktop screens so the dashboard still fits */}
              <p className="lg:[@media(max-height:840px)]:hidden">{personalInfo.bio[1]}</p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-xl bg-accent px-6 text-sm font-bold text-accent-foreground shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_32px_hsl(161_84%_39%_/_0.5)]"
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
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card/60 px-6 text-sm font-bold text-foreground backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-accent/50 hover:bg-accent/5"
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
                  className="group inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card/60 px-6 text-sm font-bold text-foreground backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-accent/50 hover:bg-accent/5"
                >
                  <Download className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                  Download résumé
                </a>
              )}

              <span aria-hidden className="mx-1 hidden h-6 w-px bg-border sm:block" />

              <div className="flex items-center gap-2">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card/40 text-muted-foreground backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-accent/50 hover:bg-accent/10 hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* GitHub, on the first screen */}
        <GithubDashboard snapshot={snapshot} />
      </div>
    </section>
  );
}
