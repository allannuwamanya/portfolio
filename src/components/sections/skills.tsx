"use client";

import { motion } from "motion/react";
import { skillCategories } from "@/data/skills";
import { fadeUp, scaleIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

const levelColors: Record<string, string> = {
  Expert: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  Proficient: "border-blue-500/40 bg-blue-500/10 text-blue-400",
  Familiar: "border-violet-500/40 bg-violet-500/10 text-violet-400",
};

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="container max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12"
        >
          <p className="font-mono text-sm text-accent mb-2">// tech stack</p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Tools of the trade
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Technologies I use to design, build, and ship reliable software at scale.
          </p>
        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8 flex flex-wrap items-center gap-3 text-xs"
        >
          {Object.entries(levelColors).map(([level, cls]) => (
            <span key={level} className={cn("rounded-full border px-2.5 py-0.5 font-medium", cls)}>
              {level}
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
              className="bento-card flex flex-col gap-5"
            >
              <h3 className="text-sm font-semibold text-foreground tracking-wide">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, si) => (
                  <motion.span
                    key={skill.name}
                    custom={ci * 0.5 + si}
                    variants={scaleIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
                    className={cn(
                      "cursor-default rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                      skill.level
                        ? levelColors[skill.level]
                        : "border-border bg-secondary text-secondary-foreground"
                    )}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
