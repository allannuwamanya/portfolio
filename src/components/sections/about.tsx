"use client";

import { motion } from "motion/react";
import { MapPin, Briefcase, ArrowUpRight, Code2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { personalInfo } from "@/data/personal";
import { fadeUp } from "@/lib/animations";
import allanImg from "../../../public/images/allan.jpg";

export function AboutSection() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
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
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl max-w-2xl text-foreground">
            Who I am &amp; what I do
          </h2>
        </motion.div>

        {/* ── Top Section: Portrait and Bio (Stretched) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Portrait Tile */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="group relative h-[400px] lg:h-[500px] rounded-[2rem] overflow-hidden border border-border bg-secondary/20"
          >
            <Image
              src={allanImg}
              alt={personalInfo.name}
              fill
              className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Simple Overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="text-2xl font-black text-foreground">{personalInfo.name}</p>
                <div className="flex items-center gap-1.5 mt-2 text-sm font-mono text-muted-foreground">
                  <MapPin className="h-4 w-4 text-accent" />
                  {personalInfo.location}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio Tile */}
          <motion.div
            custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col justify-between gap-8 rounded-[2rem] p-8 lg:p-12 border border-border bg-card"
          >
            <div>
              <h3 className="font-black text-foreground text-2xl mb-6">{personalInfo.headline}</h3>
              <div className="space-y-4">
                {personalInfo.bio.map((para, i) => (
                  <p key={i} className="text-base text-muted-foreground leading-relaxed font-medium">
                    {para}
                  </p>
                ))}
              </div>
            </div>
            <div className="pt-6 border-t border-border">
              <Link href="/contact" className="group inline-flex items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-accent">
                Let's build something <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>

        </div>

        {/* ── Bottom Section: Experience, Currently Building, Stats ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Available / Experience */}
          <motion.div
            custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col justify-between rounded-[2rem] p-8 border border-border bg-card"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
              <span className="text-xs font-black text-foreground uppercase tracking-widest">Available</span>
            </div>
            <div>
              <p className="text-5xl font-black text-foreground mb-2">{personalInfo.yearsExperience}</p>
              <p className="text-sm font-medium text-muted-foreground">Years crafting web apps</p>
            </div>
            <p className="text-xs text-muted-foreground font-semibold mt-6">{personalInfo.availability}</p>
          </motion.div>

          {/* Currently Building */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col rounded-[2rem] p-8 border border-border bg-card"
          >
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="h-4 w-4 text-foreground" />
              <p className="text-xs font-black text-foreground uppercase tracking-widest">Currently Building</p>
            </div>
            <div className="flex flex-col gap-3 mt-auto">
              {["LingualDub Speech-AI", "Temporal Workflows", "Open Data"].map((t) => (
                <div key={t} className="flex items-center gap-2 rounded-xl bg-secondary/50 border border-border px-4 py-3">
                  <Code2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-bold text-foreground">{t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
            className="grid grid-rows-2 gap-6"
          >
            {personalInfo.highlights.slice(0,2).map((h, i) => (
              <div key={h.label} className="flex flex-col justify-center rounded-[2rem] p-8 border border-border bg-card">
                <span className="text-4xl font-black text-foreground mb-1">{h.value}</span>
                <span className="text-sm text-muted-foreground font-semibold">{h.label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
