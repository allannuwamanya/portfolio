/**
 * Rankings and milestones shown on the site. Each one is a snapshot: update the
 * rank and `asOf` when the source list changes, and only claim what it shows.
 */
export const githubRanking = {
  rank: 12,
  scope: "Uganda",
  label: "top GitHub committer in Uganda",
  source: "committers.app",
  url: "https://committers.app/uganda",
  asOf: "October 2026",
} as const;
