"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Star } from "lucide-react";
import { GithubIcon } from "@/components/shared/brand-icons";
import { CountUp } from "@/components/shared/count-up";
import { fadeUp } from "@/lib/animations";
import { siteConfig } from "@/lib/constants";
import type { ContributionDay, GithubSnapshot } from "@/lib/github";

const CELL = 11;
const GAP = 3;
const STEP = CELL + GAP;
const LABEL_ROW = 16;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Level 0 is a faint cell; 1-4 step the accent colour up. */
const LEVEL_FILL = [
  "hsl(var(--foreground) / 0.07)",
  "hsl(var(--accent) / 0.3)",
  "hsl(var(--accent) / 0.55)",
  "hsl(var(--accent) / 0.8)",
  "hsl(var(--accent))",
] as const;

const parseDay = (date: string) => new Date(`${date}T00:00:00Z`);

/** Splits days into Sunday-first week columns, padding the first week so rows line up with weekdays. */
function toWeeks(days: ContributionDay[]) {
  const weeks: (ContributionDay | null)[][] = [];
  if (days.length === 0) return weeks;

  let week: (ContributionDay | null)[] = Array(parseDay(days[0].date).getUTCDay()).fill(null);
  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);
  return weeks;
}

const formatDay = (date: string) =>
  parseDay(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

function ContributionHeatmap({ days, total }: { days: ContributionDay[]; total: number | null }) {
  const weeks = React.useMemo(() => toWeeks(days), [days]);
  const scroller = React.useRef<HTMLDivElement>(null);

  // On narrow screens the graph overflows; start at the most recent weeks.
  React.useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  if (weeks.length === 0) return null;

  const width = weeks.length * STEP - GAP;
  const height = LABEL_ROW + 7 * STEP - GAP;

  // Label a month above the first full week that starts in it.
  const monthLabels: { x: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, i) => {
    const first = week.find(Boolean);
    if (!first) return;
    const month = parseDay(first.date).getUTCMonth();
    if (month !== lastMonth && (i > 0 || week.filter(Boolean).length > 3)) {
      monthLabels.push({ x: i * STEP, label: MONTHS[month] });
    }
    lastMonth = month;
  });

  return (
    <div>
      <div ref={scroller} className="overflow-x-auto pb-2">
        <motion.svg
          role="img"
          aria-label={
            total === null
              ? "GitHub contribution graph for the last year"
              : `GitHub contribution graph: ${total.toLocaleString("en-US")} contributions in the last year`
          }
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMinYMin meet"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="block w-full min-w-[620px]"
        >
          {monthLabels.map(({ x, label }) => (
            <text key={`${label}-${x}`} x={x} y={10} fontSize={9} className="fill-muted-foreground" fontFamily="var(--font-google-sans-code), monospace">
              {label}
            </text>
          ))}

          {weeks.map((week, w) => (
            <motion.g
              key={w}
              custom={w}
              variants={{
                hidden: { opacity: 0 },
                visible: (i: number) => ({ opacity: 1, transition: { duration: 0.35, delay: i * 0.014 } }),
              }}
            >
              {week.map((day, d) =>
                day ? (
                  <rect
                    key={day.date}
                    x={w * STEP}
                    y={LABEL_ROW + d * STEP}
                    width={CELL}
                    height={CELL}
                    rx={2.5}
                    fill={LEVEL_FILL[day.level]}
                  >
                    <title>{`${day.count} ${day.count === 1 ? "contribution" : "contributions"} on ${formatDay(day.date)}`}</title>
                  </rect>
                ) : null,
              )}
            </motion.g>
          ))}
        </motion.svg>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-muted-foreground" aria-hidden>
        Less
        {LEVEL_FILL.map((fill) => (
          <span key={fill} className="h-2.5 w-2.5 rounded-[3px]" style={{ background: fill }} />
        ))}
        More
      </div>
    </div>
  );
}

