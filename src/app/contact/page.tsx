import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for software projects, collaborations, or engineering inquiries.",
};

export default function ContactPage() {
  return (
    <div className="pt-8">
      <ContactSection />
    </div>
  );
}
