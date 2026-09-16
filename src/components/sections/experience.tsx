"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { experienceData } from "@/data/experience";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { MapPin, Calendar, ChevronDown, Briefcase } from "lucide-react";

export function ExperienceSection() {
  const [expanded, setExpanded] = useState<string | null>(experienceData[0]?.id ?? null);

  return (
    <section id="experience" className="relative py-28 overflow-hidden">
      {/* Decorative BG number */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none text-[20vw] font-black leading-none text-foreground/[0.025]"
      >
        02
      </div>

      <div className="container max-w-6xl relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="font-mono text-sm text-accent mb-3 tracking-wider uppercase">02 / experience</p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Where I&apos;ve <span className="gradient-text">worked</span>
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
            My professional journey building production software across startups and digital agencies.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-border to-transparent hidden sm:block" />

          <div className="flex flex-col gap-6">
            {experienceData.map((exp, i) => {
              const isOpen = expanded === exp.id;
              return (
                <motion.div
                  key={exp.id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="sm:pl-14 relative"
                >
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      "absolute left-3.5 top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 transition-all duration-300 hidden sm:block",
                      isOpen
                        ? "border-accent bg-accent scale-125"
                        : "border-border bg-background"
                    )}
                  />
                  {exp.current && (
                    <div className="absolute left-3.5 top-6 h-5 w-5 -translate-x-1/2 rounded-full bg-accent/25 animate-ping hidden sm:block" />
                  )}

                  {/* Card */}
                  <div
                    className={cn(
                      "gradient-border bento-card cursor-pointer transition-all duration-300",
                      isOpen && "border-accent/40 shadow-glow-sm"
                    )}
                    onClick={() => setExpanded(isOpen ? null : exp.id)}
                    role="button"
                    aria-expanded={isOpen}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setExpanded(isOpen ? null : exp.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Briefcase className="h-4 w-4 text-accent flex-shrink-0" />
                          <h3 className="font-black text-foreground text-lg leading-snug">{exp.role}</h3>
                          {exp.current && (
                            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-base font-bold text-accent mb-2">{exp.company}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" />
                            {exp.startDate} — {exp.endDate}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3 w-3" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex-shrink-0 mt-1 text-muted-foreground"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </motion.div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-5 mt-5 border-t border-border/60">
                            <ul className="space-y-3 mb-5">
                              {exp.description.map((point, pi) => (
                                <li key={pi} className="flex gap-3 text-sm text-muted-foreground">
                                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                                  <span className="leading-relaxed">{point}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-1.5">
                              {exp.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-lg border border-border bg-secondary/60 px-2.5 py-1 text-[10px] font-bold text-muted-foreground"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
