import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Allan Nuwamanya, full-stack software engineer and builder.",
};

export default function AboutPage() {
  return (
    <div className="pt-8">
      <AboutSection />
    </div>
  );
}