function LanguageBar({ languages }: { languages: GithubSnapshot["languages"] }) {
  const total = languages.reduce((sum, language) => sum + language.repos, 0);
  if (total === 0) return null;

  return (
    <div>
      <div
        role="img"
        aria-label={`Primary languages: ${languages.map((l) => `${l.name} ${l.repos}`).join(", ")}`}
        className="flex h-2.5 overflow-hidden rounded-full bg-secondary"
      >
        {languages.map((language, i) => (
          <motion.span
            key={language.name}
            initial={{ width: 0 }}
            whileInView={{ width: `${(language.repos / total) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: language.color }}
            className="h-full border-r border-background last:border-r-0"
          />
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
        {languages.map((language) => (
          <li key={language.name} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: language.color }} />
            <span className="font-bold text-foreground/90">{language.name}</span>
            {Math.round((language.repos / total) * 100)}%
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionHeader() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-12 flex flex-wrap items-end justify-between gap-4"
    >
      <div>
        <p className="mb-3 font-mono text-sm uppercase tracking-wider text-accent">Open source</p>
        <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
          Building <span className="gradient-text">in public</span>
        </h2>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          Real numbers from GitHub, not estimates: what I have built, what people have starred, and
          how often I ship.
        </p>
      </div>
      <a
        href={siteConfig.links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card/60 px-5 text-sm font-bold text-foreground transition-all hover:border-accent/50 hover:bg-accent/5"
      >
        <GithubIcon className="h-4 w-4" />
        @{siteConfig.links.github.split("/").pop()}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </motion.div>
  );
}

export function GithubStatsSection({ snapshot }: { snapshot: GithubSnapshot | null }) {
  // GitHub was unreachable at build time: say less rather than show a wrong number.
  if (!snapshot) {
    return (
      <section className="relative border-t border-border/60 py-20">
        <div className="container max-w-6xl">
          <SectionHeader />
        </div>
      </section>
    );
  }

  const stats = [
    { label: "Original repositories", value: snapshot.originalRepos },
    { label: "Stars earned", value: snapshot.stars },
    { label: "Followers", value: snapshot.followers },
    ...(snapshot.contributionsLastYear !== null
      ? [{ label: "Contributions, last year", value: snapshot.contributionsLastYear }]
      : []),
  ];

  const updated = new Date(snapshot.fetchedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="relative overflow-hidden border-t border-border/60 py-28">
      <div className="container relative z-10 max-w-6xl">
        <SectionHeader />

        <motion.dl
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-14 grid grid-cols-2 gap-y-8 lg:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-1.5 px-0 lg:px-8 ${i > 0 ? "lg:border-l lg:border-border/70" : "lg:pl-0"} ${i % 2 === 1 ? "pl-6 max-lg:border-l max-lg:border-border/70" : ""}`}
            >
              <dd className="order-1 text-4xl font-black tracking-tight gradient-text sm:text-5xl">
                <CountUp value={stat.value} />
              </dd>
              <dt className="order-2 text-sm text-muted-foreground">{stat.label}</dt>
            </div>
          ))}
        </motion.dl>

        {snapshot.days.length > 0 && (
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mb-14 rounded-2xl border border-border/70 bg-card/40 p-5 sm:p-7"
          >
            <ContributionHeatmap days={snapshot.days} total={snapshot.contributionsLastYear} />
          </motion.div>
        )}

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-14"
        >
          <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Languages, by repository
          </h3>
          <LanguageBar languages={snapshot.languages} />
        </motion.div>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Most starred
          </h3>
          <ul className="grid gap-x-16 md:grid-cols-2">
            {snapshot.topRepos.map((repo) => (
              <li key={repo.name} className="border-b border-border/60">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start justify-between gap-4 py-5"
                >
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-sm font-bold text-foreground transition-colors group-hover:text-accent">
                      {repo.name}
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                    </span>
                    {repo.description && (
                      <span className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {repo.description}
                      </span>
                    )}
                    {repo.language && (
                      <span className="mt-2.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: repo.languageColor }} />
                        {repo.language}
                      </span>
                    )}
                  </span>
                  <span className="flex shrink-0 items-center gap-1 pt-0.5 font-mono text-xs font-bold text-muted-foreground">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                    {repo.stars}
                    <span className="sr-only"> stars</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <p className="mt-12 text-xs text-muted-foreground/70">
          Live from the GitHub API at the time of the last deploy ({updated}). Forks and the profile
          README are not counted.
        </p>
      </div>
    </section>
  );
}
