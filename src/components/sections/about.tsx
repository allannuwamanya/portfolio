"use client";

import { motion } from "motion/react";
import { MapPin, Briefcase, Coffee, Zap, Globe, Star } from "lucide-react";
import { personalInfo } from "@/data/personal";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const facts = [
  { icon: Coffee, text: "Fueled by coffee and curiosity", color: "text-amber-400" },
  { icon: Zap, text: "Performance optimization obsessed", color: "text-yellow-400" },
  { icon: Globe, text: "Building for the global web", color: "text-blue-400" },
  { icon: Star, text: "Open source contributor", color: "text-violet-400" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="container max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-accent mb-2">// about me</p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Who I am &amp; what I do
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3">
          {/* Bio — 2 cols 2 rows */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bento-card lg:col-span-2 lg:row-span-2 flex flex-col justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-emerald-500/20 to-violet-500/20 flex items-center justify-center text-2xl font-bold text-accent">
                AN
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{personalInfo.name}</h3>
                <p className="text-sm text-muted-foreground">{personalInfo.headline}</p>
              </div>
            </div>
            <div className="space-y-3">
              {personalInfo.bio.map((para, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed">{para}</p>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-accent" />
              {personalInfo.location}
            </div>
          </motion.div>

          {/* Availability */}
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bento-card flex flex-col justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Available</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{personalInfo.yearsExperience}</p>
              <p className="text-sm text-muted-foreground">Years of experience</p>
            </div>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
              <p className="text-xs text-emerald-400">{personalInfo.availability}</p>
            </div>
          </motion.div>

          {/* Work status */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bento-card flex flex-col gap-3"
          >
            <Briefcase className="h-5 w-5 text-violet-400" />
            <div>
              <p className="font-semibold text-foreground text-sm">Currently Building</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Crafting high-performance web apps, APIs, and open-source tools for the modern developer ecosystem.
              </p>
            </div>
            <div className="mt-auto flex gap-1">
              {["React", "Node.js", "TypeScript"].map((t) => (
                <span key={t} className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          {personalInfo.highlights.map((h, i) => (
            <motion.div
              key={h.label}
              custom={i + 3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="bento-card flex flex-col justify-center gap-1"
            >
              <span className="text-3xl font-extrabold gradient-text">{h.value}</span>
              <span className="text-xs text-muted-foreground leading-tight">{h.label}</span>
            </motion.div>
          ))}

          {/* Fun facts — span 2 cols */}
          <motion.div
            custom={6}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bento-card sm:col-span-2 flex flex-col gap-4"
          >
            <p className="font-mono text-xs text-muted-foreground">// fun facts</p>
            <div className="grid grid-cols-2 gap-3">
              {facts.map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className={cn("h-4 w-4 flex-shrink-0", color)} />
                  <span className="leading-tight">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
