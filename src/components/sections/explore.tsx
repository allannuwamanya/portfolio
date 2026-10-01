"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Briefcase, Code2, FileText, Mail, User } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { TechIcon } from "@/components/shared/tech-icon";

/**
 * The landing page's job is to route people to a section, not to contain every
 * section. Each card is the only place that content lives.
 */
const DESTINATIONS = [
  {
    href: "/about",
    title: "About",
    blurb: "Who I am, how I work, and what I care about building.",
    icon: User,
  },
  {
    href: "/experience",
    title: "Experience",
    blurb: "Roles, teams, and the systems I have shipped in production.",
    icon: Briefcase,
  },
  {
    href: "/skills",
    title: "Skills",
    blurb: "The AI, backend, and web stack I reach for day to day.",
    icon: Code2,
  },
  {
    href: "/blog",
    title: "Writing",
    blurb: "Notes on speech-AI pipelines and production engineering.",
    icon: FileText,
  },
  {
    href: "/contact",
    title: "Contact",
    blurb: "Open to collaborations, roles, and interesting problems.",
    icon: Mail,
  },
];

/** A few representative logos, so the grid reads as a stack rather than a menu. */
const SIGNATURE = ["pytorch", "postgresql", "nextjs", "temporal"];

export function ExploreSection() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 py-28">
      <div className="container max-w-6xl relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="font-mono text-sm text-accent mb-3 tracking-wider uppercase">explore</p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Go <span className="gradient-text">deeper</span>
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
            Each of these has a page of its own — pick whichever is useful.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map(({ href, title, blurb, icon: Icon }, i) => (
            <motion.div
              key={href}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <Link
                href={href}
                className="group gradient-border bento-card flex h-full flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-lg font-black text-foreground">{title}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{blurb}</span>
                </div>

                <div className="mt-auto flex items-center gap-3 pt-3">
                  {SIGNATURE.map((id) => (
                    <TechIcon
                      key={id}
                      name={id}
                      className="h-4 w-4 opacity-45 transition-opacity duration-300 group-hover:opacity-90"
                    />
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}