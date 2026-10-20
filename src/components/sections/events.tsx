"use client";

import { motion } from "motion/react";
import { ArrowUpRight, CalendarDays, MapPin, Mic, Radio, Users, Sparkles } from "lucide-react";
import { eventsData } from "@/data/events";
import type { CommunityEvent } from "@/types";
import { fadeUp } from "@/lib/animations";
import { PhotoGallery } from "@/components/shared/photo-gallery";
import { EmptyState } from "@/components/shared/empty-state";
import { cn, formatDateRange } from "@/lib/utils";

const ROLE_CONFIG = {
  attended: { label: "Attended", icon: Users, color: "text-sky-400", border: "border-sky-500/30", bg: "bg-sky-500/10" },
  spoke: { label: "Spoke at", icon: Mic, color: "text-accent", border: "border-accent/30", bg: "bg-accent/10" },
  mentored: { label: "Mentored", icon: Radio, color: "text-violet-400", border: "border-violet-500/30", bg: "bg-violet-500/10" },
} as const;

const UNDATED = "More events";

/** Newest year first; within a year, pinned events lead, then newest first. Undated events go last. */
function groupByYear(events: CommunityEvent[]) {
  const sorted = [...events].sort(
    (a, b) => Number(b.pinned ?? false) - Number(a.pinned ?? false) || (b.date ?? "").localeCompare(a.date ?? ""),
  );
  const years = new Map<string, CommunityEvent[]>();
  for (const event of sorted) {
    const year = event.date?.slice(0, 4) || UNDATED;
    years.set(year, [...(years.get(year) ?? []), event]);
  }
  return [...years.entries()].sort(([a], [b]) => (a === UNDATED ? 1 : b === UNDATED ? -1 : b.localeCompare(a)));
}

export function EventsSection() {
  const years = groupByYear(eventsData);

  return (
    <section id="events" className="relative py-28 overflow-hidden">

      <div className="container max-w-4xl relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="font-mono text-sm text-accent mb-3 tracking-wider uppercase">Community</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Workshops &amp; <span className="gradient-text">events</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
            Conferences, workshops, and meetups I have taken part in — and the ones where I have
            had something to teach.
          </p>
        </motion.div>

        {eventsData.length === 0 ? (
          <EmptyState
            icon={CalendarDays}
            title="Community events coming soon"
            action={{ label: "Get in touch", href: "/contact" }}
          >
            Workshops, conferences, and meetups I attend or speak at will be listed here. If you
            are organising one, I would love to hear about it.
          </EmptyState>
        ) : (
          <div className="flex flex-col gap-12">
            {years.map(([year, events]) => (
              <div key={year} className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <h2 className="font-mono text-2xl font-black text-foreground/80">{year}</h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>

                {events.map((event, i) => {
                  const role = ROLE_CONFIG[event.role];
                  const RoleIcon = role.icon;

                  return (
                    <motion.article
                      key={event.id}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-60px" }}
                      className="gradient-border bento-card flex flex-col gap-3"
                    >
                      <PhotoGallery images={event.images} title={event.title} />

                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold",
                            role.color,
                            role.border,
                            role.bg,
                          )}
                        >
                          <RoleIcon className="h-3 w-3" />
                          {role.label}
                        </span>
                        <span className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                          {event.kind}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-black leading-snug text-foreground">
                          {event.link ? (
                            <a
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-start gap-1.5 transition-colors hover:text-accent"
                            >
                              {event.title}
                              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0" />
                            </a>
                          ) : (
                            event.title
                          )}
                        </h3>
                        <p className="mt-1 text-sm font-bold text-accent">{event.host}</p>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        {event.date && (
                          <span className="flex items-center gap-1.5">
                            <CalendarDays className="h-3 w-3" />
                            {formatDateRange(event.date, event.endDate)}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </span>
                        {event.format && (
                          <span className="flex items-center gap-1.5">
                            <Radio className="h-3 w-3" />
                            {event.format}
                          </span>
                        )}
                      </div>

                      <p className="text-sm leading-relaxed text-muted-foreground">{event.summary}</p>

                      {event.takeaway && (
                        <p className="flex gap-2.5 rounded-lg border border-accent/20 bg-accent/5 px-3.5 py-3 text-sm leading-relaxed text-foreground/85">
                          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <span>{event.takeaway}</span>
                        </p>
                      )}
                    </motion.article>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}