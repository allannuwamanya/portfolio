import type { Metadata } from "next";
import { EventsSection } from "@/components/sections/events";

export const metadata: Metadata = {
  title: "Workshops & Events",
  description:
    "Conferences, workshops, and meetups attended, plus talks and mentorship given.",
};

export default function EventsPage() {
  return (
    <div className="pt-8">
      <EventsSection />
    </div>
  );
}