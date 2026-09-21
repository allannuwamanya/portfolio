"use client";

import { motion } from "motion/react";
import { MapPin, Briefcase, Coffee, Zap, Globe, Star, ArrowUpRight } from "lucide-react";
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
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[20vw] font-black leading-none text-foreground/[0.025]"
      >
        04
      </div>

      <div className="container max-w-6xl relative z-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mb-14">
          <p className="font-mono text-sm text-accent mb-3 tracking-wider uppercase">04 / about me</p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Who I am &amp; <span className="gradient-text">what I do</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 auto-rows-[180px]">

          {/* ── Bio tile — tall, spans 2 rows ── */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="gradient-border bento-card col-span-2 row-span-2 flex flex-col justify-between gap-4"
          >
            <div>
              {/* Avatar */}
              <div className="mb-5 flex items-center gap-4">
                <div className="relative h-16 w-16 rounded-2xl overflow-hidden flex-shrink-0 border border-accent/30 bg-card">
                  <Image
                    src={allanImg}
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 64px, 64px"
                    priority
                  />
                </div>
                <div>
                  <h3 className="font-black text-foreground text-lg">{personalInfo.name}</h3>
                  <p className="text-sm text-muted-foreground">{personalInfo.headline}</p>
                </div>
              </div>
              {personalInfo.bio.map((para, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-2">{para}</p>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-accent" />
                {personalInfo.location}
              </div>
              <Link href="/contact" className="group flex items-center gap-1 text-xs font-bold text-accent hover:underline">
                Hire me <ArrowUpRight className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* ── Available tile ── */}
          <motion.div
            custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="gradient-border bento-card flex flex-col justify-between"
            style={{ background: "linear-gradient(135deg, hsl(161 84% 39% / 0.05) 0%, transparent 100%)" }}
          >
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 flex-shrink-0" style={{ animation: "pulse-glow 2s ease-in-out infinite" }} />
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">Available</span>
            </div>
            <div>
              <p className="text-3xl font-black text-foreground">{personalInfo.yearsExperience}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Years crafting web apps</p>
            </div>
            <p className="text-xs text-emerald-400/80 font-medium">{personalInfo.availability}</p>
          </motion.div>

          {/* ── Currently building ── */}
          <motion.div
            custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="bento-card flex flex-col gap-3"
            style={{ background: "linear-gradient(135deg, hsl(263 70% 60% / 0.05) 0%, transparent 100%)" }}
          >
            <Briefcase className="h-5 w-5 text-violet-400" />
            <p className="font-bold text-foreground text-sm">Currently Building</p>
            <div className="flex flex-wrap gap-1 mt-auto">
              {["LingualDub Speech-AI", "Temporal Workflows", "Open Data"].map((t) => (
                <span key={t} className="rounded-lg bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 text-[10px] font-bold text-violet-400">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ── Stats ── */}
          {personalInfo.highlights.map((h, i) => (
            <motion.div
              key={h.label} custom={i + 3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
              className="bento-card flex flex-col justify-center items-start gap-1 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl"
                style={{ background: i % 2 === 0 ? "hsl(161 84% 39% / 0.15)" : "hsl(263 70% 60% / 0.15)" }} />
              <span className="relative text-4xl font-black gradient-text">{h.value}</span>
              <span className="relative text-xs text-muted-foreground leading-tight font-medium">{h.label}</span>
            </motion.div>
          ))}

          {/* ── Fun facts — wide ── */}
          <motion.div
            custom={6} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="bento-card col-span-2 flex flex-col gap-4 justify-center"
          >
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">// fun facts</p>
            <div className="grid grid-cols-2 gap-2">
              {facts.map(({ icon: Icon, text, color, bg }) => (
                <div key={text} className={cn("flex items-center gap-2.5 rounded-xl border px-3 py-2.5", bg)}>
                  <Icon className={cn("h-4 w-4 flex-shrink-0", color)} />
                  <span className="text-xs font-medium text-muted-foreground leading-tight">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Tech bar ── */}
          <motion.div
            custom={7} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="bento-card col-span-2 flex flex-col gap-3 justify-center"
          >
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">// daily drivers</p>
            <div className="flex flex-wrap gap-2">
              {techLogos.map((tech) => (
                <span key={tech} className="rounded-xl border border-border/60 bg-secondary/60 px-3 py-1.5 text-xs font-bold text-foreground">
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
