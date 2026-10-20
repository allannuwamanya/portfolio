import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CertificationsSection } from "@/components/sections/certifications";

export const metadata: Metadata = pageMetadata({
  title: "Certifications",
  description:
    "Certificates in Python, AI and entrepreneurship from Mbarara University of Science & Technology, the University of Helsinki, ALX Africa and the 2025 Tech-Preneurship Bootcamp.",
  path: "/certifications",
});

export default function CertificationsPage() {
  return (
    <div className="pt-8">
      <CertificationsSection />
    </div>
  );
}
