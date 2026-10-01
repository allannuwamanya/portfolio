"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, CalendarDays, MapPin, Mic, Radio, Users, Sparkles } from "lucide-react";
import { eventsData } from "@/data/events";
import type { CommunityEvent } from "@/types";
import { fadeUp } from "@/lib/animations";
import { assetUrl } from "@/lib/asset-url";
import { cn } from "@/lib/utils";

const ROLE_CONFIG = {
  attended: { label: "Attended", icon: Users, color: "text-sky-400", border: "border-sky-500/30", bg: "bg-sky-500/10" },
  spoke: { label: "Spoke at", icon: Mic, color: "text-accent", border: "border-accent/30", bg: "bg-accent/10" },
  mentored: { label: "Mentored", icon: Radio, color: "text-violet-400", border: "border-violet-500/30", bg: "bg-violet-500/10" },
} as const;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "2025-03" -> "Mar 2025". Falls back to the raw string if the shape is off. */
function formatMonth(value: string): string {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) return value;
  const month = MONTHS[Number(match[2]) - 1];
  return month ? `${month} ${match[1]}` : value;
}

/** Newest year first, then newest month within a year. */
function groupByYear(events: CommunityEvent[]) {
  const sorted = [...events].sort((a, b) => b.date.localeCompare(a.date));
  const years = new Map<string, CommunityEvent[]>();
  for (const event of sorted) {
    const year = event.date.slice(0, 4) || "Undated";
    years.set(year, [...(years.get(year) ?? []), event]);
  }
  return [...years.entries()];
}

/**
 * Event images are optional and user-supplied, so a wrong path is likely.
 * Rather than leaving a broken frame, drop the image and keep the card.
 */
function EventImage({ event }: { event: CommunityEvent }) {
  const [failed, setFailed] = React.useState(false);
  if (failed || !event.image) return null;

  return (
    <div className="relative -mx-6 -mt-6 mb-1 aspect-[16/9] overflow-hidden rounded-t-[1.25rem] border-b border-border/60">
      <Image
        src={assetUrl(event.image)}
        alt={event.imageAlt ?? event.title}
        fill
        onError={() => setFailed(true)}
        className="object-cover transition-transform duration-500 hover:scale-[1.03]"
        sizes="(max-width: 896px) 100vw, 896px"
      />
    </div>
  );
}

export function EventsSection() {
  const years = groupByYear(eventsData);

  return (
    <section id="events" className="relative py-28 overflow-hidden">
      {/* Decorative BG number */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none text-[20vw] font-black leading-none text-foreground/[0.025]"
      >
        08
      </div>

      <div className="container max-w-4xl relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="font-mono text-sm text-accent mb-3 tracking-wider uppercase">08 / community</p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Workshops &amp; <span className="gradient-text">events</span>
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
            Conferences, workshops, and meetups I have taken part in — and the ones where I have
            had something to teach.
          </p>
        </motion.div>

        {eventsData.length === 0 ? (
          <div className="gradient-border bento-card flex flex-col items-center gap-4 px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent/20 bg-accent/5">
              <CalendarDays className="h-5 w-5 text-accent" />
            </div>
            <h3 className="text-xl font-black text-foreground">Nothing listed yet</h3>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              This space is ready for workshops, conferences, and meetups. Entries are added in
              <span className="font-mono text-foreground/80"> src/data/events.ts</span>.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {years.map(([year, events]) => (
              <div key={year} className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <h3 className="font-mono text-2xl font-black text-foreground/80">{year}</h3>
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
                      {event.image && (
                        <EventImage event={event} />
                      )}

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
                        <h4 className="text-lg font-black leading-snug text-foreground">
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
                        </h4>
                        <p className="mt-1 text-sm font-bold text-accent">{event.host}</p>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="h-3 w-3" />
                          {formatMonth(event.date)}
                        </span>
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