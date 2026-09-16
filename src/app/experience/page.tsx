import type { Metadata } from "next";
import { ExperienceSection } from "@/components/sections/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional software engineering career, roles, and technical achievements.",
};

export default function ExperiencePage() {
  return (
    <div className="pt-8">
      <ExperienceSection />
    </div>
  );
}
