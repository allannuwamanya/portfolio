"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import { experienceData } from "@/data/experience";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  const [expanded, setExpanded] = React.useState<string | null>(experienceData[0]?.id ?? null);

  return (
    <section id="experience" className="py-24 bg-secondary/30">
      <div className="container max-w-4xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-accent mb-2">// experience</p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Where I&apos;ve worked
          </h2>
        </motion.div>

        <div className="relative">
          {/* Animated vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ originY: 0 }}
            className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-border to-transparent sm:left-[1.125rem]"
          />

          <div className="space-y-4 pl-10 sm:pl-12">
            {experienceData.map((exp, i) => {
              const isOpen = expanded === exp.id;
              return (
                <motion.div
                  key={exp.id}
                  custom={i + 1}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      "absolute -left-[2.125rem] top-5 h-4 w-4 rounded-full border-2 transition-colors duration-300 sm:-left-[2.375rem]",
                      exp.current ? "border-accent bg-accent/20" : "border-border bg-background"
                    )}
                  />
                  {exp.current && (
                    <div className="absolute -left-[2.125rem] top-5 h-4 w-4 rounded-full bg-accent/30 animate-ping sm:-left-[2.375rem]" />
                  )}

                  <div
                    className={cn(
                      "bento-card cursor-pointer transition-all duration-200",
                      isOpen && "border-accent/30"
                    )}
                    onClick={() => setExpanded(isOpen ? null : exp.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-bold text-foreground">{exp.role}</h3>
                          {exp.current && (
                            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-medium text-accent">{exp.company}</p>
                        <div className="mt-1.5 flex flex-wrap gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {exp.startDate} — {exp.endDate}
                          </span>
                          <span className="flex items-center gap-1">
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

                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-border space-y-4">
                        <ul className="space-y-2">
                          {exp.description.map((point, pi) => (
                            <li key={pi} className="flex gap-3 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech) => (
                            <span key={tech} className="rounded-md border border-border bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
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
