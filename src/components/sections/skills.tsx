"use client";

import { motion } from "motion/react";
import { TechIcon, techIconId } from "@/components/shared/tech-icon";
import { skillCategories } from "@/data/skills";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

/**
 * Proficiency is shown as a dot rather than a percentage: the source data says
 * "Expert", not "92%", and inventing a number reads as a fake metric.
 */
const LEVEL_DOT: Record<string, string> = {
  Expert: "bg-emerald-400",
  Proficient: "bg-blue-400",
  Familiar: "bg-violet-400",
};

/** Every distinct technology across the categories, in first-seen order. */
const ALL_SKILLS = skillCategories.flatMap((category) => category.skills);

function IconRibbon() {
  const half = ALL_SKILLS.length;

  return (
    <div
      className="group relative mb-14 overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="marquee-track">
        {/* Two identical runs make the -50% translate loop seamlessly. */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-3 pr-3" aria-hidden={copy === 1}>
            {ALL_SKILLS.map((skill) => (
              <span
                key={skill.name}
                title={skill.name}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-card/50 transition-transform duration-300 hover:scale-110 hover:border-accent/50"
              >
                <TechIcon name={skill.name} className="h-5 w-5" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

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

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <IconRibbon />
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

              <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    title={`${skill.name} — ${skill.level}`}
                    className="group relative flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-background/40 p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-accent/5"
                  >
                    <TechIcon
                      name={skill.name}
                      className="h-7 w-7 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                    />
                    <span className="text-[10px] leading-tight font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                      {skill.name}
                    </span>
                    {skill.level && (
                      <span
                        className={cn(
                          "absolute right-2 top-2 h-1.5 w-1.5 rounded-full",
                          LEVEL_DOT[skill.level] ?? "bg-accent",
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground"
        >
          {Object.entries(LEVEL_DOT).map(([level, dot]) => (
            <span key={level} className="flex items-center gap-2">
              <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
              {level}
            </span>
          ))}
          <span className="ml-auto font-mono text-muted-foreground/60">
            {new Set(ALL_SKILLS.map((s) => techIconId(s.name))).size} technologies
          </span>
        </motion.div>
      </div>
    </section>
  );
}