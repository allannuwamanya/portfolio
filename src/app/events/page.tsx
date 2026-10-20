import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { EventsSection } from "@/components/sections/events";

export const metadata: Metadata = pageMetadata({
  title: "Workshops & Events",
  description:
    "Workshops, meetups and trainings Allan Nuwamanya has attended or taken part in, including a Python training at Mbarara University of Science & Technology and the IEEE SPAx, Polygon and Gender Inclusion events.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <div className="pt-8">
      <EventsSection />
    </div>
  );
}