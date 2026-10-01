import { CommunityEvent } from "@/types";

/**
 * Workshops, conferences, meetups and talks.
 *
 * Add an object per event — the page, the sitemap entry and the nav link are
 * already wired, so nothing else needs changing. Newest first.
 *
 *   {
 *     id: "evt-slug",
 *     title: "Building Reliable Speech Pipelines",
 *     host: "Data Science Africa",
 *     kind: "Workshop",          // Workshop | Conference | Meetup | Hackathon | Talk | Training
 *     role: "spoke",             // attended | spoke | mentored
 *     date: "2025-03",           // YYYY-MM
 *     location: "Kampala, Uganda",
 *     format: "In person",       // optional: In person | Virtual | Hybrid
 *     summary: "One line on what the event was.",
 *     takeaway: "What it changed in your work.",   // optional but worth writing
 *     link: "https://...",       // optional: slides or write-up
 *   }
 */
export const eventsData: CommunityEvent[] = [];