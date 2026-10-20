import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContactSection } from "@/components/sections/contact";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Allan Nuwamanya about software projects, collaborations or engineering roles. Send a message or reach out on GitHub, LinkedIn or X.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pt-8">
      <ContactSection />
    </div>
  );
}
