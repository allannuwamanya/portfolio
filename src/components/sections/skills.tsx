"use client";

import { motion } from "motion/react";
import { skillCategories } from "@/data/skills";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const LEVEL_CONFIG: Record<string, { color: string; bar: string; bg: string; border: string; pct: number }> = {
  Expert: {
    color: "text-emerald-400",
    bar: "bg-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    pct: 92,
  },
  Proficient: {
    color: "text-blue-400",
    bar: "bg-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    pct: 75,
  },
  Familiar: {
    color: "text-violet-400",
    bar: "bg-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    pct: 55,
  },
};

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-28 overflow-hidden bg-secondary/20">
      {/* Decorative BG number */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[20vw] font-black leading-none text-foreground/[0.025]"
      >
        05
      </div>

      <div className="container max-w-6xl relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="font-mono text-sm text-accent mb-3 tracking-wider uppercase">05 / tech stack</p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Tools of the <span className="gradient-text">trade</span>
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
            Technologies I reach for to design, build, and ship reliable software at scale.
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10 flex flex-wrap items-center gap-4 text-xs"
        >
          {Object.entries(LEVEL_CONFIG).map(([level, cfg]) => (
            <span
              key={level}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 font-medium",
                cfg.bg,
                cfg.border,
                cfg.color
              )}
            >
              <span className={cn("h-1.5 w-1.5 rounded-full", cfg.bar)} />
              {level} (~{cfg.pct}%)
            </span>
          ))}
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.title}
              custom={ci + 2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="gradient-border bento-card flex flex-col gap-5"
            >
              <h3 className="text-sm font-bold text-foreground tracking-wide">{category.title}</h3>

              <div className="flex flex-col gap-3.5">
                {category.skills.map((skill, si) => {
                  const cfg = skill.level ? LEVEL_CONFIG[skill.level] : null;
                  const pct = cfg?.pct ?? 60;
                  return (
                    <div key={skill.name}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-xs font-medium text-foreground">{skill.name}</span>
                        {skill.level && (
                          <span className={cn("text-[10px] font-bold", cfg?.color)}>
                            {skill.level}
                          </span>
                        )}
                      </div>
                      <div className="h-1 w-full overflow-hidden rounded-full bg-border/50">
                        <motion.div
                          className={cn("h-full rounded-full", cfg?.bar ?? "bg-accent")}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.9,
                            ease: [0.22, 1, 0.36, 1],
                            delay: si * 0.05 + ci * 0.1,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
