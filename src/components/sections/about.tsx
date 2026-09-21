"use client";

import { motion } from "motion/react";
import { MapPin, Briefcase, Coffee, Zap, Globe, Star, ArrowUpRight, Code2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { personalInfo } from "@/data/personal";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import allanImg from "../../../public/images/allan.jpg";

const facts = [
  { icon: Coffee, text: "Fueled by coffee & curiosity", color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
  { icon: Zap, text: "Performance obsessed", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
  { icon: Globe, text: "Building for the global web", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
  { icon: Star, text: "Open source contributor", color: "text-violet-400", bg: "bg-violet-400/10 border-violet-400/20" },
];

const techLogos = ["Python / PyTorch", "TypeScript", "Next.js 15", "NestJS", "Temporal.io", "PostgreSQL", "TRON Web3", "Docker"];

export function AboutSection() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Section fade top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />

      {/* Decorative BG number */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[20vw] font-black leading-none text-foreground/[0.015]"
      >
        04
      </div>

      <div className="container max-w-6xl relative z-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-14">
          <p className="font-mono text-sm text-accent mb-3 tracking-wider uppercase flex items-center gap-2">
            <span className="h-px w-8 bg-accent" /> 04 / about me
          </p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl max-w-2xl">
            Who I am &amp; <span className="gradient-text">what I do</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">

          {/* ── Portrait Tile (Big Image) ── */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="group relative col-span-1 md:col-span-2 lg:col-span-1 row-span-2 rounded-[2rem] overflow-hidden border border-border bg-secondary/20 shadow-xl"
          >
            <Image
              src={allanImg}
              alt={personalInfo.name}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-xl font-black text-foreground">{personalInfo.name}</p>
              <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-accent">
                <MapPin className="h-3.5 w-3.5" />
                {personalInfo.location}
              </div>
            </div>
          </motion.div>

          {/* ── Bio Tile ── */}
          <motion.div
            custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="gradient-border bento-card col-span-1 md:col-span-2 lg:col-span-2 row-span-2 flex flex-col justify-between gap-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            <div>
              <h3 className="font-black text-foreground text-2xl mb-2">{personalInfo.headline}</h3>
              <div className="space-y-4 mt-6">
                {personalInfo.bio.map((para, i) => (
                  <p key={i} className="text-[15px] text-muted-foreground/90 leading-relaxed font-medium">
                    {para}
                  </p>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-border/50">
              <Link href="/contact" className="group inline-flex items-center gap-2 text-sm font-bold text-accent transition-colors hover:text-accent/80">
                Let's build something <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* ── Available Tile ── */}
          <motion.div
            custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="bento-card flex flex-col justify-between relative overflow-hidden border-emerald-500/20"
            style={{ background: "linear-gradient(135deg, hsl(161 84% 39% / 0.1) 0%, transparent 100%)" }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 flex-shrink-0" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Available</span>
            </div>
            <div>
              <p className="text-4xl font-black text-foreground">{personalInfo.yearsExperience}</p>
              <p className="text-sm font-medium text-muted-foreground mt-1">Years crafting web apps</p>
            </div>
            <p className="text-[11px] text-emerald-400/80 font-semibold">{personalInfo.availability}</p>
          </motion.div>

          {/* ── Currently Building ── */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="bento-card flex flex-col gap-4 border-violet-500/20"
            style={{ background: "linear-gradient(135deg, hsl(263 70% 60% / 0.1) 0%, transparent 100%)" }}
          >
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-violet-400" />
              <p className="text-xs font-black text-violet-400 uppercase tracking-widest">Currently Building</p>
            </div>
            <div className="flex flex-col gap-2 mt-auto">
              {["LingualDub Speech-AI", "Temporal Workflows", "Open Data"].map((t) => (
                <div key={t} className="flex items-center gap-2 rounded-xl bg-violet-500/10 border border-violet-500/20 px-3 py-2">
                  <Code2 className="h-3.5 w-3.5 text-violet-400" />
                  <span className="text-xs font-bold text-violet-100">{t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Stats ── */}
          {personalInfo.highlights.slice(0,2).map((h, i) => (
            <motion.div
              key={h.label} custom={i + 4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
              className="bento-card flex flex-col justify-center items-start gap-2 overflow-hidden relative group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-150"
                style={{ background: i % 2 === 0 ? "hsl(161 84% 39% / 0.15)" : "hsl(263 70% 60% / 0.15)" }} />
              <span className="relative text-5xl font-black text-foreground drop-shadow-sm">{h.value}</span>
              <span className="relative text-sm text-muted-foreground font-semibold">{h.label}</span>
            </motion.div>
          ))}

          {/* ── Daily Drivers (Wide) ── */}
          <motion.div
            custom={6} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="bento-card col-span-1 md:col-span-2 flex flex-col justify-center gap-5 relative overflow-hidden"
          >
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
            <p className="relative font-mono text-xs text-muted-foreground uppercase tracking-widest font-bold">// Daily Drivers</p>
            <div className="relative flex flex-wrap gap-2.5">
              {techLogos.map((tech) => (
                <span key={tech} className="rounded-xl border border-border/80 bg-background/80 backdrop-blur-sm px-3.5 py-2 text-[13px] font-bold text-foreground shadow-sm transition-colors hover:border-accent/50 hover:text-accent">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
