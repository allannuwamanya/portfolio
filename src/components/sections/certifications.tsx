"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Award } from "lucide-react";
import { certificationsData } from "@/data/certifications";
import type { CertificationKind } from "@/types";
import { CertificateCard } from "@/components/shared/certificate-card";
import { CountUp } from "@/components/shared/count-up";
import { EmptyState } from "@/components/shared/empty-state";
import { fadeUp } from "@/lib/animations";
import { cn, formatMonth } from "@/lib/utils";

export function CertificationsSection() {
  const [kind, setKind] = React.useState<CertificationKind | "All">("All");

  const sorted = React.useMemo(
    () => [...certificationsData].sort((a, b) => b.date.localeCompare(a.date)),
    [],
  );
  const kinds = React.useMemo(() => [...new Set(sorted.map((item) => item.kind))], [sorted]);
  const visible = kind === "All" ? sorted : sorted.filter((item) => item.kind === kind);

  const skillCount = new Set(sorted.flatMap((item) => item.skills ?? [])).size;
  const latest = sorted[0];

  return (
    <section id="certifications" className="relative overflow-hidden py-28">
      <div className="container relative z-10 max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-wider text-accent">Certifications</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Learning, <span className="gradient-text">on the record</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Certificates and awards from programmes in Python, AI, and entrepreneurship. Select any
            one to see the full document.
          </p>
        </motion.div>

        {sorted.length === 0 ? (
          <EmptyState
            icon={Award}
            title="Certifications coming soon"
            action={{ label: "See the engineering archive", href: "/projects" }}
          >
            Certificates and awards will be listed here, each with the full document.
          </EmptyState>
        ) : (
          <>
            <motion.dl
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="mb-12 grid grid-cols-3 gap-3 sm:gap-5"
            >
              {[
                { label: "Credentials", value: <CountUp value={sorted.length} /> },
                { label: "Skills covered", value: <CountUp value={skillCount} /> },
                { label: "Most recent", value: formatMonth(latest.date.slice(0, 7)) },
              ].map((stat) => (
                <div key={stat.label} className="gradient-border bento-card flex flex-col gap-1 py-5 text-center">
                  <dd className="order-1 text-2xl font-black gradient-text sm:text-3xl">{stat.value}</dd>
                  <dt className="order-2 text-xs text-muted-foreground">{stat.label}</dt>
                </div>
              ))}
            </motion.dl>

            {kinds.length > 1 && (
              <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by type">
                {(["All", ...kinds] as const).map((option) => {
                  const selected = kind === option;
                  const count =
                    option === "All"
                      ? sorted.length
                      : sorted.filter((item) => item.kind === option).length;
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setKind(option)}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors",
                        selected
                          ? "bg-foreground text-background"
                          : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
                      )}
                    >
                      {option}
                      <span className={cn("text-[10px]", selected ? "text-background/70" : "text-muted-foreground/70")}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {visible.map((item, i) => (
                <CertificateCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
