import { CommunityEvent } from "@/types";

/**
 * Workshops, conferences, meetups and talks.
 *
 * Add an object per event — the page, the sitemap entry and the nav link are
 * already wired, so nothing else needs changing. Newest first.
 *
 * Images go in `public/events/` and are referenced by path. A missing or broken
 * file is handled gracefully: the card renders without it rather than showing a
 * broken frame.
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
 *     image: "/events/speech-pipelines.jpg",   // optional, from public/events/
 *     imageAlt: "Speaking at the Data Science Africa workshop",  // optional
 *     summary: "One line on what the event was.",
 *     takeaway: "What it changed in your work.",   // optional but worth writing
 *     link: "https://...",       // optional: slides or write-up
 *   }
 */
export const eventsData: CommunityEvent[] = [];