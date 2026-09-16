import type { Metadata } from "next";
import { SkillsSection } from "@/components/sections/skills";

export const metadata: Metadata = {
  title: "Skills & Technologies",
  description: "Core technical capabilities, frameworks, backend architectures, and tooling.",
};

export default function SkillsPage() {
  return (
    <div className="pt-8">
      <SkillsSection />
    </div>
  );
}
