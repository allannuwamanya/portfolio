import type { Metadata } from "next";
import { CertificationsSection } from "@/components/sections/certifications";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Certificates and awards in Python, AI, and entrepreneurship from Mbarara University of Science & Technology, the University of Helsinki, and ALX.",
};

export default function CertificationsPage() {
  return (
    <div className="pt-8">
      <CertificationsSection />
    </div>
  );
}
