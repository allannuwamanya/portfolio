import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ExperienceSection } from "@/components/sections/experience";

export const metadata: Metadata = pageMetadata({
  title: "Experience & Education",
  description:
    "Allan Nuwamanya's experience: Langratia co-founder, internships at Blue Ox Kampus, Odd Shoes and Kreative Campus, a bootcamp pitch, and a BSc in Software Engineering (2027).",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <div className="pt-8">
      <ExperienceSection />
    </div>
  );
}
