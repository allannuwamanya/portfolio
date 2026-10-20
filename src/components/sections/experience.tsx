"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Briefcase, CalendarDays, MapPin, Trophy } from "lucide-react";
import { experienceData } from "@/data/experience";
import type { ExperienceItem, ExperienceKind, OrganizationRef } from "@/types";
import { PhotoGallery } from "@/components/shared/photo-gallery";
import { EmptyState } from "@/components/shared/empty-state";
import { TechTag } from "@/components/shared/tech-tag";
import { fadeUp } from "@/lib/animations";
import { assetUrl } from "@/lib/asset-url";
import { cn, formatMonth } from "@/lib/utils";

/** Newest first, grouped by the year each entry started. */
function groupByYear(items: ExperienceItem[]) {
  const sorted = [...items].sort((a, b) => b.startDate.localeCompare(a.startDate));
  const years = new Map<string, ExperienceItem[]>();
  for (const item of sorted) {
    const year = item.startDate.slice(0, 4) || "Undated";
    years.set(year, [...(years.get(year) ?? []), item]);
  }
  return [...years.entries()];
}

/** "Mar 2025", "Mar 2025 — Present", or just the start for a one-off event. */
function formatRange(item: ExperienceItem) {
  const start = formatMonth(item.startDate);
  if (!item.endDate || item.endDate === item.startDate) return start;
  return `${start} — ${item.endDate === "Present" ? "Present" : formatMonth(item.endDate)}`;
}

/** A logo in a light tile. A logo that fails to load is dropped rather than left broken. */
function OrgLogo({ logo }: { logo: NonNullable<OrganizationRef["logo"]> }) {
  const [failed, setFailed] = React.useState(false);
  if (failed) return null;

  return (
    <span className="flex h-14 min-w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#faf9f6] px-2.5 ring-1 ring-border">
      <Image
        src={assetUrl(logo.src)}
        alt={logo.alt}
        width={160}
        height={48}
        onError={() => setFailed(true)}
        className="h-11 w-auto max-w-[8.5rem] object-contain"
      />
    </span>
  );
}

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
  const ongoing = item.endDate === "Present";
  const organizations: OrganizationRef[] = [
    { name: item.organization, url: item.organizationUrl, logo: item.logo },
    ...(item.collaborators ?? []),
  ];

  return (
    <motion.article
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="relative sm:pl-14"
    >
      {/* Timeline dot */}
      <div
        aria-hidden
        className={cn(
          "absolute left-3.5 top-7 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 sm:block",
          ongoing ? "border-accent bg-accent" : "border-border bg-background",
        )}
      />

      <div className="gradient-border bento-card flex flex-col gap-3">
        <PhotoGallery images={item.images} title={`${item.role}, ${item.organization}`} />

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
            {item.kind}
          </span>
          {ongoing && (
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
              Current
            </span>
          )}
          {item.outcome && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-bold text-amber-400">
              <Trophy className="h-3 w-3" aria-hidden />
              {item.outcome}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          {organizations.some((org) => org.logo) && (
            <div className="flex shrink-0 items-center gap-2">
              {organizations.map((org) => org.logo && <OrgLogo key={org.name} logo={org.logo} />)}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-lg font-black leading-snug text-foreground">{item.role}</h3>
            <p className="mt-1 text-base font-bold text-accent">
              {organizations.map((org, i) => (
                <React.Fragment key={org.name}>
                  {i > 0 && <span className="mx-2 font-normal text-muted-foreground">×</span>}
                  {org.url ? (
                    <a
                      href={org.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      {org.name}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ) : (
                    org.name
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3 w-3" aria-hidden />
            {formatRange(item)}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" aria-hidden />
            {item.location}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{item.summary}</p>

        {item.highlights && item.highlights.length > 0 && (
          <ul className="space-y-2.5">
            {item.highlights.map((point) => (
              <li key={point} className="flex gap-3 text-sm text-muted-foreground">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        )}

        {item.technologies && item.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {item.technologies.map((tech) => (
              <TechTag key={tech} name={tech} />
            ))}
          </div>
        )}

        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-foreground transition-colors hover:text-accent"
          >
            View details <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
        )}
      </div>
    </motion.article>
  );
}

export function ExperienceSection() {
  const [kind, setKind] = React.useState<ExperienceKind | "All">("All");

  // Only offer filters for kinds that actually have an entry.
  const kinds = React.useMemo(
    () => [...new Set(experienceData.map((item) => item.kind))],
    [],
  );
  const visible = kind === "All" ? experienceData : experienceData.filter((item) => item.kind === kind);
  const years = groupByYear(visible);

  return (
    <section id="experience" className="relative overflow-hidden py-28">
      <div className="container relative z-10 max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-wider text-accent">Experience</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Where I&apos;ve <span className="gradient-text">built</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Internships, hackathons, fellowships, and the teams I have shipped with — the places
            where the work was done under real constraints.
          </p>
        </motion.div>

        {experienceData.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="Experience is being compiled"
            action={{ label: "See what I've built in the meantime", href: "/projects" }}
          >
            Internships, hackathons, and team projects will be listed here. The engineering
            archive already documents the systems I have designed and shipped.
          </EmptyState>
        ) : (
          <>
            {kinds.length > 1 && (
              <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter by type">
                {(["All", ...kinds] as const).map((option) => {
                  const selected = kind === option;
                  const count =
                    option === "All"
                      ? experienceData.length
                      : experienceData.filter((item) => item.kind === option).length;

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
                      <span
                        className={cn(
                          "text-[10px]",
                          selected ? "text-background/70" : "text-muted-foreground/70",
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex flex-col gap-12">
              {years.map(([year, items]) => (
                <div key={year} className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 sm:pl-14">
                    <h2 className="font-mono text-2xl font-black text-foreground/80">{year}</h2>
                    <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  </div>

                  <div className="relative flex flex-col gap-6">
                    {/* Vertical timeline rule */}
                    <div
                      aria-hidden
                      className="absolute bottom-0 left-3.5 top-0 hidden w-px bg-gradient-to-b from-accent/50 via-border to-transparent sm:block"
                    />
                    {items.map((item, i) => (
                      <ExperienceCard key={item.id} item={item} index={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
