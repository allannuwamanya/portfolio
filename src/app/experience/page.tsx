import type { Metadata } from "next";
import { ExperienceSection } from "@/components/sections/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Internships, hackathons, fellowships, and team projects — where the engineering was done under real constraints.",
};

export default function ExperiencePage() {
  return (
    <div className="pt-8">
      <ExperienceSection />
    </div>
  );
}
